import { ShoppingCart } from "lucide-react";
import { ButtonMedium } from "../buttons/buttons";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary px-4">
      {/* Icon Section */}
      <div className="flex items-center justify-center w-24 h-24 mb-6 bg-primary bg-opacity-10 text-white rounded-full">
        <ShoppingCart className="w-12 h-12 text-secondary2" />
      </div>

      {/* Text Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Your Cart is Empty
      </h2>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        It seems like you haven&#39;t added any items to your cart yet. Start
        exploring our amazing collection and fill your cart with your favorites!
      </p>

      {/* Button */}
      <ButtonMedium text="Go To Shop" href="/shop" />
    </div>
  );
}
