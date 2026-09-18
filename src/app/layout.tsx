import type { Metadata } from "next";
import "./globals.css";
import { pinkAverage } from "@/lib/fonts";
import { Providers } from "./providers";
import AppShell from "./components/layout/AppShell";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elevex-ssa.vercel.app";

const ogImageUrl = "https://res.cloudinary.com/dwi0rh2ti/image/upload/v1789729596/elevex-og_bi7pii.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Elevex — Global Trade Exchange",
    template: "%s | Elevex",
  },
  description:
    "Elevex is a B2B cross-border trade platform connecting verified commodity producers directly with global buyers. Zero brokers. Guaranteed settlement.",
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
    title: "Elevex — Global Trade Exchange",
    description:
      "Elevex connects verified commodity producers directly with global buyers. Zero broker fees. Guaranteed trade settlement.",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Elevex — Global Trade Exchange",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Elevex — Global Trade Exchange",
    description:
      "Elevex connects verified commodity producers directly with global buyers. Zero broker fees. Guaranteed trade settlement.",
    images: [ogImageUrl],
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

  manifest: "/site.webmanifest",

  other: {
    "theme-color": "#542882",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Elevex",
              url: siteUrl,
              logo: `${siteUrl}/favicon.png`,
              description:
                "Elevex is a B2B cross-border trade platform connecting verified commodity producers across South Asia directly with international buyers.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dhaka",
                addressCountry: "BD",
              },
              sameAs: [
                "https://github.com/syedshafinahmed/elevex",
              ],
            }),
          }}
        />
      </head>
      <body className={`min-h-full flex flex-col ${pinkAverage.className}`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
