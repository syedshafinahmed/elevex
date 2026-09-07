"use client";

import { use, useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  MapPin,
  Edit2,
  Trash2,
  ExternalLink,
  Package,
  Boxes,
  Clock,
  X,
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  Layers,
  Anchor,
  FileText,
  Maximize2,
  ChevronRight,
  DollarSign,
  Truck,
  FileCheck,
  Plus,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/lib/productsData";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";
import Dropdown, { DropdownOption } from "@/app/components/dashboard/Dropdown";
import Button from "@/app/components/ui/Button";
import { toast } from "gooey-toast";
import { Sprout, Shirt, Utensils, Gem, FlaskConical, Cog } from "lucide-react";
import { slugify } from "@/lib/utils";

const categoryOptions: DropdownOption[] = [
  { value: "Agricultural", label: "Agricultural", description: "Crops, grains, raw materials", icon: Sprout },
  { value: "Textile", label: "Textile", description: "Fabrics, garments, fibers", icon: Shirt },
  { value: "Food", label: "Food", description: "Processed food & spices", icon: Utensils },
  { value: "Minerals", label: "Minerals", description: "Ores, metals, building stones", icon: Gem },
  { value: "Chemicals", label: "Chemicals", description: "Polymers, solvents, specialty chemicals", icon: FlaskConical },
  { value: "Machinery", label: "Machinery", description: "Industrial equipment, tools & parts", icon: Cog },
];

interface AdminProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminProductDetailsPage({ params }: AdminProductDetailsPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { products, loading: productsLoading, updateProduct, deleteProduct } = useProducts();
  const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const existing = products.find((p) => p.slug === resolvedParams.id || p.id === resolvedParams.id);
    if (!existing) {
      setIsFetching(true);
      fetch(`/api/products/${resolvedParams.id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setFetchedProduct(data);
        })
        .catch(() => { })
        .finally(() => setIsFetching(false));
    }
  }, [resolvedParams.id, products]);

  const product = products.find((p) => p.slug === resolvedParams.id || p.id === resolvedParams.id) || fetchedProduct;

  // Gallery & Lightbox
  const gallery = useMemo(() => {
    if (!product) return [];
    if (product.gallery && product.gallery.length > 0) {
      return product.gallery;
    }
    return [product.image];
  }, [product]);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: session } = useSession();
  const userRole = (session?.user as { role?: string } | undefined)?.role;
  const isAdmin = userRole === "ADMIN";
  const currentUserId = session?.user?.id;
  const currentUserName = session?.user?.name?.toLowerCase().trim();
  const currentUserEmail = session?.user?.email?.toLowerCase().trim();

  const isOwner = Boolean(
    product && (
      (product.userId && currentUserId && product.userId === currentUserId) ||
      (product.exporterName && (
        (currentUserName && product.exporterName.toLowerCase().trim() === currentUserName) ||
        (currentUserEmail && product.exporterName.toLowerCase().trim() === currentUserEmail)
      ))
    )
  );

  const canAccess = isAdmin || isOwner;

  if (!product) {
    if (productsLoading || isFetching) {
      return (
        <div className={`${sansation.className} flex flex-col items-center justify-center py-24 text-center gap-4`}>
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs text-foreground/50">Loading commodity specifications...</p>
        </div>
      );
    }

    return (
      <div className={`${sansation.className} flex flex-col items-center justify-center py-20 text-center gap-4`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-foreground/10 bg-foreground/3">
          <Package className="h-8 w-8 text-foreground/40" />
        </div>
        <div>
          <h2 className={`${pinkAverage.className} text-2xl text-foreground`}>
            Product Not Found
          </h2>
          <p className="text-xs text-foreground/50 mt-1">
            The commodity with identifier &ldquo;{resolvedParams.id}&rdquo; does not exist or has been removed.
          </p>
        </div>
        <Link
          href={isAdmin ? "/dashboard/products" : "/dashboard/exports"}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{isAdmin ? "Back to All Products" : "Back to My Exports"}</span>
        </Link>
      </div>
    );
  }

  if (!canAccess) {
    return (
      <div className={`${sansation.className} flex flex-col items-center justify-center py-20 text-center gap-4`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 text-red-500">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div>
          <h2 className={`${pinkAverage.className} text-2xl text-foreground`}>
            Access Restricted
          </h2>
          <p className="text-xs text-foreground/50 mt-1 max-w-md">
            You can only view dashboard specifications for export commodities that you uploaded.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/exports"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to My Exports</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl border border-foreground/15 bg-background px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-foreground/5"
          >
            <span>Dashboard Overview</span>
          </Link>
        </div>
      </div>
    );
  }

  const unit = product.unit || "kg";
  const minOrder = product.minOrderQty || 1;

  const handleDelete = () => {
    deleteProduct(product.id);
    setIsDeleteModalOpen(false);
    toast.success({ title: "Product Deleted Successfully" });
    if (isAdmin) {
      router.push("/dashboard/products");
    } else {
      router.push("/dashboard/exports");
    }
  };

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 w-full`}>
      {/* 1. Header Navigation & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-foreground/10">
        <div className="flex flex-col gap-1.5">
          <nav className="flex items-center gap-1.5 text-xs text-foreground/60">
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-foreground/30 shrink-0" />
            <Link href={isAdmin ? "/dashboard/products" : "/dashboard/exports"} className="hover:text-primary transition-colors">
              {isAdmin ? "Products" : "My Exports"}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-foreground/30 shrink-0" />
            <span className="font-bold text-foreground truncate max-w-[200px] sm:max-w-xs">
              {product.name}
            </span>
          </nav>

          <div className="flex items-center gap-3 flex-wrap">
            <h1 className={`${pinkAverage.className} text-2xl sm:text-3xl text-foreground`}>
              {product.name}
            </h1>
            <span className="rounded-lg bg-foreground/5 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/60 border border-foreground/10">
              SKU: {product.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-foreground/60 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-primary" /> {product.originCountry}
            </span>
            {product.portOfLoading && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Anchor className="h-3.5 w-3.5 text-primary" /> Port: {product.portOfLoading}
                </span>
              </>
            )}
            {product.hsCode && (
              <>
                <span>•</span>
                <span className="font-mono">HS Code: {product.hsCode}</span>
              </>
            )}
            {product.category && (
              <>
                <span>•</span>
                <span className="rounded-md bg-foreground/5 px-2 py-0.5 text-[10px] font-semibold text-foreground/70 uppercase">
                  {product.category}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/products/${product.slug || slugify(product.name) || product.id}`}
            target="_blank"
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-foreground/5 transition-all shadow-xs shrink-0"
          >
            <ExternalLink className="h-3.5 w-3.5 text-primary" />
            <span>Buyer View</span>
          </Link>

          <Link
            href={`/dashboard/products/${product.slug || slugify(product.name) || product.id}/edit`}
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-foreground/5 transition-all shadow-xs shrink-0"
          >
            <Edit2 className="h-3.5 w-3.5 text-primary" />
            <span>Edit</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-all cursor-pointer shrink-0"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* 2. Key Product Data Points (Executive Metrics Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-foreground/45 block">Unit Price</span>
            <span className={`${pinkAverage.className} text-xl font-bold text-primary block mt-0.5`}>
              ৳ {product.price.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-foreground/50 mt-1">per {unit}</span>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-foreground/45 block">Available Stock</span>
            <span className={`${pinkAverage.className} text-xl font-bold text-foreground block mt-0.5`}>
              {product.availableQuantity.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-foreground/50 mt-1">{unit} in stock</span>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-foreground/45 block">Min Order (MOQ)</span>
            <span className={`${pinkAverage.className} text-xl font-bold text-foreground block mt-0.5`}>
              {minOrder}
            </span>
          </div>
          <span className="text-[10px] text-foreground/50 mt-1">{unit} threshold</span>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-foreground/45 block">Lead Time</span>
            <span className={`${pinkAverage.className} text-xl font-bold text-foreground block mt-0.5 truncate`}>
              {product.leadTime || "5 - 10 Days"}
            </span>
          </div>
          <span className="text-[10px] text-foreground/50 mt-1">Dispatch window</span>
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-foreground/45 block">Shelf Life</span>
            <span className={`${pinkAverage.className} text-xl font-bold text-foreground block mt-0.5 truncate`}>
              {product.shelfLife || "24 Months"}
            </span>
          </div>
          <span className="text-[10px] text-foreground/50 mt-1">Guaranteed</span>
        </div>
      </div>

      {/* 3. Product Content Grid: Media + Description (Left) & Specs + Compliance (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column (6 cols): Media Gallery, Packaging & Description */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Media Showcase */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/10 group">
              <Image
                src={gallery[activeImgIndex] || product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <Maximize2 className="h-3.5 w-3.5" /> Fullscreen View
              </button>
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${activeImgIndex === idx
                        ? "border-primary shadow-md"
                        : "border-foreground/10 opacity-60 hover:opacity-100"
                      }`}
                  >
                    <Image src={imgUrl} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Packaging Spec */}
            {product.packaging && (
              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-3.5 text-xs flex items-start gap-2.5">
                <Package className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground">Packaging Standard:</span>
                  <p className="text-foreground/70 mt-0.5">{product.packaging}</p>
                </div>
              </div>
            )}

            {/* Product Description */}
            <div className="pt-2 border-t border-foreground/8 flex flex-col gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                Description
              </h4>
              <p className="text-xs text-foreground/80 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
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

        {/* Right Column (6 cols): Specifications & Compliance */}
        <div className="lg:col-span-6 flex flex-col gap-6">

          {/* Specifications Table */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                  Technical Specifications
                </h3>
              </div>
            </div>

            {product.specs && product.specs.length > 0 ? (
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
            ) : (
              <p className="text-xs text-foreground/50 py-2">
                No custom specifications added for this commodity.
              </p>
            )}
          </div>

          {/* Certifications Ledger */}
          <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-emerald-500" />
                <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                  Certifications & Standards
                </h3>
              </div>
            </div>

            {product.certifications && product.certifications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-background/50 p-3.5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-foreground">{cert}</h5>
                      <p className="text-[10px] text-foreground/50 mt-0.5">
                        Active & verified digital certificate.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-foreground/50 py-2">
                No certifications registered for this commodity.
              </p>
            )}
          </div>

        </div>

      </div>

      {/* 4. Fullscreen Lightbox Modal */}
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

      {/* 5. Delete Confirm Modal */}
      {isDeleteModalOpen && mounted && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          itemName={product.name}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
