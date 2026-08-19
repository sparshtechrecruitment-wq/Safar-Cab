import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { JourneyData, AIJourneyInsight } from '../types';
import { CAR_FLEET } from '../constants';
import { getJourneyInsights } from '../services/geminiService';
import { Map, Coffee, Info, Car, Loader, RefreshCw, ChevronRight, Sparkles } from 'lucide-react';

interface SummaryProps {
  data: JourneyData;
  onProceed: () => void;
  onBack: () => void;
}

const LOADING_TRIVIA = [
  "Did you know? The Mumbai-Pune Expressway was India's first 6-lane high-speed access-controlled expressway.",
  "Travel Tip: Taking a break every 2 hours keeps the driver fresh and the journey safer.",
  "Nashik is not just a spiritual destination; it produces about 80% of India's wine.",
  "Lonavala's famous 'Chikki' was originally invented to provide energy to railway workers.",
  "Safar pilots are specifically verified for their patience and driving smoothness.",
  "Listening to instrumental music during a drive is proven to reduce travel fatigue.",
  "The Sahyadri ranges come alive with over 100 waterfalls during the monsoon season."
];

export const Summary: React.FC<SummaryProps> = ({ data, onProceed, onBack }) => {
  const [insight, setInsight] = useState<AIJourneyInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [triviaIndex, setTriviaIndex] = useState(0);

  const car = CAR_FLEET.find(c => c.id === data.selectedCarId);

  const fetchInsights = async () => {
    setLoading(true);
    const result = await getJourneyInsights(data.origin, data.destination, data.intent || 'leisure');
    setInsight(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [data.origin, data.destination, data.intent]);

  // Rotate trivia while loading
  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setTriviaIndex((prev) => (prev + 1) % LOADING_TRIVIA.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (!car) return <div>Error loading selection</div>;

  return (
    <div className="fade-in max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      
      {/* Left Column: Booking Details & Pricing */}
      <div className="space-y-6">
        <h2 className="font-serif text-3xl text-safar-900">Review Journey</h2>
        
        <div className="bg-white p-6 rounded-3xl border border-safar-100 shadow-sm space-y-6">
          {/* Route */}
          <div className="flex items-start gap-4">
             <div className="flex flex-col items-center gap-1 pt-1">
               <div className="w-3 h-3 bg-safar-400 rounded-full"></div>
               <div className="w-0.5 h-10 bg-safar-200 border-l border-dashed border-safar-400"></div>
               <div className="w-3 h-3 bg-safar-800 rounded-full"></div>
             </div>
             <div className="flex-1 space-y-4">
                <div className="flex justify-between">
                   <div>
                       <p className="text-xs text-safar-500 uppercase tracking-wider">Pickup</p>
                       <p className="font-semibold text-lg">{data.origin}</p>
                       <p className="text-sm text-safar-500">{data.date}</p>
                   </div>
                </div>
                <div>
                   <p className="text-xs text-safar-500 uppercase tracking-wider">Drop</p>
                   <p className="font-semibold text-lg">{data.destination}</p>
                </div>
             </div>
          </div>
          
          <hr className="border-safar-100" />

          {/* Car & Pilot */}
          <div className="flex items-center gap-4">
             <img src={car.imageUrl} className="w-20 h-14 object-cover rounded-lg" alt="car" />
             <div className="flex-1">
               <p className="font-bold text-safar-900">{car.name}</p>
               <p className="text-sm text-safar-600">Pilot: {car.driver.name}</p>
             </div>
             <div className="text-right">
                <span className="block font-bold text-safar-900">₹{car.pricePerKm}/km</span>
             </div>
          </div>

          <hr className="border-safar-100" />

           {/* Cost Estimation */}
           <div className="space-y-2">
               <div className="flex justify-between text-safar-600 text-sm">
                   <span>Estimated Fare ({car.category})</span>
                   <span>₹{car.estimatedTotal}</span>
               </div>
               <div className="flex justify-between text-safar-600 text-sm">
                   <span>Tolls & State Tax</span>
                   <span>Excluded</span>
               </div>
               <div className="flex justify-between font-bold text-lg text-safar-900 pt-2 border-t border-safar-50 mt-2">
                   <span>Advance to Pay</span>
                   <span>₹500</span>
               </div>
               <p className="text-xs text-safar-400 mt-1">Advance confirms your pilot and schedule. Remaining amount payable at destination.</p>
           </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">Edit</Button>
          <Button onClick={onProceed} className="flex-[2]">Proceed to Pay <ChevronRight size={18} /></Button>
        </div>
      </div>

      {/* Right Column: AI Assistant */}
      <div className="bg-safar-800 text-safar-50 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[500px] shadow-xl shadow-safar-200 transition-all duration-500">
        {/* Decorative BG */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-safar-700 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

        <div>
            <div className="flex items-center justify-between text-safar-200 mb-6">
                <div className="flex items-center gap-2">
                    <Map size={18} />
                    <span className="text-sm font-medium tracking-wide uppercase">Safar Smart Assistant</span>
                </div>
                {!loading && (
                    <button onClick={fetchInsights} className="hover:text-white transition-colors" title="Refresh Insights">
                        <RefreshCw size={14} />
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-80 px-4 text-center">
                    <div className="relative mb-8">
                       <div className="absolute inset-0 bg-safar-400 blur-xl opacity-20 rounded-full animate-pulse"></div>
                       <Loader size={48} className="animate-spin text-safar-200 relative z-10" />
                    </div>
                    
                    <div className="space-y-4 max-w-sm mx-auto min-h-[120px] flex flex-col justify-center">
                       <div className="flex items-center justify-center gap-2 text-safar-300 text-xs uppercase tracking-widest font-bold animate-pulse">
                          <Sparkles size={12} />
                          <span>Curating your journey</span>
                       </div>
                       
                       <p key={triviaIndex} className="text-white font-serif text-lg italic leading-relaxed fade-in">
                          "{LOADING_TRIVIA[triviaIndex]}"
                       </p>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                       {LOADING_TRIVIA.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`h-1 rounded-full transition-all duration-300 ${idx === triviaIndex ? 'w-6 bg-safar-200' : 'w-1 bg-safar-700'}`} 
                          />
                       ))}
                    </div>
                </div>
            ) : insight ? (
                <div className="space-y-6 fade-in">
                    <div>
                        <p className="font-serif text-2xl leading-snug mb-3">"{insight.summary}"</p>
                        <p className="text-safar-300 text-sm flex items-center gap-2 font-medium bg-safar-900/50 inline-block px-3 py-1 rounded-full"><Car size={14}/> {insight.estimatedDuration}</p>
                    </div>

                    <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/5">
                        <p className="text-xs text-safar-300 uppercase mb-3 flex items-center gap-2 tracking-wider font-bold"><Coffee size={12}/> Recommended Stops</p>
                        <ul className="space-y-4">
                            {insight.pitStops.map((stop, idx) => (
                                <li key={idx} className="text-sm border-l-2 border-safar-500 pl-3">
                                    <span className="font-bold block text-safar-50 text-base">{stop.name} <span className="text-xs font-normal opacity-70 ml-1">({stop.type})</span></span>
                                    <span className="text-safar-200 text-xs leading-relaxed block mt-1">{stop.reason}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-safar-200 bg-black/20 p-4 rounded-xl">
                        <Info size={16} className="mt-0.5 shrink-0 text-safar-300" />
                        <p className="leading-relaxed">{insight.culturalFact}</p>
                    </div>
                </div>
            ) : (
                 <div className="text-center mt-20">
                    <p className="text-safar-300 mb-4">Could not load insights.</p>
                    <Button variant="outline" onClick={fetchInsights} className="border-safar-500 text-safar-200 hover:bg-safar-700">Try Again</Button>
                 </div>
            )}
        </div>

        <div className="mt-8 text-center border-t border-safar-700 pt-4">
            <p className="text-xs text-safar-400">Route optimized for <span className="text-safar-200 font-bold capitalize">{data.intent}</span> travel.</p>
        </div>
      </div>
    </div>
  );
};