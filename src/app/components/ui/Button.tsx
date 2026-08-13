import { sansation } from "@/lib/fonts";
import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md";
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  className = "",
  children,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const base = `${sansation.className} inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98]`;

  const variants = {
    primary: "bg-primary text-foreground",
    secondary: "bg-background text-foreground",
    outline: "border border-foreground/60 text-foreground",
    ghost: "",
  };

  const sizes = {
    sm: "px-4 py-3 text-xs",
    md: "px-6 py-3 text-sm",
  };

  const classes = `${base} ${variants[variant]} ${variant !== "ghost" ? sizes[size] : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}
