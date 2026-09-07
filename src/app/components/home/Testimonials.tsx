import Image from "next/image";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Carlos Mendez",
    role: "Head of Ops",
    company: "Andes Trading Co.",
    quote:
      "elevex cut our export settlement from three weeks down to two days. Our finance team stopped chasing banks and started closing deals instead. Nothing else comes close.",
    avatar: "https://i.pravatar.cc/64?img=12",
  },
  {
    name: "Priya Nair",
    role: "Treasury Lead",
    company: "Meridian Exports",
    quote:
      "We used to reconcile FX manually every Friday night. Now the ledger just matches itself. It genuinely feels like we hired a second treasury team for free.",
    avatar: "https://i.pravatar.cc/64?img=32",
  },
  {
    name: "Jonas Weber",
    role: "Founder",
    company: "Nordkorn Grain",
    quote:
      "The compliance dashboard alone justified the switch. Our auditors used to spend a week on-site, now they finish remotely before lunch and ask for coffee instead.",
    avatar: "https://i.pravatar.cc/64?img=51",
  },
  {
    name: "Amara Obi",
    role: "CFO",
    company: "Lagos Freight Group",
    quote:
      "Cross-border payouts that took five business days now clear overnight. Our suppliers noticed before our own accountants did, which tells you everything about the impact.",
    avatar: "https://i.pravatar.cc/64?img=45",
  },
  {
    name: "Mei Lin Tan",
    role: "Trade Finance Manager",
    company: "Pacific Rim Traders",
    quote:
      "Support actually understands trade finance, not just software. Every ticket gets answered by someone who has settled a letter of credit before. That's rare in this industry.",
    avatar: "https://i.pravatar.cc/64?img=25",
  },
  {
    name: "Diego Alvarez",
    role: "Managing Director",
    company: "Sonora Commodities",
    quote:
      "We onboarded three new counterparties in a single week without a single spreadsheet. The workflow just carries the paperwork for you from quote to final settlement.",
    avatar: "https://i.pravatar.cc/64?img=14",
  },
  {
    name: "Freya Larsen",
    role: "Risk Officer",
    company: "Baltic Shipping Alliance",
    quote:
      "Our exposure reports used to be a day old by the time anyone read them. Now they're live, and our risk committee finally trusts the numbers on screen.",
    avatar: "https://i.pravatar.cc/64?img=48",
  },
  {
    name: "Hassan Al-Farsi",
    role: "Procurement Director",
    company: "Gulfstream Petrochem",
    quote:
      "Switching vendors is always painful, but the migration took two weeks, not two quarters. Our old provider never matched this level of white-glove onboarding support.",
    avatar: "https://i.pravatar.cc/64?img=60",
  },
  {
    name: "Elena Petrova",
    role: "VP Finance",
    company: "Volga Timber Exports",
    quote:
      "The API let our engineers plug settlement data straight into our own dashboards. No more exporting CSVs at midnight before the Monday leadership meeting.",
    avatar: "https://i.pravatar.cc/64?img=36",
  },
  {
    name: "Tomás Ferreira",
    role: "Export Manager",
    company: "Serrado Coffee Collective",
    quote:
      "Our co-op used to lose a week to paperwork every harvest season. Now buyers confirm and pay in the same afternoon, and our growers finally get paid on time.",
    avatar: "https://i.pravatar.cc/64?img=53",
  },
];

const columns: Testimonial[][] = [
  [testimonials[0], testimonials[5]],
  [testimonials[1], testimonials[6]],
  [testimonials[2], testimonials[7]],
  [testimonials[3], testimonials[8]],
  [testimonials[4], testimonials[9]],
];

const TestimonialCard = ({
  testimonial,
  className = "mb-6",
}: {
  testimonial: Testimonial;
  className?: string;
}) => {
  return (
    <div className={`relative w-50 shrink-0 ${className}`}>
      <div className="testimonial-path testimonial-path-shadow relative z-10 min-h-50 w-50 bg-amethyst/30 overflow-hidden">
        <div
          aria-hidden="true"
          className={`${pinkAverage.className} pointer-events-none absolute -bottom-17 right-2 select-none text-[100px] leading-none text-foreground opacity-5`}
        >
          &rdquo;
        </div>

        {/* Name + role — offset right to clear the avatar */}
        <div className="relative z-10 ml-16 pt-3 pr-3">
          <p className={`${pinkAverage.className} text-sm text-foreground`}>
            {testimonial.name}
          </p>
          <p
            className={`${sansation.className} text-[10px] text-foreground/40 font-black`}
          >
            {testimonial.company}
          </p>
        </div>

        {/* Quote */}
        <div className="relative z-10 p-4">
          <p
            className={`${sansation.className} text-xs italic text-foreground/80`}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>
      </div>
      {/* Avatar — sits over the notch corner */}
      <Image
        src={testimonial.avatar}
        alt={testimonial.name}
        height={40}
        width={40}
        className="absolute top-0 left-0 z-20 h-10 w-10 rounded-xl border-2 border-primary/30 object-cover"
      />
    </div>
  );
};

const MarqueeColumn = ({
  items,
  direction,
  duration,
}: {
  items: Testimonial[];
  direction: "up" | "down";
  duration: number;
}) => {
  return (
    <div className="group relative h-130 w-50 overflow-hidden">
      <div
        className={`flex flex-col ${
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items, ...items].map((testimonial, i) => (
          <TestimonialCard
            key={`${testimonial.name}-${i}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className={`${sansation.className} mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10`}>
      <div className="flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <p className={`${trunkey.className} text-xs font-semibold uppercase tracking-[0.15em] text-primary`}>
            Social proof
          </p>
          <h2 className={`${pinkAverage.className} text-3xl sm:text-5xl text-foreground leading-tight`}>
            What traders say
          </h2>
        </div>

        {/* Mobile Only: 2 Horizontal Marquee Rows */}
        <div className="flex flex-col gap-4 overflow-hidden md:hidden">
          <div className="overflow-hidden w-full">
            <div className="flex flex-row flex-nowrap gap-6 w-max animate-marquee-right" style={{ animationDuration: "28s" }}>
              {[...testimonials.slice(0, 5), ...testimonials.slice(0, 5), ...testimonials.slice(0, 5)].map((t, i) => (
                <TestimonialCard key={`m1-${t.name}-${i}`} testimonial={t} className="mb-0" />
              ))}
            </div>
          </div>
          <div className="overflow-hidden w-full">
            <div className="flex flex-row flex-nowrap gap-6 w-max animate-marquee-left" style={{ animationDuration: "28s" }}>
              {[...testimonials.slice(5), ...testimonials.slice(5), ...testimonials.slice(5)].map((t, i) => (
                <TestimonialCard key={`m2-${t.name}-${i}`} testimonial={t} className="mb-0" />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Only: Vertical Columns */}
        <div
          className="hidden md:flex relative flex-wrap justify-center gap-10"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <MarqueeColumn items={columns[0]} direction="up" duration={28} />
          <MarqueeColumn items={columns[1]} direction="down" duration={28} />
          <MarqueeColumn items={columns[2]} direction="up" duration={28} />
          <MarqueeColumn items={columns[3]} direction="down" duration={28} />
          <MarqueeColumn items={columns[4]} direction="up" duration={28} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
