"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  Sun,
  Moon,
  Search,
  Bell,
  Plus,
  ChevronDown,
  LogOut,
  User,
  Shield,
  HelpCircle,
} from "lucide-react";
import { sansation } from "@/lib/fonts";

interface DashboardHeaderProps {
  onOpenMobileSidebar: () => void;
}

export default function DashboardHeader({ onOpenMobileSidebar }: DashboardHeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { data: session } = useSession();

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`${sansation.className} sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-foreground/10 bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8`}>
      {/* Left: Mobile menu button & Search */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          aria-label="Open sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 text-foreground md:hidden cursor-pointer"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Global Search Input */}
        <div className="relative hidden sm:flex items-center">
          <Search className="absolute left-3.5 h-3.5 w-3.5 text-foreground/40" />
          <input
            type="text"
            placeholder="Search exports, containers, buyers, HS codes..."
            className="h-10 w-64 md:w-80 rounded-xl border border-foreground/10 bg-foreground/3 pl-9 pr-8 text-xs text-foreground placeholder:text-foreground/40 transition-all focus:w-96 focus:border-primary focus:bg-foreground/5 focus:outline-none inset-shadow-foreground/10 inset-shadow-xs"
          />
          <kbd className="absolute right-3 rounded bg-foreground/10 px-1.5 py-0.5 text-[9px] font-semibold text-foreground/45">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions, Theme, Notifications & User */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Add Export Button */}
        <Link
          href="/dashboard/add-export"
          className="hidden sm:flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-[0.98]"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          New Export
        </Link>

        {/* Notification Bell */}
        <div className="relative" ref={notifMenuRef}>
          <button
            type="button"
            onClick={() => setNotificationsOpen((v) => !v)}
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/15 inset-shadow-sm cursor-pointer"
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
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/15 inset-shadow-sm cursor-pointer"
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

        {/* User profile dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setUserDropdownOpen((v) => !v)}
            aria-expanded={userDropdownOpen}
            aria-haspopup="true"
            className="flex h-10 items-center gap-2 rounded-xl border border-foreground/15 bg-foreground/5 pl-1.5 pr-2.5 text-foreground transition-all hover:bg-foreground/10 active:scale-[0.98] inset-shadow-foreground/15 inset-shadow-sm cursor-pointer"
          >
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={26}
                height={26}
                className="h-6.5 w-6.5 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-6.5 w-6.5 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-white">
                {(session?.user?.name?.[0] || session?.user?.email?.[0] || "U").toUpperCase()}
              </div>
            )}
            <span className="hidden sm:inline max-w-[100px] truncate text-xs font-semibold">
              {session?.user?.name?.split(" ")[0] || session?.user?.email?.split("@")[0] || "Trader"}
            </span>
            <ChevronDown className={`h-3 w-3 text-foreground/50 transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Profile Menu dropdown */}
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-foreground/10 bg-background/95 p-1.5 shadow-2xl backdrop-blur-md z-50">
              <div className="border-b border-foreground/10 px-3 py-2.5 mb-1">
                <p className="text-xs font-semibold text-foreground truncate">
                  {session?.user?.name || "Trader Account"}
                </p>
                <p className="text-[10px] text-foreground/50 truncate">
                  {session?.user?.email || "trader@elevex.global"}
                </p>
                <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-green-500/10 px-1.5 py-0.5 text-[9px] font-bold text-green-600 dark:text-green-400">
                  <Shield className="h-2.5 w-2.5" />
                  Verified Trader (Tier 2)
                </div>
              </div>

              <Link
                href="/dashboard/settings"
                onClick={() => setUserDropdownOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors"
              >
                <User className="h-3.5 w-3.5 text-primary" />
                Profile & Verification
              </Link>

              <Link
                href="/contact"
                onClick={() => setUserDropdownOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors"
              >
                <HelpCircle className="h-3.5 w-3.5 text-foreground/60" />
                Trader Support
              </Link>

              <button
                type="button"
                onClick={() => {
                  setUserDropdownOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
