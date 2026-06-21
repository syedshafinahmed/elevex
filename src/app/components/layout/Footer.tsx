// import Link from "next/link";
// import { ArrowUpRight, Mail, MapPin } from "lucide-react";
// import { pinkAverage, sansation } from "@/lib/fonts";

// const platformLinks = [
//   { label: "Explore products", href: "/products" },
//   { label: "Add your export", href: "/add-export" },
//   { label: "Pricing", href: "/pricing" },
//   { label: "How it works", href: "/how-it-works" },
// ];

// const companyLinks = [
//   { label: "About", href: "/about" },
//   { label: "Careers", href: "/careers" },
//   { label: "Press", href: "/press" },
//   { label: "Contact", href: "/contact" },
// ];

// const resourceLinks = [
//   { label: "Trade guides", href: "/guides" },
//   { label: "API docs", href: "/docs" },
//   { label: "Verification process", href: "/verification" },
//   { label: "Help center", href: "/help" },
// ];

// const legalLinks = [
//   { label: "Privacy policy", href: "/privacy" },
//   { label: "Terms of service", href: "/terms" },
//   { label: "Compliance", href: "/compliance" },
// ];

// export default function Footer() {
//   return (
//     <footer className="mx-auto max-w-7xl px-4 pb-8 pt-2 sm:px-6 lg:px-10">
//       <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background">
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--color-amethyst) 20%, transparent), transparent 55%), radial-gradient(circle at 88% 45%, color-mix(in srgb, var(--color-amethyst) 12%, transparent), transparent 50%), radial-gradient(circle at 20% 100%, color-mix(in srgb, var(--color-amethyst) 16%, transparent), transparent 55%)",
//           }}
//         />

//         <div className="relative z-10 flex flex-col items-start justify-between gap-6 border-b border-foreground/10 px-6 py-10 sm:px-10 sm:py-12 md:flex-row md:items-center lg:px-12">
//           <h2
//             className={`${pinkAverage.className} max-w-md text-2xl leading-tight text-foreground sm:text-3xl`}
//           >
//             Ready to move your
//             <br />
//             next shipment?
//           </h2>

//           <div className="flex w-full flex-col gap-3 sm:max-w-md">
//             <form className={`${sansation.className} flex items-center gap-2`}>
//               <div className="flex flex-1 items-center gap-2 rounded-xl border border-foreground/15 bg-foreground/[0.03] px-3.5 py-3">
//                 <Mail className="h-4 w-4 shrink-0 stroke-[1.75] text-foreground/40" aria-hidden="true" />
//                 <input
//                   type="email"
//                   placeholder="you@company.com"
//                   aria-label="Email address"
//                   className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 active:scale-[0.98]"
//               >
//                 Get started
//                 <ArrowUpRight className="h-4 w-4 stroke-[2.25]" aria-hidden="true" />
//               </button>
//             </form>
//             <p className={`${sansation.className} text-xs text-foreground/40`}>
//               Free to list. No card required.
//             </p>
//           </div>
//         </div>

//         <div className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-10 px-6 py-10 sm:grid-cols-[1.2fr_1fr_1fr_1fr] sm:px-10 lg:px-12">
//           <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
//             <span className={`${pinkAverage.className} text-2xl text-foreground`}>
//               elevex
//             </span>
//             <p className={`${sansation.className} max-w-xs text-sm leading-relaxed text-foreground/60`}>
//               List, discover, and settle international trade deals on a
//               single platform built for exporters and importers who move
//               real volume.
//             </p>
//             <p className={`${sansation.className} flex items-start gap-2 text-sm text-foreground/60`}>
//               <MapPin className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.75] text-primary/80" aria-hidden="true" />
//               Dhaka, Bangladesh — serving 62 countries
//             </p>
//           </div>

//           <FooterColumn title="Platform" links={platformLinks} />
//           <FooterColumn title="Company" links={companyLinks} />
//           <FooterColumn title="Resources" links={resourceLinks} />
//         </div>

