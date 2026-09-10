"use client";

import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "rounded" | "circular" | "rectangular" | "pill";
  shimmer?: boolean;
}

export function Skeleton({
  className = "",
  variant = "rounded",
  shimmer = true,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rounded: "rounded-2xl",
    circular: "rounded-full",
    rectangular: "rounded-none",
    pill: "rounded-full",
  };

  return (
    <div
      className={`bg-foreground/10 dark:bg-foreground/8 ${variantStyles[variant]} ${
        shimmer ? "animate-shimmer" : "animate-pulse"
      } ${className}`}
      {...props}
    />
  );
}

export default Skeleton;
