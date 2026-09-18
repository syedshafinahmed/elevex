"use client";

import { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  Truck,
  FileText,
  Globe2,
  Check,
  Zap,
  Lock,
  BarChart3,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Anchor,
  Layers,
  Shield,
  Headphones,
} from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import Button from "../components/ui/Button";

// ─── Section 1: Core Services ─────────────────────────────────────────────────

const coreServices = [
  {
    id: "freight",
    icon: Truck,
    title: "Freight Telemetry",
    subtitle: "AIS-STATION-09",
    status: "Active Shipping Corridors",
    description:
      "Encrypted AIS satellite feeds track every transit leg across ocean, air, and multi-modal corridors. Automated arrival alerts fire the moment a vessel enters port radius — before your buyer even checks their inbox.",
    metrics: [
      { label: "Location Accuracy", value: "Sub-Meter GPS" },
      { label: "ETA Precision", value: "±15 Minutes" },
      { label: "Corridor Coverage", value: "62 Countries" },
      { label: "Data Refresh", value: "Every 90 Sec" },
    ],
    features: [
      "AIS encrypted satellite feeds",
      "Multi-modal leg tracking (sea, air, land)",
      "Automated port-arrival alerts",
      "Live exception & delay flagging",
      "Carrier API integrations",
    ],
  },
  {
    id: "customs",
    icon: FileText,
    title: "Customs Clearance",
    subtitle: "DUTY-ENGINE-v4",
    status: "HS-Code Protocol Pre-Cleared",
    description:
      "Our duty engine auto-classifies goods, prepares digital bills of lading, and submits port filings before cargo arrives. Compliance officers review exceptions, not every line item — cutting average clearance time to under four hours.",
    metrics: [
      { label: "Avg. Clearance", value: "< 4 Hours" },
      { label: "Filing Accuracy", value: "99.8%" },
      { label: "Markets Covered", value: "62 Ports" },
      { label: "Compliance", value: "100% Automated" },
    ],
    features: [
      "Automated HS-code classification",
      "Digital bill-of-lading verification",
      "Instant port customs submission",
      "Tariff pre-screening & duty calculation",
      "Real-time clearance status updates",
    ],
  },
  {
    id: "escrow",
    icon: ShieldCheck,
    title: "Escrow Vault",
    subtitle: "PAYMENT-VAULT-256",
    status: "LC Multi-Sig Collateral",
    description:
      "Multi-sig vaults lock funds before goods leave port. Auto-release triggers fire on verified port arrival and buyer sign-off — no chasing payments, no spreadsheet reconciliation, and no single party can move funds unilaterally.",
    metrics: [
      { label: "Settlement Speed", value: "Instant Release" },
      { label: "Currencies", value: "14 Supported" },
      { label: "Encryption", value: "256-bit AES" },
      { label: "Uptime", value: "99.99% SLA" },
    ],
    features: [
      "Multi-sig vault architecture",
      "14-currency support (USD, EUR, GBP, BDT…)",
      "Milestone-based auto-release",
      "Irrevocable letter-of-credit logic",
      "Real-time fund visibility for both parties",
    ],
  },
  {
    id: "compliance",
    icon: Globe2,
    title: "Global Compliance",
    subtitle: "COMPLIANCE-CORE",
    status: "Sanctions & Export Control Live",
    description:
      "Live sanctions screening, bilateral trade-rule checks, and export control validation run on every transaction. Your compliance team reviews flagged exceptions — not the entire ledger. Audit logs are timestamped, hashed, and ready to share.",
    metrics: [
      { label: "Sanctions Lists", value: "200+ Monitored" },
      { label: "Jurisdictions", value: "62 Covered" },
      { label: "Log Retention", value: "7 Years" },
      { label: "Alert Latency", value: "< 2 Seconds" },
    ],
    features: [
      "Live OFAC, UN & EU sanctions screening",
      "Bilateral export-control rule engine",
      "Tamper-evident audit log archive",
      "Automated risk-flag escalation",
      "Regulator-ready report exports",
    ],
  },
];

