"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Building,
  Heart,
  MapPin,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import Button from "../ui/Button";

// const tickerStats = [
//   { label: "Exporters", value: "3,140+", icon: Package },
//   { label: "Countries", value: "62", icon: Globe2 },
//   { label: "Protected", value: "100%", icon: ShieldCheck },
//   { label: "Revenue", value: "৳4.2lac", icon: TrendingUp },
// ];

const liveListings = [
  {
    name: "Single-Origin Coffee",
    origin: "Colombia",
    price: "৳ 2950.50/kg",
    tag: "Agricultural",
  },
  {
    name: "Raw Jute Fibre",
    origin: "Bangladesh",
    price: "৳ 100.50/kg",
    tag: "Textile",
  },
  {
    name: "Arabica Green Beans",
    origin: "Ethiopia",
    price: "৳ 90.20/kg",
    tag: "Agricultural",
  },
  {
    name: "Handwoven Cotton",
    origin: "India",
    price: "৳ 40.00/m",
    tag: "Textile",
  },
  {
    name: "Cashew Kernels W320",
    origin: "Ivory Coast",
    price: "৳ 600.00/kg",
    tag: "Agricultural",
  },
  {
    name: "Freeze-Dried Mangoes",
    origin: "Philippines",
    price: "৳ 180.00/kg",
    tag: "Food",
  },
];

export default function Banner() {
  const [offset, setOffset] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(offset);
      setOffset((o) => (o + 1) % liveListings.length);
      setTimeout(() => setPrev(null), 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [offset]);

  const visible = [0, 1].map((i) => ({
    item: liveListings[(offset + i) % liveListings.length],
    isNew: i === 1,
    isLeaving: prev !== null && i === 0,
  }));
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <div className="grid gap-4 overflow-hidden rounded-3xl md:grid-cols-[1.05fr_1fr]">
        {/* Left: intro panel */}
        <div className="relative flex h-auto min-h-136 flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-background bg-background px-6 py-8 sm:px-8 sm:py-10 md:h-140 md:gap-0 lg:px-12">
          {/* ambient backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--color-amethyst) 35%, transparent), transparent 55%), radial-gradient(circle at 85% 90%, color-mix(in srgb, var(--color-amethyst) 22%, transparent), transparent 50%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
          />

          {/* Top: eyebrow + headline */}
          <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
            <h1
              className={`${pinkAverage.className} max-w-md text-3xl leading-[1.1] text-foreground sm:text-[2.75rem] sm:leading-[1.08] lg:text-5xl`}
            >
              Move goods across
              <br />
              <span className="text-primary">62 countries</span>, in
              <br />
              one click.
            </h1>

            <div
              className={`${sansation.className} max-w-lg text-sm leading-relaxed text-foreground/60 sm:text-base`}
            >
              List, discover, and settle international trade deals on a single
              platform built for exporters and importers who move real volume.
            </div>
          </div>

          {/* Middle: CTAs — side by side on every breakpoint */}
          <div
            className={`${sansation.className} relative z-10 flex flex-row items-center gap-3`}
          >
            <Button
              href="/products"
              size="sm"
              className="flex-1 sm:flex-initial sm:px-6 sm:py-3.5 sm:text-sm"
            >
              Explore Products
            </Button>
            <Button
              href="/add-export"
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-initial sm:px-6 sm:py-3.5 sm:text-sm"
            >
              Add Your Export
            </Button>
          </div>

          {/* Bottom: live ticker strip — the signature element */}
          {/* <div className="relative z-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-background sm:grid-cols-4">
            {tickerStats.map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className={`${sansation.className} flex flex-col items-center gap-1 px-3 py-3 sm:px-4 sm:py-3.5 ${
                  i !== 0 ? "border-l border-foreground/10" : ""
                } ${i >= 2 ? "border-t border-foreground/10 sm:border-t-0" : ""}`}
              >
                <Icon className="h-4 w-4 stroke-[1.75] text-primary sm:h-5 sm:w-5" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground sm:text-base">{value}</span>
                <span className="text-center text-xs text-foreground/60">{label}</span>
              </div>
            ))}
          </div> */}
          {/* Bottom: live listings feed */}
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex justify-end mr-2">
              <span className={`${sansation.className} text-[10px] uppercase tracking-[0.15em] text-foreground/40`}>Live listings</span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-foreground/10 inset-shadow-foreground/15 inset-shadow-sm">
              {visible.map(({ item, isNew, isLeaving }, i) => (
                <div
                  key={`${item.name}-${offset}-${i}`}
                  className={`${sansation.className} flex items-center justify-between px-3.5 py-3 ${
                    i !== 0 ? "border-t border-foreground/10" : ""
                  } ${isLeaving ? "listing-out" : isNew ? "listing-in" : ""}`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-foreground">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-foreground/45">
                      {item.origin} · {item.tag}
                    </span>
                  </div>
                  <span className="text-base font-medium tracking-wider text-primary">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: featured product card */}
        <div className="relative h-100 rounded-2xl md:h-140">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg"
            alt="Shipping containers at a global trade port"
            width={1200}
            height={960}
            className="h-full w-full object-cover path"
            priority
          />
          <div
            className="path-shadow pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          {/* Save / wishlist button */}
          <button
            type="button"
            aria-label="Save product"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-mist/30 text-mist backdrop-blur-sm transition-colors hover:bg-mist/40 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
          >
            <Heart
              className="h-4 w-4 stroke-[1.75] sm:h-5 sm:w-5"
              aria-hidden="true"
            />
          </button>

          {/* Product mini-card */}
          <div className="absolute left-1 top-1 flex items-center gap-2 border border-foreground/10 rounded-xl md:rounded-2xl bg-background p-1.5 pr-3 inset-shadow-foreground/15 inset-shadow-sm backdrop-blur-sm sm:gap-3 sm:p-2 sm:pr-4">
            <div className="relative h-7 w-7 overflow-hidden rounded-md md:rounded-xl sm:h-12 sm:w-12">
              <Image
                src="https://t4.ftcdn.net/jpg/06/99/07/59/360_F_699075925_iSCb6hWL6MKOZXjRpSyNrJ2RIgMpEFzi.jpg"
                alt=""
                width={814}
                height={360}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`${sansation.className} text-left`}>
              <p className="text-[7px] font-semibold text-foreground sm:text-sm">
                Single-Origin Coffee
              </p>
              <p className="flex items-center gap-1 text-[7px] text-foreground/60 sm:text-xs">
                <MapPin
                  className="h-2 w-2 sm:h-3 sm:w-3 stroke-[1.75]"
                  aria-hidden="true"
                />
                Origin: Colombia
              </p>
            </div>
          </div>

          {/* Listed by */}
          <div className="absolute bottom-1 right-1 border border-foreground/10 flex items-center gap-1.5 rounded-xl bg-background px-2.5 py-1.5 inset-shadow-foreground/15 inset-shadow-sm backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-2">
            <Image
              src="https://i.pravatar.cc/64?img=51"
              alt=""
              width={28}
              height={28}
              className="h-5 w-5 rounded-lg object-cover sm:h-8 sm:w-8"
            />
            <div className={`${sansation.className} text-left`}>
              <p className="text-[8px] text-foreground/60 sm:text-[6px]">
                Exported by
              </p>
              <p className="flex items-center gap-1 text-[5px] font-semibold text-foreground sm:text-xs">
                <Building
                  className="h-2 w-2 sm:h-3 sm:w-3 stroke-[1.75]"
                  aria-hidden="true"
                />
                BlueWave Trading
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
