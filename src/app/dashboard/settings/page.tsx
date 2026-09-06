"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  User,
  Building,
  Shield,
  CreditCard,
  Bell,
  Key,
  CheckCircle2,
  Upload,
  Save,
  AlertCircle,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { toast } from "gooey-toast";

export default function SettingsPage() {
  const { data: session } = useSession();

  const [name, setName] = useState(session?.user?.name || "Syed Shafin Ahmed");
  const [email, setEmail] = useState(session?.user?.email || "trader@elevex.global");
  const [companyName, setCompanyName] = useState("Bengal Prime Commodities Ltd.");
  const [ercNumber, setErcNumber] = useState("ERC-BD-894012");
  const [binNumber, setBinNumber] = useState("BIN-002941049-0102");
  const [bankName, setBankName] = useState("Eastern Bank PLC");
  const [accountNumber, setAccountNumber] = useState("•••• •••• •••• 9042");
  const [swiftCode, setSwiftCode] = useState("EBLDBDDAXXX");

  const [savedSuccess, setSavedSuccess] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSavedSuccess(true);
    toast.success({
      title: "Settings Saved",
    });
    setTimeout(() => setSavedSuccess(false), 3000);
  }

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12`}>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-green-500/30 bg-green-500/10 p-3 text-xs text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Settings and compliance information updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Profile & Business Identification */}
        <div className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <User className="h-4 w-4 text-primary" />
              Trader Profile
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold text-green-600 dark:text-green-400 border border-green-500/20">
              <Shield className="h-3 w-3" />
              Tier-2 KYC Verified
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-2">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-2xl object-cover border-2 border-primary/40 shadow-md"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-md">
                  {(name?.[0] || "U").toUpperCase()}
                </div>
              )}
              <button
                type="button"
                className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
              >
                Change Photo
              </button>
            </div>

            {/* Inputs */}
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 w-full text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">
                  Registered Export Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Government Export Licensing & Compliance */}
        <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center gap-2 border-b border-foreground/10 pb-4 text-sm font-semibold text-foreground">
            <Building className="h-4 w-4 text-primary" />
            Trade Licenses & Tax Credentials
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">
                Export Registration Certificate (ERC)
              </label>
              <input
                type="text"
                value={ercNumber}
                onChange={(e) => setErcNumber(e.target.value)}
                className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 font-mono text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">
                Business Identification Number (BIN / TIN)
              </label>
              <input
                type="text"
                value={binNumber}
                onChange={(e) => setBinNumber(e.target.value)}
                className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 font-mono text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bank & Escrow Settlement Account */}
        <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center gap-2 border-b border-foreground/10 pb-4 text-sm font-semibold text-foreground">
            <CreditCard className="h-4 w-4 text-primary" />
            Escrow Settlement & Payout Bank
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">
                Commercial Bank
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 font-mono text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-foreground/50 uppercase tracking-wider mb-1">
                SWIFT / BIC Code
              </label>
              <input
                type="text"
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value)}
                className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 font-mono text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            <Save className="h-4 w-4" />
            Save Profile & Credentials
          </button>
        </div>
      </form>
    </div>
  );
}
