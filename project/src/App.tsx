import React from 'react';
import Calendar from './components/Calendar';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 py-4 sm:py-8">
      <div className="w-full max-w-4xl mx-auto px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
         Digital Calender
        </h1>
        <Calendar />
      </div>
    </div>
  );
}

export default App;