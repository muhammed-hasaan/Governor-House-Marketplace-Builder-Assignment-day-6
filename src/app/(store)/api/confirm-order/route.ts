import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Invalid session ID" },
        { status: 400 }
      );
    }

    // Get the order ID from the session's metadata
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID not found in session metadata" },
        { status: 400 }
      );
    }

    // Update the order in Sanity
    const updatedOrder = await backendClient
      .patch(orderId)
      .set({
        paymentStatus: "paid",
        orderStatus: "pending", // or 'shipped' depending on your business logic
      })
      .commit();

    // Fetch the updated order details
    const order = await backendClient.fetch(
      `*[_type == "order" && _id == $orderId][0]`,
      { orderId }
    );

    return NextResponse.json({
      success: true,
      message: "Order confirmed successfully",
      orderDetails: {
        orderId: order._id,
        trackingId: order.trackingId,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        shippingDetails: {
          address: order.shippingAddress,
          shipDate: order.shipDate,
        },
        totalAmount: order.totalAmount,
      },
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to confirm order",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
