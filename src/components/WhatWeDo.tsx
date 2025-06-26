"use client";

import React, { useEffect, useState } from 'react';
import ImageTrail from './ImageTrail';
import Silk from './Silk';
import Link from 'next/link';

const trailImages = [
  '/images/trail/58.jpeg',
  '/images/trail/61.jpeg',
  '/images/trail/66.jpeg',
  '/images/trail/69.jpeg',
  '/images/trail/74.jpeg',
  '/images/trail/79.jpeg',
];

// Showcase topics for WhatWeDo
const showcaseTopics = [
	{
		title: "SAFE Platforms",
		desc: "Infra, Agri, and Energy solutions.",
		icon: '/images/aero.png',
	},
	{
		title: "SpectraAI",
		desc: "AI-powered multisensor insights.",
		icon: '/images/AI.png',
	},
	{
		title: "AvianPilot",
		desc: "Global drone workforce platform.",
		icon: '/images/robot.png',
	},
];

const WhatWeDo = () => {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<section
			id="work"
			className="snap-center flex-shrink-0 w-full h-screen flex items-center justify-center bg-black text-light relative overflow-hidden"
		>
			{isClient && (
				<div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
					<Silk
						speed={5}
						scale={1}
						color="#87ceeb" // Example color, adjust as needed
						noiseIntensity={1.5}
						rotation={0}
					/>
				</div>
			)}
			{/* Subtle animated gradient background */} 
			<div className="absolute inset-0 bg-gradient-to-br from-deepviolet/10 to-techblue/10 animate-gradient pointer-events-none z-10" />
			{/* Unified interactive area for ImageTrail and cards */}
			<div className="relative w-full h-full flex items-center justify-center z-20" style={{ pointerEvents: 'auto' }}>
				{/* ImageTrail as animated background, only on client; placeholder on server */}
				<div className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'auto' }}>
							{isClient ? (
								<ImageTrail
									key="work-trail"
									items={trailImages}
									variant={1}
								/>
							) : (
								<div className="w-full h-full bg-transparent" />
							)}
				</div>
				{/* Feature cards overlay, allow pointer events to pass through except for interactive elements */}
					<div className="flex flex-col gap-4 sm:flex-row sm:gap-8 z-10 relative w-full sm:w-auto items-center justify-center" style={{ pointerEvents: 'none' }}>
          {showcaseTopics.map((topic) => (
            <div
              key={topic.title}
              className="section-wrapper relative backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-12 w-full max-w-xs sm:w-[26rem] sm:h-[23rem] h-48 flex flex-col items-center justify-center shadow-2xl hover:scale-105 hover:shadow-2xl transition-all group overflow-hidden bg-[#0a1c29dd] mx-auto"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="w-16 h-16 sm:w-28 sm:h-28 mb-2 sm:mb-4 flex items-center justify-center animate-pulse-slow z-20 transition-all duration-300 ease-out group-hover:scale-110">
                <img
                  src={topic.icon}
                  alt={`${topic.title} icon`}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="font-orbitron text-lg sm:text-2xl mt-1 sm:mt-2 mb-1 sm:mb-2 text-white text-center z-20 drop-shadow">
                {topic.title}
              </h3>
              <p className="text-center text-white font-spacegrotesk z-20 mb-2 sm:mb-4 text-xs sm:text-base">
                {topic.desc}
              </p>
              {/* Animated glowing right arrow button */}
              <Link
                href={
                  topic.title === "SAFE Platforms"
                    ? "/safe-platforms"
                    : topic.title === "SpectraAI"
                    ? "/spectraai"
                    : "/avianpilot"
                }
                className="relative flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3 rounded-full font-rajdhani text-base sm:text-xl bg-techblue text-black font-bold shadow-lg overflow-hidden transition-all duration-200 group/button border-2 border-techblue mx-auto mt-auto active:scale-90 focus:scale-95
                  before:absolute before:inset-0 before:rounded-full before:bg-techblue before:blur before:opacity-60 before:transition-all before:duration-200 before:scale-100
                  hover:before:scale-110 hover:before:opacity-80 hover:shadow-[0_0_32px_8px_#00f0ff] hover:bg-white/90 hover:text-deepviolet"
                style={{ zIndex: 30, display: 'flex', width: 48, height: 48, minWidth: 48, minHeight: 48 }}
                aria-label="Go to details"
                scroll={false}
              >
                <span className="relative z-10 flex items-center justify-center w-full h-full">
                  <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="16" stroke="#00f0ff" strokeWidth="2.5" fill="none" />
                    <path d="M13 18h10" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M19 14l4 4-4 4" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </div>
          ))}
        </div>
			</div>
		</section>
	);
};

export default WhatWeDo;
