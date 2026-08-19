
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { ArrowRight, HelpCircle, MessageCircle } from 'lucide-react';
import { Logo } from '../components/Logo';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const handlePhoneSubmit = () => {
    if (phone.length === 10) setStep('otp');
  };

  const handleOtpSubmit = () => {
    // Simulate verification
    if (otp.join('').length === 4) onLogin();
  };

  return (
    <div className="h-screen bg-safar-50 flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center py-4">
         <div className="scale-75 origin-left">
            <Logo size="sm" />
         </div>
         <button className="flex items-center gap-1 text-safar-600 text-sm font-medium"><HelpCircle size={16} /> Help</button>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full fade-in">
        <h1 className="font-serif text-4xl text-safar-900 mb-2">
            {step === 'phone' ? 'Begin Your Journey' : 'Verify Details'}
        </h1>
        <p className="text-safar-600 mb-8">
            {step === 'phone' ? 'Enter your mobile number to continue.' : `Enter the 4-digit code sent to +91 ${phone}`}
        </p>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-safar-100 space-y-6">
            {step === 'phone' ? (
                <>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-safar-400">Mobile Number</label>
                        <div className="flex items-center gap-3 border-b-2 border-safar-200 py-2 focus-within:border-safar-800 transition-colors">
                            <span className="text-safar-900 font-medium">+91</span>
                            <input 
                                type="tel" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                className="flex-1 bg-transparent outline-none text-xl font-medium placeholder-safar-300"
                                placeholder="98765 43210"
                                autoFocus
                            />
                        </div>
                    </div>
                    <Button fullWidth onClick={handlePhoneSubmit} disabled={phone.length !== 10} className="mt-2">
                        Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </>
            ) : (
                <>
                    <div className="flex gap-4 justify-center my-4">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                type="tel"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => {
                                    const newOtp = [...otp];
                                    newOtp[idx] = e.target.value;
                                    setOtp(newOtp);
                                    if(e.target.value && idx < 3) {
                                        const nextInput = document.getElementById(`otp-${idx+1}`);
                                        nextInput?.focus();
                                    }
                                }}
                                id={`otp-${idx}`}
                                className="w-14 h-14 rounded-2xl bg-safar-50/50 border border-safar-200 text-center text-2xl font-bold text-safar-900 focus:border-safar-600 focus:bg-white focus:ring-4 focus:ring-safar-100 outline-none transition-all shadow-inner-light"
                            />
                        ))}
                    </div>
                    <Button fullWidth onClick={handleOtpSubmit} disabled={otp.join('').length !== 4}>
                        Verify & Login
                    </Button>
                    <div className="flex justify-between text-sm mt-4">
                        <button className="text-safar-500 hover:text-safar-800" onClick={() => setStep('phone')}>Change Number</button>
                        <button className="text-safar-800 font-medium flex items-center gap-1"><MessageCircle size={14}/> Get OTP via WhatsApp</button>
                    </div>
                </>
            )}
        </div>

        {step === 'phone' && (
            <div className="text-center mt-8 text-xs text-safar-400">
                By continuing, you agree to our <a href="#" className="underline text-safar-600">Terms</a> & <a href="#" className="underline text-safar-600">Privacy Policy</a>.
            </div>
        )}
      </div>
    </div>
  );
};
