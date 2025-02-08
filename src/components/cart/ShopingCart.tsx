"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ButtonMediumDark } from "../buttons/buttons";
import { urlFor } from "@/sanity/lib/image";
import { X } from "lucide-react";
import CartSkeleton from "./CartSkeletion";
import EmptyCart from "./EmptyCart";
import { useCartStore } from "@/lib/store";
import { toast } from "react-toastify";

export default function ShoppingCart() {
  const { cartItems, updateQuantity, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.cartQuantity,
    0
  );
  if (loading) {
    return (
      <>
        <section className="px-4 sm:px-10 lg:px-20 pb-20 flex flex-col gap-y-10">
          <CartSkeleton />
        </section>
      </>
    );
  }

  if (cartItems.length === 0 || cartItems.length <= 0) {
    return <EmptyCart />;
  }

  return (
    <div className={`min-h-screen bg-white p-4 md:p-6 font-satoshi`}>
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 font-clash text-clash-24 sm:text-clash-36">
          Your shopping cart
        </h1>

        {/* Desktop Header - Hidden on Mobile */}
        <div className="mb-8 hidden grid-cols-[2fr,1fr,1fr] gap-4 md:grid">
          <div className="font-clash text-clash-14">Product</div>
          <div className="text-center font-clash text-clash-14">Quantity</div>
          <div className="text-right font-clash text-clash-14">Total</div>
        </div>

        {/* Product List */}
        <div className="space-y-4">
          {cartItems.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-1 gap-4 border-b border-gray-200 pb-4 md:grid-cols-[2fr,1fr,1fr] md:items-center"
            >
              {/* Product Info */}
              <div className="flex gap-4 relative">
                <div className="h-42 w-28 flex-shrink-0 overflow-hidden rounded-none bg-gray-100">
                  {product.image?.asset && (
                    <Image
                      src={
                        urlFor(product.image.asset).url() || "/placeholder.svg"
                      }
                      alt={product.name}
                      width={96}
                      height={140}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div
                  className="absolute bg-darkPrimary text-white rounded-full h-8 w-8 flex justify-center items-center cursor-pointer z-[20] top-[-10px] left-[-10px]"
                  onClick={() => {
                    removeItem(product._id);
                    toast.success("Product has been removed");
                  }}
                >
                  <X />
                </div>
                <div>
                  <h3 className="font-clash text-clash-20">{product.name}</h3>
                  <p className="mt-1 text-sm text-satoshi-14 font-satoshi">
                    {product.description}
                  </p>
                  <p className="mt-1 text-satoshi-14 font-satoshi">
                    ${product.price}
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-start md:justify-center">
                <div className="bg-borderGrey px-6 flex flex-row space-x-10 py-4 text-satoshi-16 font-satoshi w-full lg:w-auto justify-between lg:justify-center">
                  {/* Decrement Button */}
                  <span
                    className="text-borderDark cursor-pointer"
                    onClick={() => {
                      if (product.cartQuantity > 1) {
                        updateQuantity(product._id, product.cartQuantity - 1);
                        toast.success("Quantity decremented successfully");
                      }
                    }}
                  >
                    -
                  </span>

                  {/* Current Quantity */}
                  <span className="text-darkPrimary">
                    {product.cartQuantity}
                  </span>

                  {/* Increment Button */}
                  <span
                    className="text-borderDark cursor-pointer"
                    onClick={() => {
                      updateQuantity(product._id, product.cartQuantity + 1);
                      toast.success("Quantity incremented successfully");
                    }}
                  >
                    +
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="text-right">
                ${(product.price * product.cartQuantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="flex items-end flex-col mt-8 space-y-4">
          <div className="flex gap-4 items-center">
            <span className="text-primary font-clash text-clash-20">
              Subtotal
            </span>
            <span className="text-clash-24 font-clash">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <p className="text-primary font-satoshi text-satoshi-14">
            Taxes and shipping are calculated at checkout
          </p>
          <ButtonMediumDark text="Go to checkout" href="/checkout" />
        </div>
      </div>
    </div>
  );
}
