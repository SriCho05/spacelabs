"use client";
import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import SimpleFluidGlass from './SimpleFluidGlass';
import { useLoadingState } from './ClientLayout';

const Hero = () => {
  const [showButtons, setShowButtons] = useState(false);
  const isLoadingComplete = useLoadingState(state => state.isLoadingComplete);
  
  useEffect(() => {
    // Only start the timer once loading is complete
    if (isLoadingComplete) {
      // Add a delay before showing buttons after loading screen is gone
      const timer = setTimeout(() => {
        setShowButtons(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoadingComplete]);
  
  return (
  <section id="hero" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black text-light overflow-hidden snap-center flex-shrink-0">
    {/* Spline 3D background */}
    <div className="absolute inset-0 w-full h-full z-0">
      <Spline
        scene="https://prod.spline.design/7hJZF3SIDzAyflaB/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
        className="w-full h-full"
      />
    </div>
    {/* Action buttons: right-center on desktop, bottom on mobile */}
    <div
      className={`hidden md:flex flex-col gap-4 pointer-events-auto z-10 absolute right-16 top-1/2 -translate-y-1/2 transition-opacity duration-1000 ${showButtons ? 'opacity-100' : 'opacity-0'}`}
    >
      <SimpleFluidGlass variant="animated" className="group">
        <a
          href="/safe-platforms"
          className="block px-6 py-3 rounded-full font-bold font-rajdhani text-lg text-white shadow-lg hover:text-neongreen transition text-center"
        >
          Explore SAFE Platforms
        </a>
      </SimpleFluidGlass>
      <SimpleFluidGlass variant="animated" className="group">
        <a
          href="/contact"
          className="block px-6 py-3 rounded-full font-bold font-rajdhani text-lg text-techblue shadow-lg hover:text-white transition text-center"
        >
          Request Demo
        </a>
      </SimpleFluidGlass>
      <SimpleFluidGlass variant="animated" className="group">
        <a
          href="#join"
          className="block px-6 py-3 rounded-full font-bold font-rajdhani text-lg text-techblue shadow-lg hover:text-white transition text-center"
        >
          Join AvianPilot Network
        </a>
      </SimpleFluidGlass>
    </div>
    {/* Mobile: buttons at bottom */}
    <div className={`flex md:hidden flex-col gap-4 w-full items-center justify-end pb-8 absolute left-0 bottom-0 z-10 transition-opacity duration-1000 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
      <SimpleFluidGlass variant="animated" className="group">
        <a
          href="/safe-platforms"
          className="block px-6 py-3 rounded-full font-bold font-rajdhani text-lg text-white shadow-lg hover:text-neongreen transition text-center"
        >
          Explore SAFE Platforms
        </a>
      </SimpleFluidGlass>
      <SimpleFluidGlass variant="animated" className="group">
        <a
          href="/contact"
          className="block px-6 py-3 rounded-full font-bold font-rajdhani text-lg text-techblue shadow-lg hover:text-white transition text-center"
        >
          Request Demo
        </a>
      </SimpleFluidGlass>
      <SimpleFluidGlass variant="animated" className="group">
        <a
          href="#join"
          className="block px-6 py-3 rounded-full font-bold font-rajdhani text-lg text-techblue shadow-lg hover:text-white transition text-center"
        >
          Join AvianPilot Network
        </a>
      </SimpleFluidGlass>
    </div>
  </section>
  );
};

export default Hero;
