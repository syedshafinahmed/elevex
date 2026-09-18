import type { Metadata } from "next";
import "./globals.css";
import { pinkAverage } from "@/lib/fonts";
import { Providers } from "./providers";
import AppShell from "./components/layout/AppShell";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elevex-ssa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Elevex — Direct-to-Producer Global Trade Exchange",
    template: "%s | Elevex",
  },
  description:
    "Elevex is a B2B cross-border trade platform connecting verified commodity producers across South Asia directly with international buyers. Zero broker intermediaries. Transparent pricing. Guaranteed settlement.",
  keywords: [
    "Elevex",
    "B2B trade platform",
    "commodity marketplace",
    "import export hub",
    "cross-border trade",
    "South Asia exports",
    "bulk commodities",
    "direct trade",
    "agricultural exports",
    "textile exports",
    "trade finance",
    "Next.js marketplace",
    "Prisma PostgreSQL",
    "Auth.js",
    "Stripe payments",
  ],
  authors: [{ name: "Syed Shafin Ahmed", url: siteUrl }],
  creator: "Syed Shafin Ahmed",
  publisher: "Elevex",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Elevex",
    title: "Elevex — Direct-to-Producer Global Trade Exchange",
    description:
      "A modern B2B marketplace connecting verified commodity producers across South Asia directly with international buyers. No brokers. No spreads. Full transparency.",
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: "Elevex — Direct-to-Producer Global Trade Exchange",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Elevex — Direct-to-Producer Global Trade Exchange",
    description:
      "A modern B2B marketplace connecting verified commodity producers across South Asia directly with international buyers. No brokers. No spreads. Full transparency.",
    images: [`${siteUrl}/logo.png`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png" }],
  },

  alternates: {
    canonical: siteUrl,
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased scroll-smooth", "font-sans", inter.variable)} suppressHydrationWarning>
      <body className={`min-h-full flex flex-col ${pinkAverage.className}`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
