"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, RefreshCw } from "lucide-react";
import { sansation } from "@/lib/fonts";

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface CustomDropdownProps<T extends string = string> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
}

export default function CustomDropdown<T extends string = string>({
  value,
  options,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  loading = false,
  className = "w-full",
  triggerClassName = "",
  menuClassName = "",
}: CustomDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateCoords = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const menuHeight = Math.min(options.length * 52 + 16, 260);
      const spaceBelow = window.innerHeight - rect.bottom;
      const showAbove = spaceBelow < menuHeight && rect.top > menuHeight;

      setCoords({
        top: showAbove ? rect.top - menuHeight - 6 : rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      });
    }
  };

  useEffect(() => {
    if (!open) return;

    updateCoords();

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function handleScrollOrResize() {
      updateCoords();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open, options.length]);

  const selectedOption = options.find((opt) => opt.value === value);
  const SelectedIcon = selectedOption?.icon;

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => {
          updateCoords();
          setOpen((prev) => !prev);
        }}
        aria-haspopup="true"
        aria-expanded={open}
        className={`${sansation.className} group flex h-10 w-full items-center justify-between rounded-xl border border-foreground/15 bg-background px-3.5 py-2 text-xs font-semibold text-foreground/85 transition-all hover:border-foreground/30 hover:bg-foreground/5 focus:border-primary focus:outline-none dark:border-foreground/15 dark:bg-foreground/5 dark:hover:bg-foreground/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${triggerClassName}`}
      >
        <span className="flex items-center gap-2 truncate">
          {SelectedIcon && (
            <SelectedIcon className="h-3.5 w-3.5 text-primary shrink-0" />
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        {loading ? (
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary ml-1 shrink-0" />
        ) : (
          <ChevronDown
            className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 shrink-0 ml-1.5 ${
              open ? "rotate-180 text-primary" : ""
            }`}
          />
        )}
      </button>

      {/* Floating Dropdown Menu Panel */}
      {open && mounted && coords && createPortal(
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          style={{
            position: "fixed",
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            width: `${coords.width}px`,
            maxHeight: "260px",
          }}
          className={`${sansation.className} z-[99999] overflow-y-auto origin-top-left rounded-2xl border border-foreground/15 bg-background p-1.5 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all duration-150 animate-in fade-in-0 zoom-in-95 ${menuClassName}`}
        >
          <div className="flex flex-col gap-0.5">
            {options.map((option) => {
              const isSelected = value === option.value;
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    if (option.value !== value) {
                      onChange(option.value);
                    }
                    setOpen(false);
                  }}
                  className={`group/item flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-primary/10 text-primary dark:bg-primary/15 font-semibold"
                      : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {Icon && (
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-primary/20 text-primary"
                            : "bg-foreground/10 text-foreground/70"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold leading-tight truncate">
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="text-[10px] text-foreground/50 leading-tight truncate">
                          {option.description}
                        </span>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="h-4 w-4 text-primary shrink-0 ml-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
