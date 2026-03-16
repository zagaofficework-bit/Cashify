import React from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { refurbishedProducts } from "../../res/Data/DevicesData";

const Test = () => {
  const { id } = useParams();

  const product = refurbishedProducts.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default Test;