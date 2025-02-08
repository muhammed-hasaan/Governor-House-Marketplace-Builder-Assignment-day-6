"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LoadingState,
  NoTrackingInfo,
} from "@/components/global/status-messages";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Truck, Calendar, CreditCard } from "lucide-react";

interface TrackingInfo {
  trackingId: string;
  trackingStatus: string;
  shipDate: string;
  orderDate: string;
  orderStatus: string;
  paymentMethod: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    countryCode: string;
  };
  orderItems: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}

interface TrackingInfoResponse {
  success: boolean;
  trackingInfo: TrackingInfo | null;
  error?: string;
}

export default function TrackOrderPage() {
  const { trackingId } = useParams();
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrackingInfo() {
      try {
        const response = await fetch(`/api/track-order/${trackingId}`);
        const data: TrackingInfoResponse = await response.json();
        if (data.success) {
          setTrackingInfo(data.trackingInfo);
        } else {
          throw new Error(data.error || "Failed to fetch tracking information");
        }
      } catch (error) {
        console.error("Error fetching tracking info:", error);
        alert("Unable to fetch tracking information. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchTrackingInfo();
  }, [trackingId]);

  if (loading) {
    return <LoadingState />;
  }

  if (!trackingInfo) {
    return <NoTrackingInfo />;
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Package className="mr-2" /> Order Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Order Details</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Truck className="mr-2" size={18} />
                  <span className="font-medium">Tracking Number:</span>
                  <span className="ml-2">{trackingInfo.trackingId}</span>
                </p>
                <p className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    {trackingInfo.trackingStatus}
                  </Badge>
                  <span className="font-medium">Status</span>
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2" size={18} />
                  <span className="font-medium">Ship Date:</span>
                  <span className="ml-2">
                    {new Date(trackingInfo.shipDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="flex items-center">
                  <Calendar className="mr-2" size={18} />
                  <span className="font-medium">Order Date:</span>
                  <span className="ml-2">
                    {new Date(trackingInfo.orderDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="flex items-center">
                  <Badge variant="secondary" className="mr-2">
                    {trackingInfo.orderStatus}
                  </Badge>
                  <span className="font-medium">Order Status</span>
                </p>
                <p className="flex items-center">
                  <CreditCard className="mr-2" size={18} />
                  <span className="font-medium">Payment Method:</span>
                  <span className="ml-2">{trackingInfo.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium">
                  {trackingInfo.shippingAddress.name}
                </p>
                <p>{trackingInfo.shippingAddress.street}</p>
                <p>{`${trackingInfo.shippingAddress.city}, ${trackingInfo.shippingAddress.state} ${trackingInfo.shippingAddress.postalCode}`}</p>
                <p>{trackingInfo.shippingAddress.countryCode}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="text-xl font-semibold mb-4">Order Items</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trackingInfo.orderItems.map((item, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{item.productName}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ${item.price.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
