import React from "react";

const CartItemSkeleton: React.FC = () => (
  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center shadow-[0px_4px_10px_rgba(0,0,0,0.25)] py-4 rounded px-4 sm:px-10 animate-pulse">
    {/* Product Column */}
    <div className="w-full sm:w-1/3 flex items-center gap-4 text-left relative">
      <div className="w-12 h-12 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>

    {/* Price Column */}
    <div className="w-1/2 sm:w-1/6 text-center mt-4 sm:mt-0">
      <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
    </div>

    {/* Quantity Column */}
    <div className="w-1/2 sm:w-1/6 flex justify-center text-center mt-4 sm:mt-0">
      <div className="w-[60px] sm:w-[80px] h-8 bg-gray-300 rounded"></div>
    </div>

    {/* Subtotal Column */}
    <div className="w-full sm:w-1/6 text-center mt-4 sm:mt-0">
      <div className="h-4 bg-gray-300 rounded w-20 mx-auto"></div>
    </div>
  </div>
);

const CartSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, index) => (
      <CartItemSkeleton key={index} />
    ))}
  </div>
);

export default CartSkeleton;
