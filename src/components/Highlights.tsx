"use client";
import React, { useState, useEffect } from 'react';
import GridDistortion from './GridDistortion'; // Import the new component
import dynamic from 'next/dynamic';

// Dynamically import Lottie for client-side rendering only
const Lottie = dynamic(() => import('lottie-react').then(mod => mod.default), { ssr: false });

// ArrowRightCircle Lottie JSON (set stroke color to white)
const arrowRightCircleLottie = {"v":"5.6.5","fr":30,"ip":0,"op":75,"w":32,"h":32,"nm":"arrow-right-circle","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"arrow-right-circle","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[16,16,0],"ix":2},"a":{"a":0,"k":[12,12,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[16,12],[8,12]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":2,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"arrow leg","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0]],"v":[[2,-4],[-2,0],[2,4]],"c":false},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":2,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[10,12],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"arrow head","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"tr","p":{"a":0,"k":[12,12],"ix":2},"a":{"a":0,"k":[12,12],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":180,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"arrow","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-5.523,0],[0,-5.523],[5.522,0],[0,5.522]],"o":[[5.522,0],[0,5.522],[-5.523,0],[0,-5.523]],"v":[[0,-10],[10,0],[0,10],[-10,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.8],"y":[1]},"o":{"x":[0.8],"y":[0]},"t":0,"s":[0]},{"t":30,"s":[100]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":2,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[12,12],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"circle 2","np":3,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-5.523,0],[0,-5.523],[5.522,0],[0,5.522]],"o":[[5.522,0],[0,5.522],[-5.523,0],[0,-5.523]],"v":[[0,-10],[10,0],[0,10],[-10,0]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.2],"y":[1]},"o":{"x":[0.2],"y":[0]},"t":45,"s":[0]},{"t":75,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":2,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[12,12],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"circle","np":3,"cix":2,"bm":0,"ix":3,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":75,"st":0,"bm":0}],"markers":[]};

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

const clientLogos = [
  { name: "L&T (Larsen & Toubro)", src: "https://birdscale.com/wp-content/uploads/2020/10/OPT_Client_larsen_and_turbo.png" },
  { name: "Government of Tamil Nadu", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_tamilnadu_govt.png" },
  { name: "RPP Infra Projects", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_rpp.png" },
  { name: "Renacon AAC Blocks", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_rpp_renacon.png" },
  { name: "Government of Odisha", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_orissa_govt.png" },
  { name: "TÜV NORD", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_tuv.png" },
  { name: "Green Field Housing India Pvt Ltd", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_greenfield.png" },
  { name: "Sun TV Network", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_sun_network.png" },
  { name: "Marico", src: "https://birdscale.com/wp-content/uploads/2020/08/OPT_Client_marico.png" },
  { name: "CMK Projects Pvt Ltd", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_cmk_projects.png" },
  { name: "PSG Institutions", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_psg_group.png" },
  { name: "Vestas", src: "https://birdscale.com/wp-content/uploads/2021/07/OPT_Client_vestas.png" },
  { name: "RCCL (NR RCCL)", src: "https://birdscale.com/wp-content/uploads/2022/01/rccl.jpg" },
  { name: "URC Construction (URC – Building Values)", src: "https://birdscale.com/wp-content/uploads/2022/01/url.png" },
];

const Highlights = () => {
  // State to hold the animated counts for each highlight
  const [counts, setCounts] = useState(
    highlights.map((h) => (h.number ? 0 : 0))
  );
  const [showTrusted, setShowTrusted] = useState(false);
  const [showSensors, setShowSensors] = useState(false);
  // Track which overlay is active: 'trusted', 'sensors', or null
  const [activeOverlay, setActiveOverlay] = useState<null | 'trusted' | 'sensors'>(null);

  // Animation state for icon buttons
  const [trustedAnimKey, setTrustedAnimKey] = useState(0);
  const [sensorsAnimKey, setSensorsAnimKey] = useState(0);

  // Dismiss overlays on outside click
  useEffect(() => {
    if (!activeOverlay) return;
    const handleClick = (e: MouseEvent) => {
      const trusted = document.getElementById('trusted-glassmorphic');
      const sensors = document.getElementById('sensors-glassmorphic');
      if (
        (trusted && trusted.contains(e.target as Node)) ||
        (sensors && sensors.contains(e.target as Node))
      ) return;
      setActiveOverlay(null);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [activeOverlay]);

  // Only set overlay on click, not hover
  const handleIconClick = (overlay: 'trusted' | 'sensors') => {
    setActiveOverlay(overlay);
  };

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
    <section id="highlights" className="snap-center flex-shrink-0 w-full h-screen flex items-center justify-center bg-black text-light relative overflow-hidden">
      {/* GridDistortion Background */}
      <div className="absolute inset-0 z-0 opacity-40 filter grayscale">
        <GridDistortion
          imageSrc="/images/flight-dawn-sky-442587.jpg"
          grid={20}
          mouse={0.15}
          strength={0.2}
          relaxation={0.92}
          className="w-full h-full"
        />
      </div>
      <div className="flex w-full max-w-6xl z-10 relative items-center justify-center px-4">
        {/* Glassmorphic 2x2 grid always perfectly centered, only overlay boxes animate in */}
        <div className="relative flex-1 flex justify-center transition-all duration-700" id="bento-glassmorphic-wrapper">
          <div className="grid grid-cols-2 grid-rows-2 gap-8 mx-auto transition-all duration-700"
            id="bento-glassmorphic"
            style={{
              margin: '0 auto',
              transform: activeOverlay ? 'translateX(-300px)' : 'translateX(0)'
            }}
          >
            {highlights.map(({ number, suffix, icon, text }, index) => (
              <div
                key={index}
                className={`bg-white/10 border border-white/20 rounded-xl p-6 shadow-md text-white w-64 aspect-square flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out backdrop-blur-md relative`}
                style={{ cursor: (index === 1 || index === 2) ? 'pointer' : 'default' }}
              >
                {/* Icon button for overlays */}
                {index === 1 && (
                  <button
                    aria-label="Show Trusted by"
                    onClick={e => { e.stopPropagation(); handleIconClick('trusted'); }}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 border border-techblue text-techblue transition-transform duration-200 focus:scale-110 focus:bg-techblue focus:text-black shadow-lg z-20"
                  >
                    <Lottie animationData={arrowRightCircleLottie} loop={true} className="w-8 h-8" />
                  </button>
                )}
                {index === 2 && (
                  <button
                    aria-label="Show Sensor Types"
                    onClick={e => { e.stopPropagation(); handleIconClick('sensors'); }}
                    className="absolute bottom-3 left-3 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 border border-deepviolet text-deepviolet transition-transform duration-200 focus:scale-110 focus:bg-deepviolet focus:text-black shadow-lg z-20"
                  >
                    <Lottie animationData={arrowRightCircleLottie} loop={true} className="w-8 h-8" />
                  </button>
                )}
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
        </div>
        {/* Glassmorphic box for Trusted by with animated logos and inner shadow, only visible on hover */}
        <div id="trusted-glassmorphic" className={`bg-white/10 border border-white/20 rounded-xl p-6 shadow-md text-white max-w-xl w-full h-72 flex flex-col items-center justify-center text-center gap-4 backdrop-blur-md transition-all duration-700 ml-0 md:ml-8 absolute left-1/2 top-1/2 -translate-y-1/2 ${activeOverlay === 'trusted' ? 'scale-110 opacity-100 z-30 -translate-x-0' : 'scale-95 opacity-0 pointer-events-none z-0 -translate-x-1/2'}`} style={{ boxShadow: 'inset 0 4px 32px 0 rgba(0,240,255,0.10), 0 2px 16px 0 rgba(0,0,0,0.10)' }}>
          <h3 className="text-2xl md:text-3xl font-orbitron text-techblue mb-2 tracking-widest uppercase">Trusted by</h3>
          <div className="relative w-full overflow-hidden group">
            <div className="flex animate-horizontal-scroll gap-4 w-max" style={{ animationPlayState: 'running' }}
              onMouseEnter={e => { e.currentTarget.style.animationPlayState = 'paused'; }}
              onMouseLeave={e => { e.currentTarget.style.animationPlayState = 'running'; }}
            >
              {clientLogos.concat(clientLogos).map((client, i) => (
                <div key={i} className="flex items-center justify-center w-28 h-16 bg-white rounded-lg shadow-md p-2">
                  <img
                    src={client.src}
                    alt={client.name}
                    className="object-contain h-12 w-24 drop-shadow-lg transition-all duration-300"
                    style={{ filter: 'none' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Glassmorphic box for Sensors, only visible on hover of Multi-sensor fusion */}
        <div id="sensors-glassmorphic" className={`bg-white/10 border border-white/20 rounded-xl p-6 shadow-md text-white max-w-xl w-full h-72 flex flex-col items-center justify-center text-center gap-4 backdrop-blur-md transition-all duration-700 ml-0 md:ml-8 absolute left-1/2 top-1/2 -translate-y-1/2 ${activeOverlay === 'sensors' ? 'scale-110 opacity-100 z-30 -translate-x-0' : 'scale-95 opacity-0 pointer-events-none z-0 -translate-x-1/2'}`} style={{ boxShadow: 'inset 0 4px 32px 0 rgba(127,0,255,0.10), 0 2px 16px 0 rgba(0,0,0,0.10)' }}>
          <h3 className="text-2xl md:text-3xl font-orbitron text-deepviolet mb-2 tracking-widest uppercase">Sensor Types</h3>
          <div className="grid grid-cols-2 gap-4 w-full items-center justify-center">
            <div className="flex flex-col items-center">
              <img src="/images/aero.png" alt="RGB camera & LiDAR" className="h-12 w-12 object-contain mb-2" />
              <span className="text-sm font-space-grotesk">RGB camera & LiDAR</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/robot.png" alt="Thermal Sensor" className="h-12 w-12 object-contain mb-2" />
              <span className="text-sm font-space-grotesk">Thermal Sensor</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/ruler.png" alt="Ultra-soundingSensor" className="h-12 w-12 object-contain mb-2" />
              <span className="text-sm font-space-grotesk">Ultra-soundingSensor</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/AI.png" alt="Gas Detection Sensors" className="h-12 w-12 object-contain mb-2" />
              <span className="text-sm font-space-grotesk">Gas Detection Sensors</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes horizontal-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-horizontal-scroll {
          animation: horizontal-scroll 18s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Highlights;
