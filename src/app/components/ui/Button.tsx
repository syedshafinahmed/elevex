import { sansation } from "@/lib/fonts";
import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md";
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
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
  disabled,
}: ButtonProps) {
  const base = `${sansation.className} inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 cursor-pointer`;

  const variants = {
    primary: "bg-primary text-white shadow-xl shadow-primary/20",
    secondary: "bg-background text-foreground",
    outline: "border border-foreground/60 text-foreground",
    danger: "border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 shadow-xs",
    ghost: "",
  };

  const sizes = {
    sm: "px-4 py-2.5 text-xs",
    md: "px-6 py-3 text-sm",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
