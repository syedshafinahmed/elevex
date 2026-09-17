"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  Target,
  Eye,
  HeartHandshake,
  ChevronDown,
  CheckCircle2,
  MapPin,
  Compass,
  Users,
  Award,
  Sparkles,
} from "lucide-react";
import { RiLinkedinFill, RiFacebookFill } from "react-icons/ri";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import Globe from "../components/ui/Globe";
import Button from "../components/ui/Button";

// ─── Company Highlights ─────────────────────────

const companyHighlights = [
  {
    label: "Founded",
    value: "2024",
    subtext: "Built in Dhaka, Bangladesh",
    icon: Building2,
  },
  {
    label: "Platform Model",
    value: "Direct",
    subtext: "Principal-to-principal trading",
    icon: Users,
  },
  {
    label: "Core Verticals",
    value: "6 Categories",
    subtext: "Agri, textile, food & more",
    icon: Compass,
  },
  {
    label: "Broker Markups",
    value: "0%",
    subtext: "Zero hidden intermediary spread",
    icon: Award,
  },
];

// ─── Mission, Vision & Commitment Tabs ────────────────────────────────────────

const companyTenets = [
  {
    id: "mission",
    label: "Our Mission",
    icon: Target,
    kicker: "Purpose & Purpose-Driven Growth",
    title: "Democratizing cross-border commerce for real producers.",
    description:
      "Elevex was created to dismantle the monopolistic barriers of global trade. We equip independent manufacturers, farmers, and mills with direct international distribution channels, transparent payment settlement, and institutional dignity.",
    pillars: [
      {
        title: "Fair Market Access",
        text: "Ensuring emerging market producers command true international market value without middleman erosion.",
      },
      {
        title: "Frictionless Onboarding",
        text: "Removing endless bureaucratic delays so verified businesses can list and trade in days, not quarters.",
      },
      {
        title: "Protected Settlement",
        text: "Guaranteeing that verified deliverables receive timely, indisputable financial settlement.",
      },
    ],
  },
  {
    id: "vision",
    label: "Our Vision",
    icon: Eye,
    kicker: "Long-Term Horizon",
    title: "A borderless digital exchange for global bulk commodities.",
    description:
      "We envision a future where physical distance no longer implies counterparty risk or opacity. Elevex is building the universal protocol through which international bulk commerce flows cleanly and safely.",
    pillars: [
      {
        title: "Universal Exchange Protocol",
        text: "A unified system where product specs, compliance documents, and contracts reside in one clear deal record.",
      },
      {
        title: "Global South Empowerment",
        text: "Elevating Asian, African, and Latin American exporters into recognized, reputable global brands.",
      },
      {
        title: "Trust By Design",
        text: "Replacing blind reliance on intermediary promises with structural, verifiable trade guarantees.",
      },
    ],
  },
  {
    id: "commitment",
    label: "Our Commitment",
    icon: HeartHandshake,
    kicker: "Ethical Pledge",
    title: "Radical neutrality and unwavering user alignment.",
    description:
      "We operate an exchange, not a trading desk. We never buy up inventory to compete with our sellers, we never sell trade volume data to hedge funds, and we never compromise on user trust.",
    pillars: [
      {
        title: "Zero Proprietary Trading",
        text: "We never trade against our users or front-run commercial commodity listings.",
      },
      {
        title: "Data Sovereignty",
        text: "Your shipment volumes, customer relationships, and pricing strategies remain strictly confidential.",
      },
      {
        title: "Dedicated Human Support",
        text: "Real trade professionals available around the clock to assist with real-world port and trade challenges.",
      },
    ],
  },
];

// ─── Global Presence / Hubs ───────────────────────────────────────────────────

const regionalHubs = [
  {
    city: "Dhaka",
    country: "Bangladesh",
    role: "Global Headquarters & Tech Lab",
    address: "Mirpur-2, Dhaka-1216",
    status: "Headquarters",
  },
  {
    city: "Singapore",
    country: "Singapore",
    role: "Asia-Pacific Trade Desk",
    address: "Marina Bay Financial Centre",
    status: "Regional Hub",
  },
  {
    city: "Rotterdam",
    country: "Netherlands",
    role: "European Liaison & Port Clearing",
    address: "Willemswerf, Boompjes",
    status: "Liaison Office",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    role: "Middle East & GCC Gateway",
    address: "DIFC Gate Precinct",
    status: "Trade Desk",
  },
];

