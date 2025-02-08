"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
type Order = {
  _id: string;
  orderDate: string;
  orderStatus: string;
  trackingId: string;
  totalAmount: number;
  paymentStatus: string;
  orderItems: Array<{
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
};

export default function OrderList({ orders }: { orders: Order[] }) {
  const [openOrders, setOpenOrders] = useState<string[]>([]);
  const router = useRouter();
  const normalizedOrders = Array.isArray(orders) ? orders : [orders];

  const toggleOrder = (orderId: string) => {
    setOpenOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="space-y-4 p-4">
      {normalizedOrders.map((order) => (
        <Collapsible
          key={order._id}
          open={openOrders.includes(order._id)}
          className="rounded-lg border bg-white"
        >
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Order ID</TableHead>
                  <TableHead className="w-[200px]">Date</TableHead>
                  <TableHead className="w-[150px]">Status</TableHead>
                  <TableHead className="w-[150px]">Total</TableHead>
                  <TableHead className="w-[150px]">Payment</TableHead>
                  <TableHead className="w-[200px]">Order Track</TableHead>
                  <TableHead className="w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-sm">
                    {order._id}
                  </TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.orderStatus === "delivered"
                          ? "secondary"
                          : "default"
                      }
                      className="bg-black text-white hover:bg-black/90"
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="destructive"
                      className="bg-red-500 hover:bg-red-500/90"
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        router.push(`/track-order/${order.trackingId}`)
                      }
                    >
                      Track Order
                    </Button>
                  </TableCell>
                  <TableCell>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                        onClick={() => toggleOrder(order._id)}
                      >
                        Show Details{" "}
                        {openOrders.includes(order._id) ? "▲" : "▼"}
                      </Button>
                    </CollapsibleTrigger>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <CollapsibleContent>
            <div className="border-t bg-gray-50/50 p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Product</TableHead>
                    <TableHead className="w-1/6">Quantity</TableHead>
                    <TableHead className="w-1/6">Price</TableHead>
                    <TableHead className="w-1/6">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.orderItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatCurrency(item.price)}</TableCell>
                      <TableCell>{formatCurrency(item.subtotal)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
