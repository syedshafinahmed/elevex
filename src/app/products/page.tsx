"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Star,
  MapPin,
  Eye,
  ShoppingBag,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";

export default function UserProductsPage() {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Agricultural", "Textile", "Food"];

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.originCountry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`${sansation.className} mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 flex flex-col gap-8`}>
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-primary">
            Global Marketplace
          </span>
          <span className="text-[11px] text-foreground/45">
            {products.length} commodities available
          </span>
        </div>
        <h1 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground`}>
          All Export Products
        </h1>
        <p className="text-xs sm:text-sm text-foreground/60 max-w-2xl leading-relaxed">
          Browse verified international export commodities, compare origin pricing, and import goods directly to your personal inventory.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-3xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex items-center min-w-[280px]">
          <Search className="absolute left-3.5 h-4 w-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Search by product name or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-xl border border-foreground/15 bg-background pl-10 pr-4 text-xs text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* 3-Column Grid Layout for Users */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-2">
          <ShoppingBag className="h-10 w-10 text-foreground/30 mb-2" />
          <p className="text-base font-semibold text-foreground">No products found matching &ldquo;{searchTerm}&rdquo;</p>
          <p className="text-xs text-foreground/50">Try searching for a different keyword or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-4 transition-all hover:border-foreground/20 hover:bg-foreground/4 inset-shadow-foreground/30 inset-shadow-sm"
            >
              <div>
                {/* 1. Product Image */}
                <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-foreground/5 mb-3.5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Rating */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-bold text-foreground backdrop-blur-md">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Name & Origin Country */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[11px] text-foreground/50">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span>{item.originCountry}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Price & Available Quantity */}
                <div className="mt-3 flex items-center justify-between border-t border-b border-foreground/8 py-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-foreground/45 block uppercase">Price</span>
                    <span className="font-bold text-primary text-base">৳ {item.price.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-foreground/45 block uppercase">Available Quantity</span>
                    <span className="font-semibold text-foreground">{item.availableQuantity} units</span>
                  </div>
                </div>
              </div>

              {/* "See Details" Button */}
              <div className="mt-4 pt-1">
                <Link
                  href={`/products/${item.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
