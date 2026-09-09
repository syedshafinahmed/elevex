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

import Button from "@/app/components/ui/Button";

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
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => router.back()}
              className="border border-foreground/15 inset-shadow-foreground/30 inset-shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Button>

            <Button
              href="/"
              variant="primary"
              size="sm"
            >
              <Home className="h-4 w-4" />
              <span>Return Home</span>
            </Button>

            <Button
              href="/products"
              variant="secondary"
              size="sm"
              className="border border-foreground/15 inset-shadow-foreground/30 inset-shadow-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Browse Catalog</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
