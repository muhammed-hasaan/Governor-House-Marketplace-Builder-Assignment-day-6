
import AddToCartAndQuantity from "@/components/cart/AddToCartAndQuantity";
import FeaturesSection from "@/components/homePage-V1/FeaturesSection";
import WishList from "@/components/homePage-V1/WishList";
import ListingProducts from "@/components/shopDetailPage/ListingProducts";

import { Product } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";
import { getProductBySlug } from "@/sanity/products/getProductBySlug";
import { getRelatedProducts } from "@/sanity/products/getRelatedProducts";
import Image from "next/image";
import React from "react";

interface DetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductListingPage = async ({ params }: DetailPageProps) => {
  const { slug } = await params;
  const product: Product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <h1 className="text-2xl font-clash text-[#2A254B]">No Product Found</h1>
      </div>
    );
  }
  const relatedProducts = await getRelatedProducts(
    product.category._ref,
    product._id
  );

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 py-10">
        <div>
          {product?.image?.asset ? (
            <Image
              src={urlFor(product.image.asset).url() || "/placeholder.svg"}
              alt={product.name}
              width={720}
              height={560}
              className="w-full md:h-[100%] object-cover"
            />
          ) : (
            <div className="w-full h-[560px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>
        <div className="px-4 sm:px-10 py-6 flex flex-col space-y-6 text-[#2A254B]">
          <div>
            <h1 className="text-clash-36 font-clash">{product.name}</h1>
            <p className="font-satoshi text-satoshi-18">${product.price}</p>
          </div>

          {/* Description and Features */}
          <div className="text-satoshi-16 font-satoshi flex flex-col space-y-4">
            <h4 className="text-clash-16 font-clash mt-4">Description</h4>
            <p>{product.description || "No description available"}</p>

            {product?.features && product.features.length > 0 && (
              <>
                <h4 className="text-clash-16 font-clash mt-4">Key Features</h4>
                <ul className="list-disc pl-10 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Dimensions */}
          {product?.dimensions && (
            <div>
              <h4 className="font-clash text-clash-16 mb-8 mt-6">Dimensions</h4>
              <div className="flex gap-16">
                {product.dimensions.height && (
                  <div className="flex flex-col space-y-2 font-clash text-clash-14">
                    <span>Height</span>
                    <span className="text-[#505977]">
                      {product.dimensions.height}
                    </span>
                  </div>
                )}
                {product.dimensions.width && (
                  <div className="flex flex-col space-y-2 font-clash text-clash-14">
                    <span>Width</span>
                    <span className="text-[#505977]">
                      {product.dimensions.width}
                    </span>
                  </div>
                )}
                {product.dimensions.depth && (
                  <div className="flex flex-col space-y-2 font-clash text-clash-14">
                    <span>Depth</span>
                    <span className="text-[#505977]">
                      {product.dimensions.depth}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <AddToCartAndQuantity product={product} />

          {/* Stock Status */}
          <div className="text-sm font-satoshi">
            <span
              className={
                product.quantity > 0 ? "text-green-600" : "text-red-600"
              }
            >
              {product.quantity > 0
                ? `${product.quantity} items in stock`
                : "Currently out of stock"}
            </span>
          </div>
        </div>
      </section>
      <ListingProducts relatedProducts={relatedProducts} />
      <FeaturesSection alignText="justify-center" />
      <WishList />
    </>
  );
};

export default ProductListingPage;
