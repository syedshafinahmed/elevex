"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Ship,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
  AlertTriangle,
  Building,
  Anchor,
  Search,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";

interface TradeDeal {
  id: string;
  contractNo: string;
  commodity: string;
  quantity: string;
  buyer: {
    name: string;
    company: string;
    country: string;
  };
  value: string;
  escrowStatus: "100% Funded" | "Milestone 1 Released" | "Pending Deposit";
  shipping: {
    carrier: string;
    vessel: string;
    portOfLoading: string;
    portOfDischarge: string;
    eta: string;
    trackingNo: string;
  };
  stage: "Escrow Funded" | "Customs Cleared" | "In Transit" | "Completed";
}

const activeDeals: TradeDeal[] = [
  {
    id: "TRD-9042",
    contractNo: "ELV-2026-DE-049",
    commodity: "Raw Jute Fibre (Grade A)",
    quantity: "20,000 kg",
    buyer: {
      name: "Klaus Wagner",
      company: "Hanseatic Textiles GmbH",
      country: "Germany",
    },
    value: "৳ 640,000",
    escrowStatus: "100% Funded",
    shipping: {
      carrier: "Maersk Line",
      vessel: "Maersk Mc-Kinney Moller",
      portOfLoading: "Chittagong Port (BDCGP)",
      portOfDischarge: "Hamburg Port (DEHAM)",
      eta: "Sep 14, 2026",
      trackingNo: "MSK984021940",
    },
    stage: "In Transit",
  },
  {
    id: "TRD-9039",
    contractNo: "ELV-2026-AE-112",
    commodity: "Single-Origin Arabica Coffee",
    quantity: "4,000 kg",
    buyer: {
      name: "Tariq Al-Mansoor",
      company: "Emirates Specialty Roasters",
      country: "UAE",
    },
    value: "৳ 890,000",
    escrowStatus: "100% Funded",
    shipping: {
      carrier: "MSC Shipping",
      vessel: "MSC Gülsün",
      portOfLoading: "Buenaventura (COBUN)",
      portOfDischarge: "Jebel Ali Port (AEJEA)",
      eta: "Sep 18, 2026",
      trackingNo: "MSC881940212",
    },
    stage: "Escrow Funded",
  },
  {
    id: "TRD-9021",
    contractNo: "ELV-2026-GB-088",
    commodity: "Handwoven Organic Cotton Fabric",
    quantity: "8,000 meters",
    buyer: {
      name: "Eleanor Vance",
      company: "Albion Eco Apparel Ltd",
      country: "United Kingdom",
    },
    value: "৳ 320,000",
    escrowStatus: "Milestone 1 Released",
    shipping: {
      carrier: "Hapag-Lloyd",
      vessel: "Berlin Express",
      portOfLoading: "Chittagong Port (BDCGP)",
      portOfDischarge: "Felixstowe (GBFXT)",
      eta: "Sep 09, 2026",
      trackingNo: "HL992104910",
    },
    stage: "Customs Cleared",
  },
];

