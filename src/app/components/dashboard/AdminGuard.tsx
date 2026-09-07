"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUserRole } from "@/context/UserRoleContext";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { pinkAverage, sansation } from "@/lib/fonts";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { currentRole, loading: roleLoading, users } = useUserRole();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dbUser = users.find(
    (u) => u.email.toLowerCase() === session?.user?.email?.toLowerCase()
  );
  const userRole =
    dbUser?.role ||
    ((session?.user as { role?: string })?.role === "ADMIN"
      ? "ADMIN"
      : currentRole) ||
    "USER";

  const isAdmin = userRole === "ADMIN";
  const isLoading = status === "loading" || roleLoading;

  useEffect(() => {
    if (mounted && !isLoading && !isAdmin) {
      // Automatically redirect unauthorized users back to /dashboard
      const timer = setTimeout(() => {
        router.replace("/dashboard");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [mounted, isLoading, isAdmin, router]);

  if (!mounted || isLoading) {
    return (
      <div className={`${sansation.className} flex flex-col items-center justify-center py-28 text-center gap-4`}>
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-xs text-foreground/50">Verifying administrative credentials...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={`${sansation.className} flex flex-col items-center justify-center py-24 text-center gap-4`}>
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 text-red-500">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <h2 className={`${pinkAverage.className} text-2xl text-foreground`}>
            Access Restricted
          </h2>
          <p className="text-xs text-foreground/60 leading-relaxed">
            This section requires administrative authorization. Your current account role does not have permission to view or manage this route. Redirecting you to the dashboard...
          </p>
        </div>
        <Link
          href="/dashboard"
          className="mt-2 flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
