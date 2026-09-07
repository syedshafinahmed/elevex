"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  Sun,
  Moon,
  Search,
  Bell,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";

interface DashboardHeaderProps {
  onOpenMobileSidebar: () => void;
}

const routeMetadata: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Overview",
    subtitle: "Real-time trade overview & analytics",
  },
  "/dashboard/products": {
    title: "All Products",
    subtitle: "Manage global catalog, live pricing & stock",
  },
  "/dashboard/exports": {
    title: "My Exports",
    subtitle: "Track active export listings & shipments",
  },
  "/dashboard/imports": {
    title: "My Imports",
    subtitle: "Review imported commodities & quantities",
  },
  "/dashboard/cart": {
    title: "Cart Items",
    subtitle: "Manage trade orders, quantities & allocate consignments",
  },
  "/dashboard/add-export": {
    title: "Add Export Listing",
    subtitle: "Publish a new commodity to global market",
  },
  "/dashboard/users": {
    title: "User Management",
    subtitle: "Manage accounts, permissions & role access",
  },
  "/dashboard/settings": {
    title: "Account Settings",
    subtitle: "Manage profile, security & trading preferences",
  },
};

export default function DashboardHeader({ onOpenMobileSidebar }: DashboardHeaderProps) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine current title and subtitle based on pathname
  let pageMeta = routeMetadata[pathname];
  if (!pageMeta && pathname.startsWith("/dashboard/products/")) {
    if (pathname.endsWith("/edit")) {
      pageMeta = {
        title: "Edit Product Listing",
        subtitle: "Update commodity details, specifications & pricing",
      };
    } else {
      pageMeta = {
        title: "Product Specifications",
        subtitle: "Admin inspection, inventory valuation & stock controls",
      };
    }
  }
  if (!pageMeta) {
    pageMeta = {
      title: "Dashboard",
      subtitle: "Elevex Export & Import Trading Hub",
    };
  }

  return (
    <header className={`${sansation.className} sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-foreground/10 bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8`}>
      {/* Left: Mobile menu button & Dynamic Title/Subtitle */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/30 inset-shadow-sm md:hidden shrink-0 cursor-pointer"
        >
          <Menu className="h-4 w-4 stroke-[1.75]" />
        </button>

        {/* Unique Dynamic Title and Subtitle for every menu */}
        <div className="flex flex-col min-w-0 justify-center">
          <h1 className={`${pinkAverage.className} text-base sm:text-xl font-bold tracking-tight text-foreground truncate leading-tight`}>
            {pageMeta.title}
          </h1>
          <p className="text-[11px] text-foreground/55 truncate leading-tight hidden xs:block sm:block">
            {pageMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Search Bar (Replaced New Export button), Notifications & Theme Toggle */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Global Search Bar */}
        <div className="relative hidden sm:flex items-center">
          <Search className="absolute left-3 h-3.5 w-3.5 text-foreground/40" />
          <input
            type="text"
            placeholder="Search commodities, origins, ID..."
            className="h-9 w-44 md:w-56 lg:w-72 rounded-xl border border-foreground/10 bg-foreground/3 pl-8.5 pr-8 text-xs text-foreground placeholder:text-foreground/40 transition-all focus:w-80 focus:border-primary focus:bg-foreground/5 focus:outline-none inset-shadow-foreground/30 inset-shadow-sm"
          />
          <kbd className="absolute right-2.5 rounded bg-foreground/10 px-1.5 py-0.5 text-[9px] font-semibold text-foreground/45">
            ⌘K
          </kbd>
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notifMenuRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen((v) => !v)}
            aria-label="Notifications"
            className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
          >
            <Bell className="h-4 w-4 stroke-[1.75]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-foreground/10 bg-background p-2 shadow-2xl backdrop-blur-md z-50">
              <div className="flex items-center justify-between border-b border-foreground/10 px-3 py-2">
                <span className="text-xs font-semibold text-foreground">Trade Notifications</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">2 new</span>
              </div>
              <div className="flex flex-col gap-1 py-2">
                <div className="flex flex-col gap-1 rounded-xl p-2.5 transition-colors hover:bg-foreground/5 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground">Escrow Payment Locked</span>
                    <span className="text-[9px] text-foreground/45">12m ago</span>
                  </div>
                  <p className="text-[10px] text-foreground/60 leading-tight">
                    Buyer from Hamburg deposited ৳ 240,000 for Raw Jute shipment.
                  </p>
                </div>
                <div className="flex flex-col gap-1 rounded-xl p-2.5 transition-colors hover:bg-foreground/5 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground">Customs Clearance Verified</span>
                    <span className="text-[9px] text-foreground/45">2h ago</span>
                  </div>
                  <p className="text-[10px] text-foreground/60 leading-tight">
                    Chittagong Port authority approved export documentation #EX-8841.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
        >
          {mounted ? (
            resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4 stroke-[1.75]" />
            ) : (
              <Moon className="h-4 w-4 stroke-[1.75]" />
            )
          ) : (
            <span className="h-4 w-4" />
          )}
        </button>
      </div>
    </header>
  );
}
