import { NextResponse } from "next/server";
import { shipengine } from "@/lib/shipengine";
import { backendClient } from "@/sanity/lib/backendClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await params;

  try {
    const order = await backendClient.fetch(
      `*[_type == "order" && trackingId == $trackingId][0]`,
      { trackingId }
    );

    console.log("Order", order);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // console.log("Order", order);

    // const trackingInfo =
    //   await shipengine.trackUsingCarrierCodeAndTrackingNumber({
    //     carrierCode: order.carrierCode,
    //     trackingNumber: order.trackingNumber,
    //   });

    return NextResponse.json({ success: true, trackingInfo: order });
  } catch (error) {
    console.error("Error fetching tracking info:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tracking information" },
      { status: 500 }
    );
  }
}
