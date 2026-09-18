"use client";

import { useState } from "react";
import { CardFolder } from "@/components/motion/card-folder";
import { DigitSwap } from "@/components/motion/digit-swap";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModal";

const CARD_NUMBER = "3745 6987 4096 0806";
const MASKED_CARD_NUMBER = "•••• •••• •••• 0806";
const CONTOUR_RADII = Array.from({ length: 18 }, (_, index) => 72 + index * 24);

export interface CardArtworkProps {
  detailsVisible: boolean;
  name?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  brand?: string;
}

export function CardArtwork({
  detailsVisible,
  name = "Syed Shafin Ahmed",
  cardNumber = CARD_NUMBER,
  expiry = "08/29",
  cvv = "123",
  brand = "elevex",
}: CardArtworkProps) {
  return (
    <span
      style={{
        background: "linear-gradient(135deg, var(--color-primary) 0%, #542882 48%, #2d124c 100%)",
        width: "100%",
        height: "100%",
      }}
      className="relative block h-full w-full overflow-hidden bg-[linear-gradient(135deg,var(--color-primary)_0%,#542882_48%,#2d124c_100%)] text-white"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 640 404"
        style={{ width: "100%", height: "100%" }}
        className="absolute inset-0 h-full w-full"
      >
        {CONTOUR_RADII.map((radius, index) => (
          <circle
            // The concentric contours deliberately begin outside the card so
            // their cropped curves read like the reference artwork.
            key={radius}
            cx="-20"
            cy="-28"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.32 - index * 0.009}
            strokeWidth="1.5"
          />
        ))}
      </svg>

      <span className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgb(255_255_255/0.11),transparent_32%)]" />

      <span className="absolute left-[6%] top-[8%] flex flex-col gap-1 sm:gap-2 max-w-[65%]">
        <span className="truncate text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/55">
          {name}
        </span>
        <DigitSwap
          value={detailsVisible ? cardNumber : MASKED_CARD_NUMBER}
          animationKey={detailsVisible ? "revealed" : "masked"}
          direction={detailsVisible ? "up" : "down"}
          suffixLength={4}
          glyphClassName={detailsVisible ? "text-white/90" : "text-white/65"}
          suffixClassName="text-white/90"
          className="font-mono text-[9px] min-[380px]:text-[10px] sm:text-xs tracking-[0.06em] min-[380px]:tracking-[0.08em] sm:tracking-[0.13em]"
        />
      </span>

      <span className="absolute top-[8%] right-[7%] h-[20%] w-[13%] overflow-hidden rounded-[18%] border border-black/30 bg-[linear-gradient(135deg,#f2f0ea_0%,#b9b7b1_45%,#e4e1d9_100%)]">
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/30" />
        <span className="absolute inset-x-0 top-1/3 h-px bg-black/30" />
        <span className="absolute inset-x-0 bottom-1/3 h-px bg-black/30" />
        <span className="absolute left-0 top-1/2 h-[34%] w-[28%] -translate-y-1/2 rounded-r-[35%] border border-l-0 border-black/30" />
        <span className="absolute right-0 top-1/2 h-[34%] w-[28%] -translate-y-1/2 rounded-l-[35%] border border-r-0 border-black/30" />
      </span>

      <span className="absolute bottom-[9%] left-[6%] flex items-center gap-1.5 sm:gap-2 text-sm sm:text-lg font-semibold tracking-[-0.04em]">
        {brand} <span className="block size-2 sm:size-2.5 rotate-45 rounded-[2px] bg-white/85" />
      </span>

      <span className="absolute right-[7%] bottom-[10%] flex items-end gap-2.5 sm:gap-5">
        <span className="flex flex-col gap-0.5 sm:gap-1">
          <span className="text-[7px] sm:text-[8px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.16em] text-white/40">
            Expiry
          </span>
          <span className="text-[9px] min-[380px]:text-[10px] sm:text-xs font-medium text-white/90 tabular-nums">
            {expiry}
          </span>
        </span>
        <span className="flex flex-col gap-0.5 sm:gap-1">
          <span className="text-[7px] sm:text-[8px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.16em] text-white/40">
            CVV
          </span>
          <DigitSwap
            value={detailsVisible ? cvv : "•••"}
            animationKey={detailsVisible ? "revealed" : "masked"}
            direction={detailsVisible ? "up" : "down"}
            className="font-mono text-[9px] min-[380px]:text-[10px] sm:text-xs font-medium text-white/90"
          />
        </span>
      </span>
    </span>
  );
}

export interface CardFolderPreviewProps {
  title?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  className?: string;
}

export function CardFolderPreview({
  title = "Syed Shafin Ahmed",
  cardNumber = CARD_NUMBER,
  expiry = "08/29",
  cvv = "123",
  className = "",
}: CardFolderPreviewProps = {}) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className={`flex min-h-56 sm:min-h-72 w-full items-center justify-center px-2 py-4 sm:px-6 sm:py-9 ${className}`}>
      <CardFolder
        title={title}
        cardNumber={cardNumber}
        expiry={expiry}
        cvv={cvv}
        detailsVisible={detailsVisible}
        onDetailsVisibleChange={setDetailsVisible}
        card={
          <CardArtwork
            detailsVisible={detailsVisible}
            name={title}
            cardNumber={cardNumber}
            expiry={expiry}
            cvv={cvv}
          />
        }
      />
    </div>
  );
}

export interface TradeCardSectionProps {
  kicker?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

export default function TradeCardSection({
  kicker = "Protected Settlement & Identity",
  title = "Secure trade with encrypted credentials.",
  description = "Elevex equips verified enterprise traders with encrypted digital credentials. Seamlessly authorize escrow disbursements, unlock bill-of-lading documents, and verify counterparties across international borders with zero information leakage.",
  ctaText = "Get Verified",
  ctaHref = "/contact",
  onCtaClick,
  className = "",
}: TradeCardSectionProps) {
  const [authOpen, setAuthOpen] = useState(false);
  const isSignup = ctaHref === "/signup";

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    if (isSignup) {
      setAuthOpen(true);
    }
  };

  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-3 py-6 sm:py-12 sm:px-6 lg:px-10 ${className}`}>
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-foreground/10 bg-gradient-to-b from-primary/10 via-transparent to-transparent px-4 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14 inset-shadow-foreground/30 inset-shadow-sm"
      >
        <div className="relative z-10 grid items-center gap-8 sm:gap-10 lg:grid-cols-12">
          {/* Left Column: Context & Features */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-6">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <p className={`${trunkey.className} text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
                {kicker}
              </p>
              <h2 className={`${pinkAverage.className} text-2xl sm:text-4xl md:text-5xl text-foreground leading-tight`}>
                {title}
              </h2>
            </div>

            <p className="text-xs sm:text-base leading-relaxed text-foreground/70">
              {description}
            </p>

            {ctaText && (
              <div className="pt-1 sm:pt-2 flex items-center gap-3">
                <Button
                  href={isSignup || onCtaClick ? undefined : ctaHref}
                  onClick={isSignup || onCtaClick ? handleCtaClick : undefined}
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto text-center justify-center"
                >
                  {ctaText}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column: Card UI Component */}
          <div className="relative flex flex-col items-center justify-center lg:col-span-6 w-full">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-48 sm:h-72 w-48 sm:w-110 rounded-full bg-primary/10 blur-2xl"
            />
            <CardFolderPreview />
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </section>
  );
}
