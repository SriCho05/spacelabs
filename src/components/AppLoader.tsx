"use client";

import React, { useEffect, useState, useRef } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ClientLayout from "@/components/ClientLayout";

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [showLoading, setShowLoading] = useState(true);
  const timerStarted = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = sessionStorage.getItem("hasVisited");
      if (hasVisited) {
        setShowLoading(false);
      } else {
        setShowLoading(true);
        sessionStorage.setItem("hasVisited", "true");
        if (!timerStarted.current) {
          timerStarted.current = true;
          // Use a single timer for 8.7s, and log for debug
          const t = setTimeout(() => {
            setShowLoading(false);
          }, 8700);
          return () => clearTimeout(t);
        }
      }
    }
  }, []);

  return (
    <>
      {showLoading && <LoadingScreen swipeDown={true} />}
      {!showLoading && <ClientLayout>{children}</ClientLayout>}
    </>
  );
}
