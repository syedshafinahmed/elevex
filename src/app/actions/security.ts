"use server";

import { headers } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export interface ActiveSessionData {
  id: string;
  deviceType: "desktop" | "mobile" | "laptop";
  deviceName: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface SecurityInfoResponse {
  success: boolean;
  hasPassword?: boolean;
  provider?: "credentials" | "google";
  sessions?: ActiveSessionData[];
  error?: string;
}

// Helper to parse User-Agent dynamically from request
function parseUserAgent(ua: string) {
  let os = "Windows";
  let deviceType: "desktop" | "laptop" | "mobile" = "desktop";
  let deviceName = "Windows PC";
  let browser = "Chrome";

  if (/Windows/i.test(ua)) {
    os = "Windows";
    deviceType = "desktop";
    deviceName = "Windows PC";
  } else if (/iPhone/i.test(ua)) {
    os = "iOS";
    deviceType = "mobile";
    deviceName = "iPhone";
    browser = "Safari Mobile";
  } else if (/iPad/i.test(ua)) {
    os = "iPadOS";
    deviceType = "mobile";
    deviceName = "iPad";
    browser = "Safari";
  } else if (/Android/i.test(ua)) {
    os = "Android";
    deviceType = "mobile";
    deviceName = "Android Device";
    browser = "Chrome Mobile";
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    os = "macOS";
    deviceType = "laptop";
    deviceName = "MacBook";
    browser = "Safari";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
    deviceType = "desktop";
    deviceName = "Linux PC";
    browser = "Firefox";
  }

  if (/Edg\//i.test(ua)) browser = "Microsoft Edge";
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = "Safari";

  return { os, deviceType, deviceName, browser };
}

// 1. Get Security Info: detects Google vs Email/Password + Real Active Sessions (NO dummy data)
export async function getUserSecurityInfo(): Promise<SecurityInfoResponse> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    // Read real current request headers
    const reqHeaders = await headers();
    const userAgent = reqHeaders.get("user-agent") || "";
    const ip =
      reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      reqHeaders.get("x-real-ip") ||
      "127.0.0.1";
    const city = reqHeaders.get("x-vercel-ip-city") || "Dhaka";
    const country = reqHeaders.get("x-vercel-ip-country") || "Bangladesh";
    const location = `${city}, ${country}`;

    const { os, deviceType, deviceName, browser } = parseUserAgent(userAgent);

    let hasPassword = true;
    let provider: "credentials" | "google" = "credentials";
    let dbUser: any = null;

    try {
      dbUser = await prisma.user.findUnique({
        where: { email: session.user.email.toLowerCase() },
        include: {
          accounts: true,
        },
      });

      if (dbUser) {
        hasPassword = Boolean(dbUser.password);
        const isGoogleAccount = dbUser.accounts?.some((acc: any) => acc.provider === "google");
        provider = hasPassword ? "credentials" : isGoogleAccount ? "google" : "credentials";
      }
    } catch (err) {
      console.error("Error loading user in getUserSecurityInfo:", err);
    }

    let formattedSessions: ActiveSessionData[] = [];

    try {
      if (dbUser && (prisma as any).userSession) {
        // Wipe all dummy/mock records previously seeded in database for this user
        await (prisma as any).userSession.deleteMany({
          where: {
            userId: dbUser.id,
            OR: [
              { isCurrent: false },
              { deviceName: { in: ['MacBook Pro 16"', "iPhone 15 Pro", "MacBook Pro", "iPhone", "iPad", "Linux Workstation", "Windows Workstation"] } },
            ],
          },
        });

        // Check if current device session exists
        const existingSession = await (prisma as any).userSession.findFirst({
          where: {
            userId: dbUser.id,
            browser,
            os,
          },
        });

        if (existingSession) {
          await (prisma as any).userSession.update({
            where: { id: existingSession.id },
            data: {
              lastActive: new Date(),
              ipAddress: ip,
              location,
              deviceName,
              deviceType,
              isCurrent: true,
            },
          });
        } else {
          // Mark all others as non-current before creating the real current one
          await (prisma as any).userSession.updateMany({
            where: { userId: dbUser.id },
            data: { isCurrent: false },
          });

          await (prisma as any).userSession.create({
            data: {
              userId: dbUser.id,
              deviceType,
              deviceName,
              browser,
              os,
              ipAddress: ip,
              location,
              isCurrent: true,
              lastActive: new Date(),
            },
          });
        }

        const freshSessions = await (prisma as any).userSession.findMany({
          where: { userId: dbUser.id },
          orderBy: [{ isCurrent: "desc" }, { lastActive: "desc" }],
        });

        formattedSessions = freshSessions.map((s: any) => {
          let lastActiveText = "Active Now";
          if (!s.isCurrent) {
            const diffHours = Math.floor((Date.now() - new Date(s.lastActive).getTime()) / (1000 * 60 * 60));
            if (diffHours < 1) lastActiveText = "Just now";
            else if (diffHours < 24) lastActiveText = `${diffHours}h ago`;
            else {
              const days = Math.floor(diffHours / 24);
              lastActiveText = `${days}d ago`;
            }
          }

          return {
            id: s.id,
            deviceType: (s.deviceType === "mobile" || s.deviceType === "laptop" ? s.deviceType : "desktop") as
              | "desktop"
              | "mobile"
              | "laptop",
            deviceName: s.deviceName,
            browser: s.browser,
            os: s.os,
            ipAddress: s.ipAddress,
            location: s.location,
            lastActive: s.isCurrent ? "Active Now" : lastActiveText,
            isCurrent: s.isCurrent,
          };
        });
      }
    } catch (err) {
      console.error("Error managing user sessions table in DB:", err);
    }

    // Fallback only to the single real current device
    if (formattedSessions.length === 0) {
      formattedSessions = [
        {
          id: "current-session-only",
          deviceType,
          deviceName,
          browser,
          os,
          ipAddress: ip,
          location,
          lastActive: "Active Now",
          isCurrent: true,
        },
      ];
    }

    return {
      success: true,
      hasPassword,
      provider,
      sessions: formattedSessions,
    };
  } catch (error: unknown) {
    console.error("Error fetching user security info:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to load security info",
    };
  }
}

