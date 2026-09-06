"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Star,
  MapPin,
  Building,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowLeft,
  X,
  Package,
  Clock,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { toast } from "gooey-toast";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const { products, importProduct } = useProducts();

  const product = products.find((p) => p.id === resolvedParams.id) || products[0];

  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importQty, setImportQty] = useState<string>("1");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  const numericQty = Number(importQty);
  // Import Limit Rule:
  // Quantity cannot be > availableQuantity and must be > 0
  const isExceedingLimit = numericQty > product.availableQuantity;
  const isInvalidQty = !numericQty || numericQty <= 0 || isNaN(numericQty);
  const isSubmitDisabled = isExceedingLimit || isInvalidQty || product.availableQuantity === 0;

  function handleImportSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const res = importProduct(product.id, numericQty);
    if (!res.success) {
      toast.error({
        title: "Import Failed",
      });
      setImportError(res.error || "Failed to import product.");
    } else {
      toast.success({
        title: "Commodity Imported",
      });
      setImportSuccess(true);
      setTimeout(() => {
        setImportModalOpen(false);
        setImportSuccess(false);
        router.push("/dashboard/imports");
      }, 1000);
    }
  }

  return (
    <div className={`${sansation.className} mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10 flex flex-col gap-6`}>
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </button>
      </div>

      {/* Main Details Card */}
      <div className="grid grid-cols-1 gap-8 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 sm:p-10 lg:grid-cols-2 inset-shadow-foreground/30 inset-shadow-sm">
        {/* Left: Product Image */}
        <div className="flex flex-col gap-3">
          <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-2xl bg-foreground/5 shadow-md">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-background/80 px-3 py-1.5 text-xs font-bold text-foreground backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>

        {/* Right: Info & Import Trigger */}
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-primary">
                {product.category || "Export Commodity"}
              </span>
              <span className="flex items-center gap-1 text-xs text-foreground/60">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Origin: {product.originCountry}
              </span>
            </div>

            <h1 className={`${pinkAverage.className} text-2xl sm:text-4xl text-foreground leading-tight`}>
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-2 rounded-2xl border border-foreground/10 bg-background p-4 inset-shadow-foreground/30 inset-shadow-sm">
              <span className="text-xs text-foreground/50 uppercase font-semibold">Unit Price:</span>
              <span className={`${pinkAverage.className} text-3xl font-bold text-primary`}>
                ৳ {product.price.toLocaleString()}
              </span>
            </div>

            {/* Available Quantity & Exporter */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-foreground/10 bg-foreground/3 p-3">
                <span className="text-[10px] text-foreground/45 uppercase block">Available Stock</span>
                <span className="font-bold text-foreground text-sm">
                  {product.availableQuantity} units
                </span>
              </div>
              <div className="rounded-xl border border-foreground/10 bg-foreground/3 p-3">
                <span className="text-[10px] text-foreground/45 uppercase block">Exporting Entity</span>
                <span className="font-semibold text-foreground text-xs truncate block">
                  {product.exporterName || "Verified Exporter"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-foreground/10 text-xs">
              <span className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
                Product Specification & Details
              </span>
              <p className="text-foreground/75 leading-relaxed">
                {product.description ||
                  "Verified export lot complying with international phytosanitary, trade packing, and digital Bill of Lading standards."}
              </p>
            </div>
          </div>

          {/* Import Now Action Button */}
          <div className="pt-4 border-t border-foreground/10 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setImportQty("1");
                setImportError(null);
                setImportModalOpen(true);
              }}
              disabled={product.availableQuantity === 0}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Download className="h-4 w-4 stroke-[2.5]" />
              {product.availableQuantity === 0 ? "Out of Stock" : "Import Now"}
            </button>
            <p className="text-center text-[11px] text-foreground/45">
              Protected by Elevex 100% verified escrow release
            </p>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-foreground/15 bg-background p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3 mb-4">
              <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                Import Product
              </h3>
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground/50 hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {importSuccess ? (
              <div className="flex flex-col items-center justify-center py-6 gap-2 text-center">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
                <h4 className="text-sm font-bold text-foreground">Import Successful!</h4>
                <p className="text-xs text-foreground/60">
                  {importQty} units added to your My Imports section.
                </p>
              </div>
            ) : (
              <form onSubmit={handleImportSubmit} className="flex flex-col gap-4 text-xs">
                <div>
                  <p className="font-semibold text-foreground text-sm truncate">{product.name}</p>
                  <p className="text-[11px] text-foreground/50 mt-0.5">
                    Origin: {product.originCountry} · Unit Price: ৳ {product.price.toLocaleString()}
                  </p>
                </div>

                <div className="rounded-2xl border border-foreground/10 bg-foreground/3 p-3.5">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-foreground/50 uppercase font-semibold text-[10px]">
                      Available Quantity in Stock:
                    </span>
                    <span className="font-bold text-foreground">
                      {product.availableQuantity} units
                    </span>
                  </div>

                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-1">
                    Enter Import Quantity *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={product.availableQuantity}
                    required
                    value={importQty}
                    onChange={(e) => {
                      setImportQty(e.target.value);
                      setImportError(null);
                    }}
                    className={`h-11 w-full rounded-xl border bg-background px-3.5 text-sm font-semibold text-foreground focus:outline-none ${
                      isExceedingLimit
                        ? "border-red-500 focus:border-red-500"
                        : "border-foreground/15 focus:border-primary"
                    }`}
                  />

                  {/* 🚫 Import Limit Rule Alert */}
                  {isExceedingLimit && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1.5 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      Import quantity cannot exceed available stock ({product.availableQuantity} units).
                    </p>
                  )}
                </div>

                {importError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-500">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{importError}</span>
                  </div>
                )}

                {/* Total Cost Estimate */}
                <div className="flex items-center justify-between border-t border-foreground/10 pt-2 text-xs">
                  <span className="text-foreground/50">Total Estimated Cost:</span>
                  <span className="font-bold text-primary text-sm">
                    ৳ {((numericQty || 0) * product.price).toLocaleString()}
                  </span>
                </div>

                {/* Modal Submit Actions */}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setImportModalOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground/60 hover:bg-foreground/5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                  >
                    Submit Import
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
