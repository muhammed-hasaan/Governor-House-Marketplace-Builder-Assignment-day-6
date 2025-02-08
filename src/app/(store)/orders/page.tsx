import { Suspense } from "react";
import OrderList from "./OrderList";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrdersByCustomerId } from "@/sanity/orders/getOrdersByCustomerId";
import { currentUser } from "@clerk/nextjs/server";
import { AuthenticationRequired } from "@/components/global/status-messages";
import Link from "next/link";

export default async function OrderPage() {
  const user = await currentUser();

  // console.log("User ID", user);

  if (!user) {
    return <AuthenticationRequired />;
  }

  const orders = await getOrdersByCustomerId(user?.id);

  console.log("Front", orders);

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-muted-foreground mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-6a3 3 0 113 3h3m-3 0a3 3 0 10-3 3M12 6v.01M6 21h12M6 3h12"
          />
        </svg>
        <h1 className="text-2xl font-bold text-center mb-2">No Orders Found</h1>
        <p className="text-muted-foreground text-center mb-6">
          It seems like you haven’t placed any orders yet. Start exploring our
          collection and make your first purchase!
        </p>
        <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-darkPrimary transition">
          <Link href="/shop">Start Shopping</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
          <CardDescription>View and manage your order history</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading orders...</div>}>
            <OrderList orders={orders} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
