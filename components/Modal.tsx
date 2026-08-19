import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-safar-900/40 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl relative overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-safar-100">
          <h3 className="font-serif text-xl text-safar-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-safar-50 rounded-full text-safar-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
