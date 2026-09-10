"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { sansation } from "@/lib/fonts";

export function ExportCardSkeleton() {
  return (
    <div
      className={`${sansation.className} relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm`}
    >
      <div>
        {/* 1. Image with Rating Badge */}
        <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-3.5">
          <Skeleton className="h-full w-full !rounded-2xl" />
          <div className="absolute top-2.5 right-2.5">
            <Skeleton className="h-6 w-14 !rounded-full" />
          </div>
        </div>

        {/* 2. Country & Title */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-3 !rounded-full" />
            <Skeleton className="h-3 w-20 !rounded-md" />
          </div>
          <div className="flex flex-col gap-1 min-h-[40px]">
            <Skeleton className="h-4 w-11/12 !rounded-md" />
            <Skeleton className="h-3.5 w-3/4 !rounded-md" />
          </div>
        </div>

        {/* 3. Price & Available Quantity */}
        <div className="mt-3 flex items-center justify-between border-t border-b border-foreground/8 py-2.5">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-2.5 w-10 !rounded-sm" />
            <Skeleton className="h-4 w-20 !rounded-md" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-2.5 w-24 !rounded-sm" />
            <Skeleton className="h-3.5 w-16 !rounded-md" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex items-center justify-between gap-2 pt-1">
        <Skeleton className="h-4 w-24 !rounded-md" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16 !rounded-xl" />
          <Skeleton className="h-8 w-8 !rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function DashboardExportsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Top Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/2 p-3 inset-shadow-foreground/30 inset-shadow-sm">
        <Skeleton className="h-9 w-full flex-1 !rounded-xl" />
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-9 w-32 !rounded-xl" />
          <Skeleton className="h-9 w-28 !rounded-xl" />
        </div>
      </div>

      {/* Exports 3-Column Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, idx) => (
          <ExportCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}

export default DashboardExportsSkeleton;
