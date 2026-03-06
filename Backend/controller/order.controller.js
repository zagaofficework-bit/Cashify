const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Address = require("../models/address.model");

// ─── PLACE ORDER ────────────────────────────────────────────────
exports.placeOrder = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { productId, addressId, paymentMethod } = req.body;

    // Validate required fields
    if (!productId || !addressId || !paymentMethod) {
      return res.status(400).json({ message: "productId, addressId and paymentMethod are required" });
    }

    // Fetch product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Buyer cannot buy their own product
    if (product.owner.toString() === buyerId.toString()) {
      return res.status(400).json({ message: "You cannot buy your own product" });
    }

    // Fetch shipping address — must belong to buyer
    const address = await Address.findOne({ _id: addressId, userId: buyerId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Check product not already sold (if you add an isSold flag later, check here)

    const order = await Order.create({
      buyer: buyerId,
      seller: product.owner,
      product: product._id,

      // Snapshot so order history is preserved even if product is deleted
      productSnapshot: {
        title: product.title,
        price: product.price,
        condition: product.condition,
        storage: product.storage,
        color: product.color,
        category: product.category,
        subcategory: product.subcategory,
        image: product.images?.[0] || null,
      },

      amount: product.price,
      paymentMethod,
      paymentStatus: paymentMethod === "Cash" ? "Pending" : "Pending",  // Stripe will update this

      shippingAddress: {
        addressId: address._id,
        street: address.street,
        city: address.city,
        state: address.state,
        zipcode: address.zipcode,
        country: address.country,
        phone: address.phone,
        email: address.email,
      },
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET MY ORDERS (Buyer) ───────────────────────────────────────
exports.getMyOrders = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const orders = await Order.find({ buyer: buyerId })
      .populate("product", "title images price condition")
      .populate("seller", "firstname lastname mobile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET MY SALES (Seller) ───────────────────────────────────────
exports.getMySales = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const sales = await Order.find({ seller: sellerId })
      .populate("product", "title images price condition")
      .populate("buyer", "firstname lastname mobile")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sales.length,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── GET ORDER BY ID ─────────────────────────────────────────────
exports.getOrderById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("product", "title images price condition storage color")
      .populate("buyer", "firstname lastname mobile email")
      .populate("seller", "firstname lastname mobile email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only buyer or seller can view the order
    const isBuyer = order.buyer._id.toString() === userId.toString();
    const isSeller = order.seller._id.toString() === userId.toString();

    if (!isBuyer && !isSeller) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── CANCEL ORDER ────────────────────────────────────────────────
exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { reason } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const isBuyer = order.buyer.toString() === userId.toString();
    const isSeller = order.seller.toString() === userId.toString();

    if (!isBuyer && !isSeller) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Can only cancel if order is Placed or Confirmed
    if (!["Placed", "Confirmed"].includes(order.orderStatus)) {
      return res.status(400).json({
        message: `Order cannot be cancelled at ${order.orderStatus} stage`,
      });
    }

    order.orderStatus = "Cancelled";
    order.cancelledBy = isBuyer ? "Buyer" : "Seller";
    order.cancellationReason = reason || null;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── UPDATE ORDER STATUS (Seller only) ───────────────────────────
exports.updateOrderStatus = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { id } = req.params;
    const { orderStatus } = req.body;

    const validTransitions = {
      Placed: ["Confirmed", "Cancelled"],
      Confirmed: ["Shipped", "Cancelled"],
      Shipped: ["Delivered"],
    };

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.seller.toString() !== sellerId.toString()) {
      return res.status(403).json({ message: "Only the seller can update order status" });
    }

    const allowed = validTransitions[order.orderStatus];

    if (!allowed || !allowed.includes(orderStatus)) {
      return res.status(400).json({
        message: `Cannot transition from ${order.orderStatus} to ${orderStatus}`,
      });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to ${orderStatus}`,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};