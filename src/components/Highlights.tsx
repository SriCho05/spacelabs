"use client";
import React, { useState, useEffect } from 'react';
import GridDistortion from './GridDistortion'; // Import the new component

const SensorIcon = () => (
  <svg
    className="w-12 h-12 text-techblue drop-shadow-lg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a7.9 7.9 0 0 0 0-6" />
    <path d="M4.6 9a7.9 7.9 0 0 0 0 6" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.22 4.22l1.42 1.42" />
    <path d="M18.36 18.36l1.42 1.42" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M4.22 19.78l1.42-1.42" />
    <path d="M18.36 5.64l1.42-1.42" />
  </svg>
);

const MonitorIcon = () => (
  <svg
    className="w-12 h-12 text-techblue drop-shadow-lg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="4" width="20" height="14" rx="2" ry="2" />
    <path d="M8 20h8" />
    <path d="M12 16v4" />
  </svg>
);

const highlights = [
  { number: 30, suffix: '+', text: 'software and AI projects delivered' },
  { number: 22, suffix: '', text: 'premiere clients' },
  { icon: <SensorIcon />, text: 'Multi-sensor fusion powered by SpectraAI' },
  { icon: <MonitorIcon />, text: 'Real-time monitoring & decision-making at scale' },
];

const Highlights = () => {
  // State to hold the animated counts for each highlight
  const [counts, setCounts] = useState(
    highlights.map((h) => (h.number ? 0 : 0))
  );

  useEffect(() => {
    const intervals: (NodeJS.Timeout | null)[] = highlights.map((highlight, index) => {
      if (!highlight.number) return null;
      const target = highlight.number;
      const duration = 2000; // animation duration in ms
      const stepTime = 50; // update interval in ms
      const steps = Math.ceil(duration / stepTime);
      let currentStep = 0;

      return setInterval(() => {
        currentStep++;
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          const increment = target / steps;
          const nextValue = Math.min(target, newCounts[index] + increment);
          newCounts[index] = nextValue;
          return newCounts;
        });
        if (currentStep >= steps) {
          if (intervals[index]) clearInterval(intervals[index]!);
        }
      }, stepTime);
    });

    // Cleanup intervals on unmount
    return () => {
      intervals.forEach((intervalId) => {
        if (intervalId) clearInterval(intervalId!);
      });
    };
  }, []);

  return (
    <section id="highlights" className="snap-center flex-shrink-0 w-screen h-screen flex items-center justify-center bg-black text-light relative overflow-hidden">
      {/* GridDistortion Background */}
      <div className="absolute inset-0 z-0 opacity-40 filter grayscale"> {/* Apply opacity and grayscale to the wrapper */}
        <GridDistortion
          imageSrc="/images/flight-dawn-sky-442587.jpg" // Use the same image
          grid={20}       // Adjust grid size as needed
          mouse={0.15}    // Adjust mouse sensitivity
          strength={0.2}  // Adjust distortion strength
          relaxation={0.92} // Adjust relaxation speed
          className="w-full h-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-8 p-4 max-w-3xl z-10 relative">
        {highlights.map(({ number, suffix, icon, text }, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-md text-white w-64 aspect-square flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-white/15"
          >
            {icon ? (
              <span className="mb-4">{icon}</span>
            ) : (
              <span className="text-5xl mb-4 text-techblue drop-shadow-lg">
                {Math.floor(counts[index])}
                {suffix}
              </span>
            )}
            <span className="text-base font-orbitron tracking-wide">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
