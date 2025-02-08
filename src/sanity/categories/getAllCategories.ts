import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { Category } from "@/lib/types";

export async function getAllCategories() {
  try {
    const GET_ALL_CATEGORIES_QUERY = defineQuery(`*[_type == 'category']`);
    const result = await sanityFetch({
      query: GET_ALL_CATEGORIES_QUERY,
    });
    return result.data as Category[];
  } catch (error) {
    console.log("Failed to get all categories", error);
    return [];
  }
}
