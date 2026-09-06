"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Search,
  Download,
  Edit2,
  Trash2,
  Eye,
  Star,
  MapPin,
  X,
  FileSpreadsheet,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/lib/productsData";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";

export default function MyExportsPage() {
  const { myExports, deleteProduct, updateProduct } = useProducts();
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [editModalItem, setEditModalItem] = useState<Product | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prefilled modal form state
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOrigin, setEditOrigin] = useState("");
  const [editRating, setEditRating] = useState<number>(5);
  const [editQuantity, setEditQuantity] = useState<number>(0);

  const filteredExports = myExports.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.originCountry.toLowerCase().includes(search.toLowerCase())
  );

  function openEditModal(item: Product) {
    setEditModalItem(item);
    setEditName(item.name);
    setEditImage(item.image);
    setEditPrice(item.price);
    setEditOrigin(item.originCountry);
    setEditRating(item.rating);
    setEditQuantity(item.availableQuantity);
  }

  function handleUpdateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editModalItem) return;

    updateProduct(editModalItem.id, {
      name: editName,
      image: editImage,
      price: Number(editPrice),
      originCountry: editOrigin,
      rating: Number(editRating),
      availableQuantity: Number(editQuantity),
    });

    setEditModalItem(null);
  }

  function handleDownloadCSV() {
    const headers = ["ID", "Name", "Price", "Origin Country", "Rating", "Available Quantity", "Created At"];
    const rows = myExports.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.price,
      `"${p.originCountry}"`,
      p.rating,
      p.availableQuantity,
      p.createdAt,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `elevex_my_exports_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Top Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/2 p-3 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-foreground/40" />
          <input
            type="text"
            placeholder="Search your export listings by name or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-xl border border-foreground/15 bg-background pl-9 pr-4 text-xs text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleDownloadCSV}
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3 py-2 text-xs font-semibold text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/30 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 text-primary" />
            <span>Download CSV</span>
          </button>

          <Link
            href="/dashboard/add-export"
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Export</span>
          </Link>
        </div>
      </div>

      {/* Exports Grid (3-column layout matching requirements) */}
      {filteredExports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-2">
          <p className="text-sm font-semibold text-foreground">No export products found.</p>
          <p className="text-xs text-foreground/50">Add your first product to start exporting globally.</p>
          <Link
            href="/dashboard/add-export"
            className="mt-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white"
          >
            Add Export Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExports.map((item) => (
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
                  {/* Rating Pill */}
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

                {/* 3. Price & 7. Available Quantity */}
                <div className="mt-3 flex items-center justify-between border-t border-b border-foreground/8 py-2.5 text-xs">
                  <div>
                    <span className="text-[10px] text-foreground/45 block uppercase">Price</span>
                    <span className="font-bold text-primary text-sm">৳ {item.price.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-foreground/45 block uppercase">Available Quantity</span>
                    <span className="font-semibold text-foreground">{item.availableQuantity} units</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: 6. Delete Button, 8. Update Button, See Details */}
              <div className="mt-4 flex items-center justify-between gap-2 pt-1">
                <Link
                  href={`/products/${item.id}`}
                  className="flex items-center gap-1 text-xs font-semibold text-foreground/60 hover:text-primary transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>See Details</span>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="flex items-center gap-1 rounded-xl border border-foreground/15 bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-foreground/5 transition-colors cursor-pointer inset-shadow-foreground/30 inset-shadow-sm"
                    title="Update Product"
                  >
                    <Edit2 className="h-3 w-3 text-primary" />
                    <span>Update</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/15 transition-colors cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(itemToDelete)}
        title="Delete Export Listing"
        itemName={itemToDelete?.name}
        description="Are you sure you want to remove this export listing? It will no longer be visible in the marketplace or your exports dashboard."
        confirmText="Delete Listing"
        onConfirm={() => {
          if (itemToDelete) {
            deleteProduct(itemToDelete.id);
            setItemToDelete(null);
          }
        }}
        onClose={() => setItemToDelete(null)}
      />

      {/* Prefilled Update Modal */}
      {editModalItem && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-foreground/15 bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3 mb-4">
              <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                Update Export Product
              </h3>
              <button
                type="button"
                onClick={() => setEditModalItem(null)}
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

              <div className="mt-3 flex items-center justify-end gap-2 pt-3 border-t border-foreground/10">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-foreground/60 hover:bg-foreground/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 cursor-pointer"
                >
                  Submit Changes
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
