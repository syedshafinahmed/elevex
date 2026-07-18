"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Home, Briefcase, Mail, Package } from "lucide-react";
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
        <Link href="/" className="flex items-center gap-2">
          <p className={`${trunkey.className} text-7xl font-extrabold text-primary`}>elevex</p>
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
              className="h-10 w-10 border border-foreground/15 hover:text-foreground hover:translate-y-0 active:scale-100 text-inherit"
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
            <Button onClick={() => setAuthOpen(true)}>Login</Button>
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
          <li className="pt-2">
            <Button
              onClick={() => setAuthOpen(true)}
              className="w-full rounded-2xl bg-primary px-6 py-3 text-center text-base font-semibold text-foreground transition-all hover:-translate-y-0.5"
            >
              Login
            </Button>
          </li>
        </ul>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
