"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Star,
  MapPin,
  Eye,
  ShoppingBag,
  Edit2,
  Trash2,
  X,
  Plus,
  LayoutGrid,
  List as ListIcon,
  ChevronRight,
  TrendingUp,
  Boxes,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/lib/productsData";
import ProductCard from "@/app/components/products/ProductCard";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";
import Dropdown, { DropdownOption } from "@/app/components/dashboard/Dropdown";
import Button from "@/app/components/ui/Button";
import { toast } from "gooey-toast";
import { Sprout, Shirt, Utensils, Gem } from "lucide-react";

const categoryOptions: DropdownOption[] = [
  { value: "Agricultural", label: "Agricultural", description: "Crops, grains, raw materials", icon: Sprout },
  { value: "Textile", label: "Textile", description: "Fabrics, garments, fibers", icon: Shirt },
  { value: "Food", label: "Food", description: "Processed food & spices", icon: Utensils },
  { value: "Minerals", label: "Minerals", description: "Ores, metals, building stones", icon: Gem },
];

export default function AdminProductsPage() {
  const { products, deleteProduct, updateProduct } = useProducts();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Edit Modal State
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editUnit, setEditUnit] = useState("units");
  const [editOrigin, setEditOrigin] = useState("");
  const [editRating, setEditRating] = useState<number>(5);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [editCategory, setEditCategory] = useState("Agricultural");
  const [editDescription, setEditDescription] = useState("");
  const [editHsCode, setEditHsCode] = useState("");
  const [editPort, setEditPort] = useState("");
  const [editLeadTime, setEditLeadTime] = useState("");
  const [editPackaging, setEditPackaging] = useState("");
  const [editMinOrderQty, setEditMinOrderQty] = useState<number>(1);

  const categories = ["All", "Agricultural", "Textile", "Food", "Minerals"];

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.originCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalInventoryUnits = products.reduce((acc, p) => acc + (p.availableQuantity || 0), 0);
  const totalValuation = products.reduce((acc, p) => acc + ((p.price || 0) * (p.availableQuantity || 0)), 0);

  function openEditModal(product: Product) {
    setEditItem(product);
    setEditName(product.name);
    setEditImage(product.image);
    setEditPrice(product.price);
    setEditUnit(product.unit || "units");
    setEditOrigin(product.originCountry);
    setEditRating(product.rating);
    setEditQuantity(product.availableQuantity);
    setEditCategory(product.category || "Agricultural");
    setEditDescription(product.description || "");
    setEditHsCode(product.hsCode || "");
    setEditPort(product.portOfLoading || "");
    setEditLeadTime(product.leadTime || "");
    setEditPackaging(product.packaging || "");
    setEditMinOrderQty(product.minOrderQty || 1);
  }

  function handleUpdateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editItem) return;

    updateProduct(editItem.id, {
      name: editName.trim(),
      image: editImage.trim(),
      price: Number(editPrice),
      unit: editUnit.trim() || "units",
      originCountry: editOrigin.trim(),
      rating: Number(editRating),
      availableQuantity: Number(editQuantity),
      category: editCategory,
      description: editDescription.trim(),
      hsCode: editHsCode.trim(),
      portOfLoading: editPort.trim(),
      leadTime: editLeadTime.trim(),
      packaging: editPackaging.trim(),
      minOrderQty: Number(editMinOrderQty) || 1,
    });

    toast.success({
      title: "Product Updated Successfully",
    });

    setEditItem(null);
  }

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 w-full`}>
      {/* 1. Header Navigation & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-foreground/10">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-foreground/60 mb-1.5">
            <Link href="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-foreground/30 shrink-0" />
            <span className="font-bold text-foreground">Products Management</span>
          </nav>
          <h1 className={`${pinkAverage.className} text-2xl sm:text-3xl text-foreground`}>
            All Commodities & Export Inventory
          </h1>
        </div>

        {/* Quick Stats Strip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/2 px-3.5 py-2 text-xs inset-shadow-foreground/30 inset-shadow-sm">
            <Boxes className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-semibold text-foreground/45">Total Listings</span>
              <span className="font-bold text-foreground">{products.length} Products</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/2 px-3.5 py-2 text-xs inset-shadow-foreground/30 inset-shadow-sm">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-semibold text-foreground/45">Stock Value</span>
              <span className="font-bold text-foreground">৳ {totalValuation.toLocaleString()}</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            href="/dashboard/add-export"
            className="gap-1.5 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 shrink-0"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Export</span>
          </Button>
        </div>
      </div>

      {/* 2. Search Bar, Category Filters & View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/2 p-3 inset-shadow-foreground/30 inset-shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input & View Mode Toggle */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search name, origin, HS code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-xl border border-foreground/15 bg-background pl-9 pr-3 text-xs text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Grid / Table Toggle */}
          <div className="flex items-center rounded-xl border border-foreground/15 bg-background p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-primary text-white"
                  : "text-foreground/50 hover:text-foreground"
              }`}
              title="Table View"
            >
              <ListIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "text-foreground/50 hover:text-foreground"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Products Display (Table vs Grid) */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-2 inset-shadow-foreground/30 inset-shadow-sm">
          <ShoppingBag className="h-10 w-10 text-foreground/30 mb-2" />
          <p className="text-base font-semibold text-foreground">
            No commodities found matching &ldquo;{searchTerm}&rdquo;
          </p>
          <p className="text-xs text-foreground/50">Try a different search query or category filter.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/3 text-[10px] uppercase tracking-wider text-foreground/50 font-semibold">
                  <th className="py-3.5 pl-6 pr-4">Product Details</th>
                  <th className="py-3.5 px-4">Origin & Port</th>
                  <th className="py-3.5 px-4">Export Unit Price</th>
                  <th className="py-3.5 px-4">Available Stock</th>
                  <th className="py-3.5 px-4">Quality Rating</th>
                  <th className="py-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/6">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-foreground/3 transition-colors group">
                    {/* Product Image & Title */}
                    <td className="py-3.5 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-foreground/5 border border-foreground/10">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col min-w-0 max-w-xs">
                          <Link
                            href={`/dashboard/products/${item.id}`}
                            className="font-semibold text-foreground truncate hover:text-primary transition-colors text-xs"
                          >
                            {item.name}
                          </Link>
                          <span className="text-[10px] text-foreground/45 font-mono">
                            {item.category || "Agricultural"} · HS: {item.hsCode || "0901.11"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Origin Country & Port */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-foreground/80 font-medium">
                          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{item.originCountry}</span>
                        </div>
                        {item.portOfLoading && (
                          <span className="text-[10px] text-foreground/45">
                            Port: {item.portOfLoading}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-primary text-sm whitespace-nowrap">
                      ৳ {item.price.toLocaleString()} <span className="text-[10px] text-foreground/40 font-normal">/{item.unit || "units"}</span>
                    </td>

                    {/* Available Quantity */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-semibold text-foreground/80">
                        {item.availableQuantity.toLocaleString()} {item.unit || "units"}
                      </span>
                      {item.minOrderQty && item.minOrderQty > 1 && (
                        <span className="block text-[10px] text-foreground/45">
                          MOQ: {item.minOrderQty} {item.unit || "units"}
                        </span>
                      )}
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </td>

                    {/* Actions: View Details, Edit, Delete */}
                    <td className="py-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/dashboard/products/${item.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-foreground/10 bg-background text-foreground/60 hover:text-primary hover:border-primary transition-colors inset-shadow-foreground/30 inset-shadow-sm"
                          title="See Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-foreground/10 bg-background text-foreground/60 hover:text-primary hover:border-primary transition-colors cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
                          title="Edit Product"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-primary" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setProductToDelete(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/15 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editItem && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-foreground/15 bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3 mb-4">
              <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                Edit Commodity Listing
              </h3>
              <button
                type="button"
                onClick={() => setEditItem(null)}
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
                    Unit (e.g. kg, meters, tons)
                  </label>
                  <input
                    type="text"
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Available Stock *
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    HS Tariff Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0901.11.00"
                    value={editHsCode}
                    onChange={(e) => setEditHsCode(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Min. Order Qty (MOQ)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editMinOrderQty}
                    onChange={(e) => setEditMinOrderQty(Number(e.target.value))}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Category
                </label>
                <Dropdown
                  options={categoryOptions}
                  value={editCategory}
                  onChange={(val) => setEditCategory(val)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full rounded-xl border border-foreground/15 bg-foreground/3 p-3 text-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-foreground/10">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="rounded-xl border border-foreground/15 bg-background px-4 py-2 font-semibold text-foreground hover:bg-foreground/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2 font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <DeleteConfirmModal
          isOpen={!!productToDelete}
          title="Delete Commodity"
          itemName={productToDelete.name}
          onClose={() => setProductToDelete(null)}
          onConfirm={() => {
            deleteProduct(productToDelete.id);
            toast.success({
              title: "Product Deleted Successfully",
            });
            setProductToDelete(null);
          }}
        />
      )}
    </div>
  );
}
