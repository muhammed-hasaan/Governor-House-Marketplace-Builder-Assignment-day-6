"use client";
import { Product } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";

const BuyNow = ({ product }: { product: Product }) => {
  const { addItem } = useCartStore();
  const router = useRouter();
  const handleBuyNowClick = () => {
    // Add logic to add product to cart
    // console.log("Adding product to cart:", product);

    // Display success message
    addItem(product);
    router.push("/cart"); // Navigate to cart page if successful

    // Display success message

    toast.success("Product added to cart!");
  };
  return (
    <button
      className="bg-darkPrimary text-white w-[150px] font-satoshi text-satoshi-16 my-6 inline-block text-center capitalize disabled:bg-primary disabled:cursor-not-allowed mr-24 px-4 rounded-sm py-2 "
      onClick={handleBuyNowClick}
      disabled={product.quantity === 0 || product.quantity <= 0}
      aria-label="handle buy now"
    >
      Buy Now
    </button>
  );
};

export default BuyNow;
