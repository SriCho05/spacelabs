"use client";

import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [swipeDown, setSwipeDown] = useState(false);

  useEffect(() => {
    // Show loading screen for 8 seconds, then swipe down and remove
    const timer = setTimeout(() => {
      setSwipeDown(true);
      setTimeout(() => setIsLoading(false), 700); // match transition duration
    }, 30000); // 8 seconds for initial load
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Always render children, but overlay loading screen on top */}
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {children}
        {isLoading && (
          <LoadingScreen swipeDown={swipeDown} />
        )}
      </div>
    </>
  );
};

export default ClientLayout;
