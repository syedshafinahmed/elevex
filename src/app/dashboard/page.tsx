"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  TrendingUp,
  Package,
  ShieldCheck,
  Globe2,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Ship,
  Plus,
  FileText,
  Filter,
  Eye,
  Building,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";

const stats = [
  {
    label: "Total Export Volume",
    value: "৳ 42.8lac",
    change: "+18.4%",
    isPositive: true,
    subtext: "vs last month",
    icon: TrendingUp,
  },
  {
    label: "Escrow Vault Secured",
    value: "৳ 8.5lac",
    change: "3 active deals",
    isPositive: true,
    subtext: "100% insured",
    icon: ShieldCheck,
  },
  {
    label: "Active Shipments",
    value: "16 Containers",
    change: "4 clearing port",
    isPositive: true,
    subtext: "Chittagong · Rotterdam",
    icon: Package,
  },
  {
    label: "Global Reach",
    value: "18 Countries",
    change: "+2 new",
    isPositive: true,
    subtext: "Germany · UAE · USA",
    icon: Globe2,
  },
];

const recentShipments = [
  {
    id: "TRD-9042",
    commodity: "Raw Jute Fibre (Grade A)",
    destination: "Hamburg, Germany",
    buyer: "Hanseatic Textiles GmbH",
    value: "৳ 640,000",
    status: "In Transit",
    carrier: "Maersk Line",
    eta: "Sep 14, 2026",
    statusColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    id: "TRD-9039",
    commodity: "Single-Origin Arabica Coffee",
    destination: "Dubai, UAE",
    buyer: "Emirates Specialty Roasters",
    value: "৳ 890,000",
    status: "Escrow Secured",
    carrier: "MSC Shipping",
    eta: "Sep 18, 2026",
    statusColor: "bg-purple-500/10 text-primary border-primary/20",
  },
  {
    id: "TRD-9021",
    commodity: "Handwoven Organic Cotton",
    destination: "London, UK",
    buyer: "Albion Eco Apparel Ltd",
    value: "৳ 320,000",
    status: "Customs Cleared",
    carrier: "Hapag-Lloyd",
    eta: "Sep 09, 2026",
    statusColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    id: "TRD-8994",
    commodity: "Cashew Kernels W320",
    destination: "Singapore",
    buyer: "Merlion Agri Trading",
    value: "৳ 1,250,000",
    status: "Settled & Paid",
    carrier: "CMA CGM",
    eta: "Completed",
    statusColor: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
];

const topCommodities = [
  { name: "Single-Origin Coffee", volume: "৳ 14.2lac", share: "33%", change: "+24%" },
  { name: "Raw Jute Fibre", volume: "৳ 11.8lac", share: "28%", change: "+12%" },
  { name: "Organic Handwoven Cotton", volume: "৳ 9.4lac", share: "22%", change: "+8%" },
  { name: "Cashew Kernels W320", volume: "৳ 7.4lac", share: "17%", change: "+15%" },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [filterTab, setFilterTab] = useState("all");

  const userName = session?.user?.name?.split(" ")[0] || "Trader";

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Top Banner Greeting */}
      <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/3 p-6 sm:p-8 inset-shadow-foreground/10 inset-shadow-sm">
        {/* Ambient radial lighting */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, color-mix(in srgb, var(--color-amethyst) 30%, transparent), transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-primary">
                Export Operations
              </span>
              <span className="text-[11px] text-foreground/45 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Live Market: Open
              </span>
            </div>
            <h1 className={`${pinkAverage.className} text-2xl sm:text-4xl text-foreground`}>
              Welcome back, <span className="text-primary">{userName}</span>.
            </h1>
            <p className="text-xs text-foreground/60 max-w-xl leading-relaxed">
              Your export deals and escrow contracts are currently active. You have 3 shipments clearing customs at Chittagong Port this week.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex items-center gap-2.5 sm:self-center">
            <Link
              href="/dashboard/exports?action=new"
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              New Export Listing
            </Link>
            <Link
              href="/dashboard/escrow"
              className="flex items-center gap-2 rounded-xl border border-foreground/15 bg-background px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/30 active:scale-[0.98] inset-shadow-foreground/10 inset-shadow-xs"
            >
              <ShieldCheck className="h-4 w-4 text-primary" />
              Vault
            </Link>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2 p-5 transition-all hover:border-foreground/20 hover:bg-foreground/4 inset-shadow-foreground/10 inset-shadow-xs"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-foreground/55 uppercase tracking-wider">
                  {item.label}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className={`${pinkAverage.className} text-2xl sm:text-3xl text-foreground font-bold tracking-tight`}>
                  {item.value}
                </span>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="flex items-center text-[11px] font-semibold text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
                    {item.change}
                  </span>
                  <span className="text-[10px] text-foreground/45 truncate">
                    {item.subtext}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Live Shipments Table & Market Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Active Shipments & Deals */}
        <div className="lg:col-span-2 flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-5 sm:p-6 inset-shadow-foreground/10 inset-shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-foreground/10 pb-4">
            <div className="flex flex-col gap-0.5">
              <h2 className={`${pinkAverage.className} text-xl text-foreground`}>
                Recent Trades & Shipments
              </h2>
              <p className="text-xs text-foreground/50">
                Track live Bill of Lading statuses and escrow releases
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 rounded-xl bg-foreground/5 p-1">
              {["all", "in transit", "escrow"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterTab(tab)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold capitalize transition-colors cursor-pointer ${
                    filterTab === tab
                      ? "bg-primary text-white"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-foreground/10 text-[10px] uppercase tracking-wider text-foreground/45">
                  <th className="py-2.5 pr-4 font-semibold">Deal ID & Commodity</th>
                  <th className="py-2.5 px-4 font-semibold">Destination / Buyer</th>
                  <th className="py-2.5 px-4 font-semibold">Deal Value</th>
                  <th className="py-2.5 px-4 font-semibold">Status</th>
                  <th className="py-2.5 pl-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/6">
                {recentShipments.map((trade) => (
                  <tr key={trade.id} className="group hover:bg-foreground/3 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {trade.commodity}
                        </span>
                        <span className="text-[10px] text-foreground/45 font-mono">
                          {trade.id} · {trade.carrier}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-foreground/80 font-medium">
                          {trade.destination}
                        </span>
                        <span className="text-[10px] text-foreground/45 truncate max-w-[140px]">
                          {trade.buyer}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-primary">
                      {trade.value}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${trade.statusColor}`}>
                        {trade.status}
                      </span>
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <Link
                        href={`/dashboard/trades?id=${trade.id}`}
                        className="inline-flex items-center justify-center rounded-lg border border-foreground/10 bg-foreground/4 p-1.5 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
                        title="View Deal Details"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-between items-center text-[11px] text-foreground/50 border-t border-foreground/10">
            <span>Showing 4 active international shipments</span>
            <Link href="/dashboard/trades" className="font-semibold text-primary hover:underline">
              View All Trades →
            </Link>
          </div>
        </div>

        {/* Right 1 Col: Top Export Commodities & Escrow Security Meter */}
        <div className="flex flex-col gap-6">
          {/* Top Commodities Card */}
          <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-5 sm:p-6 inset-shadow-foreground/10 inset-shadow-xs">
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <h3 className={`${pinkAverage.className} text-lg text-foreground`}>
                Top Export Commodities
              </h3>
              <span className="text-[10px] uppercase tracking-wider text-foreground/45 font-semibold">
                This Qtr
              </span>
            </div>

            <div className="flex flex-col gap-3.5">
              {topCommodities.map((item) => (
                <div key={item.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="font-semibold text-primary">{item.volume}</span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: item.share }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-foreground/45">
                    <span>{item.share} of total exports</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Escrow Guarantee Box */}
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-5 inset-shadow-primary/10 inset-shadow-xs">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/30">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Elevex Escrow Protection Active
                </h4>
                <p className="text-[11px] text-foreground/65 leading-relaxed">
                  Every trade transaction is secured in tier-1 audited escrow vaults until port inspection & digital Bill of Lading verification.
                </p>
                <Link
                  href="/dashboard/escrow"
                  className="mt-2 text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  Manage Escrow Vault →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
