"use client";
import { useRef, useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import ScrollIndicator from "../components/ScrollIndicator";
import Hero from "../components/Hero";
import About from "../components/About";
import WhatWeDo from "../components/WhatWeDo";
import Showcase from "../components/Showcase";
import Labs from "../components/Labs";
import Team from "../components/Team";
import Contact from "../components/Contact";
import Highlights from "../components/Highlights";
import { useScroll } from "framer-motion";
import ScrollVelocity from "../components/ScrollVelocity";

// Define sections with their components and titles for ScrollVelocity
const sections = [
  { id: "hero", Component: Hero, title: "HOME" },
  { id: "highlights", Component: Highlights, title: "HIGHLIGHTS" },
  { id: "about", Component: About, title: "ABOUT US" },
  { id: "work", Component: WhatWeDo, title: "WHAT WE DO" },
  { id: "showcase", Component: Showcase, title: "SHOWCASE" },
  { id: "labs", Component: Labs, title: "LABS" },
  { id: "team", Component: Team, title: "TEAM" },
  { id: "contact", Component: Contact, title: "CONTACT" },
];
const sectionIds = sections.map(s => s.id); // Used for ScrollIndicator and Navbar logic consistency

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [isWheeling, setIsWheeling] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Track vertical scroll progress for the main container
  const { scrollYProgress: mainScrollYProgress } = useScroll({
    container: mainRef,
    axis: 'y', // Explicitly track vertical scroll
  });

  // Effect to dynamically adjust scroll snapping based on active section
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    if (sectionIds[activeSectionIndex] === 'showcase') {
      mainEl.classList.remove('snap-x', 'snap-mandatory');
      mainEl.classList.add('snap-none'); // Disables scroll snapping
      mainEl.style.overflowY = 'auto'; // Allow vertical scroll for Showcase
    } else {
      mainEl.classList.remove('snap-none');
      mainEl.classList.add('snap-x', 'snap-mandatory'); // Re-enables horizontal snapping
      mainEl.style.overflowY = 'hidden'; // Prevent vertical scroll for other sections
      // If we are on a non-showcase page, ensure its scrollTop is 0.
      // This handles the case when transitioning from Showcase to another section.
      if (mainEl.scrollTop !== 0) {
        mainEl.scrollTop = 0;
      }
    }
  }, [activeSectionIndex]);

  // Effect for mouse wheel horizontal scrolling
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;
    const handleWheel = (event: WheelEvent) => {
      const currentSectionIndex = Math.round(mainEl.scrollLeft / mainEl.clientWidth);
      const currentSectionId = sectionIds[currentSectionIndex];

      // Determine if the primary scroll direction is vertical
      const isPrimaryVerticalScroll = Math.abs(event.deltaY) > Math.abs(event.deltaX);

      if (currentSectionId === 'showcase') {
        // When on the Showcase section:
        // 1. If it's primarily a horizontal scroll, let the browser handle it (snapping is off).
        if (!isPrimaryVerticalScroll) {
           return;
        }

        // 2. If it's primarily a vertical scroll, check if we are at the vertical limits.
        const isScrollingUp = event.deltaY < 0;
        const isScrollingDown = event.deltaY > 0;
        const atShowcaseTop = mainEl.scrollTop <= 1; // Small tolerance
        const atShowcaseBottom = mainEl.scrollTop + mainEl.clientHeight >= mainEl.scrollHeight - 1; // Small tolerance

        // If scrolling up at the top, or down at the bottom, proceed to horizontal navigation.
        if ((isScrollingUp && atShowcaseTop) || (isScrollingDown && atShowcaseBottom)) {
           // Prevent default vertical scroll to avoid bounce/overscroll before horizontal nav
           event.preventDefault();
           // Fall through to the horizontal scroll logic below
        } else {
           // If scrolling vertically *within* the Showcase content, let the browser handle it.
           // Prevent default only if it's a vertical scroll gesture to ensure browser handles it.
           if (isPrimaryVerticalScroll) {
             return; // Let browser handle vertical scroll within showcase
           }
        }
      }

      if (isWheeling) return; // Prevent re-triggering during smooth scroll

      // For other sections:
      // Only act on primarily vertical wheel events to convert them to horizontal scrolling.
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX * 0.5)) { // Prioritize vertical wheel for horizontal nav
        event.preventDefault(); // Prevent default page scroll
        setIsWheeling(true);

        const sectionWidth = mainEl.clientWidth;
        let currentNearestIndex = Math.round(mainEl.scrollLeft / sectionWidth);
        let targetIndex = currentNearestIndex;

        // Calculate the nearest section index based on scrollLeft and wheel direction
        if (event.deltaY > 0) {
          targetIndex = Math.min(currentNearestIndex + 1, sections.length - 1);
        } else {
          targetIndex = Math.max(currentNearestIndex - 1, 0);
        }
        
        const targetSectionId = sectionIds[targetIndex];

        // If transitioning to a non-Showcase section, immediately prepare it.
        if (targetSectionId !== 'showcase' && mainEl.scrollTop !== 0) {
            mainEl.style.overflowY = 'hidden'; // Ensure vertical scroll is locked for the target
            mainEl.scrollTop = 0;
        }

        const targetScrollLeft = targetIndex * sectionWidth;
        mainEl.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });

        setTimeout(() => {
          setIsWheeling(false);
        }, 600); // Duration slightly longer than typical smooth scroll
      }
    };

    mainEl.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      mainEl.removeEventListener('wheel', handleWheel);
    };
  }, [isWheeling]); // activeSectionIndex is not a direct dependency here,
                     // its effect on snapping is handled by the other useEffect.
                     // currentSectionId is calculated fresh in handleWheel.


  // Effect for Arrow Key Navigation
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        if (isWheeling) return;
        
        event.preventDefault(); 
        setIsWheeling(true);

        const sectionWidth = mainEl.clientWidth;
        let currentNearestIndex = Math.round(mainEl.scrollLeft / sectionWidth);
        let targetIndex = currentNearestIndex;

        if (event.key === 'ArrowLeft') {
          targetIndex = Math.max(currentNearestIndex - 1, 0);
        } else if (event.key === 'ArrowRight') {
          targetIndex = Math.min(currentNearestIndex + 1, sections.length - 1);
        }

        const targetSectionId = sectionIds[targetIndex];
        if (targetSectionId !== 'showcase' && mainEl.scrollTop !== 0) {
            mainEl.style.overflowY = 'hidden'; // Ensure vertical scroll is locked for the target
            mainEl.scrollTop = 0;
        }

        const targetScrollLeft = targetIndex * sectionWidth;
        mainEl.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
        
        setTimeout(() => setIsWheeling(false), 600);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWheeling]);

  // Effect for scroll indicator updates
  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const currentScroll = mainEl.scrollLeft;
      const sectionWidth = mainEl.clientWidth;
      const totalScrollableWidth = mainEl.scrollWidth - sectionWidth;

      if (totalScrollableWidth > 0) {
        const percentage = (currentScroll / totalScrollableWidth) * 100;
        setScrollPercentage(percentage);
        const currentIndex = Math.round(currentScroll / sectionWidth); // Update activeSectionIndex based on scroll
        setActiveSectionIndex(currentIndex);
      } else {
        setScrollPercentage(0);
        setActiveSectionIndex(0);
      }
    };

    handleScroll(); // Initial call
    mainEl.addEventListener('scroll', handleScroll);

    return () => {
      mainEl.removeEventListener('scroll', handleScroll);
    };
  }, []); // Runs once on mount

  const navigateToSectionByClick = (sectionId: string) => {
    const mainEl = mainRef.current;
    if (!mainEl || isWheeling) return;

    const targetIndex = sectionIds.findIndex(id => id === sectionId);
    if (targetIndex === -1) return;

    setIsWheeling(true);

    const targetIsShowcase = sectionIds[targetIndex] === 'showcase';

    // Prepare the main container's state *before* scrolling
    if (targetIsShowcase) {
      mainEl.style.overflowY = 'auto';
      mainEl.classList.remove('snap-x', 'snap-mandatory');
      mainEl.classList.add('snap-none');
    } else {
      mainEl.style.overflowY = 'hidden';
      mainEl.classList.remove('snap-none');
      mainEl.classList.add('snap-x', 'snap-mandatory');
      if (mainEl.scrollTop !== 0) {
        mainEl.scrollTop = 0; // Crucial: reset before scroll
      }
    }

    const targetScrollLeft = targetIndex * mainEl.clientWidth;
    mainEl.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });

    setTimeout(() => {
      setIsWheeling(false);
    }, 650); // Match timeout from other handlers, allow smooth scroll to likely finish
  };

  return (
    <main
      ref={mainRef}
      id="scroll-container" // Ensure Navbar's IntersectionObserver can find this root
      className="relative flex h-screen w-screen snap-x snap-mandatory overflow-x-auto overflow-y-auto scroll-smooth"
    >
      <Navbar onNavLinkClick={navigateToSectionByClick} />
      <ScrollIndicator
        scrollPercentage={scrollPercentage}
        totalSections={sections.length}
        activeSectionIndex={activeSectionIndex}
      />
      <div className="flex w-max h-full">
        {sections.map(({ id, Component, title }) => (
          <div
            key={id} // Use id as key
            className={`relative flex-shrink-0 w-screen ${
              id === 'showcase' ? 'h-auto' : 'h-screen' // Allow Showcase to define its own height
            }`}
          > {/* Wrapper for section + scroll text */}
            {id === 'showcase' ? <Component scrollYProgress={mainScrollYProgress} /> : <Component />}
              <div className="absolute top-0 left-0 h-full w-20 md:w-24 z-30 flex items-center justify-center pointer-events-none overflow-hidden">
                {/* Container for ScrollVelocity, adjust width (w-20/w-24) as needed */}
                <div className="transform -rotate-90 whitespace-nowrap">
                  <ScrollVelocity
                    texts={[title.toUpperCase()]} // Ensure text is uppercase for style consistency
                    velocity={15} // Increased velocity for a more noticeable base animation
                    scrollContainerRef={mainRef}
                    className="text-xl md:text-2xl font-orbitron text-techblue/30 tracking-wider" // Custom styling for the text (slightly less opaque)
                    numCopies={10} // Increased for better coverage and smoother continuous scroll
                    velocityMapping={{ input: [0, 1000], output: [0, 1] }} // More subtle scroll-based speed change
                    // parallaxClassName="custom-parallax-vertical" // Optional: if you need very specific CSS overrides
                    // scrollerClassName="custom-scroller-vertical"
                  />
                </div>
              </div> {/* Close ScrollVelocity overlay div */}
          </div>
        ))}
      </div>
    </main>
  );
}
