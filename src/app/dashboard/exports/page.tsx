"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Tag,
  MapPin,
  X,
  Upload,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";

interface ExportItem {
  id: string;
  name: string;
  category: string;
  hsCode: string;
  origin: string;
  price: string;
  moq: string;
  availableStock: string;
  status: "Active" | "Under Inspection" | "In Negotiation" | "Draft";
  image: string;
  views: number;
  inquiries: number;
}

const initialExports: ExportItem[] = [
  {
    id: "EXP-101",
    name: "Single-Origin Colombian Coffee Beans",
    category: "Agricultural",
    hsCode: "0901.11.00",
    origin: "Colombia (Huila)",
    price: "৳ 2,950.50 / kg",
    moq: "500 kg",
    availableStock: "8,500 kg",
    status: "Active",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg",
    views: 1420,
    inquiries: 18,
  },
  {
    id: "EXP-102",
    name: "Raw Premium Jute Fibre (Grade A)",
    category: "Textile",
    hsCode: "5303.10.10",
    origin: "Bangladesh (Faridpur)",
    price: "৳ 100.50 / kg",
    moq: "2,000 kg",
    availableStock: "45,000 kg",
    status: "Active",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    views: 980,
    inquiries: 24,
  },
  {
    id: "EXP-103",
    name: "Organic Handwoven Cotton Fabric",
    category: "Textile",
    hsCode: "5208.11.00",
    origin: "India (Gujarat)",
    price: "৳ 40.00 / meter",
    moq: "1,000 meters",
    availableStock: "12,000 m",
    status: "In Negotiation",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    views: 760,
    inquiries: 9,
  },
  {
    id: "EXP-104",
    name: "Cashew Kernels W320 Export Quality",
    category: "Agricultural",
    hsCode: "0801.32.00",
    origin: "Ivory Coast",
    price: "৳ 600.00 / kg",
    moq: "1,000 kg",
    availableStock: "16,000 kg",
    status: "Under Inspection",
    image: "https://images.unsplash.com/photo-1509914398867-2708b7d4d420?auto=format&fit=crop&w=600&q=80",
    views: 640,
    inquiries: 11,
  },
  {
    id: "EXP-105",
    name: "Premium Freeze-Dried Mangoes",
    category: "Food",
    hsCode: "0804.50.20",
    origin: "Philippines (Guimaras)",
    price: "৳ 180.00 / kg",
    moq: "250 kg",
    availableStock: "3,200 kg",
    status: "Draft",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
    views: 120,
    inquiries: 2,
  },
];

export default function ExportsPage() {
  const [exports, setExports] = useState<ExportItem[]>(initialExports);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // New Export Form State
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Agricultural");
  const [newHsCode, setNewHsCode] = useState("");
  const [newOrigin, setNewOrigin] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newMoq, setNewMoq] = useState("");
  const [newStock, setNewStock] = useState("");

  const categories = ["All", "Agricultural", "Textile", "Food"];

  const filteredExports = exports.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  function handleCreateExport(e: React.FormEvent) {
    e.preventDefault();
    if (!newName || !newPrice) return;

    const newItem: ExportItem = {
      id: `EXP-${100 + exports.length + 1}`,
      name: newName,
      category: newCategory,
      hsCode: newHsCode || "0000.00.00",
      origin: newOrigin || "Bangladesh",
      price: `৳ ${newPrice}`,
      moq: newMoq || "100 units",
      availableStock: newStock || "1,000 units",
      status: "Active",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
      views: 0,
      inquiries: 0,
    };

    setExports([newItem, ...exports]);
    setModalOpen(false);
    // Reset form
    setNewName("");
    setNewPrice("");
    setNewHsCode("");
    setNewOrigin("");
    setNewMoq("");
    setNewStock("");
  }

  function getStatusBadge(status: ExportItem["status"]) {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
      case "Under Inspection":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "In Negotiation":
        return "bg-primary/10 text-primary border-primary/20";
      case "Draft":
        return "bg-foreground/10 text-foreground/50 border-foreground/15";
    }
  }

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`${pinkAverage.className} text-2xl sm:text-3xl text-foreground`}>
            My Export Catalog
          </h1>
          <p className="text-xs text-foreground/55 mt-1">
            Manage your commodity listings, HS tariff codes, pricing, and live buyer inquiries.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          Add Export Listing
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/2 p-3 inset-shadow-foreground/10 inset-shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex items-center min-w-[240px]">
          <Search className="absolute left-3 h-3.5 w-3.5 text-foreground/40" />
          <input
            type="text"
            placeholder="Search commodities or HS code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-xl border border-foreground/10 bg-foreground/4 pl-8 pr-3 text-xs text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredExports.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-4 transition-all hover:border-foreground/20 hover:bg-foreground/4 inset-shadow-foreground/10 inset-shadow-xs"
          >
            <div>
              {/* Image & Status Badge */}
              <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-foreground/5 mb-3.5">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-md ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-mono text-foreground/80 backdrop-blur-md">
                  {item.hsCode}
                </div>
              </div>

              {/* Title & Origin */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[11px] text-foreground/45">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span>{item.origin}</span> · <span>{item.category}</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
              </div>

              {/* Specs & Volume */}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-b border-foreground/10 py-2.5 text-[11px]">
                <div>
                  <span className="text-foreground/45 block text-[10px]">Price</span>
                  <span className="font-semibold text-primary">{item.price}</span>
                </div>
                <div>
                  <span className="text-foreground/45 block text-[10px]">Available Stock</span>
                  <span className="font-semibold text-foreground">{item.availableStock}</span>
                </div>
                <div>
                  <span className="text-foreground/45 block text-[10px]">MOQ</span>
                  <span className="text-foreground/75 font-medium">{item.moq}</span>
                </div>
                <div>
                  <span className="text-foreground/45 block text-[10px]">Inquiries</span>
                  <span className="text-foreground/75 font-medium">{item.inquiries} buyers</span>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="mt-4 flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-foreground/40">{item.id}</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  title="Edit listing"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/4 text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  title="View analytics"
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/4 text-foreground/60 hover:text-primary transition-colors cursor-pointer"
                >
                  <Eye className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Export Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-foreground/15 bg-background p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3 mb-4">
              <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                List New Commodity for Export
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground/50 hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateExport} className="flex flex-col gap-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Commodity / Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grade 1 Sesame Seeds"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Agricultural">Agricultural</option>
                    <option value="Textile">Textile</option>
                    <option value="Food">Food</option>
                    <option value="Minerals">Minerals</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    HS Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1207.40.90"
                    value={newHsCode}
                    onChange={(e) => setNewHsCode(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Origin Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bangladesh"
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Unit Price (৳) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 450.00 / kg"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Minimum Order (MOQ)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500 kg"
                    value={newMoq}
                    onChange={(e) => setNewMoq(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Available Stock
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10,000 kg"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2 pt-2 border-t border-foreground/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground/60 hover:bg-foreground/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 cursor-pointer"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
