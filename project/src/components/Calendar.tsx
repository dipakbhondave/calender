import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { importantDates } from '../data/important-dates';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentImportantDate, setCurrentImportantDate] = useState<typeof importantDates[0] | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const formatDateString = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  };

  const getImportantDate = (date: Date) => {
    const dateString = formatDateString(date);
    return importantDates.find(d => d.date === dateString);
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
    const importantDate = getImportantDate(newDate);
    setCurrentImportantDate(importantDate || null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          changeDate(1);
        } else {
          changeDate(-1);
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const updateDate = () => {
      const newDate = new Date();
      setCurrentDate(newDate);
      const importantDate = getImportantDate(newDate);
      setCurrentImportantDate(importantDate || null);
    };

    updateDate();
    const interval = setInterval(updateDate, 24 * 60 * 60 * 1000);
    const timeout = setTimeout(updateDate, timeUntilMidnight);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const getIndianDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      calendar: 'indian',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-IN', options);
  };

  const NavigationButtons = () => (
    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 pointer-events-none">
      <button
        onClick={() => changeDate(-1)}
        className="bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition-all pointer-events-auto"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => changeDate(1)}
        className="bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm text-white rounded-full p-2 transition-all pointer-events-auto"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>
    </div>
  );

  if (!currentImportantDate) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6"
           onTouchStart={handleTouchStart}
           onTouchMove={handleTouchMove}
           onTouchEnd={handleTouchEnd}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-8 text-center relative min-h-[200px] flex items-center justify-center">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2 sm:px-4">
              <button
                onClick={() => changeDate(-1)}
                className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 rounded-full p-2 transition-all"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={() => changeDate(1)}
                className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 rounded-full p-2 transition-all"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <CalendarIcon className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h2>
              </div>
              <p className="text-lg text-gray-600 mb-2">{getIndianDate(currentDate)}</p>
              <p className="mt-4 text-base sm:text-xl text-gray-600">No special occasions today</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6"
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-[300px] sm:h-96">
          <img
            src={currentImportantDate.image}
            alt={currentImportantDate.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 sm:p-8 text-white w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {currentImportantDate.type}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold mb-2">{currentImportantDate.name}</h2>
              <p className="text-base sm:text-lg opacity-90 mb-2">
                {currentImportantDate.description}
              </p>
              <div className="flex items-center gap-2 mt-4">
                <CalendarIcon className="w-5 h-5" />
                <p className="text-sm sm:text-base opacity-90">
                  {getIndianDate(currentDate)}
                </p>
              </div>
            </div>
          </div>
          <NavigationButtons />
        </div>
        <div className="p-4 sm:p-6 bg-gray-50">
          <div className="text-center">
            <p className="text-lg sm:text-2xl font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;