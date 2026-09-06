"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { mountToaster, configureToaster, unmountToaster, toast } from "gooey-toast";
import "gooey-toast/styles.css";

export default function GooeyToaster() {
  const { resolvedTheme } = useTheme();
  const { data: session, status } = useSession();
  const hasNotifiedAuth = useRef(false);

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    mountToaster({
      position: "top-center",
      options: {
        duration: 3000,
        timeoutIndicator: false,
        icon: null,
        fill: isDark ? "#141414" : "#ffffff",
      },
    });

    return () => {
      unmountToaster();
    };
  }, []);

  useEffect(() => {
    const isDark = resolvedTheme === "dark";
    configureToaster({
      position: "top-center",
      options: {
        duration: 3000,
        timeoutIndicator: false,
        icon: null,
        fill: isDark ? "#141414" : "#ffffff",
      },
    });
  }, [resolvedTheme]);

  // Trigger toast notification right after Google login or auth redirect
  useEffect(() => {
    if (status === "authenticated" && session?.user && !hasNotifiedAuth.current) {
      if (typeof window !== "undefined") {
        const authFlag = sessionStorage.getItem("auth_just_logged_in");
        if (authFlag) {
          hasNotifiedAuth.current = true;
          sessionStorage.removeItem("auth_just_logged_in");
          setTimeout(() => {
            if (authFlag === "google") {
              toast.success({ title: "Signed In with Google" });
            } else {
              toast.success({ title: "Signed In Successfully" });
            }
          }, 350);
        }
      }
    }
  }, [status, session]);

  return (
    <style>{`
      [data-gooey-viewport] {
        z-index: 100000 !important;
        font-family: inherit;
      }

      [data-gooey-toast] {
        font-family: inherit;
      }

      /* Light theme pill fill */
      html:not(.dark) [data-gooey-toast] [data-gooey-svg] rect,
      html:not(.dark) [data-gooey-pill],
      html:not(.dark) [data-gooey-body] {
        fill: #ffffff !important;
      }

      /* Dark theme pill fill */
      html.dark [data-gooey-toast] [data-gooey-svg] rect,
      html.dark [data-gooey-pill],
      html.dark [data-gooey-body] {
        fill: #141414 !important;
      }

      /* Hide progress bar completely */
      [data-gooey-time-track],
      [data-gooey-time-fill] {
        display: none !important;
      }

      html:not(.dark) [data-gooey-svg] {
        filter: drop-shadow(0 6px 18px rgba(0, 0, 0, 0.12)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.08)) !important;
      }

      html.dark [data-gooey-svg] {
        filter: drop-shadow(0 8px 26px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.18)) !important;
      }

      /* Center toast header and remove badge gap for symmetrical x-padding */
      [data-gooey-header] {
        gap: 0 !important;
        padding: 0 1.125rem !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      /* Hide icon badge completely */
      [data-gooey-badge] {
        display: none !important;
      }

      [data-gooey-title] {
        font-family: inherit;
        font-weight: 700;
        font-size: 0.8125rem !important;
        letter-spacing: -0.01em;
        text-align: center;
      }
    `}</style>
  );
}
