"use client";

import { useState } from "react";
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
  ShieldAlert,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import { Product } from "@/lib/productsData";

export default function AdminProductsPage() {
  const { products, deleteProduct, updateProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Edit Modal State
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editOrigin, setEditOrigin] = useState("");
  const [editRating, setEditRating] = useState<number>(5);
  const [editQuantity, setEditQuantity] = useState<number>(0);
  const [editCategory, setEditCategory] = useState("Agricultural");

  const categories = ["All", "Agricultural", "Textile", "Food"];

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.originCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  function openEditModal(product: Product) {
    setEditItem(product);
    setEditName(product.name);
    setEditImage(product.image);
    setEditPrice(product.price);
    setEditOrigin(product.originCountry);
    setEditRating(product.rating);
    setEditQuantity(product.availableQuantity);
    setEditCategory(product.category || "Agricultural");
  }

  function handleUpdateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editItem) return;

    updateProduct(editItem.id, {
      name: editName.trim(),
      image: editImage.trim(),
      price: Number(editPrice),
      originCountry: editOrigin.trim(),
      rating: Number(editRating),
      availableQuantity: Number(editQuantity),
      category: editCategory,
    });

    setEditItem(null);
  }

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Filter, Search Bar & Actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/2 p-3 inset-shadow-foreground/10 inset-shadow-xs">
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

        {/* Search Input & Add Product CTA */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search name, origin, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-xl border border-foreground/15 bg-background pl-9 pr-3 text-xs text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
            />
          </div>

          <Link
            href="/dashboard/add-export"
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98] shrink-0"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Admin Table View */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-2">
          <ShoppingBag className="h-10 w-10 text-foreground/30 mb-2" />
          <p className="text-base font-semibold text-foreground">No products found matching &ldquo;{searchTerm}&rdquo;</p>
          <p className="text-xs text-foreground/50">Try a different search query or category filter.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 inset-shadow-foreground/10 inset-shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/3 text-[10px] uppercase tracking-wider text-foreground/50 font-semibold">
                  <th className="py-3.5 pl-6 pr-4">Product Details</th>
                  <th className="py-3.5 px-4">Origin</th>
                  <th className="py-3.5 px-4">Unit Price</th>
                  <th className="py-3.5 px-4">Available Stock</th>
                  <th className="py-3.5 px-4">Rating</th>
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
                            href={`/products/${item.id}`}
                            className="font-semibold text-foreground truncate hover:text-primary transition-colors text-xs"
                          >
                            {item.name}
                          </Link>
                          <span className="text-[10px] text-foreground/45 font-mono">
                            {item.category || "Agricultural"} · {item.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Origin Country */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-foreground/80 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{item.originCountry}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold text-primary text-sm whitespace-nowrap">
                      ৳ {item.price.toLocaleString()}
                    </td>

                    {/* Available Quantity */}
                    <td className="py-3.5 px-4 text-foreground/80 font-semibold whitespace-nowrap">
                      {item.availableQuantity.toLocaleString()} units
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </td>

                    {/* Actions: See Details, Edit, Delete */}
                    <td className="py-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/products/${item.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-foreground/10 bg-background text-foreground/60 hover:text-primary hover:border-primary transition-colors inset-shadow-foreground/10 inset-shadow-xs"
                          title="See Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-foreground/10 bg-background text-foreground/60 hover:text-primary hover:border-primary transition-colors cursor-pointer inset-shadow-foreground/10 inset-shadow-xs"
                          title="Edit Product"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-primary" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProduct(item.id)}
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
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-foreground/15 bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3 mb-4">
              <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                Edit Product Details
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
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="Agricultural">Agricultural</option>
                  <option value="Textile">Textile</option>
                  <option value="Food">Food</option>
                  <option value="Minerals">Minerals</option>
                </select>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2 pt-3 border-t border-foreground/10">
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
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
        </div>
      )}
    </div>
  );
}
