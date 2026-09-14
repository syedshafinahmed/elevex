"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Download,
  Mail,
  CheckCircle2,
  ChevronRight,
  Info,
  Clock,
  Sparkles,
  Server,
  Key,
  Layers,
  FileCheck2,
  ChevronDown,
  RefreshCw,
  Cpu,
  Fingerprint,
} from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import Button from "../components/ui/Button";
import { toast } from "gooey-toast";

const privacyMetrics = [
  { label: "Encryption Standard", value: "AES-256-GCM", badge: "Hardware HSM" },
  { label: "Data Sale Policy", value: "Zero Sale", badge: "Guaranteed" },
  { label: "Audit Retention", value: "7 Years", badge: "Immutable" },
  { label: "Compliance Standard", value: "GDPR & CCPA", badge: "Verified" },
];

const dataFlowSteps = [
  {
    step: "01",
    title: "Ingestion",
    desc: "TLS 1.3 encrypted transit from browser/API to Elevex gateway.",
    icon: Server,
  },
  {
    step: "02",
    title: "HSM Encryption",
    desc: "Payloads encrypted with envelope keys stored in hardware modules.",
    icon: Key,
  },
  {
    step: "03",
    title: "Sanctions Filter",
    desc: "Real-time automated check against 200+ global watchlists.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Vault Archival",
    desc: "Hashed record stored in statutory 7-year audit storage.",
    icon: Database,
  },
];

const privacyPillars = [
  {
    id: "telemetry",
    title: "Data We Ingest",
    icon: Fingerprint,
    tag: "Collection",
    summary: "What we collect, why we collect it, and minimal necessary retention.",
    items: [
      {
        category: "Corporate Registration",
        fields: ["Legal Entity Name", "Tax ID / EIN", "Certificate of Incorporation", "Beneficial Owner Docs"],
        reason: "Mandatory KYC/KYB trade verification and anti-fraud checks.",
        retention: "Active Account + 7 Years Statutory",
      },
      {
        category: "Trade & Freight Telemetry",
        fields: ["HS Commodity Codes", "AIS Vessel Coordinates", "Bills of Lading", "Port Origin/Destination"],
        reason: "Customs duty auto-calculation and live shipping tracking.",
        retention: "7 Years (Customs Compliance)",
      },
      {
        category: "Financial Escrow Records",
        fields: ["Bank IBAN/SWIFT", "Letter of Credit Hash", "Multi-Sig Vault Status", "Currency Choice"],
        reason: "Automated payment release upon port arrival.",
        retention: "7 Years (Financial Audit)",
      },
    ],
  },
  {
    id: "security",
    title: "Encryption Architecture",
    icon: Lock,
    tag: "Vault Security",
    summary: "Bank-grade infrastructure shielding your corporate trade secrets.",
    items: [
      {
        category: "Data at Rest",
        fields: ["AES-256 Bit Encryption", "Per-Customer Key Derivation", "Isolated Partitioning"],
        reason: "Prevents unauthorized database reads or cross-tenant data leaks.",
        retention: "Continuous",
      },
      {
        category: "Data in Transit",
        fields: ["TLS 1.3 Only", "HSTS Header Enforced", "Certificate Pinning"],
        reason: "Blocks man-in-the-middle interception across ocean corridors.",
        retention: "Real-time",
      },
    ],
  },
  {
    id: "sharing",
    title: "Disclosure Protocols",
    icon: Eye,
    tag: "Third Parties",
    summary: "Compartmentalized data access strictly limited to deal partners.",
    items: [
      {
        category: "Trade Counterparties",
        fields: ["Verified Buyer / Seller", "Shipping Timelines", "Escrow Status"],
        reason: "Required to negotiate and settle international trade contracts.",
        retention: "Per-Contract Duration",
      },
      {
        category: "Customs & Port Authorities",
        fields: ["Manifest Filings", "HS Codes", "Port Customs Entries"],
        reason: "Enables sub-4-hour port pre-clearance.",
        retention: "Statutory Port Logs",
      },
    ],
  },
  {
    id: "rights",
    title: "Your Data Controls",
    icon: ShieldCheck,
    tag: "Sovereignty",
    summary: "Full statutory controls to access, export, or erase company data.",
    items: [
      {
        category: "Data Export (JSON / CSV)",
        fields: ["Full Audit Trail", "Historical Contracts", "Telemetry Archives"],
        reason: "Download a machine-readable export of all stored records.",
        retention: "On-demand",
      },
      {
        category: "Right to Erasure",
        fields: ["Personal Contacts", "Account Credentials", "Marketing Preferences"],
        reason: "Permanent deletion upon account termination (except legal audit logs).",
        retention: "Immediate Removal",
      },
    ],
  },
];

