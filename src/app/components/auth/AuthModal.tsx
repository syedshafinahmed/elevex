"use client";

import { useState, useEffect, useId, useRef } from "react";
import {
  X,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  Upload,
  ShieldCheck,
  Globe2,
  Package,
  TrendingUp,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { pinkAverage, sansation, trunkey } from "@/lib/fonts";
import Image from "next/image";

type Tab = "login" | "register";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const trustPoints = [
  { icon: Globe2,      text: "62 countries connected" },
  { icon: ShieldCheck, text: "Escrow-protected trades" },
  { icon: TrendingUp,  text: "৳ 4.2lac volume this quarter" },
  { icon: Package,     text: "Real goods, real traders only" },
];

const avatarAvatars = [
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=1",
  "https://i.pravatar.cc/64?img=18",
  "https://i.pravatar.cc/64?img=33",
  "https://i.pravatar.cc/64?img=14",
  "https://i.pravatar.cc/64?img=52",
];

function passwordChecks(pw: string) {
  return {
    length: pw.length >= 6,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
  };
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const uid = useId();
  const fileRef = useRef<HTMLInputElement>(null);

  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const checks = passwordChecks(password);
  const pwValid = checks.length && checks.upper && checks.lower;
  const canSubmit =
    tab === "login"
      ? !!email && !!password
      : !!name && !!email && pwValid && confirm === password;

  function switchTab(t: Tab) {
    setTab(t);
    setPassword("");
    setConfirm("");
    setShowPw(false);
    setShowCf(false);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setEmail("");
      setPassword("");
      setName("");
      setConfirm("");
      setPreview(null);
      setTab("login");
    }, 250);
  }

  function handleFile(file: File | null | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/65 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative z-10 flex w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl">
        {/* ── LEFT PANEL ── */}
        <div className="relative hidden w-[42%] flex-col justify-between overflow-hidden bg-background p-8 md:flex">
          {/* Ambient glow — unchanged */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at -30% 0%, color-mix(in srgb, var(--color-amethyst) 35%, transparent), transparent 55%), radial-gradient(circle at 120% 90%, color-mix(in srgb, var(--color-amethyst) 22%, transparent), transparent 50%)",
            }}
          />

          {/* Logo */}
          <div className="relative z-10">
            <span className={`${trunkey.className} text-5xl text-primary`}>
              elevex
            </span>
          </div>

          {/* Headline + trust */}
          <div className="relative z-10 flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h2
                className={`${pinkAverage.className} text-3xl leading-[1.1] text-foreground`}
              >
                {tab === "login" ? (
                  <>
                    Trade without
                    <br />
                    <span className="text-primary">borders.</span>
                  </>
                ) : (
                  <>
                    Join the global
                    <br />
                    <span className="text-primary">network.</span>
                  </>
                )}
              </h2>
              <p
                className={`${sansation.className} text-xs leading-relaxed text-foreground/55`}
              >
                {tab === "login"
                  ? "Sign in to manage your exports, track imports, and settle deals across different countries."
                  : "Create your account and start moving goods globally with one click."}
              </p>
            </div>

            {/* Rotating Stats */}
            {/* <div className="relative z-10 flex flex-col gap-2">
              <div
                className="flex flex-col gap-0.5 transition-opacity duration-300"
                style={{ opacity: visible ? 1 : 0 }}
              >
                <span className={`${pinkAverage.className} text-4xl text-primary`}>
                  {stat.value}
                </span>
                <span className={`${sansation.className} text-xs text-foreground/55`}>
                  {stat.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                {rotatingStats.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === statIndex ? "w-4 bg-primary" : "w-1 bg-foreground/20"
                    }`}
                  />
                ))}
              </div>
            </div> */}
            {/* Trust points */}
            <div className="flex flex-col gap-2.5">
              {trustPoints.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-primary stroke-[1.75]" aria-hidden="true" />
                  <span className={`${sansation.className} text-[11px] text-foreground/55`}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: trust avatars */}
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-1">
              {avatarAvatars.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="" width={0} height={0}
                  className="h-5 w-5 rounded-full border-2 border-background object-cover"
                  style={{
                    zIndex: avatarAvatars.length - i,
                    marginLeft: i > 0 ? "-11px" : "0",
                  }}
                />
              ))}
              <span
                className={`${sansation.className} ml-1 text-[10px] text-foreground/45`}
              >
                3,140+ exporters onboard
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="relative flex flex-1 flex-col bg-background">
          {/* Close */}
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="absolute right-0 top-0 md:right-2 md:top-2 z-20 flex h-8 w-8 items-center justify-center rounded-xl text-foreground/40 transition-colors hover:text-foreground"
          >
            <X className="h-3.5 w-3.5 stroke-[1.75]" />
          </button>

          {/* Segmented tab */}
          <div className="px-6 pt-6 sm:px-8 sm:pt-8">
            <div className="relative flex rounded-xl border border-foreground/15 bg-foreground/2 p-1">
              <div
                className="absolute inset-y-1 left-1 rounded-lg bg-primary transition-transform duration-300 ease-out"
                style={{
                  width: "calc(50% - 4px)",
                  transform:
                    tab === "register" ? "translateX(100%)" : "translateX(0)",
                }}
              />
              {(["login", "register"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => switchTab(t)}
                  className={`${sansation.className} relative z-10 flex-1 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                    tab === t
                      ? "text-white"
                      : "text-foreground/40 hover:text-foreground/70"
                  }`}
                >
                  {t === "login" ? "Login" : "Register"}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4 overflow-y-auto p-6 pt-5 sm:p-8 sm:pt-5">
            <div className="flex flex-col gap-0.5">
              <h3
                className={`${pinkAverage.className} text-2xl text-foreground`}
              >
                {tab === "login" ? "Welcome back." : "Create account."}
              </h3>
              <p
                className={`${sansation.className} text-xs text-foreground/50`}
              >
                {tab === "login"
                  ? "Sign in to your elevex account."
                  : "Fill in your details to get started."}
              </p>
            </div>

            {/* Google */}
            <button
              type="button"
              className={`${sansation.className} flex w-full items-center justify-center gap-2.5 rounded-xl border border-foreground/15 bg-foreground/3 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/30 active:scale-[0.98]`}
            >
              <FcGoogle className="h-3.5 w-3.5" aria-hidden="true" />
              Continue with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-foreground/10" />
              <span
                className={`${sansation.className} text-[10px] uppercase tracking-[0.15em] text-foreground/35`}
              >
                or with email
              </span>
              <div className="h-px flex-1 bg-foreground/10" />
            </div>

            <form className="flex flex-col gap-3">
              {tab === "register" ? (
                <>
                  {/* Avatar upload + Name row */}
                  <div className="flex items-end gap-3">
                    {/* Avatar uploader */}
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className={`${sansation.className} text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/45`}
                      >
                        Photo
                      </span>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                      />
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOver(false);
                          handleFile(e.dataTransfer.files?.[0]);
                        }}
                        aria-label="Upload profile photo"
                        className={`relative flex h-11.5 w-11.5 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-colors ${
                          dragOver
                            ? "border-primary bg-primary/10"
                            : "border-foreground/20 bg-foreground/3 hover:border-primary/60 hover:bg-foreground/5"
                        }`}
                      >
                        {preview ? (
                          <>
                            <Image width={0} height={0} src={preview} alt="Preview" className="h-full w-full object-cover" />
                            {/* Red cross overlay */}
                            <span
                              role="button"
                              aria-label="Remove photo"
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreview(null);
                                if (fileRef.current) fileRef.current.value = "";
                              }}
                              className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition-opacity hover:bg-red-600"
                            >
                              <X className="h-2.5 w-2.5 stroke-[2.5]" aria-hidden="true" />
                            </span>
                          </>
                        ) : (
                          <Upload className="h-3 w-3 text-foreground/25 stroke-[1.75]" aria-hidden="true" />
                        )}
                      </button>
                    </div>

                    {/* Name field */}
                    <div className="flex-1">
                      <Field
                        id={`${uid}-name`}
                        label="Full name"
                        type="text"
                        value={name}
                        onChange={setName}
                        placeholder="Shafin Ahmed"
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  <Field
                    id={`${uid}-email`}
                    label="Work email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      id={`${uid}-pw`}
                      label="Password"
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={setPassword}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      suffix={
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          aria-label={showPw ? "Hide" : "Show"}
                          className="text-foreground/35 hover:text-foreground transition-colors"
                        >
                          {showPw ? (
                            <EyeOff className="h-3.5 w-3.5 stroke-[1.75]" />
                          ) : (
                            <Eye className="h-3.5 w-3.5 stroke-[1.75]" />
                          )}
                        </button>
                      }
                    />
                    <Field
                      id={`${uid}-confirm`}
                      label="Confirm password"
                      type={showCf ? "text" : "password"}
                      value={confirm}
                      onChange={setConfirm}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      error={
                        confirm && confirm !== password ? "Doesn't match" : ""
                      }
                      suffix={
                        <button
                          type="button"
                          onClick={() => setShowCf((v) => !v)}
                          aria-label={showCf ? "Hide" : "Show"}
                          className="text-foreground/35 hover:text-foreground transition-colors"
                        >
                          {showCf ? (
                            <EyeOff className="h-3.5 w-3.5 stroke-[1.75]" />
                          ) : (
                            <Eye className="h-3.5 w-3.5 stroke-[1.75]" />
                          )}
                        </button>
                      }
                    />
                  </div>

                  {password && (
                    <div className="flex items-center gap-4 rounded-xl border border-foreground/10 bg-foreground/2 px-3.5 py-2.5">
                      {[
                        { key: "length", label: "6+ chars" },
                        { key: "upper", label: "Uppercase" },
                        { key: "lower", label: "Lowercase" },
                      ].map(({ key, label }) => {
                        const ok = checks[key as keyof typeof checks];
                        return (
                          <div key={key} className="flex items-center gap-1.5">
                            {ok ? (
                              <CheckCircle2 className="h-3 w-3 shrink-0 text-primary" />
                            ) : (
                              <Circle className="h-3 w-3 shrink-0 text-foreground/20" />
                            )}
                            <span
                              className={`${sansation.className} text-[10px] ${ok ? "text-foreground/60" : "text-foreground/25"}`}
                            >
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Field
                    id={`${uid}-email`}
                    label="Work email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                  <Field
                    id={`${uid}-pw`}
                    label="Password"
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={setPassword}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? "Hide" : "Show"}
                        className="text-foreground/35 hover:text-foreground transition-colors"
                      >
                        {showPw ? (
                          <EyeOff className="h-3.5 w-3.5 stroke-[1.75]" />
                        ) : (
                          <Eye className="h-3.5 w-3.5 stroke-[1.75]" />
                        )}
                      </button>
                    }
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className={`${sansation.className} text-[11px] text-foreground/40 hover:text-foreground/70 transition-colors`}
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className={`${sansation.className} mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
              >
                {tab === "login" ? "Sign in to elevex" : "Create account"}
              </button>
            </form>

            <p
              className={`${sansation.className} text-center text-[11px] text-foreground/40`}
            >
              {tab === "login" ? (
                <>
                  No account yet?{" "}
                  <button
                    type="button"
                    onClick={() => switchTab("register")}
                    className="text-primary underline underline-offset-2 hover:text-primary/70"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>
                  Already on elevex?{" "}
                  <button
                    type="button"
                    onClick={() => switchTab("login")}
                    className="text-primary underline underline-offset-2 hover:text-primary/70"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  suffix,
  error,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  suffix?: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={`${sansation.className} text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/45`}
      >
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-foreground/3 px-3.5 py-3 transition-colors focus-within:border-primary ${
          error ? "border-red-400/60" : "border-foreground/15"
        }`}
      >
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${sansation.className} w-full bg-transparent text-sm text-foreground placeholder:text-foreground/30 focus:outline-none`}
        />
        {suffix}
      </div>
      {error && (
        <p className={`${sansation.className} text-[10px] text-red-400`}>
          {error}
        </p>
      )}
    </div>
  );
}
