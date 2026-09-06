"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  TrendingUp,
  ShoppingBag,
  Download,
  Upload,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { ImportedProduct } from "@/lib/productsData";
import { useState } from "react";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { products, myExports, myImports, removeImport } = useProducts();
  const [recentImportToRemove, setRecentImportToRemove] = useState<ImportedProduct | null>(null);

  const userName = session?.user?.name?.split(" ")[0] || "Trader";

  const totalExportValue = myExports.reduce(
    (acc, cur) => acc + cur.price * cur.availableQuantity,
    0
  );
  const totalImportQuantity = myImports.reduce(
    (acc, cur) => acc + cur.importedQuantity,
    0
  );

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Top Banner Greeting */}
      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/3 p-6 sm:p-8 inset-shadow-foreground/30 inset-shadow-sm">
        {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, color-mix(in srgb, var(--color-amethyst) 30%, transparent), transparent 60%)",
          }}
        /> */}

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className={`${pinkAverage.className} text-2xl sm:text-4xl text-foreground`}>
              Welcome back, <span className="text-primary">{userName}</span>.
            </h1>
            <p className="text-xs text-foreground/60 leading-relaxed">
              Manage your global export catalog, track personal import orders, and explore cross-border trade opportunities.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex items-center gap-2.5 sm:self-center">
            <Link
              href="/dashboard/add-export"
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              Add Export Product
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-xl border border-foreground/15 bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/30 active:scale-[0.98] inset-shadow-foreground/30 inset-shadow-sm"
            >
              <ShoppingBag className="h-4 w-4 text-primary" />
              Browse Marketplace
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Marketplace Products */}
        <Link
          href="/dashboard/products"
          className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2 p-5 transition-all inset-shadow-foreground/30 inset-shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-foreground/55 uppercase tracking-wider">
              All Products
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </div>
          <div className={`${pinkAverage.className} text-3xl font-bold text-foreground`}>
            {products.length}
          </div>
          <p className="text-[10px] text-foreground/45 mt-1">Available to import globally</p>
        </Link>

        {/* Card 2: My Exports */}
        <Link
          href="/dashboard/exports"
          className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2 p-5 transition-all inset-shadow-foreground/30 inset-shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-foreground/55 uppercase tracking-wider">
              My Exports
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Upload className="h-4 w-4" />
            </div>
          </div>
          <div className={`${pinkAverage.className} text-3xl font-bold text-foreground`}>
            {myExports.length}
          </div>
          <p className="text-[10px] text-foreground/45 mt-1">Active product listings</p>
        </Link>

        {/* Card 3: My Imports */}
        <Link
          href="/dashboard/imports"
          className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2 p-5 transition-all inset-shadow-foreground/30 inset-shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-foreground/55 uppercase tracking-wider">
              My Imports
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Download className="h-4 w-4" />
            </div>
          </div>
          <div className={`${pinkAverage.className} text-3xl font-bold text-foreground`}>
            {myImports.length}
          </div>
          <p className="text-[10px] text-foreground/45 mt-1">{totalImportQuantity} total units imported</p>
        </Link>

        {/* Card 4: Total Export Valuation */}
        <div className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-foreground/55 uppercase tracking-wider">
              Total Export Value
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className={`${pinkAverage.className} text-2xl font-bold text-primary`}>
            ৳ {totalExportValue.toLocaleString()}
          </div>
          <p className="text-[10px] text-foreground/45 mt-1">Across all active inventory</p>
        </div>
      </div>

      {/* Grid: Recent Exports & Recent Imports */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: My Recent Exports */}
        <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-5 sm:p-6 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
            <div>
              <h2 className={`${pinkAverage.className} text-xl text-foreground`}>
                My Export Listings
              </h2>
              <p className="text-xs text-foreground/50">Manage pricing & available stock</p>
            </div>
            <Link
              href="/dashboard/exports"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View All ({myExports.length}) →
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {myExports.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-foreground/8 bg-foreground/2 p-3 transition-colors hover:bg-foreground/5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-foreground/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-foreground truncate">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-foreground/50">
                      {item.originCountry} · {item.availableQuantity} units available
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-primary">
                    ৳ {item.price.toLocaleString()}
                  </span>
                  <Link
                    href={`/products/${item.id}`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/10 text-foreground/60 hover:text-primary hover:border-primary transition-colors"
                    title="See Details"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: My Recent Imports */}
        <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-5 sm:p-6 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
            <div>
              <h2 className={`${pinkAverage.className} text-xl text-foreground`}>
                My Imported Products
              </h2>
              <p className="text-xs text-foreground/50">Products imported via 1-click import</p>
            </div>
            <Link
              href="/dashboard/imports"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View All ({myImports.length}) →
            </Link>
          </div>

          {myImports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
              <Download className="h-8 w-8 text-foreground/30" />
              <p className="text-xs text-foreground/50">You have not imported any products yet.</p>
              <Link
                href="/products"
                className="mt-1 text-xs font-semibold text-primary underline"
              >
                Browse All Products to Import →
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {myImports.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-foreground/8 bg-foreground/2 p-3 transition-colors hover:bg-foreground/5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-foreground/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-foreground/50">
                        <span>{item.originCountry}</span>
                        <span>·</span>
                        <span className="font-semibold text-primary">
                          {item.importedQuantity} imported
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/products/${item.productId}`}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/10 text-foreground/60 hover:text-primary hover:border-primary transition-colors"
                      title="See Details"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setRecentImportToRemove(item)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-500/20 text-red-500/70 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove from My Imports"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Remove Recent Import Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(recentImportToRemove)}
        title="Remove Imported Product"
        itemName={recentImportToRemove?.name}
        description="Are you sure you want to remove this imported product from your inventory record?"
        confirmText="Remove Item"
        onConfirm={() => {
          if (recentImportToRemove) {
            removeImport(recentImportToRemove.id);
            setRecentImportToRemove(null);
          }
        }}
        onClose={() => setRecentImportToRemove(null)}
      />
    </div>
  );
}
