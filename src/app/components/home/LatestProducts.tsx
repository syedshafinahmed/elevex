"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Eye, ArrowRight } from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";

export default function LatestProducts() {
  const { products } = useProducts();

  // 6 most recent products sorted by createdAt desc
  const latest6 = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Global Commodities
            </span>
            <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
              Latest Export Products
            </h2>
            <p className="text-xs sm:text-sm text-foreground/60 max-w-xl">
              Freshly listed commodities from verified exporters worldwide with escrow-backed quality guarantees.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline group"
          >
            <span>View All {products.length} Products</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest6.map((item) => (
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
                  {/* 5. Rating */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-bold text-foreground backdrop-blur-md">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* 2. Product Name & 4. Origin Country */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[11px] text-foreground/50">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span>{item.originCountry}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* 3. Price & 6. Available Quantity */}
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

              {/* 7. “See Details” button */}
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
      </div>
    </section>
  );
}
