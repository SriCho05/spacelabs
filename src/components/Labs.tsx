import React from 'react';

const labs = [
  {
    title: 'Hardware-in-the-loop Simulations',
    desc: 'Realtime, robust, and reliable.',
    icon: (
      <svg className="w-16 h-16 mb-4 text-neongreen" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" fill="none" />
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
    )
  },
  {
    title: 'Realtime Edge Vision',
    desc: 'AI-powered, low-latency.',
    icon: (
      <svg className="w-16 h-16 mb-4 text-neongreen" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    title: 'AI Payload Integration',
    desc: 'Seamless, scalable, smart.',
    icon: (
      <svg className="w-16 h-16 mb-4 text-neongreen" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="2" ry="2" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
        <path d="M2 12h20" />
      </svg>
    )
  },
];

import LetterGlitch from './LetterGlitch';

const Labs = () => (
  <section id="labs" className="snap-center flex-shrink-0 w-screen h-screen flex items-center justify-center bg-[#10101a] text-light relative overflow-hidden">
    {/* LetterGlitch background */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
    </div>
    <div className="flex gap-8 z-10">
      {labs.map((lab, i) => (
        <div
          key={lab.title}
          className="relative bg-[rgba(135,206,235,0.1)] backdrop-blur-lg border border-[rgba(135,206,235,0.2)] rounded-2xl p-8 w-72 h-60 flex flex-col items-center justify-center shadow-xl hover:scale-105 hover:shadow-2xl transition-all group overflow-hidden"
        >
          {/* Animated gradient border ring */}
          <span className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-neongreen transition-all duration-500 z-10 animate-pulse" />
          <div className="mb-4 flex justify-center">
            {lab.icon}
          </div>
          <h4 className="font-rajdhani text-xl mb-2 text-neongreen text-center z-20 drop-shadow">{lab.title}</h4>
          <p className="text-center text-light/80 font-spacegrotesk text-sm z-20">{lab.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Labs;
