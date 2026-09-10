"use client";

import React from "react";
import { Skeleton } from "./Skeleton";
import { sansation } from "@/lib/fonts";

export function UsersTableSkeleton() {
  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 w-full`}>
      {/* Top 3 KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-center justify-between mb-1">
              <Skeleton className="h-3 w-28 !rounded-md" />
              <Skeleton className="h-7 w-7 !rounded-lg" />
            </div>
            <Skeleton className="h-8 w-16 !rounded-xl" />
            <Skeleton className="h-2.5 w-32 !rounded-sm" />
          </div>
        ))}
      </div>

      {/* Toolbar: Search, Role Filters, Refresh */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/2 p-3 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Skeleton className="h-8 w-20 !rounded-xl" />
          <Skeleton className="h-8 w-20 !rounded-xl" />
          <Skeleton className="h-8 w-28 !rounded-xl" />
        </div>

        <div className="flex items-center gap-2.5">
          <Skeleton className="h-9 w-full sm:w-64 !rounded-xl" />
          <Skeleton className="h-9 w-20 !rounded-xl" />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-foreground/10 bg-foreground/3 text-[10px] uppercase tracking-wider text-foreground/50 font-semibold">
                <th className="py-3.5 pl-6 pr-4">User Details</th>
                <th className="py-3.5 px-4">Role Access</th>
                <th className="py-3.5 px-4">Join Date</th>
                <th className="py-3.5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/6">
              {Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  {/* User Details */}
                  <td className="py-3.5 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 shrink-0 !rounded-xl" />
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0 max-w-xs">
                        <Skeleton className="h-3.5 w-32 !rounded-md" />
                        <Skeleton className="h-2.5 w-44 !rounded-sm" />
                      </div>
                    </div>
                  </td>

                  {/* Role Dropdown */}
                  <td className="py-3.5 px-4">
                    <Skeleton className="h-10 w-48 !rounded-2xl" />
                  </td>

                  {/* Join Date */}
                  <td className="py-3.5 px-4">
                    <Skeleton className="h-3.5 w-24 !rounded-md" />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 pr-6 text-right">
                    <Skeleton className="h-8 w-8 ml-auto !rounded-xl" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersTableSkeleton;
