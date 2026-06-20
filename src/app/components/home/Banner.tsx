import Image from "next/image";
import Link from "next/link";
import {
  Building,
  Globe2,
  Heart,
  MapPin,
  Package,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";

const tickerStats = [
  { label: "Active exporters", value: "3,140+", icon: Package },
  { label: "Countries reached", value: "62", icon: Globe2 },
  { label: "Escrow-protected trades", value: "100%", icon: ShieldCheck },
  { label: "Volume this quarter", value: "$4.2M", icon: TrendingUp },
];

export default function Banner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-2 pb-10 lg:px-10">
      <div className="grid gap-4 overflow-hidden rounded-3xl md:grid-cols-[1.05fr_1fr]">
        {/* Left: intro panel */}
        <div className="relative flex h-140 flex-col justify-between overflow-hidden rounded-3xl border border-background bg-background px-8 py-10 sm:px-12">
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
            // style={{
            //   backgroundImage:
            //     "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
            //   backgroundSize: "62px 62px",
            // }}
          />

          {/* Top: eyebrow + headline */}
          <div className="relative z-10 flex flex-col gap-6">
            <h1
              className={`${pinkAverage.className} max-w-md text-[2.75rem] leading-[1.08] text-foreground sm:text-5xl`}
            >
              Move goods across
              <br />
              <span className="text-primary">62 countries</span>, in
              <br />
              one click.
            </h1>

            <p className={`${sansation.className} max-w-lg text-base leading-relaxed text-foreground/60`}>
              List, discover, and settle international trade deals on a single
              platform built for exporters and importers who move real volume.
            </p>
          </div>

          {/* Middle: CTAs */}
          <div className={`${sansation.className} relative z-10 flex flex-wrap items-center gap-3`}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Explore Products
            </Link>
            <Link
              href="/add-export"
              className="inline-flex items-center gap-2 rounded-xl border border-foreground/60 px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Add Your Export
            </Link>
          </div>

          {/* Bottom: live ticker strip — the signature element */}
          <div className="relative z-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-background sm:grid-cols-4">
            {tickerStats.map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className={`${sansation.className} flex flex-col items-center gap-1.5 px-4 py-3.5 ${
                  i !== 0 ? "border-l border-foreground/10" : ""
                } ${i >= 2 ? "border-t border-foreground/10 sm:border-t-0" : ""}`}
              >
                <Icon className="h-5 w-5 stroke-[1.75] text-primary" aria-hidden="true" />
                <span className="text-base font-semibold text-foreground">{value}</span>
                <span className="text-[8px] text-foreground/60">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: featured product card */}
       <div className="relative overflow-hidden h-140 rounded-2xl">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1280px-Roasted_coffee_beans.jpg"
            alt="Shipping containers at a global trade port"
            width={1200}
            height={960}
            className="h-full w-full object-cover"
            priority
          />

          {/* Save / wishlist button */}
          <button
            type="button"
            aria-label="Save product"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-mist/30 text-mist backdrop-blur-sm transition-colors hover:bg-mist/40"
          >
            <Heart className="h-5 w-5 stroke-[1.75]" aria-hidden="true" />
          </button>

          {/* Product mini-card */}
          <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl bg-background p-2 pr-4 shadow-sm backdrop-blur-sm">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl">
              <Image
                src="https://t4.ftcdn.net/jpg/06/99/07/59/360_F_699075925_iSCb6hWL6MKOZXjRpSyNrJ2RIgMpEFzi.jpg"
                alt=""
                width={814}
                height={360}
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`${sansation.className} text-left`}>
              <p className="text-sm font-semibold text-foreground">Single-Origin Coffee</p>
              <p className="flex items-center gap-1 text-xs text-foreground/60">
                <MapPin className="h-3 w-3 stroke-[1.75]" aria-hidden="true" />
                Origin: Colombia
              </p>
            </div>
          </div>

          {/* Listed by */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl bg-background px-3 py-2 shadow-sm backdrop-blur-sm">
            <Image
              src="https://i.pravatar.cc/64?img=51"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-2xl object-cover"
            />
            <div className={`${sansation.className} text-left`}>
              <p className="text-[10px] text-foreground/60">Exported by</p>
              <p className="flex items-center gap-1 text-xs font-semibold text-foreground">
                <Building className="h-3 w-3 stroke-2" aria-hidden="true" />
                Andes Trading Co.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
