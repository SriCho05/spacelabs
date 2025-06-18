"use client";

import React, { useState, useEffect } from 'react';
import GooeyNav from './GooeyNav';

interface NavbarProps {
  onNavLinkClick: (id: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const navLinks = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'highlights', label: 'Highlights', href: '#highlights' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'showcase', label: 'Showcase', href: '#showcase' },
  { id: 'labs', label: 'Labs', href: '#labs' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ onNavLinkClick, theme, toggleTheme }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sectionIds = navLinks.map(link => link.id);
    const sections = sectionIds.map(id => document.getElementById(id));

    let lastHash = window.location.hash;

    const scrollContainer = document.getElementById('scroll-container') || document.querySelector('.scroll-container');

    const observerOptions = {
      root: scrollContainer || null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0.1, // A section is considered visible if 10% of it is in the rootMargin area
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionIds.indexOf(entry.target.id);
          if (index !== -1) {            
            const newHash = '#' + sectionIds[index];
            // Detailed logging:
            console.log(
              `Observer: Intersecting ${entry.target.id} (idx ${index}). newHash: ${newHash}, lastHash: ${lastHash}, window.location.hash: ${window.location.hash}`
            );

            if (lastHash !== newHash) {
              console.log(`Observer: Attempting hash update from ${lastHash} to ${newHash}`);
              try {
                window.history.replaceState(null, '', newHash);
                lastHash = newHash;
                console.log('Observer: Hash updated via replaceState to:', newHash);
              } catch (e) {
                console.error('Observer: Error using replaceState:', e);
                window.location.hash = newHash;
                lastHash = newHash;
                console.log('Observer: Hash updated via location.hash to:', newHash);
              }
            } else {
              console.log(`Observer: No hash update needed. lastHash (${lastHash}) === newHash (${newHash})`);
            }
            setActiveIndex(index);
          }
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    // Listen to hashchange event to update activeIndex accordingly
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const index = sectionIds.indexOf(hash);
      if (index !== -1) {
        setActiveIndex(index);
      }
    };
    window.addEventListener('hashchange', onHashChange);

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center z-50 px-8 py-4 bg-black/60 backdrop-blur-sm border-b border-techblue">
      <div className="font-orbitron text-techblue text-2xl tracking-widest flex items-center gap-4">
        SpaceLabs
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="bg-white text-black border border-gray-400 rounded px-3 py-1 text-sm font-semibold hover:bg-gray-300 transition"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <GooeyNav
        items={navLinks}
        activeIndex={activeIndex}
        onItemClick={(item) => { // No 'index' needed here if only 'item.id' is used
          onNavLinkClick(item.id);
        }} />
    </nav>
  );
};

export default Navbar;
