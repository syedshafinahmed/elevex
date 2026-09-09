"use client";

import { useState } from "react";
import { sansation } from "@/lib/fonts";
import ProfileTab from "./components/ProfileTab";
import PrivacyTab from "./components/PrivacyTab";
import BillingTab from "./components/BillingTab";

type SettingsTab = "profile" | "privacy" | "billing";

const tabs: { id: SettingsTab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "privacy", label: "Privacy" },
  { id: "billing", label: "Billing" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 w-full`}>
      {/* Pricing-style Inset Pill Tab Switcher */}
      <div className="flex items-center gap-1 rounded-2xl border border-foreground/10 bg-foreground/3 inset-shadow-foreground/30 inset-shadow-sm p-1 shrink-0 self-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`${sansation.className} flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content Panel */}
      <div>
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "privacy" && <PrivacyTab />}
        {activeTab === "billing" && <BillingTab />}
      </div>
    </div>
  );
}
