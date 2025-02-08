import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { Product } from "@/lib/types";

export async function getHomePageProducts() {
  try {
    const GET_HOME_PAGE_PRODUCT_QUERY = defineQuery(`*[_type == 'product'][0...4]`);
    const result = await sanityFetch({
      query: GET_HOME_PAGE_PRODUCT_QUERY,
    });
    return result.data as Product[];
  } catch (error) {
    console.log("Failed to get all products", error);
    return [];
  }
}
