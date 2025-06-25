"use client";

import React, { useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide the default cursor everywhere
    const style = document.createElement("style");
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    let mouseX = -100,
      mouseY = -100;
    let followerX = -100,
      followerY = -100;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          mouseX - 8
        }px, ${mouseY - 8}px, 0)`;
      }
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${
          followerX - 24
        }px, ${followerY - 24}px, 0)`;
      }
      requestAnimationFrame(animateFollower);
    };

    document.addEventListener("mousemove", moveCursor);
    animateFollower();

    return () => {
      document.head.removeChild(style);
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-techblue rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          boxShadow: "0 0 16px rgb(255, 0, 0)",
        }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-12 h-12 border-2 border-techblue rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          transition: "box-shadow 0s",
        }}
      />
    </>
  );
};

export default CustomCursor;
