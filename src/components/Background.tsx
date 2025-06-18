import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Background: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    let rafId: number;
    let yPos = 0;

    const animate = () => {
      yPos += 0.3;
      if (yPos > window.innerHeight) yPos = 0;
      gsap.set(bg, {
        backgroundPosition: `50% ${yPos}px`,
      });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        filter: "brightness(0.7)",
        zIndex: -1,
        pointerEvents: "none",
        willChange: "background-position",
      }}
    />
  );
};

export default Background;
