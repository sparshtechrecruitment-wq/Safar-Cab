
import React, { useState, useMemo } from 'react';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { EnquiryModal } from '../components/EnquiryModal';
import { CarOption, DriverProfile, JourneyData } from '../types';
import { ShieldCheck, Star, Award, Wifi, Baby, Filter, MessageSquare, Tag, ArrowRight, ArrowLeftRight, Info } from 'lucide-react';
import { 
  calculateFare, 
  getRoutePriceForAllCategories, 
  formatPrice, 
  isRouteSupported, 
  FareBreakdown,
  VehicleCategory 
} from '../services/pricingEngine';

interface CarSelectionProps {
  cars: CarOption[];
  onSelect: (carId: string) => void;
  onBack: () => void;
  selectedCarId: string | null;
  journeyData: JourneyData; // Now receives full journey context for pricing
}

export const CarSelection: React.FC<CarSelectionProps> = ({ cars, onSelect, onBack, selectedCarId, journeyData }) => {
  const [viewingProfile, setViewingProfile] = useState<DriverProfile | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Standard' | 'Comfort' | 'Premium' | 'Luxury' | 'Group'>('All');
  const [seatFilter, setSeatFilter] = useState<'Any' | 4 | 7 | 17>('Any');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [enquiryTarget, setEnquiryTarget] = useState<{ car: CarOption; fare: FareBreakdown } | null>(null);

  // Pre-calculate prices for all categories from the pricing engine
  const allCategoryPrices = useMemo(() => {
    return getRoutePriceForAllCategories(
      journeyData.origin,
      journeyData.destination,
      journeyData.tripType || 'one-way'
    );
  }, [journeyData.origin, journeyData.destination, journeyData.tripType]);

  const routeSupported = isRouteSupported(journeyData.origin, journeyData.destination);

  const getFareForCar = (car: CarOption): FareBreakdown | null => {
    return allCategoryPrices.get(car.category as VehicleCategory) || null;
  };

  const handleOpenProfile = (e: React.MouseEvent, driver: DriverProfile) => {
    e.stopPropagation();
    setViewingProfile(driver);
  };

  const handleGetQuote = (e: React.MouseEvent, car: CarOption) => {
    e.stopPropagation();
    const fare = getFareForCar(car);
    if (fare) {
      setEnquiryTarget({ car, fare });
    }
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
        
        {/* Route + Trip Type Badge */}
        <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-safar-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {journeyData.origin} → {journeyData.destination}
          </span>
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
            journeyData.tripType === 'round-trip' 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-safar-100 text-safar-700 border border-safar-200'
          }`}>
            {journeyData.tripType === 'round-trip' ? <ArrowLeftRight size={12}/> : <ArrowRight size={12}/>}
            {journeyData.tripType === 'round-trip' ? 'Round Trip' : 'One Way'}
          </span>
          {journeyData.passengers > 0 && (
            <span className="inline-flex items-center gap-1.5 bg-safar-100 text-safar-700 text-xs font-bold px-3 py-1.5 rounded-full border border-safar-200">
              👥 {journeyData.passengers} Pax
            </span>
          )}
        </div>

        {/* Route not in DB notice */}
        {!routeSupported && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left flex gap-3">
            <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-800">Custom Route</p>
              <p className="text-xs text-amber-700 mt-0.5">
                This route isn't in our standard price list yet. You'll still see per-km rates. Send an enquiry and our team will provide a custom quote.
              </p>
            </div>
          </div>
        )}
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
        {filteredCars.map((car: CarOption) => {
          const isSelected = selectedCarId === car.id;
          const fare = getFareForCar(car);
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
                {/* Car Image */}
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

                  {/* Price Overlay on Image */}
                  {fare && (
                    <div className="absolute bottom-4 left-4 right-4 bg-safar-900/80 backdrop-blur-md rounded-xl px-4 py-2.5 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-safar-300 uppercase tracking-wider font-bold">
                            {fare.tripType === 'round-trip' ? 'Round Trip' : 'One Way'} · {fare.distanceKm} km
                          </p>
                          <p className="text-xl font-bold">{formatPrice(fare.grandTotal)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-safar-300">~{formatPrice(fare.pricePerKm)}/km</p>
                          {fare.roundTripDiscount && fare.roundTripDiscount > 0 && (
                            <p className="text-[10px] text-green-400 font-bold">Save {formatPrice(fare.roundTripDiscount)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {!fare && routeSupported === false && (
                    <div className="absolute bottom-4 left-4 right-4 bg-safar-900/80 backdrop-blur-md rounded-xl px-4 py-2.5 text-white">
                      <p className="text-[10px] text-safar-300">Custom Route</p>
                      <p className="text-sm font-bold">₹{car.pricePerKm}/km + charges</p>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-safar-900">{car.name}</h3>
                        <p className="text-xs text-safar-500 mt-0.5">{car.shortDescription}</p>
                      </div>
                    </div>
                    
                    {/* Fare Breakdown (minimal inline version) */}
                    {fare && (
                      <div className="bg-safar-50 rounded-2xl p-4 mb-4 border border-safar-100 space-y-1.5">
                        <p className="text-[10px] font-bold text-safar-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Tag size={10}/> Price Breakdown
                        </p>
                        <div className="flex justify-between text-xs text-safar-600">
                          <span>Base Fare</span>
                          <span className="font-bold">{formatPrice(fare.baseFare)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-safar-600">
                          <span>Driver Bata</span>
                          <span className="font-medium">{formatPrice(fare.driverBata)}</span>
                        </div>
                        {fare.estimatedToll > 0 && (
                          <div className="flex justify-between text-xs text-safar-600">
                            <span>Toll (Est.)</span>
                            <span className="font-medium">{formatPrice(fare.estimatedToll)}</span>
                          </div>
                        )}
                        {fare.statePermit > 0 && (
                          <div className="flex justify-between text-xs text-safar-600">
                            <span>State Permit</span>
                            <span className="font-medium">{formatPrice(fare.statePermit)}</span>
                          </div>
                        )}
                        {fare.roundTripDiscount && fare.roundTripDiscount > 0 && (
                          <div className="flex justify-between text-xs text-green-600">
                            <span className="font-medium">Round-Trip Saving</span>
                            <span className="font-bold">-{formatPrice(fare.roundTripDiscount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-bold text-safar-900 border-t border-safar-200 pt-1.5 mt-1">
                          <span>Total</span>
                          <span>{formatPrice(fare.grandTotal)}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-safar-50 text-safar-600 px-2 py-1 rounded border border-safar-100">{car.seats} Seats</span>
                      <span className="text-xs bg-safar-50 text-safar-600 px-2 py-1 rounded border border-safar-100">{car.acAvailable ? 'AC' : 'Non-AC'}</span>
                      {car.features.slice(0, 2).map((feat, idx) => (
                        <span key={idx} className="text-xs bg-safar-50 text-safar-600 px-2 py-1 rounded border border-safar-100">{feat}</span>
                      ))}
                      {hasWifi && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 flex items-center gap-1"><Wifi size={10}/> WiFi</span>
                      )}
                    </div>

                    {/* Driver Profile */}
                    <div className="bg-safar-50 rounded-xl p-4 flex items-center gap-4 hover:bg-safar-100 transition-colors" onClick={(e) => handleOpenProfile(e, car.driver)}>
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

                  {/* Action Button */}
                  <div className="mt-4">
                    <Button
                      fullWidth
                      onClick={(e) => handleGetQuote(e, car)}
                      className="py-3 text-sm"
                    >
                      Get Quote & Enquire
                    </Button>
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

      {/* Enquiry Modal */}
      {enquiryTarget && (
        <EnquiryModal
          isOpen={!!enquiryTarget}
          onClose={() => setEnquiryTarget(null)}
          fareBreakdown={enquiryTarget.fare}
          vehicleName={enquiryTarget.car.name}
          destination={journeyData.destination}
          date={journeyData.date}
          passengers={journeyData.passengers}
        />
      )}
    </div>
  );
};