// ─── Core Values ─────────────────────────────────────────────────────────────

const companyValues = [
  {
    number: "01",
    title: "Producer First",
    description:
      "The hard work happens in the factories, fields, and mills. We design every feature to protect the margins and reputation of the producers who build our world.",
  },
  {
    number: "02",
    title: "Radical Neutrality",
    description:
      "We are an open, un-compromised marketplace. We never favor conglomerates over emerging suppliers, ensuring a merit-based trading environment.",
  },
  {
    number: "03",
    title: "Clarity Over Complexity",
    description:
      "Cross-border commerce is filled with confusing jargon and hidden terms. We translate intricate international trade mechanics into intuitive digital tools.",
  },
  {
    number: "04",
    title: "Enduring Integrity",
    description:
      "Every agreement formed on Elevex is backed by transparent verification. We believe honesty and reliability are the ultimate competitive advantages.",
  },
];

// ─── Team Members ───────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    facebook?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Syed Shafin Ahmed",
    role: "Founder & Lead Architect",
    bio: "Systems engineer leading protocol design, distributed transaction pipelines, and core architecture.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://www.linkedin.com/in/syed-shafin-ahmed/",
      facebook: "https://www.facebook.com/shafin.ahmed.3925/",
    },
  },
  {
    name: "Tahmina Rahman",
    role: "Head of Compliance",
    bio: "Advocate specializing in cross-border trade jurisprudence, WTO export controls, and customs.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com/",
    },
  },
  {
    name: "Nafis Fuad",
    role: "VP of Maritime & Freight",
    bio: "Decade of experience managing container fleets, port terminal agreements, and transit corridors.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com/",
    },
  },
  {
    name: "Farhana Chowdhury",
    role: "Head of Producer Network",
    bio: "Championing regional textile mills, tea estates, and agricultural cooperatives with export onboarding.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com/",
    },
  },
  {
    name: "Zubair Al-Hasan",
    role: "Lead Platform Engineer",
    bio: "Architecting cryptographic escrow vaults, distributed state synchronization, and core APIs.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    socials: {
      linkedin: "https://www.linkedin.com/",
      facebook: "https://www.facebook.com/",
    },
  },
];


