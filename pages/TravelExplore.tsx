
import React, { useState } from 'react';
import { Bell, ArrowRight, Calendar, MapPin, Plane, CheckCircle2 } from 'lucide-react';
import { EXPLORE_DATA, ExploreItem } from '../constants';
import { TravelIntent } from '../types';
import { Button } from '../components/Button';

interface TravelExploreProps {
  onPlanTrip: (options?: { destination?: string; intent?: TravelIntent }) => void;
}

export const TravelExplore: React.FC<TravelExploreProps> = ({ onPlanTrip }) => {
  const [notified, setNotified] = useState<string[]>([]);

  const handleNotify = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (notified.includes(id)) {
        setNotified(prev => prev.filter(item => item !== id));
    } else {
        setNotified(prev => [...prev, id]);
    }
  };

  const TripCard = ({ item }: { item: ExploreItem }) => (
    <div 
        className="min-w-[280px] h-[360px] rounded-3xl relative overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-safar-900"
        onClick={() => onPlanTrip({ destination: item.name, intent: item.intent })}
    >
        <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-safar-900 via-safar-900/20 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-md uppercase tracking-wider border border-white/10">
                    {item.type}
                </span>
                <span className="text-[10px] font-bold bg-safar-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                    <Calendar size={10} /> {item.duration}
                </span>
            </div>
            
            <h3 className="font-serif text-3xl text-white mb-1 leading-none">{item.name}</h3>
            
            <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 flex items-center gap-3 mt-4">
                 <Button 
                    className="h-10 text-xs px-4 bg-white text-safar-900 hover:bg-safar-100 border-none" 
                    onClick={(e) => { e.stopPropagation(); onPlanTrip({ destination: item.name, intent: item.intent }); }}
                 >
                    Plan Trip
                 </Button>
                 <button 
                    onClick={(e) => handleNotify(item.id, e)}
                    className={`h-10 w-10 rounded-xl flex items-center justify-center backdrop-blur-md border transition-all ${notified.includes(item.id) ? 'bg-safar-500 border-safar-500 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                 >
                    {notified.includes(item.id) ? <CheckCircle2 size={18} /> : <Bell size={18} />}
                 </button>
            </div>
            
            {/* Mobile simplified view since hover doesn't work well on touch */}
            <div className="md:hidden flex items-center gap-3 mt-4">
                 <span className="text-sm font-bold text-safar-200 flex items-center gap-1">Tap to Plan <ArrowRight size={14}/></span>
            </div>
        </div>
    </div>
  );

  return (
    <div className="fade-in pt-6 pb-6 bg-safar-50">
        
        {/* Header */}
        <div className="px-6 mb-8">
            <span className="text-xs font-bold text-safar-500 uppercase tracking-widest mb-2 block">Discover Gujarat</span>
            <h1 className="font-serif text-4xl text-safar-900 leading-tight">Explore<br/><span className="text-safar-600">Curated Journeys</span></h1>
        </div>

        {/* Featured / Seasonal Banner */}
        <div className="px-6 mb-12">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-glow h-96 group cursor-pointer" onClick={() => onPlanTrip({ destination: 'Rann of Kutch', intent: 'leisure' })}>
                <img 
                    src="https://www.gujarattourism.com/content/dam/gujrattourism/images/white-rann-experience/white-rann-experience-banner.jpg" 
                    alt="Rann Utsav" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-safar-900/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="inline-block bg-safar-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">Season Special</span>
                    <h2 className="font-serif text-4xl mb-2">Rann of Kutch</h2>
                    <p className="text-safar-100 text-sm max-w-xs mb-6 line-clamp-2">Experience the surreal white desert under the full moon. The Rann Utsav is calling.</p>
                    <div className="flex gap-4">
                        <Button className="bg-white text-safar-900 hover:bg-safar-50 border-none px-6">Plan Now</Button>
                        <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-safar-200 transition-colors bg-black/20 backdrop-blur-md px-4 py-3 rounded-xl">
                            <Bell size={16} /> Get Updates
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Dynamic Sections */}
        <div className="space-y-12">
            {EXPLORE_DATA.map((section) => (
                <div key={section.title} className="pl-6">
                    <div className="pr-6 mb-4 flex justify-between items-end">
                        <div>
                            <h2 className="font-serif text-2xl text-safar-900">{section.title}</h2>
                            <p className="text-xs text-safar-500 font-medium mt-1">{section.subtitle}</p>
                        </div>
                        <button className="w-10 h-10 rounded-full border border-safar-200 flex items-center justify-center text-safar-400 hover:bg-safar-100 hover:text-safar-900 transition-colors">
                            <ArrowRight size={18} />
                        </button>
                    </div>
                    
                    <div className="flex gap-4 overflow-x-auto pb-8 pr-6 scrollbar-hide snap-x">
                        {section.items.map(item => (
                            <div key={item.id} className="snap-center">
                                <TripCard item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Airport Utility Section */}
        <div className="mx-6 bg-white rounded-3xl p-6 border border-safar-100 shadow-sm mt-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-all" onClick={() => onPlanTrip({ destination: 'Ahmedabad Airport', intent: 'airport' })}>
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-safar-50 rounded-2xl flex items-center justify-center text-safar-600">
                    <Plane size={28} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-safar-900">Airport Transfer</h3>
                    <p className="text-xs text-safar-500">Punctual pickups & spacious boot</p>
                </div>
            </div>
            <div className="bg-safar-900 text-white px-4 py-2 rounded-xl text-sm font-bold">
                Book
            </div>
        </div>

        <div className="text-center mt-12 mb-8 px-8">
            <p className="text-xs text-safar-400 uppercase tracking-widest mb-2">Coming Soon</p>
            <p className="text-safar-300 text-sm">More curated experiences across India are being mapped by our scouts.</p>
        </div>

    </div>
  );
};