export default function TradesPage() {
  const [selectedDeal, setSelectedDeal] = useState<TradeDeal>(activeDeals[0]);
  const [search, setSearch] = useState("");

  const filteredDeals = activeDeals.filter(
    (d) =>
      d.commodity.toLowerCase().includes(search.toLowerCase()) ||
      d.contractNo.toLowerCase().includes(search.toLowerCase()) ||
      d.buyer.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Header */}
      <div>
        <h1 className={`${pinkAverage.className} text-2xl sm:text-3xl text-foreground`}>
          Active Trades & Shipments
        </h1>
        <p className="text-xs text-foreground/55 mt-1">
          Monitor your active cross-border sales contracts, port clearances, vessel tracking, and escrow milestones.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Deal List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-foreground/40" />
            <input
              type="text"
              placeholder="Search by contract, buyer, commodity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-2xl border border-foreground/10 bg-foreground/2 pl-9 pr-3 text-xs text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none inset-shadow-foreground/10 inset-shadow-xs"
            />
          </div>

          <div className="flex flex-col gap-3">
            {filteredDeals.map((deal) => {
              const isSelected = selectedDeal.id === deal.id;
              return (
                <div
                  key={deal.id}
                  onClick={() => setSelectedDeal(deal)}
                  className={`group relative flex flex-col gap-3 rounded-2xl border p-4 transition-all cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10 inset-shadow-primary/10 inset-shadow-xs"
                      : "border-foreground/10 bg-foreground/2 hover:border-foreground/20 hover:bg-foreground/4"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-semibold text-primary">
                      {deal.contractNo}
                    </span>
                    <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[9px] font-bold text-foreground/75">
                      {deal.stage}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {deal.commodity}
                    </h3>
                    <p className="text-[11px] text-foreground/50 mt-0.5">
                      {deal.buyer.company} ({deal.buyer.country})
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-foreground/8 pt-2.5 text-xs">
                    <span className="font-semibold text-primary">{deal.value}</span>
                    <span className="text-[10px] text-foreground/50">{deal.quantity}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Deal Deep-Dive (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/10 inset-shadow-xs">
          {/* Contract Overview Header */}
          <div className="flex flex-col gap-3 border-b border-foreground/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-primary font-bold">
                  {selectedDeal.contractNo}
                </span>
                <span className="text-foreground/30">·</span>
                <span className="text-xs text-foreground/60">{selectedDeal.id}</span>
              </div>
              <h2 className={`${pinkAverage.className} text-2xl text-foreground mt-1`}>
                {selectedDeal.commodity}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-foreground/5 cursor-pointer inset-shadow-foreground/10 inset-shadow-xs"
              >
                <Download className="h-3.5 w-3.5 text-primary" />
                Bill of Lading
              </button>
            </div>
          </div>

          {/* Deal Progress Timeline */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
              Contract & Shipping Milestones
            </span>
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                { label: "Contract Signed", done: true },
                { label: "Escrow Deposited", done: true },
                { label: "Port Clearance", done: selectedDeal.stage !== "Escrow Funded" },
                { label: "Final Settlement", done: selectedDeal.stage === "Completed" },
              ].map((step, idx) => (
                <div key={step.label} className="flex flex-col gap-1.5 text-center">
                  <div
                    className={`h-1.5 w-full rounded-full transition-colors ${
                      step.done ? "bg-primary" : "bg-foreground/10"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold ${
                      step.done ? "text-primary" : "text-foreground/40"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2-Column Info: Importer Info & Vessel Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Importer Info */}
            <div className="rounded-2xl border border-foreground/10 bg-background/50 p-4 inset-shadow-foreground/5 inset-shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-3">
                <Building className="h-4 w-4 text-primary" />
                Buyer / Importer
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                <div>
                  <span className="text-foreground/45 text-[10px] block">Company</span>
                  <span className="font-semibold text-foreground">{selectedDeal.buyer.company}</span>
                </div>
                <div>
                  <span className="text-foreground/45 text-[10px] block">Authorized Representative</span>
                  <span className="text-foreground/80">{selectedDeal.buyer.name}</span>
                </div>
                <div>
                  <span className="text-foreground/45 text-[10px] block">Destination Country</span>
                  <span className="text-foreground/80">{selectedDeal.buyer.country}</span>
                </div>
              </div>
            </div>

            {/* Maritime Logistics */}
            <div className="rounded-2xl border border-foreground/10 bg-background/50 p-4 inset-shadow-foreground/5 inset-shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground mb-3">
                <Anchor className="h-4 w-4 text-primary" />
                Maritime Logistics
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                <div>
                  <span className="text-foreground/45 text-[10px] block">Carrier & Vessel</span>
                  <span className="font-semibold text-foreground">
                    {selectedDeal.shipping.carrier} · {selectedDeal.shipping.vessel}
                  </span>
                </div>
                <div>
                  <span className="text-foreground/45 text-[10px] block">Routing</span>
                  <span className="text-foreground/80">
                    {selectedDeal.shipping.portOfLoading} → {selectedDeal.shipping.portOfDischarge}
                  </span>
                </div>
                <div>
                  <span className="text-foreground/45 text-[10px] block">Estimated Arrival (ETA)</span>
                  <span className="text-primary font-semibold">{selectedDeal.shipping.eta}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Escrow Status Banner */}
          <div className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 p-4 inset-shadow-primary/10 inset-shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/30">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-foreground">
                  Escrow Guarantee: {selectedDeal.escrowStatus}
                </span>
                <p className="text-[11px] text-foreground/60">
                  Funds protected under Elevex Escrow Vault · Total Value: {selectedDeal.value}
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/escrow"
              className="text-xs font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Vault Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
