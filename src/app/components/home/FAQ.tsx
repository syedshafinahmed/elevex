"use client";

import { useState } from "react";
import { ChevronDown, AlertTriangle } from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";

const faqs = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes — upgrades and downgrades take effect at the start of your next billing cycle. No lock-in, no exit fees.",
  },
  {
    q: "Which currencies does Escrow Vault support?",
    a: "USD, EUR, GBP, BDT, INR, SGD, AED, NGN, KES, MYR, THB, JPY, CAD, and AUD. More are added on request.",
  },
  {
    q: "How does automated customs clearance work?",
    a: "Our duty engine classifies goods, prepares digital bills of lading, calculates applicable tariffs, and submits port filings — all before your cargo arrives at the border.",
  },
  {
    q: "Is there a Growth trial?",
    a: "Yes — 14 days with all Growth features fully unlocked. No credit card required.",
  },
  {
    q: "What happens if a shipment is disputed?",
    a: "Escrow funds remain locked until a resolution is reached. Our trade specialists can mediate and both parties have full access to the audit trail as evidence.",
  },
  {
    q: "How are HS Codes auto-validated?",
    a: "Our compliance engine parses product specifications against global WCO tariff databases, flagging restricted items and tariff mismatches in real time.",
  },
  {
    q: "What security measures protect escrow funds?",
    a: "All funds are held in multi-signature vault accounts governed by programmable milestone smart contracts. No single party can withdraw without verified proof of delivery.",
  },
  {
    q: "Can I integrate Elevex with my existing ERP system?",
    a: "Yes — Growth and Enterprise plans include REST APIs and webhooks to sync orders, invoices, and shipment tracking directly into SAP, Oracle, or custom ERP systems.",
  },
  {
    q: "What document formats are supported for trade listings?",
    a: "We support PDF, DOCX, XLSX, and scanned images. Our AI document parser automatically extracts line items, quantities, and origin data into structured fields.",
  },
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
              Support & Guidance
            </p>
            <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
              Frequently asked questions.
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
            <AlertTriangle className="h-3.5 w-3.5 stroke-[1.75] text-foreground/30" aria-hidden="true" />
            <span className={`${sansation.className} text-xs text-foreground/35`}>
              Can&apos;t find your answer?{" "}
              <a href="/contact" className="text-primary hover:underline">
                Contact us
              </a>
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-foreground/10 divide-y divide-foreground/10 bg-background">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              type="button"
              id={`faq-${i}`}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              aria-expanded={openFaq === i}
              aria-controls={`faq-body-${i}`}
              className={`${sansation.className} flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-foreground sm:px-8`}
            >
              {faq.q}
              <ChevronDown
                className={`h-4 w-4 shrink-0 stroke-[1.75] text-foreground/35 transition-transform duration-200 ${
                  openFaq === i ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {openFaq === i && (
              <div id={`faq-body-${i}`} className="px-6 pb-5 sm:px-8">
                <p className={`${sansation.className} text-sm leading-relaxed text-foreground/55`}>
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

        <div className="mt-4 flex sm:hidden items-center gap-1.5 justify-center">
          <AlertTriangle className="h-3.5 w-3.5 stroke-[1.75] text-foreground/30" aria-hidden="true" />
          <span className={`${sansation.className} text-xs text-foreground/35`}>
            Can&apos;t find your answer?{" "}
            <a href="/contact" className="text-primary hover:underline">
              Contact us
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
