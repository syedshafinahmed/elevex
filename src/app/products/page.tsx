"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  RotateCcw,
  ShoppingBag,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/app/components/products/ProductCard";
import Dropdown, { DropdownOption } from "@/app/components/dashboard/Dropdown";

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating-high"
  | "stock-high"
  | "newest";

const sortOptions: DropdownOption<SortOption>[] = [
  { value: "newest", label: "Newest Additions" },
  { value: "featured", label: "Featured (Top Ranked)" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating-high", label: "Highest Rated" },
  { value: "stock-high", label: "Stock Availability" },
];

function ProductsContent() {
  const { products } = useProducts();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Extract unique categories and countries
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean) as string[]);
    return ["All", ...Array.from(set)];
  }, [products]);

  const countries = useMemo(() => {
    const set = new Set(products.map((p) => p.originCountry).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [products]);

  const countryOptions: DropdownOption<string>[] = useMemo(() => {
    return countries.map((c) => ({
      value: c,
      label: c === "All" ? "All Countries" : c,
    }));
  }, [countries]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const query = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.originCountry.toLowerCase().includes(query) ||
          (item.exporterName && item.exporterName.toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.hsCode && item.hsCode.toLowerCase().includes(query));

        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;

        const matchesCountry =
          selectedCountry === "All" || item.originCountry === selectedCountry;

        const matchesStock = !inStockOnly || item.availableQuantity > 0;

        return matchesSearch && matchesCategory && matchesCountry && matchesStock;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating-high":
            return b.rating - a.rating;
          case "stock-high":
            return b.availableQuantity - a.availableQuantity;
          case "featured":
            return b.rating * b.availableQuantity - a.rating * a.availableQuantity;
          case "newest":
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
  }, [products, searchTerm, selectedCategory, selectedCountry, sortBy, inStockOnly]);

  function handleResetFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedCountry("All");
    setSortBy("newest");
    setInStockOnly(false);
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategory !== "All" ||
    selectedCountry !== "All" ||
    sortBy !== "newest" ||
    inStockOnly;

  return (
    <div className={`${sansation.className} mx-auto max-w-7xl px-4 pt-2 pb-12 sm:py-12 sm:px-6 lg:px-10 flex flex-col gap-8`}>
      {/* 1. Header Banner & Marketplace Metrics */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
            Products
          </p>
          <h1 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
            Global Commodities
          </h1>
        </div>

        {/* Trade Metrics Counter */}
        <div className="flex items-center gap-4 shrink-0 bg-foreground/2 rounded-2xl border border-foreground/10 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-foreground/45">
              Available Commodities
            </span>
            <span className={`${pinkAverage.className} text-xl font-bold text-primary`}>
              {products.length} Lots
            </span>
          </div>
          <div className="h-8 w-px bg-foreground/10" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-foreground/45">
              Origin Ports
            </span>
            <span className={`${pinkAverage.className} text-xl font-bold text-foreground`}>
              {countries.length - 1} Nations
            </span>
          </div>
        </div>
      </div>

      {/* 2. Advanced Multi-Faceted Filters & Toolbar */}
      <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-4 sm:p-5 inset-shadow-foreground/30 inset-shadow-sm">
        {/* Top Row: Search & View Toggle */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex items-center flex-1 max-w-xl">
            <Search className="absolute left-3.5 h-4 w-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search by commodity, country, exporter, or HS code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full rounded-2xl border border-foreground/15 bg-background pl-10 pr-4 text-xs text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none transition-colors shadow-xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 text-[11px] font-semibold text-foreground/40 hover:text-foreground cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Controls: Country Filter, Sort & View Mode */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {/* Country Selector */}
            <Dropdown<string>
              value={selectedCountry}
              options={countryOptions}
              onChange={(val) => setSelectedCountry(val)}
              className="w-36 sm:w-44 shrink-0"
              triggerClassName="!h-11 !rounded-2xl"
            />

            {/* Sort Selector */}
            <Dropdown<SortOption>
              value={sortBy}
              options={sortOptions}
              onChange={(val) => setSortBy(val)}
              className="w-44 sm:w-52 shrink-0"
              triggerClassName="!h-11 !rounded-2xl"
            />

            {/* In-stock Only Toggle */}
            <button
              type="button"
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`h-11 px-3.5 rounded-2xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                inStockOnly
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                  : "border-foreground/15 bg-background text-foreground/60 hover:text-foreground"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  inStockOnly ? "bg-emerald-500 animate-pulse" : "bg-foreground/30"
                }`}
              />
              <span>In Stock</span>
            </button>
          </div>
        </div>

        {/* Bottom Row: Category Pills & Reset Button */}
        <div className="flex items-center justify-between gap-3 pt-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-foreground/45 uppercase tracking-wider hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm shadow-primary/25"
                    : "bg-background/80 border border-foreground/10 text-foreground/65 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1 rounded-xl text-xs font-semibold text-primary hover:underline whitespace-nowrap cursor-pointer ml-auto"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Filter Results Summary */}
      <div className="flex items-center justify-between text-xs text-foreground/50 px-1">
        <span>
          Showing <strong className="text-foreground">{filteredProducts.length}</strong> of{" "}
          <strong className="text-foreground">{products.length}</strong> export commodities
        </span>

        {selectedCountry !== "All" && (
          <span className="rounded-md bg-foreground/5 px-2 py-0.5 text-[11px]">
            Origin: <strong className="text-foreground">{selectedCountry}</strong>
          </span>
        )}
      </div>

      {/* 4. Products Display (Grid View Only) */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-3 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground/5 text-foreground/40">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            No Commodities Found
          </h3>
          <p className="text-xs text-foreground/50 max-w-md">
            No export lots match your current combination of search terms, country filters, and stock criteria.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function UserProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-24 flex items-center justify-center text-xs text-foreground/50">
          Loading commodities catalog...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
