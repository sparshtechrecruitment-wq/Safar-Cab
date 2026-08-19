
import React, { useMemo } from 'react';
import { Search, MapPin, Heart, User, ShieldCheck, Star, Plane, Calendar, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../constants';
import { TravelIntent, Location } from '../types';

interface HomeDashboardProps {
  onPlanTrip: (options?: { destination?: string; intent?: TravelIntent }) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onViewDestination: (id: string) => void;
  onViewCategory: (category: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ onPlanTrip, favorites, onToggleFavorite, onViewDestination, onViewCategory }) => {
  const currentDate = new Date();
  const currentMonthShort = currentDate.toLocaleString('en-US', { month: 'short' });
  const currentMonthLong = currentDate.toLocaleString('en-US', { month: 'long' });
  
  // Dynamic Seasonal Logic
  const getSeasonName = () => {
    const m = currentDate.getMonth();
    if (m >= 2 && m <= 5) return 'Summer Escape';
    if (m >= 6 && m <= 8) return 'Monsoon Magic';
    return 'Winter Wonders';
  };

  const trendingLocations = useMemo(() => {
    return POPULAR_LOCATIONS.filter(loc => loc.bestMonths.includes(currentMonthShort));
  }, [currentMonthShort]);

  const spiritualPicks = useMemo(() => POPULAR_LOCATIONS.filter(l => l.type === 'Spiritual'), []);
  const favoriteLocations = POPULAR_LOCATIONS.filter(l => favorites.includes(l.id));

  const handleCategoryClick = (catId: string) => {
    if (catId === 'airport') {
        onPlanTrip({ destination: 'Ahmedabad Airport', intent: 'airport' });
    } else {
        onPlanTrip();
    }
  };

  const LocationCard = ({ location, className, isFeatured = false }: { location: Location, className?: string, isFeatured?: boolean }) => {
      const isFav = favorites.includes(location.id);
      return (
        <div 
            className={`bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-safar-100 cursor-pointer group hover:shadow-lg transition-all relative ${className}`} 
            onClick={() => onViewDestination(location.id)}
        >
            <div className={`${isFeatured ? 'h-56' : 'h-40'} overflow-hidden relative`}>
                    <img src={location.imageUrl} alt={location.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button 
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(location.id); }}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:scale-110 transition-transform z-10"
                    >
                    <Heart size={16} className={isFav ? "fill-safar-500 text-safar-500" : "text-safar-800"} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-safar-900/80 via-safar-900/20 to-transparent h-2/3"></div>
                    
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                        {isFeatured && (
                             <span className="inline-flex items-center gap-1 bg-safar-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 uppercase tracking-wide">
                                <TrendingUp size={10} /> Best in {currentMonthShort}
                             </span>
                        )}
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className={`font-bold ${isFeatured ? 'text-2xl' : 'text-lg'} leading-tight mb-0.5`}>{location.name}</h3>
                                {isFeatured && <p className="text-safar-100 text-xs line-clamp-1 opacity-90">{location.description}</p>}
                            </div>
                            <span className="text-xs font-bold flex items-center gap-1 bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg">
                                <Star size={10} className="text-route-500 fill-route-500"/> 4.8
                            </span>
                        </div>
                    </div>
            </div>
            {!isFeatured && (
                <div className="p-4">
                    <p className="text-xs text-safar-600 truncate mb-3">{location.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {location.tags.slice(0, 2).map((t, i) => (
                            <span key={i} className="text-[10px] bg-safar-50 text-safar-600 px-2 py-1 rounded-md font-bold uppercase tracking-wider">{t}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
      );
  };

  return (
    <div className="fade-in pb-24 bg-safar-50 min-h-screen">
      {/* Dynamic Header */}
      <div className="bg-gradient-to-br from-safar-800 via-safar-600 to-safar-800 text-white p-6 pt-12 rounded-b-[3rem] shadow-soft relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-safar-500 opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-safar-400 opacity-20 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
                <button className="flex items-center gap-2 text-safar-100 text-[10px] font-bold tracking-widest uppercase mb-2 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
                    <MapPin size={10} /> Trips from Vadodara
                </button>
                <h1 className="font-serif text-3xl leading-tight tracking-wide text-white drop-shadow-sm">
                    Hello,<br/>
                    <span className="text-safar-200">It's {currentMonthLong}.</span>
                </h1>
            </div>
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg hover:bg-white/20 transition-all cursor-pointer">
                <User size={24} className="text-safar-100" />
            </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:scale-[1.02] transition-all duration-300 ring-1 ring-white/50" onClick={() => onPlanTrip()}>
            <div className="bg-safar-50 p-2.5 rounded-full text-safar-600">
                <Search size={20} />
            </div>
            <div className="flex-1">
                <p className="text-safar-900 font-bold text-sm">Where do you want to go?</p>
                <p className="text-xs text-safar-500 font-medium">Search destinations, hotels...</p>
            </div>
        </div>
      </div>

      <div className="px-6 mt-8 space-y-10">
        
        {/* Vehicle Categories - Quick Access */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl text-safar-900 font-bold">Quick Book</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
                {[
                    { id: 'taxi', label: 'Taxi', icon: '🚕' },
                    { id: 'suv', label: 'SUV', icon: '🚙' },
                    { id: 'bus', label: 'Bus', icon: '🚐' },
                    { id: 'airport', label: 'Airport', icon: <Plane size={20}/> },
                ].map((cat, idx) => (
                    <button 
                        key={idx} 
                        className="flex flex-col items-center gap-2 group"
                        onClick={() => handleCategoryClick(cat.id)}
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-safar-100 flex items-center justify-center text-2xl group-hover:border-safar-400 group-hover:shadow-glow group-hover:-translate-y-1 transition-all duration-300 text-safar-600">
                            {cat.icon}
                        </div>
                        <span className="text-[10px] font-bold text-safar-600 uppercase tracking-wide">{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Trending Now Section - Dynamic */}
        <div className="fade-in">
            <div className="flex items-center justify-between mb-5 text-safar-800">
                <div className="flex items-center gap-2">
                    <div className="bg-route-500/10 p-1.5 rounded-lg">
                        <Sparkles size={18} className="text-route-600" />
                    </div>
                    <div>
                        <h2 className="font-serif text-xl font-bold">Trending in {currentMonthShort}</h2>
                        <p className="text-xs text-safar-500">Perfect weather right now</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x">
                {trendingLocations.map((loc) => (
                    <div key={loc.id} className="min-w-[260px] snap-center">
                        <LocationCard location={loc} isFeatured={true} />
                    </div>
                ))}
            </div>
        </div>

        {/* Seasonal Banner */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-lg shadow-safar-900/10 group cursor-pointer" onClick={() => onViewCategory(getSeasonName().split(' ')[0])}>
            <img 
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Season Special"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-safar-900/90 via-safar-900/40 to-transparent"></div>
            <div className="relative p-8 flex flex-col justify-center h-48">
                <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block border border-white/20 shadow-sm self-start">
                    {getSeasonName()}
                </span>
                <h3 className="font-serif text-3xl text-white mb-2 leading-none">Nature's<br/>Calling</h3>
                <div className="flex items-center gap-2 text-safar-100 text-sm font-medium mt-2 group-hover:gap-4 transition-all">
                    <span>Explore Curated Trips</span> <ArrowRight size={16} />
                </div>
            </div>
        </div>

        {/* Spiritual Section */}
        <div className="pb-8">
             <div className="flex justify-between items-end mb-5">
                <div className="flex items-center gap-2 text-safar-800">
                    <div className="bg-safar-50 p-1.5 rounded-lg">
                        <Calendar size={18} className="text-safar-500" />
                    </div>
                    <h2 className="font-serif text-xl font-bold">Spiritual Journeys</h2>
                </div>
                <button className="text-xs text-safar-500 font-bold uppercase tracking-wider hover:text-safar-800 transition-colors" onClick={() => onViewCategory('Spiritual')}>View All</button>
            </div>
             <div className="space-y-4">
                 {spiritualPicks.slice(0, 3).map((loc, idx) => (
                     <div key={loc.id} className="bg-white p-4 rounded-3xl shadow-sm border border-safar-100 flex items-center gap-4 hover:border-safar-400 hover:shadow-sm hover:-translate-y-1 transition-all duration-300 cursor-pointer group" onClick={() => onViewDestination(loc.id)}>
                         <img src={loc.imageUrl} alt={loc.name} className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                         <div className="flex-1">
                             <h4 className="font-bold text-lg text-safar-900 mb-1">{loc.name}</h4>
                             <p className="text-xs text-safar-500 line-clamp-1 mb-2">{loc.description}</p>
                             <span className="inline-block text-[10px] bg-safar-50 text-safar-600 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider border border-safar-100">
                                {loc.season} Special
                             </span>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-safar-50 flex items-center justify-center text-safar-400 group-hover:bg-safar-600 group-hover:text-white transition-colors">
                            <ArrowRight size={16} />
                         </div>
                     </div>
                 ))}
             </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex justify-between items-center px-4 py-6 bg-safar-50 rounded-3xl border border-safar-100 text-center">
            <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={20} className="text-safar-600 mb-1" />
                <span className="text-[10px] font-bold text-safar-800 uppercase">Verified<br/>Pilots</span>
            </div>
            <div className="w-px h-8 bg-safar-200"></div>
            <div className="flex flex-col items-center gap-1">
                <Star size={20} className="text-route-500 mb-1" />
                <span className="text-[10px] font-bold text-safar-800 uppercase">Top<br/>Rated</span>
            </div>
            <div className="w-px h-8 bg-safar-200"></div>
            <div className="flex flex-col items-center gap-1">
                <Heart size={20} className="text-safar-500 mb-1" />
                <span className="text-[10px] font-bold text-safar-800 uppercase">Family<br/>Safe</span>
            </div>
        </div>

      </div>
    </div>
  );
};
