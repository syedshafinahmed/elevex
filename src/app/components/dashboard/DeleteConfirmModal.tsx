"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Trash2, X, RefreshCw } from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import Button from "@/app/components/ui/Button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  itemName?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  title = "Confirm Deletion",
  description = "This action cannot be undone. This item will be permanently removed.",
  confirmText = "Delete Permanently",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !isLoading) {
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
  }, [isOpen, isLoading, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className={`${sansation.className} fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in-0 duration-200`}
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-md rounded-3xl border border-red-500/25 bg-background p-6 shadow-2xl ring-1 ring-red-500/10 animate-in zoom-in-95 duration-200 inset-shadow-foreground/30 inset-shadow-sm"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          type="button"
          disabled={isLoading}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-lg text-foreground/45 hover:bg-foreground/5 hover:text-foreground transition-colors cursor-pointer disabled:opacity-50"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col gap-4">
          {/* Danger Icon Header */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 shadow-sm shadow-red-500/10">
              <AlertTriangle className="h-6 w-6 stroke-[2.25]" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className={`${pinkAverage.className} text-xl text-foreground font-bold tracking-tight`}>
                {title}
              </h3>
              <span className="text-[11px] font-semibold text-red-500/90 uppercase tracking-wider">
                Permanent Action
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 rounded-2xl border border-foreground/10 bg-foreground/2 p-3.5 text-xs text-foreground/70">
            <p className="text-xs text-foreground/70 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              disabled={isLoading}
              onClick={onClose}
              className="border border-foreground/15"
            >
              {cancelText}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              disabled={isLoading}
              onClick={onConfirm}
              className="bg-red-600 text-white shadow-xl shadow-red-600/20 hover:bg-red-700 active:scale-[0.98]"
            >
              {isLoading ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              <span>{confirmText}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
