"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ManagedUser } from "@/lib/usersData";

export interface UserProfileData {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  phone: string | null;
  company: string | null;
  designation: string | null;
  role: "ADMIN" | "USER";
  createdAt: string;
}

export async function getUserProfile(): Promise<{
  success: boolean;
  user?: UserProfileData;
  error?: string;
}> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email.toLowerCase() },
    });

    if (!dbUser) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        image: dbUser.image,
        phone: dbUser.phone,
        company: dbUser.company,
        designation: dbUser.designation,
        role: (dbUser.role === "ADMIN" ? "ADMIN" : "USER") as "ADMIN" | "USER",
        createdAt: dbUser.createdAt.toISOString(),
      },
    };
  } catch (error: unknown) {
    console.error("Error fetching user profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch profile",
    };
  }
}

export async function updateUserProfile(data: {
  name?: string;
  phone?: string;
  company?: string;
  designation?: string;
  image?: string;
}): Promise<{
  success: boolean;
  user?: UserProfileData;
  error?: string;
}> {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email.toLowerCase() },
      data: {
        name: data.name !== undefined ? data.name : undefined,
        phone: data.phone !== undefined ? data.phone : undefined,
        company: data.company !== undefined ? data.company : undefined,
        designation: data.designation !== undefined ? data.designation : undefined,
        image: data.image !== undefined ? data.image : undefined,
      },
    });

    return {
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        phone: updatedUser.phone,
        company: updatedUser.company,
        designation: updatedUser.designation,
        role: (updatedUser.role === "ADMIN" ? "ADMIN" : "USER") as "ADMIN" | "USER",
        createdAt: updatedUser.createdAt.toISOString(),
      },
    };
  } catch (error: unknown) {
    console.error("Error updating user profile in DB:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}

export async function getUsers(): Promise<ManagedUser[]> {
  try {
    const dbUsers = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return dbUsers.map((u) => ({
      id: u.id,
      name: u.name || "User",
      email: u.email,
      image: u.image,
      role: (u.role === "ADMIN" ? "ADMIN" : "USER") as "ADMIN" | "USER",
      createdAt: u.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching users from database:", error);
    return [];
  }
}

export async function updateUserRole(
  userId: string,
  newRole: "ADMIN" | "USER"
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
    return { success: true };
  } catch (error: unknown) {
    console.error("Error updating user role in DB:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update role",
    };
  }
}

export async function deleteUser(
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    return { success: true };
  } catch (error: unknown) {
    console.error("Error deleting user in DB:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
}
