"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2, Package } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/types";
import { useWishlistStore } from "@/lib/store";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { toast } from "react-toastify";
import ProductCard from "@/components/cards/Card";

interface WishListClientProps {
  products: Product[];
}

export default function WishListClient({ products }: WishListClientProps) {
  const [mounted, setMounted] = useState(false);
  const wishlistItems = useWishlistStore((state) => state.wishlistItems);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const moveToCart = useWishlistStore((state) => state.moveToCart);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-center mb-2">
            Your wishlist is empty
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Items added to your wishlist will appear here
          </p>
          <Button variant="outline" size="lg">
            <Link href={"/shop"}>Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="container mx-auto py-8 px-4 sm:px-20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item: Product) => (
              <Card key={item._id} className="flex flex-col">
                <CardHeader className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    {item.image?.asset && (
                      <Image
                        src={
                          urlFor(item.image?.asset).url() || "/placeholder.svg"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle className="line-clamp-1 mb-2">
                    {item.name}
                  </CardTitle>
                  <p className="text-2xl font-bold">${item.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 gap-2 flex-col">
                  <Button
                    className="w-full bg-primary text-white hover:bg-darkPrimary"
                    onClick={() => {
                      moveToCart(item._id);
                      toast.success("Product Added Successfully!");
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Move to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      removeFromWishlist(item._id);
                      toast.success("Product Removed successfully ");
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      <p className="px-4 sm:px-20 font-satoshi text-satoshi-18">
        Featured Products
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:px-20 py-10">
        {products.map((product) => (
          <ProductCard key={product._id} card={product} />
        ))}
      </div>
    </>
  );
}
