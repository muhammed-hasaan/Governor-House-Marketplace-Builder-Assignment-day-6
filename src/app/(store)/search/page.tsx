import React from "react";
import { flexibleSearch } from "@/sanity/products/flexibleSearch";
import Card from "@/components/cards/Card";
import { Product } from "@/lib/types";
import { Search, PackageSearch } from "lucide-react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // @ts-expect-error  // because search params are undefined
  const query = await searchParams.query;
  return {
    title: query ? `Search results for "${query}"` : "Search Products",
  };
}

const SearchPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  // @ts-expect-error  // because search params are undefined
  const query = searchParams.query as string | undefined;
  const products: Product[] = query ? await flexibleSearch(query) : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {query ? `Search results for "${query}"` : "Search Products"}
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* <Sidebar /> */}
        <div className="flex-grow">
          {!query ? (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-100 rounded-lg shadow-inner">
              <Search className="w-16 h-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Start Your Search
              </h2>
              <p className="text-gray-600 max-w-md">
                Enter a search query in the box above to find products that
                match your interests.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-100 rounded-lg shadow-inner">
              <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Products Found
              </h2>
              <p className="text-gray-600 max-w-md">
                We couldn't find any products matching "{query}". Try adjusting
                your search terms or browse our categories.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card card={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
