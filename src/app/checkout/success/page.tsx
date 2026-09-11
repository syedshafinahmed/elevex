"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package } from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart, fetchImportsFromAPI } = useProducts();

  useEffect(() => {
    if (!sessionId) return;
    clearCart();
    fetchImportsFromAPI();
  }, [sessionId]);

  return (
    <div className={`${sansation.className} min-h-[70vh] flex items-center justify-center px-4`}>
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
          <CheckCircle2 className="h-12 w-12" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className={`${pinkAverage.className} text-3xl sm:text-4xl text-foreground`}>
            Payment Successful!
          </h1>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Your consignment has been allocated and payment confirmed. Your imported commodities are now available in your import portfolio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full">
          <Link
            href="/dashboard/imports"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all"
          >
            <Package className="h-4 w-4" />
            <span>View My Imports</span>
          </Link>
          <Link
            href="/products"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-foreground/15 px-5 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5 transition-all"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
