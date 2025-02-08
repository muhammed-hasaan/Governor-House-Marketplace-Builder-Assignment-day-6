import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { Product } from "@/lib/types";

export async function getPopularProducts() {
  try {
    const POPULAR_PRODUCTS_QUERY = defineQuery(
      `*[_type == "product" && "popular products" in tags[]] | order(orderRank) [0...3]`
    );

    const result = await sanityFetch({
      query: POPULAR_PRODUCTS_QUERY,
    });

    return result.data;
  } catch (error) {
    console.error("Failed to fetch popular products", error);
    return [];
  }
}
