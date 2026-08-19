import React, { useState } from 'react';
import { useSmartRecommendations } from '../hooks/useSmartRecommendations';
import { InteractiveMap } from '../components/InteractiveMap';
import { RecommendationCard } from '../components/RecommendationCard';
import { ScoredLocation } from '../services/RecommendationEngine';
import { CloudRain, Sun, Thermometer, Wind, RefreshCw, Loader2 } from 'lucide-react';

const PREFERENCE_CHIPS = ['Nature', 'Religious', 'Wildlife', 'Family', 'Heritage', 'Hill Station'];

export const SmartDiscovery: React.FC = () => {
  const { 
    locations, userLocation, weather, season, loading, error, 
    maxDistance, setMaxDistance, userPreferences, togglePreference, refresh 
  } = useSmartRecommendations();

  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');

  const handleBook = (dest: ScoredLocation) => {
    alert(`Starting booking flow for ${dest.name}...`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-safar-500">
        <Loader2 size={48} className="animate-spin mb-4 text-safar-600" />
        <h2 className="text-xl font-serif font-bold text-safar-900">Discovering the best places...</h2>
        <p className="text-sm">Analyzing weather, season, and your location.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <div className="bg-red-50 text-red-500 p-4 rounded-full mb-4">
          <RefreshCw size={32} />
        </div>
        <h2 className="text-xl font-serif font-bold text-safar-900 mb-2">Location Required</h2>
        <p className="text-sm text-safar-500 mb-6">{error}</p>
        <button onClick={refresh} className="bg-safar-600 text-white px-6 py-2 rounded-full font-bold">Try Again</button>
      </div>
    );
  }

  return (
    <div className="pb-24 animate-slide-down">
      {/* Dynamic Header based on Context */}
      <div className="bg-gradient-to-br from-safar-800 to-safar-600 text-white p-6 pt-12 rounded-b-[3rem] shadow-soft">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className="font-serif text-3xl font-bold mb-1">Smart Picks</h1>
                <p className="text-safar-100 text-sm">Tailored for your current conditions</p>
            </div>
        </div>

        {weather && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 grid grid-cols-4 gap-2 text-center text-sm">
                <div>
                    <Thermometer size={18} className="mx-auto mb-1 text-safar-200" />
                    <span className="font-bold block">{weather.temperature}°C</span>
                </div>
                <div>
                    {weather.isRaining ? <CloudRain size={18} className="mx-auto mb-1 text-blue-300" /> : <Sun size={18} className="mx-auto mb-1 text-yellow-300" />}
                    <span className="font-bold block">{weather.condition}</span>
                </div>
                <div>
                    <Wind size={18} className="mx-auto mb-1 text-safar-200" />
                    <span className="font-bold block">{weather.windSpeed} km/h</span>
                </div>
                <div>
                    <div className="text-safar-200 text-xs uppercase tracking-wider mb-1 font-bold">Season</div>
                    <span className="font-bold block">{season}</span>
                </div>
            </div>
        )}
      </div>

      {/* Filters */}
      <div className="px-6 mt-6 space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-safar-900">Radius: {maxDistance} KM</h3>
            <select 
                value={maxDistance} 
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="bg-safar-50 text-safar-900 border border-safar-200 rounded-lg px-3 py-1 text-sm font-bold"
            >
                <option value={50}>50 KM</option>
                <option value={100}>100 KM</option>
                <option value={200}>200 KM</option>
                <option value={300}>300 KM</option>
                <option value={500}>500 KM</option>
            </select>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
            {PREFERENCE_CHIPS.map(pref => (
                <button
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
                        userPreferences.includes(pref) 
                            ? 'bg-safar-600 text-white border-safar-600 shadow-glow' 
                            : 'bg-white text-safar-600 border-safar-200 hover:border-safar-400'
                    }`}
                >
                    {pref}
                </button>
            ))}
        </div>

        <div className="bg-safar-100 p-1 rounded-xl flex">
            <button 
                className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'list' ? 'bg-white shadow-sm text-safar-900' : 'text-safar-500'}`}
                onClick={() => setActiveTab('list')}
            >
                List View
            </button>
            <button 
                className={`flex-1 py-1.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'map' ? 'bg-white shadow-sm text-safar-900' : 'text-safar-500'}`}
                onClick={() => setActiveTab('map')}
            >
                Map View
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-6">
        {locations.length === 0 ? (
             <div className="text-center py-10 text-safar-500">
                 No destinations found within this radius. Try increasing the distance.
             </div>
        ) : activeTab === 'list' ? (
             locations.map(dest => (
                 <RecommendationCard key={dest.id} destination={dest} userLocation={userLocation} onBook={() => handleBook(dest)} />
             ))
        ) : (
            userLocation && <InteractiveMap userLocation={userLocation} destinations={locations} onMarkerClick={(dest) => console.log('Clicked', dest.name)} />
        )}
      </div>
    </div>
  );
};
