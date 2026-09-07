"use client";

import Link from "next/link";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/app/components/products/ProductCard";
import Button from "@/app/components/ui/Button";

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
        <div className="flex flex-col gap-2">
          <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
            Products
          </p>
          <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
            Latest Commodities
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestProducts.map((item) => (
            <ProductCard key={item.id} product={item} viewMode="grid" />
          ))}
        </div>

        {/* Bottom Right CTA Action */}
        <div className="flex justify-end pt-2">
          <Button
            variant="secondary"
            size="md"
            href="/products"
            className="text-background inset-shadow-foreground/30 inset-shadow-sm"
          >
            <span>View All {products.length} Products</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
