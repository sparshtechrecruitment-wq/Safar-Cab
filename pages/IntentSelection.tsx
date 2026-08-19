
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { INTENTS, INTENT_DISCOVERY_CONFIG, POPULAR_LOCATIONS } from '../constants';
import { TravelIntent, Location } from '../types';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Star, Clock, Heart, CheckCircle2 } from 'lucide-react';
import { Modal } from '../components/Modal';

interface IntentSelectionProps {
  onSelect: (intent: TravelIntent, destination?: string) => void;
  onBack: () => void;
}

export const IntentSelection: React.FC<IntentSelectionProps> = ({ onSelect, onBack }) => {
  const [view, setView] = useState<'grid' | 'explore'>('grid');
  const [activeIntent, setActiveIntent] = useState<TravelIntent | null>(null);
  const [viewingLocation, setViewingLocation] = useState<Location | null>(null);

  const handleIntentClick = (intentId: TravelIntent) => {
    // If intent has no discovery data (e.g. business/airport), fall back to standard select
    if (!INTENT_DISCOVERY_CONFIG[intentId]) {
        onSelect(intentId);
        return;
    }
    setActiveIntent(intentId);
    setView('explore');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (view === 'explore') {
        setView('grid');
        setActiveIntent(null);
    } else {
        onBack();
    }
  };

  // --- SCREEN 1: INTENT GRID ---
  if (view === 'grid') {
    return (
      <div className="fade-in max-w-5xl mx-auto px-4 pb-12 pt-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-5xl text-safar-900 mb-4 leading-tight">Who are you<br/>traveling with?</h2>
          <p className="text-safar-500 max-w-md mx-auto">We curate the journey, pilot, and pit-stops based on your company.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INTENTS.map((intent, idx) => (
            <div
              key={intent.id}
              onClick={() => handleIntentClick(intent.id)}
              className="group relative h-64 md:h-80 rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={intent.image} 
                alt={intent.label} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-safar-900/90 via-safar-900/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-3xl mb-2 text-white">{intent.icon}</div>
                        <h3 className="text-2xl font-serif text-white font-bold mb-2">{intent.label}</h3>
                        <p className="text-safar-100 text-sm font-medium opacity-90">{intent.description}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-white group-hover:text-safar-900 transition-colors">
                        <ArrowRight size={20} />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
             <button onClick={() => onSelect('business')} className="px-6 py-3 rounded-full border border-safar-200 text-safar-600 font-bold hover:bg-safar-50 transition-colors text-sm">
                 Skip for Business Booking
             </button>
             <button onClick={() => onSelect('airport')} className="px-6 py-3 rounded-full border border-safar-200 text-safar-600 font-bold hover:bg-safar-50 transition-colors text-sm">
                 Book Airport Transfer
             </button>
        </div>
      </div>
    );
  }

  // --- SCREEN 2: EXPLORE FEED ---
  const config = INTENT_DISCOVERY_CONFIG[activeIntent!];
  const featuredLocs = config.featured.map(id => POPULAR_LOCATIONS.find(l => l.id === id)).filter(Boolean) as Location[];
  const shortTrips = config.shortTrips.map(id => POPULAR_LOCATIONS.find(l => l.id === id)).filter(Boolean) as Location[];
  const moreDestinations = config.moreDestinations.map(id => POPULAR_LOCATIONS.find(l => l.id === id)).filter(Boolean) as Location[];

  return (
    <div className="fade-in pb-20 -mt-6">
        {/* Sticky Nav */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-safar-100 px-4 py-3 flex items-center gap-4">
            <button onClick={handleBack} className="p-2 hover:bg-safar-50 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-safar-900"/>
            </button>
            <span className="font-serif font-bold text-lg text-safar-900">Explore {config.title}</span>
        </div>

        {/* Hero */}
        <div className="relative h-[60vh] md:h-[500px]">
            <img src={config.heroImage} className="w-full h-full object-cover" alt={config.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-safar-50 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-6 md:left-12 max-w-xl">
                 <span className="bg-safar-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block shadow-lg">Curated Collection</span>
                 <h1 className="font-serif text-4xl md:text-6xl text-safar-900 mb-4 leading-tight">
                    {config.title}
                 </h1>
                 <p className="text-safar-700 text-lg font-medium">{config.subtitle}</p>
            </div>
        </div>

        <div className="px-6 -mt-8 relative z-10 space-y-16">
            
            {/* 1. Featured Carousel */}
            <div>
                 <div className="flex justify-between items-end mb-6">
                    <h2 className="font-serif text-2xl text-safar-900">Featured Destinations</h2>
                 </div>
                 <div className="flex gap-4 overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide snap-x">
                    {featuredLocs.map(loc => (
                        <div 
                            key={loc.id} 
                            onClick={() => setViewingLocation(loc)}
                            className="min-w-[280px] h-[350px] rounded-3xl relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all snap-center"
                        >
                            <img src={loc.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={loc.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-safar-900/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <h3 className="font-serif text-2xl font-bold mb-1">{loc.name}</h3>
                                <p className="text-safar-100 text-sm mb-2 opacity-90 line-clamp-1">{loc.description}</p>
                                <span className="inline-block bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">{loc.type}</span>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

            {/* 2. Popular Routes */}
            {config.routes.length > 0 && (
                <div>
                    <h2 className="font-serif text-2xl text-safar-900 mb-6">Popular Routes</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                        {config.routes.map((route, idx) => (
                            <div key={idx} className="min-w-[300px] bg-white rounded-2xl p-3 shadow-sm border border-safar-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all">
                                <img src={route.image} className="w-20 h-20 rounded-xl object-cover" alt="route" />
                                <div>
                                    <div className="flex items-center gap-2 text-safar-900 font-bold mb-1">
                                        <span>{route.from}</span>
                                        <ArrowRight size={14} className="text-safar-400"/>
                                        <span>{route.to}</span>
                                    </div>
                                    <div className="flex gap-3 text-xs text-safar-500">
                                        <span className="flex items-center gap-1"><MapPin size={12}/> {route.distance}</span>
                                    </div>
                                    <button 
                                        onClick={() => onSelect(activeIntent!, route.to)}
                                        className="text-xs font-bold text-safar-600 mt-2 uppercase tracking-wide hover:text-safar-800"
                                    >
                                        View Route
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 3. Short Trips Grid */}
            <div>
                <h2 className="font-serif text-2xl text-safar-900 mb-6">Short Weekend Trips</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {shortTrips.map(loc => (
                        <div 
                            key={loc.id} 
                            onClick={() => setViewingLocation(loc)}
                            className="bg-white rounded-2xl p-2 border border-safar-100 flex items-center gap-4 cursor-pointer hover:border-safar-300 transition-all group"
                        >
                             <img src={loc.imageUrl} className="w-24 h-24 rounded-xl object-cover" alt={loc.name} />
                             <div>
                                 <h3 className="font-bold text-lg text-safar-900">{loc.name}</h3>
                                 <span className="text-xs font-bold text-safar-500 uppercase tracking-wide bg-safar-50 px-2 py-0.5 rounded-md inline-block mb-2 mt-1">{loc.idealDuration}</span>
                                 <p className="text-xs text-safar-400">Ideal for {config.title}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. More Places */}
            <div>
                <h2 className="font-serif text-2xl text-safar-900 mb-6">More to Explore</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {moreDestinations.map(loc => (
                         <div 
                            key={loc.id} 
                            onClick={() => setViewingLocation(loc)}
                            className="group cursor-pointer"
                         >
                             <div className="aspect-square rounded-2xl overflow-hidden mb-2 relative">
                                 <img src={loc.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={loc.name} />
                                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                             </div>
                             <h3 className="font-bold text-safar-900">{loc.name}</h3>
                             <p className="text-xs text-safar-500">{loc.type}</p>
                         </div>
                     ))}
                </div>
            </div>

            <div className="pt-8 text-center">
                 <Button variant="outline" onClick={() => onSelect(activeIntent!)}>
                    Skip Discovery & Plan My Own
                 </Button>
            </div>
        </div>

        {/* SCREEN 3: DESTINATION DETAIL MODAL */}
        {viewingLocation && (
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slide-down">
                 <div className="relative h-[50vh]">
                     <img src={viewingLocation.imageUrl} className="w-full h-full object-cover" alt={viewingLocation.name} />
                     <button 
                        onClick={() => setViewingLocation(null)}
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors"
                     >
                         <ArrowRight size={24} className="rotate-90" /> {/* Close Iconish */}
                     </button>
                     <div className="absolute inset-0 bg-gradient-to-t from-safar-900 to-transparent"></div>
                     <div className="absolute bottom-8 left-6 right-6 text-white">
                         <div className="flex gap-2 mb-3">
                             {viewingLocation.tags.map(t => (
                                 <span key={t} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-white/20">{t}</span>
                             ))}
                         </div>
                         <h1 className="font-serif text-5xl font-bold mb-2">{viewingLocation.name}</h1>
                         <div className="flex items-center gap-4 text-sm font-medium opacity-90">
                             <span className="flex items-center gap-1"><MapPin size={16}/> {viewingLocation.distanceFromBase || 'Gujarat'}</span>
                             <span className="flex items-center gap-1"><Clock size={16}/> {viewingLocation.idealDuration || '2 Days'}</span>
                         </div>
                     </div>
                 </div>

                 <div className="px-6 py-8 max-w-3xl mx-auto space-y-8 pb-32">
                     <div>
                         <h2 className="font-serif text-2xl text-safar-900 mb-3">About the Destination</h2>
                         <p className="text-safar-600 leading-relaxed text-lg">{viewingLocation.description}. Perfect for travelers looking to experience the authentic culture and landscapes of the region.</p>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                         <div className="bg-safar-50 p-4 rounded-2xl border border-safar-100">
                             <span className="text-xs font-bold text-safar-400 uppercase tracking-wider block mb-2">Best Time</span>
                             <div className="flex items-center gap-2 text-safar-900 font-bold">
                                 <Calendar size={18} className="text-safar-500" />
                                 {viewingLocation.season}
                             </div>
                         </div>
                         <div className="bg-safar-50 p-4 rounded-2xl border border-safar-100">
                             <span className="text-xs font-bold text-safar-400 uppercase tracking-wider block mb-2">Travel Style</span>
                             <div className="flex items-center gap-2 text-safar-900 font-bold">
                                 <Star size={18} className="text-safar-500" />
                                 {viewingLocation.type}
                             </div>
                         </div>
                     </div>

                     {viewingLocation.familyFriendly && (
                         <div className="flex items-center gap-3 bg-green-50 p-4 rounded-2xl text-green-800 border border-green-100">
                             <CheckCircle2 size={24} />
                             <div>
                                 <p className="font-bold">Family Friendly Verified</p>
                                 <p className="text-xs text-green-700">Safe roads, clean stops, and verified family pilots available.</p>
                             </div>
                         </div>
                     )}
                 </div>

                 {/* Sticky Footer CTA */}
                 <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-safar-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex gap-4 items-center z-50">
                     <button className="p-4 rounded-xl border border-safar-200 text-safar-600 hover:bg-safar-50 transition-colors">
                         <Heart size={20} />
                     </button>
                     <Button 
                        fullWidth 
                        onClick={() => onSelect(activeIntent!, viewingLocation.name)}
                        className="py-4 text-lg shadow-xl shadow-safar-500/20"
                     >
                         Plan Trip to {viewingLocation.name}
                     </Button>
                 </div>
            </div>
        )}
    </div>
  );
};
