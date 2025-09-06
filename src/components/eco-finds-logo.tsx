import React from 'react';

interface EcoFindsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function EcoFindsLogo({ className = '', size = 'md' }: EcoFindsLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} group cursor-pointer`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <style>
          {`
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-2px); }
            }
            .animate-spin-slow {
              animation: spin-slow 8s linear infinite;
              transform-origin: center;
            }
            .animate-pulse-glow {
              animation: pulse-glow 3s ease-in-out infinite;
            }
            .animate-float {
              animation: float 4s ease-in-out infinite;
            }
            .group:hover .hover-spin {
              animation: spin-slow 2s linear infinite;
            }
          `}
        </style>
        
        {/* Modern eco logo with earth/globe and recycling theme */}
        <defs>
          <linearGradient id="ecoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4D2D18" />
            <stop offset="50%" stopColor="#8A6240" />
            <stop offset="100%" stopColor="#4C6444" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CABA9C" />
            <stop offset="100%" stopColor="#4C6444" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Earth/Globe background with subtle animation */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="url(#ecoGradient)"
          className="drop-shadow-lg animate-pulse-glow"
          filter="url(#glow)"
        />
        
        {/* Rotating circular arrows for circular economy */}
        <g className="animate-spin-slow hover-spin">
          <path
            d="M 12 20 A 8 8 0 1 1 28 20"
            stroke="#CABA9C"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M 26 18 L 28 20 L 26 22"
            stroke="#CABA9C"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        
        {/* Counter-rotating inner circle */}
        <g className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }}>
          <path
            d="M 28 20 A 8 8 0 1 1 12 20"
            stroke="#CABA9C"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="3 2"
            opacity="0.7"
          />
          <path
            d="M 14 22 L 12 20 L 14 18"
            stroke="#CABA9C"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        
        {/* Central recycling symbol */}
        <g className="animate-float">
          <circle
            cx="20"
            cy="20"
            r="5"
            fill="#102320"
            opacity="0.1"
          />
          <path
            d="M 17 17 L 20 14 L 23 17 M 23 23 L 20 26 L 17 23 M 20 17 L 20 23"
            stroke="#CABA9C"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse-glow"
          />
        </g>
        
        {/* Floating eco particles */}
        <circle cx="12" cy="12" r="1" fill="#CABA9C" className="animate-float" style={{ animationDelay: '0.5s' }} opacity="0.8" />
        <circle cx="28" cy="12" r="1" fill="#CABA9C" className="animate-float" style={{ animationDelay: '1.5s' }} opacity="0.6" />
        <circle cx="28" cy="28" r="1" fill="#CABA9C" className="animate-float" style={{ animationDelay: '2.5s' }} opacity="0.8" />
        <circle cx="12" cy="28" r="1" fill="#CABA9C" className="animate-float" style={{ animationDelay: '3s' }} opacity="0.6" />
      </svg>
    </div>
  );
}

interface EcoFindsWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function EcoFindsWordmark({ className = '', size = 'md' }: EcoFindsWordmarkProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <span className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-[#4D2D18] via-[#8A6240] to-[#4C6444] bg-clip-text text-transparent ${className} transition-all duration-300 hover:scale-105`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      EcoFinds
    </span>
  );
}

interface EcoFindsBrandProps {
  className?: string;
  logoSize?: 'sm' | 'md' | 'lg' | 'xl';
  textSize?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

export function EcoFindsBrand({ 
  className = '', 
  logoSize = 'md', 
  textSize = 'md', 
  orientation = 'horizontal' 
}: EcoFindsBrandProps) {
  const containerClass = orientation === 'horizontal' 
    ? 'flex items-center gap-3' 
    : 'flex flex-col items-center gap-2';

  return (
    <div className={`${containerClass} ${className}`}>
      <EcoFindsLogo size={logoSize} />
      <EcoFindsWordmark size={textSize} />
    </div>
  );
}