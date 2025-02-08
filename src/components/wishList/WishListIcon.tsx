"use client";
import { useWishlistStore } from "@/lib/store";
import { Product } from "@/lib/types";
import { Heart } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

const WishListToggle = ({ product }: { product: Product }) => {
  const { addToWishlist, removeFromWishlist, isItemInWishlist } =
    useWishlistStore();

  if (!product) return null;

  const isWishList = isItemInWishlist(product._id);

  const handleToggleWishlist = () => {
    if (isWishList) {
      removeFromWishlist(product._id); // Remove if already in wishlist
      toast.error("Product has been removed to wishlist");
    } else {
      addToWishlist(product); // Add if not in wishlist
      toast.success("Product has been added to wishlist");
    }
  };

  return (
    <div
      className={`absolute top-14 right-2 h-10 w-10 flex justify-center items-center rounded-full cursor-pointer transition-all duration-300 ${
        isWishList ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
      }`}
      onClick={handleToggleWishlist}
    >
      <Heart
        className={`h-6 w-6 ${
          isWishList ? "text-white opacity-80" : "text-gray-600"
        }`}
      />
    </div>
  );
};

export default WishListToggle;
