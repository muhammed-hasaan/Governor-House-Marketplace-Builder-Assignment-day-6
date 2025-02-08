import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { Product } from "@/lib/types";

// Existing getProductBySlug query remains the same

export async function getRelatedProducts(
  categoryRef: string,
  currentProductId: string
) {
  try {
    const RELATED_PRODUCTS_QUERY = defineQuery(
      `*[_type == "product" && category._ref == $categoryRef && _id != $currentProductId][0...4] `
    );

    const result = await sanityFetch({
      query: RELATED_PRODUCTS_QUERY,
      params: {
        categoryRef,
        currentProductId,
      },
    });

    return result.data;
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}
