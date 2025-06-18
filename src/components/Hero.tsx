"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import GradientText from './GradientText';

const DotGrid = dynamic(() => import('./DotGrid'), { ssr: false });

const Hero = () => (
<section id="hero" className="snap-center flex-shrink-0 w-screen h-screen flex flex-col items-center justify-center bg-black text-light relative overflow-hidden">
    {/* Animated DotGrid background */}
    <div className="absolute inset-0 w-full h-full z-0">
      <DotGrid
        dotSize={10}
        gap={15}
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
    </div>
    <div className="z-10 flex flex-col items-center max-w-6xl px-6">
      <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 mt-20 mb-4 inline-block">
        <h1 className="font-orbitron text-4xl md:text-6xl text-techblue drop-shadow text-center">
          Precision Software Intelligence for Infrastructure, Agriculture & Energy
        </h1>
      </div>
      <GradientText
        colors={["#ffd6e8", "#a3a0ff", "#ffd6e8", "#a3a0ff", "#ffd6e8"]}
        animationSpeed={3}
        showBorder={false}
        className="text-lg md:text-xl text-center max-w-3xl font-spacegrotesk mb-8"
      >
        AI-powered platforms that turn drone, robot, and sensor data into actionable insights — deployed across India and the Middle East.
      </GradientText>
<div className="grid grid-cols-3 gap-6 justify-center mb-10">
        <a
          href="#showcase"
          className="px-6 py-3 rounded-full font-bold font-rajdhani text-lg bg-white/10 backdrop-blur-md border border-white/30 text-white shadow-lg hover:bg-neongreen/50 hover:drop-shadow-[0_0_8px_rgba(0,255,0,0.7)] transition"
        >
          Explore SAFE Platforms
        </a>
        <a
          href="#demo"
          className="px-6 py-3 rounded-full font-bold font-rajdhani text-lg bg-white/10 backdrop-blur-md border border-white/30 text-techblue shadow-lg hover:bg-white/20 hover:text-black transition"
        >
          Request Demo
        </a>
        <a
          href="#join"
          className="px-6 py-3 rounded-full font-bold font-rajdhani text-lg bg-white/10 backdrop-blur-md border border-white/30 text-techblue shadow-lg hover:bg-white/20 hover:text-black transition"
        >
          Join AvianPilot Network
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
