"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Download,
  RefreshCw,
  CheckCircle2,
  Server,
  Key,
  Cpu,
  Fingerprint,
  FileCheck2,
  FileText,
  Zap,
  BarChart3,
  Globe2,
  Anchor,
  ChevronDown,
} from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import Button from "../components/ui/Button";
import { toast } from "gooey-toast";

// --- Data ---------------------------------------------------------------------

const privacyPillars = [
  {
    id: "collection",
    icon: Fingerprint,
    title: "Data We Ingest",
    tag: "Collection",
    description:
      "We collect only what is strictly required to verify trade identity, process customs filings, and operate escrow vaults. No behavioural profiling, no ad targeting, no sale to third-party data brokers -- ever.",
    metrics: [
      { label: "KYC / KYB Scope", value: "Entity Only" },
      { label: "Behavioural Tracking", value: "None" },
      { label: "Data Sold", value: "Zero" },
      { label: "Retention", value: "Statutory" },
    ],
    features: [
      "Legal entity name, Tax ID & Certificate of Incorporation",
      "HS commodity codes & AIS vessel coordinates",
      "Bank IBAN / SWIFT & multi-sig vault status",
      "Bills of lading & port origin / destination",
      "No personal browsing or behavioural signals collected",
    ],
  },
  {
    id: "security",
    icon: Lock,
    title: "Encryption Architecture",
    tag: "Vault Security",
    description:
      "Every payload is encrypted with envelope keys managed inside hardware security modules. Data at rest uses AES-256-GCM with per-customer key derivation. TLS 1.3 with certificate pinning blocks man-in-the-middle attacks.",
    metrics: [
      { label: "Encryption at Rest", value: "AES-256-GCM" },
      { label: "Transit Protocol", value: "TLS 1.3" },
      { label: "Key Management", value: "Hardware HSM" },
      { label: "Certificate Pinning", value: "Enforced" },
    ],
    features: [
      "AES-256-GCM encryption with per-tenant key derivation",
      "TLS 1.3 enforced with HSTS on all endpoints",
      "HSM-backed envelope key storage & rotation",
      "Isolated tenant partitioning -- zero cross-tenant reads",
      "Certificate pinning against MITM in all API clients",
    ],
  },
  {
    id: "sharing",
    icon: Eye,
    title: "Disclosure Protocols",
    tag: "Third Parties",
    description:
      "Data is shared only with verified deal counterparties and statutory authorities required by customs law. Every disclosure is scoped to the minimum required -- no speculative data sharing, no bulk transfers to analytics vendors.",
    metrics: [
      { label: "Counterparty Access", value: "Per-Contract" },
      { label: "Analytics Vendors", value: "None" },
      { label: "Customs Filings", value: "Statutory" },
      { label: "Access Log", value: "7 Years" },
    ],
    features: [
      "Trade counterparty sees only their deal data",
      "Customs authorities receive manifest filings only",
      "Port clearance data shared under statutory obligation",
      "No bulk data transfers to market intelligence firms",
      "Full access log retained and auditable for 7 years",
    ],
  },
  {
    id: "rights",
    icon: ShieldCheck,
    title: "Your Data Controls",
    tag: "Sovereignty",
    description:
      "You retain full statutory rights over your corporate data. Export a machine-readable archive on demand. Request permanent erasure at account termination -- audit logs required by law are the sole exception.",
    metrics: [
      { label: "Compliance", value: "GDPR & CCPA" },
      { label: "Export Format", value: "JSON / CSV" },
      { label: "Erasure", value: "Immediate" },
      { label: "DPA", value: "On Request" },
    ],
    features: [
      "On-demand machine-readable data export (JSON / CSV)",
      "Right to erasure for personal contacts & credentials",
      "Signed DPA with EU Standard Contractual Clauses",
      "Dedicated Data Protection Officer contact",
      "Audit logs exempt from erasure under statutory law",
    ],
  },
];

const lifecycleSteps = [
  {
    step: "01",
    title: "Encrypted Ingestion",
    tag: "Transit",
    desc: "TLS 1.3 tunnels with certificate pinning. No payload ever travels unencrypted.",
    detail: "TLS 1.3 only",
    icon: Server,
  },
  {
    step: "02",
    title: "HSM Key Wrapping",
    tag: "Encryption",
    desc: "Envelope keys derived per-customer inside hardware modules. Raw keys never exposed.",
    detail: "AES-256-GCM",
    icon: Key,
  },
  {
    step: "03",
    title: "Sanctions Screening",
    tag: "Compliance",
    desc: "Checked against 200+ live watchlists in under 2 seconds. Flagged records escalate, not rejected.",
    detail: "< 2 seconds",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Vault Archival",
    tag: "Retention",
    desc: "Hashed and committed to 7-year immutable audit storage. Shareable with a single link.",
    detail: "7 Years",
    icon: Database,
  },
  {
    step: "05",
    title: "Data Rights",
    tag: "Sovereignty",
    desc: "On-demand export or full erasure on account termination. Statutory records are the sole exception.",
    detail: "On-demand",
    icon: FileText,
  },
];

