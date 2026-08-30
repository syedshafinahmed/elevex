import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import { pinkAverage } from "@/lib/fonts";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ui/ScrollToTop";
import { Providers } from "./providers";

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
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
