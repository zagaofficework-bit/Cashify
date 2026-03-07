const Product = require("../models/product.model");
const redisClient = require("../config/redis.client");


// REDIS KEY HELPERS


const PRODUCT_CACHE_TTL = 60 * 5;
const PRODUCT_KEY       = (id)    => `product:${id}`;
const PRODUCTS_LIST_KEY = (query) => `products:${JSON.stringify(query)}`;


// CREATE PRODUCT — admin only


exports.createProduct = async (data) => {
  const product = await Product.create(data);
  await invalidateListCache();
  return product;
};


// GET ALL PRODUCTS — public, paginated + cached + filterable


exports.getProducts = async (query) => {
  const {
    category,
    subcategory,
    condition,
    color,
    storage,
    minPrice,
    maxPrice,
    search,
    inStock,
    page   = 1,
    limit  = 20,
    sortBy = "createdAt",
    order  = "desc",
  } = query;

  // 1. Check Redis cache first
  const cacheKey = PRODUCTS_LIST_KEY(query);
  const cached   = await redisClient.get(cacheKey).catch(() => null);
  if (cached) return JSON.parse(cached);

  // 2. Build filter dynamically
  const filter = {};

  if (category)    filter.category    = category;
  if (subcategory) filter.subcategory = subcategory;
  if (condition)   filter.condition   = condition;
  if (color)       filter.color       = new RegExp(color, "i");
  if (storage)     filter.storage     = storage;
  if (inStock !== undefined) filter.inStock = inStock === "true";

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Full-text search on title + description
  if (search) filter.$text = { $search: search };

  // 3. Pagination
  const pageNum  = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip     = (pageNum - 1) * limitNum;

  // 4. Sort
  const sortObj = { [sortBy]: order === "asc" ? 1 : -1 };

  // 5. Run query + count in parallel
  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .populate("listedBy", "firstname lastname")
      .lean(),
    Product.countDocuments(filter),
  ]);

  const result = {
    products,
    pagination: {
      total,
      page:       pageNum,
      limit:      limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNext:    pageNum < Math.ceil(total / limitNum),
      hasPrev:    pageNum > 1,
    },
  };

  // 6. Cache result
  await redisClient
    .setEx(cacheKey, PRODUCT_CACHE_TTL, JSON.stringify(result))
    .catch(() => null);

  return result;
};


// GET PRODUCT BY ID — cached


exports.getProductById = async (id) => {
  const cached = await redisClient.get(PRODUCT_KEY(id)).catch(() => null);
  if (cached) return JSON.parse(cached);

  const product = await Product.findById(id)
    .populate("listedBy", "firstname lastname")
    .lean();

  if (!product) return null;

  await redisClient
    .setEx(PRODUCT_KEY(id), PRODUCT_CACHE_TTL, JSON.stringify(product))
    .catch(() => null);

  return product;
};


// UPDATE PRODUCT — admin only


exports.updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).lean();

  if (!product) return null;

  await Promise.all([
    redisClient.del(PRODUCT_KEY(id)).catch(() => null),
    invalidateListCache(),
  ]);

  return product;
};


// DELETE PRODUCT — admin only


exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id).lean();

  if (!product) return null;

  await Promise.all([
    redisClient.del(PRODUCT_KEY(id)).catch(() => null),
    invalidateListCache(),
  ]);

  return product;
};


// HELPER — Invalidate all product list caches


async function invalidateListCache() {
  try {
    const keys = await redisClient.keys("products:*");
    if (keys.length > 0) await redisClient.del(keys);
  } catch {
    // Cache failure should never crash the app
  }
}