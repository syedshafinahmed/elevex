"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { Menu, Sun, Moon, Home, Briefcase, Mail, Package, LogOut, LayoutDashboard, ChevronDown, ShoppingCart } from "lucide-react";
import { sansation, trunkey } from "@/lib/fonts";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModal";
import { useProducts } from "@/context/ProductContext";
import { useUserRole } from "@/context/UserRoleContext";
import { toast } from "gooey-toast";

const navLinks = [
  { label: "Home",     href: "/",        icon: Home },
  { label: "Products", href: "/products", icon: Package },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Contact",  href: "/contact",  icon: Mail },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useProducts();
  const { users, currentRole } = useUserRole();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { data: session } = useSession();

  const dbUser = users.find(
    (u) => u.email.toLowerCase() === session?.user?.email?.toLowerCase()
  );
  const userRole = dbUser?.role || ((session?.user as { role?: string })?.role === "ADMIN" ? "ADMIN" : currentRole) || "USER";
  const isAdmin = userRole === "ADMIN";

  function handleCartClick() {
    if (session?.user) {
      router.push("/dashboard/cart");
    } else {
      toast.error({
        title: "Please log in to view your cart",
        description: "You must be signed in to manage your cart items.",
      });
      setAuthOpen(true);
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdownOpen]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`${sansation.className} relative w-full bg-background`}>
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Left links - desktop only */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "text-base font-semibold text-primary transition-colors"
                      : "text-base font-medium text-foreground/60 transition-colors hover:text-foreground"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logo: static top-left on mobile, absolute-centered on desktop */}
        <Link
          href="/"
          className="relative z-20 flex items-center gap-2 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        >
          <p className={`${trunkey.className} text-4xl font-extrabold text-primary md:text-7xl`}>elevex</p>
        </Link>

        {/* Right action controls - desktop only */}
        <ul className="hidden items-center gap-2.5 md:flex ml-auto">
          <li>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
                )
              ) : (
                <span className="h-4 w-4" />
              )}
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="View Cart"
              onClick={handleCartClick}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-background">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </li>
          <li>
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                  className="flex h-10 items-center gap-2.5 rounded-xl border border-foreground/15 bg-foreground/5 pl-1.5 pr-3 text-foreground transition-all active:scale-[0.98] inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-[11px] font-bold text-white">
                      {(session.user.name?.[0] || session.user.email?.[0] || "U").toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[110px] truncate text-xs font-semibold">
                    {session.user.name?.split(" ")[0] || session.user.email?.split("@")[0]}
                  </span>
                  <ChevronDown className={`h-3 w-3 text-foreground/50 transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-2xl border border-foreground/10 bg-background/95 p-1.5 shadow-2xl backdrop-blur-md z-50">
                    <div className="px-3 py-2 border-b border-foreground/10 mb-1">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {session.user.name || "User"}
                      </p>
                      <p className="text-[10px] text-foreground/50 truncate">
                        {session.user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-primary" />
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/cart"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                        Cart Items
                      </div>
                      {cartCount > 0 && (
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold text-primary">
                          {cartCount}
                        </span>
                      )}
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        toast.info({
                          title: "Signed Out",
                        });
                        setUserDropdownOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={() => setAuthOpen(true)}>Login</Button>
            )}
          </li>
        </ul>

        {/* Mobile Action Controls: Theme Toggle, Cart & Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            aria-label="View Cart"
            onClick={handleCartClick}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-bold text-white ring-2 ring-background">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/15 bg-foreground/3 text-foreground transition-all hover:bg-foreground/8 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
          >
            <Menu className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-y-0 right-0 z-50 w-72 border-l border-foreground/10 bg-background shadow-2xl transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className={`${sansation.className} flex h-full flex-col justify-between p-4`}>
          {/* Top section: Logo & Nav */}
          <div className="flex flex-col gap-6">
            {/* Brand */}
            <div className="flex items-center justify-between px-2 pt-1">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 overflow-hidden"
              >
                <span className={`${trunkey.className} text-4xl font-bold tracking-wide text-primary`}>
                  elevex
                </span>
              </Link>
            </div>

            {/* Navigation list */}
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                      active
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-foreground/65 hover:bg-foreground/6 hover:text-foreground"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        active ? "text-white" : "text-foreground/60 group-hover:text-foreground"
                      }`}
                    />
                    <span className="flex-1 truncate tracking-wide">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom section: User Pill, Side-by-Side Links & Sign Out */}
          <div className="flex flex-col gap-3 pt-4 border-t border-foreground/10">
            {session?.user ? (
              <>
                {/* User Pill */}
                <div className="flex items-center gap-2.5 rounded-xl border border-foreground/10 bg-foreground/3 p-2 inset-shadow-foreground/30 inset-shadow-sm">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white shrink-0">
                      {(session.user.name?.[0] || session.user.email?.[0] || "U").toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="truncate text-xs font-semibold text-foreground">
                        {session.user.name || "User"}
                      </span>
                      <span className={`rounded-md px-1.5 py-0.2 text-[9px] font-bold ${
                        isAdmin ? "bg-primary/20 text-primary" : "bg-foreground/10 text-foreground/70"
                      }`}>
                        {userRole}
                      </span>
                    </div>
                    <span className="truncate text-[10px] text-foreground/50">
                      {session.user.email}
                    </span>
                  </div>
                </div>

                {/* Dashboard & Cart */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/3 px-2.5 py-2 text-xs font-semibold text-foreground/80 hover:bg-foreground/6 hover:text-foreground transition-all"
                  >
                    <LayoutDashboard className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate">Dashboard</span>
                  </Link>

                  <Link
                    href="/dashboard/cart"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-foreground/10 bg-foreground/3 px-2.5 py-2 text-xs font-semibold text-foreground/80 hover:bg-foreground/6 hover:text-foreground transition-all"
                  >
                    <ShoppingCart className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate">Cart</span>
                    {cartCount > 0 && (
                      <span className="rounded-full bg-primary/20 px-1.5 py-0.2 text-[9px] font-bold text-primary">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={() => {
                    toast.info({
                      title: "Signed Out",
                    });
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2.5 rounded-xl bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/15 cursor-pointer"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  setAuthOpen(true);
                }}
                className="w-full text-xs font-semibold py-2.5"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </aside>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
