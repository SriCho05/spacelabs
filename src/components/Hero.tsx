"use client";
import React from 'react';
import Spline from '@splinetool/react-spline';
import SimpleFluidGlass from './SimpleFluidGlass';

const Hero = () => (
  <section id="hero" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black text-light overflow-hidden snap-center flex-shrink-0">
    {/* Spline 3D background */}
    <div className="absolute inset-0 w-full h-full z-0">
      <Spline
        scene="https://prod.spline.design/7hJZF3SIDzAyflaB/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
        className="w-full h-full"
      />
    </div>
    {/* Right center - Action buttons only */}
    <div className="absolute top-1/2 right-16 -translate-y-1/2 flex flex-col gap-4 pointer-events-auto z-10">
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

export default Hero;
