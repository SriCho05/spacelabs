"use client";

import React, { useState, useEffect } from 'react';
import { DotLottieReact, type DotLottieReactProps } from '@lottiefiles/dotlottie-react';

const loadingMessages = [
  "Initializing quantum space algorithms...",
  "Teaching birds to code...",
  "Calculating the meaning of life (spoiler: it's JavaScript)...",
  "Brewing the perfect cup of Java...",
  "Launching rockets to debug server...",
  "Feeding the AI hamsters...",
  "Optimizing neural pathways...",
  "Training robot pigeons...",
  "Syncing with the matrix...",
  "Loading more loading messages..."
];

const LoadingScreen = ({ fadeOut = false, swipeDown = false, onFinish }: { fadeOut?: boolean, swipeDown?: boolean, onFinish?: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);
  const [shouldSwipe, setShouldSwipe] = useState(false);

  useEffect(() => {
    // Show loading for 8s, then swipe down
    let swipeTimeout: NodeJS.Timeout;
    let messageInterval: NodeJS.Timeout;
    let messageIndex = 0;
    setCurrentMessage(loadingMessages[0]);
    messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setCurrentMessage(loadingMessages[messageIndex]);
    }, 2000); // 2 second
    const timer = setTimeout(() => {
      setShouldSwipe(true);
      swipeTimeout = setTimeout(() => {
        if (onFinish) onFinish();
      }, 700); // 700ms for swipe animation
      clearInterval(messageInterval); // Stop cycling messages when loading ends
    }, 8000); // 8000ms = 8 seconds
    return () => {
      clearTimeout(timer);
      clearTimeout(swipeTimeout);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className={`fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50 transition-opacity duration-700 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-transform duration-700 ${shouldSwipe || swipeDown ? 'translate-y-full pointer-events-none' : 'translate-y-0'}`} style={{ willChange: 'transform' }}>
      {/* Minimalistic local loading circle SVG as background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <img
          src="/minimal-loading-circle.svg"
          alt="Loading Circle"
          style={{ width: '90vw', height: '90vw', maxWidth: 900, maxHeight: 900 }}
        />
      </div>
      <div className="relative z-40 w-64 h-64 flex items-center justify-center">
        {/* Use remote animation as requested */}
        <DotLottieReact
          src="https://lottie.host/aa775365-e10b-4769-abb6-413f8acbd793/V3tHSMsuFa.lottie"
          loop
          autoplay
        />
      </div>
      <div className="relative z-40 mt-8 text-center">
        <p className="text-techblue font-rajdhani text-xl font-bold animate-pulse">
          {currentMessage}
        </p>
        <p className="text-deepviolet/70 text-sm mt-2 font-space-grotesk">
          SpaceLabs is preparing for launch...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