export default function AboutPage() {
  const [activeTenet, setActiveTenet] = useState("mission");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentTenet =
    companyTenets.find((t) => t.id === activeTenet) || companyTenets[0];

  return (
    <div>
      {/* ─── 1. Hero Section ──────────────────────────────────────────────── */}
      <section className={`${sansation.className} mx-auto max-w-7xl px-4 pt-4 pb-12 sm:px-6 lg:px-10`}>
        <div className="relative overflow-hidden rounded-3xl bg-background">
          {/* Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--color-amethyst) 32%, transparent), transparent 55%), radial-gradient(circle at 85% 90%, color-mix(in srgb, var(--color-amethyst) 20%, transparent), transparent 50%)",
            }}
          />

          <div className="relative z-10 flex flex-col gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
                  Our Story & Purpose
                </p>
              </div>

              <h1 className={`${pinkAverage.className} text-3xl sm:text-5xl lg:text-6xl text-foreground leading-[1.08]`}>
                Empowering global trade from the <span className="text-primary">ground up</span>.
              </h1>

              <p className={`${sansation.className} text-sm sm:text-base leading-relaxed text-foreground/70`}>
                Elevex was founded to bridge the divide between regional commodity producers and international buyers.
                We believe cross-border trade should be direct, transparent, and accessible to every verified enterprise—not
                just legacy conglomerates.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="/products" variant="primary" size="md">
                Explore Marketplace
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Get in Touch
              </Button>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-4 sm:gap-4">
              {companyHighlights.map(({ label, value, subtext, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm transition-all hover:border-foreground/20 hover:bg-foreground/4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-foreground/45">
                      {label}
                    </span>
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                  </div>
                  <span className={`${pinkAverage.className} text-xl sm:text-2xl text-foreground font-bold`}>
                    {value}
                  </span>
                  <span className="text-[11px] text-foreground/55">
                    {subtext}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Origin Story & Why We Built Elevex ─────────────────────────── */}
      <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
              Origin Story
            </p>
            <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
              Born from firsthand export challenges.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Column 1: The Challenge */}
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-6 sm:p-8 lg:p-10 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  The Problem
                </span>
                <h3 className={`${pinkAverage.className} text-2xl text-foreground leading-snug`}>
                  High production risk, low producer power.
                </h3>
                <p className="text-sm leading-relaxed text-foreground/65">
                  Throughout South and Southeast Asia, world-class textile mills, agricultural collectives, and artisanal
                  producers manufacture goods that power global industries. Yet for decades, these producers have been held
                  back by antiquated paperwork, multi-tiered broker syndicates, and settlement delays that squeeze operating
                  margins.
                </p>
                <p className="text-sm leading-relaxed text-foreground/65">
                  Producers carried all the raw material and labor risks, while intermediaries captured the lion&apos;s share
                  of the margin simply by controlling paper letters of credit and contact books.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-foreground/10 text-xs text-foreground/50">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Traditional trade kept small and mid-market producers isolated.</span>
              </div>
            </div>

            {/* Column 2: The Solution */}
            <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-6 sm:p-8 lg:p-10 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  The Vision
                </span>
                <h3 className={`${pinkAverage.className} text-2xl text-foreground leading-snug`}>
                  A direct, unmediated trade exchange.
                </h3>
                <p className="text-sm leading-relaxed text-foreground/65">
                  We engineered Elevex to dismantle those unnecessary layers. By combining an intuitive digital
                  marketplace with institutional escrow security and transparent compliance workflows, we allow producers to
                  present their catalogs directly to global enterprise buyers.
                </p>
                <p className="text-sm leading-relaxed text-foreground/65">
                  Buyers discover verified supply with authentic origin documentation, while exporters expand into new
                  international markets with guaranteed settlement security.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-foreground/10 text-xs text-foreground/50">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>Direct connectivity. Transparent pricing. Protected settlement.</span>
              </div>
            </div>
          </div>

          {/* Founder Quote Card */}
          <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 sm:p-8 inset-shadow-foreground/30 inset-shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-2 max-w-2xl">
                <p className={`${pinkAverage.className} text-lg sm:text-xl text-foreground italic leading-relaxed`}>
                  &ldquo;We didn&apos;t build Elevex to be another trade broker. We built it so that authentic producers would
                  never need an intermediary broker again.&rdquo;
                </p>
                <p className="text-xs text-foreground/50">
                  — <span className="font-semibold text-foreground/80">Syed Shafin Ahmed</span>, Founder & Lead Architect
                </p>
              </div>

              <Button href="/contact" variant="outline" size="sm" className="shrink-0">
                Connect With Leadership
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Mission, Vision & Commitment (Tab Switcher) ────────────────── */}
      <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
                Guiding Tenets
              </p>
              <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
                What drives our company forward.
              </h2>
            </div>

            {/* Pill Tab Switcher */}
            <div className="flex items-center gap-1 rounded-2xl border border-foreground/10 bg-foreground/3 p-1 inset-shadow-foreground/30 inset-shadow-sm self-start sm:self-auto">
              {companyTenets.map((t) => {
                const active = activeTenet === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTenet(t.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      active
                        ? "bg-background text-foreground shadow-sm"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    <t.icon className={`h-3.5 w-3.5 ${active ? "text-primary" : "text-foreground/40"}`} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tenet Display */}
          <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 sm:p-10 lg:p-12 inset-shadow-foreground/30 inset-shadow-sm">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {currentTenet.kicker}
                </span>
                <h3 className={`${pinkAverage.className} text-2xl sm:text-4xl text-foreground`}>
                  {currentTenet.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed max-w-3xl pt-1">
                  {currentTenet.description}
                </p>
              </div>

              {/* 3 Pillars Grid */}
              <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-foreground/10">
                {currentTenet.pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="flex flex-col gap-2 rounded-2xl border border-foreground/8 bg-foreground/2 p-5 inset-shadow-foreground/30 inset-shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <h4 className={`${pinkAverage.className} text-base text-foreground font-semibold`}>
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-foreground/65 leading-relaxed">
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Global Presence & Reused 3D Globe ─────────────────────────── */}
      <div className="bg-amethyst px-4 py-12 sm:px-6 lg:px-10">
        <section className={`${sansation.className} mx-auto max-w-7xl w-full`}>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Column: Hubs List */}
            <div className="flex flex-col gap-6 lg:col-span-6">
              <div className="flex flex-col gap-2">
                <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-background`}>
                  Global Footprint
                </p>
                <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-background/95 leading-tight`}>
                  Rooted in Dhaka. Connected to the world.
                </h2>
              </div>

              <p className="text-sm leading-relaxed text-background/80">
                Elevex maintains regional operations and partner representations across strategic trading corridors.
                Whether you require local trade desk consultation or cross-border logistics facilitation, our network is
                always within reach.
              </p>

              {/* Hubs Cards Grid */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-2">
                {regionalHubs.map((hub) => (
                  <div
                    key={hub.city}
                    className="flex flex-col gap-1 rounded-2xl border border-background/20 bg-background/10 p-3.5 backdrop-blur-sm transition-all hover:bg-background/15"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-background" />
                        <span className={`${pinkAverage.className} text-sm font-semibold text-background`}>
                          {hub.city}, {hub.country}
                        </span>
                      </div>
                      <span className="rounded-md border border-background/25 bg-background/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-background">
                        {hub.status}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-background/90 pt-0.5">
                      {hub.role}
                    </span>
                    <span className="text-[10px] text-background/60">
                      {hub.address}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="sm"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Contact Our Trade Desks
                </Button>
              </div>
            </div>

            {/* Right Column: Clean 3D Earth Globe Canvas */}
            <div className="relative flex flex-col items-center justify-center lg:col-span-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-background/20 blur-3xl"
              />
              <Globe className="w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] lg:max-w-[540px]" />
            </div>
          </div>
        </section>
      </div>

      {/* ─── 5. Team Members of Elevex ───────────────────────────────────── */}
      <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
                Our People
              </p>
              <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
                The team behind Elevex.
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-foreground/60 leading-relaxed">
              Systems engineers, maritime logistics veterans, trade finance attorneys, and producer advocates working together to modernize international trade.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm transition-all hover:border-foreground/20 hover:bg-foreground/4 flex flex-col justify-between gap-3.5"
              >
                <div>
                  {/* Clean Photo without badges */}
                  <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-foreground/5 mb-3">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Name, Role & Bio */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <h3 className={`${pinkAverage.className} text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1`}>
                        {member.name}
                      </h3>
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                    </div>

                    <p className="text-[11px] font-semibold uppercase tracking-wider text-primary line-clamp-1">
                      {member.role}
                    </p>

                    <p className="text-xs text-foreground/65 leading-relaxed pt-1 line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Social Connect Links (LinkedIn & Facebook only) */}
                <div className="pt-2.5 border-t border-foreground/8 flex items-center justify-between text-xs text-foreground/50">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">Connect</span>
                  <div className="flex items-center gap-1.5">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/12 bg-foreground/3 text-foreground/60 transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                      >
                        <RiLinkedinFill className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials.facebook && (
                      <a
                        href={member.socials.facebook}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} Facebook`}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/12 bg-foreground/3 text-foreground/60 transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary"
                      >
                        <RiFacebookFill className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Core Values ────────────────────────────────────────────────── */}
      <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
              Company Values
            </p>
            <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
              Principles that guide our team.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((val) => (
              <div
                key={val.number}
                className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background p-6 inset-shadow-foreground/30 inset-shadow-sm flex flex-col justify-between gap-6 transition-all hover:border-foreground/20 hover:bg-foreground/2"
              >
                <div className="flex flex-col gap-3">
                  <span className={`${pinkAverage.className} text-3xl font-bold text-foreground/20`}>
                    {val.number}
                  </span>
                  <h3 className={`${pinkAverage.className} text-xl text-foreground`}>
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/65 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-foreground/8 flex items-center gap-1.5 text-[10px] text-primary font-bold uppercase tracking-wider">
                  <span>Core Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