function CoreServices() {
  const [active, setActive] = useState(coreServices[0].id);
  const svc = coreServices.find((s) => s.id === active)!;

  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 pt-2 pb-12 sm:py-12 sm:px-6 lg:px-10`}>
      <div className="relative overflow-hidden rounded-3xl bg-background">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 15%, color-mix(in srgb, var(--color-amethyst) 18%, transparent), transparent 50%), radial-gradient(circle at 10% 85%, color-mix(in srgb, var(--color-amethyst) 12%, transparent), transparent 45%)",
          }}
        />

        <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10 lg:px-12">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-2">
            <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
              Platform Services
            </p>
            <h1 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
              Four modules. <span className="text-primary">One workflow.</span>
            </h1>
          </div>

          {/* Tab row */}
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-2xl border border-foreground/10 bg-foreground/3 p-1 sm:grid-cols-4">
            {coreServices.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s.id)}
                  className={`${sansation.className} flex items-center justify-center rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-foreground/50 hover:text-foreground"
                    }`}
                >
                  {s.title}
                </button>
              );
            })}
          </div>

          {/* Active service detail */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: description + features */}
            <div className="flex flex-col gap-5">
              <div>
                <p className={`${pinkAverage.className} text-xl text-foreground`}>{svc.title}</p>
                <p className={`${sansation.className} text-[10px] uppercase tracking-[0.12em] text-primary`}>{svc.status}</p>
              </div>

              <p className={`${sansation.className} text-sm leading-relaxed text-foreground/60`}>{svc.description}</p>

              <div className="flex flex-col gap-2">
                <p className={`${sansation.className} text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/35`}>Included features</p>
                {svc.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Check className="h-3 w-3 shrink-0 stroke-[2.5] text-primary" aria-hidden="true" />
                    <span className={`${sansation.className} text-xs text-foreground/70`}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: metrics grid & terminal card */}
            <div className="flex flex-col gap-4">
              <p className={`${sansation.className} text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/35`}>Key metrics</p>
              <div className="grid grid-cols-2 gap-3">
                {svc.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="group relative overflow-hidden flex flex-col gap-1 rounded-2xl border border-foreground/10 bg-background/50 p-4 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md"
                  >
                    <span className={`${sansation.className} text-[9px] uppercase tracking-[0.12em] text-foreground/40`}>{m.label}</span>
                    <span className={`${pinkAverage.className} text-xl text-primary`}>{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Code terminal strip */}
              <div className="rounded-2xl border border-foreground/10 bg-background/50 p-4 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md">
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <span className={`${sansation.className} font-mono text-[9px] text-foreground/35`}>elevex · {svc.subtitle}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400/70" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                    <span className="h-2 w-2 rounded-full bg-green-400/70" />
                  </div>
                </div>
                <div className={`${sansation.className} flex flex-col gap-1 font-mono text-[10px]`}>
                  <span className="text-foreground/35">{">"} status</span>
                  <span className="text-primary font-medium">✓ {svc.status}</span>
                  <span className="text-foreground/35">{">"} uptime</span>
                  <span className="text-emerald-400/90 font-medium">99.99% — All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: How It Works ──────────────────────────────────────────────────

const steps = [
  {
    step: "01",
    title: "List Your Export",
    tag: "Onboarding",
    desc: "Create a trade listing in minutes. Upload product specs and origin docs — our engine auto-validates HS codes, flags restricted goods, and prefills customs fields so your counterparty sees a clean, credible offer from day one.",
    detail: "Avg. listing time: 8 minutes",
    icon: FileText,
  },
  {
    step: "02",
    title: "Match & Negotiate",
    tag: "Discovery",
    desc: "Get matched with verified importers across 62 markets. Exchange binding offers, adjust volumes, and lock contract terms — all within a single auditable deal thread. No email chains, no scattered WhatsApp screenshots.",
    detail: "Avg. match time: < 48 hours",
    icon: Globe2,
  },
  {
    step: "03",
    title: "Lock Escrow",
    tag: "Security",
    desc: "Funds enter a multi-sig vault before a single container moves. Both parties see milestone triggers, release conditions, and live vault balance. No bank intermediary required — the protocol enforces the deal.",
    detail: "Vault activation: Instant",
    icon: Lock,
  },
  {
    step: "04",
    title: "Ship & Track",
    tag: "Logistics",
    desc: "AIS satellite feeds update every 90 seconds across all transit legs. Automated customs filings reach port authorities before your cargo docks. Exception alerts fire the moment anything deviates from the agreed route.",
    detail: "Tracking refresh: Every 90 sec",
    icon: Truck,
  },
  {
    step: "05",
    title: "Settle & Repeat",
    tag: "Settlement",
    desc: "Verified delivery triggers instant vault release to your chosen currency. Every document, timestamp, and payment event is archived in a tamper-evident log — audit-ready and shareable with a single link.",
    detail: "Settlement speed: Instant",
    icon: CheckCircle2,
  },
];

function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstBubbleRef = useRef<HTMLDivElement>(null);
  const lastBubbleRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateTrackHeight = () => {
      if (firstBubbleRef.current && lastBubbleRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const firstRect = firstBubbleRef.current.getBoundingClientRect();
        const lastRect = lastBubbleRef.current.getBoundingClientRect();

        const firstCenter = firstRect.top + firstRect.height / 2 - containerRect.top;
        const lastCenter = lastRect.top + lastRect.height / 2 - containerRect.top;
        setTrackHeight(Math.max(0, lastCenter - firstCenter));
      }
    };

    updateTrackHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateTrackHeight();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updateTrackHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTrackHeight);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !firstBubbleRef.current || !lastBubbleRef.current) return;
      const firstRect = firstBubbleRef.current.getBoundingClientRect();
      const lastRect = lastBubbleRef.current.getBoundingClientRect();

      const firstCenter = firstRect.top + firstRect.height / 2;
      const lastCenter = lastRect.top + lastRect.height / 2;
      const totalDistance = lastCenter - firstCenter;

      if (totalDistance <= 0) return;

      const windowHeight = window.innerHeight;
      const viewportTrigger = windowHeight * 0.65;
      const traveledDistance = viewportTrigger - firstCenter;

      const currentProgress = Math.max(0, Math.min(1, traveledDistance / totalDistance));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackHeight]);

  return (
    <div id="process" className="bg-amethyst px-3 py-6 sm:py-12 sm:px-6 lg:px-10 scroll-mt-6">
      <section className={`${sansation.className} mx-auto max-w-7xl w-full`}>
        <div className="px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
          {/* Header */}
          <div className="mb-6 sm:mb-8 flex flex-col gap-1.5 sm:gap-2">
            <p className={`${trunkey.className} text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-background`}>
              The Process
            </p>
            <h2 className={`${pinkAverage.className} text-2xl sm:text-5xl text-background/90 leading-tight`}>
              From listing to settlement.
            </h2>
          </div>

          {/* Steps Container */}
          <div ref={containerRef} className="relative flex flex-col gap-px">
            {/* Background Track Line */}
            <div
              aria-hidden="true"
              className="absolute left-[19px] top-[20px] block w-0.5 bg-background/20 pointer-events-none"
              style={{ height: `${trackHeight}px` }}
            />

            {/* Animated Progress Line */}
            <div
              aria-hidden="true"
              className="absolute left-[19px] top-[20px] block w-0.5 bg-background transition-all duration-150 ease-out pointer-events-none"
              style={{
                height: `${Math.min(1, Math.max(0, progress)) * trackHeight}px`,
                maxHeight: `${trackHeight}px`,
              }}
            />

            {steps.map((s, i) => {
              const StepIcon = s.icon;
              const isStepPassed = progress >= i / (steps.length - 1) - 0.05;
              const isFirst = i === 0;
              const isLast = i === steps.length - 1;

              return (
                <div key={s.step} className="relative grid grid-cols-[auto_1fr] gap-3 sm:gap-6 pb-6 sm:pb-8 last:pb-0">
                  {/* Bubble */}
                  <div className="flex shrink-0 items-start">
                    <div
                      ref={isFirst ? firstBubbleRef : isLast ? lastBubbleRef : undefined}
                      className={`${pinkAverage.className} relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 text-sm ${isStepPassed
                        ? "border-background bg-background text-primary shadow-md scale-105"
                        : "border-background/20 bg-background/10 text-background/60"
                        }`}
                    >
                      {s.step}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${isStepPassed
                      ? "border-background/20 bg-background/12 shadow-sm"
                      : "border-background/10 bg-background/6"
                      }`}
                  >
                    <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <StepIcon className={`h-4 w-4 shrink-0 stroke-[1.75] transition-colors ${isStepPassed ? "text-background" : "text-background/50"}`} aria-hidden="true" />
                        <h3 className={`${pinkAverage.className} text-lg sm:text-xl text-background leading-tight`}>{s.title}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className={`${sansation.className} text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.1em] text-background/90`}>
                          {s.tag}
                        </span>
                        <span className={`${sansation.className} rounded-lg border border-background/10 bg-background/10 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] text-background/90`}>
                          {s.detail}
                        </span>
                      </div>
                    </div>
                    <p className={`${sansation.className} text-xs sm:text-sm leading-relaxed text-background/65`}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Section 3: Why Elevex ─────────────────────────────────────────────────────

