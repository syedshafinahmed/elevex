"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ManagedUser } from "@/lib/usersData";
import {
  getUsers as serverGetUsers,
  updateUserRole as serverUpdateRole,
  deleteUser as serverDeleteUser,
} from "@/app/actions/users";

interface UserRoleContextType {
  users: ManagedUser[];
  loading: boolean;
  currentRole: "ADMIN" | "USER";
  refreshUsers: () => Promise<void>;
  updateUserRole: (userId: string, newRole: "ADMIN" | "USER") => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);

  const sessionRole = ((session?.user as { role?: string })?.role === "ADMIN" ? "ADMIN" : "USER") as "ADMIN" | "USER";
  const [currentRole, setCurrentRole] = useState<"ADMIN" | "USER">(sessionRole);

  const fetchDbUsers = async () => {
    try {
      setLoading(true);
      const dbUsers = await serverGetUsers();
      setUsers(dbUsers);

      // Immediately sync current logged in user's role with their database role
      if (session?.user?.email) {
        const userEmail = session.user.email.toLowerCase();
        const matchingUser = dbUsers.find(
          (u) => u.email.toLowerCase() === userEmail
        );
        if (matchingUser) {
          setCurrentRole(matchingUser.role);
        }
      }
    } catch (error) {
      console.error("Failed to load users from database:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDbUsers();
  }, [session?.user?.email]);

  const handleUpdateUserRole = async (userId: string, newRole: "ADMIN" | "USER") => {
    // Optimistic UI update
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );

    if (session?.user?.email) {
      const targetUser = users.find((u) => u.id === userId);
      if (targetUser && targetUser.email.toLowerCase() === session.user.email.toLowerCase()) {
        setCurrentRole(newRole);
      }
    }

    await serverUpdateRole(userId, newRole);
  };

  const handleDeleteUser = async (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    await serverDeleteUser(userId);
  };

  return (
    <UserRoleContext.Provider
      value={{
        users,
        loading,
        currentRole,
        refreshUsers: fetchDbUsers,
        updateUserRole: handleUpdateUserRole,
        deleteUser: handleDeleteUser,
      }}
    >
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
}