const trustPillars = [
  {
    icon: Lock,
    title: "Zero-knowledge vault",
    desc: "HSM-backed key management means no Elevex employee -- including engineers with database access -- can read your stored trade data in cleartext.",
    stat: "AES-256-GCM",
    statLabel: "Envelope encryption standard",
  },
  {
    icon: Zap,
    title: "Real-time compliance",
    desc: "Sanctions screening runs on every transaction in under two seconds against 200+ live watchlists. Flagged records reach your compliance officer first.",
    stat: "< 2 Seconds",
    statLabel: "Sanctions check latency",
  },
  {
    icon: BarChart3,
    title: "Immutable audit trail",
    desc: "Every document, timestamp, and payment event is hashed and committed to tamper-evident storage -- hand regulators a link, not a spreadsheet.",
    stat: "7-Year",
    statLabel: "Statutory log retention",
  },
  {
    icon: Globe2,
    title: "Cross-border compliant",
    desc: "GDPR Article 46 SCCs, CCPA opt-out rights, and bilateral customs data agreements are built into the platform -- not bolted on afterward.",
    stat: "GDPR & CCPA",
    statLabel: "Compliance frameworks active",
  },
];

const faqs = [
  {
    q: "Does Elevex sell trade volume data to market intelligence vendors?",
    a: "No. We never sell, monetize, or license your company's trade volume, commodity pricing, or shipping history to third-party brokers or data aggregators -- ever.",
  },
  {
    q: "How long are shipping documents stored on the platform?",
    a: "Trade manifests, bills of lading, and escrow release ledgers are stored for 7 years to satisfy international customs and tax compliance requirements.",
  },
  {
    q: "Can I request a custom Data Processing Agreement (DPA)?",
    a: "Yes. Enterprise accounts can request signed DPAs including EU Standard Contractual Clauses (SCCs) by contacting our Data Protection Officer at dpo@elevex.trade.",
  },
  {
    q: "Who has access to my HSM-encrypted trade data?",
    a: "No one at Elevex. Hardware security modules manage all encryption keys and never expose raw key material -- even privileged database engineers only see ciphertext.",
  },
];

const enterprisePrivacyFeatures = [
  {
    icon: FileCheck2,
    title: "Custom DPA with EU SCCs",
    desc: "Signed Data Processing Agreements including Standard Contractual Clauses for cross-border trade data transfers.",
  },
  {
    icon: Anchor,
    title: "Dedicated Data Protection Officer",
    desc: "A named DPO handles your privacy requests, regulatory inquiries, and breach notifications with SLA-backed response times.",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Audit Package",
    desc: "ISO 27001 certificates, penetration test summaries, and SOC 2 Type II reports bundled and ready on request.",
  },
  {
    icon: Database,
    title: "Data Residency Options",
    desc: "Lock your trade data to EU, UK, or US geographic regions for sector-specific sovereignty or governance requirements.",
  },
];

// --- Pillar Cards ---------------------------------