//         <div
//           className={`${sansation.className} relative z-10 flex flex-col gap-4 border-t border-foreground/10 px-6 py-6 text-xs text-foreground/40 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12`}
//         >
//           <p>&copy; {new Date().getFullYear()} elevex. All rights reserved.</p>
//           <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
//             {legalLinks.map(({ label, href }) => (
//               <Link
//                 key={label}
//                 href={href}
//                 className="transition-colors hover:text-foreground/70"
//               >
//                 {label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function FooterColumn({
//   title,
//   links,
// }: {
//   title: string;
//   links: { label: string; href: string }[];
// }) {
//   return (
//     <div className="flex flex-col gap-3">
//       <p
//         className={`${sansation.className} text-xs font-semibold uppercase tracking-[0.12em] text-foreground/40`}
//       >
//         {title}
//       </p>
//       <ul className="flex flex-col gap-2.5">
//         {links.map(({ label, href }) => (
//           <li key={label}>
//             <Link
//               href={href}
//               className={`${sansation.className} text-sm text-foreground/70 transition-colors hover:text-foreground`}
//             >
//               {label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }









import Link from "next/link";
import { Mail } from "lucide-react";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import { TbBrandGithubFilled } from "react-icons/tb";
import { SiGmail } from "react-icons/si";
import { RiDiscordFill, RiFacebookFill, RiLinkedinFill } from "react-icons/ri";

const platformLinks = [
  { label: "Explore products", href: "/products" },
  { label: "Add your export", href: "/add-export" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Trade guides", href: "/guides" },
  { label: "API docs", href: "/docs" },
  { label: "Verification process", href: "/verification" },
  { label: "Help center", href: "/help" },
];

const legalLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Compliance", href: "/compliance" },
];

const socialLinks = [
  { label: "Email", href: "mailto:shafinahmed.cse@gmail.com", icon: SiGmail },
  { label: "GitHub", href: "https://github.com/syedshafinahmed", icon: TbBrandGithubFilled },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/syed-shafin-ahmed/", icon: RiLinkedinFill },
  { label: "Facebook", href: "https://www.facebook.com/shafin.ahmed.3925/", icon: RiFacebookFill },
  { label: "Discord", href: "https://discord.com/users/1440245018341277756", icon: RiDiscordFill },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-8 pt-2 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-3xl bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
            "radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--color-amethyst) 35%, transparent), transparent 55%), radial-gradient(circle at 85% 90%, color-mix(in srgb, var(--color-amethyst) 22%, transparent), transparent 50%)",}}
        />

        <div className="relative z-10 flex flex-col items-start justify-between gap-6 border-b border-foreground/10 px-6 py-10 sm:px-10 sm:py-12 md:flex-row md:items-center lg:px-12">
          <h2
            className={`${pinkAverage.className} max-w-md text-2xl leading-tight text-foreground sm:text-4xl`}
          >
            Ready to move your
            <br />
            next shipment?
          </h2>

          <div className="flex w-full flex-col gap-3 sm:max-w-md">
            <form className={`${sansation.className} flex items-center gap-2`}>
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-foreground/15 bg-foreground/3 px-3.5 py-3">
                <Mail className="h-4 w-4 shrink-0 stroke-[1.75] text-foreground/40" aria-hidden="true" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Get started
              </button>
            </form>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-x-20 gap-y-10 px-6 py-10 sm:grid-cols-[1.2fr_1fr_1fr_1fr] sm:px-10 lg:px-12">
          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <p className={`${trunkey.className} text-7xl font-extrabold text-primary`}>elevex</p>
            </Link>
            <p className={`${sansation.className} max-w-xs text-xs leading-relaxed text-foreground/70`}>
              List, discover, and settle international trade deals on a
              single platform built for exporters and importers who move
              real volume.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/15 text-foreground/70 transition-colors hover:border-primary/80 hover:text-primary shadow-[inset_0_0_4px_rgba(0,0,0,0.25)]"
                >
                  <Icon className="h-4 w-4" size={25} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <FooterColumn title="Platform" links={platformLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
        </div>

        <div
          className={`${sansation.className} relative z-10 flex flex-col gap-4 border-t border-foreground/10 px-6 py-6 text-xs text-foreground/60 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12`}
        >
          <p>&copy; {new Date().getFullYear()} <span className={`${trunkey.className} font-extrabold text-primary`}>elevex</span>. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-foreground/70"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <p
        className={`${pinkAverage.className} text-base font-black uppercase tracking-wide text-foreground`}
      >
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className={`${sansation.className} text-sm text-foreground/70 transition-colors hover:text-foreground`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
