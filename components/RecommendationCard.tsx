import React, { useEffect, useState } from 'react';
import { ScoredLocation } from '../services/RecommendationEngine';
import { Coordinates } from '../services/GeolocationService';
import { getDrivingRoute, RouteInfo } from '../services/RoutingService';
import { MapPin, Navigation, Star, Clock, CloudRain, Sun, Wallet, Bookmark, Share2 } from 'lucide-react';
import { Button } from './Button';

interface RecommendationCardProps {
  destination: ScoredLocation;
  userLocation: Coordinates | null;
  onBook: () => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ destination, userLocation, onBook }) => {
  const [route, setRoute] = useState<RouteInfo | null>(null);

  useEffect(() => {
    if (userLocation) {
      getDrivingRoute(userLocation, { lat: destination.lat, lng: destination.lng })
        .then(res => setRoute(res));
    }
  }, [userLocation, destination]);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-safar-100 transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <img 
          src={destination.images[0]} 
          alt={destination.name} 
          loading="lazy" 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-bold">{destination.userRating}</span>
        </div>
        <div className="absolute top-4 right-4 bg-safar-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
          <span>{destination.score.toFixed(0)} Score</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-safar-900 flex justify-between items-start">
            {destination.name}
            <div className="flex gap-2">
                <button className="text-safar-400 hover:text-red-500 transition-colors"><Bookmark size={18} /></button>
                <button className="text-safar-400 hover:text-safar-600 transition-colors"><Share2 size={18} /></button>
            </div>
          </h3>
          <p className="text-sm text-safar-500 flex items-center gap-1 mt-1">
            <MapPin size={14} /> {destination.district}, {destination.state}
          </p>
        </div>

        {/* AI Match Reasons */}
        <div className="flex flex-wrap gap-2">
            {destination.matchReasons.map((reason, idx) => (
                <span key={idx} className="bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                    ✓ {reason}
                </span>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-safar-700 bg-safar-50/50 p-3 rounded-2xl border border-safar-50">
          <div className="flex items-center gap-2">
            <Navigation size={16} className="text-safar-500" />
            <span className="font-medium">{route ? `${route.distanceKm} km` : `${destination.distanceKm} km`}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-safar-500" />
            <span className="font-medium">{route ? `${Math.floor(route.durationMinutes / 60)}h ${route.durationMinutes % 60}m` : destination.averageDuration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-safar-500" />
            <span className="font-medium">₹{destination.estimatedBudget}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-safar-500" />
            <span className="font-medium">{destination.season}</span>
          </div>
        </div>
        
        <p className="text-xs text-safar-600 line-clamp-2 leading-relaxed">
            {destination.description}
        </p>

        <div className="pt-2">
          <Button fullWidth onClick={onBook} className="py-3 text-sm tracking-wide">
            Book Ride to {destination.name}
          </Button>
        </div>
      </div>
    </div>
  );
};
