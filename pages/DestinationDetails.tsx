import React, { useMemo } from 'react';
import { Location } from '../types';
import { POPULAR_LOCATIONS } from '../constants';
import { SMART_DESTINATIONS } from '../data/destinations';
import { ArrowLeft, MapPin, Clock, Wallet, Star, Calendar, Share2, Heart, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';

interface DestinationDetailsProps {
    destinationId: string;
    onBack: () => void;
    onPlanTrip: (options?: { destination?: string }) => void;
}

export const DestinationDetails: React.FC<DestinationDetailsProps> = ({ destinationId, onBack, onPlanTrip }) => {
    // Look up location from unified data sources
    const location = useMemo<Location | undefined>(() => {
        return SMART_DESTINATIONS.find(d => d.id === destinationId) || POPULAR_LOCATIONS.find(d => d.id === destinationId);
    }, [destinationId]);

    if (!location) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2>Destination not found</h2>
                <Button onClick={onBack}>Go Back</Button>
            </div>
        );
    }

    // Safely parse properties or provide defaults
    const images = location.images && location.images.length > 0 ? location.images : [location.imageUrl];
    const budget = location.estimatedBudget || 2000;
    const duration = location.averageDuration || location.idealDuration || '1 Day';
    const rating = location.userRating || 4.5;
    const activities = location.availableActivities || ['Sightseeing', 'Photography', 'Local Food'];
    const attractions = location.nearbyAttractions || ['Local Markets', 'Viewpoints'];

    return (
        <div className="min-h-screen bg-safar-50 pb-24 animate-slide-up relative">
            {/* Hero Image Section */}
            <div className="relative h-80 w-full">
                <img src={images[0]} alt={location.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-safar-50"></div>
                
                {/* Top Nav */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
                    <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                            <Share2 size={18} />
                        </button>
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                            <Heart size={18} />
                        </button>
                    </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white text-safar-900 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Star size={12} className="text-yellow-500 fill-yellow-500" /> {rating}
                        </span>
                        <span className="bg-safar-600 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            {location.season} Special
                        </span>
                    </div>
                    <h1 className="font-serif text-4xl text-safar-900 font-bold leading-tight">{location.name}</h1>
                    <p className="text-safar-600 font-medium flex items-center gap-1 mt-1">
                        <MapPin size={16} /> {location.district || location.type}, {location.state || 'Gujarat'}
                    </p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="px-6 -mt-4 relative z-10 mb-6">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-safar-100 flex justify-between items-center text-center">
                    <div>
                        <Clock size={20} className="text-safar-400 mx-auto mb-1" />
                        <p className="text-[10px] text-safar-500 font-bold uppercase">Duration</p>
                        <p className="text-sm font-bold text-safar-900">{duration}</p>
                    </div>
                    <div className="w-px h-10 bg-safar-100"></div>
                    <div>
                        <Wallet size={20} className="text-safar-400 mx-auto mb-1" />
                        <p className="text-[10px] text-safar-500 font-bold uppercase">Est. Budget</p>
                        <p className="text-sm font-bold text-safar-900">₹{budget}</p>
                    </div>
                    <div className="w-px h-10 bg-safar-100"></div>
                    <div>
                        <Calendar size={20} className="text-safar-400 mx-auto mb-1" />
                        <p className="text-[10px] text-safar-500 font-bold uppercase">Best Time</p>
                        <p className="text-sm font-bold text-safar-900">{location.bestTime || 'Anytime'}</p>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="px-6 space-y-8">
                {/* Description */}
                <section>
                    <h3 className="font-serif text-xl font-bold text-safar-900 mb-3">About the Destination</h3>
                    <p className="text-safar-600 text-sm leading-relaxed">
                        {location.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {location.tags.map(t => (
                            <span key={t} className="bg-safar-100 text-safar-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-safar-200">
                                {t}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Available Activities */}
                <section>
                    <h3 className="font-serif text-xl font-bold text-safar-900 mb-3">Top Activities</h3>
                    <ul className="grid grid-cols-2 gap-3">
                        {activities.map((act, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-safar-700">
                                <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                                <span>{act}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Details list */}
                <section className="bg-white rounded-2xl p-5 border border-safar-100 shadow-sm">
                    <h3 className="font-serif text-lg font-bold text-safar-900 mb-4 border-b border-safar-100 pb-2">Useful Information</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-safar-500">Opening Hours</span>
                            <span className="font-bold text-safar-900 text-right">{location.openingHours || '24 Hours'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-safar-500">Entry Fee</span>
                            <span className="font-bold text-safar-900 text-right">{location.entryFee || 'Free'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-safar-500">Family Friendly</span>
                            <span className="font-bold text-safar-900 text-right">{location.familyFriendly ? 'Yes, Highly' : 'Moderate'}</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-safar-100 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] sm:max-w-[400px] sm:mx-auto sm:absolute">
                <Button fullWidth onClick={() => onPlanTrip({ destination: location.name })} className="py-4 text-lg">
                    Book Ride Here
                </Button>
            </div>
        </div>
    );
};
