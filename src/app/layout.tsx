import type { Metadata } from "next";
import "./globals.css";
import { pinkAverage } from "@/lib/fonts";
import { Providers } from "./providers";
import AppShell from "./components/layout/AppShell";

export const metadata: Metadata = {
  title: "Elevex",
  description: "Elevex trade and export platform",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`min-h-full flex flex-col ${pinkAverage.className}`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
