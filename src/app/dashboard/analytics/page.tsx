"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Globe2,
  Calendar,
  Download,
  ArrowUpRight,
  PieChart,
  Ship,
  Sparkles,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";

const monthlyData = [
  { month: "Jan", revenue: 24.2, height: "45%" },
  { month: "Feb", revenue: 28.5, height: "55%" },
  { month: "Mar", revenue: 32.1, height: "62%" },
  { month: "Apr", revenue: 29.8, height: "58%" },
  { month: "May", revenue: 36.4, height: "72%" },
  { month: "Jun", revenue: 41.2, height: "82%" },
  { month: "Jul", revenue: 38.0, height: "76%" },
  { month: "Aug", revenue: 44.5, height: "88%" },
  { month: "Sep", revenue: 48.8, height: "96%" },
];

const regionBreakdown = [
  { region: "Western & Northern Europe", share: "38%", volume: "৳ 18.5lac", color: "bg-primary" },
  { region: "Middle East & GCC", share: "29%", volume: "৳ 14.1lac", color: "bg-purple-400" },
  { region: "East & Southeast Asia", share: "21%", volume: "৳ 10.2lac", color: "bg-purple-300" },
  { region: "North America", share: "12%", volume: "৳ 5.8lac", color: "bg-foreground/30" },
];

const commodityMetrics = [
  {
    name: "Arabica Coffee (Specialty)",
    quarterVolume: "৳ 14.2lac",
    yoyGrowth: "+28.4%",
    avgPrice: "৳ 2,950 / kg",
    topMarket: "Germany, UAE",
    isPositive: true,
  },
  {
    name: "Raw Jute Fibre (Grade A)",
    quarterVolume: "৳ 11.8lac",
    yoyGrowth: "+16.2%",
    avgPrice: "৳ 100.5 / kg",
    topMarket: "Belgium, India",
    isPositive: true,
  },
  {
    name: "Handwoven Cotton Fabrics",
    quarterVolume: "৳ 9.4lac",
    yoyGrowth: "+11.5%",
    avgPrice: "৳ 40.0 / m",
    topMarket: "United Kingdom",
    isPositive: true,
  },
  {
    name: "Cashew Kernels W320",
    quarterVolume: "৳ 7.4lac",
    yoyGrowth: "-3.1%",
    avgPrice: "৳ 600.0 / kg",
    topMarket: "Singapore, Netherlands",
    isPositive: false,
  },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("2026 Q3");

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`${pinkAverage.className} text-2xl sm:text-3xl text-foreground`}>
            Trade Analytics & Market Intelligence
          </h1>
          <p className="text-xs text-foreground/55 mt-1">
            Real-time export volume analytics, global destination markets, and commodity price trends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3 py-2 text-xs font-semibold text-foreground inset-shadow-foreground/10 inset-shadow-xs">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>2026 Fiscal YTD</span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Export Data
          </button>
        </div>
      </div>

      {/* Top 3 Summary KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/10 inset-shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
            Average Order Value (AOV)
          </span>
          <div className={`${pinkAverage.className} text-3xl font-bold text-foreground mt-1`}>
            ৳ 6.85lac
          </div>
          <p className="text-[11px] text-green-600 dark:text-green-400 font-semibold mt-2 flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" /> +14.2% vs previous quarter
          </p>
        </div>

        <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/10 inset-shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
            Export Clearance Efficiency
          </span>
          <div className={`${pinkAverage.className} text-3xl font-bold text-foreground mt-1`}>
            3.2 Days
          </div>
          <p className="text-[11px] text-green-600 dark:text-green-400 font-semibold mt-2 flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" /> 48h faster than national average
          </p>
        </div>

        <div className="rounded-3xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/10 inset-shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
            Repeat Buyer Retention
          </span>
          <div className={`${pinkAverage.className} text-3xl font-bold text-foreground mt-1`}>
            78.6%
          </div>
          <p className="text-[11px] text-foreground/55 mt-2">
            14 verified buyers with recurrent quarterly contracts
          </p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Export Volume Bar Timeline (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/10 inset-shadow-xs">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
            <div>
              <h2 className={`${pinkAverage.className} text-xl text-foreground`}>
                Monthly Export Revenue (in ৳ Lakhs)
              </h2>
              <p className="text-xs text-foreground/50">Continuous volume growth over 2026</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              Peak Month: Sep (৳ 48.8lac)
            </div>
          </div>

          {/* Custom CSS Bar Chart */}
          <div className="pt-6 pb-2">
            <div className="flex items-end justify-between gap-2 h-52 px-2">
              {monthlyData.map((d) => (
                <div key={d.month} className="group flex flex-1 flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    ৳{d.revenue}
                  </span>
                  <div className="relative w-full max-w-[36px] rounded-t-xl bg-foreground/10 overflow-hidden flex items-end">
                    <div
                      className="w-full rounded-t-xl bg-primary transition-all duration-500 group-hover:bg-primary/80"
                      style={{ height: d.height }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-foreground/60">
                    {d.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-foreground/10 pt-3 text-[11px] text-foreground/45 flex justify-between">
            <span>Aggregated across all shipping origins</span>
            <span className="font-semibold text-foreground">Total: ৳ 323.8lac</span>
          </div>
        </div>

        {/* Regional Market Share (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/10 inset-shadow-xs">
          <div>
            <h3 className={`${pinkAverage.className} text-xl text-foreground border-b border-foreground/10 pb-3`}>
              Regional Distribution
            </h3>
            <div className="flex flex-col gap-4 mt-4">
              {regionBreakdown.map((item) => (
                <div key={item.region} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{item.region}</span>
                    <span className="font-bold text-primary">{item.share}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: item.share }} />
                  </div>
                  <span className="text-[10px] text-foreground/45 text-right">{item.volume}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-foreground/10 bg-background/50 p-3 text-[11px] text-foreground/60">
            <span className="font-semibold text-foreground block">Top Partner Country</span>
            Germany accounts for 22% of total individual export volume.
          </div>
        </div>
      </div>

      {/* Commodity Performance Table */}
      <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-5 sm:p-6 inset-shadow-foreground/10 inset-shadow-xs">
        <h2 className={`${pinkAverage.className} text-xl text-foreground border-b border-foreground/10 pb-3`}>
          Commodity Performance Breakdown
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-foreground/10 text-[10px] uppercase tracking-wider text-foreground/45">
                <th className="py-2.5 pr-4 font-semibold">Commodity</th>
                <th className="py-2.5 px-4 font-semibold">Quarterly Volume</th>
                <th className="py-2.5 px-4 font-semibold">YoY Growth</th>
                <th className="py-2.5 px-4 font-semibold">Average Realized Price</th>
                <th className="py-2.5 pl-4 text-right font-semibold">Key Importer Markets</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/6">
              {commodityMetrics.map((item) => (
                <tr key={item.name} className="hover:bg-foreground/3 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-foreground">{item.name}</td>
                  <td className="py-3.5 px-4 font-bold text-primary">{item.quarterVolume}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-0.5 font-bold ${
                        item.isPositive ? "text-green-600 dark:text-green-400" : "text-red-500"
                      }`}
                    >
                      {item.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {item.yoyGrowth}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-foreground/80">{item.avgPrice}</td>
                  <td className="py-3.5 pl-4 text-right text-foreground/65">{item.topMarket}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
