
import React from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  isLoading = false,
  disabled,
  ...props 
}) => {
  const baseStyles = "relative py-3.5 px-6 rounded-2xl font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.95] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden";
  
  const variants = {
    // Gradient Marigold to Amber with inner shadow
    primary: "bg-gradient-to-r from-safar-400 to-safar-500 text-white shadow-glow hover:shadow-xl hover:to-safar-600 border border-transparent shadow-inner-light",
    // Light Teal
    secondary: "bg-safar-100 text-safar-800 hover:bg-safar-200 border border-transparent shadow-sm",
    // Outline Teal
    outline: "border-2 border-safar-200 text-safar-700 hover:border-safar-400 hover:bg-white hover:text-safar-900 bg-transparent",
    ghost: "text-safar-600 hover:text-safar-900 hover:bg-safar-100/50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200",
    // Glassmorphism
    glass: "bg-white/70 backdrop-blur-md text-safar-900 shadow-glass border border-white/50 hover:bg-white/90"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader size={18} className="animate-spin absolute" />
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
