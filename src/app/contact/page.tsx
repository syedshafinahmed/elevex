import { pinkAverage, sansation } from "@/lib/fonts";
import { MapPin, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { TbBrandGithubFilled } from "react-icons/tb";
import { SiGmail } from "react-icons/si";
import { RiDiscordFill, RiFacebookFill, RiLinkedinFill } from "react-icons/ri";

const contactReasons = [
  {
    icon: ShieldCheck,
    title: "Verified trade support",
    desc: "Questions about exporter verification or escrow-protected settlements.",
  },
  {
    icon: MapPin,
    title: "Route & logistics help",
    desc: "Need help finding the right trade route across our 62 active countries.",
  },
  {
    icon: Clock,
    title: "Response within 24 hours",
    desc: "Our trade specialists respond to every message within one business day.",
  },
];

const socialLinks = [
  { label: "Email", href: "mailto:shafinahmed.cse@gmail.com", icon: SiGmail },
  {
    label: "GitHub",
    href: "https://github.com/syedshafinahmed",
    icon: TbBrandGithubFilled,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/syed-shafin-ahmed/",
    icon: RiLinkedinFill,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/shafin.ahmed.3925/",
    icon: RiFacebookFill,
  },
  {
    label: "Discord",
    href: "https://discord.com/users/1440245018341277756",
    icon: RiDiscordFill,
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
      {/* Single unified card */}
      <div className="relative overflow-hidden rounded-3xl bg-background">
        {/* Full-card ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 8% 15%, color-mix(in srgb, var(--color-amethyst) 28%, transparent), transparent 50%), radial-gradient(circle at 92% 85%, color-mix(in srgb, var(--color-amethyst) 18%, transparent), transparent 50%)",
          }}
        />

        {/* Inner grid: left pitch | divider | right form */}
        <div className="relative z-10 grid md:grid-cols-[1fr_1px_1.2fr]">
          {/* Left: pitch */}
          <div className="flex flex-col justify-between gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <div className="flex flex-col gap-6">
              <h1
                className={`${pinkAverage.className} max-w-sm text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl`}
              >
                Tell us about
                <br />
                your <span className="text-primary">shipment</span>.
              </h1>

              <p
                className={`${sansation.className} max-w-sm text-sm leading-relaxed text-foreground/60 sm:text-base`}
              >
                Whether you&apos;re listing your first export or settling a
                multi-country route, our trade specialists are here to help.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {contactReasons.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/[0.03] text-primary">
                    <Icon
                      className="h-4 w-4 stroke-[1.75]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p
                      className={`${sansation.className} text-sm font-semibold text-foreground`}
                    >
                      {title}
                    </p>
                    <p
                      className={`${sansation.className} text-xs leading-relaxed text-foreground/55`}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <p
                className={`${sansation.className} text-xs font-semibold uppercase tracking-[0.12em] text-foreground/40`}
              >
                Find us on
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/[0.03] text-foreground/60 transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider — vertical on md+, horizontal on mobile */}
          <div
            className="hidden bg-foreground/10 md:block"
            aria-hidden="true"
          />
          <div
            className="mx-6 block h-px bg-foreground/10 sm:mx-10 md:hidden"
            aria-hidden="true"
          />

          {/* Right: form */}
          <div className="flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <div className="flex flex-col gap-1.5">
              <h2
                className={`${pinkAverage.className} text-2xl text-foreground`}
              >
                Send a message
              </h2>
              <p
                className={`${sansation.className} text-sm text-foreground/55`}
              >
                All fields are required unless marked optional.
              </p>
            </div>

            <form className="flex flex-col gap-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField
                  label="First name"
                  id="first-name"
                  placeholder="Shafin"
                />
                <FormField
                  label="Work email"
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                />
              </div>

              {/* Company & Topic */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField
                  label="Company / organisation"
                  id="company"
                  placeholder="BlueWave Trading Co."
                />
                <FormField
                  label="Topic"
                  id="topic"
                  placeholder="e.g. Exporter verification…"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className={`${sansation.className} text-xs font-semibold uppercase tracking-[0.1em] text-foreground/50`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Describe your shipment, trade route, or question…"
                  className={`${sansation.className} w-full resize-none rounded-xl border border-foreground/15 bg-foreground/[0.03] px-3.5 py-3 text-sm text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none`}
                />
              </div>

              <FormField
                label="Origin country (optional)"
                id="country"
                placeholder="e.g. Bangladesh, Colombia, Germany…"
              />

              <button
                type="submit"
                className={`${sansation.className} group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 active:scale-[0.98]`}
              >
                Send message
                <ArrowUpRight
                  className="h-4 w-4 stroke-[2.25] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <p
                className={`${sansation.className} text-center text-xs text-foreground/40`}
              >
                By submitting you agree to our{" "}
                <a
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-foreground/70"
                >
                  privacy policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  id,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={`${sansation.className} text-xs font-semibold uppercase tracking-[0.1em] text-foreground/50`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className={`${sansation.className} w-full rounded-xl border border-foreground/15 bg-foreground/[0.03] px-3.5 py-3 text-sm text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none`}
      />
    </div>
  );
}
