import React, { useMemo } from 'react';
import { Location } from '../types';
import { POPULAR_LOCATIONS } from '../constants';
import { SMART_DESTINATIONS } from '../data/destinations';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { Button } from '../components/Button';

interface CategoryViewProps {
    category: string; // E.g. 'Nature', 'Spiritual', 'Wildlife'
    onBack: () => void;
    onViewDestination: (id: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ category, onBack, onViewDestination }) => {
    
    // Dynamically filter destinations that match the category or tags
    const filteredDestinations = useMemo(() => {
        // Merge both databases for maximum coverage, avoiding duplicates by ID
        const allDestinations = [...SMART_DESTINATIONS, ...POPULAR_LOCATIONS.filter(p => !SMART_DESTINATIONS.some(s => s.id === p.id))];
        
        return allDestinations.filter(loc => 
            loc.category?.toLowerCase() === category.toLowerCase() || 
            loc.type?.toLowerCase() === category.toLowerCase() ||
            loc.tags.some(t => t.toLowerCase().includes(category.toLowerCase()))
        );
    }, [category]);

    return (
        <div className="bg-safar-50 pb-6 animate-slide-up flex flex-col">
            {/* Header */}
            <header className="px-6 py-4 flex items-center gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-safar-100">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-safar-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-safar-800" />
                </button>
                <div className="flex-1">
                    <h2 className="font-serif font-bold text-xl text-safar-900 capitalize">{category} Destinations</h2>
                    <p className="text-xs text-safar-500">{filteredDestinations.length} places found</p>
                </div>
            </header>

            {/* List */}
            <div className="px-6 pt-6 space-y-4 flex-1">
                {filteredDestinations.length === 0 ? (
                    <div className="text-center mt-20 text-safar-500">
                        <p>No destinations found for this category.</p>
                        <Button variant="outline" className="mt-4" onClick={onBack}>Go Back</Button>
                    </div>
                ) : (
                    filteredDestinations.map(loc => (
                        <div 
                            key={loc.id} 
                            onClick={() => onViewDestination(loc.id)}
                            className="bg-white rounded-[1.5rem] p-3 shadow-sm border border-safar-100 flex gap-4 cursor-pointer hover:shadow-md transition-all group"
                        >
                            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 relative">
                                <img src={loc.imageUrl || (loc.images && loc.images[0])} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-1 right-1 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-0.5">
                                    <Star size={10} className="fill-yellow-400 text-yellow-400" /> {loc.userRating || 4.5}
                                </div>
                            </div>
                            <div className="flex-1 py-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-safar-900 leading-tight">{loc.name}</h4>
                                    <p className="text-[10px] text-safar-500 flex items-center gap-1 mt-0.5">
                                        <MapPin size={10} /> {loc.district || 'Gujarat'}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    <span className="text-[9px] font-bold uppercase tracking-wider bg-safar-50 text-safar-600 px-2 py-0.5 rounded border border-safar-100">
                                        {loc.season}
                                    </span>
                                    {loc.estimatedBudget && (
                                        <span className="text-[9px] font-bold uppercase tracking-wider bg-safar-50 text-safar-600 px-2 py-0.5 rounded border border-safar-100">
                                            ₹{loc.estimatedBudget}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
