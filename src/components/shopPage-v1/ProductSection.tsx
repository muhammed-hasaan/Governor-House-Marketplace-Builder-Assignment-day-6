import React from "react";
import { getAllProducts } from "@/sanity/products/getAllProducts";
import { getAllCategories } from "@/sanity/categories/getAllCategories";
import ClientProductSection from "./ClientProductSection";

const ProductSection = async () => {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <ClientProductSection initialProducts={products} categories={categories} />
  );
};

export default ProductSection;
