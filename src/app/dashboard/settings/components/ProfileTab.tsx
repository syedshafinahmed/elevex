"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  User,
  Save,
  Camera,
  RefreshCw,
} from "lucide-react";
import { toast } from "gooey-toast";
import { getUserProfile, updateUserProfile } from "@/app/actions/users";
import Button from "@/app/components/ui/Button";
import Loader from "@/app/components/common/Loader";

export default function ProfileTab() {
  const { data: session, update: updateSession } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch real profile from DB
  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        setIsLoading(true);
        const res = await getUserProfile();
        if (res.success && res.user && isMounted) {
          setName(res.user.name || "");
          setEmail(res.user.email || "");
          setPhone(res.user.phone || "");
          setCompanyName(res.user.company || "");
          setDesignation(res.user.designation || "");
          setImage(res.user.image || null);
        } else if (session?.user && isMounted) {
          setName(session.user.name || "");
          setEmail(session.user.email || "");
          setImage(session.user.image || null);
        }
      } catch (err) {
        console.error("Failed to load user profile:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [session]);

  // Handle Photo File Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error({ title: "Image size must be under 5MB" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
        toast.info({ title: "Photo selected (click Save to apply)" });
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Save
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await updateUserProfile({
        name: name.trim() || undefined,
        phone: phone.trim() || "",
        company: companyName.trim() || "",
        designation: designation.trim() || "",
        image: image || undefined,
      });

      if (res.success) {
        toast.success({
          title: "Profile Saved Successfully",
        });

        // Update NextAuth client session if name or image changed
        if (updateSession) {
          await updateSession({
            ...session,
            user: {
              ...session?.user,
              name: res.user?.name || name,
              image: res.user?.image || image,
            },
          });
        }
      } else {
        toast.error({
          title: res.error || "Failed to update profile",
        });
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error({
        title: "Error saving profile",
      });
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-foreground/10 bg-foreground/2">
        <Loader />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6">
      {/* Hidden File Input for Avatar Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* Trader Profile & Identity */}
      <div className="flex flex-col gap-5 rounded-3xl border border-foreground/10 bg-foreground/2 p-6 inset-shadow-foreground/30 inset-shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-foreground/10 pb-4">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </div>
            <div>
              <div>Trader Identity & Profile</div>
              <p className="text-[11px] font-normal text-foreground/50">Personal credentials and contact for global trade deals</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-1">
          {/* Avatar Area - Square Image with Floating Camera Icon */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="relative group">
              <div className="relative aspect-square w-30 rounded-3xl overflow-hidden border-2 border-primary/40 shadow-lg ring-4 ring-primary/10 bg-foreground/5">
                {image ? (
                  <Image
                    src={image}
                    alt="Profile"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-4xl font-bold text-white">
                    {(name?.[0] || email?.[0] || "U").toUpperCase()}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary border-2 border-background text-background hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                title="Upload Photo"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <span className="text-[11px] text-foreground/50 text-center font-medium">
              PNG, JPG up to 5MB
            </span>
          </div>

          {/* 2 Rows of Inputs */}
          <div className="flex flex-1 flex-col justify-between gap-4 w-full text-xs">
            {/* Row 1: Name, Email, Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  placeholder="e.g. Syed Shafin Ahmed"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                  Official Business Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  className="h-10 w-full rounded-xl border border-foreground/10 bg-foreground/5 px-3 text-foreground/70 cursor-not-allowed font-mono"
                  placeholder="name@company.com"
                  title="Account email address cannot be changed directly"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all font-mono"
                  placeholder="+880 1700-000000"
                />
              </div>
            </div>

            {/* Row 2: Company and Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                  Registered Enterprise Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  placeholder="e.g. Bengal Prime Commodities Ltd."
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground/60 uppercase tracking-wider mb-1.5">
                  Designation
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="h-10 w-full rounded-xl border border-foreground/15 bg-background px-3 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  placeholder="e.g. Managing Director / Chief Exporter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isSaving ? "Saving Profile..." : "Save Profile"}</span>
        </Button>
      </div>
    </form>
  );
}
