"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";

export default function AddExportPage() {
  const router = useRouter();
  const { addProduct } = useProducts();

  // Form state
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState<string>("");
  const [originCountry, setOriginCountry] = useState("");
  const [rating, setRating] = useState<string>("4.8");
  const [availableQuantity, setAvailableQuantity] = useState<string>("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Agricultural");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !image.trim() || !price || !originCountry.trim() || !availableQuantity) {
      setError("Please fill in all required fields.");
      return;
    }

    const numPrice = Number(price);
    const numQty = Number(availableQuantity);
    const numRating = Number(rating) || 5;

    if (numPrice <= 0 || numQty <= 0) {
      setError("Price and available quantity must be positive numbers.");
      return;
    }

    setLoading(true);

    try {
      addProduct({
        name: name.trim(),
        image: image.trim(),
        price: numPrice,
        originCountry: originCountry.trim(),
        rating: Math.min(5, Math.max(1, numRating)),
        availableQuantity: numQty,
        description: description.trim() || "High quality export commodity ready for international logistics.",
        category,
        exporterName: "My Export House",
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/exports");
      }, 1200);
    } catch {
      setError("Failed to add product. Please try again.");
      setLoading(false);
    }
  }

  // Demo presets for quick testing
  function handleFillSample(sampleType: "coffee" | "jute" | "spice") {
    if (sampleType === "coffee") {
      setName("Highland Washed Specialty Coffee");
      setImage("https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80");
      setPrice("2400");
      setOriginCountry("Ethiopia");
      setRating("4.9");
      setAvailableQuantity("1200");
      setCategory("Agricultural");
      setDescription("Direct-trade washed heirloom coffee from Yirgacheffe.");
    } else if (sampleType === "jute") {
      setName("Eco-Friendly Raw Hessian Jute Fabric");
      setImage("https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80");
      setPrice("180");
      setOriginCountry("Bangladesh");
      setRating("4.8");
      setAvailableQuantity("15000");
      setCategory("Textile");
      setDescription("Export-grade heavy duty hessian rolls for industrial packing.");
    } else {
      setName("Whole Black Tellicherry Peppercorns");
      setImage("https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=800&q=80");
      setPrice("950");
      setOriginCountry("India");
      setRating("4.7");
      setAvailableQuantity("4000");
      setCategory("Food");
      setDescription("Extra bold sun-dried black peppercorns with intense aroma.");
    }
  }

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 max-w-4xl mx-auto`}>
      {/* Preset Fill Pills */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/2 p-3 text-xs inset-shadow-foreground/10 inset-shadow-xs">
        <span className="text-foreground/50 font-semibold flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Auto-fill sample:
        </span>
        <button
          type="button"
          onClick={() => handleFillSample("coffee")}
          className="rounded-lg border border-foreground/10 bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground/75 hover:border-primary hover:text-primary transition-colors cursor-pointer"
        >
          Specialty Coffee
        </button>
        <button
          type="button"
          onClick={() => handleFillSample("jute")}
          className="rounded-lg border border-foreground/10 bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground/75 hover:border-primary hover:text-primary transition-colors cursor-pointer"
        >
          Raw Jute Rolls
        </button>
        <button
          type="button"
          onClick={() => handleFillSample("spice")}
          className="rounded-lg border border-foreground/10 bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground/75 hover:border-primary hover:text-primary transition-colors cursor-pointer"
        >
          Tellicherry Pepper
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-500 dark:text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-2xl border border-green-500/30 bg-green-500/10 p-3.5 text-xs text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Product added successfully! Redirecting to My Exports...</span>
        </div>
      )}

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 sm:p-8 inset-shadow-foreground/10 inset-shadow-xs"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
          {/* a. Product Name */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
              Product Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Single-Origin Colombian Arabica Coffee"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
            />
          </div>

          {/* b. Product Image (image url) */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
              Product Image URL *
            </label>
            <div className="relative flex items-center">
              <ImageIcon className="absolute left-3.5 h-4 w-4 text-foreground/40" />
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="h-11 w-full rounded-xl border border-foreground/15 bg-background pl-10 pr-3.5 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
              />
            </div>
            {image && (
              <div className="mt-2.5 relative h-36 w-full max-w-xs overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5">
                <Image src={image} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>

          {/* c. Price */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
              Price (৳ per unit) *
            </label>
            <input
              type="number"
              min="1"
              required
              placeholder="e.g. 2950"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="h-11 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
            />
          </div>

          {/* d. Origin Country */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
              Origin Country *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Bangladesh, Colombia, India"
              value={originCountry}
              onChange={(e) => setOriginCountry(e.target.value)}
              className="h-11 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
            />
          </div>

          {/* e. Rating */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
              Product Rating (1.0 - 5.0) *
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              required
              placeholder="e.g. 4.8"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="h-11 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
            />
          </div>

          {/* f. Available quantity */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
              Available Quantity (Units/Kg/Meters) *
            </label>
            <input
              type="number"
              min="1"
              required
              placeholder="e.g. 5000"
              value={availableQuantity}
              onChange={(e) => setAvailableQuantity(e.target.value)}
              className="h-11 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Category & Description */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:outline-none"
            >
              <option value="Agricultural">Agricultural</option>
              <option value="Textile">Textile</option>
              <option value="Food">Food</option>
              <option value="Minerals">Minerals</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-foreground/60 mb-1.5">
              Product Description
            </label>
            <input
              type="text"
              placeholder="Brief description of quality and packaging"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-11 w-full rounded-xl border border-foreground/15 bg-background px-3.5 text-foreground placeholder:text-foreground/30 focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* g. Add Export/Product Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-foreground/10">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            {loading ? "Adding Product..." : "Add Export/Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
