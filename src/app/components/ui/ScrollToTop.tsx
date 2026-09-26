"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Button from "./Button";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 48 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            ariaLabel="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="h-11 w-11 rounded-2xl bg-primary shadow-lg shadow-primary/25 text-background border border-background backdrop-blur-sm"
          >
            <ChevronUp className="h-6 w-6 shrink-0" aria-hidden="true" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
