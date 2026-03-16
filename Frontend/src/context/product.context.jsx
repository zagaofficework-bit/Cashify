import { createContext, useContext, useState } from "react";
import {
  getAllProducts,
  getProductById,
  getProductsByDevice,
  searchProducts,
  getUserListings,
  createProductSeller,
  createProductUser,
  updateProduct,
  deleteProduct,
} from "../services/product.api";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {

  const [products, setProducts]               = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userListings, setUserListings]       = useState([]);
  const [pagination, setPagination]           = useState({});
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState(null);

  const [filters, setFilters] = useState({
    deviceType: "",
    brand:      "",
    condition:  "",
    minPrice:   "",
    maxPrice:   "",
    location:   "",
    state:      "",
    search:     "",
    sortBy:     "newest",
    page:       1,
    limit:      12,
  });

  // ─── Helpers ──────────────────────────────────────────────────────────────

  const handleError = (err) => {
    setError(err.message);
    setLoading(false);
  };

  const updateFilter = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({
      deviceType: "",
      brand:      "",
      condition:  "",
      minPrice:   "",
      maxPrice:   "",
      location:   "",
      state:      "",
      search:     "",
      sortBy:     "newest",
      page:       1,
      limit:      12,
    });
  };

  // ─── Actions ──────────────────────────────────────────────────────────────

  const fetchProducts = async (overrideFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllProducts({ ...filters, ...overrideFilters });
      // backend returns { success, products: [...], pagination: {...} }
      setProducts(res.products ?? []);
      setPagination(res.pagination ?? {});
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchByDeviceType = async (deviceType, extraFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProductsByDevice(deviceType, { ...filters, ...extraFilters });
      setProducts(res.products ?? []);
      setPagination(res.pagination ?? {});
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProductById(id);
      // backend may return { success, product: {...} } or just the product
      setSelectedProduct(res.product ?? res);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const search = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const res = await searchProducts(query, filters);
      setProducts(res.products ?? []);
      setPagination(res.pagination ?? {});
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUserListings();
      setUserListings(res.products ?? []);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const addProductSeller = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createProductSeller(productData);
      const newProduct = res.data ?? res.product ?? res;
      setProducts((prev) => [newProduct, ...prev]);
      setUserListings((prev) => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

   const addProductUser = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createProductUser(productData);
      const newProduct = res.product ?? res;
      setProducts((prev) => [newProduct, ...prev]);
      setUserListings((prev) => [newProduct, ...prev]);
      return newProduct;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id, updateData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateProduct(id, updateData);
      const updated = res.product ?? res;
      setProducts((prev) => prev.map((p) => p._id === id ? updated : p));
      setUserListings((prev) => prev.map((p) => p._id === id ? updated : p));
      if (selectedProduct?._id === id) setSelectedProduct(updated);
      return updated;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setUserListings((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────

  return (
    <ProductContext.Provider value={{
      products,
      selectedProduct,
      userListings,
      pagination,
      loading,
      error,
      filters,
      updateFilter,
      resetFilters,
      fetchProducts,
      fetchByDeviceType,
      fetchProductById,
      search,
      fetchUserListings,
      addProductSeller,
      addProductUser,
      editProduct,
      removeProduct,
    }}>
      {children}
    </ProductContext.Provider>
  );
};