function PrivacyShield() {
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

  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 pt-2 pb-12 sm:py-12 sm:px-6 lg:px-10`}>
      {/* Page header row */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
            Privacy Architecture
          </p>
          <h1 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
            Four pillars. <span className="text-primary">One data vault.</span>
          </h1>
        </div>
        <button
          type="button"
          onClick={handleDataExportRequest}
          disabled={requestingExport}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {requestingExport ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          {requestingExport ? "Compiling..." : "Export My Data"}
        </button>
      </div>

      {/* 4-col slim pillar cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {privacyPillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background/50 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md p-5"
            >
              {/* Icon + tag */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className="h-4 w-4 stroke-[1.75] text-primary" aria-hidden="true" />
                </div>
                <span className={`${sansation.className} rounded-md border border-foreground/10 bg-foreground/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground/40`}>
                  {p.tag}
                </span>
              </div>

              {/* Title */}
              <h2 className={`${pinkAverage.className} text-base text-foreground leading-snug`}>{p.title}</h2>

              {/* Top 3 features — single line each */}
              <div className="flex flex-col gap-1">
                {p.features.slice(0, 3).map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-2.5 w-2.5 shrink-0 stroke-[2.5] text-primary" aria-hidden="true" />
                    <span className={`${sansation.className} text-[10px] text-foreground/55 line-clamp-1`}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Single key metric at bottom */}
              <div className="mt-auto pt-3 border-t border-foreground/10">
                <span className={`${sansation.className} text-[9px] uppercase tracking-wider text-foreground/30`}>{p.metrics[0].label}</span>
                <p className={`${pinkAverage.className} text-lg text-primary`}>{p.metrics[0].value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---  Horizontal Pipeline ------------------------

function DataLifecycle() {
  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="mb-8 flex flex-col gap-2">
        <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
          The Data Journey
        </p>
        <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
          From ingestion to archival.
        </h2>
      </div>

      {/* Horizontal pipeline grid -- no arrows */}
      <div className="grid gap-3 sm:grid-cols-5">
        {lifecycleSteps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.step} className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-background p-4 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md">
              {/* Step badge + icon row */}
              <div className="flex items-center justify-between">
                <span className={`${pinkAverage.className} text-2xl text-primary/30`}>{s.step}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className="h-3.5 w-3.5 stroke-[1.75] text-primary" aria-hidden="true" />
                </div>
              </div>

              <div>
                <p className={`${pinkAverage.className} text-sm text-foreground leading-snug`}>{s.title}</p>
                <p className={`${sansation.className} mt-1.5 text-[10px] leading-relaxed text-foreground/50`}>{s.desc}</p>
              </div>

              {/* Detail badge */}
              <div className="mt-auto flex items-center justify-between pt-2 border-t border-foreground/10">
                <span className={`${sansation.className} text-[9px] uppercase tracking-wider text-foreground/35`}>{s.tag}</span>
                <span className={`${sansation.className} rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] text-primary`}>{s.detail}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// --- stat  ----------------------------

function WhyTrustElevex() {
  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="mb-8 flex flex-col gap-2">
        <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
          Why Trust Elevex
        </p>
        <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
          Privacy that earns trust.
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Top: amethyst stat banner */}
        <div className="relative overflow-hidden rounded-3xl bg-amethyst px-6 py-8 sm:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 15% 50%, color-mix(in srgb, var(--color-background) 12%, transparent), transparent 55%), radial-gradient(circle at 85% 20%, color-mix(in srgb, var(--color-background) 8%, transparent), transparent 45%)",
            }}
          />
          <div className="relative z-10 grid gap-6 sm:grid-cols-4">
            {trustPillars.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 stroke-[1.75] text-background/60" aria-hidden="true" />
                    <span className={`${sansation.className} text-[10px] uppercase tracking-[0.12em] text-background/60`}>{d.statLabel}</span>
                  </div>
                  <p className={`${pinkAverage.className} text-3xl sm:text-4xl text-background leading-none`}>{d.stat}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: 4 detail cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-background/50 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className="h-4 w-4 stroke-[1.75] text-primary" aria-hidden="true" />
                </div>
                <p className={`${pinkAverage.className} text-base text-foreground`}>{d.title}</p>
                <p className={`${sansation.className} text-[11px] leading-relaxed text-foreground/50`}>{d.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- CTA, FAQ feature --------------

function EnterpriseDPA() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="relative overflow-hidden rounded-3xl bg-background p-6 sm:p-10 lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--color-amethyst) 28%, transparent), transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-10">
          {/* Centered headline */}
          <div className="mx-auto max-w-2xl text-center flex flex-col gap-3">
            <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
              Enterprise Privacy
            </p>
            <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
              Tailored data governance for global trade houses.
            </h2>
            <p className={`${sansation.className} text-sm text-foreground/55 leading-relaxed`}>
              Custom DPAs, dedicated DPO support, data residency controls, and audit-ready compliance packages -- all available for enterprise accounts.
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <Button href="/contact" size="sm">Submit DPA Request</Button>
            </div>
          </div>

          {/* FAQ as 2-column accordion grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur-md"
                >
                  <button
                    type="button"
                    id={`faq-privacy-${idx}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-privacy-body-${idx}`}
                    className={`${sansation.className} flex w-full items-start justify-between gap-3 px-5 py-4 text-left text-xs font-semibold text-foreground cursor-pointer`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`mt-0.5 h-4 w-4 shrink-0 stroke-[1.75] text-foreground/35 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div id={`faq-privacy-body-${idx}`} className="px-5 pb-4">
                      <p className={`${sansation.className} text-xs leading-relaxed text-foreground/55`}>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Enterprise feature cards as a horizontal 4-col row */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {enterprisePrivacyFeatures.map((ef) => {
              const Icon = ef.icon;
              return (
                <div
                  key={ef.title}
                  className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-background/50 inset-shadow-foreground/30 inset-shadow-sm p-5 transition-all duration-200 hover:border-foreground/20"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4 stroke-[1.75]" />
                  </div>
                  <h3 className={`${pinkAverage.className} text-sm text-foreground leading-snug`}>{ef.title}</h3>
                  <p className={`${sansation.className} text-[11px] leading-relaxed text-foreground/50`}>{ef.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Page ---------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PrivacyShield />
      <DataLifecycle />
      <WhyTrustElevex />
      <EnterpriseDPA />
    </div>
  );
}