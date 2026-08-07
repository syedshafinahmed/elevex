"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import Button from "./Button";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        type="button"
        variant="ghost"
        ariaLabel="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="h-11 w-11 rounded-2xl bg-primary shadow-lg text-background border border-background backdrop-blur-sm"
      >
        <ChevronUp className="h-6 w-6" aria-hidden="true" />
      </Button>
    </div>
  );
}
