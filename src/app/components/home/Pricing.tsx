"use client";

import { useState } from "react";
import { Check, XCircle } from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import Button from "../ui/Button";

const plans = [
  {
    name: "Starter",
    priceMonthly: "Free",
    periodMonthly: null,
    priceYearly: "Free",
    periodYearly: null,
    desc: "For new exporters entering global trade.",
    highlight: false,
    badge: null,
    features: [
      "Up to 5 active listings",
      "Basic AIS freight tracking",
      "Manual customs filing support",
      "Community access",
      "Email support",
    ],
    notIncluded: ["Automated customs clearance", "Escrow vault", "Compliance dashboard"],
    cta: "Start for Free",
    href: "/signup",
  },
  {
    name: "Growth",
    priceMonthly: "৳1,200",
    periodMonthly: "/month",
    priceYearly: "৳9,999",
    periodYearly: "/year",
    desc: "For active exporters moving real volume.",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited listings",
      "Real-time AIS freight telemetry",
      "Automated customs clearance",
      "Escrow vault — 14 currencies",
      "Live compliance dashboard",
      "API access",
      "Priority support",
    ],
    notIncluded: [],
    cta: "Start Growth",
    href: "/signup",
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    periodMonthly: null,
    priceYearly: "Custom",
    periodYearly: null,
    desc: "Bespoke setup for large trading houses.",
    highlight: false,
    badge: null,
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom compliance rulesets",
      "White-glove onboarding",
      "SLA guarantees",
      "On-site audit support",
      "Custom integrations & webhooks",
    ],
    notIncluded: [],
    cta: "Talk to Sales",
    href: "/contact",
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      {/* Heading + Toggle Tab */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className={`${sansation.className} text-xs font-semibold uppercase tracking-[0.15em] text-foreground/40`}>
            Pricing
          </p>
          <h2 className={`${pinkAverage.className} text-3xl text-foreground sm:text-[2.75rem]`}>
            Simple, transparent plans.
          </h2>
          <p className={`${sansation.className} mt-1 max-w-lg text-sm leading-relaxed text-foreground/55`}>
            Start free and scale as your trade volume grows. No lock-in contracts.
          </p>
        </div>

        {/* Monthly / Yearly Tab */}
        <div className="flex items-center gap-1 rounded-2xl border border-foreground/10 bg-foreground/3 inset-shadow-foreground/15 inset-shadow-sm p-1 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`${sansation.className} flex items-center justify-center rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
              billingCycle === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("yearly")}
            className={`${sansation.className} flex items-center justify-center rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
              billingCycle === "yearly"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            Yearly
            <span className="ml-1.5 rounded-md bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">
              31% OFF
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => {
          const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
          const period = billingCycle === "monthly" ? plan.periodMonthly : plan.periodYearly;

          return (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 sm:p-7 h-full inset-shadow-sm ${
                plan.highlight
                  ? "border-primary/10 bg-amethyst inset-shadow-[#141414]/90"
                  : "border-foreground/10 bg-background/30 inset-shadow-foreground/15"
              }`}
            >
              <div className="relative z-10 flex flex-col justify-between flex-1 gap-5 h-full">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <p
                      className={`${sansation.className} text-[11px] font-semibold uppercase tracking-[0.15em] ${
                        plan.highlight ? "text-background/55" : "text-foreground/40"
                      }`}
                    >
                      {plan.name}
                    </p>
                    {plan.badge && (
                      <span
                        className={`${sansation.className} inline-flex inset-shadow-foreground/15 inset-shadow-sm items-center gap-1.5 rounded-xl border border-background/20 bg-background p-2.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-foreground`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`${pinkAverage.className} text-4xl ${
                          plan.highlight ? "text-background" : "text-foreground"
                        }`}
                      >
                        {price}
                      </span>
                      {period && (
                        <span
                          className={`${sansation.className} text-sm ${
                            plan.highlight ? "text-background/50" : "text-foreground/40"
                          }`}
                        >
                          {period}
                        </span>
                      )}
                    </div>
                    <p
                      className={`${sansation.className} mt-1 text-xs leading-relaxed line-clamp-1 truncate ${
                        plan.highlight ? "text-background/60" : "text-foreground/50"
                      }`}
                    >
                      {plan.desc}
                    </p>
                  </div>

                  <div
                    className={`h-px ${plan.highlight ? "bg-background/15" : "bg-foreground/10"}`}
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-2">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <Check
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 stroke-[2.5] ${
                            plan.highlight ? "text-background" : "text-primary"
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`${sansation.className} text-xs leading-relaxed ${
                            plan.highlight ? "text-background/80" : "text-foreground/65"
                          }`}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <XCircle
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 stroke-[1.75] text-foreground/20"
                          aria-hidden="true"
                        />
                        <span
                          className={`${sansation.className} text-xs leading-relaxed text-foreground/30`}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <Button
                    href={plan.href}
                    variant={plan.highlight ? "secondary" : "outline"}
                    size="sm"
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
