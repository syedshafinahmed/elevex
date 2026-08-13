"use client";

import { useState } from "react";
import { pinkAverage, sansation } from "@/lib/fonts";
import Globe from "../ui/Globe";
import Button from "../ui/Button";
import { ArrowUpRight } from "lucide-react";

const saasModules = [
  {
    id: "telemetry",
    label: "Freight Telemetry",
    status: "Active Shipping Corridors",
    code: "AIS-STATION-09",
    heading: "Automated Vessel & Container Tracking",
    description:
      "Monitor ocean containers, air express parcels, and multi-modal transit legs with encrypted AIS satellite feeds and automated arrival alerts.",
    highlights: [
      { label: "Location Accuracy", value: "Sub-Meter GPS" },
      { label: "ETA Prediction", value: "±15 Min Precision" },
    ],
  },
  {
    id: "customs",
    label: "Customs Clearing",
    status: "HS-Code Protocol Pre-Cleared",
    code: "DUTY-ENGINE-v4",
    heading: "Tariff Pre-Screening & Duty Calculation",
    description:
      "Streamline cross-border clearance with automated tariff classification, digital bill-of-lading verification, and instant port customs filings.",
    highlights: [
      { label: "Clearance Time", value: "< 4 Hours Avg" },
      { label: "Compliance", value: "100% Automated" },
    ],
  },
  {
    id: "escrow",
    label: "Escrow Vault",
    status: "LC Multi-Sig Collateral",
    code: "PAYMENT-VAULT-256",
    heading: "Irrevocable Trade Settlement",
    description:
      "Lock transaction funds in multi-currency escrow vaults that auto-release upon verified port arrival and buyer sign-off.",
    highlights: [
      { label: "Settlement Speed", value: "Instant Release" },
      { label: "Currency Support", value: "14 Currencies" },
    ],
  },
];

export default function GlobalReach() {
  const [activeTab, setActiveTab] = useState("telemetry");
  const activeData = saasModules.find((m) => m.id === activeTab) || saasModules[0];

  return (
    <div className="bg-amethyst px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <section className="mx-auto max-w-7xl w-full">
        {/* Outer Container - Seamless surface with solid amethyst background & border */}
        <div className="relative overflow-hidden">
          <div className="relative z-10 grid items-center gap-10 px-4 py-8 sm:px-8 sm:py-12 lg:grid-cols-12 lg:px-12 lg:py-14">
            {/* Left Column: Responsive SaaS Console Content */}
            <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-6">
              <h2
                className={`${pinkAverage.className} text-2xl xs:text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-[1.08] text-background`}
              >
                Direct freight lanes for
                <br className="hidden xs:inline" />
                <span className="text-background"> cross-border trade</span>.
              </h2>

              <p
                className={`${sansation.className} max-w-xl text-xs sm:text-sm lg:text-base leading-relaxed text-background/70`}
              >
                Coordinate bulk cargo shipments, verify customs documentation, and manage multi-modal transport lines across sea, air, and land corridors.
              </p>

              {/* Responsive SaaS Module Tabs - Guaranteed Single Row on Mobile */}
              <div className="grid grid-cols-3 gap-1 rounded-2xl border border-background/20 bg-background/70 p-1 sm:p-1.5 backdrop-blur-md">
                {saasModules.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`${sansation.className} flex items-center justify-center rounded-xl px-1.5 py-2 sm:px-3 sm:py-2.5 text-[10px] xs:text-[11px] sm:text-xs font-semibold text-center leading-tight transition-all duration-200 ${isActive
                        ? "bg-background text-foreground shadow-md"
                        : "text-foreground/80 hover:bg-background/10 hover:text-foreground"
                        }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Active Module Showcase Card */}
              <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-background p-4 sm:p-5 backdrop-blur-md transition-all">
                {/* Header Status Bar */}
                <div className="flex items-center justify-between border-b border-foreground/10 pb-2.5 sm:pb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`${sansation.className} text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-primary`}
                    >
                      {activeData.status}
                    </span>
                  </div>
                  <span
                    className={`${sansation.className} font-mono text-[9px] sm:text-[11px] text-foreground/40`}
                  >
                    {activeData.code}
                  </span>
                </div>

                {/* Module Content */}
                <div className="flex flex-col gap-2.5 sm:gap-3 pt-3 sm:pt-4">
                  <h3
                    className={`${pinkAverage.className} text-lg xs:text-xl sm:text-2xl text-foreground`}
                  >
                    {activeData.heading}
                  </h3>
                  <p
                    className={`${sansation.className} text-xs leading-relaxed text-foreground/65`}
                  >
                    {activeData.description}
                  </p>

                  {/* Sub Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1.5 sm:pt-2">
                    {activeData.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-0.5 rounded-xl border border-foreground/10 bg-foreground/3 p-2.5 sm:p-3 inset-shadow-foreground/15 inset-shadow-sm"
                      >
                        <span
                          className={`${sansation.className} text-[9px] sm:text-[10px] uppercase tracking-wider text-foreground/45`}
                        >
                          {h.label}
                        </span>
                        <span
                          className={`${pinkAverage.className} text-sm sm:text-base text-primary`}
                        >
                          {h.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Amethyst 3D Globe without dots */}
            <div className="relative flex flex-col items-center justify-center lg:col-span-6">
              {/* Ambient Glow Halo behind Globe */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-72 w-72 sm:h-96 sm:w-96 lg:h-[480px] lg:w-[480px] rounded-full bg-background/15 blur-3xl"
              />

              {/* Globe Canvas */}
              <Globe className="w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[500px] lg:max-w-[580px] xl:max-w-[640px]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
