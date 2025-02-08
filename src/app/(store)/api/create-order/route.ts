// import { NextResponse } from "next/server";
// import { shipengine } from "@/lib/shipengine";
// import { backendClient } from "@/sanity/lib/backendClient";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     console.log("Body", body);

//     if (!body.fullName || body.fullName.length > 35) {
//       console.error(
//         "Full name is required and must be less than 35 characters"
//       );
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Full name is required and must be less than 35 characters",
//         },
//         { status: 400 }
//       );
//     }

//     // Validate address fields
//     const address = body.shippingAddress;
//     if (!address.street || address.street.length > 35) {
//       return NextResponse.json(
//         {
//           success: false,
//           error:
//             "Street address is required and must be less than 35 characters",
//         },
//         { status: 400 }
//       );
//     }

//     // Decrease product quantities
//     for (const item of body.orderItems) {
//       await backendClient
//         .patch(item.productId._ref) // Reference the product by its ID
//         .dec({ quantity: item.quantity }) // Decrease the stock by the ordered quantity
//         .commit();
//     }

//     const shipmentResponse = await shipengine.getRatesWithShipmentDetails({
//       rateOptions: {
//         carrierIds: [
//           process.env.CARRIER_ID_ONE!,
//           process.env.CARRIER_ID_TWO!,
//           process.env.CARRIER_ID_THREE!,
//           process.env.CARRIER_ID_FOUR!,
//         ],
//       },
//       shipment: {
//         shipTo: {
//           name: body.fullName,
//           phone: body.phone,
//           addressLine1: body.shippingAddress.street,
//           cityLocality: body.shippingAddress.city,
//           stateProvince: body.shippingAddress.state,
//           postalCode: body.shippingAddress.postalCode,
//           countryCode: "US",
//           addressResidentialIndicator: "yes",
//         },
//         shipFrom: {
//           companyName: "Example Corp.",
//           name: "John Doe",
//           phone: "111-111-1111",
//           addressLine1: "4009 Marathon Blvd",
//           addressLine2: "Suite 300",
//           cityLocality: "Austin",
//           stateProvince: "TX",
//           postalCode: "78756",
//           countryCode: "US",
//           addressResidentialIndicator: "no",
//         },
//         packages: [
//           {
//             weight: {
//               value: 1,
//               unit: "pound",
//             },
//             dimensions: {
//               length: 12,
//               width: 8,
//               height: 6,
//               unit: "inch",
//             },
//           },
//         ],
//       },
//     });

//     const orderData = {
//       _type: "order",
//       customerId: body.customerId || "customer-id",
//       orderDate: new Date().toISOString(),
//       orderStatus: "pending",
//       shippingAddress: {
//         street: shipmentResponse.shipTo?.addressLine1 || "123132dasda",
//         city: shipmentResponse.shipTo?.cityLocality || "dsadsa",
//         state: shipmentResponse.shipTo?.stateProvince || "AZ",
//         postalCode: shipmentResponse.shipTo?.postalCode || "12345",
//       },
//       orderItems: body.orderItems.map((item: any) => ({
//         _key: item._key,
//         productId: { _type: "reference", _ref: item.productId._ref },
//         productName: item.productName,
//         quantity: item.quantity,
//         price: item.price,
//         subtotal: item.subtotal,
//       })),
//       totalAmount: body.totalAmount,
//       paymentMethod: body.paymentMethod,
//       paymentStatus: "pending",
//       trackingId: shipmentResponse.shipmentId,
//       trackingStatus: shipmentResponse.shipmentStatus,
//       shipDate: shipmentResponse.shipDate,
//       shipFrom: {
//         name: shipmentResponse.shipFrom?.name,
//         address: shipmentResponse.shipFrom?.addressLine1,
//         city: shipmentResponse.shipFrom?.cityLocality,
//         state: shipmentResponse.shipFrom?.stateProvince,
//         postalCode: shipmentResponse.shipFrom?.postalCode,
//         countryCode: shipmentResponse.shipFrom?.countryCode,
//       },
//       returnTo: {
//         name: shipmentResponse.returnTo.name,
//         address: shipmentResponse.returnTo.addressLine1,
//         city: shipmentResponse.returnTo.cityLocality,
//         state: shipmentResponse.returnTo.stateProvince,
//         postalCode: shipmentResponse.returnTo.postalCode,
//         countryCode: shipmentResponse.returnTo.countryCode,
//       },
//       totalWeight: shipmentResponse.totalWeight.value,
//       labelMessages: shipmentResponse.packages[0]?.labelMessages || {},
//       insuranceProvider: shipmentResponse.insuranceProvider || "none",
//     };

//     // console.log("Order Data", orderData);

//     const result = await backendClient.create(orderData);

