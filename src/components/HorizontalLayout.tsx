import React, { useRef, useEffect, useState } from 'react';

// Define section props type
interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

// Section component
export const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
  return (
    <section 
      id={id}
      className={`h-screen w-screen flex items-center justify-center snap-start ${className}`}
    >
      <div className="max-w-7xl w-full px-6 md:px-8 py-16">
        {children}
      </div>
    </section>
  );
};

// Custom hook to track current section
const useCurrentSection = (sectionIds: string[]) => {
  const [currentSection, setCurrentSection] = useState<string>(sectionIds[0]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollX + window.innerWidth / 3;
      
      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (!section) continue;
        
        const sectionLeft = section.offsetLeft;
        const sectionRight = sectionLeft + section.offsetWidth;
        
        if (scrollPosition >= sectionLeft && scrollPosition < sectionRight) {
          setCurrentSection(sectionIds[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);
  
  return currentSection;
};

// Navbar component
const Navbar: React.FC<{ sectionIds: string[], currentSection: string }> = ({ sectionIds, currentSection }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 font-spacegrotesk flex justify-center py-6 backdrop-blur-md bg-black/30">
      <ul className="flex space-x-8">
        {sectionIds.map((id) => (
          <li key={id}>
            <a 
              href={`#${id}`}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                currentSection === id 
                  ? 'text-techblue' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {id}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Scroll indicator component
const ScrollIndicator: React.FC<{ sectionIds: string[], currentSection: string }> = ({ sectionIds, currentSection }) => {
  const currentIndex = sectionIds.indexOf(currentSection);
  const progress = ((currentIndex + 1) / sectionIds.length) * 100;
  
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-2">
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-techblue transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-white/80 text-xs font-spacegrotesk">
        {currentIndex + 1}/{sectionIds.length}
      </span>
    </div>
  );
};

// Main horizontal layout component
interface HorizontalLayoutProps {
  children: React.ReactNode;
  sectionIds: string[];
}

const HorizontalLayout: React.FC<HorizontalLayoutProps> = ({ children, sectionIds }) => {
  const currentSection = useCurrentSection(sectionIds);
  
  // Enable horizontal scrolling
  useEffect(() => {
    // Disable vertical scroll and enable horizontal
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'auto';
    document.documentElement.style.scrollSnapType = 'x mandatory';
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Reset on unmount
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
      document.documentElement.style.scrollSnapType = '';
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  return (
    <div className="h-screen">
      <Navbar sectionIds={sectionIds} currentSection={currentSection} />
      
      <div className="flex h-screen w-max overflow-x-auto">
        {children}
      </div>
      
      <ScrollIndicator sectionIds={sectionIds} currentSection={currentSection} />
    </div>
  );
};

export default HorizontalLayout;
