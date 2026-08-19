
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { CarOption, DriverProfile } from '../types';
import { ShieldCheck, Star, Award, Wifi, Baby, Music, Filter, MessageSquare } from 'lucide-react';

interface CarSelectionProps {
  cars: CarOption[]; // Now accepts fleet as prop
  onSelect: (carId: string) => void;
  onBack: () => void;
  selectedCarId: string | null;
}

export const CarSelection: React.FC<CarSelectionProps> = ({ cars, onSelect, onBack, selectedCarId }) => {
  const [viewingProfile, setViewingProfile] = useState<DriverProfile | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Standard' | 'Comfort' | 'Premium' | 'Luxury' | 'Group'>('All');
  const [seatFilter, setSeatFilter] = useState<'Any' | 4 | 7 | 17>('Any');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleOpenProfile = (e: React.MouseEvent, driver: DriverProfile) => {
    e.stopPropagation();
    setViewingProfile(driver);
  };

  const filteredCars = cars.filter(car => {
    const catMatch = categoryFilter === 'All' || car.category === categoryFilter;
    const seatMatch = seatFilter === 'Any' || car.seats >= seatFilter;
    return catMatch && seatMatch;
  });

  return (
    <div className="fade-in max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="font-serif text-3xl text-safar-900 mb-2">Choose Your Experience</h2>
        <p className="text-safar-600">Verified pilots. Premium hygiene. Fixed pricing.</p>
      </div>

      {/* Filters Bar */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
         <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-safar-200 rounded-full text-safar-700 text-sm font-bold shadow-sm whitespace-nowrap"
         >
             <Filter size={14} /> Filters
         </button>
         {['All', 'Standard', 'Comfort', 'Premium', 'Luxury', 'Group'].map((cat) => (
             <button 
                key={cat}
                onClick={() => setCategoryFilter(cat as any)}
                className={`px-4 py-2 rounded-full text-sm font-bold border whitespace-nowrap transition-colors ${categoryFilter === cat ? 'bg-safar-800 text-white border-safar-800' : 'bg-white text-safar-600 border-safar-100 hover:border-safar-300'}`}
             >
                 {cat}
             </button>
         ))}
      </div>

      <div className="grid gap-6">
        {filteredCars.map((car: CarOption, idx: number) => {
          const isSelected = selectedCarId === car.id;
          const hasWifi = car.features.some(f => f.toLowerCase().includes('wi-fi'));
          const isKidsFriendly = car.driver.badges.some(b => b.toLowerCase().includes('kids'));

          return (
            <div 
              key={car.id}
              onClick={() => onSelect(car.id)}
              className={`relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer group ${
                isSelected ? 'border-safar-600 ring-2 ring-safar-600 ring-offset-2 shadow-glow' : 'border-safar-100 hover:border-safar-300 hover:shadow-lg'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Car Image Section */}
                <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden bg-gray-100">
                  <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 flex gap-2">
                     <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-safar-800 uppercase tracking-wide shadow-sm">
                        {car.category}
                     </div>
                     {isKidsFriendly && (
                         <div className="bg-journey-500/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1" title="Kids Friendly">
                            <Baby size={12}/>
                         </div>
                     )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-safar-900">{car.name}</h3>
                      <div className="text-right">
                        <span className="block text-lg font-bold text-safar-800">₹{car.pricePerKm}/km</span>
                        <span className="text-xs text-safar-500">Est. ₹{car.estimatedTotal}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-safar-50 text-safar-600 px-2 py-1 rounded border border-safar-100">{car.seats} Seats</span>
                      <span className="text-xs bg-safar-50 text-safar-600 px-2 py-1 rounded border border-safar-100">{car.acAvailable ? 'AC' : 'Non-AC'}</span>
                      {car.features.map((feat, idx) => (
                        <span key={idx} className="text-xs bg-safar-50 text-safar-600 px-2 py-1 rounded border border-safar-100">{feat}</span>
                      ))}
                      {hasWifi && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 flex items-center gap-1"><Wifi size={10}/> WiFi</span>
                      )}
                    </div>

                    {/* Driver Profile (The Safar USP) */}
                    <div className="bg-safar-50 rounded-xl p-4 flex items-center gap-4 mt-2 hover:bg-safar-100 transition-colors" onClick={(e) => handleOpenProfile(e, car.driver)}>
                      <img src={car.driver.imageUrl} alt={car.driver.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-safar-900 text-sm">{car.driver.name}</span>
                            <div className="flex items-center text-xs text-route-500 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100 font-bold">
                                <Star size={10} fill="currentColor" className="mr-1"/> {car.driver.rating}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-safar-500">
                          <span className="flex items-center gap-1"><Award size={12} /> {car.driver.experienceYears}y exp</span>
                          <span className="w-1 h-1 bg-safar-300 rounded-full"></span>
                          <span className="flex items-center gap-1 text-safar-600 underline">View Profile</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredCars.length === 0 && (
          <div className="text-center py-10 text-safar-400">
              <p>No cars available with these filters.</p>
              <button onClick={() => {setCategoryFilter('All'); setSeatFilter('Any');}} className="text-safar-600 underline text-sm mt-2">Reset Filters</button>
          </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
         <Button variant="ghost" onClick={onBack}>Back</Button>
      </div>

      {/* Pilot Profile Modal */}
      <Modal 
        isOpen={!!viewingProfile} 
        onClose={() => setViewingProfile(null)}
        title="Pilot Profile"
      >
        {viewingProfile && (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <img src={viewingProfile.imageUrl} alt={viewingProfile.name} className="w-20 h-20 rounded-full object-cover border-4 border-safar-100" />
                    <div>
                        <h4 className="text-2xl font-serif text-safar-900">{viewingProfile.name}</h4>
                        <div className="flex gap-2 mt-1">
                             <span className="text-xs bg-green-50 text-journey-500 px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-100 font-bold"><ShieldCheck size={10}/> Verified</span>
                             <span className="text-xs bg-safar-100 text-safar-700 px-2 py-0.5 rounded-full">{viewingProfile.totalTrips}+ Trips</span>
                        </div>
                    </div>
                </div>

                <div className="bg-safar-50 p-4 rounded-xl text-safar-700 italic text-sm border-l-4 border-safar-300">
                    "{viewingProfile.bio}"
                </div>

                <div>
                    <h5 className="font-bold text-safar-900 text-sm uppercase tracking-wide mb-2">Expertise Badges</h5>
                    <div className="flex flex-wrap gap-2">
                        {viewingProfile.badges.map((badge, i) => (
                            <span key={i} className="text-xs border border-safar-200 px-3 py-1 rounded-full text-safar-600">{badge}</span>
                        ))}
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="border-t border-safar-100 pt-4">
                    <div className="flex items-center justify-between mb-3">
                        <h5 className="font-bold text-safar-900 text-sm uppercase tracking-wide">Recent Reviews</h5>
                        <span className="text-xs text-safar-500 flex items-center gap-1"><MessageSquare size={12}/> {viewingProfile.reviews.length} reviews</span>
                    </div>
                    
                    {viewingProfile.reviews.length > 0 ? (
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                            {viewingProfile.reviews.map(review => (
                                <div key={review.id} className="bg-safar-50 p-3 rounded-lg text-sm border border-safar-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-safar-800 text-xs">{review.userName}</span>
                                        <span className="text-[10px] text-safar-400">{review.date}</span>
                                    </div>
                                    <div className="flex items-center gap-0.5 mb-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={10} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                                        ))}
                                    </div>
                                    <p className="text-safar-600 text-xs leading-relaxed">"{review.comment}"</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-safar-400 italic">No reviews yet for this pilot.</p>
                    )}
                </div>

                <div>
                     <h5 className="font-bold text-safar-900 text-sm uppercase tracking-wide mb-2">Languages Spoken</h5>
                     <p className="text-safar-600 text-sm">{viewingProfile.languages.join(', ')}</p>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button fullWidth onClick={() => setViewingProfile(null)}>Close</Button>
                </div>
            </div>
        )}
      </Modal>

      {/* Filter Modal */}
      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="Filter Vehicles">
          <div className="space-y-6">
              <div>
                  <label className="text-xs font-bold text-safar-500 uppercase tracking-widest mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                      {['All', 'Standard', 'Comfort', 'Premium', 'Luxury', 'Group'].map(cat => (
                          <button 
                            key={cat}
                            onClick={() => setCategoryFilter(cat as any)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${categoryFilter === cat ? 'bg-safar-800 text-white border-safar-800' : 'bg-white text-safar-600 border-safar-100'}`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
              </div>
              <div>
                  <label className="text-xs font-bold text-safar-500 uppercase tracking-widest mb-3 block">Minimum Seats</label>
                  <div className="flex flex-wrap gap-2">
                      {[
                          { val: 'Any', label: 'Any' },
                          { val: 4, label: '4+' },
                          { val: 7, label: '7+' },
                          { val: 17, label: '17+' }
                      ].map(opt => (
                          <button 
                            key={opt.label}
                            onClick={() => setSeatFilter(opt.val as any)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${seatFilter === opt.val ? 'bg-safar-800 text-white border-safar-800' : 'bg-white text-safar-600 border-safar-100'}`}
                          >
                              {opt.label}
                          </button>
                      ))}
                  </div>
              </div>
              <div className="pt-4">
                  <Button fullWidth onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
              </div>
          </div>
      </Modal>
    </div>
  );
};
