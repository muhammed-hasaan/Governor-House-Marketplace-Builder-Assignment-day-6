import React from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import BuyNow from "../buttons/BuyNow";

const ShortDetail = ({ product }: { product: Product }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="absolute z-20 h-10 w-10 rounded-full flex justify-center items-center bg-white right-2 top-2"
          aria-label="Toggle visibility"
        >
          <Eye className="h-6 w-6 text-gray-600" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="grid gap-4 py-4">
            <div className="aspect-square relative">
              {product.image?.asset && (
                <Image
                  src={
                    urlFor(product.image?.asset).url() || "/images/product.jpg"
                  }
                  alt={product.name}
                  width={400}
                  height={400}
                  className="rounded-md w-[400px] object-cover"
                />
              )}
            </div>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">${product.price}</span>
              <Badge variant="secondary">{product.quantity} in stock</Badge>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dimensions:</h3>
              <p className="text-sm">
                {product.dimensions.width} x {product.dimensions.height} x{" "}
                {product.dimensions.depth}
              </p>
            </div>
            <BuyNow product={product} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ShortDetail;
