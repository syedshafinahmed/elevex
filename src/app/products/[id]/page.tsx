"use client";

import { useState, use, useMemo, useEffect } from "react";
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
  Share2,
  ShoppingCart,
  ChevronRight,
  Maximize2,
  Anchor,
  FileText,
  BadgeCheck,
  Layers,
  Plus,
  Minus,
  Info,
  Lock,
} from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { Product, ProductReview } from "@/lib/productsData";
import ProductCard from "@/app/components/products/ProductCard";
import Button from "@/app/components/ui/Button";
import AuthModal from "@/app/components/auth/AuthModal";
import { ProductDetailSkeleton } from "@/app/components/skeletons";
import { toast } from "gooey-toast";

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const [authOpen, setAuthOpen] = useState(false);
  const { products, loading: productsLoading, importProduct, isInCart: checkIsInCart, addToCart, removeFromCart } = useProducts();
  const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  // Find product by slug or id
  useEffect(() => {
    const existing = products.find((p) => p.slug === resolvedParams.id || p.id === resolvedParams.id);
    if (!existing) {
      setIsFetching(true);
      fetch(`/api/products/${resolvedParams.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setFetchedProduct(data);
        })
        .catch(() => {})
        .finally(() => setIsFetching(false));
    }
  }, [resolvedParams.id, products]);

  const product = products.find((p) => p.slug === resolvedParams.id || p.id === resolvedParams.id) || fetchedProduct;

  // Gallery & Lightbox State
  const gallery = useMemo(() => {
    if (!product) return [];
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery;
    }
    return [product.image];
  }, [product]);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Autoplay gallery when multiple images
  useEffect(() => {
    if (gallery.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % gallery.length);
    }, 1500);

    return () => clearInterval(timer);
  }, [gallery.length]);

  // Cart State
  const isInCart = product ? checkIsInCart(product.id) : false;

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "specs" | "compliance"
  >("overview");

  // Import Configurator State
  const unit = product?.unit || "units";
  const minOrder = product?.minOrderQty || 1;
  const maxStock = product?.availableQuantity || 0;
  const [importQty, setImportQty] = useState<number>(minOrder);
  const [isSubmittingImport, setIsSubmittingImport] = useState(false);
  const [importSuccessModal, setImportSuccessModal] = useState(false);

  // Synchronize initial importQty when product loads
  useEffect(() => {
    if (product) {
      setImportQty(product.minOrderQty || 1);
    }
  }, [product]);

  function handleAddToCart() {
    if (!product) return;

    if (!session?.user) {
      toast.error({
        title: "Please log in to add items to cart",
        description: "You must be signed in to add commodities to your cart.",
      });
      setAuthOpen(true);
      return;
    }

    if (product.availableQuantity <= 0) {
      toast.error({
        title: "Commodity is Out of Stock",
      });
      return;
    }

    if (isInCart) {
      removeFromCart(product.id);
      toast.info({
        title: "Removed from Cart",
      });
    } else {
      addToCart(product.id, importQty || product.minOrderQty || 1);
      toast.success({
        title: "Added to Cart",
      });
    }
  }

  function handleShare() {
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast.success({
            title: "Product Link Copied to Clipboard",
          });
        })
        .catch(() => {
          toast.info({
            title: "URL: " + window.location.href,
          });
        });
    }
  }

  // Financial Calculations
  const isOutOfStock = maxStock <= 0;
  const isExceedingLimit = importQty > maxStock;
  const isBelowMin = importQty < minOrder;
  const isInvalidQty =
    !importQty || isNaN(importQty) || isBelowMin || isExceedingLimit || isOutOfStock;

  const subtotal = (importQty || 0) * (product?.price || 0);
  const portHandlingDutyEst = Math.round(subtotal * 0.025);
  const totalLandedCost = subtotal + portHandlingDutyEst;

  function handleQuantityChange(val: number) {
    const clamped = Math.max(minOrder, Math.min(val, maxStock || minOrder));
    setImportQty(clamped);
  }

  async function handleImportSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user) {
      toast.error({
        title: "Please log in to allocate imports",
        description: "You must be signed in to place trade consignments.",
      });
      setAuthOpen(true);
      return;
    }

    if (!product || isInvalidQty) return;

    setIsSubmittingImport(true);
    try {
      const res = await importProduct(product.id, importQty);
      if (res.success) {
        setIsSubmittingImport(false);
        setImportSuccessModal(true);
        toast.success({
          title: "Commodity Consignment Allocated",
        });
      } else {
        setIsSubmittingImport(false);
        toast.error({
          title: res.error || "Failed to import commodity",
        });
      }
    } catch {
      setIsSubmittingImport(false);
      toast.error({
        title: "An unexpected error occurred",
      });
    }
  }

  // Related Products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (p) =>
          p.id !== product.id &&
          (p.category === product.category || p.originCountry === product.originCountry)
      )
      .slice(0, 4);
  }, [products, product]);

  if (!product) {
    if (productsLoading || isFetching) {
      return <ProductDetailSkeleton />;
    }

    return (
      <div className={`${sansation.className} mx-auto max-w-7xl px-4 py-20 flex flex-col items-center justify-center text-center gap-6`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/5 text-foreground/40 border border-foreground/10">
          <Package className="h-8 w-8 stroke-[1.5]" />
        </div>
        <div className="flex flex-col gap-2 max-w-md">
          <h1 className={`${pinkAverage.className} text-3xl font-bold text-foreground`}>
            Commodity Not Found
          </h1>
          <p className="text-sm text-foreground/60">
            The requested commodity lot could not be located in our verified trade exchange. It may have been archived or fully settled.
          </p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-98"
        >
          <span>Explore All Commodities</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className={`${sansation.className} mx-auto max-w-7xl px-4 pt-2 pb-8 sm:py-8 sm:px-6 lg:px-10 flex flex-col gap-8`}>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      {/* 1. Breadcrumbs & Top Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-foreground/10">
        {/* Breadcrumb Links: Home > Products > Product Name */}
        <nav className="flex items-center gap-1.5 text-xs text-foreground/60 overflow-x-auto">
          <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-foreground/30 shrink-0" />
          <Link href="/products" className="hover:text-primary transition-colors whitespace-nowrap">
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-foreground/30 shrink-0" />
          <span className="font-bold text-foreground truncate max-w-[250px] sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Toolbar Buttons: Back to Catalog, Share */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3 py-2 text-xs font-semibold text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Catalog</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3 py-2 text-xs font-semibold text-foreground/70 hover:border-primary hover:text-primary transition-all shadow-xs cursor-pointer"
            title="Share Commodity"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Section: Media Gallery (Left Sticky) & Trade Configurator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Media Gallery (Sticky on scroll) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 flex flex-col gap-4 self-start">
          {/* Main Showcase Image */}
          <div className="group relative h-80 sm:h-[440px] w-full overflow-hidden rounded-3xl border border-foreground/15 bg-foreground/3 shadow-xl inset-shadow-foreground/30 inset-shadow-sm">
            <Image
              src={gallery[activeImgIndex] || product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Top-Left Category Badge with System Inset Shadow */}
            {product.category && (
              <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-4 py-2 text-[8px] font-bold uppercase tracking-wider text-foreground inset-shadow-foreground/30 inset-shadow-sm">
                <span>{product.category}</span>
              </div>
            )}

            {/* Expand / Lightbox Trigger (Appears on hover) */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-xl bg-background text-foreground shadow-md opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
              title="Expand Image"
            >
              <Maximize2 className="h-3 w-3" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImgIndex(idx)}
                  className={`relative w-[87.5px] aspect-square shrink-0 overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${
                    activeImgIndex === idx
                      ? "border-primary scale-95 shadow-md shadow-primary/20"
                      : "border-foreground/15 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground text-[11px]">100% Escrow</span>
              <span className="text-[10px] text-foreground/50">Funds released on port receipt</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
              <BadgeCheck className="h-5 w-5 text-emerald-500" />
              <span className="font-bold text-foreground text-[11px]">SGS Inspected</span>
              <span className="text-[10px] text-foreground/50">Pre-shipment lot verification</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="font-bold text-foreground text-[11px]">Digital BoL</span>
              <span className="text-[10px] text-foreground/50">Instant cryptographic release</span>
            </div>
          </div>
        </div>

        {/* Right: Product Details, Cost Calculator & Import Action */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Header & Meta */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-foreground/70">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <strong className="text-foreground">{product.originCountry}</strong>
              </span>

              {product.portOfLoading && (
                <span className="flex items-center gap-1 text-xs text-foreground/50">
                  <Anchor className="h-3 w-3 text-primary" />
                  {product.portOfLoading}
                </span>
              )}
            </div>

            <h1 className={`${pinkAverage.className} text-2xl sm:text-4xl text-foreground leading-tight`}>
              {product.name}
            </h1>

            {/* Trade & Export Overview */}
            <div className={`${sansation.className} flex flex-col gap-3 text-foreground/80 text-sm sm:text-base leading-wide text-justify font-extralight`}>
              <p className="first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-bold first-letter:mr-0.5">
                Harvested and processed under certified commercial export standards in {product.originCountry}, this lot is curated specifically for high-volume cross-border trade. Each consignment is subjected to comprehensive quality grading, ensuring optimal purity, moisture stabilization, and full conformity with global import and phytosanitary regulations.
              </p>
              <p>
                Shipped in {product.packaging || "export-grade hermetic protective packaging"} with an estimated export dispatch window of {product.leadTime || "7 - 14 business days"}{product.portOfLoading ? ` through ${product.portOfLoading}` : ""}. Fully secured under the Elevex 100% Escrow Guarantee, with smart contract settlement released only upon SGS lot verification and port inspection.
              </p>
            </div>
          </div>

          {/* Pricing & Stock Card */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-baseline justify-between border-b border-foreground/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/45 block">
                  Commodity Export Unit Price
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`${pinkAverage.className} text-3xl sm:text-4xl font-bold text-primary`}>
                    ৳ {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-foreground/50 font-medium">/ {unit}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/45 block">
                  Available Stock
                </span>
                <span
                  className={`text-base font-bold block mt-1 ${
                    isOutOfStock
                      ? "text-red-500"
                      : maxStock < 500
                      ? "text-amber-500"
                      : "text-emerald-500"
                  }`}
                >
                  {maxStock.toLocaleString()} {unit}
                </span>
              </div>
            </div>

            {/* Live Consignment Financial Calculator Form */}
            <form onSubmit={handleImportSubmit} className="flex flex-col gap-4">
              {/* Single Unified Consignment & Cost Breakdown Card */}
              <div className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-foreground/2 p-4 text-xs inset-shadow-foreground/30 inset-shadow-sm">
                {/* 1. Consignment Quantity Stepper Row */}
                <div className="flex items-center justify-between pb-3 border-b border-foreground/10">
                  <div className="flex flex-col gap-0.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/75">
                      Consignment Quantity
                    </label>
                    {minOrder > 1 && (
                      <span className="text-[10px] text-foreground/45">
                        Min. order: {minOrder} {unit}
                      </span>
                    )}
                  </div>

                  {/* Integrated Stepper */}
                  <div className="flex items-center rounded-xl border border-foreground/15 bg-background/70 p-1 shadow-inner">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(importQty - 1)}
                      disabled={importQty <= minOrder || isOutOfStock}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/60 hover:bg-foreground/10 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex items-center justify-center gap-1.5 px-3">
                      <input
                        type="number"
                        min={minOrder}
                        max={maxStock}
                        value={importQty}
                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
                        disabled={isOutOfStock}
                        className="w-12 text-center text-sm font-extrabold text-foreground bg-transparent focus:outline-none"
                      />
                      <span className="text-[11px] font-semibold text-foreground/50 select-none">
                        {unit}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuantityChange(importQty + 1)}
                      disabled={importQty >= maxStock || isOutOfStock}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground/60 hover:bg-foreground/10 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Exceeding Stock Warning */}
                {isExceedingLimit && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-500 font-semibold">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Requested quantity exceeds stock ({maxStock} {unit}).</span>
                  </div>
                )}

                {/* 2. Itemized Financial Breakdown */}
                <div className="flex justify-between text-foreground/60">
                  <span>Commodity Consignment Value:</span>
                  <span className="font-semibold text-foreground">
                    ৳ {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-foreground/60">
                  <span className="flex items-center gap-1">
                    <span>Estimated Port Clearance & Duty (2.5%):</span>
                    <Info className="h-3 w-3 text-foreground/40" />
                  </span>
                  <span className="font-semibold text-foreground">
                    ৳ {portHandlingDutyEst.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-foreground/60">
                  <span>Verified Escrow Protection Fee:</span>
                  <span className="font-bold text-emerald-500">FREE (Elevex Covered)</span>
                </div>

                {/* 3. Total Landed Cost */}
                <div className="flex justify-between border-t border-foreground/10 pt-2.5 mt-1 text-sm font-bold text-foreground">
                  <span>Estimated Landed Consignment Cost:</span>
                  <span className={`${pinkAverage.className} text-xl font-bold text-primary`}>
                    ৳ {totalLandedCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Both half width (grid grid-cols-2) using Button component */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleAddToCart}
                  className={`w-full ${
                    isInCart
                      ? "!border-primary !bg-primary/10 !text-primary"
                      : ""
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{isInCart ? "In Cart" : "Add to Cart"}</span>
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={isInvalidQty || isSubmittingImport}
                  className="w-full py-3.5 text-xs font-bold rounded-2xl text-white shadow-lg shadow-primary/25"
                >
                  <Download className="h-4 w-4 stroke-[2.5]" />
                  <span className="truncate">
                    {isOutOfStock
                      ? "Sold Out"
                      : isSubmittingImport
                      ? "Allocating..."
                      : `Import ${importQty} ${unit} Now`}
                  </span>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-foreground/45 pt-1">
                <Lock className="h-3 w-3 text-emerald-500" />
                <span>Protected by Elevex 100% Escrow & Inspection Guarantee</span>
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* 3. Deep Technical & Trade Tabs System */}
      <div className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 sm:p-8 inset-shadow-foreground/30 inset-shadow-sm mt-4">
        {/* Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-foreground/10 pb-3 overflow-x-auto">
          {[
            { id: "overview", label: "Overview & Description", icon: Info },
            { id: "specs", label: "Specifications & Logistics", icon: Layers },
            { id: "compliance", label: "Certifications & Compliance", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-sm shadow-primary/25"
                    : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-5 text-sm text-foreground/80 leading-relaxed">
            <div>
              <h3 className="text-base font-bold text-foreground mb-2">
                Commodity Narrative & Sourcing Profile
              </h3>
              <p className="text-justify">{product.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-foreground/8">
              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-4 inset-shadow-foreground/30 inset-shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Quality & Origin Highlights
                </h4>
                <ul className="flex flex-col gap-2 text-xs text-foreground/75">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Single-origin sourcing from certified agricultural cooperatives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Strict phytosanitary and export-grade moisture control standards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Pre-shipment batch chemical and purity assay documentation</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-4 inset-shadow-foreground/30 inset-shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Trade Terms & Handover
                </h4>
                <ul className="flex flex-col gap-2 text-xs text-foreground/75">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Incoterms: FOB / CIF options supported on request</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Electronic Bill of Lading (eBL) transfer upon customs clearance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Full container load (FCL) & less than container load (LCL) enabled</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Specifications & Logistics */}
        {activeTab === "specs" && (
          <div className="flex flex-col gap-5">
            <h3 className="text-base font-bold text-foreground">
              Technical & Packaging Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
                <span className="text-[10px] uppercase font-semibold text-foreground/45 block">
                  Harmonized Tariff (HS Code)
                </span>
                <span className="font-bold text-foreground text-sm font-mono mt-0.5 block">
                  {product.hsCode || "0901.11.00"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
                <span className="text-[10px] uppercase font-semibold text-foreground/45 block">
                  Port of Loading
                </span>
                <span className="font-bold text-foreground text-sm mt-0.5 block">
                  {product.portOfLoading || "Origin International Seaport"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
                <span className="text-[10px] uppercase font-semibold text-foreground/45 block">
                  Export Packaging Standard
                </span>
                <span className="font-bold text-foreground text-sm mt-0.5 block">
                  {product.packaging || "Export standard hermetic seaworthy packaging"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
                <span className="text-[10px] uppercase font-semibold text-foreground/45 block">
                  Estimated Lead Time
                </span>
                <span className="font-bold text-foreground text-sm mt-0.5 block">
                  {product.leadTime || "5 - 10 Business Days"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
                <span className="text-[10px] uppercase font-semibold text-foreground/45 block">
                  Guaranteed Shelf Life
                </span>
                <span className="font-bold text-foreground text-sm mt-0.5 block">
                  {product.shelfLife || "24 Months under standard storage"}
                </span>
              </div>

              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3.5 inset-shadow-foreground/30 inset-shadow-sm">
                <span className="text-[10px] uppercase font-semibold text-foreground/45 block">
                  Minimum Order Quantity
                </span>
                <span className="font-bold text-foreground text-sm mt-0.5 block">
                  {product.minOrderQty || 1} {unit}
                </span>
              </div>
            </div>

            {/* Custom Specs Table if available */}
            {product.specs && product.specs.length > 0 && (
              <div className="mt-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">
                  Chemical & Physical Characteristics
                </h4>
                <div className="overflow-hidden rounded-2xl border border-foreground/10">
                  <table className="w-full text-left text-xs">
                    <tbody className="divide-y divide-foreground/8">
                      {product.specs.map((item, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? "bg-foreground/2" : "bg-background"}
                        >
                          <td className="px-4 py-3 font-semibold text-foreground/60 w-1/3">
                            {item.label}
                          </td>
                          <td className="px-4 py-3 font-bold text-foreground">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Certifications & Compliance */}
        {activeTab === "compliance" && (
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground">
              Phytosanitary & Quality Accreditations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {(
                product.certifications || [
                  "ISO 22000 Food Safety Standard",
                  "USDA Organic Certified",
                  "Phytosanitary Ministry Release",
                  "Fair Trade International",
                ]
              ).map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-background/50 p-4 inset-shadow-foreground/30 inset-shadow-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{cert}</h4>
                    <p className="text-[11px] text-foreground/50 mt-0.5">
                      Verified and active for current export season. Certified digital copy available on consignment allocation.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Similar & Recommended Commodities Section */}
      {relatedProducts.length > 0 && (
        <div className="flex flex-col gap-8 mt-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
                Related Marketplace Lots
              </p>
              <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
                Similar Commodities
              </h2>
            </div>

            <Link
              href="/products"
              className="text-xs font-bold text-primary hover:underline self-start sm:self-auto"
            >
              View Full Marketplace →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* 5. Fullscreen Image Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={gallery[activeImgIndex] || product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* 6. Success Allocation Modal */}
      {importSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl border border-foreground/15 bg-background p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3 className={`${pinkAverage.className} text-2xl text-foreground`}>
              Consignment Allocated!
            </h3>

            <p className="text-xs text-foreground/60 leading-relaxed">
              Successfully imported{" "}
              <strong className="text-foreground">
                {importQty} {unit}
              </strong>{" "}
              of {product.name}. Escrow collateral has been provisioned and your consignment is ready in your import portfolio.
            </p>

            <div className="flex items-center gap-3 w-full pt-2">
              <button
                type="button"
                onClick={() => setImportSuccessModal(false)}
                className="flex-1 rounded-xl border border-foreground/15 py-3 text-xs font-semibold text-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
              >
                Stay on Page
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/imports")}
                className="flex-1 rounded-xl bg-primary py-3 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
              >
                Go to My Imports
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
