"use client";
import React, { useState } from "react";
import { Product } from "@/lib/types";
import { CartItem, useCartStore } from "@/lib/store";
import { toast } from "react-toastify";

const AddToCartAndQuantity = ({ product }: { product: Product }) => {
  const { addItem, isItemInCart, updateQuantity, cartItems } = useCartStore();
  const [newQuantity, setNewQuantity] = useState(1);

  const handleAddToCart = () => {
    // @ts-expect-error before adding to cart store is not supported
    addItem({ ...product, cartQuantity: newQuantity });
    toast.success("Added to cart");
  };

  const isCart = isItemInCart(product._id);
  const cartItem = cartItems.find((item) => item._id === product._id);

  const handleQuantityChange = (change: number) => {
    if (isCart && cartItem) {
      const newQuantity = Math.max(1, cartItem.cartQuantity + change);

      // Prevent further action if quantity doesn't change
      if (newQuantity === cartItem.cartQuantity) {
        return; // Exit early
      }

      updateQuantity(product._id, newQuantity);
      toast.success(`Quantity updated to ${newQuantity} for ${product.name}.`);
    } else {
      setNewQuantity((prevQuantity) => {
        const newQuantity = Math.max(1, prevQuantity + change);

        // Prevent further action if quantity doesn't change
        if (newQuantity === prevQuantity) {
          return prevQuantity; // Return the current value without updating
        }

        toast.success(
          `Quantity changed to ${newQuantity} for ${product.name}.`
        );

        return newQuantity;
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center w-full">
      {isCart && (
        <div className="font-clash text-clash-14 text-[#505977] flex flex-col lg:flex-row lg:gap-6 items-start lg:items-center lg:my-10 w-full">
          <span>Quantity:</span>
          <div className="bg-borderGrey px-6 flex flex-row space-x-10 py-4 text-satoshi-16 font-satoshi w-full lg:w-auto justify-between lg:justify-center">
            <span
              className="text-borderDark cursor-pointer"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </span>
            <span className="text-darkPrimary">
              {isCart && cartItem ? cartItem.cartQuantity : newQuantity}
            </span>
            <span
              className="text-borderDark cursor-pointer"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </span>
          </div>
        </div>
      )}
      <div className="w-full lg:w-auto mt-4 lg:mt-0">
        {product.quantity > 0 ? (
          <>
            <button
              className={`bg-darkPrimary text-white font-satoshi text-satoshi-16 px-[32px] py-[16px] my-6 inline-block text-center w-full sm:w-max capitalize ${isCart ? "hidden" : "visible"}`}
              onClick={handleAddToCart}
              aria-label="handleAddToCart"
            >
              Add to cart
            </button>
            {isCart && (
              <button className="bg-darkPrimary text-white font-satoshi text-satoshi-16 px-[32px] py-[16px] my-6 inline-block text-center w-full sm:w-max capitalize cursor-not-allowed opacity-50">
                Added To Cart
              </button>
            )}
          </>
        ) : (
          <button
            className="w-full px-8 py-3 bg-gray-300 text-gray-600 cursor-not-allowed font-satoshi"
            disabled
            aria-label="handleOutOfStock"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default AddToCartAndQuantity;
