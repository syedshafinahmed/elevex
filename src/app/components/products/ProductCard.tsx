"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { Product } from "@/lib/productsData";
import { sansation } from "@/lib/fonts";
import Button from "@/app/components/ui/Button";
import { toast } from "gooey-toast";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

const CART_STORAGE_KEY = "elevex_cart_v1";

export default function ProductCard({
  product,
  viewMode = "grid",
}: ProductCardProps) {
  const router = useRouter();
  const [isInCart, setIsInCart] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);

  const unit = product.unit || "units";
  const isOutOfStock = product.availableQuantity <= 0;
  const isLowStock = product.availableQuantity > 0 && product.availableQuantity <= 500;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const list: { id: string; quantity: number }[] = JSON.parse(saved);
        setIsInCart(list.some((item) => item.id === product.id));
      }
    } catch {}
  }, [product.id]);

  function handleAddToCart(e?: React.MouseEvent) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isOutOfStock) {
      toast.error({
        title: "Commodity is Out of Stock",
      });
      return;
    }

    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      let list: { id: string; quantity: number }[] = saved ? JSON.parse(saved) : [];
      const existing = list.find((item) => item.id === product.id);

      if (existing) {
        list = list.filter((item) => item.id !== product.id);
        setIsInCart(false);
        toast.info({
          title: "Removed from Cart",
        });
      } else {
        list.push({ id: product.id, quantity: product.minOrderQty || 1 });
        setIsInCart(true);
        toast.success({
          title: "Added to Cart",
        });
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(list));
    } catch {
      setIsInCart(!isInCart);
    }
  }

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  // Calculate stock meter percentage (clamped between 8% and 100%)
  const stockPercentage = Math.min(
    100,
    Math.max(8, (product.availableQuantity / 5000) * 100)
  );

  // -------------------------------------------------------------
  // LIST VIEW LAYOUT
  // -------------------------------------------------------------
  if (viewMode === "list") {
    return (
      <div
        onClick={handleCardClick}
        className={`${sansation.className} group relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-4 transition-all duration-300 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer hover:border-foreground/20 hover:bg-foreground/4`}
      >
        {/* Left: Image & Info */}
        <div className="flex items-center gap-3.5 min-w-[260px]">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/10">
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() =>
                setImgSrc(
                  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
                )
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                {product.category || "Commodity"}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-foreground/60 font-medium">
                <MapPin className="h-3 w-3 text-primary shrink-0" />
                <span>{product.originCountry}</span>
              </span>
            </div>

            <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 text-xs text-foreground/50">
              <span>{product.exporterName}</span>
              {product.hsCode && (
                <span className="text-[10px] text-foreground/40 font-mono">
                  · HS: {product.hsCode}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Specs & Stock */}
        <div className="flex items-center gap-6 text-xs text-foreground/70">
          <div>
            <span className="text-[10px] text-foreground/45 block uppercase font-semibold">
              Available Stock
            </span>
            <span
              className={`font-bold text-xs ${
                isOutOfStock
                  ? "text-red-500"
                  : isLowStock
                  ? "text-amber-500"
                  : "text-foreground"
              }`}
            >
              {product.availableQuantity.toLocaleString()} {unit}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-foreground/45 block uppercase font-semibold">
              Price
            </span>
            <span className="text-base font-extrabold text-primary">
              ৳ {product.price.toLocaleString()}
            </span>
            <span className="text-[10px] text-foreground/45">/{unit}</span>
          </div>
        </div>

        {/* Right: CTA Buttons */}
        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddToCart}
            className={
              isInCart
                ? "!border-primary !bg-primary/10 !text-primary"
                : ""
            }
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>{isInCart ? "In Cart" : "Add to Cart"}</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            href={`/products/${product.id}`}
            className="text-white"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // GRID VIEW LAYOUT
  // -------------------------------------------------------------
  return (
    <div
      onClick={handleCardClick}
      className={`${sansation.className} group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-3.5 transition-all duration-300 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer hover:border-foreground/20 hover:bg-foreground/4`}
    >
      <div>
        {/* 1. Clean Product Image (No badges) */}
        <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/8 mb-3">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
            onError={() =>
              setImgSrc(
                "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
              )
            }
          />
        </div>

        {/* 2. Country & Category Header - Shows only country name */}
        <div className="flex items-center justify-between text-[11px] text-foreground/60 mb-1">
          <div className="flex items-center gap-1 font-medium">
            <MapPin className="h-3 w-3 text-primary shrink-0" />
            <span>{product.originCountry}</span>
          </div>
          <span className="rounded-md bg-foreground/5 px-2 py-0.5 text-[9px] font-semibold text-foreground/60 uppercase">
            {product.category || "Export"}
          </span>
        </div>

        {/* 3. Product Name */}
        <h3 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 min-h-[38px] group-hover:text-primary transition-colors leading-snug">
          {product.name}
        </h3>

        {/* 4. Price & Available Stock (Structured as before, without a nested container box) */}
        <div className="mt-2.5 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-foreground/45 block uppercase font-semibold">
              Price
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-extrabold text-primary text-base sm:text-lg">
                ৳ {product.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-foreground/45 font-medium">/{unit}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-foreground/45 block uppercase font-semibold">
              Available Stock
            </span>
            <span
              className={`text-xs font-bold block mt-0.5 ${
                isOutOfStock
                  ? "text-red-500"
                  : isLowStock
                  ? "text-amber-500"
                  : "text-foreground"
              }`}
            >
              {product.availableQuantity.toLocaleString()} {unit}
            </span>
          </div>
        </div>

        {/* 5. Stock Depth Micro Progress Bar */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOutOfStock
                ? "bg-red-500"
                : isLowStock
                ? "bg-amber-500"
                : "bg-primary"
            }`}
            style={{ width: `${stockPercentage}%` }}
          />
        </div>
      </div>

      {/* 6. CTA Buttons: Add to Cart (Outline) & View Details (Primary) */}
      <div className="mt-3.5 pt-1 grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddToCart}
          className={`w-full ${
            isInCart
              ? "!border-primary !bg-primary/10 !text-primary"
              : ""
          }`}
        >
          <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
          <span>{isInCart ? "In Cart" : "Add to Cart"}</span>
        </Button>

        <Button
          variant="primary"
          size="sm"
          href={`/products/${product.id}`}
          className="w-full text-white"
        >
          <span>View Details</span>
          <ArrowRight className="h-3 w-3 shrink-0" />
        </Button>
      </div>
    </div>
  );
}
