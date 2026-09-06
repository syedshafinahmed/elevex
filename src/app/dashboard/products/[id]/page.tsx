"use client";

import { use, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Star,
  Edit2,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Package,
  Boxes,
  TrendingUp,
  Clock,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Globe,
  Tag,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { useUserRole } from "@/context/UserRoleContext";
import { Product } from "@/lib/productsData";
import DeleteConfirmModal from "@/app/components/dashboard-components/DeleteConfirmModal";
import CustomDropdown, { DropdownOption } from "@/app/components/dashboard-components/CustomDropdown";
import { Sprout, Shirt, Utensils, Gem } from "lucide-react";

const categoryOptions: DropdownOption[] = [
  { value: "Agricultural", label: "Agricultural", description: "Crops, grains, raw materials", icon: Sprout },
  { value: "Textile", label: "Textile", description: "Fabrics, garments, fibers", icon: Shirt },
  { value: "Food", label: "Food", description: "Processed food & spices", icon: Utensils },
  { value: "Minerals", label: "Minerals", description: "Ores, metals, building stones", icon: Gem },
];

interface AdminProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminProductDetailsPage({ params }: AdminProductDetailsPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { products, updateProduct, deleteProduct } = useProducts();
  const { currentRole } = useUserRole();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const product = products.find((p) => p.id === resolvedParams.id);

  // Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOrigin, setEditOrigin] = useState("");
  const [editRating, setEditRating] = useState<number>(5);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [editCategory, setEditCategory] = useState("Agricultural");
  const [editDescription, setEditDescription] = useState("");

  if (!product) {
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
            The commodity with ID &ldquo;{resolvedParams.id}&rdquo; does not exist or has been removed.
          </p>
        </div>
        <Link
          href="/dashboard/products"
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Products</span>
        </Link>
      </div>
    );
  }

  const openEditModal = () => {
    setEditName(product.name);
    setEditImage(product.image);
    setEditPrice(product.price);
    setEditOrigin(product.originCountry);
    setEditRating(product.rating);
    setEditQuantity(product.availableQuantity);
    setEditCategory(product.category || "Agricultural");
    setEditDescription(product.description || "");
    setIsEditModalOpen(true);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(product.id, {
      name: editName.trim(),
      image: editImage.trim(),
      price: Number(editPrice),
      originCountry: editOrigin.trim(),
      rating: Number(editRating),
      availableQuantity: Number(editQuantity),
      category: editCategory,
      description: editDescription.trim(),
    });
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = () => {
    if (confirm(`Are you sure you want to delete ${product.name} from global inventory?`)) {
      deleteProduct(product.id);
      router.push("/dashboard/products");
    }
  };

  const totalValuation = product.price * product.availableQuantity;

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 w-full`}>
      {/* Top Navigation & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-foreground/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/products"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/2 text-foreground/70 hover:bg-foreground/6 hover:text-foreground transition-all cursor-pointer inset-shadow-foreground/10 inset-shadow-xs"
            title="Back to All Products"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-primary border border-primary/20">
              Admin Exclusive View
            </span>
            <span className="text-xs text-foreground/45 font-mono">
              SKU: {product.id}
            </span>
          </div>
        </div>

        {/* Action Buttons: Edit, Delete, View Public */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href={`/products/${product.id}`}
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3.5 py-2 text-xs font-semibold text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-all inset-shadow-foreground/10 inset-shadow-xs"
          >
            <ExternalLink className="h-3.5 w-3.5 text-primary" />
            <span>Public Marketplace</span>
          </Link>

          <button
            type="button"
            onClick={openEditModal}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all cursor-pointer"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit Product</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/15 transition-all cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Hero Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Image & Meta Badges (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/3 inset-shadow-foreground/10 inset-shadow-xs">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
            {/* Rating Tag */}
            <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-bold text-foreground backdrop-blur-md border border-foreground/10 shadow-lg">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>

            {/* Origin Tag */}
            <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md border border-foreground/10 shadow-lg">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{product.originCountry}</span>
            </div>
          </div>
        </div>

        {/* Right: Financial & Inventory Overview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-lg bg-foreground/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground/60">
                {product.category || "Agricultural"}
              </span>
              <span className="text-[11px] text-green-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Live in Marketplace
              </span>
            </div>
            <h1 className={`${pinkAverage.className} text-2xl sm:text-4xl text-foreground leading-tight`}>
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-foreground/60 mt-2 leading-relaxed">
              {product.description || "High-grade international export commodity verified for global cross-border trade."}
            </p>
          </div>

          {/* 4 Financial & Inventory Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5">
            {/* Unit Price */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/10 inset-shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-foreground/50 tracking-wider block mb-1">
                Unit Price
              </span>
              <div className={`${pinkAverage.className} text-2xl font-bold text-primary`}>
                ৳ {product.price.toLocaleString()}
              </div>
              <span className="text-[10px] text-foreground/45 mt-0.5 block">Per unit export cost</span>
            </div>

            {/* Total Stock Valuation */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/10 inset-shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-foreground/50 tracking-wider block mb-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-primary" /> Total Inventory Value
              </span>
              <div className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
                ৳ {totalValuation.toLocaleString()}
              </div>
              <span className="text-[10px] text-foreground/45 mt-0.5 block">Allocated stock valuation</span>
            </div>

            {/* Available Stock */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/10 inset-shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-foreground/50 tracking-wider block mb-1 flex items-center gap-1">
                <Boxes className="h-3 w-3 text-primary" /> Available Quantity
              </span>
              <div className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
                {product.availableQuantity.toLocaleString()}
              </div>
              <span className="text-[10px] text-foreground/45 mt-0.5 block">Units ready for export</span>
            </div>

            {/* Rating & Trust */}
            <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/10 inset-shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-foreground/50 tracking-wider block mb-1">
                Quality Rating
              </span>
              <div className={`${pinkAverage.className} text-2xl font-bold text-amber-500`}>
                {product.rating} / 5.0
              </div>
              <span className="text-[10px] text-foreground/45 mt-0.5 block">Verified merchant score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trade & Customs Specifications Section */}
      <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/10 inset-shadow-xs flex flex-col gap-4">
        <h3 className={`${pinkAverage.className} text-xl text-foreground flex items-center gap-2`}>
          <Globe className="h-5 w-5 text-primary" /> Trade & Regulatory Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="rounded-2xl border border-foreground/8 bg-foreground/2 p-3.5 flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-foreground/45 uppercase tracking-wider">
              HS Code / Tariff
            </span>
            <span className="font-bold text-foreground font-mono">
              HS-BD-0901.21.00
            </span>
            <span className="text-[10px] text-foreground/40">International Trade Classification</span>
          </div>

          <div className="rounded-2xl border border-foreground/8 bg-foreground/2 p-3.5 flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-foreground/45 uppercase tracking-wider">
              Country of Origin
            </span>
            <span className="font-bold text-foreground">
              {product.originCountry}
            </span>
            <span className="text-[10px] text-foreground/40">Registered sovereign origin</span>
          </div>

          <div className="rounded-2xl border border-foreground/8 bg-foreground/2 p-3.5 flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-foreground/45 uppercase tracking-wider">
              Quality Inspection
            </span>
            <span className="font-bold text-green-500 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Certified Grade-A
            </span>
            <span className="text-[10px] text-foreground/40">SGS / BSTI Standards Approved</span>
          </div>

          <div className="rounded-2xl border border-foreground/8 bg-foreground/2 p-3.5 flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-foreground/45 uppercase tracking-wider">
              System Registered At
            </span>
            <span className="font-bold text-foreground">
              {new Date(product.createdAt).toLocaleDateString()}
            </span>
            <span className="text-[10px] text-foreground/40">Entry timestamp</span>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {isEditModalOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-foreground/15 bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3 mb-4">
              <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                Edit Product Specifications
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground/50 hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Product Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={editImage}
                  onChange={(e) => setEditImage(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Price (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Origin Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={editOrigin}
                    onChange={(e) => setEditOrigin(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Rating (1 to 5) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    required
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Available Quantity *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(Number(e.target.value))}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Category
                </label>
                <CustomDropdown
                  value={editCategory}
                  options={categoryOptions}
                  onChange={(newCat) => setEditCategory(newCat)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full rounded-xl border border-foreground/15 bg-foreground/3 p-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="mt-3 flex items-center justify-end gap-2 pt-3 border-t border-foreground/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-foreground/60 hover:bg-foreground/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Product Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Commodity Listing"
        itemName={product.name}
        description="Are you sure you want to permanently remove this commodity from the global inventory? This will delete the listing from the marketplace and all active catalogs."
        confirmText="Delete Commodity"
        onConfirm={() => {
          deleteProduct(product.id);
          setIsDeleteModalOpen(false);
          router.push("/dashboard/products");
        }}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
