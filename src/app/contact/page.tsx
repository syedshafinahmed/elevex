"use client";

import { useState } from "react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { MapPin, Phone } from "lucide-react";
import { SiGmail } from "react-icons/si";
import { RiFacebookFill, RiInstagramFill, RiTwitterXFill, RiYoutubeFill, RiLinkedinFill } from "react-icons/ri";
import Button from "../components/ui/Button";
import { toast } from "gooey-toast";

const contactDetails = [
  {
    icon: SiGmail,
    title: "Email",
    value: "shafinahmed.cse@gmail.com",
    href: "mailto:shafinahmed.cse@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1630216932",
    href: "tel:+8801630216932",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "Mirpur-2, Dhaka-1216, Bangladesh",
    href: null,
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/shafin.ahmed.3925/", icon: RiFacebookFill },
  { label: "Instagram", href: "#", icon: RiInstagramFill },
  { label: "X", href: "#", icon: RiTwitterXFill },
  { label: "Youtube", href: "#", icon: RiYoutubeFill },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syed-shafin-ahmed/", icon: RiLinkedinFill },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success({
        title: "Message Sent",
      });
    }, 600);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      {/* Single unified card */}
      <div className="relative overflow-hidden rounded-3xl bg-background">
        {/* Full-card ambient glow */}
        <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
          "radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--color-amethyst) 35%, transparent), transparent 55%), radial-gradient(circle at 85% 90%, color-mix(in srgb, var(--color-amethyst) 22%, transparent), transparent 50%)",}}
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
                className={`${sansation.className} max-w-sm text-sm sm:text-base leading-relaxed text-foreground/60`}
              >
                Whether you&apos;re listing your first export or settling a
                multi-country route, our trade specialists are here to help.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {contactDetails.map(({ icon: Icon, title, value, href }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 inset-shadow-foreground/30 inset-shadow-sm items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className={`${sansation.className} text-xs font-semibold uppercase tracking-widest text-foreground/40`}>
                      {title}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className={`${sansation.className} text-sm text-foreground/80 transition-colors hover:text-primary`}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className={`${sansation.className} text-sm text-foreground/80`}>
                        {value}
                      </p>
                    )}
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
                    className="flex h-10 w-10 inset-shadow-foreground/30 inset-shadow-sm items-center justify-center bg-background/20 rounded-xl border border-foreground/15 text-foreground/70 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all"
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name & Email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField
                  label="Name"
                  id="name"
                  placeholder="Shafin Ahmed"
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
                  label="Company"
                  id="company"
                  placeholder="BlueWave Trading Co."
                />
                <FormField
                  label="Topic"
                  id="topic"
                  placeholder="Exporter verification…"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className={`${sansation.className} text-xs font-semibold uppercase tracking-widest text-foreground/50`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Describe your shipment, trade route, or question…"
                  className={`${sansation.className} w-full resize-none rounded-xl border border-foreground/15 bg-foreground/3 px-3.5 py-3 text-sm text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none`}
                />
              </div>

              <FormField
                label="Origin country (optional)"
                id="country"
                placeholder="e.g. Bangladesh, Colombia, Germany…"
              />
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Sending..." : "Send message"}
              </Button>

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
        className={`${sansation.className} text-xs font-semibold uppercase tracking-widest text-foreground/50`}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className={`${sansation.className} w-full rounded-xl border border-foreground/15 bg-foreground/3 px-3.5 py-3 text-sm text-foreground placeholder:text-foreground/35 focus:border-primary focus:outline-none`}
      />
    </div>
  );
}
