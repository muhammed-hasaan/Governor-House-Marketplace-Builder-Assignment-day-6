import React from "react";
import ListingWrapper from "../layout/ListingWrapper";
import Card from "../cards/Card";
import { ButtonMedium } from "../buttons/buttons";
import { Product } from "@/lib/types";

const ListingProducts = ({
  relatedProducts,
}: {
  relatedProducts: Product[];
}) => {
  return (
    <ListingWrapper title="you might also like">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </div>
      <center>
        <ButtonMedium text="View collection" href="/" />
      </center>
    </ListingWrapper>
  );
};

export default ListingProducts;
