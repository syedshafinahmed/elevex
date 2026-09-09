"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  Building,
  Smartphone,
} from "lucide-react";
import { toast } from "gooey-toast";
import Button from "@/app/components/ui/Button";
import AddPaymentMethodModal, {
  PaymentMethodItem,
} from "./AddPaymentMethodModal";

const initialPaymentMethods: PaymentMethodItem[] = [
  {
    id: "pm-1",
    type: "mfs",
    brand: "bkash",
    name: "Syed Shafin Ahmed",
    last4: "4920",
    accountNumber: "01712344920",
    providerName: "BKASH",
    accountType: "Merchant",
    isDefault: true,
  },
  {
    id: "pm-2",
    type: "card",
    brand: "visa",
    name: "Syed Shafin Ahmed",
    last4: "4242",
    expDate: "09/28",
    isDefault: false,
  },
  {
    id: "pm-3",
    type: "bank",
    brand: "bank",
    name: "Bengal Prime Commodities Ltd.",
    last4: "9042",
    bankName: "Eastern Bank PLC",
    swiftCode: "EBLDBDDAXXX",
    isDefault: false,
  },
];

export default function BillingTab() {
  const [methods, setMethods] = useState<PaymentMethodItem[]>(initialPaymentMethods);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSetDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === id,
      }))
    );
    toast.success({ title: "Primary settlement method updated" });
  };

  const handleRemove = (id: string) => {
    if (methods.length <= 1) {
      toast.error({ title: "You must maintain at least one payment method" });
      return;
    }
    setMethods((prev) => prev.filter((m) => m.id !== id));
    toast.success({ title: "Payment method removed" });
  };

  const handleAddMethod = (newMethod: PaymentMethodItem) => {
    setMethods((prev) => {
      if (newMethod.isDefault) {
        return [newMethod, ...prev.map((m) => ({ ...m, isDefault: false }))];
      }
      return [...prev, newMethod];
    });
  };

  const getMethodIcon = (type: PaymentMethodItem["type"]) => {
    switch (type) {
      case "mfs":
        return <Smartphone className="h-5 w-5 text-primary" />;
      case "card":
        return <CreditCard className="h-5 w-5 text-primary" />;
      case "bank":
        return <Building className="h-5 w-5 text-primary" />;
    }
  };

  const getMethodTitle = (method: PaymentMethodItem) => {
    if (method.type === "mfs") {
      return method.providerName || method.brand.toUpperCase();
    }
    if (method.type === "card") {
      return method.brand === "visa"
        ? "Visa Card"
        : method.brand === "mastercard"
        ? "Mastercard"
        : "Card";
    }
    return method.bankName || "Commercial Bank";
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Saved Payment & Settlement Methods Section */}
      <div className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-foreground/10 pb-4">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <div>Saved Payment & Settlement Methods</div>
              <p className="text-[11px] font-normal text-foreground/50">
                Manage your MFS wallets, debit/credit cards, and bank settlement accounts
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add Payment Method</span>
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 transition-all overflow-hidden ${
                method.isDefault
                  ? "border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-sm ring-1 ring-primary/20"
                  : "border-foreground/10 bg-foreground/2 hover:border-foreground/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/10 text-foreground">
                      {getMethodIcon(method.type)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {getMethodTitle(method)}
                      </span>
                      <span className="text-[10px] text-foreground/45 uppercase font-mono">
                        {method.type === "mfs"
                          ? `${method.accountType || "Mobile"} Wallet`
                          : method.type === "card"
                          ? "Debit/Credit"
                          : "Bank Settlement"}
                      </span>
                    </div>
                  </div>

                  {method.isDefault && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 className="h-3 w-3" />
                      Primary
                    </span>
                  )}
                </div>

                <div className="font-mono text-base font-bold text-foreground tracking-wider mb-2">
                  {method.type === "mfs"
                    ? `${method.accountNumber?.slice(0, 4) || "0171"} •••• ${method.last4}`
                    : `•••• •••• •••• ${method.last4}`}
                </div>

                <div className="flex items-center justify-between text-[11px] text-foreground/60 mb-4">
                  <span className="truncate max-w-[150px]">{method.name}</span>
                  {method.expDate && <span>Expires {method.expDate}</span>}
                  {method.bankName && <span className="truncate max-w-[130px] font-medium">{method.bankName}</span>}
                  {method.type === "mfs" && <span className="text-emerald-500 font-semibold">Active MFS</span>}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-foreground/10 pt-3 text-xs">
                {!method.isDefault ? (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(method.id)}
                    className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Set as Primary
                  </button>
                ) : (
                  <span className="text-[11px] text-foreground/40 font-medium">Default settlement source</span>
                )}

                <button
                  type="button"
                  onClick={() => handleRemove(method.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground/40 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
                  title="Remove Method"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AddPaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMethod}
      />
    </div>
  );
}
