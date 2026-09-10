"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { sansation } from "@/lib/fonts";

export function ProductsPageSkeleton() {
  return (
    <div className={`${sansation.className} mx-auto max-w-7xl px-4 pt-2 pb-12 sm:py-12 sm:px-6 lg:px-10 flex flex-col gap-8`}>
      {/* 1. Header Banner & Marketplace Metrics */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3.5 w-20 !rounded-md" />
          <Skeleton className="h-9 sm:h-12 w-64 sm:w-80 !rounded-2xl" />
        </div>

        {/* Trade Metrics Counter */}
        <div className="flex items-center gap-4 shrink-0 bg-foreground/2 rounded-2xl border border-foreground/10 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-2.5 w-28 !rounded-sm" />
            <Skeleton className="h-6 w-20 !rounded-md" />
          </div>
          <div className="h-8 w-px bg-foreground/10" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-2.5 w-20 !rounded-sm" />
            <Skeleton className="h-6 w-20 !rounded-md" />
          </div>
        </div>
      </div>

      {/* 2. Advanced Multi-Faceted Filters & Toolbar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-4 sm:p-5 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="flex flex-col xl:flex-row gap-3 items-stretch xl:items-center justify-between">
          <Skeleton className="h-11 w-full flex-1 !rounded-2xl" />

          <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0">
            <Skeleton className="h-11 w-36 sm:w-44 shrink-0 !rounded-2xl" />
            <Skeleton className="h-11 w-36 sm:w-44 shrink-0 !rounded-2xl" />
            <Skeleton className="h-11 w-44 sm:w-48 shrink-0 !rounded-2xl" />
          </div>
        </div>
      </div>

      {/* 3. Filter Results Summary */}
      <div className="flex items-center justify-between gap-2 px-1">
        <Skeleton className="h-4 w-52 !rounded-md" />
        <Skeleton className="h-4 w-32 !rounded-md" />
      </div>

      {/* 4. Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} viewMode="grid" />
        ))}
      </div>
    </div>
  );
}

export default ProductsPageSkeleton;
