"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  ShieldCheck,
  UserCheck,
  User,
  Search,
  Trash2,
  Mail,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { pinkAverage, sansation } from "@/lib/fonts";
import { useUserRole } from "@/context/UserRoleContext";
import Dropdown, { DropdownOption } from "@/app/components/dashboard/Dropdown";
import DeleteConfirmModal from "@/app/components/dashboard/DeleteConfirmModal";
import { ManagedUser } from "@/lib/usersData";

const roleOptions: DropdownOption<"ADMIN" | "USER">[] = [
  {
    value: "ADMIN",
    label: "ADMIN",
    description: "Full administrative access",
    icon: ShieldCheck,
  },
  {
    value: "USER",
    label: "USER",
    description: "Standard trading privileges",
    icon: User,
  },
];

export default function UsersManagementPage() {
  const { users, loading, refreshUsers, updateUserRole, deleteUser } = useUserRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "ADMIN" | "USER">("ALL");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<ManagedUser | null>(null);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalAdmins = users.filter((u) => u.role === "ADMIN").length;
  const totalStandardUsers = users.filter((u) => u.role === "USER").length;

  const handleRoleChange = async (userId: string, newRole: "ADMIN" | "USER") => {
    try {
      setIsUpdating(userId);
      await updateUserRole(userId, newRole);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className={`${sansation.className} flex flex-col gap-6 pb-12 w-full`}>
      {/* Top Stats based on DB Users */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* KPI 1: Total Users */}
        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
              Total Accounts
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
            {users.length}
          </div>
          <p className="text-[10px] text-foreground/45 mt-0.5">Registered database accounts</p>
        </div>

        {/* KPI 2: Admins */}
        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
              Administrators
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className={`${pinkAverage.className} text-2xl font-bold text-primary`}>
            {totalAdmins}
          </div>
          <p className="text-[10px] text-foreground/45 mt-0.5">Admin privilege access</p>
        </div>

        {/* KPI 3: Standard Users */}
        <div className="rounded-2xl border border-foreground/10 bg-foreground/2 p-4 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-foreground/50 uppercase tracking-wider">
              Standard Users
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground/10 text-foreground/70">
              <UserCheck className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className={`${pinkAverage.className} text-2xl font-bold text-foreground`}>
            {totalStandardUsers}
          </div>
          <p className="text-[10px] text-foreground/45 mt-0.5">Standard consumer & trader accounts</p>
        </div>
      </div>

      {/* Toolbar: Search, Role Filters, Refresh Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/2 p-3 inset-shadow-foreground/30 inset-shadow-sm">
        {/* Role Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(["ALL", "ADMIN", "USER"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setRoleFilter(tab)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                roleFilter === tab
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              {tab === "ALL" ? "All Users" : tab === "ADMIN" ? "Admins" : "Standard Users"}
            </button>
          ))}
        </div>

        {/* Search & Refresh */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search user, email, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-xl border border-foreground/15 bg-background pl-9 pr-3 text-xs text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => refreshUsers()}
            className="flex items-center gap-1.5 rounded-xl border border-foreground/15 bg-background px-3 py-2 text-xs font-semibold text-foreground transition-all hover:bg-foreground/5 hover:border-foreground/30 inset-shadow-foreground/30 inset-shadow-sm cursor-pointer"
            title="Refresh database users"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-primary ${loading ? "animate-spin" : ""}`} />
            <span className="hidden xs:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Users Table View */}
      {loading && users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-2">
          <RefreshCw className="h-8 w-8 text-primary animate-spin mb-2" />
          <p className="text-sm font-semibold text-foreground">Loading database users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-foreground/10 bg-foreground/2 text-center gap-2">
          <Users className="h-10 w-10 text-foreground/30 mb-2" />
          <p className="text-base font-semibold text-foreground">No database accounts match &ldquo;{searchTerm}&rdquo;</p>
          <p className="text-xs text-foreground/50">Try searching for a different keyword or switch the role filter.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/2 inset-shadow-foreground/30 inset-shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/3 text-[10px] uppercase tracking-wider text-foreground/50 font-semibold">
                  <th className="py-3.5 pl-6 pr-4 rounded-tl-3xl">User Details</th>
                  <th className="py-3.5 px-4 text-left">Role</th>
                  <th className="py-3.5 px-4 text-left">Member Since</th>
                  <th className="py-3.5 pr-6 text-right rounded-tr-3xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/6">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-foreground/3 transition-colors group">
                    {/* User Details */}
                    <td className="py-3.5 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-foreground/5 border border-foreground/10">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary/20 text-xs font-bold text-primary">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0 max-w-xs">
                          <span className="font-semibold text-foreground truncate text-xs">
                            {user.name}
                          </span>
                          <span className="text-[11px] text-foreground/50 truncate flex items-center gap-1 font-mono">
                            <Mail className="h-2.5 w-2.5 shrink-0 opacity-60" />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role Dropdown */}
                    <td className="py-3.5 px-4">
                      <Dropdown<"ADMIN" | "USER">
                        value={user.role}
                        options={roleOptions}
                        onChange={(newRole) => handleRoleChange(user.id, newRole)}
                        disabled={isUpdating === user.id}
                        loading={isUpdating === user.id}
                        className="w-48 sm:w-52"
                        triggerClassName={
                          user.role === "ADMIN"
                            ? "border-primary/40 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/15 dark:border-primary/35 dark:bg-primary/15 dark:hover:bg-primary/25"
                            : "border-foreground/15 bg-background text-foreground/85 hover:border-foreground/30 hover:bg-foreground/5 dark:border-foreground/15 dark:bg-foreground/5 dark:hover:bg-foreground/10"
                        }
                      />
                    </td>

                    {/* Join Date */}
                    <td className="py-3.5 px-4 text-foreground/50 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 opacity-60" />
                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    {/* Delete Action */}
                    <td className="py-3.5 pr-6 text-right">
                      <button
                        type="button"
                        onClick={() => setUserToDelete(user)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/15 transition-colors cursor-pointer ml-auto"
                        title="Delete User"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(userToDelete)}
        title="Delete User Account"
        itemName={userToDelete ? `${userToDelete.name} (${userToDelete.email})` : ""}
        description="Are you sure you want to permanently delete this user account from the database? This action cannot be reverted."
        confirmText="Delete Account"
        onConfirm={async () => {
          if (userToDelete) {
            await deleteUser(userToDelete.id);
            setUserToDelete(null);
          }
        }}
        onClose={() => setUserToDelete(null)}
      />
    </div>
  );
}
