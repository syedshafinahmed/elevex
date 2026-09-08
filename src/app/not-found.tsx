"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Home,
  ShoppingBag,
  Layers,
  HelpCircle,
  MoveRight,
} from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className={`${sansation.className} relative min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 overflow-hidden`}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Main Card */}
        <div className="w-full rounded-3xl p-8 sm:p-12 flex flex-col items-center gap-6 relative">
          {/* Large Stylized 404 Number */}
          <div className="relative my-2 select-none">
            <span
              className={`${pinkAverage.className} text-7xl sm:text-9xl font-extrabold text-foreground/10 tracking-wider absolute inset-0 -top-1 blur-[1px]`}
            >
              404
            </span>
            <span
              className={`${pinkAverage.className} text-7xl sm:text-9xl font-extrabold bg-gradient-to-b from-foreground via-foreground/85 to-primary bg-clip-text text-transparent tracking-wider`}
            >
              404
            </span>
          </div>

          {/* Heading & Description */}
          <div className="flex flex-col gap-3 max-w-md">
            <h1
              className={`${pinkAverage.className} text-2xl sm:text-4xl text-foreground font-bold tracking-tight`}
            >
              Trade Route Not Found
            </h1>
            <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
              The commodity, terminal, or waypoint you are looking for has been
              relocated, expired, or does not exist on our global registry.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-foreground/15 bg-background text-foreground/80 text-xs font-semibold transition-all cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary text-white text-xs font-semibold shadow-md shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-foreground/15 bg-background text-foreground/80 text-xs font-semibold transition-all cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