const differentiators = [
  {
    icon: Zap,
    title: "Built for speed",
    desc: "Settlement in hours, not weeks. Customs filings close before your cargo docks. Every step is async so nothing blocks the next stage in your deal.",
    stat: "2 days → 2 hours",
    statLabel: "Avg. settlement time",
  },
  {
    icon: Lock,
    title: "Security-first escrow",
    desc: "Multi-sig vault architecture means no single party — including Elevex — can release funds unilaterally. Your money moves only when every condition is met.",
    stat: "256-bit AES",
    statLabel: "Vault encryption standard",
  },
  {
    icon: BarChart3,
    title: "Auditable by design",
    desc: "Every offer, document, and payment event is timestamped and hashed. Hand auditors a link, not a folder of spreadsheets — and your own team gets live visibility.",
    stat: "7-year",
    statLabel: "Tamper-evident log retention",
  },
  {
    icon: Globe2,
    title: "Jurisdiction-aware",
    desc: "Trade rules vary by corridor. Our compliance engine tracks bilateral agreements, sanctions updates, and export controls — refreshed live, not quarterly.",
    stat: "200+",
    statLabel: "Sanctions lists monitored",
  },
];

const comparisonRows = [
  { label: "Settlement time", before: "3–5 business days", after: "Same day / instant" },
  { label: "Customs filing", before: "Manual, day-of", after: "Auto, before arrival" },
  { label: "Fund security", before: "Bank wire (reversible)", after: "Multi-sig escrow" },
  { label: "Compliance checks", before: "Weekly batch scan", after: "Live, per-transaction" },
  { label: "Audit trail", before: "Email threads + CSVs", after: "Hashed log, shareable link" },
  { label: "Cargo visibility", before: "Carrier portal checks", after: "AIS feed every 90 sec" },
];

