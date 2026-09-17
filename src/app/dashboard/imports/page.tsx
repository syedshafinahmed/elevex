"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  Star,
  MapPin,
  ShoppingBag,
  Search,
  Download,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import Button from "@/app/components/ui/Button";
import { DashboardImportsSkeleton } from "@/app/components/skeletons";
import { slugify } from "@/lib/utils";

export default function MyImportsPage() {
  const { myImports, products, loading } = useProducts();
  const [search, setSearch] = useState("");

  const filteredImports = myImports.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.originCountry.toLowerCase().includes(search.toLowerCase())
  );

  const totalImportValue = myImports.reduce(
    (acc, cur) => acc + cur.price * cur.importedQuantity,
    0
  );

  if (loading) {
    return <DashboardImportsSkeleton />;
  }

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Top Actions & KPI Summary Banner */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-foreground/50">
          Showing <span className="font-semibold text-foreground">{myImports.length}</span> imported commodities in personal inventory
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Import More Products</span>
        </Link>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-foreground/45 font-semibold block">
            Total Imported Orders
          </span>
          <span className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
            {myImports.length} Shipments
          </span>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-foreground/45 font-semibold block">
            Total Units Acquired
          </span>
          <span className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
            {myImports.reduce((a, b) => a + b.importedQuantity, 0).toLocaleString()} units
          </span>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
          <span className="text-[10px] uppercase tracking-wider text-foreground/45 font-semibold block">
            Estimated Import Valuation
          </span>
          <span className={`${pinkAverage.className} text-2xl font-bold text-primary`}>
            ৳ {totalImportValue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-foreground/40" />
        <input
          type="text"
          placeholder="Search imported products by name or origin country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full rounded-2xl border border-foreground/10 bg-foreground/2 pl-10 pr-4 text-xs text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none inset-shadow-foreground/30 inset-shadow-sm"
        />
      </div>

      {/* Imports 3-Column Grid */}
      {filteredImports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-2">
          <Download className="h-10 w-10 text-foreground/30 mb-1" />
          <p className="text-sm font-semibold text-foreground">No imported products yet.</p>
          <p className="text-xs text-foreground/50">
            Visit the marketplace to discover products and click &ldquo;Import Now&rdquo;.
          </p>
          <Button
            href="/products"
            variant="primary"
            size="sm"
            className="mt-2"
          >
            <span>Explore All Products</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {filteredImports.map((item) => {
            const product = products.find((p) => p.id === item.productId || p.name === item.name);
            const category = product?.category;
            const productSlug = product?.slug || slugify(item.name) || item.productId;

            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-4 transition-all hover:border-foreground/20 hover:bg-foreground/4 inset-shadow-foreground/30 inset-shadow-sm"
              >
                <div>
                  {/* 1. Product Image */}
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-foreground/5 mb-3.5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Category Badge */}
                    {category && (
                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-4 py-2 text-[8px] font-bold uppercase tracking-wider text-foreground inset-shadow-foreground/30 inset-shadow-sm">
                        <span>{category}</span>
                      </div>
                    )}
                  </div>

                  {/* 2. Product Name & 4. Origin Country & Rating */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex items-center gap-1 text-[11px] text-foreground/50">
                        <MapPin className="h-3 w-3 text-primary" />
                        <span>{item.originCountry}</span>
                      </div>
                      {/* Rating Pill */}
                      <div className="flex items-center gap-1 text-[11px] text-foreground/50">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[40px] group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {/* 3. Price & Quantity */}
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-foreground/45 block uppercase">Price</span>
                      <span className="font-bold text-primary text-sm">৳ {item.price.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-foreground/45 block uppercase">Imported Quantity</span>
                      <span className="font-semibold text-foreground">{item.importedQuantity} units</span>
                    </div>
                  </div>
                </div>

                {/* Action Button: only a view details button at the bottom right corner */}
                <div className="mt-4 flex items-center justify-end gap-2 pt-1">
                  <Link
                    href={`/products/${productSlug}`}
                    className="flex items-center gap-1 rounded-xl border border-foreground/15 bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-foreground/5 transition-colors cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
                    title="View Details"
                  >
                    <Eye className="h-3.5 w-3.5 text-primary" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
