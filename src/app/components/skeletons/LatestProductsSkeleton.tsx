"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { sansation } from "@/lib/fonts";

export function LatestProductsSkeleton() {
  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3.5 w-20 !rounded-md" />
          <Skeleton className="h-9 sm:h-12 w-64 sm:w-80 !rounded-2xl" />
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} viewMode="grid" />
          ))}
        </div>

        {/* Bottom Right CTA Action */}
        <div className="flex justify-end pt-2">
          <Skeleton className="h-10 w-44 !rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

export default LatestProductsSkeleton;
