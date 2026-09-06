"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Unlock,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Building2,
  FileCheck,
  Clock,
  AlertCircle,
  Download,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";

interface EscrowTransaction {
  id: string;
  dealRef: string;
  commodity: string;
  counterparty: string;
  type: "Deposit Locked" | "Milestone Release" | "Final Settlement";
  amount: string;
  date: string;
  status: "Secured" | "Completed" | "In Review";
}

const transactions: EscrowTransaction[] = [
  {
    id: "ESC-89210",
    dealRef: "ELV-2026-DE-049",
    commodity: "Raw Jute Fibre",
    counterparty: "Hanseatic Textiles GmbH",
    type: "Deposit Locked",
    amount: "৳ 640,000",
    date: "Sep 02, 2026 · 14:32",
    status: "Secured",
  },
  {
    id: "ESC-89194",
    dealRef: "ELV-2026-AE-112",
    commodity: "Arabica Coffee",
    counterparty: "Emirates Specialty Roasters",
    type: "Deposit Locked",
    amount: "৳ 890,000",
    date: "Aug 29, 2026 · 10:15",
    status: "Secured",
  },
  {
    id: "ESC-89012",
    dealRef: "ELV-2026-GB-088",
    commodity: "Organic Cotton",
    counterparty: "Albion Eco Apparel Ltd",
    type: "Milestone Release",
    amount: "৳ 160,000",
    date: "Aug 26, 2026 · 18:40",
    status: "Completed",
  },
  {
    id: "ESC-88741",
    dealRef: "ELV-2026-SG-031",
    commodity: "Cashew Kernels",
    counterparty: "Merlion Agri Trading",
    type: "Final Settlement",
    amount: "৳ 1,250,000",
    date: "Aug 18, 2026 · 09:20",
    status: "Completed",
  },
];

export default function EscrowPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`${pinkAverage.className} text-2xl sm:text-3xl text-foreground`}>
            Escrow Protection & Vault
          </h1>
          <p className="text-xs text-foreground/55 mt-1">
            Multilateral escrow custody ensuring full payment safety for cross-border export shipments.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
        >
          <Building2 className="h-4 w-4" />
          Request Bank Settlement
        </button>
      </div>

      {/* Escrow Vault Balances */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1 */}
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-primary/5 p-6 inset-shadow-primary/10 inset-shadow-xs">
          <div className="flex items-center justify-between text-xs text-foreground/60 mb-3">
            <span className="font-semibold uppercase tracking-wider text-primary">
              Secured in Escrow
            </span>
            <Lock className="h-4 w-4 text-primary" />
          </div>
          <div className={`${pinkAverage.className} text-3xl font-bold text-foreground`}>
            ৳ 15.30lac
          </div>
          <p className="text-[11px] text-foreground/55 mt-2">
            Held in tier-1 custody for 2 active deals awaiting port inspection.
          </p>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/10 inset-shadow-xs">
          <div className="flex items-center justify-between text-xs text-foreground/60 mb-3">
            <span className="font-semibold uppercase tracking-wider">
              Available For Payout
            </span>
            <Unlock className="h-4 w-4 text-green-500" />
          </div>
          <div className={`${pinkAverage.className} text-3xl font-bold text-foreground`}>
            ৳ 4.80lac
          </div>
          <p className="text-[11px] text-foreground/55 mt-2">
            Ready for instant transfer to your linked commercial bank account.
          </p>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/10 inset-shadow-xs">
          <div className="flex items-center justify-between text-xs text-foreground/60 mb-3">
            <span className="font-semibold uppercase tracking-wider">
              Total Settled (All-Time)
            </span>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
          <div className={`${pinkAverage.className} text-3xl font-bold text-foreground`}>
            ৳ 86.40lac
          </div>
          <p className="text-[11px] text-foreground/55 mt-2">
            100% dispute-free completion across 28 global export orders.
          </p>
        </div>
      </div>

      {/* Escrow Workflow Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 rounded-3xl border border-foreground/10 bg-foreground/2 p-5 inset-shadow-foreground/10 inset-shadow-xs text-xs">
        <div className="flex items-center gap-3 p-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white font-bold">
            1
          </div>
          <div>
            <p className="font-semibold text-foreground">Buyer Locks Funds</p>
            <p className="text-[10px] text-foreground/50">100% deposited in escrow</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white font-bold">
            2
          </div>
          <div>
            <p className="font-semibold text-foreground">Exporter Ships Goods</p>
            <p className="text-[10px] text-foreground/50">Bill of Lading submitted</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white font-bold">
            3
          </div>
          <div>
            <p className="font-semibold text-foreground">Port & Quality Check</p>
            <p className="text-[10px] text-foreground/50">Customs clearance verified</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white font-bold">
            4
          </div>
          <div>
            <p className="font-semibold text-foreground">Immediate Release</p>
            <p className="text-[10px] text-foreground/50">Payout wired to exporter</p>
          </div>
        </div>
      </div>

      {/* Escrow Transaction Ledger */}
      <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-5 sm:p-6 inset-shadow-foreground/10 inset-shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-foreground/10 pb-4">
          <div>
            <h2 className={`${pinkAverage.className} text-xl text-foreground`}>
              Escrow Vault Ledger
            </h2>
            <p className="text-xs text-foreground/50">
              Verified record of lock-ins, milestone disbursements, and final trade settlements
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-foreground/5 inset-shadow-foreground/10 inset-shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Download className="h-3.5 w-3.5 text-primary" />
            Download Audit Report (CSV)
          </button>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-foreground/10 text-[10px] uppercase tracking-wider text-foreground/45">
                <th className="py-2.5 pr-4 font-semibold">Transaction ID & Date</th>
                <th className="py-2.5 px-4 font-semibold">Deal Contract</th>
                <th className="py-2.5 px-4 font-semibold">Counterparty</th>
                <th className="py-2.5 px-4 font-semibold">Type</th>
                <th className="py-2.5 px-4 font-semibold">Amount</th>
                <th className="py-2.5 pl-4 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/6">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-foreground/3 transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold font-mono text-foreground">{tx.id}</span>
                      <span className="text-[10px] text-foreground/45">{tx.date}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground">{tx.commodity}</span>
                      <span className="text-[10px] font-mono text-primary">{tx.dealRef}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-foreground/80">{tx.counterparty}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-medium text-foreground/70">{tx.type}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-primary">{tx.amount}</td>
                  <td className="py-3.5 pl-4 text-right">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                        tx.status === "Completed"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                          : "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
