import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderItemType = defineType({
  name: "orderItem",
  title: "OrderItems",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "productId",
      type: "reference",
      to: [{ type: "product" }],
    }),
    defineField({
      name: "orderId",
      type: "reference",
      to: [{ type: "order" }],
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
    }),
    defineField({ name: "quantity", type: "number", title: "Quantity" }),
  ],
  preview: {
    select: {
      title: "productId.name",
      price: "price",
      quantity: "quantity",
    },
    prepare(selection) {
      const { title, price, quantity } = selection;
      return {
        title: `${title} - $${price.toFixed(2)} x ${quantity}`,
      };
    },
  },
});
