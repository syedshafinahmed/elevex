"use client";

import Link from "next/link";
import { ArrowRight, Globe2, ShieldCheck } from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/app/components/products/ProductCard";

export default function LatestProducts() {
  const { products } = useProducts();

  // 4 most recent products for a 4-card row (or 8 for two rows)
  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                <Globe2 className="h-3 w-3" />
                Global Commodities
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                <ShieldCheck className="h-3 w-3" />
                Escrow Protected
              </span>
            </div>

            <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
              Latest Export Commodities
            </h2>
            <p className="text-xs sm:text-sm text-foreground/65 max-w-xl leading-relaxed">
              Freshly listed export lots from verified producers worldwide. Compare origin pricing, add lots to your cart, and allocate import consignments.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline group self-start sm:self-auto rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 transition-all hover:bg-primary/10"
          >
            <span>View All {products.length} Commodities</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestProducts.map((item) => (
            <ProductCard key={item.id} product={item} viewMode="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
