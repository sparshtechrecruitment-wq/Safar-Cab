
import React, { useState } from 'react';
import { Booking } from '../types';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { StarRating } from '../components/StarRating';
import { MapPin, Calendar, Car, ChevronRight, CheckCircle2, MessageSquarePlus, X } from 'lucide-react';

interface MyTripsProps {
  bookings: Booking[];
  onRateTrip: (bookingId: string, rating: number, feedback: string) => void;
  onPlanNew: () => void;
}

export const MyTrips: React.FC<MyTripsProps> = ({ bookings, onRateTrip, onPlanNew }) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Identify trips that need rating
  const pendingReviewBookings = bookings.filter(b => b.status === 'completed' && !b.rating);
  
  // Sort bookings: Upcoming first, then completed (newest first)
  const sortedBookings = [...bookings].sort((a, b) => {
    if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
    if (a.status !== 'upcoming' && b.status === 'upcoming') return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const handleOpenRating = (booking: Booking) => {
    setSelectedBooking(booking);
    setRating(0);
    setFeedback('');
    setIsRatingOpen(true);
  };

  const submitRating = () => {
    if (selectedBooking) {
      onRateTrip(selectedBooking.id, rating, feedback);
      setIsRatingOpen(false);
      setSelectedBooking(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="pt-24 px-6 text-center">
        <div className="bg-white p-8 rounded-[2.5rem] border border-dashed border-safar-200 shadow-sm mb-6">
            <div className="w-16 h-16 bg-safar-50 text-safar-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car size={32} />
            </div>
            <h2 className="font-serif text-2xl text-safar-900 mb-2">No trips yet</h2>
            <p className="text-safar-500 mb-6">Your travel history will appear here once you complete a journey.</p>
            <Button onClick={onPlanNew}>Plan Your First Safar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 px-6 pb-6 fade-in">
      <h1 className="font-serif text-3xl text-safar-900 mb-6">My Trips</h1>
      
      {/* Feedback Prompt Banner */}
      {pendingReviewBookings.length > 0 && (
          <div className="bg-gradient-to-r from-safar-800 to-safar-700 rounded-3xl p-5 mb-8 shadow-lg shadow-safar-200 text-white relative overflow-hidden animate-slide-down">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md">
                      <MessageSquarePlus size={24} className="text-safar-50" />
                  </div>
                  <div className="flex-1">
                      <h3 className="font-bold text-lg leading-tight mb-1">How was your trip?</h3>
                      <p className="text-safar-200 text-xs mb-3">You recently traveled to {pendingReviewBookings[0].destination}. Rate your pilot to help others.</p>
                      <button 
                        onClick={() => handleOpenRating(pendingReviewBookings[0])}
                        className="bg-white text-safar-900 text-xs font-bold px-4 py-2 rounded-full hover:bg-safar-50 transition-colors"
                      >
                          Rate Trip Now
                      </button>
                  </div>
              </div>
          </div>
      )}

      <div className="space-y-4">
        {sortedBookings.map((booking) => (
          <div 
            key={booking.id} 
            className="bg-white p-5 rounded-3xl border border-safar-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden group"
            onClick={() => setSelectedBooking(booking)}
          >
            {/* Status Strip */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${booking.status === 'upcoming' ? 'bg-safar-500' : 'bg-safar-200'}`}></div>

            <div className="flex justify-between items-start mb-3 pl-3">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block ${
                  booking.status === 'upcoming' ? 'bg-safar-100 text-safar-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {booking.status}
                </span>
                <h3 className="font-bold text-lg text-safar-900 flex items-center gap-2">
                    {booking.destination}
                    <ChevronRight size={16} className="text-safar-300" />
                </h3>
              </div>
              <div className="text-right">
                <p className="font-bold text-safar-900">₹{booking.totalAmount}</p>
                {booking.status === 'completed' && booking.rating && (
                    <div className="flex items-center justify-end gap-1 text-xs text-yellow-600 mt-1">
                        <StarRating rating={booking.rating} size={12} readonly />
                    </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-safar-500 pl-3">
               <div className="flex items-center gap-1 bg-safar-50 px-2 py-1 rounded-md">
                   <Calendar size={12} /> {booking.date}
               </div>
               <div className="flex items-center gap-1 bg-safar-50 px-2 py-1 rounded-md">
                   <Car size={12} /> {booking.carName}
               </div>
            </div>

            {booking.status === 'completed' && !booking.rating && (
                <button 
                    onClick={(e) => { e.stopPropagation(); handleOpenRating(booking); }}
                    className="mt-4 w-full py-2 text-sm font-bold text-safar-600 border-t border-safar-50 hover:bg-safar-50 transition-colors flex items-center justify-center gap-2"
                >
                    Rate this trip
                </button>
            )}
          </div>
        ))}
      </div>

      {/* Trip Details Modal (Simplified) */}
      <Modal isOpen={!!selectedBooking && !isRatingOpen} onClose={() => setSelectedBooking(null)} title="Trip Details">
        {selectedBooking && (
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-safar-100 pb-4">
                    <div>
                        <p className="text-xs text-safar-400 uppercase tracking-widest">Booking ID</p>
                        <p className="font-mono font-bold text-safar-900">{selectedBooking.id}</p>
                    </div>
                    <div className="text-right">
                         <p className="text-xs text-safar-400 uppercase tracking-widest">Status</p>
                         <p className="font-bold capitalize text-safar-700">{selectedBooking.status}</p>
                    </div>
                </div>

                <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center pt-1.5">
                        <div className="w-2.5 h-2.5 bg-safar-400 rounded-full"></div>
                        <div className="w-0.5 h-8 bg-safar-200"></div>
                        <div className="w-2.5 h-2.5 bg-safar-800 rounded-full"></div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <p className="text-xs text-safar-500">From</p>
                            <p className="font-bold text-safar-900">{selectedBooking.origin}</p>
                        </div>
                        <div>
                            <p className="text-xs text-safar-500">To</p>
                            <p className="font-bold text-safar-900">{selectedBooking.destination}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-safar-50 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-safar-600">Pilot</span>
                        <span className="font-bold text-safar-900">{selectedBooking.pilotName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-safar-600">Vehicle</span>
                        <span className="font-bold text-safar-900">{selectedBooking.carName}</span>
                    </div>
                </div>

                {selectedBooking.status === 'completed' && !selectedBooking.rating && (
                    <Button fullWidth onClick={() => handleOpenRating(selectedBooking)}>Rate Trip</Button>
                )}
            </div>
        )}
      </Modal>

      {/* Rating Modal */}
      <Modal isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} title="Rate Your Experience">
          <div className="text-center space-y-6 py-4">
              <p className="text-safar-600">How was your journey to <strong>{selectedBooking?.destination}</strong>?</p>
              
              <div className="flex justify-center">
                  <StarRating rating={rating} onRate={setRating} size={36} />
              </div>

              <textarea 
                className="w-full p-3 bg-safar-50 rounded-xl border border-safar-200 focus:outline-none focus:ring-2 focus:ring-safar-300 text-sm"
                placeholder="Share your experience (optional)..."
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <Button fullWidth onClick={submitRating} disabled={rating === 0}>Submit Feedback</Button>
          </div>
      </Modal>
    </div>
  );
};
