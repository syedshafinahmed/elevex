"use server";

import { prisma } from "@/lib/prisma";
import { ManagedUser } from "@/lib/usersData";

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
