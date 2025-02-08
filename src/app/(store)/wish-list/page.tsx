import React from "react";
import { getHomePageProducts } from "@/sanity/products/getHomePageProducts";
import WishListClient from "./WishListClient";

export default async function WishListPage() {
  // Fetch products on the server
  const products = await getHomePageProducts();

  return (
    <div>
      <WishListClient products={products} />
    </div>
  );
}
