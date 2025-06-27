"use client";

import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

// Create a global state to track loading state
import { create } from 'zustand';

interface LoadingState {
  isLoadingComplete: boolean;
  setLoadingComplete: (complete: boolean) => void;
}

export const useLoadingState = create<LoadingState>((set) => ({
  isLoadingComplete: false,
  setLoadingComplete: (complete) => set({ isLoadingComplete: complete }),
}));

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [swipeDown, setSwipeDown] = useState(false);
  const setLoadingComplete = useLoadingState(state => state.setLoadingComplete);

  useEffect(() => {
    // Show loading screen for 30 seconds, then swipe down and remove
    const timer = setTimeout(() => {
      setSwipeDown(true);
      setTimeout(() => {
        setIsLoading(false);
        setLoadingComplete(true); // Signal that loading is complete
      }, 700); // match transition duration
    }, 30000); // 30 seconds for initial load
    return () => clearTimeout(timer);
  }, [setLoadingComplete]);

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
