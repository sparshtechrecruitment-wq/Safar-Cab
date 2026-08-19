import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Lock, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';

interface PaymentProps {
  amount: number;
  onSuccess: () => void;
  onBack: () => void;
}

export const Payment: React.FC<PaymentProps> = ({ amount, onSuccess, onBack }) => {
  const [method, setMethod] = useState<'upi' | 'card'>('upi');
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    // Simulate payment delay
    setTimeout(() => {
        setProcessing(false);
        onSuccess();
    }, 2000);
  };

  return (
    <div className="fade-in max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-safar-100">
      <div className="bg-safar-50 p-6 text-center border-b border-safar-100">
        <h2 className="font-serif text-2xl text-safar-900 mb-1">Confirm Booking</h2>
        <p className="text-safar-500 text-sm">Pay advance to reserve your pilot.</p>
        <div className="mt-4 text-4xl font-bold text-safar-800">₹{amount}</div>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-3">
            <label className="text-xs font-bold uppercase text-safar-400 tracking-wider">Payment Method</label>
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setMethod('upi')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'upi' ? 'border-safar-800 bg-safar-50 text-safar-900 ring-1 ring-safar-800' : 'border-safar-100 text-safar-500 hover:border-safar-300'}`}
                >
                    <Smartphone size={24} />
                    <span className="font-medium text-sm">UPI</span>
                </button>
                <button 
                    onClick={() => setMethod('card')}
                    className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${method === 'card' ? 'border-safar-800 bg-safar-50 text-safar-900 ring-1 ring-safar-800' : 'border-safar-100 text-safar-500 hover:border-safar-300'}`}
                >
                    <CreditCard size={24} />
                    <span className="font-medium text-sm">Card</span>
                </button>
            </div>
        </div>

        {method === 'upi' && (
            <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 text-center">
                <p className="text-sm text-gray-500 mb-2">Scan QR or use UPI ID</p>
                <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center text-gray-400 text-xs">QR Code Mock</div>
            </div>
        )}

        <div className="flex items-center gap-2 text-xs text-safar-500 justify-center bg-green-50 p-2 rounded-lg text-green-700">
            <Lock size={12} />
            <span>Secure 256-bit SSL encrypted payment</span>
        </div>

        <div className="space-y-3 pt-4">
            <Button fullWidth onClick={handlePay} isLoading={processing}>
                Pay ₹{amount} & Confirm
            </Button>
            <Button variant="ghost" fullWidth onClick={onBack} disabled={processing}>Cancel Transaction</Button>
        </div>
      </div>
    </div>
  );
};
