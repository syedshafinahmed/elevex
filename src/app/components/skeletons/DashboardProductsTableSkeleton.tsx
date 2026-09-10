"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { sansation } from "@/lib/fonts";

export function DashboardProductsTableSkeleton() {
  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 w-full`}>
      {/* 1. Header Navigation & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-foreground/10">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-16 !rounded-md" />
            <Skeleton className="h-3 w-3 !rounded-full" />
            <Skeleton className="h-3 w-28 !rounded-md" />
          </div>
          <Skeleton className="h-8 sm:h-9 w-80 !rounded-xl" />
        </div>

        {/* Quick Stats Strip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/2 px-3.5 py-2 inset-shadow-foreground/30 inset-shadow-sm">
            <Skeleton className="h-4 w-4 !rounded-md" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-2.5 w-16 !rounded-sm" />
              <Skeleton className="h-3.5 w-20 !rounded-md" />
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/2 px-3.5 py-2 inset-shadow-foreground/30 inset-shadow-sm">
            <Skeleton className="h-4 w-4 !rounded-md" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-2.5 w-16 !rounded-sm" />
              <Skeleton className="h-3.5 w-24 !rounded-md" />
            </div>
          </div>

          <Skeleton className="h-10 w-28 !rounded-2xl" />
        </div>
      </div>

      {/* 2. Search Bar & Category Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/2 p-3 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-8 w-20 shrink-0 !rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-9 w-full sm:w-72 !rounded-xl" />
      </div>

      {/* 3. Products Table Skeleton */}
      <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-foreground/10 bg-foreground/3 text-[10px] uppercase tracking-wider text-foreground/50 font-semibold">
                <th className="py-3.5 pl-6 pr-4">Product Details</th>
                <th className="py-3.5 px-4">Origin & Port</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Exporter Name</th>
                <th className="py-3.5 pr-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/6">
              {Array.from({ length: 10 }).map((_, idx) => (
                <tr key={idx}>
                  {/* Product Details */}
                  <td className="py-3.5 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 shrink-0 !rounded-xl" />
                      <div className="flex flex-col gap-1.5 min-w-0 max-w-xs flex-1">
                        <Skeleton className="h-3.5 w-44 !rounded-md" />
                        <Skeleton className="h-2.5 w-28 !rounded-sm" />
                      </div>
                    </div>
                  </td>

                  {/* Origin & Port */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-3.5 w-24 !rounded-md" />
                      <Skeleton className="h-2.5 w-16 !rounded-sm" />
                    </div>
                  </td>

                  {/* Unit Price */}
                  <td className="py-3.5 px-4">
                    <Skeleton className="h-4 w-20 !rounded-md" />
                  </td>

                  {/* Stock */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-3.5 w-20 !rounded-md" />
                      <Skeleton className="h-2.5 w-14 !rounded-sm" />
                    </div>
                  </td>

                  {/* Exporter */}
                  <td className="py-3.5 px-4">
                    <Skeleton className="h-3.5 w-24 !rounded-md" />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pr-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Skeleton className="h-8 w-8 !rounded-xl" />
                      <Skeleton className="h-8 w-8 !rounded-xl" />
                      <Skeleton className="h-8 w-8 !rounded-xl" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Pagination Skeleton Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Skeleton className="h-4 w-52 !rounded-md" />
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-9 w-9 !rounded-xl" />
          <Skeleton className="h-9 w-16 !rounded-xl" />
          <Skeleton className="h-9 w-9 !rounded-xl" />
          <Skeleton className="h-9 w-9 !rounded-xl" />
          <Skeleton className="h-9 w-16 !rounded-xl" />
          <Skeleton className="h-9 w-9 !rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default DashboardProductsTableSkeleton;
