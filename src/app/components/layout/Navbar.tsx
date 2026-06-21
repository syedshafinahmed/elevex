"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { sansation, trunkey } from "@/lib/fonts";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

const navDropdowns = [{ label: "Products", href: "/products" }] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`${sansation.className} w-full bg-background`}>
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
            <Link
              href="/login"
              className="rounded-xl bg-primary px-6 py-3 text-base font-semibold text-foreground hover:-translate-y-0.5 transition-all"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground md:hidden"
        >
          {menuOpen ? (
            <X className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-nav"
        className={
          menuOpen
            ? "max-h-96 border-t border-foreground/10 opacity-100 md:hidden"
            : "max-h-0 overflow-hidden opacity-0 md:hidden"
        }
        style={{ transition: "max-height 0.25s ease, opacity 0.2s ease" }}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
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
                      ? "block rounded-lg px-3 py-2.5 text-sm font-semibold text-primary"
                      : "block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                  }
                >
                  {link.label}
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
                      ? "block rounded-lg px-3 py-2.5 text-sm font-semibold text-primary"
                      : "block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-2">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl bg-primary px-6 py-3 text-base font-semibold text-foreground hover:-translate-y-0.5 transition-all"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
