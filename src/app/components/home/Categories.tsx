"use client";

import Image from "next/image";
import Link from "next/link";
import { sansation } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";

const CATEGORIES = [
  {
    id: "agricultural",
    name: "Agricultural",
    label: "agricultural",
    image: "https://res.cloudinary.com/dxipjzeda/image/upload/v1788798463/agricultural_sumwke.png",
  },
  {
    id: "textile",
    name: "Textile",
    label: "textile",
    image: "https://res.cloudinary.com/dxipjzeda/image/upload/v1788798463/textile_b8v69o.png",
  },
  {
    id: "food",
    name: "Food",
    label: "food",
    image: "https://res.cloudinary.com/dxipjzeda/image/upload/v1788798492/food_k8omue.png",
  },
  {
    id: "minerals",
    name: "Minerals",
    label: "minerals",
    image: "https://res.cloudinary.com/dxipjzeda/image/upload/v1788798464/minerals_rg3qd0.png",
  },
  {
    id: "chemicals",
    name: "Chemicals",
    label: "chemicals",
    image: "https://res.cloudinary.com/dxipjzeda/image/upload/v1788798463/chemicals_fre6mj.png",
  },
  {
    id: "machinery",
    name: "Machinery",
    label: "machinery",
    image: "https://res.cloudinary.com/dxipjzeda/image/upload/v1788798463/machinery_wvvxzf.png",
  },
];

export default function Categories() {
  const { products } = useProducts();

  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 pt-2 pb-6 sm:px-6 lg:px-10`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
        {CATEGORIES.map((cat) => {
          const count = products.filter(
            (p) => p.category?.toLowerCase() === cat.name.toLowerCase()
          ).length;

          return (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col items-center justify-between rounded-3xl border border-foreground/10 bg-foreground/2 p-4 sm:p-5 transition-all duration-300 inset-shadow-foreground/30 inset-shadow-sm hover:bg-foreground/4 cursor-pointer overflow-hidden"
            >
              {/* Subtle hover gradient illumination */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Category Illustration with Smooth Hover Elevation */}
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center my-1 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-contain drop-shadow-lg select-none pointer-events-none"
                  sizes="(max-width: 640px) 96px, 112px"
                  priority
                />
              </div>

              {/* Category Name & Listing Count (Appears on Hover) */}
              <div className="flex flex-col items-center text-center mt-2.5 z-10">
                <span className="text-xs sm:text-sm uppercase font-bold text-foreground/80 group-hover:text-primary transition-colors tracking-wider">
                  {cat.label}
                </span>
                <span className="text-[10px] text-foreground/50 group-hover:text-foreground/75 transition-opacity duration-300 font-medium mt-0.5 opacity-0 group-hover:opacity-100">
                  {count} {count === 1 ? "listing" : "listings"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
