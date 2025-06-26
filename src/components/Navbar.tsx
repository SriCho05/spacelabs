"use client";

import React, { useState, useEffect } from 'react';
import GooeyNav from './GooeyNav';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavbarProps {
  onNavLinkClick: (id: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const navLinks = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'highlights', label: 'Highlights', href: '#highlights' },
  { id: 'about', label: 'About', href: '#about' },
  { 
    id: 'our-products', 
    label: 'Our Products', 
    href: '#work',
    dropdown: [
      { id: 'safe-platforms', label: 'SAFE AI', href: '/safe-platforms' },
      { id: 'spectraai', label: 'Spectra AI', href: '/spectraai' }
    ]
  },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const Navbar: React.FC<NavbarProps> = ({ onNavLinkClick, theme, toggleTheme }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks.map(link => link.id);
    const sections = sectionIds.map(id => document.getElementById(id));
    let lastHash = window.location.hash;
    const scrollContainer = document.getElementById('scroll-container') || document.querySelector('.scroll-container');
    const observerOptions = {
      root: scrollContainer || null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0.1,
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = sectionIds.indexOf(entry.target.id);
          if (index !== -1) {
            const newHash = '#' + sectionIds[index];
            if (lastHash !== newHash) {
              try {
                window.history.replaceState(null, '', newHash);
                lastHash = newHash;
              } catch (e) {
                window.location.hash = newHash;
                lastHash = newHash;
              }
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

  // Helper to handle nav link click (for overlay and GooeyNav)
  const handleNavClick = (item: any) => {
    setMenuOpen(false);
    if (item.href && item.href.startsWith('/')) {
      window.location.href = item.href;
    } else if (item.href && item.href.startsWith('#')) {
      const sectionId = item.href.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.id) {
      onNavLinkClick(item.id);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center z-50 px-8 py-4 bg-black/60 backdrop-blur-sm border-b border-techblue">
        <div className="font-orbitron text-techblue text-2xl tracking-widest flex items-center gap-4">
          <img src="/images/IWindDeck.png" alt="IWind Logo" className="h-10 w-auto" />
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <GooeyNav
            items={navLinks}
            activeIndex={activeIndex}
            onItemClick={handleNavClick}
          />
        </div>
        {/* Hamburger Button (always visible on mobile) */}
        <button
          className="md:hidden fixed top-4 right-6 z-[110] p-2 rounded-full bg-black/70 backdrop-blur border border-techblue text-techblue focus:outline-none"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
        </button>
      </nav>
      {/* Mobile Overlay Menu - render outside nav so it covers everything */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-all">
          <ul className="flex flex-col gap-8 w-full max-w-xs mx-auto text-2xl font-orbitron text-black text-center">
            {navLinks.map((item, idx) => (
              <li key={item.id} className="w-full">
                <button
                  className="w-full px-6 py-3 rounded-xl bg-black/5 hover:bg-techblue/10 border border-techblue shadow-lg font-orbitron text-black text-2xl tracking-widest transition-all"
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </button>
                {/* Dropdown for Our Products */}
                {item.dropdown && (
                  <ul className="mt-2 flex flex-col gap-2">
                    {item.dropdown.map((sub: any) => (
                      <li key={sub.id} className="w-full">
                        <button
                          className="w-full px-4 py-2 rounded-lg bg-black/5 hover:bg-techblue/10 border border-techblue text-black text-lg font-rajdhani tracking-wide"
                          onClick={() => handleNavClick(sub)}
                        >
                          {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
