"use client";
import React, { useRef, useEffect } from 'react';

interface SimpleFluidGlassProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'animated' | 'ripple';
}

const SimpleFluidGlass: React.FC<SimpleFluidGlassProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === 'ripple' && glassRef.current) {
      const element = glassRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        element.style.setProperty('--mouse-x', `${x}%`);
        element.style.setProperty('--mouse-y', `${y}%`);
      };

      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, [variant]);

  const baseClasses = `
    relative overflow-hidden
    bg-gradient-to-br from-white/10 via-white/5 to-transparent
    backdrop-blur-md
    border border-white/20
    rounded-lg
    shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
    transition-all duration-300 ease-in-out
  `;

  const variantClasses = {
    default: '',
    animated: `
      hover:bg-gradient-to-br hover:from-white/15 hover:via-white/8 hover:to-transparent
      hover:border-white/30
      hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.5)]
      hover:scale-[1.02]
    `,
    ripple: `
      before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500
      before:bg-gradient-radial before:from-white/20 before:via-transparent before:to-transparent
      before:scale-0
      hover:before:opacity-100 hover:before:scale-100
      hover:border-techblue/30
      hover:shadow-[0_12px_40px_0_rgba(0,240,255,0.3)]
    `
  };

  return (
    <>
      {variant === 'ripple' && (
        <style jsx>{`
          .ripple-effect {
            --mouse-x: 50%;
            --mouse-y: 50%;
          }
          
          .ripple-effect::before {
            background: radial-gradient(
              circle at var(--mouse-x) var(--mouse-y),
              rgba(255, 255, 255, 0.2) 0%,
              rgba(0, 240, 255, 0.1) 30%,
              transparent 70%
            );
          }
          
          .ripple-effect::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 50%,
              rgba(0, 240, 255, 0.05) 100%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .ripple-effect:hover::after {
            opacity: 1;
          }
        `}</style>
      )}
      
      <div
        ref={glassRef}
        className={`
          ${baseClasses}
          ${variantClasses[variant]}
          ${variant === 'ripple' ? 'ripple-effect' : ''}
          ${className}
        `}
      >
        {/* Animated gradient overlay */}
        {variant === 'animated' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </>
  );
};

export default SimpleFluidGlass;
