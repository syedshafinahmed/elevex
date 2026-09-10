"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { sansation } from "@/lib/fonts";

export function DashboardOverviewSkeleton() {
  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Top Banner Greeting */}
      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/3 p-6 sm:p-8 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 sm:h-10 w-72 !rounded-2xl" />
            <Skeleton className="h-3.5 w-full max-w-md !rounded-md" />
          </div>

          <div className="flex items-center gap-2.5">
            <Skeleton className="h-9 w-36 !rounded-xl" />
            <Skeleton className="h-9 w-36 !rounded-xl" />
          </div>
        </div>
      </div>

      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-center justify-between mb-1">
              <Skeleton className="h-3 w-20 !rounded-md" />
              <Skeleton className="h-8 w-8 !rounded-xl" />
            </div>
            <Skeleton className="h-8 w-24 !rounded-xl" />
            <Skeleton className="h-2.5 w-32 !rounded-sm mt-1" />
          </div>
        ))}
      </div>

      {/* Grid: Recent Exports & Recent Imports */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: My Recent Exports Skeleton */}
        <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-5 sm:p-6 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-36 !rounded-xl" />
              <Skeleton className="h-3 w-44 !rounded-md" />
            </div>
            <Skeleton className="h-4 w-20 !rounded-md" />
          </div>

          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-2xl border border-foreground/8 bg-foreground/2 p-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Skeleton className="h-12 w-12 shrink-0 !rounded-xl" />
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <Skeleton className="h-3.5 w-3/4 !rounded-md" />
                    <Skeleton className="h-2.5 w-1/2 !rounded-sm" />
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Skeleton className="h-4 w-16 !rounded-md" />
                  <Skeleton className="h-7 w-7 !rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: My Recent Imports Skeleton */}
        <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-5 sm:p-6 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-6 w-40 !rounded-xl" />
              <Skeleton className="h-3 w-48 !rounded-md" />
            </div>
            <Skeleton className="h-4 w-20 !rounded-md" />
          </div>

          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-2xl border border-foreground/8 bg-foreground/2 p-3"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Skeleton className="h-12 w-12 shrink-0 !rounded-xl" />
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <Skeleton className="h-3.5 w-3/4 !rounded-md" />
                    <Skeleton className="h-2.5 w-1/2 !rounded-sm" />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Skeleton className="h-7 w-7 !rounded-lg" />
                  <Skeleton className="h-7 w-7 !rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverviewSkeleton;
