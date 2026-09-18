"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  CreditCard,
  Plus,
  CheckCircle2,
  Building,
  Smartphone,
  Wifi,
  Receipt,
} from "lucide-react";
import { toast } from "gooey-toast";
import Button from "@/app/components/ui/Button";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";
import Dropdown, { DropdownOption } from "@/app/components/dashboard/Dropdown";
import AddPaymentMethodModal, {
  PaymentMethodItem,
} from "./AddPaymentMethodModal";
import PaymentMethodDetailModal from "./PaymentMethodDetailModal";

interface TransactionItem {
  id: string;
  type: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  referenceId: string | null;
  createdAt: string;
}

const typeFilterOptions: DropdownOption<"ALL" | "CREDIT" | "DEBIT">[] = [
  { value: "ALL", label: "All Types", description: "Show all transactions" },
  { value: "CREDIT", label: "Credit", description: "Money received" },
  { value: "DEBIT", label: "Debit", description: "Money spent" },
];

export default function BillingTab() {
  const [methods, setMethods] = useState<PaymentMethodItem[]>([]);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<"ALL" | "CREDIT" | "DEBIT">("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodItem | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [methodToDelete, setMethodToDelete] = useState<PaymentMethodItem | null>(null);

  useEffect(() => {
    fetch("/api/payment-methods")
      .then((r) => r.json())
      .then((data) => setMethods(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch("/api/transactions")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setTransactions(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setTransactionsLoading(false));
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    if (typeFilter === "ALL") return true;
    return tx.type === typeFilter;
  });

  const handleSetDefault = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/payment-methods/${id}`, { method: "PATCH" });
      if (!res.ok) {
        const err = await res.json();
        toast.error({ title: err.error || "Failed to update default" });
        return;
      }
      setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
      setSelectedMethod((prev) => (prev?.id === id ? { ...prev, isDefault: true } : prev ? { ...prev, isDefault: false } : null));
      toast.success({ title: "Primary settlement method updated" });
    } catch {
      toast.error({ title: "Failed to update default" });
    } finally {
      setLoadingId(null);
    }
  };

  const handleRemove = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/payment-methods/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        toast.error({ title: err.error || "Failed to remove" });
        return;
      }
      setMethods((prev) => prev.filter((m) => m.id !== id));
      if (selectedMethod?.id === id) {
        setSelectedMethod(null);
      }
      toast.success({ title: "Payment method removed" });
    } catch {
      toast.error({ title: "Failed to remove payment method" });
    } finally {
      setLoadingId(null);
      setMethodToDelete(null);
    }
  };

  const handleAddMethod = (newMethod: PaymentMethodItem) => {
    setMethods((prev) => {
      if (newMethod.isDefault) {
        return [newMethod, ...prev.map((m) => ({ ...m, isDefault: false }))];
      }
      return [...prev, newMethod];
    });
  };

  const handleDeleteFromDetail = (method: PaymentMethodItem) => {
    setSelectedMethod(null);
    setMethodToDelete(method);
  };

  const getMethodLabel = (m: PaymentMethodItem) =>
    m.type === "mfs" ? (m.providerName || m.brand.toUpperCase()) : m.type === "card" ? "card" : (m.bankName || "bank account");

  return (
    <div className="flex flex-col gap-6">
      <DeleteConfirmModal
        isOpen={methodToDelete !== null}
        title="Remove Payment Method"
        description={`Are you sure you want to remove this ${methodToDelete ? getMethodLabel(methodToDelete) : ""}?`}
        onConfirm={() => methodToDelete && handleRemove(methodToDelete.id)}
        onClose={() => setMethodToDelete(null)}
      />

      <PaymentMethodDetailModal
        method={selectedMethod}
        isOpen={selectedMethod !== null}
        onClose={() => setSelectedMethod(null)}
        onSetDefault={handleSetDefault}
        onDelete={handleDeleteFromDetail}
        isSettingDefault={loadingId === selectedMethod?.id}
      />

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
                Manage your wallets, cards & settlement accounts
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
        {methods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-foreground/40 text-sm gap-2">
            <CreditCard className="h-8 w-8 opacity-30" />
            <span>No payment methods added yet</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {methods.map((method) => {
              if (method.type === "mfs") {
                const isBkash = method.brand === "bkash";
                const isNagad = method.brand === "nagad";
                const isRocket = method.brand === "rocket";

                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c0c0e] via-[#1a1b22] to-[#060608] p-5 text-white transition-all duration-300 cursor-pointer overflow-hidden group shadow-lg shadow-black/25 hover:-translate-y-1.5 hover:shadow-2xl active:scale-[0.99] min-h-[185px]"
                  >
                    {/* Corner Ambient Sheen */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.04] blur-xl" />

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center p-1">
                            {isBkash ? (
                              <div className="relative h-7 w-7">
                                <Image
                                  src="https://res.cloudinary.com/dxipjzeda/image/upload/v1789217863/bkash_lystph.png"
                                  alt="bKash"
                                  fill
                                  sizes="28px"
                                  className="object-contain"
                                />
                              </div>
                            ) : isNagad ? (
                              <div className="relative h-7 w-7">
                                <Image
                                  src="https://res.cloudinary.com/dxipjzeda/image/upload/v1789217862/nagad_lj2vrk.png"
                                  alt="Nagad"
                                  fill
                                  sizes="28px"
                                  className="object-contain"
                                />
                              </div>
                            ) : isRocket ? (
                              <div className="relative h-7 w-7">
                                <Image
                                  src="https://res.cloudinary.com/dxipjzeda/image/upload/v1789217862/rocket_hemdcq.png"
                                  alt="Rocket"
                                  fill
                                  sizes="28px"
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <Smartphone className="h-4 w-4 text-white/70" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold uppercase tracking-wider text-white truncate">
                              {method.providerName || method.brand.toUpperCase()}
                            </span>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 truncate">
                              {method.accountType ? `${method.accountType} Wallet` : "Personal Wallet"}
                            </span>
                          </div>
                        </div>

                        {method.isDefault && (
                          <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-400/30 backdrop-blur-md shrink-0 shadow-sm">
                            Primary
                          </span>
                        )}
                      </div>

                      <div className="font-mono text-[15px] font-medium tracking-[0.14em] text-white/95 my-3.5 truncate">
                        {method.accountNumber?.slice(0, 4) || "0171"} •••• {method.last4}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-white/40 block font-mono">Account Holder</span>
                        <span className="text-xs font-medium text-white truncate max-w-[120px] block">
                          {method.name}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[9px] uppercase tracking-wider text-white/40 block font-mono">Status</span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                          Active MFS
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              if (method.type === "card") {
                return (
                  <div
                    key={method.id}
                    onClick={() => setSelectedMethod(method)}
                    className="relative flex flex-col justify-between rounded-2xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-5 text-white transition-all duration-300 cursor-pointer overflow-hidden group shadow-lg shadow-black/25 hover:-translate-y-1.5 hover:shadow-2xl active:scale-[0.99] min-h-[185px]"
                  >
                    {/* Corner Ambient Sheen */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.05] blur-xl" />

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className="flex items-center gap-2">
                          <div className="relative h-6 w-8 rounded bg-gradient-to-tr from-amber-400/90 via-amber-200 to-amber-500/90 border border-amber-600/40 overflow-hidden shadow-inner flex items-center justify-center shrink-0">
                            <div className="absolute inset-x-0 h-[1px] bg-amber-800/40" />
                            <div className="absolute inset-y-0 w-[1px] bg-amber-800/40" />
                            <div className="h-3 w-4 rounded-sm border border-amber-800/30 bg-transparent" />
                          </div>
                          <Wifi className="h-4 w-4 rotate-90 text-white/50 shrink-0" />
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {method.isDefault && (
                            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-400/30 backdrop-blur-md shrink-0 shadow-sm">
                              Primary
                            </span>
                          )}
                          <span className="font-mono text-xs font-bold italic tracking-wider text-white/90">
                            {method.brand === "visa" ? "VISA" : method.brand === "mastercard" ? "MC" : "CARD"}
                          </span>
                        </div>
                      </div>

                      <div className="font-mono text-[15px] font-medium tracking-[0.14em] text-white/95 my-3.5 truncate">
                        •••• •••• •••• {method.last4}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-white/40 block font-mono">Cardholder</span>
                        <span className="text-xs font-medium uppercase text-white truncate max-w-[120px] block">
                          {method.name}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[9px] uppercase tracking-wider text-white/40 block font-mono">Expires</span>
                        <span className="text-xs font-mono font-medium text-white/90 block">
                          {method.expDate || "••/••"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              // Bank settlement card
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method)}
                  className="relative flex flex-col justify-between rounded-2xl border border-blue-500/25 bg-gradient-to-br from-[#0a1e38] via-[#143a66] to-[#040e1c] p-5 text-white transition-all duration-300 cursor-pointer overflow-hidden group shadow-lg shadow-black/25 hover:-translate-y-1.5 hover:shadow-2xl active:scale-[0.99] min-h-[185px]"
                >
                  {/* Corner Ambient Sheen */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-400/[0.08] blur-xl" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
                          <Building className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-white truncate max-w-[120px]">
                            {method.bankName || "Commercial Bank"}
                          </span>
                          <span className="text-[10px] text-blue-200/50 uppercase font-mono tracking-wider truncate">
                            Bank Settlement
                          </span>
                        </div>
                      </div>

                      {method.isDefault && (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-400/30 backdrop-blur-md shrink-0 shadow-sm">
                          Primary
                        </span>
                      )}
                    </div>

                    <div className="font-mono text-[15px] font-medium tracking-[0.14em] text-white/95 my-3.5 truncate">
                      AC // •••• •••• {method.last4}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block font-mono">Beneficiary</span>
                      <span className="text-xs font-medium text-white truncate max-w-[120px] block">
                        {method.name}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block font-mono">
                        {method.swiftCode ? "SWIFT" : "Routing"}
                      </span>
                      <span className="text-xs font-mono font-medium text-white/90 block truncate max-w-[90px]">
                        {method.swiftCode || "Wire Transfer"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Transaction History Section */}
      <div className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-foreground/10 pb-4">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Receipt className="h-4 w-4" />
            </div>
            <div>
              <div>Transaction History</div>
              <p className="text-[11px] font-normal text-foreground/50">
                Purchase deductions and export trade settlement credits
              </p>
            </div>
          </div>

          <div className="self-start sm:self-auto">
            <Dropdown<"ALL" | "CREDIT" | "DEBIT">
              value={typeFilter}
              options={typeFilterOptions}
              onChange={(val) => setTypeFilter(val)}
              className="w-36 sm:w-40"
              triggerClassName="h-9 border-foreground/15 bg-background text-foreground/85 hover:border-foreground/30 hover:bg-foreground/5 text-xs"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/3 text-[10px] uppercase tracking-wider text-foreground/50 font-semibold">
                  <th className="py-3.5 pl-6 pr-4">Transaction ID</th>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 pr-6 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/6">
                {transactionsLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-foreground/40">
                      Loading transactions...
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-foreground/40">
                      {transactions.length === 0
                        ? "No transactions recorded yet."
                        : `No ${typeFilter === "ALL" ? "" : typeFilter.toLowerCase() + " "}transactions found.`}
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => {
                    const isCredit = tx.type === "CREDIT";

                    let productName = tx.description;
                    if (tx.description.includes(":")) {
                      productName = tx.description.split(":").slice(1).join(":").trim();
                    }
                    const parenMatch = productName.match(/^(.*?)\s*\((.*?)\)$/);
                    const parsedName = parenMatch ? parenMatch[1].trim() : productName;
                    const parsedQty = parenMatch ? parenMatch[2].trim() : null;

                    return (
                      <tr key={tx.id} className="hover:bg-foreground/3 transition-colors group">
                        <td className="py-3.5 pl-6 pr-4 whitespace-nowrap">
                          <span className="font-mono text-[11px] text-foreground/70" title={tx.referenceId || tx.id}>
                            {tx.referenceId ? (tx.referenceId.length > 18 ? `${tx.referenceId.slice(0, 16)}...` : tx.referenceId) : tx.id.slice(0, 12)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-foreground text-xs truncate max-w-xs">
                              {parsedName}
                            </span>
                            {parsedQty && (
                              <span className="text-[11px] text-foreground/45">
                                {parsedQty}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            isCredit
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}>
                            {isCredit ? "Credit" : "Debit"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[11px] text-foreground/60 whitespace-nowrap">
                          {new Date(tx.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                            <CheckCircle2 className="h-3 w-3" />
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3.5 pr-6 text-right whitespace-nowrap">
                          <span className={`font-bold text-sm ${isCredit ? "text-emerald-500" : "text-foreground"}`}>
                            {isCredit ? "+" : "-"}৳ {tx.amount.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <AddPaymentMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMethod}
      />
    </div>
  );
}
