"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { sansation } from "@/lib/fonts";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalItems === 0) return null;

  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      className={`${sansation.className} flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs ${className}`}
    >
      {/* Showing X to Y of Z commodities */}
      <div className="text-foreground/55 font-medium">
        Showing <span className="font-bold text-foreground">{startItem}</span> to{" "}
        <span className="font-bold text-foreground">{endItem}</span> of{" "}
        <span className="font-bold text-foreground">{totalItems}</span> commodities
      </div>

      {/* Page Navigation Buttons */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5 select-none">
          {/* First Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-background text-foreground/60 transition-all hover:bg-foreground/5 hover:text-foreground hover:border-foreground/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
            title="First Page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>

          {/* Previous Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-9 items-center gap-1 rounded-xl border border-foreground/10 bg-background px-3 text-xs font-semibold text-foreground/75 transition-all hover:bg-foreground/5 hover:text-foreground hover:border-foreground/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Number Buttons */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, idx) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="flex h-9 w-7 items-center justify-center text-foreground/40 font-bold"
                  >
                    …
                  </span>
                );
              }

              const pageNumber = page as number;
              const isActive = currentPage === pageNumber;

              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => onPageChange(pageNumber)}
                  className={`flex h-9 min-w-9 px-2.5 items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-100"
                      : "border border-foreground/10 bg-background text-foreground/70 hover:bg-foreground/5 hover:text-foreground hover:border-foreground/20 inset-shadow-foreground/30 inset-shadow-sm"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          {/* Next Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-9 items-center gap-1 rounded-xl border border-foreground/10 bg-background px-3 text-xs font-semibold text-foreground/75 transition-all hover:bg-foreground/5 hover:text-foreground hover:border-foreground/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          {/* Last Page Button */}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-background text-foreground/60 transition-all hover:bg-foreground/5 hover:text-foreground hover:border-foreground/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
            title="Last Page"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
