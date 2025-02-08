"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { flexibleSearch } from "@/sanity/products/flexibleSearch";

type Product = {
  _id: string;
  name: string;
  price: number;
};

export function SearchDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 2) {
        const products = await flexibleSearch(query);
        setResults(products.slice(0, 5)); // Limit to 5 results
      } else {
        setResults([]);
      }
    };

    const debounce = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => inputRef.current?.focus()}
        >
          <Search className="w-[16px] h-[16px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]" align="end">
        <form onSubmit={handleSubmit} className="p-2">
          <div className="flex items-center space-x-2">
            <Input
              ref={inputRef}
              name="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-grow"
            />
            <Button type="submit" className="bg-primary hover:bg-secondary">
              Search
            </Button>
          </div>
        </form>
        {results.length > 0 && (
          <ul className="py-2">
            {results.map((product) => (
              <li
                key={product._id}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              >
                <button
                  className="w-full text-left"
                  onClick={() => {
                    setQuery(product.name);
                    router.push(
                      `/search?query=${encodeURIComponent(product.name)}`
                    );
                    setIsOpen(false);
                  }}
                  aria-label={`Search for ${product.name} priced at $${product.price.toFixed(2)}`}
                >
                  <span className="font-medium">{product.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
