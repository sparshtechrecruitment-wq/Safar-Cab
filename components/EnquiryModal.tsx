import React, { useState } from 'react';
import { X, Send, Phone, User, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { FareBreakdown, formatPrice } from '../services/pricingEngine';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  fareBreakdown: FareBreakdown | null;
  vehicleName: string;
  destination: string;
  date: string;
  passengers: number;
}

type EnquiryStep = 'form' | 'success';

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  fareBreakdown,
  vehicleName,
  destination,
  date,
  passengers,
}) => {
  const [step, setStep] = useState<EnquiryStep>('form');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.length < 10) return;

    setIsSubmitting(true);
    // Simulate network call (replace with real API call later)
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setStep('success');
  };

  const handleClose = () => {
    // Reset state on close
    setStep('form');
    setName('');
    setPhone('');
    setMessage('');
    onClose();
  };

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-safar-900/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white w-full sm:max-w-lg rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-safar-800 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-safar-700 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-50" />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X size={18} />
          </button>
          <p className="text-safar-300 text-xs font-bold uppercase tracking-widest mb-1">
            Get Your Quote
          </p>
          <h2 className="font-serif text-2xl leading-tight">{vehicleName}</h2>
          <p className="text-safar-300 text-sm mt-1">
            {fareBreakdown?.origin} → {destination} · {fareBreakdown?.tripType === 'round-trip' ? 'Round Trip' : 'One Way'}
          </p>
        </div>

        {step === 'form' ? (
          <>
            {/* Fare Summary Strip */}
            {fareBreakdown && (
              <div className="bg-safar-50 border-b border-safar-100 px-6 py-4">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-safar-600">Base Fare ({fareBreakdown.vehicleCategory})</span>
                  <span className="font-bold text-safar-900">{formatPrice(fareBreakdown.baseFare)}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-safar-600">Driver Bata</span>
                  <span className="font-medium text-safar-700">{formatPrice(fareBreakdown.driverBata)}</span>
                </div>
                {fareBreakdown.estimatedToll > 0 && (
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-safar-600">Toll (Estimated)</span>
                    <span className="font-medium text-safar-700">{formatPrice(fareBreakdown.estimatedToll)}</span>
                  </div>
                )}
                {fareBreakdown.statePermit > 0 && (
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-safar-600">State Permit</span>
                    <span className="font-medium text-safar-700">{formatPrice(fareBreakdown.statePermit)}</span>
                  </div>
                )}
                {fareBreakdown.roundTripDiscount && fareBreakdown.roundTripDiscount > 0 && (
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-green-600 font-medium">Round-Trip Saving</span>
                    <span className="font-bold text-green-600">-{formatPrice(fareBreakdown.roundTripDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-t border-safar-200 pt-3 mt-1">
                  <span className="font-bold text-safar-900">Estimated Total</span>
                  <span className="font-bold text-xl text-safar-800">{formatPrice(fareBreakdown.grandTotal)}</span>
                </div>
                <p className="text-[10px] text-safar-400 mt-2">
                  * Final price confirmed after pilot assignment. Toll/permit actuals may vary slightly.
                </p>
              </div>
            )}

            {/* Enquiry Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <p className="text-sm text-safar-600">
                Share your details and we'll confirm availability and send you the final quote on WhatsApp/call.
              </p>

              <div className="space-y-1">
                <label className="text-xs font-bold text-safar-500 uppercase tracking-wider flex items-center gap-1">
                  <User size={12} /> Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ronak Ganava"
                  required
                  className="w-full p-3.5 rounded-xl border border-safar-200 focus:border-safar-500 focus:ring-4 focus:ring-safar-100 text-safar-900 font-medium outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-safar-500 uppercase tracking-wider flex items-center gap-1">
                  <Phone size={12} /> Mobile Number
                </label>
                <div className="flex items-center gap-2">
                  <span className="bg-safar-50 border border-safar-200 rounded-xl px-3 py-3.5 text-sm font-bold text-safar-700">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile"
                    required
                    minLength={10}
                    maxLength={10}
                    className="flex-1 p-3.5 rounded-xl border border-safar-200 focus:border-safar-500 focus:ring-4 focus:ring-safar-100 text-safar-900 font-medium outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-safar-500 uppercase tracking-wider flex items-center gap-1">
                  <MessageSquare size={12} /> Special Requests <span className="text-safar-300 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Need AC, elderly passenger, early morning pickup..."
                  rows={3}
                  className="w-full p-3.5 rounded-xl border border-safar-200 focus:border-safar-500 focus:ring-4 focus:ring-safar-100 text-safar-900 font-medium outline-none transition-all text-sm resize-none"
                />
              </div>

              <Button
                fullWidth
                type="submit"
                disabled={isSubmitting || !name.trim() || phone.length < 10}
                className="py-4 text-base shadow-glow"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={18} /> Send Enquiry
                  </span>
                )}
              </Button>
            </form>
          </>
        ) : (
          /* Success State */
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-green-100">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h3 className="font-serif text-2xl text-safar-900 mb-2">Enquiry Received!</h3>
            <p className="text-safar-600 text-sm mb-2">
              Thank you, <span className="font-bold text-safar-900">{name}</span>!
            </p>
            <p className="text-safar-500 text-sm mb-1">
              Our team will call you on <span className="font-bold text-safar-800">+91 {phone}</span> within 30 minutes to confirm your booking.
            </p>
            <div className="bg-safar-50 rounded-2xl p-4 mt-6 text-left space-y-2 border border-safar-100">
              <p className="text-xs font-bold text-safar-500 uppercase tracking-wider">Your Quote Summary</p>
              <p className="text-sm font-bold text-safar-900">{fareBreakdown?.origin} → {destination}</p>
              <p className="text-sm text-safar-600">{vehicleName} · {formattedDate} · {passengers} Pax</p>
              {fareBreakdown && (
                <p className="text-lg font-bold text-safar-800">{formatPrice(fareBreakdown.grandTotal)} (Est.)</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="mt-6 flex items-center gap-2 text-safar-600 font-bold text-sm mx-auto hover:text-safar-900 transition-colors"
            >
              Back to Home <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