function WhyElevex() {
  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
            Why Elevex
          </p>
          <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
            Infrastructure that earns trust.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className="relative overflow-hidden flex flex-col justify-between gap-4 rounded-3xl border border-foreground/10 bg-background/50 p-6 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <Icon className="h-4.5 w-4.5 stroke-[1.75] text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className={`${pinkAverage.className} text-lg text-foreground`}>{d.title}</p>
                    <p className={`${sansation.className} mt-1.5 text-xs leading-relaxed text-foreground/55`}>{d.desc}</p>
                  </div>
                </div>
                <div className="border-t border-foreground/10 pt-3">
                  <p className={`${pinkAverage.className} text-xl text-primary`}>{d.stat}</p>
                  <p className={`${sansation.className} text-[10px] uppercase tracking-[0.1em] text-foreground/40`}>{d.statLabel}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Before / After comparison table */}
        <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-background/50 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md">
          <div className="grid grid-cols-3 border-b border-foreground/10 px-6 py-3 sm:px-8">
            <span className={`${sansation.className} text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/40`}>Workflow</span>
            <div className="flex items-center gap-1.5">
              <XCircle className="h-3.5 w-3.5 stroke-[1.75] text-red-400/70" aria-hidden="true" />
              <span className={`${sansation.className} text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/40`}>Traditional</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 stroke-[1.75] text-primary" aria-hidden="true" />
              <span className={`${sansation.className} text-[10px] font-semibold uppercase tracking-[0.12em] text-primary`}>With Elevex</span>
            </div>
          </div>
          {comparisonRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 px-6 py-3.5 sm:px-8 ${i !== comparisonRows.length - 1 ? "border-b border-foreground/10" : ""}`}
            >
              <span className={`${sansation.className} text-xs font-semibold text-foreground/70`}>{row.label}</span>
              <span className={`${sansation.className} text-xs text-foreground/40`}>{row.before}</span>
              <span className={`${sansation.className} text-xs text-primary`}>{row.after}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Enterprise Solutions & SLAs ────────────────────────────────────

const enterpriseFeatures = [
  {
    icon: Anchor,
    title: "Custom Port Protocol Integrations",
    desc: "Direct EDI and REST API connectors for high-volume trade houses, customs brokers, and maritime logistics operators.",
  },
  {
    icon: Layers,
    title: "Multi-Entity Treasury Accounts",
    desc: "Manage multiple export entities, subsidiaries, and localized bank accounts under unified governance controls.",
  },
  {
    icon: Shield,
    title: "Institutional SLA & Guarantee",
    desc: "Guaranteed 99.99% system uptime, dedicated escrow clearing windows, and custom legal framework mappings.",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Trade Specialist",
    desc: "Personalized onboarding, active shipment intervention, and rapid conflict resolution support on demand.",
  },
];

function EnterpriseSolutions() {
  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="relative overflow-hidden rounded-3xl bg-background p-6 sm:p-10 lg:p-12">
        {/* ambient backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--color-amethyst) 35%, transparent), transparent 55%), radial-gradient(circle at 85% 90%, color-mix(in srgb, var(--color-amethyst) 22%, transparent), transparent 50%)",
          }}
        />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
                Enterprise Infrastructure
              </p>
              <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
                Tailored solutions for global trade houses.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" size="sm">
                Speak with Enterprise Team
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {enterpriseFeatures.map((ef) => {
              const Icon = ef.icon;
              return (
                <div
                  key={ef.title}
                  className="flex flex-col gap-2.5 rounded-2xl border border-foreground/10 bg-background/50 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md p-4 transition-all duration-200 hover:border-foreground/20"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4 stroke-[1.75]" />
                  </div>
                  <h3 className={`${pinkAverage.className} text-base text-foreground`}>{ef.title}</h3>
                  <p className={`${sansation.className} text-xs leading-relaxed text-foreground/55`}>{ef.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div>
      <CoreServices />
      <HowItWorks />
      <WhyElevex />
      <EnterpriseSolutions />
    </div>
  );
}
