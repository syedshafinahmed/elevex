"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ProductProvider } from "@/context/ProductContext";
import { UserRoleProvider } from "@/context/UserRoleContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserRoleProvider>
          <ProductProvider>
            {children}
          </ProductProvider>
        </UserRoleProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
