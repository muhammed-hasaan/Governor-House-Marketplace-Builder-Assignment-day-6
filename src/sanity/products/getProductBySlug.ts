import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { Product } from "@/lib/types";

export async function getProductBySlug(slug: string) {
  try {
    const GET_PRODUCT_BY_SLUG = defineQuery(
      `*[_type == "product" && slug.current == $slug][0]`
    );

    const result = await sanityFetch({
      query: GET_PRODUCT_BY_SLUG,
      params: { slug },
    });

    return result.data;
  } catch (error) {
    console.error("Failed to fetch product by slug:", error);
    return null;
  }
}
