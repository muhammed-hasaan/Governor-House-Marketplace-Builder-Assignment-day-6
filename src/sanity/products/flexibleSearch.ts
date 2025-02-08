import { client } from "../lib/client";

export async function flexibleSearch(
  query: string | string[] | undefined
): Promise<any[]> {
  if (!query) return [];

  const searchQuery = Array.isArray(query) ? query[0] : query;

  return client.fetch(
    `*[_type == "product" && [name, description] match "*${searchQuery}*"]`
  );
}
