import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { importantDates } from '../data/important-dates';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentImportantDate, setCurrentImportantDate] =
    useState<typeof importantDates[0] | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const formatDateString = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  };

  const getImportantDate = (date: Date) => {
    const dateString = formatDateString(date);
    return importantDates.find((d) => d.date === dateString);
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
        changeDate(diff > 0 ? 1 : -1);
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
      year: 'numeric',
    };
    return date.toLocaleDateString('en-IN', options);
  };

  const NavigationButtons = () => (
    <div className="fixed bottom-4 left-0 right-0 flex justify-between px-6 sm:px-12 pointer-events-none z-10">
      <button
        onClick={() => changeDate(-1)}
        className="bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm text-white rounded-full p-3 transition-all pointer-events-auto"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => changeDate(1)}
        className="bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm text-white rounded-full p-3 transition-all pointer-events-auto"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );

  if (!currentImportantDate) {
    return (
      <div
        className="w-full min-h-screen px-4 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CalendarIcon className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
              {currentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h2>
          </div>
          <p className="text-lg text-gray-600 mb-2">{getIndianDate(currentDate)}</p>
          <p className="mt-4 text-base sm:text-xl text-gray-600">No special occasions today</p>
          <NavigationButtons />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen px-0 sm:px-6 flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full">
        <img
          src={currentImportantDate.image}
          alt={currentImportantDate.name}
          className="w-full h-[250px] sm:h-[400px] object-cover"
        />
      </div>

      <div className="bg-white p-4 sm:p-8 text-gray-900 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
            {currentImportantDate.type}
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold mb-2">{currentImportantDate.name}</h2>
        <p className="text-base sm:text-lg mb-2">{currentImportantDate.description}</p>
        <div className="flex items-center gap-2 mt-4 text-gray-600">
          <CalendarIcon className="w-5 h-5" />
          <p className="text-sm sm:text-base">{getIndianDate(currentDate)}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 text-center">
        <p className="text-lg sm:text-2xl font-semibold text-gray-900">
          {currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <NavigationButtons />
    </div>
  );
};

export default Calendar;
