import React from "react";
import ListingWrapper from "../layout/ListingWrapper";
import Card from "../cards/Card";
import Image from "next/image";
import { ButtonMedium } from "../buttons/buttons";
import Link from "next/link";
import { getPopularProducts } from "@/sanity/products/getPopularProducts";
import { Product } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import ShortDetail from "../global/ShortDetail";
import WishListToggle from "../wishList/WishListIcon";

const PopularProducts = async () => {
  const popularProducts = await getPopularProducts();
  if (popularProducts.length === 0) {
    return null; // Or you could return a message saying no popular products found
  }

  const [mainProduct, ...otherProducts] = popularProducts;

  return (
    <ListingWrapper title="Our popular products">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Large Image Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center cursor-pointer relative">
          <Link href={`/shop/${mainProduct.slug.current}`}>
            <Image
              src={urlFor(mainProduct.image.asset).url() || "/placeholder.svg"}
              alt={mainProduct.name}
              height={375}
              width={630}
              className="w-full h-[350px] object-cover"
            />
          </Link>
          <ShortDetail product={mainProduct} />
          <WishListToggle product={mainProduct} />
          <div className="flex flex-col gap-2 mt-4 text-center">
            <Link href={`/shop/${mainProduct.slug.current}`}>
              <span className="font-clash text-clash-20">
                {mainProduct.name}
              </span>
            </Link>
            <span className="font-satoshi text-satoshi-18 cursor-auto">
              ${mainProduct.price}
            </span>
          </div>
        </div>

        {/* Other Products */}
        {otherProducts.map((product: Product) => (
          <div key={product._id} className="col-span-1">
            <Card card={product} />
          </div>
        ))}
      </div>

      {/* Button Section */}
      <div className="mt-6 flex justify-center">
        <ButtonMedium text="View collection" href="/shop" />
      </div>
    </ListingWrapper>
  );
};

export default PopularProducts;
