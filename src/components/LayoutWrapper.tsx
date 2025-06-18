"use client";

import React from "react";
import Navbar from "./Navbar";
import { useTheme } from "./ThemeProvider";

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  const handleNavLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar onNavLinkClick={handleNavLinkClick} theme={theme} toggleTheme={toggleTheme} />
      <main>{children}</main>
    </>
  );
};

export default LayoutWrapper;
