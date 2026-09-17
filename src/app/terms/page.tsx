"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Scale,
  ShieldCheck,
  Lock,
  Globe,
  AlertTriangle,
  Search,
  Download,
  Mail,
  CheckCircle2,
  ChevronRight,
  Info,
  Sparkles,
  Zap,
  Building2,
} from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import Button from "../components/ui/Button";

const termHighlights = [
  {
    icon: Scale,
    title: "Binding Agreement",
    description: "By creating an account or executing listings, you enter into a legally enforceable contract.",
  },
  {
    icon: Lock,
    title: "Multi-Sig Escrow",
    description: "Funds are secured in multi-sig vaults; auto-release occurs strictly on verified port arrival.",
  },
  {
    icon: ShieldCheck,
    title: "Live Sanctions Scan",
    description: "Every shipment and counterparty is screened against 200+ global sanctions lists automatically.",
  },
  {
    icon: Building2,
    title: "Institutional SLA",
    description: "99.99% system availability with automated, audit-ready compliance reporting.",
  },
];

const termsSections = [
  {
    id: "agreement",
    number: "01",
    icon: FileText,
    title: "Agreement to Terms",
    tag: "Contractual Scope",
    takeaway: "Using Elevex constitutes acceptance of these binding terms by authorized business representatives.",
    content: (
      <>
        <p>
          These Terms & Conditions ("Terms") constitute a legally binding agreement between your corporate entity ("User," "you," or "your") and Elevex Global Trade Technologies Inc. ("Elevex," "we," "us," or "our").
        </p>
        <p>
          By accessing or using our global trade platform, API endpoints, escrow vaults, or customs clearance tools (collectively, the "Services"), you confirm that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy. If you do not have legal authority to bind your organization, you must not access the platform.
        </p>
      </>
    ),
    details: [
      { label: "Eligibility", value: "Verified Exporters, Importers & Trade Entities" },
      { label: "Minimum Age", value: "18+ / Legal Corporate Capacity" },
      { label: "Governing Law", value: "Delaware, US / UNCITRAL Trade Standards" },
    ],
  },
  {
    id: "account",
    number: "02",
    icon: Building2,
    title: "Account Verification & Roles",
    tag: "Governance",
    takeaway: "All users must complete corporate verification before listing or matching trade offers.",
    content: (
      <>
        <p>
          To maintain the integrity of our international trade network, anonymous or unverified usage is strictly prohibited.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 pt-2">
          <div className="rounded-2xl border border-foreground/10 bg-foreground/3 p-4">
            <h4 className="font-semibold text-foreground mb-1">Corporate Onboarding</h4>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Users must submit valid tax identifiers, business registration certificates, and beneficial ownership filings prior to contract execution.
            </p>
          </div>
          <div className="rounded-2xl border border-foreground/10 bg-foreground/3 p-4">
            <h4 className="font-semibold text-foreground mb-1">Credential Protection</h4>
            <p className="text-xs text-foreground/70 leading-relaxed">
              You are responsible for maintaining multi-factor authentication security across all team accounts. Elevex is not liable for unauthorized internal API token exposure.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "listings",
    number: "03",
    icon: Globe,
    title: "Trade Marketplace & Offers",
    tag: "Market Protocol",
    takeaway: "Listings must accurately reflect commodity specifications, origin docs, and shipment schedules.",
    content: (
      <>
        <p>
          Elevex facilitates international trade listing, counterparty matching, and binding offer execution.
        </p>
        <ul className="flex flex-col gap-2.5 list-none pt-1">
          {[
            "Exporters must ensure all commodity specifications and HS-codes match physical cargo manifests.",
            "Initial negotiations and quote exchanges remain non-binding until digital contract sign-off.",
            "Executing a binding offer initiates mandatory multi-sig escrow lock and customs pre-screening.",
            "Misrepresentation of goods, shipping dates, or origin certificates results in immediate account revocation.",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-foreground/80">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "escrow",
    number: "04",
    icon: Lock,
    title: "Escrow Vault & Settlement",
    tag: "Financial Telemetry",
    takeaway: "Vault funds are locked securely and released automatically upon verified AIS vessel delivery.",
    content: (
      <>
        <p>
          Financial settlements on Elevex operate through irrevocable multi-signature vaults to guarantee payment security for both buyer and seller.
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-background/50 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-semibold text-foreground text-sm">Collateral Locking</h5>
              <p className="text-xs text-foreground/65 mt-0.5">
                Importers deposit funds into dedicated multi-sig vaults prior to vessel departure. Neither party nor Elevex can unilaterally divert funds.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-background/50 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h5 className="font-semibold text-foreground text-sm">Automated Release Triggers</h5>
              <p className="text-xs text-foreground/65 mt-0.5">
                Auto-release fires instantly when satellite AIS telemetry verifies vessel arrival within port radius and customs clearance confirmation is logged.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "compliance",
    number: "05",
    icon: ShieldCheck,
    title: "Sanctions & Export Control",
    tag: "Regulatory Enforcer",
    takeaway: "Transactions involving sanctioned entities, blocked ports, or illegal commodities are rejected instantly.",
    content: (
      <>
        <p>
          Elevex operates automated sanctions screening against 200+ global regulatory watchlists (including OFAC, UN, EU, and UK sanctions lists).
        </p>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <p className="text-xs text-foreground/80 leading-relaxed">
            <strong className="text-amber-500 font-semibold">Strict Prohibition:</strong> Any attempt to circumvent sanctions, forge bill-of-lading documents, or route shipments through prohibited jurisdictions will trigger automated transaction freeze, log forfeiture, and regulatory reporting.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "intellectual-property",
    number: "06",
    icon: Sparkles,
    title: "Intellectual Property & Telemetry",
    tag: "IP Rights",
    takeaway: "Elevex retains all proprietary platform rights; you retain ownership of your corporate trade secrets.",
    content: (
      <>
        <p>
          The platform, including software algorithms, duty calculation engines, UI design, and brand assets, is the exclusive intellectual property of Elevex.
        </p>
        <p>
          Users grant Elevex a non-exclusive, worldwide license to host, process, and anonymize trade telemetry data solely for the purpose of executing platform logistics and compliance tools.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    number: "07",
    icon: Scale,
    title: "Limitation of Liability",
    tag: "Risk Allocation",
    takeaway: "Elevex acts as a technology infrastructure provider, not a freight carrier or customs broker.",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, Elevex and its officers, directors, and employees shall not be liable for indirect, incidental, consequential, or punitive damages (including lost profits, vessel demurrages, or port delay fines).
        </p>
        <div className="rounded-2xl border border-foreground/10 bg-foreground/3 p-4 text-xs text-foreground/75 leading-relaxed">
          <strong>Liability Cap:</strong> Elevex’s total aggregate liability for any claims arising out of or relating to the platform shall not exceed the total fees paid by you to Elevex in the twelve (12) months preceding the incident.
        </div>
      </>
    ),
  },
  {
    id: "disputes",
    number: "08",
    icon: Mail,
    title: "Dispute Resolution & Contact",
    tag: "Jurisdiction",
    takeaway: "Trade disputes are settled via binding international arbitration under UNCITRAL rules.",
    content: (
      <>
        <p>
          In the event of a contractual or technical dispute, the parties agree to seek informal resolution through Elevex Trade Arbitration Specialists. If unresolved within 30 days, disputes shall be finally settled under the Rules of Arbitration of the International Chamber of Commerce (ICC).
        </p>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h5 className="font-bold text-foreground text-sm">Legal & Compliance Department</h5>
            <p className="text-xs text-foreground/70 mt-0.5">Elevex Global Trade Technologies Inc.</p>
            <p className="text-xs font-mono text-primary mt-1">legal@elevex.trade • compliance@elevex.trade</p>
          </div>
          <Button href="/contact" size="sm" className="shrink-0">
            Contact Legal Team
          </Button>
        </div>
      </>
    ),
  },
];

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("agreement");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections = termsSections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.takeaway.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      {/* ─── Hero Banner ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-background mb-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 15%, color-mix(in srgb, var(--color-amethyst) 18%, transparent), transparent 50%), radial-gradient(circle at 10% 85%, color-mix(in srgb, var(--color-amethyst) 12%, transparent), transparent 45%)",
          }}
        />

        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
          <div className="flex flex-col gap-4 max-w-3xl">
            <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
              Platform Contract
            </p>
            <h1 className={`${pinkAverage.className} text-4xl sm:text-6xl text-foreground leading-[1.08]`}>
              Terms & <span className="text-primary">Conditions</span>
            </h1>

            <p className={`${sansation.className} text-sm leading-relaxed text-foreground/60`}>
              Institutional trade protocol rules governing exporter listings, multi-sig escrow settlement, AIS cargo tracking, and customs compliance obligations.
            </p>

            {/* Quick Filter Search Bar */}
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-foreground/15 bg-foreground/3 px-4 py-2.5 shadow-sm max-w-lg backdrop-blur-md">
              <Search className="h-4 w-4 shrink-0 text-foreground/40" />
              <input
                type="text"
                placeholder="Search terms, escrow, liability, arbitration..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-semibold text-foreground/50 hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Key Highlights Grid ─── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {termHighlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/50 p-5 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md flex flex-col justify-between gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                <Icon className="h-5 w-5 stroke-[1.75]" />
              </div>
              <div>
                <h3 className={`${pinkAverage.className} text-lg text-foreground`}>{item.title}</h3>
                <p className="text-xs text-foreground/60 leading-relaxed mt-1">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Main Interactive Layout ─── */}
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Left Sticky Navigation Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-2 rounded-3xl border border-foreground/10 bg-background/50 p-4 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md">
            <p className={`${trunkey.className} px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary mb-1`}>
              Contract Sections
            </p>

            <nav className="flex flex-col gap-1">
              {termsSections.map((sec) => {
                const isActive = activeSection === sec.id;
                const Icon = sec.icon;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-foreground/65 hover:bg-foreground/5 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{sec.title}</span>
                    </div>
                    <span className={`text-[10px] ${isActive ? "text-white/80" : "text-foreground/40"}`}>
                      {sec.number}
                    </span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-4 border-t border-foreground/10 pt-4 px-2">
              <div className="flex items-center justify-between text-xs text-foreground/60 mb-3">
                <span>Print Copy</span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1 text-primary font-semibold hover:underline"
                >
                  <Download className="h-3.5 w-3.5" /> PDF
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Terms Content Area */}
        <div className="flex flex-col gap-6">
          {filteredSections.length === 0 ? (
            <div className="rounded-3xl border border-foreground/10 bg-background/50 p-12 text-center text-foreground/60">
              <p className="text-base font-semibold">No terms matched your query "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-3 text-xs text-primary underline"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/50 p-6 sm:p-8 inset-shadow-foreground/30 inset-shadow-sm backdrop-blur-md flex flex-col gap-6"
                >
                  {/* Section Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-foreground/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        <Icon className="h-4.5 w-4.5 stroke-[1.75]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className={`${pinkAverage.className} text-xl sm:text-2xl text-foreground`}>
                            {sec.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <span className="rounded-xl border border-foreground/15 bg-foreground/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/60">
                      {sec.tag}
                    </span>
                  </div>

                  {/* Key Takeaway Callout Box */}
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
                    <Info className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <div className="text-xs text-foreground/80 leading-relaxed font-medium">
                      <strong className="text-primary font-semibold">Core Requirement:</strong> {sec.takeaway}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col gap-3 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                    {sec.content}
                  </div>

                  {/* Optional Key Details Meta Bar */}
                  {sec.details && (
                    <div className="mt-2 grid gap-2 sm:grid-cols-3 rounded-2xl border border-foreground/10 bg-foreground/3 p-3 text-xs">
                      {sec.details.map((d) => (
                        <div key={d.label} className="flex flex-col gap-0.5">
                          <span className="text-[9px] uppercase tracking-widest text-foreground/40">{d.label}</span>
                          <span className="font-semibold text-foreground/80">{d.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })
          )}

          {/* Bottom Card Footer */}
          <div className="relative overflow-hidden rounded-3xl bg-background p-6 sm:p-8 border border-foreground/10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-amethyst) 25%, transparent), transparent 70%)",
              }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className={`${pinkAverage.className} text-xl text-foreground`}>Have legal or trade questions?</h3>
                <p className="text-xs text-foreground/60 mt-1">
                  Our trade counsel team is available to assist with custom master service agreements (MSAs).
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button href="/contact" size="sm">
                  Speak with Legal
                </Button>
                <Link
                  href="/privacy"
                  className="flex items-center gap-1 text-xs font-semibold text-foreground/70 hover:text-primary transition-colors"
                >
                  Privacy Policy <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
