"use client";
import React from "react";
import { useCartStore } from "@/lib/store";

const CartIcon = () => {
  const { totalQuantity } = useCartStore();
  return (
    <>
      {totalQuantity > 0 && (
        <div className="absolute top-[-8px] rounded-full text-sm right-[-12px] bg-primary text-white flex justify-center items-center h-6 w-6">
          {totalQuantity}
        </div>
      )}
    </>
  );
};

export default CartIcon;
