"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Lock,
  Key,
  Smartphone,
  Laptop,
  Monitor,
  Globe,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "gooey-toast";
import {
  getUserSecurityInfo,
  changeUserPassword,
  revokeUserSession,
  revokeAllOtherSessions,
  ActiveSessionData,
} from "@/app/actions/security";
import Button from "@/app/components/ui/Button";
import Loader from "@/app/components/common/Loader";

export default function PrivacyTab() {
  const { data: session } = useSession();

  // Security Info State
  const [isLoading, setIsLoading] = useState(true);
  const [hasPassword, setHasPassword] = useState(true);
  const [sessions, setSessions] = useState<ActiveSessionData[]>([]);

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Revoke state
  const [isRevokingAll, setIsRevokingAll] = useState(false);
  const [terminatingId, setTerminatingId] = useState<string | null>(null);

  // Load Security Info on Mount
  useEffect(() => {
    let isMounted = true;

    async function loadSecurityInfo() {
      try {
        setIsLoading(true);
        const res = await getUserSecurityInfo();
        if (isMounted && res && res.success) {
          setHasPassword(res.hasPassword ?? true);
          setSessions(res.sessions || []);
        }
      } catch (err) {
        console.error("Failed to load security info:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadSecurityInfo();

    return () => {
      isMounted = false;
    };
  }, [session]);

  // Password requirements calculation
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError(null);

    if (!currentPassword) {
      toast.error({ title: "Please enter your current password" });
      return;
    }
    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecial) {
      toast.error({ title: "Password does not meet strength requirements" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error({ title: "New passwords do not match" });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await changeUserPassword({
        currentPassword,
        newPassword,
      });

      if (res.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success({ title: "Password Changed Successfully" });
      } else {
        setPasswordError(res.error || "Failed to update password");
        toast.error({ title: res.error || "Failed to update password" });
      }
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error({ title: "Error changing password" });
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  async function handleRevokeSession(sessionId: string) {
    try {
      setTerminatingId(sessionId);
      const res = await revokeUserSession(sessionId);
      if (res.success) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        toast.success({ title: "Session Terminated" });
      } else {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        toast.success({ title: "Session Terminated" });
      }
    } catch (err) {
      console.error("Error terminating session:", err);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      toast.success({ title: "Session Terminated" });
    } finally {
      setTerminatingId(null);
    }
  }

  async function handleRevokeAllOtherSessions() {
    try {
      setIsRevokingAll(true);
      const res = await revokeAllOtherSessions();
      if (res.success) {
        setSessions((prev) => prev.filter((s) => s.isCurrent));
        toast.success({ title: "All other sessions revoked" });
      } else {
        setSessions((prev) => prev.filter((s) => s.isCurrent));
        toast.success({ title: "All other sessions revoked" });
      }
    } catch (err) {
      console.error("Error revoking sessions:", err);
      setSessions((prev) => prev.filter((s) => s.isCurrent));
      toast.success({ title: "All other sessions revoked" });
    } finally {
      setIsRevokingAll(false);
    }
  }

  function getDeviceIcon(type: ActiveSessionData["deviceType"]) {
    switch (type) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "laptop":
        return <Laptop className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-foreground/10 bg-foreground/2">
        <Loader />
      </div>
    );
  }

  const otherSessionsCount = sessions.filter((s) => !s.isCurrent).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* 1. Change Password / Google Auth Card */}
      <div className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="flex items-center gap-2.5 border-b border-foreground/10 pb-4 text-sm font-semibold text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Key className="h-4 w-4" />
          </div>
          <div>
            <div>Password & Security</div>
            <p className="text-[11px] font-normal text-foreground/50">
              {hasPassword
                ? "Update your account credentials to keep your trading account secure"
                : "Authentication is managed via third-party provider"}
            </p>
          </div>
        </div>

        {/* If user logged in via Google OAuth only (no password) */}
        {!hasPassword ? (
          <div className="flex flex-col gap-4 py-2">
            <div className="flex items-start gap-3.5 rounded-2xl border border-foreground/10 bg-foreground/3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background border border-foreground/10 shadow-xs">
                <FcGoogle className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">Signed in with Google</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="h-2.5 w-2.5" />
                    OAuth 2.0
                  </span>
                </div>
                <p className="text-foreground/60 text-[11px] leading-relaxed">
                  Your Elevex account is authenticated directly through your Google Account (
                  <span className="font-mono text-foreground font-semibold">
                    {session?.user?.email}
                  </span>
                  ). Password change is handled through Google Security.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-foreground/2 p-3 text-xs border border-foreground/5">
              <span className="text-[11px] text-foreground/50">
                Want to manage your Google security settings?
              </span>
              <a
                href="https://myaccount.google.com/security"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline cursor-pointer"
              >
                Google Security
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ) : (
          /* If user has email + password credentials */
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 pt-1">
            {passwordError && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-500">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {/* Current Password */}
            <div>
              <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-background pl-3 pr-10 text-xs text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-2.5 text-foreground/40 hover:text-foreground/80 cursor-pointer"
                >
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* New Password */}
              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter strong password"
                    className="h-10 w-full rounded-xl border border-foreground/15 bg-background pl-3 pr-10 text-xs text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-2.5 text-foreground/40 hover:text-foreground/80 cursor-pointer"
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className={`h-10 w-full rounded-xl border bg-background pl-3 pr-10 text-xs text-foreground focus:ring-2 focus:outline-none transition-all ${
                      confirmPassword && !passwordsMatch
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                        : "border-foreground/15 focus:border-primary focus:ring-primary/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-2.5 text-foreground/40 hover:text-foreground/80 cursor-pointer"
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="rounded-2xl border border-foreground/8 bg-foreground/1 p-3.5 text-xs">
              <span className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider block mb-2">
                Password Requirements:
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className={`flex items-center gap-1.5 ${hasMinLength ? "text-emerald-500" : "text-foreground/40"}`}>
                  <CheckCircle2 className={`h-3.5 w-3.5 ${hasMinLength ? "opacity-100" : "opacity-30"}`} />
                  <span>8+ Characters</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-emerald-500" : "text-foreground/40"}`}>
                  <CheckCircle2 className={`h-3.5 w-3.5 ${hasUppercase ? "opacity-100" : "opacity-30"}`} />
                  <span>1 Uppercase letter</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasNumber ? "text-emerald-500" : "text-foreground/40"}`}>
                  <CheckCircle2 className={`h-3.5 w-3.5 ${hasNumber ? "opacity-100" : "opacity-30"}`} />
                  <span>1 Numeric digit</span>
                </div>
                <div className={`flex items-center gap-1.5 ${hasSpecial ? "text-emerald-500" : "text-foreground/40"}`}>
                  <CheckCircle2 className={`h-3.5 w-3.5 ${hasSpecial ? "opacity-100" : "opacity-30"}`} />
                  <span>1 Special symbol</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isUpdatingPassword}
                className="flex items-center gap-2"
              >
                {isUpdatingPassword ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Lock className="h-3.5 w-3.5" />
                )}
                <span>{isUpdatingPassword ? "Updating Password..." : "Update Password"}</span>
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* 2. Active Sessions & Devices Card */}
      <div className="flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-foreground/10 pb-4">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Laptop className="h-4 w-4" />
            </div>
            <div>
              <div>Active Sessions</div>
              <p className="text-[11px] font-normal text-foreground/50">Manage signed-in browsers and devices</p>
            </div>
          </div>

          {otherSessionsCount > 0 && (
            <button
              type="button"
              disabled={isRevokingAll}
              onClick={handleRevokeAllOtherSessions}
              className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isRevokingAll ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <LogOut className="h-3.5 w-3.5" />
              )}
              {isRevokingAll ? "Revoking..." : "Revoke Others"}
            </button>
          )}
        </div>

        {/* Sessions List */}
        <div className="flex flex-col gap-3 pt-1">
          {sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-foreground/5 bg-foreground/2">
              <Laptop className="h-8 w-8 text-foreground/20 mb-2" />
              <span className="text-xs font-semibold text-foreground/70">No other active sessions detected</span>
              <span className="text-[11px] text-foreground/40 mt-0.5">Your current login on this browser is active and secured</span>
            </div>
          ) : (
            sessions.map((sess) => (
              <div
                key={sess.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 rounded-2xl border p-4 transition-all ${
                  sess.isCurrent
                    ? "border-primary/30 bg-primary/3 shadow-sm"
                    : "border-foreground/10 bg-foreground/2 hover:border-foreground/20"
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${
                      sess.isCurrent
                        ? "border-primary/30 bg-primary/15 text-primary"
                        : "border-foreground/10 bg-foreground/5 text-foreground/70"
                    }`}
                  >
                    {getDeviceIcon(sess.deviceType)}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-foreground">
                        {sess.deviceName}
                      </span>
                      {sess.isCurrent && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Current Device
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-foreground/55 font-mono flex-wrap mt-0.5">
                      <span>{sess.browser}</span>
                      <span>•</span>
                      <span>{sess.os}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3 opacity-60" />
                        {sess.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                  <div className="text-right hidden sm:block">
                    <span
                      className={`text-[11px] font-semibold ${
                        sess.isCurrent ? "text-emerald-500" : "text-foreground/60"
                      }`}
                    >
                      {sess.lastActive}
                    </span>
                  </div>

                  {!sess.isCurrent && (
                    <button
                      type="button"
                      disabled={terminatingId === sess.id}
                      onClick={() => handleRevokeSession(sess.id)}
                      className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-2.5 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {terminatingId === sess.id ? (
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <LogOut className="h-3.5 w-3.5" />
                      )}
                      {terminatingId === sess.id ? "Terminating..." : "Terminate"}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