//     return NextResponse.json({
//       success: true,
//       message: "Order created successfully",
//       orderDetails: {
//         orderId: result._id,
//         trackingId: shipmentResponse.shipmentId,
//         orderStatus: shipmentResponse.shipmentStatus,
//         shippingDetails: {
//           address: {
//             street: shipmentResponse.shipTo?.addressLine1,
//             city: shipmentResponse.shipTo?.cityLocality,
//             state: shipmentResponse.shipTo?.stateProvince,
//             postalCode: shipmentResponse.shipTo?.postalCode,
//           },
//           shipDate: shipmentResponse.shipDate,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to create order",
//         details: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { shipengine } from "@/lib/shipengine";
import { backendClient } from "@/sanity/lib/backendClient";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(request: Request) {
  try {
    const { userId, getToken } = await auth();
    console.log("User", userId, getToken);

    if (!userId) {
      return NextResponse.json(
        {
          error:
            "Access denied. Please sign in or create an account to continue.",
          success: false,
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    console.log("Body", body);

    if (!body.fullName || body.fullName.length > 35) {
      console.error(
        "Full name is required and must be less than 35 characters"
      );
      return NextResponse.json(
        {
          success: false,
          error: "Full name is required and must be less than 35 characters",
        },
        { status: 400 }
      );
    }

    // Validate address fields
    const address = body.shippingAddress;
    if (!address.street || address.street.length > 35) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Street address is required and must be less than 35 characters",
        },
        { status: 400 }
      );
    }

    // Decrease product quantities
    for (const item of body.orderItems) {
      await backendClient
        .patch(item.productId._ref)
        .dec({ quantity: item.quantity })
        .commit();
    }

    const shipmentResponse = await shipengine.getRatesWithShipmentDetails({
      rateOptions: {
        carrierIds: [
          process.env.SHIPENGINE_FIRST_COURIER! || "",
          process.env.SHIPENGINE_SECOND_COURIER! || "",
          process.env.SHIPENGINE_THIRD_COURIER! || "",
          process.env.SHIPENGINE_FOURTH_COURIER! || "",
        ].filter(Boolean),
      },
      shipment: {
        shipTo: {
          name: body.fullName,
          phone: body.phone,
          addressLine1: body.shippingAddress.street,
          cityLocality: body.shippingAddress.city,
          stateProvince: body.shippingAddress.state,
          postalCode: body.shippingAddress.postalCode,
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        shipFrom: {
          companyName: "Example Corp.",
          name: "John Doe",
          phone: "111-111-1111",
          addressLine1: "4009 Marathon Blvd",
          addressLine2: "Suite 300",
          cityLocality: "Austin",
          stateProvince: "TX",
          postalCode: "78756",
          countryCode: "US",
          addressResidentialIndicator: "no",
        },
        packages: [
          {
            weight: {
              value: 1,
              unit: "pound",
            },
            dimensions: {
              length: 12,
              width: 8,
              height: 6,
              unit: "inch",
            },
          },
        ],
      },
    });

    // console.log(
    //   "ShipMent Rate",
    //   shipmentResponse.rateResponse.rates?.[0].rateId
    // );

    if (!shipmentResponse) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to retrieve shipping rates",
        },
        { status: 501 }
      );
    }

    const labelDetails = await shipengine.createLabelFromRate({
      rateId: shipmentResponse.rateResponse.rates?.[0].rateId as string,
    });

    const trackingInfo = await shipengine.trackUsingLabelId(
      labelDetails.labelId
    );

    // console.log("Label Details", trackingInfo);

    const orderData = {
      _type: "order",
      customerId: userId || "customer-id",
      orderDate: new Date().toISOString(),
      orderStatus: "pending",
      shippingAddress: {
        street: shipmentResponse.shipTo?.addressLine1 || "123132dasda",
        city: shipmentResponse.shipTo?.cityLocality || "dsadsa",
        state: shipmentResponse.shipTo?.stateProvince || "AZ",
        postalCode: shipmentResponse.shipTo?.postalCode || "12345",
      },
      orderItems: body.orderItems.map((item: any) => ({
        _key: item._key,
        productId: { _type: "reference", _ref: item.productId._ref },
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      })),
      totalAmount: body.totalAmount,
      paymentMethod: body.paymentMethod,
      paymentStatus: "pending",
      trackingId: trackingInfo.trackingNumber,
      trackingStatus: shipmentResponse.shipmentStatus,
      shipDate: shipmentResponse.shipDate,
      shipFrom: {
        name: shipmentResponse.shipFrom?.name,
        address: shipmentResponse.shipFrom?.addressLine1,
        city: shipmentResponse.shipFrom?.cityLocality,
        state: shipmentResponse.shipFrom?.stateProvince,
        postalCode: shipmentResponse.shipFrom?.postalCode,
        countryCode: shipmentResponse.shipFrom?.countryCode,
      },
      returnTo: {
        name: shipmentResponse.returnTo.name,
        address: shipmentResponse.returnTo.addressLine1,
        city: shipmentResponse.returnTo.cityLocality,
        state: shipmentResponse.returnTo.stateProvince,
        postalCode: shipmentResponse.returnTo.postalCode,
        countryCode: shipmentResponse.returnTo.countryCode,
      },
      totalWeight: shipmentResponse.totalWeight.value,
      labelMessages: shipmentResponse.packages[0]?.labelMessages || {},
      insuranceProvider: shipmentResponse.insuranceProvider || "none",
    };

    const result = await backendClient.create(orderData);

    if (body.paymentMethod === "creditCard") {
      // Create Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: body.orderItems.map((item: any) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.productName,
            },
            unit_amount: item.price * 100, // Stripe expects amounts in cents
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
        metadata: {
          orderId: result._id,
        },
      });

      // console.log("Sessions completed", session);

      return NextResponse.json({
        success: true,
        message: "Stripe session created",
        sessionId: session.id,
        url: session.url,
      });
    } else {
      // For COD, return the same response as before
      return NextResponse.json({
        success: true,
        message: "Order created successfully",
        orderDetails: {
          orderId: result._id,
          trackingId: trackingInfo.trackingNumber,
          orderStatus: shipmentResponse.shipmentStatus,
          shippingDetails: {
            address: {
              street: shipmentResponse.shipTo?.addressLine1,
              city: shipmentResponse.shipTo?.cityLocality,
              state: shipmentResponse.shipTo?.stateProvince,
              postalCode: shipmentResponse.shipTo?.postalCode,
            },
            shipDate: shipmentResponse.shipDate,
          },
        },
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
