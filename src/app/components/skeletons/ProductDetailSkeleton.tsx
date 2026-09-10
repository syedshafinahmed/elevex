"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { sansation } from "@/lib/fonts";

export function ProductDetailSkeleton() {
  return (
    <div
      className={`${sansation.className} mx-auto max-w-7xl px-4 pt-2 pb-8 sm:py-8 sm:px-6 lg:px-10 flex flex-col gap-8`}
    >
      {/* 1. Breadcrumbs & Top Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-foreground/10">
        {/* Breadcrumb Links */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-12 !rounded-md" />
          <Skeleton className="h-3.5 w-3.5 !rounded-full" />
          <Skeleton className="h-3.5 w-16 !rounded-md" />
          <Skeleton className="h-3.5 w-3.5 !rounded-full" />
          <Skeleton className="h-3.5 w-36 !rounded-md" />
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32 !rounded-xl" />
          <Skeleton className="h-9 w-20 !rounded-xl" />
        </div>
      </div>

      {/* 2. Hero Section: Media Gallery (Left) & Trade Configurator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Media Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Main Showcase Image */}
          <div className="relative h-80 sm:h-[440px] w-full overflow-hidden rounded-3xl border border-foreground/15 bg-foreground/3 shadow-xl inset-shadow-foreground/30 inset-shadow-sm p-4">
            <Skeleton className="h-full w-full !rounded-2xl" />
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-[87.5px] aspect-square shrink-0 !rounded-2xl" />
            <Skeleton className="w-[87.5px] aspect-square shrink-0 !rounded-2xl" />
            <Skeleton className="w-[87.5px] aspect-square shrink-0 !rounded-2xl" />
          </div>

          {/* Trust Guarantees Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
              <Skeleton className="h-5 w-5 !rounded-full" />
              <Skeleton className="h-3 w-16 !rounded-md" />
              <Skeleton className="h-2.5 w-20 !rounded-md" />
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
              <Skeleton className="h-5 w-5 !rounded-full" />
              <Skeleton className="h-3 w-16 !rounded-md" />
              <Skeleton className="h-2.5 w-20 !rounded-md" />
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
              <Skeleton className="h-5 w-5 !rounded-full" />
              <Skeleton className="h-3 w-16 !rounded-md" />
              <Skeleton className="h-2.5 w-20 !rounded-md" />
            </div>
          </div>
        </div>

        {/* Right: Product Details, Cost Calculator & Import Action */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Header & Meta */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-28 !rounded-md" />
              <Skeleton className="h-4 w-24 !rounded-md" />
              <Skeleton className="h-4 w-20 !rounded-md" />
            </div>

            <Skeleton className="h-9 sm:h-12 w-4/5 !rounded-2xl" />

            {/* Narrative placeholder lines */}
            <div className="flex flex-col gap-2 pt-2">
              <Skeleton className="h-4 w-full !rounded-md" />
              <Skeleton className="h-4 w-full !rounded-md" />
              <Skeleton className="h-4 w-11/12 !rounded-md" />
              <Skeleton className="h-4 w-4/5 !rounded-md" />
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-baseline justify-between border-b border-foreground/10 pb-4">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-2.5 w-32 !rounded-sm" />
                <Skeleton className="h-8 w-40 !rounded-xl" />
              </div>
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-2.5 w-20 !rounded-sm" />
                <Skeleton className="h-6 w-24 !rounded-xl" />
              </div>
            </div>

            {/* Financial Calculator Box */}
            <div className="flex flex-col gap-3.5 rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
              {/* Stepper Row */}
              <div className="flex items-center justify-between pb-3 border-b border-foreground/10">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3.5 w-36 !rounded-md" />
                  <Skeleton className="h-2.5 w-24 !rounded-md" />
                </div>
                <Skeleton className="h-10 w-32 !rounded-xl" />
              </div>

              {/* Cost Rows */}
              <div className="flex justify-between">
                <Skeleton className="h-3.5 w-44 !rounded-md" />
                <Skeleton className="h-3.5 w-20 !rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-3.5 w-52 !rounded-md" />
                <Skeleton className="h-3.5 w-16 !rounded-md" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-3.5 w-40 !rounded-md" />
                <Skeleton className="h-3.5 w-28 !rounded-md" />
              </div>

              {/* Total Landed Cost */}
              <div className="flex justify-between border-t border-foreground/10 pt-3 mt-1">
                <Skeleton className="h-4 w-48 !rounded-md" />
                <Skeleton className="h-7 w-28 !rounded-xl" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Skeleton className="h-12 w-full !rounded-2xl" />
              <Skeleton className="h-12 w-full !rounded-2xl" />
            </div>

            <div className="flex justify-center pt-1">
              <Skeleton className="h-3 w-64 !rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Deep Technical & Trade Tabs System */}
      <div className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 sm:p-8 inset-shadow-foreground/30 inset-shadow-sm mt-4">
        {/* Tabs Bar */}
        <div className="flex items-center gap-3 border-b border-foreground/10 pb-3">
          <Skeleton className="h-9 w-40 !rounded-2xl" />
          <Skeleton className="h-9 w-44 !rounded-2xl" />
          <Skeleton className="h-9 w-48 !rounded-2xl" />
        </div>

        {/* Tab Content Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-foreground/10 bg-background/50 p-3.5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-2"
            >
              <Skeleton className="h-2.5 w-24 !rounded-sm" />
              <Skeleton className="h-5 w-3/4 !rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Similar & Recommended Commodities Section */}
      <div className="flex flex-col gap-6 mt-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3.5 w-24 !rounded-md" />
          <Skeleton className="h-7 w-64 !rounded-xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} viewMode="grid" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
