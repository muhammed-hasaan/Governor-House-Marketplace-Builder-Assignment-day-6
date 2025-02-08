import { defineQuery } from "next-sanity";
import { client } from "../lib/client";
import { sanityFetch } from "../lib/live";

export async function getUserById(userId: string) {
  try {
    if (!userId) {
      throw new Error("Missing user ID");
    }
    // Fetch user from Sanity by clerkId
    const GET_USER_QUERY =
      defineQuery(`*[_type == "customer" && clerkId == $userId][0]{
        _id,
        name,
        email,
        isAdmin,
        clerkId
      }`);
    // const user = await client.fetch(
    //   `*[_type == "customer" && clerkId == $userId][0]{
    //     _id,
    //     name,
    //     email,
    //     isAdmin,
    //     clerkId
    //   }`,
    //   { userId }
    // );

    const user = await sanityFetch({
      query: GET_USER_QUERY,
      params: {
        userId,
      },
    });

    return user.data;
  } catch (error) {
    console.error("Error fetching user from Sanity:", error);
    return null;
  }
}
