"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Sun, Moon, Home, Briefcase, Mail, Package, LogOut } from "lucide-react";
import { sansation, trunkey } from "@/lib/fonts";
import Button from "../ui/Button";
import AuthModal from "../auth/AuthModal";

const navLinks = [
  { label: "Home",     href: "/",        icon: Home },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Contact",  href: "/contact",  icon: Mail },
] as const;

const navDropdowns = [
  { label: "Products", href: "/products", icon: Package },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { data: session } = useSession();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={`${sansation.className} relative w-full bg-background`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Left links */}
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

        {/* Logo */}
        {/* <Link href="/" className="flex items-center gap-2">
          <p className={`${trunkey.className} text-7xl font-extrabold text-primary`}>elevex</p>
        </Link> */}
        <Link href="/" className="flex items-center gap-2">
          {/* <p className={`${trunkey.className} text-7xl font-extrabold text-primary`}>elevex</p> */}
          <Image src="/logo.png" alt="Elevex Logo" width={100} height={100} />
        </Link>

        {/* Right links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navDropdowns.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "text-base font-semibold text-primary transition-colors"
                      : "text-base font-medium text-foreground/60 transition-colors hover:text-foreground"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Button
              type="button"
              variant="ghost"
              ariaLabel="Toggle theme"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="h-10 w-10 border border-foreground/15 inset-shadow-foreground/15 inset-shadow-sm hover:text-foreground hover:translate-y-0 active:scale-100 text-inherit"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="h-4 w-4 stroke-[1.75] z-50" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4 stroke-[1.75] z-50" aria-hidden="true" />
                )
              ) : (
                <span className="h-4 w-4" />
              )}
            </Button>
          </li>
          <li>
            {session?.user ? (
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 py-1 px-3">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                      {(session.user.name?.[0] || session.user.email?.[0] || "U").toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[110px] truncate text-xs font-semibold text-foreground">
                    {session.user.name?.split(" ")[0] || session.user.email?.split("@")[0]}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  ariaLabel="Sign out"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="h-10 px-3 text-xs text-foreground/60 hover:text-red-500 hover:border-red-500/20 border border-foreground/15 inset-shadow-foreground/15 inset-shadow-sm"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => setAuthOpen(true)}>Login</Button>
            )}
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/15 text-foreground md:hidden"
        >
          {menuOpen ? (
            <X className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        />
      )}
      {/* Mobile menu panel */}
      <div
        id="mobile-nav"
        className={
          menuOpen
            ? "absolute right-6 top-20 z-50 mt-2 w-40 origin-top-right rounded-2xl border border-foreground/10 bg-background opacity-100 shadow-lg transition-all duration-200 md:hidden"
            : "absolute right-6 top-20 z-50 mt-2 w-72 origin-top-right scale-95 rounded-2xl border border-foreground/10 bg-background opacity-0 pointer-events-none shadow-lg transition-all duration-200 md:hidden"
        }
      >
        <ul className="flex flex-col p-3">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-primary"
                      : "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                  }
                ><link.icon className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />{link.label}
                </Link>
              </li>
            );
          })}
          {navDropdowns.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-primary"
                      : "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                  }
                ><item.icon className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />{item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
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
              {mounted ? (resolvedTheme === "dark" ? "Light mode" : "Dark mode") : "Theme"}
            </button>
          </li>
          {session?.user ? (
            <li className="pt-2 flex flex-col gap-2">
              <div className="flex items-center gap-2.5 rounded-xl border border-foreground/10 bg-foreground/5 p-2.5">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shrink-0">
                    {(session.user.name?.[0] || session.user.email?.[0] || "U").toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="truncate text-xs font-semibold text-foreground">
                    {session.user.name || "User"}
                  </span>
                  <span className="truncate text-[10px] text-foreground/50">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 py-2.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-500/20"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </li>
          ) : (
            <li className="pt-2">
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  setAuthOpen(true);
                }}
                className="w-full rounded-2xl bg-primary px-6 py-3 text-center text-base font-semibold text-foreground transition-all hover:-translate-y-0.5"
              >
                Login
              </Button>
            </li>
          )}
        </ul>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
