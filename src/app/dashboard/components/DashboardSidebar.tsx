"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Download,
  Upload,
  PlusCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { sansation, trunkey } from "@/lib/fonts";
import { useProducts } from "@/context/ProductContext";

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function DashboardSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { products, myImports, myExports } = useProducts();

  const navItems = [
    { label: "Home",         href: "/",                    icon: Home },
    { label: "Overview",     href: "/dashboard",           icon: LayoutDashboard },
    { label: "All Products", href: "/dashboard/products",  icon: ShoppingBag, badge: `${products.length}` },
    { label: "My Exports",   href: "/dashboard/exports",   icon: Upload, badge: `${myExports.length}` },
    { label: "My Imports",   href: "/dashboard/imports",   icon: Download, badge: `${myImports.length}` },
    { label: "Add Export",   href: "/dashboard/add-export", icon: PlusCircle },
    { label: "Settings",     href: "/dashboard/settings",  icon: Settings },
  ];

  function isItemActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const sidebarContent = (
    <div className={`${sansation.className} flex h-full flex-col justify-between p-4`}>
      {/* Top section: Logo & Nav */}
      <div className="flex flex-col gap-6">
        {/* Brand */}
        <div className="flex items-center justify-between px-2 pt-1">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            {!collapsed && (
              <span className={`${trunkey.className} text-4xl font-bold tracking-wide text-primary`}>
                elevex
              </span>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/5 text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground cursor-pointer"
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5 stroke-[2]" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5 stroke-[2]" />
            )}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const active = isItemActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                title={collapsed ? item.label : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-foreground/65 hover:bg-foreground/6 hover:text-foreground"
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    active ? "text-white" : "text-foreground/60 group-hover:text-foreground"
                  }`}
                />
                {!collapsed && (
                  <span className="flex-1 truncate tracking-wide">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-foreground/10 text-foreground/70"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: User Pill & Sign Out */}
      <div className="flex flex-col gap-3 pt-4 border-t border-foreground/10">
        {session?.user && (
          <div
            className={`flex items-center gap-2.5 rounded-xl border border-foreground/10 bg-foreground/3 p-2 inset-shadow-foreground/10 inset-shadow-xs ${
              collapsed ? "justify-center p-1.5" : ""
            }`}
          >
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "Trader"}
                width={28}
                height={28}
                className="h-7 w-7 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white shrink-0">
                {(session.user.name?.[0] || session.user.email?.[0] || "U").toUpperCase()}
              </div>
            )}
            {!collapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="truncate text-xs font-semibold text-foreground">
                  {session.user.name || "Trader"}
                </span>
                <span className="truncate text-[10px] text-foreground/50">
                  {session.user.email}
                </span>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          title={collapsed ? "Logout" : undefined}
          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-500/80 transition-colors hover:bg-red-500/10 hover:text-red-500 cursor-pointer ${
            collapsed ? "justify-center px-0" : ""
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-foreground/10 bg-background transition-all duration-300 ${
          collapsed ? "w-20" : "w-52"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-foreground/10 bg-background shadow-2xl transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
