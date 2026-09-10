"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { sansation } from "@/lib/fonts";

interface ProductCardSkeletonProps {
  viewMode?: "grid" | "list";
}

export function ProductCardSkeleton({ viewMode = "grid" }: ProductCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <div
        className={`${sansation.className} relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm`}
      >
        {/* Left: Image & Info */}
        <div className="flex items-center gap-3.5 min-w-[260px]">
          <Skeleton className="h-24 w-24 shrink-0 !rounded-2xl" />

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {/* Category badge & Country origin */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 !rounded-md" />
              <Skeleton className="h-3.5 w-24 !rounded-md" />
            </div>

            {/* Product Title */}
            <Skeleton className="h-4 w-3/4 !rounded-md" />

            {/* Exporter & HS code */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-20 !rounded-md" />
              <Skeleton className="h-3 w-16 !rounded-md" />
            </div>
          </div>
        </div>

        {/* Center: Specs & Stock */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-2.5 w-16 !rounded-sm" />
            <Skeleton className="h-4 w-20 !rounded-md" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-2.5 w-10 !rounded-sm" />
            <Skeleton className="h-5 w-24 !rounded-md" />
          </div>
        </div>

        {/* Right: CTA Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Skeleton className="h-9 w-28 !rounded-2xl" />
          <Skeleton className="h-9 w-28 !rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${sansation.className} relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm`}
    >
      <div>
        {/* 1. Product Image Skeleton */}
        <div className="relative h-44 w-full overflow-hidden rounded-2xl mb-3">
          <Skeleton className="h-full w-full !rounded-2xl" />
        </div>

        {/* 2. Country & Category Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3.5 w-3.5 !rounded-full" />
            <Skeleton className="h-3.5 w-20 !rounded-md" />
          </div>
          <Skeleton className="h-4 w-14 !rounded-md" />
        </div>

        {/* 3. Product Title (2-line placeholder) */}
        <div className="flex flex-col gap-1.5 min-h-[38px] mb-2">
          <Skeleton className="h-4 w-11/12 !rounded-md" />
          <Skeleton className="h-3.5 w-3/4 !rounded-md" />
        </div>

        {/* 4. Price & Available Stock */}
        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-2.5 w-10 !rounded-sm" />
            <Skeleton className="h-6 w-24 !rounded-md" />
          </div>

          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-2.5 w-16 !rounded-sm" />
            <Skeleton className="h-4 w-14 !rounded-md" />
          </div>
        </div>

        {/* 5. Stock Depth Micro Progress Bar */}
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <Skeleton className="h-full w-2/3 !rounded-full" />
        </div>
      </div>

      {/* 6. Dual CTA Buttons */}
      <div className="mt-3.5 pt-1 grid grid-cols-2 gap-2">
        <Skeleton className="h-9 w-full !rounded-2xl" />
        <Skeleton className="h-9 w-full !rounded-2xl" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, viewMode = "grid" }: { count?: number; viewMode?: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: count }).map((_, idx) => (
          <ProductCardSkeleton key={idx} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} viewMode="grid" />
      ))}
    </div>
  );
}

export default ProductCardSkeleton;
