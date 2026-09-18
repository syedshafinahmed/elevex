"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  CreditCard,
  Building,
  Smartphone,
  Plus,
} from "lucide-react";
import { toast } from "gooey-toast";
import { sansation } from "@/lib/fonts";
import Dropdown from "@/app/components/dashboard/Dropdown";
import Button from "@/app/components/ui/Button";

export interface PaymentMethodItem {
  id: string;
  type: "mfs" | "card" | "bank";
  brand: "bkash" | "nagad" | "rocket" | "visa" | "mastercard" | "amex" | "bank";
  name: string;
  last4: string;
  accountNumber?: string;
  providerName?: string;
  accountType?: "Merchant" | "Personal";
  expDate?: string;
  isDefault: boolean;
  bankName?: string;
  swiftCode?: string;
}

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newMethod: PaymentMethodItem) => void;
}

export default function AddPaymentMethodModal({
  isOpen,
  onClose,
  onAdd,
}: AddPaymentMethodModalProps) {
  const [mounted, setMounted] = useState(false);
  const [methodType, setMethodType] = useState<"mfs" | "card" | "bank">("mfs");

  // MFS Fields
  const [mfsProvider, setMfsProvider] = useState<"bkash" | "nagad" | "rocket">("bkash");
  const [mfsNumber, setMfsNumber] = useState("");
  const [mfsAccountName, setMfsAccountName] = useState("");
  const [mfsAccountType, setMfsAccountType] = useState<"Merchant" | "Personal">("Merchant");

  // Card Fields
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Bank Fields
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");

  const [setAsDefault, setSetAsDefault] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !mounted) return null;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  const handleExpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setExpDate(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (methodType === "mfs") {
      const cleanNum = mfsNumber.replace(/\D/g, "");
      if (cleanNum.length < 11 || !mfsAccountName.trim()) {
        toast.error({ title: "Please enter a valid 11-digit mobile number and account name" });
        return;
      }
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/payment-methods", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "mfs",
            brand: mfsProvider,
            name: mfsAccountName,
            last4: cleanNum.slice(-4),
            accountNumber: cleanNum,
            providerName: mfsProvider.toUpperCase(),
            accountType: mfsAccountType,
            isDefault: setAsDefault,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          toast.error({ title: err.error || "Failed to add payment method" });
          return;
        }
        const newMethod: PaymentMethodItem = await res.json();
        onAdd(newMethod);
        toast.success({ title: `${mfsProvider.toUpperCase()} Account Added Successfully` });
        onClose();
      } catch {
        toast.error({ title: "Failed to add payment method" });
      } finally {
        setIsSubmitting(false);
      }
    } else if (methodType === "card") {
      const rawNum = cardNumber.replace(/\s/g, "");
      if (!cardHolder.trim() || rawNum.length < 16 || expDate.length < 5 || cvv.length < 3) {
        toast.error({ title: "Please fill in all valid card details" });
        return;
      }
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/payment-methods", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "card",
            brand: rawNum.startsWith("4") ? "visa" : rawNum.startsWith("5") ? "mastercard" : "visa",
            name: cardHolder,
            last4: rawNum.slice(-4),
            expDate,
            isDefault: setAsDefault,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          toast.error({ title: err.error || "Failed to add payment method" });
          return;
        }
        const newMethod: PaymentMethodItem = await res.json();
        onAdd(newMethod);
        toast.success({ title: "Card Added Successfully" });
        onClose();
      } catch {
        toast.error({ title: "Failed to add payment method" });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (!bankName.trim() || !accountNumber.trim() || !swiftCode.trim() || !beneficiaryName.trim()) {
        toast.error({ title: "Please fill in all bank wire fields" });
        return;
      }
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/payment-methods", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "bank",
            brand: "bank",
            name: beneficiaryName,
            last4: accountNumber.slice(-4),
            bankName,
            swiftCode,
            isDefault: setAsDefault,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          toast.error({ title: err.error || "Failed to add payment method" });
          return;
        }
        const newMethod: PaymentMethodItem = await res.json();
        onAdd(newMethod);
        toast.success({ title: "Bank Account Added Successfully" });
        onClose();
      } catch {
        toast.error({ title: "Failed to add payment method" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return createPortal(
    <div
      className={`${sansation.className} fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in-0 duration-200`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border border-foreground/15 bg-background p-6 shadow-2xl inset-shadow-foreground/30 inset-shadow-sm text-foreground transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Add Payment Method</h3>
              <p className="text-[11px] text-foreground/50">Link a wallet, card, or bank account</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-xl text-foreground/40 hover:bg-foreground/10 hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 3 Method Type Selector: MFS, Card, Bank */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 my-4 rounded-2xl bg-foreground/5 border border-foreground/10 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMethodType("mfs")}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer ${
              methodType === "mfs"
                ? "bg-primary text-white shadow-sm"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            MFS
          </button>
          <button
            type="button"
            onClick={() => setMethodType("card")}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer ${
              methodType === "card"
                ? "bg-primary text-white shadow-sm"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            Card
          </button>
          <button
            type="button"
            onClick={() => setMethodType("bank")}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer ${
              methodType === "bank"
                ? "bg-primary text-white shadow-sm"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <Building className="h-3.5 w-3.5" />
            Bank
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
          {/* 1. MFS Form */}
          {methodType === "mfs" && (
            <>
              {/* Provider Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                  Select MFS Provider
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: "bkash", label: "bKash" },
                      { id: "nagad", label: "Nagad" },
                      { id: "rocket", label: "Rocket" },
                    ] as const
                  ).map((prov) => (
                    <button
                      key={prov.id}
                      type="button"
                      onClick={() => setMfsProvider(prov.id)}
                      className={`h-9 rounded-xl border font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                        mfsProvider === prov.id
                          ? "border-primary bg-primary/10 text-primary shadow-xs"
                          : "border-foreground/15 bg-foreground/2 text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {prov.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Registered Mobile Account Number
                </label>
                <input
                  type="text"
                  value={mfsNumber}
                  onChange={(e) => setMfsNumber(e.target.value)}
                  placeholder="017XXXXXXXX"
                  maxLength={11}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 font-mono text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={mfsAccountName}
                    onChange={(e) => setMfsAccountName(e.target.value)}
                    placeholder="e.g. Syed S. Ahmed"
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Account Type
                  </label>
                  <Dropdown<"Merchant" | "Personal">
                    value={mfsAccountType}
                    options={[
                      { value: "Merchant", label: "Merchant Account", description: "For business and trade settlement" },
                      { value: "Personal", label: "Personal Account", description: "For personal mobile wallet" },
                    ]}
                    onChange={(val) => setMfsAccountType(val)}
                  />
                </div>
              </div>
            </>
          )}

          {/* 2. Card Form */}
          {methodType === "card" && (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="e.g. Syed S. Ahmed"
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4532 •••• •••• 8912"
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 font-mono text-foreground focus:border-primary focus:outline-none"
                  />
                  <div className="absolute right-3 top-2.5 flex items-center gap-1.5 opacity-60">
                    <span className="text-[10px] font-bold uppercase tracking-wider">VISA / MC</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Expiration (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={expDate}
                    onChange={handleExpDateChange}
                    placeholder="08/28"
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 font-mono text-foreground focus:border-primary focus:outline-none text-center"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Security Code (CVV)
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    placeholder="•••"
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 font-mono text-foreground focus:border-primary focus:outline-none text-center"
                  />
                </div>
              </div>
            </>
          )}

          {/* 3. Bank Form */}
          {methodType === "bank" && (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Beneficiary / Company Account Name
                </label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  placeholder="e.g. Bengal Prime Commodities Ltd."
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. Eastern Bank PLC / Standard Chartered"
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    Account / IBAN Number
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="104928109283"
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 font-mono text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">
                    SWIFT / BIC Code
                  </label>
                  <input
                    type="text"
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value)}
                    placeholder="EBLDBDDAXXX"
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-foreground/2 px-3 font-mono text-foreground focus:border-primary focus:outline-none uppercase"
                  />
                </div>
              </div>
            </>
          )}

          {/* Default Switch */}
          <label className="flex items-center gap-2.5 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={setAsDefault}
              onChange={(e) => setSetAsDefault(e.target.checked)}
              className="h-4 w-4 rounded accent-primary text-primary cursor-pointer"
            />
            <span className="text-xs text-foreground/75 font-medium">
              Set as primary payment / settlement method
            </span>
          </label>

          {/* Footer CTAs */}
          <div className="flex items-center justify-end gap-3 border-t border-foreground/10 pt-4 mt-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="border border-foreground/15 inset-shadow-foreground/30 inset-shadow-sm hover:border-foreground/30"
            >
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>{isSubmitting ? "Adding..." : "Add Payment Method"}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
