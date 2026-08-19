
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRate, size = 20, readonly = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onRate && onRate(star)}
          disabled={readonly}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 transform transition-transform'}`}
        >
          <Star 
            size={size} 
            className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
          />
        </button>
      ))}
    </div>
  );
};
