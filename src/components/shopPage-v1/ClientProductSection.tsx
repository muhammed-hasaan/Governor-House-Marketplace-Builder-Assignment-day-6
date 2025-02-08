"use client";

import React, { useState, useEffect } from "react";
import ProductFilters from "./ProductFilter";
import Card from "../cards/Card";
import { Product, Category } from "@/lib/types";
import Pagination from "./Pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ClientProductSectionProps {
  initialProducts: Product[];
  categories: Category[];
}

const ClientProductSection: React.FC<ClientProductSectionProps> = ({
  initialProducts,
  categories,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );
  const [selectedSort, setSelectedSort] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const applyFilters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let filtered = [...products];

        // Apply filters
        if (selectedFilters.size > 0) {
          filtered = filtered.filter(
            (product) =>
              (product.tags &&
                product.tags.some((tag) => selectedFilters.has(tag))) ||
              (product.category &&
                selectedFilters.has(product.category._ref)) ||
              selectedFilters.has(getPriceRange(product.price))
          );
        }

        // Apply sorting
        switch (selectedSort) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "newest":
          default:
            filtered.sort(
              (a, b) =>
                new Date(b._createdAt).getTime() -
                new Date(a._createdAt).getTime()
            );
            break;
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
      } catch (err) {
        setError(
          "An error occurred while filtering products. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    applyFilters();
  }, [selectedFilters, selectedSort, products]);

  const getPriceRange = (price: number) => {
    if (price <= 500) return "0-500";
    if (price <= 1000) return "501-1000";
    return "1000+";
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Filters Section */}
      <div className="col-span-12 md:col-span-3">
        <ProductFilters
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          categories={categories}
        />
      </div>

      {/* Products Section */}
      <div className="col-span-12 md:col-span-9">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <Card key={index} card={{} as Product} isLoading={true} />
              ))}
          </div>
        )}
        {filteredProducts.length === 0 && !isLoading && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No products found</AlertTitle>
            <AlertDescription>
              Try adjusting your filters or search criteria.
            </AlertDescription>
          </Alert>
        )}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentProducts.map((card: Product, index: number) => (
              <Card card={card} key={index} isLoading={isLoading} />
            ))}
          </div>
        )}
        {!isLoading && filteredProducts.length > 0 && (
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </section>
  );
};

export default ClientProductSection;
