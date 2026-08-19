
import React from 'react';
import { Button } from '../components/Button';
import { ArrowRight, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from '../components/Logo';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* Abstract Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-safar-200/30 rounded-full blur-3xl -z-10" />

      <div className="fade-in max-w-3xl flex flex-col items-center">
        
        <div className="mb-6">
            <Logo size="xl" animated />
        </div>
        
        <h1 className="font-serif text-3xl md:text-5xl text-safar-900 mb-6 leading-tight">
          Travel for the journey, <br/> not just the destination.
        </h1>
        
        <p className="text-safar-600 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
          Premium intercity travel with verified pilots. We focus on comfort, safety, and the memories you make along the way.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={onStart} className="text-lg px-10 py-4 shadow-xl shadow-safar-200/50">
            Plan Your Safar <ArrowRight size={20} />
            </Button>
            <Button variant="ghost" className="text-safar-700">
                How Safar Works
            </Button>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 text-center text-safar-600 fade-in w-full max-w-4xl" style={{animationDelay: '0.2s'}}>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-white p-3 rounded-full shadow-sm text-safar-800 mb-1">
             <ShieldCheck size={24} />
          </div>
          <div>
            <span className="block font-serif text-xl text-safar-900 font-bold">50k+</span>
            <span className="text-sm">Safe Journeys</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <div className="bg-white p-3 rounded-full shadow-sm text-safar-800 mb-1">
             <Heart size={24} />
            </div>
            <div>
            <span className="block font-serif text-xl text-safar-900 font-bold">4.9/5</span>
            <span className="text-sm">Family Rated</span>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2">
            <div className="bg-white p-3 rounded-full shadow-sm text-safar-800 mb-1">
             <Sparkles size={24} />
            </div>
            <div>
            <span className="block font-serif text-xl text-safar-900 font-bold">100%</span>
            <span className="text-sm">Verified Pilots</span>
            </div>
        </div>
      </div>
    </div>
  );
};
