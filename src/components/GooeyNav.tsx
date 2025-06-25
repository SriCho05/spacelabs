import React, { useRef, useEffect, useState } from "react";

interface GooeyNavItem {
  id?: string;
  label: string;
  href: string;
  dropdown?: { id: string; label: string; href: string; }[];
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  activeIndex?: number; // Prop to control active index externally
  onItemClick?: (item: GooeyNavItem, index: number) => void; // Callback for item click
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  activeIndex: controlledActiveIndex,
  onItemClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [currentInternalActiveIndex, setCurrentInternalActiveIndex] = useState<number>(
    controlledActiveIndex !== undefined ? controlledActiveIndex : initialActiveIndex
  );
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle dropdown open with immediate effect
  const handleDropdownOpen = (index: number) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(index);
  };

  // Handle dropdown close with 2-second delay
  const handleDropdownClose = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(null);
      dropdownTimeoutRef.current = null;
    }, 2000);
  };

  // Cancel the close timeout if user hovers back
  const handleDropdownKeepOpen = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (
    distance: number,
    pointIndex: number,
    totalPoints: number
  ): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const createParticle = React.useCallback((
    i: number,
    t: number,
    d: [number, number],
    r: number
  ) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  }, [colors, noise]); // Added noise to dependencies
  const makeParticles = React.useCallback((element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  }, [animationTime, timeVariance, particleDistances, particleR, particleCount, createParticle]);
  const updateEffectPosition = React.useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  }, []);

  // Effect to synchronize with controlledActiveIndex and trigger animations
  useEffect(() => {
    if (controlledActiveIndex !== undefined && controlledActiveIndex !== currentInternalActiveIndex) {
      setCurrentInternalActiveIndex(controlledActiveIndex);

      const liElements = navRef.current?.querySelectorAll("li");
      if (liElements && liElements[controlledActiveIndex]) {
        const activeLiElement = liElements[controlledActiveIndex] as HTMLElement;
        updateEffectPosition(activeLiElement);

        if (filterRef.current) {
          const particles = filterRef.current.querySelectorAll(".particle");
          particles.forEach((p) => {
            if (filterRef.current) filterRef.current.removeChild(p);
          });
          makeParticles(filterRef.current);
        }
        if (textRef.current) {
          textRef.current.classList.remove("active");
          void textRef.current.offsetWidth; // Trigger reflow
          textRef.current.classList.add("active");
          textRef.current.innerText = activeLiElement.innerText;
        }
      }
    }
  }, [controlledActiveIndex, currentInternalActiveIndex, items, makeParticles, updateEffectPosition]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    const liEl = e.currentTarget;

    if (onItemClick) {
      // Prevent default <a> tag behavior if programmatic navigation is occurring.
      // This is important if the click event bubbles up or if the <a> itself is clicked.
      // Find the anchor tag if the event target is not the anchor itself.
      if (e.target instanceof HTMLElement && e.target.tagName !== 'A') e.preventDefault();
      onItemClick(items[index], index);
    }

    if (controlledActiveIndex === undefined) { // Uncontrolled mode
      if (currentInternalActiveIndex === index) return;
      setCurrentInternalActiveIndex(index);
      updateEffectPosition(liEl);
      if (filterRef.current) {
        const particles = filterRef.current.querySelectorAll(".particle");
        particles.forEach((p) => { if (filterRef.current) filterRef.current.removeChild(p); });
      }
      if (textRef.current) {
        textRef.current.classList.remove("active");
        void textRef.current.offsetWidth;
        textRef.current.classList.add("active");
        textRef.current.innerText = liEl.innerText;
      }
      if (filterRef.current) {
        makeParticles(filterRef.current);
      }
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick(
          { currentTarget: liEl } as React.MouseEvent<HTMLLIElement>,
          index
        );
      }
    }
  };
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[
      currentInternalActiveIndex
    ] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      if (textRef.current) {
        textRef.current.innerText = activeLi.innerText;
        textRef.current.classList.add("active");
      }
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[
        currentInternalActiveIndex
      ] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [currentInternalActiveIndex, items, updateEffectPosition]);

  return (
    <>
      {/* This effect is quite difficult to recreate faithfully using Tailwind, so a style tag is a necessary workaround */}
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .effect.text {
            color: white;
            transition: color 0.3s ease;
          }
          .effect.text.active {
            color: black;
          }
          .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
          }
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -22px;
            z-index: -2;
            background: black;
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: white;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 8px);
            left: calc(50% - 8px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          li.active {
            color: black;
            text-shadow: none;
          }
          li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
        `}
      </style>
      <div className="relative" ref={containerRef}>
        <nav
          className="flex relative"
          style={{ transform: "translate3d(0,0,0.01px)" }}
        >
          <ul
            ref={navRef}
            className="flex gap-8 list-none p-0 px-4 m-0 relative z-[3]"
            style={{
              color: "white",
              textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)",
            }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`py-[0.6em] px-[1em] rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white ${
                  currentInternalActiveIndex === index ? "active" : ""
                }`} // Use currentInternalActiveIndex for styling
                onClick={(e) => item.dropdown ? e.preventDefault() : handleClick(e, index)}
                onMouseEnter={() => item.dropdown && handleDropdownOpen(index)}
                onMouseLeave={() => item.dropdown && handleDropdownClose()}
              >
                <a
                  href={item.href}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="outline-none flex items-center gap-1"
                >
                  {item.label}
                  {item.dropdown && (
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>
                {item.dropdown && dropdownOpen === index && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-sm border border-techblue/30 rounded-lg py-2 z-50"
                    onMouseEnter={handleDropdownKeepOpen}
                    onMouseLeave={handleDropdownClose}
                  >
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <a
                        key={dropdownIndex}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-white hover:bg-techblue/20 hover:text-techblue transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropdownOpen(null);
                          if (onItemClick) {
                            onItemClick(dropdownItem as GooeyNavItem, index);
                          }
                        }}
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;
