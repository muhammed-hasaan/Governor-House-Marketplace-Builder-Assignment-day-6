import { clerkMiddleware } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/shop",
  "/shop/(.*)", // Allow all product routes
  "/categories/(.*)", // Allow all category routes
  "/api/(.*)", // Public API routes
  "/checkout/sso-callback", // Add this to allow Clerk's SSO callback
];

export default clerkMiddleware({
  // @ts-expect-error clerk middleware types issue conflict
  publicRoutes: publicRoutes,
  afterAuth: async (auth: any, req: NextRequest) => {
    console.log("Auth", auth);

    const currentPath = req.nextUrl.pathname;

    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some((route) =>
      currentPath.startsWith(route)
    );

    // If it's not a public route and user is not authenticated
    if (!isPublicRoute && !auth.userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Allow the request to proceed
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
