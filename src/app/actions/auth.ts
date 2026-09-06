"use server";

import { signIn as nextAuthSignIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function loginWithGoogle() {
  await nextAuthSignIn("google", { redirectTo: "/" });
}

export async function loginWithCredentials(data: { email: string; password: string }) {
  try {
    await nextAuthSignIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error && (error.message.includes("CredentialsSignin") || error.name === "CredentialsSignin")) {
      return { success: false, error: "Invalid email or password" };
    }
    return { success: false, error: "Invalid credentials or login failed" };
  }
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  image?: string | null;
}

export async function registerUser({
  name,
  email,
  password,
  image,
}: RegisterInput) {
  try {
    const cleanEmail = email.toLowerCase().trim();

    if (!cleanEmail || !password || !name) {
      return { success: false, error: "Missing required fields" };
    }

    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long",
      };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in Neon PostgreSQL
    const user = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        password: hashedPassword,
        image: image || null,
      },
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    };
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during registration",
    };
  }
}
