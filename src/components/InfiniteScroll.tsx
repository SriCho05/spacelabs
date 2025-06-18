import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import Cubes from './Cubes';
import "./InfiniteScroll.css";
import Squares from './Squares';

gsap.registerPlugin(Observer);

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  width?: string;
  maxHeight?: string;
  negativeMargin?: string;
  items?: InfiniteScrollItem[];
  itemMinHeight?: number;
  isTilted?: boolean;
  tiltDirection?: "left" | "right";
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: "down" | "up";
  pauseOnHover?: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = "30rem",
  maxHeight = "100%",
  negativeMargin = "-0.5em",
  items = [],
  itemMinHeight = 150,
  isTilted = false,
  tiltDirection = "left",
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "down",
  pauseOnHover = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const getTiltTransform = (): string => {
    if (!isTilted) return "none";
    return tiltDirection === "left"
      ? "rotateX(20deg) rotateZ(-20deg) skewX(20deg)"
      : "rotateX(20deg) rotateZ(20deg) skewX(-20deg)";
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);
    const itemHeight = firstItem.offsetHeight;
    const itemMarginTop = parseFloat(itemStyle.marginTop) || 0;
    const totalItemHeight = itemHeight + itemMarginTop;
    const totalHeight =
      itemHeight * items.length + itemMarginTop * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalHeight, totalHeight);

    divItems.forEach((child, i) => {
      const y = i * totalItemHeight;
      gsap.set(child, { y });
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: ({ target }) => {
        (target as HTMLElement).style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        (target as HTMLElement).style.cursor = "grab";
      },
      onChange: ({ deltaY, isDragging, event }) => {
        const d = event.type === "wheel" ? -deltaY : deltaY;
        const distance = isDragging ? d * 5 : d * 10;
        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            y: `+=${distance}`,
            modifiers: {
              y: gsap.utils.unitize(wrapFn),
            },
          });
        });
          // if (backgroundRef.current) {
          //   gsap.to(backgroundRef.current, {
          //     duration: 0.5,
          //     ease: "expo.out",
          //     y: `+=${distance * 0.3}`,
          //   });
          // }
      },
    });

    let rafId: number;
      if (autoplay) {
        const directionFactor = autoplayDirection === "down" ? 1 : -1;
        // Increase speed when not scrolling or dragging
        const speedPerFrame = autoplaySpeed * directionFactor * 6;

        const tick = () => {
          divItems.forEach((child) => {
            gsap.set(child, {
              y: `+=${speedPerFrame}`,
              modifiers: {
                y: gsap.utils.unitize(wrapFn),
              },
            });
          });
          // if (backgroundRef.current) {
          //   gsap.set(backgroundRef.current, {
          //     y: `+=${speedPerFrame * 0.3}`,
          //   });
          // }
          rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        if (pauseOnHover) {
          const stopTicker = () => rafId && cancelAnimationFrame(rafId);
          const startTicker = () => {
            rafId = requestAnimationFrame(tick);
          };

          container.addEventListener("mouseenter", stopTicker);
          container.addEventListener("mouseleave", startTicker);

          return () => {
            observer.kill();
            stopTicker();
            container.removeEventListener("mouseenter", stopTicker);
            container.removeEventListener("mouseleave", startTicker);
          };
        } else {
          return () => {
            observer.kill();
            rafId && cancelAnimationFrame(rafId);
          };
        }
      }

    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
    }, [
      items,
      autoplay,
      autoplaySpeed,
      autoplayDirection,
      pauseOnHover,
      isTilted,
      tiltDirection,
      negativeMargin,
    ]);

    // Set initial tilt transform for background
    if (backgroundRef.current) {
      gsap.set(backgroundRef.current, {
        transform: getTiltTransform(),
      });
    }

  return (
    <>
      <style>
        {`
          .infinite-scroll-wrapper {
            max-height: ${maxHeight};
          }

          .infinite-scroll-container {
            width: ${width};
          }

          .infinite-scroll-item {
            height: ${itemMinHeight}px;
            margin-top: ${negativeMargin};
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 1rem;
            box-shadow: 0 4px 30px rgba(255, 255, 255, 0.1);
            color: white;
          }
        `}
      </style>

      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <Squares
          className="squares-background-canvas"
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(255,255,255,0.3)"
          hoverFillColor="rgba(0,0,0,0)"
          style={{ transform: getTiltTransform() }}
        />
        <div className="infinite-scroll-background" ref={backgroundRef} />
        <div
          className="infinite-scroll-container"
          ref={containerRef}
          style={{
            transform: getTiltTransform(),
          }}
        >
          {items.map((item, i) => (
            <div className="infinite-scroll-item" key={i}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
