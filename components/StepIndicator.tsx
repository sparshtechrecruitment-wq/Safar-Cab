import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, idx) => (
        <div 
          key={idx} 
          className={`h-1.5 rounded-full transition-all duration-500 ${
            idx < currentStep ? 'w-8 bg-safar-800' : 'w-2 bg-safar-200'
          }`}
        />
      ))}
    </div>
  );
};
