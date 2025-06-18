import React from 'react';

interface ScrollIndicatorProps {
  scrollPercentage: number;
  totalSections?: number; // Optional: for dot indicators or other features
  activeSectionIndex?: number; // Optional: for dot indicators or other features
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  scrollPercentage,
  // totalSections,
  // activeSectionIndex,
}) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-deepviolet/30 rounded-full z-50 pointer-events-none">
    <div
      className="h-full bg-techblue rounded-full transition-all duration-150 ease-linear"
      style={{ width: `${scrollPercentage}%` }}
    />
  </div>
);

export default ScrollIndicator;