const faqs = [
  {
    q: "Does Elevex sell trade volume data to market intelligence vendors?",
    a: "No. We never sell, monetize, or license your company's trade volume, commodity pricing, or shipping history to third-party brokers or data aggregators.",
  },
  {
    q: "How long are shipping documents stored on the platform?",
    a: "Trade manifests, bills of lading, and escrow release ledgers are stored for 7 years to satisfy international customs and tax compliance requirements.",
  },
  {
    q: "Can I request a custom Data Processing Agreement (DPA)?",
    a: "Yes. Enterprise accounts can request signed DPAs including EU Standard Contractual Clauses (SCCs) by contacting privacy@elevex.trade.",
  },
];

export default function PrivacyPolicyPage() {
  const [activePillar, setActivePillar] = useState("telemetry");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [requestingExport, setRequestingExport] = useState(false);

  function handleDataExportRequest() {
    setRequestingExport(true);
    setTimeout(() => {
      setRequestingExport(false);
      toast.success({
        title: "Export Initiated",
        description: "Your data package is being compiled and will be sent to your email.",
      });
    }, 1000);
  }

  const activeContent = privacyPillars.find((p) => p.id === activePillar)!;

  return (
    <div className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      {/* ─── Top Control Header ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-background mb-8 p-6 sm:p-10 lg:p-12 border border-foreground/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-amethyst) 30%, transparent), transparent 50%), radial-gradient(circle at 20% 80%, color-mix(in srgb, var(--color-amethyst) 15%, transparent), transparent 40%)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                ELEVEX PRIVACY SHIELD v2.4
              </span>
              <span className="rounded-xl border border-foreground/10 bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground/60">
                GDPR & CCPA Compliant
              </span>
            </div>

            <button
              type="button"
              onClick={handleDataExportRequest}
              disabled={requestingExport}
              className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-all cursor-pointer"
            >
              {requestingExport ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {requestingExport ? "Compiling..." : "Export My Data"}
            </button>
          </div>

          <div className="max-w-3xl">
            <h1 className={`${pinkAverage.className} text-4xl sm:text-6xl text-foreground leading-[1.08]`}>
              Data Sovereignty & <span className="text-primary">Privacy Vault</span>
            </h1>
            <p className="text-sm sm:text-base text-foreground/65 leading-relaxed mt-3">
              How Elevex isolates corporate telemetry, secures trade secrets with Hardware Security Modules (HSM), and enforces transparent data governance.
            </p>
          </div>

          {/* Top Live Security Specs Bar */}
          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {privacyMetrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-foreground/10 bg-background/50 p-4 backdrop-blur-md flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
                    {m.label}
                  </span>
                  <span className="rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[9px] font-mono font-bold text-primary">
                    {m.badge}
                  </span>
                </div>
                <span className={`${pinkAverage.className} text-lg sm:text-xl text-foreground mt-0.5`}>
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Visual Data Flow Pipeline ─── */}
      <div className="rounded-3xl border border-foreground/10 bg-background/50 p-6 sm:p-8 mb-8 backdrop-blur-md">
        <div className="mb-6 flex flex-col gap-2">
          <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
            Data Lifecycle
          </p>
          <h2 className={`${pinkAverage.className} text-2xl text-foreground`}>
            How your information moves through our infrastructure
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dataFlowSteps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative rounded-2xl border border-foreground/10 bg-background/80 p-5 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-foreground/30">{s.step}</span>
                </div>

                <div>
                  <h4 className={`${pinkAverage.className} text-base text-foreground`}>{s.title}</h4>
                  <p className="text-xs text-foreground/60 leading-relaxed mt-1">{s.desc}</p>
                </div>

                {idx < dataFlowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-foreground/20">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Interactive Pillar Tabs & Details Card ─── */}
      <div className="flex flex-col gap-6 mb-8">
        {/* Pillar Switcher Bar */}
        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-foreground/10 bg-foreground/3 inset-shadow-foreground/30 inset-shadow-sm p-1 sm:grid-cols-4">
          {privacyPillars.map((p) => {
            const Icon = p.icon;
            const isActive = activePillar === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePillar(p.id)}
                className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Content Box */}
        <div className="rounded-3xl border border-foreground/10 bg-background/50 p-6 sm:p-8 backdrop-blur-md flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 pb-4">
            <div>
              <span className="rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                {activeContent.tag}
              </span>
              <h3 className={`${pinkAverage.className} text-2xl text-foreground mt-2`}>
                {activeContent.title}
              </h3>
            </div>
            <p className="text-xs text-foreground/60 max-w-md leading-relaxed">
              {activeContent.summary}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {activeContent.items.map((item) => (
              <div
                key={item.category}
                className="rounded-2xl border border-foreground/10 bg-background/80 p-5 flex flex-col justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-foreground text-sm border-b border-foreground/10 pb-2 mb-3">
                    {item.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.fields.map((f) => (
                      <span
                        key={f}
                        className="rounded-md border border-foreground/15 bg-foreground/5 px-2 py-0.5 text-[10px] text-foreground/75"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-foreground/65 leading-relaxed">{item.reason}</p>
                </div>

                <div className="border-t border-foreground/10 pt-2 flex items-center justify-between text-[10px]">
                  <span className="text-foreground/40 font-semibold uppercase tracking-wider">Retention</span>
                  <span className="font-mono text-primary font-semibold">{item.retention}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Privacy FAQ & Enterprise DPA Hub ─── */}
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* FAQ Accordion */}
        <div className="rounded-3xl border border-foreground/10 bg-background/50 p-6 sm:p-8 backdrop-blur-md flex flex-col gap-4">
          <div className="flex flex-col gap-2 mb-2">
            <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
              Common Questions
            </p>
            <h3 className={`${pinkAverage.className} text-2xl text-foreground`}>Privacy FAQ</h3>
          </div>

          <div className="overflow-hidden rounded-3xl border border-foreground/10 divide-y divide-foreground/10 bg-background">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    id={`faq-privacy-${idx}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-privacy-body-${idx}`}
                    className={`${sansation.className} flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-foreground sm:px-8`}
                  >
                    {faq.q}
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 stroke-[1.75] text-foreground/35 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div id={`faq-privacy-body-${idx}`} className="px-6 pb-5 sm:px-8">
                      <p className={`${sansation.className} text-sm leading-relaxed text-foreground/55`}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise DPA & Support Card */}
        <div className="rounded-3xl bg-background p-6 sm:p-8 flex flex-col justify-between gap-6 border border-foreground/10 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 90% 10%, color-mix(in srgb, var(--color-amethyst) 35%, transparent), transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <FileCheck2 className="h-5 w-5" />
            </div>

            <div>
              <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                Enterprise DPA Request
              </h3>
              <p className="text-xs text-foreground/65 leading-relaxed mt-2">
                Need a custom Data Processing Agreement with Standard Contractual Clauses (SCCs) for cross-border trade?
              </p>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-background/50 p-4 flex flex-col gap-1 text-xs">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
                Data Protection Officer
              </span>
              <span className="font-bold text-foreground">Elevex Privacy Office</span>
              <span className="font-mono text-primary font-semibold text-[11px]">dpo@elevex.trade</span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <Button href="/contact" size="sm" className="w-full">
              Submit DPA Request
            </Button>
            <Link
              href="/terms"
              className="text-center text-xs text-foreground/50 hover:text-primary transition-colors py-1"
            >
              View Terms & Conditions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
