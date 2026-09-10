"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { sansation } from "@/lib/fonts";

export function DashboardProductDetailSkeleton() {
  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 w-full`}>
      {/* 1. Header Navigation & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-foreground/10">
        <div className="flex flex-col gap-2">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-16 !rounded-md" />
            <Skeleton className="h-3 w-3 !rounded-full" />
            <Skeleton className="h-3 w-20 !rounded-md" />
            <Skeleton className="h-3 w-3 !rounded-full" />
            <Skeleton className="h-3 w-32 !rounded-md" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-8 sm:h-10 w-72 !rounded-xl" />
            <Skeleton className="h-6 w-24 !rounded-lg" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-3.5 w-24 !rounded-md" />
            <Skeleton className="h-3.5 w-28 !rounded-md" />
            <Skeleton className="h-3.5 w-20 !rounded-md" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 !rounded-xl" />
          <Skeleton className="h-9 w-20 !rounded-xl" />
          <Skeleton className="h-9 w-20 !rounded-xl" />
        </div>
      </div>

      {/* 2. Key Product Data Points (5 KPI Metric Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between gap-2"
          >
            <Skeleton className="h-2.5 w-16 !rounded-sm" />
            <Skeleton className="h-7 w-24 !rounded-xl" />
            <Skeleton className="h-2.5 w-16 !rounded-sm" />
          </div>
        ))}
      </div>

      {/* 3. Product Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (6 cols): Media Showcase & Trust */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <Skeleton className="h-72 sm:h-80 w-full !rounded-2xl" />

            <div className="flex items-center gap-2.5">
              <Skeleton className="h-16 w-20 shrink-0 !rounded-xl" />
              <Skeleton className="h-16 w-20 shrink-0 !rounded-xl" />
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3.5 flex items-start gap-2.5">
              <Skeleton className="h-4 w-4 shrink-0 !rounded-md" />
              <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="h-3 w-28 !rounded-md" />
                <Skeleton className="h-2.5 w-full !rounded-sm" />
              </div>
            </div>

            <div className="pt-2 border-t border-foreground/8 flex flex-col gap-2">
              <Skeleton className="h-3 w-20 !rounded-md" />
              <Skeleton className="h-3.5 w-full !rounded-md" />
              <Skeleton className="h-3.5 w-full !rounded-md" />
              <Skeleton className="h-3.5 w-3/4 !rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm"
              >
                <Skeleton className="h-5 w-5 !rounded-full" />
                <Skeleton className="h-3 w-16 !rounded-md" />
                <Skeleton className="h-2.5 w-20 !rounded-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (6 cols): Specs Table & Certifications */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Tech Specs */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-foreground/10 pb-3">
              <Skeleton className="h-4 w-4 !rounded-md" />
              <Skeleton className="h-6 w-44 !rounded-xl" />
            </div>

            <div className="overflow-hidden rounded-2xl border border-foreground/10">
              <div className="divide-y divide-foreground/8">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex p-3 gap-4">
                    <Skeleton className="h-3.5 w-1/3 !rounded-md" />
                    <Skeleton className="h-3.5 w-1/2 !rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-foreground/10 pb-3">
              <Skeleton className="h-4 w-4 !rounded-md" />
              <Skeleton className="h-6 w-48 !rounded-xl" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-background/50 p-3.5"
                >
                  <Skeleton className="h-8 w-8 shrink-0 !rounded-xl" />
                  <div className="flex flex-col gap-1 flex-1">
                    <Skeleton className="h-3.5 w-32 !rounded-md" />
                    <Skeleton className="h-2.5 w-full !rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardProductDetailSkeleton;
