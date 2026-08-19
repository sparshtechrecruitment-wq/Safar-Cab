
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', animated = false }) => {
  const dimensions = {
    sm: 32,
    md: 48,
    lg: 96,
    xl: 140
  };
  
  const pxSize = dimensions[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative ${animated ? 'animate-float' : ''}`} style={{ width: pxSize, height: pxSize }}>
         <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
            {/* Shield Background */}
            <path d="M50 2L90 15V45C90 75 50 98 50 98C50 98 10 75 10 45V15L50 2Z" fill="#0D6E63" stroke="#004D40" strokeWidth="2"/>
            
            {/* Inner Shield Shine */}
            <path d="M50 5L85 17V45C85 70 50 90 50 90V5Z" fill="#0F766E" fillOpacity="0.3" />

            {/* Road Background */}
            <path d="M50 40L25 90H75L50 40Z" fill="#111827"/>
            
            {/* Road Stripes */}
            <path d="M50 45V55" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 62V72" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 80V90" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            
            {/* Shield Outline Highlight */}
            <path d="M50 2L90 15V45C90 75 50 98 50 98" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
         </svg>
      </div>
      {size !== 'sm' && (
          <div className={`font-serif font-bold text-safar-900 tracking-tight mt-3 ${size === 'xl' ? 'text-4xl' : size === 'lg' ? 'text-3xl' : 'text-xl'}`}>
            Safar<span className="text-safar-500">Yatra</span>
          </div>
      )}
    </div>
  );
};
