import React from "react";
import ListingWrapper from "../layout/ListingWrapper";
import Card from "../cards/Card";
import { ButtonMedium } from "../buttons/buttons";
import { getHomePageProducts } from "@/sanity/products/getHomePageProducts";
import { Product } from "@/lib/types";

const CardListing = async () => {
  const products = await getHomePageProducts();

  return (
    <ListingWrapper title="New ceramics">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((card: Product, index: number) => (
          <Card card={card} key={index} />
        ))}
      </div>
      <center>
        <ButtonMedium text="View collection" href="/" />
      </center>
    </ListingWrapper>
  );
};

export default CardListing;