// 2. Change Password Action
export async function changeUserPassword(data: {
  currentPassword?: string;
  newPassword?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const { currentPassword, newPassword } = data;

    if (!currentPassword || !newPassword) {
      return { success: false, error: "Please provide both current and new passwords" };
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email.toLowerCase() },
    });

    if (!dbUser) {
      return { success: false, error: "User not found" };
    }

    if (!dbUser.password) {
      return {
        success: false,
        error: "Password change is not available for accounts authenticated via Google OAuth.",
      };
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, dbUser.password);
    if (!isPasswordValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    // Validate new password rules
    if (newPassword.length < 8) {
      return { success: false, error: "New password must be at least 8 characters long" };
    }
    if (!/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword) || !/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      return {
        success: false,
        error: "New password must include uppercase, number, and special character",
      };
    }

    // Hash and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Error changing password:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to change password",
    };
  }
}

// 3. Terminate a single session
export async function revokeUserSession(sessionId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email.toLowerCase() },
    });

    if (dbUser && (prisma as any).userSession) {
      await (prisma as any).userSession.deleteMany({
        where: {
          id: sessionId,
          userId: dbUser.id,
        },
      });
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Error revoking session:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to terminate session",
    };
  }
}

// 4. Revoke all other sessions
export async function revokeAllOtherSessions(): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email.toLowerCase() },
    });

    if (dbUser && (prisma as any).userSession) {
      await (prisma as any).userSession.deleteMany({
        where: {
          userId: dbUser.id,
          isCurrent: false,
        },
      });
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Error revoking all other sessions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to revoke sessions",
    };
  }
}
