import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { Product } from "@/lib/types";

export async function getAllProducts() {
  try {
    const GET_ALL_PRODUCTS_QUERY = defineQuery(`*[_type == 'product']`);
    const result = await sanityFetch({
      query: GET_ALL_PRODUCTS_QUERY,
    });
    return result.data as Product[];
  } catch (error) {
    console.log("Failed to get all products", error);
    return [];
  }
}
