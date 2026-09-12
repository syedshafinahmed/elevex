"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  X,
  CreditCard,
  Building,
  Smartphone,
  CheckCircle2,
  Trash2,
  Star,
  RefreshCw,
} from "lucide-react";
import { sansation } from "@/lib/fonts";
import { PaymentMethodItem } from "./AddPaymentMethodModal";
import Button from "@/app/components/ui/Button";

interface PaymentMethodDetailModalProps {
  method: PaymentMethodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSetDefault: (id: string) => Promise<void>;
  onDelete: (method: PaymentMethodItem) => void;
  isSettingDefault?: boolean;
}

export default function PaymentMethodDetailModal({
  method,
  isOpen,
  onClose,
  onSetDefault,
  onDelete,
  isSettingDefault = false,
}: PaymentMethodDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !isSettingDefault) {
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
  }, [isOpen, isSettingDefault, onClose]);

  if (!isOpen || !mounted || !method) return null;

  const getMethodTypeLabel = () => {
    switch (method.type) {
      case "mfs":
        return "Mobile Financial Service (MFS)";
      case "card":
        return "Debit / Credit Card";
      case "bank":
        return "Commercial Bank Settlement Account";
    }
  };

  const getBrandTitle = () => {
    if (method.type === "mfs") return method.providerName || method.brand.toUpperCase();
    if (method.type === "card") return method.brand === "visa" ? "Visa" : method.brand === "mastercard" ? "Mastercard" : method.brand.toUpperCase();
    return method.bankName || "Commercial Bank";
  };

  return createPortal(
    <div
      className={`${sansation.className} fixed inset-0 z-[99998] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in-0 duration-200`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-foreground/10 bg-background shadow-2xl inset-shadow-foreground/30 inset-shadow-sm text-foreground transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary p-1">
              {method.type === "mfs" && (
                method.brand === "bkash" ? (
                  <div className="relative h-6 w-6">
                    <Image
                      src="https://res.cloudinary.com/dxipjzeda/image/upload/v1789217863/bkash_lystph.png"
                      alt="bKash"
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                ) : method.brand === "nagad" ? (
                  <div className="relative h-6 w-6">
                    <Image
                      src="https://res.cloudinary.com/dxipjzeda/image/upload/v1789217862/nagad_lj2vrk.png"
                      alt="Nagad"
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                ) : method.brand === "rocket" ? (
                  <div className="relative h-6 w-6">
                    <Image
                      src="https://res.cloudinary.com/dxipjzeda/image/upload/v1789217862/rocket_hemdcq.png"
                      alt="Rocket"
                      fill
                      sizes="24px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <Smartphone className="h-5 w-5" />
                )
              )}
              {method.type === "card" && <CreditCard className="h-5 w-5" />}
              {method.type === "bank" && <Building className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Payment Method Details</h3>
              <p className="text-[11px] text-foreground/50">{getMethodTypeLabel()}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-foreground/10 text-foreground/50 hover:bg-foreground/5 hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-4 p-6">
          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl border border-foreground/10 bg-foreground/2 p-4 text-xs inset-shadow-foreground/30 inset-shadow-sm">
            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-foreground/40">Provider / Network</span>
              <span className="font-semibold text-foreground text-sm">{getBrandTitle()}</span>
            </div>

            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-foreground/40">Account / Card Number</span>
              <span className="font-mono font-semibold text-foreground text-sm">
                {method.type === "mfs"
                  ? `${method.accountNumber?.slice(0, 4) || "0171"} •••• ${method.last4}`
                  : `•••• •••• •••• ${method.last4}`}
              </span>
            </div>

            <div>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-foreground/40">Account Holder</span>
              <span className="font-semibold text-foreground">{method.name}</span>
            </div>

            {method.type === "mfs" && (
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-foreground/40">Wallet Category</span>
                <span className="font-semibold text-foreground">{method.accountType || "Personal"} Account</span>
              </div>
            )}

            {method.type === "card" && method.expDate && (
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-wider text-foreground/40">Expiration Date</span>
                <span className="font-mono font-semibold text-foreground">{method.expDate}</span>
              </div>
            )}

            {method.type === "bank" && (
              <>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-foreground/40">Bank Name</span>
                  <span className="font-semibold text-foreground">{method.bankName || "Commercial Bank"}</span>
                </div>
                {method.swiftCode && (
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-foreground/40">SWIFT / BIC</span>
                    <span className="font-mono font-semibold text-foreground">{method.swiftCode}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-foreground/10 px-6 py-4 bg-foreground/[0.015]">
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => onDelete(method)}
            className="flex items-center gap-1.5"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Method</span>
          </Button>

          {!method.isDefault ? (
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => onSetDefault(method.id)}
              disabled={isSettingDefault}
              className="flex items-center gap-1.5"
            >
              {isSettingDefault ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span>Make Primary</span>
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled
              className="flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Primary Method</span>
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
