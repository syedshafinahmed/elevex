import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user as { role?: string } | undefined;
  const isAdmin = user?.role === "ADMIN";

  // /dashboard/users and all subroutes are strictly ADMIN
  if (pathname === "/dashboard/users" || pathname.startsWith("/dashboard/users/")) {
    if (!user || !isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // /dashboard/products (all-products listing table) is strictly ADMIN
  if (pathname === "/dashboard/products") {
    if (!user || !isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // /dashboard/products/:path* (product details/edit) requires authentication at minimum
  if (pathname.startsWith("/dashboard/products/")) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/users/:path*",
    "/dashboard/products",
    "/dashboard/products/:path*",
  ],
};
