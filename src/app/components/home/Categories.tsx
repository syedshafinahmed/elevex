"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-3 pt-2 pb-6 sm:px-6 lg:px-10`}>
      <div className="flex items-center gap-1.5 sm:gap-2 lg:block">
        {/* Left Scroll Arrow (Mobile/Tablet only) */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          className={`shrink-0 flex lg:hidden h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/2 text-foreground inset-shadow-foreground/30 inset-shadow-sm transition-all active:scale-95 cursor-pointer ${canScrollLeft
              ? "opacity-100 hover:bg-foreground/5 hover:text-primary"
              : "opacity-30 cursor-not-allowed"
            }`}
          aria-label="Previous categories"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2]" />
        </button>

        {/* Categories Track: Single scrollable row (3 per view) on mobile, 6-col grid on large screen */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory gap-2 sm:gap-3 lg:grid lg:grid-cols-6 lg:gap-4.5 py-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const count = products.filter(
              (p) => p.category?.toLowerCase() === cat.name.toLowerCase()
            ).length;

            return (
              <Link
                key={cat.id}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative flex flex-col items-center justify-between rounded-2xl sm:rounded-3xl border border-foreground/10 bg-foreground/2 p-2.5 sm:p-4 lg:p-5 transition-all duration-300 inset-shadow-foreground/30 inset-shadow-sm hover:bg-foreground/4 cursor-pointer overflow-hidden flex-[0_0_calc((100%-16px)/3)] sm:flex-[0_0_calc((100%-24px)/3)] lg:flex-initial lg:w-auto shrink-0 snap-start"
              >
                {/* Subtle hover gradient illumination */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Category Illustration */}
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-28 flex items-center justify-center my-0.5 sm:my-1 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain drop-shadow-lg select-none pointer-events-none"
                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 112px"
                    priority
                  />
                </div>

                {/* Category Name & Listing Count (Appears on Hover) */}
                <div className="flex flex-col items-center text-center mt-1.5 sm:mt-2.5 z-10 w-full">
                  <span className="text-[10px] sm:text-xs lg:text-sm uppercase font-bold text-foreground/80 group-hover:text-primary transition-colors tracking-wide truncate w-full">
                    {cat.label}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-foreground/50 group-hover:text-foreground/75 transition-opacity duration-300 font-medium mt-0.5 opacity-0 group-hover:opacity-100 truncate w-full">
                    {count} {count === 1 ? "listing" : "listings"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Scroll Arrow (Mobile/Tablet only) */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          className={`shrink-0 flex lg:hidden h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/2 text-foreground inset-shadow-foreground/30 inset-shadow-sm transition-all active:scale-95 cursor-pointer ${canScrollRight
              ? "opacity-100 hover:bg-foreground/5 hover:text-primary"
              : "opacity-30 cursor-not-allowed"
            }`}
          aria-label="Next categories"
        >
          <ChevronRight className="h-4 w-4 stroke-[2]" />
        </button>
      </div>
    </section>
  );
}
