import { Season } from '../types';

export const getCurrentSeason = (): Season => {
  const month = new Date().getMonth(); // 0 = Jan, 11 = Dec

  // June (5) to September (8) = Monsoon
  if (month >= 5 && month <= 8) {
    return 'Monsoon';
  }
  // March (2) to May (4) = Summer
  if (month >= 2 && month <= 4) {
    return 'Summer';
  }
  // October (9) to February (1) = Winter
  return 'Winter';
};

export const isWeekendOrHoliday = (): boolean => {
  const date = new Date();
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  
  if (day === 0 || day === 6) {
    return true; // Weekend
  }

  // Simple static holiday check (Format: MM-DD)
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const currentMMDD = `${month}-${d}`;

  const publicHolidays = [
    '01-26', // Republic Day
    '08-15', // Independence Day
    '10-02', // Gandhi Jayanti
    '12-25', // Christmas
    // Add more dynamic festival dates here as needed
  ];

  return publicHolidays.includes(currentMMDD);
};
