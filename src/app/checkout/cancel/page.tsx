"use client";

import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";

export default function CheckoutCancelPage() {
  return (
    <div className={`${sansation.className} min-h-[70vh] flex items-center justify-center px-4`}>
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-8 ring-red-500/5">
          <XCircle className="h-12 w-12" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className={`${pinkAverage.className} text-3xl sm:text-4xl text-foreground`}>
            Payment Cancelled
          </h1>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Your payment was cancelled. No charges were made and your cart items are still saved. You can continue shopping or try again.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full">
          <Link
            href="/dashboard/cart"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Cart</span>
          </Link>
          <Link
            href="/products"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-foreground/15 px-5 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5 transition-all"
          >
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
