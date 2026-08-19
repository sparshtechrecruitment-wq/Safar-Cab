import React, { useEffect, useState } from 'react';
import { Compass, Map } from 'lucide-react';

interface SplashAnimationProps {
  onComplete: () => void;
}

export const SplashAnimation: React.FC<SplashAnimationProps> = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2500);

    // Unmount completely after 3 seconds
    const unmountTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#091524] transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-safar-800 rounded-full blur-[100px] opacity-60 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-safar-700 rounded-full blur-[100px] opacity-40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Floating Compass / Logo */}
        <div className="relative w-32 h-32 mb-8 animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-safar-500 to-route-500 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
            <div className="relative w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-glass">
                <Compass size={64} className="text-white animate-[spin_8s_linear_infinite]" />
                <Map size={32} className="text-safar-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80" />
            </div>
        </div>

        {/* Text Animation */}
        <div className="overflow-hidden">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-safar-200 to-safar-500 animate-slide-up">
                Safar Yantra
            </h1>
        </div>
        
        <div className="overflow-hidden mt-4">
            <p className="text-safar-400 font-medium tracking-[0.3em] uppercase text-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Enterprise Travel Engine
            </p>
        </div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-12 overflow-hidden animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="h-full bg-safar-500 w-1/2 rounded-full animate-[shimmer_2s_infinite_linear]"></div>
        </div>
      </div>
    </div>
  );
};
