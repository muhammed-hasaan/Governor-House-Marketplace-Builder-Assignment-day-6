// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import { useCartStore } from "@/lib/store";

// export default function OrderSuccessPage() {
//   const [status, setStatus] = useState<"loading" | "success" | "error">(
//     "loading"
//   );
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const sessionId = searchParams.get("session_id");

//   const { clearCart } = useCartStore();

//   useEffect(() => {
//     if (sessionId) {
//       const confirmOrder = async () => {
//         try {
//           const response = await fetch(
//             `/api/confirm-order?session_id=${sessionId}`
//           );
//           const data = await response.json();

//           if (data.success) {
//             setStatus("success");
//             // Delay redirect to show success message
//             clearCart();
//             setTimeout(() => router.push("/orders"), 5000);
//           } else {
//             setStatus("error");
//           }
//         } catch (error) {
//           console.error("Error confirming order:", error);
//           setStatus("error");
//         }
//       };

//       confirmOrder();
//     } else {
//       setStatus("error");
//     }
//   }, [sessionId, router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
//         {status === "loading" && (
//           <>
//             <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
//             <h2 className="text-2xl font-semibold mb-2">
//               Confirming Your Order
//             </h2>
//             <p className="text-gray-600">
//               Please wait while we process your order...
//             </p>
//           </>
//         )}

//         {status === "success" && (
//           <>
//             <svg
//               className="h-16 w-16 text-green-500 mx-auto mb-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//             <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
//             <p className="text-gray-600 mb-4">
//               Your order has been successfully processed.
//             </p>
//             <p className="text-sm text-gray-500">
//               Please Wait Redirecting to your orders page...
//             </p>
//           </>
//         )}

//         {status === "error" && (
//           <>
//             <svg
//               className="h-16 w-16 text-red-500 mx-auto mb-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//             <h2 className="text-2xl font-semibold mb-2">
//               Order Confirmation Failed
//             </h2>
//             <p className="text-gray-600 mb-4">
//               There was an error confirming your order. Please contact customer
//               support.
//             </p>
//             <button
//               onClick={() => router.push("/orders")}
//               className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
//             >
//               Go to Orders
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store";

function OrderSuccessContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (sessionId) {
      const confirmOrder = async () => {
        try {
          const response = await fetch(
            `/api/confirm-order?session_id=${sessionId}`
          );
          const data = await response.json();

          if (data.success) {
            setStatus("success");
            clearCart();
            setTimeout(() => router.push("/orders"), 5000);
          } else {
            setStatus("error");
          }
        } catch (error) {
          console.error("Error confirming order:", error);
          setStatus("error");
        }
      };

      confirmOrder();
    } else {
      setStatus("error");
    }
  }, [sessionId, router, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Confirming Your Order
            </h2>
            <p className="text-gray-600">
              Please wait while we process your order...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <svg
              className="h-16 w-16 text-green-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Your order has been successfully processed.
            </p>
            <p className="text-sm text-gray-500">
              Please Wait Redirecting to your orders page...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <svg
              className="h-16 w-16 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-2">
              Order Confirmation Failed
            </h2>
            <p className="text-gray-600 mb-4">
              There was an error confirming your order. Please contact customer
              support.
            </p>
            <button
              onClick={() => router.push("/orders")}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
            >
              Go to Orders
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Loading Order Details</h2>
        <p className="text-gray-600">
          Please wait while we fetch your order information...
        </p>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
