"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Plus,
  Search,
  Download,
  Edit2,
  Trash2,
  Eye,
  Star,
  MapPin,
  FileSpreadsheet,
  Package,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";
import Button from "@/app/components/ui/Button";
import { Product } from "@/lib/productsData";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";
import { toast } from "gooey-toast";
import { slugify } from "@/lib/utils";

export default function MyExportsPage() {
  const { data: session, status } = useSession();
  const { myExports, deleteProduct, loading: productsLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredExports = myExports.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.originCountry.toLowerCase().includes(search.toLowerCase())
  );

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

    toast.info({
      title: "CSV Exported",
    });
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

          <Button
            href="/dashboard/add-export"
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Export</span>
          </Button>
        </div>
      </div>

      {/* Exports Grid (3-column layout matching requirements) */}
      {status === "loading" || productsLoading ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs text-foreground/50">Loading your export listings...</p>
        </div>
      ) : filteredExports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-3 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Package className="h-7 w-7" />
          </div>
          <div className="flex flex-col gap-1 max-w-sm">
            <p className="text-sm font-semibold text-foreground">
              {search
                ? `No exports found matching "${search}"`
                : !session?.user
                ? "Please sign in to view your export listings"
                : "You haven't uploaded any export commodities yet"}
            </p>
            <p className="text-xs text-foreground/50">
              {search
                ? "Try searching for a different commodity title or country."
                : !session?.user
                ? "Sign in with your trader or enterprise account to manage your listings."
                : "Commodities you create and publish via Add Export will appear here."}
            </p>
          </div>
          <Button
            href="/dashboard/add-export"
            variant="primary"
            size="sm"
            className="mt-2 flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Add Export Now</span>
          </Button>
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
                  href={`/products/${item.slug || slugify(item.name) || item.id}`}
                  className="flex items-center gap-1 text-xs font-semibold text-foreground/60 hover:text-primary transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>See Details</span>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/products/${item.slug || slugify(item.name) || item.id}/edit`}
                    className="flex items-center gap-1 rounded-xl border border-foreground/15 bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-foreground/5 transition-colors inset-shadow-foreground/30 inset-shadow-sm"
                    title="Edit Commodity"
                  >
                    <Edit2 className="h-3 w-3 text-primary" />
                    <span>Edit</span>
                  </Link>
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
            toast.success({
              title: "Export Deleted",
            });
            setItemToDelete(null);
          }
        }}
        onClose={() => setItemToDelete(null)}
      />
    </div>
  );
}
