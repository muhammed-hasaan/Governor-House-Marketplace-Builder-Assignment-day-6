import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { urlFor } from "@/sanity/lib/image";
import ShortDetail from "../global/ShortDetail";
import WishListIcon from "../wishList/WishListIcon";

interface CardProps {
  card: Product;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-5 w-[200px]" />
      </div>
    );
  }

  return (
    <div className="cursor-pointer relative">
      <Link href={`/shop/${card.slug.current}`}>
        {card.image?.asset && (
          <Image
            src={urlFor(card.image.asset).url() || "/placeholder.svg"}
            alt={card.name}
            height={375}
            width={305}
            className="w-full h-[350px] object-cover"
          />
        )}
      </Link>
      {card.quantity <= 0 && (
        <div className="absolute top-2 left-2 bg-primary text-white py-1 px-4 rounded-md">
          Out of stock
        </div>
      )}
      <ShortDetail product={card} />
      <WishListIcon product={card} />
      <div className="flex flex-col gap-1 mt-4">
        <Link href={`/shop/${card.slug.current}`}>
          <span className="font-clash text-clash-20 text-darkPrimary">
            {card.name}
          </span>
        </Link>
        <span className="font-satoshi text-satoshi-18 cursor-auto text-darkPrimary">
          ${card.price}
        </span>
      </div>
    </div>
  );
};

export default Card;
