import { defineType, defineField } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "customerId",
      title: "Customer ID",
      type: "string",
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
    }),
    defineField({
      name: "orderStatus",
      title: "Order Status",
      type: "string",
      options: {
        list: ["pending", "shipped", "delivered", "canceled"],
      },
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        defineField({
          name: "street",
          title: "Street",
          type: "string",
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
        }),
        defineField({
          name: "state",
          title: "State",
          type: "string",
        }),
        defineField({
          name: "postalCode",
          title: "Postal Code",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "orderItems",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "productId",
              title: "Product ID",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "productName",
              title: "Product Name",
              type: "string",
            }),
            defineField({
              name: "quantity",
              title: "Quantity",
              type: "number",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "number",
            }),
            defineField({
              name: "subtotal",
              title: "Subtotal",
              type: "number",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    }),
    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: ["cashOnDelivery", "creditCard", "debitCard", "paypal"],
      },
    }),
    defineField({
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: ["pending", "paid", "failed"],
      },
    }),
    defineField({
      name: "trackingId",
      title: "Tracking ID",
      type: "string",
    }),
    defineField({
      name: "trackingStatus",
      title: "Tracking Status",
      type: "string",
      options: {
        list: ["pending", "shipped", "inTransit", "delivered"],
      },
    }),
    defineField({
      name: "shipDate",
      title: "Ship Date",
      type: "datetime",
    }),
    defineField({
      name: "shipFrom",
      title: "Ship From",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Name",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "string",
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
        }),
        defineField({
          name: "state",
          title: "State",
          type: "string",
        }),
        defineField({
          name: "postalCode",
          title: "Postal Code",
          type: "string",
        }),
        defineField({
          name: "countryCode",
          title: "Country Code",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "returnTo",
      title: "Return To",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Name",
          type: "string",
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "string",
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
        }),
        defineField({
          name: "state",
          title: "State",
          type: "string",
        }),
        defineField({
          name: "postalCode",
          title: "Postal Code",
          type: "string",
        }),
        defineField({
          name: "countryCode",
          title: "Country Code",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "totalWeight",
      title: "Total Weight",
      type: "number",
    }),
    defineField({
      name: "labelMessages",
      title: "Label Messages",
      type: "object",
      fields: [
        defineField({
          name: "reference1",
          title: "Reference 1",
          type: "string",
        }),
        defineField({
          name: "reference2",
          title: "Reference 2",
          type: "string",
        }),
        defineField({
          name: "reference3",
          title: "Reference 3",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "insuranceProvider",
      title: "Insurance Provider",
      type: "string",
      options: {
        list: ["none", "thirdParty", "selfInsured"],
      },
    }),
  ],
});
