"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";
import AIChat from "../ui/AIChat";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Fixed bottom-right stack: ScrollToTop (top) + AIChat (bottom) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
        <ScrollToTop />
        <AIChat />
      </div>
    </>
  );
}
