"use client";

import React, { useEffect, useState } from 'react';
import ImageTrail from './ImageTrail';
import Silk from './Silk';

const trailImages = [
  '/images/trail/58.jpeg',
  '/images/trail/61.jpeg',
  '/images/trail/66.jpeg',
  '/images/trail/69.jpeg',
  '/images/trail/74.jpeg',
  '/images/trail/79.jpeg',
];

const features = [
	{
		title: 'Embedded Aerospace Systems',
		desc: 'Space-grade hardware, precision firmware.',
		icon: '/images/aero.png',
	},
	{
		title: 'Edge AI Hardware',
		desc: 'AI at the edge, real-time insight.',
		icon: '/images/AI.png',
	},
	{
		title: 'Autonomous Robotics',
		desc: 'Self-guided, adaptive, robust.',
		icon: '/images/robot.png',
	},
	{
		title: 'Precision Actuation',
		desc: 'Ultra-fine control, zero-latency.',
		icon: '/images/ruler.png',
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
			className="snap-center flex-shrink-0 w-screen h-screen flex items-center justify-center bg-black text-light relative overflow-hidden"
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
				<div className="flex gap-8 z-10 relative w-auto" style={{ pointerEvents: 'none' }}>
					{features.map((f, i) => (
<div
							key={f.title}
							className={`relative backdrop-blur-lg border border-white/20 rounded-2xl p-8 w-72 h-80 flex flex-col items-center justify-center shadow-xl hover:scale-105 hover:shadow-2xl transition-all group overflow-hidden`}
							style={{ pointerEvents: 'auto', backgroundColor: '#0a1c29dd' }}
						>
							{/* Animated gradient border ring */}
							<span className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-techblue transition-all duration-300 z-10" />
							{/* Animated icon with hover effects and ease-out for landing */}
							<div className={`w-28 h-28 mb-4 flex items-center justify-center animate-pulse-slow z-20 transition-all duration-300 ease-out group-hover:scale-110 ${
								f.icon === '/images/aero.png' 
									? 'group-hover:-translate-y-4 group-hover:rotate-[-10deg]'  // "Take off" animation for aero icon
									: 'group-hover:rotate-[15deg]' // Standard rotation for other icons
							}`}>
								<img
									src={f.icon}
									alt={`${f.title} icon`}
									width={100} // Increased from 48
									height={100} // Increased from 48
									className="object-contain" // Ensures the image fits well within its container
								/>
							</div>
<h3 className="font-orbitron text-2xl mt-2 mb-2 text-white text-center z-20 drop-shadow">
								{f.title}
							</h3>
<p className="text-center text-white font-spacegrotesk z-20">
								{f.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhatWeDo;
