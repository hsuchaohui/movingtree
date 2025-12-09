import React, { useState } from 'react';
import { generateLuxuryGreeting } from '../services/geminiService';

export const UIOverlay: React.FC = () => {
  const [greeting, setGreeting] = useState<string>("Experience the Golden Moment");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateWish = async () => {
    setIsLoading(true);
    const newGreeting = await generateLuxuryGreeting();
    setGreeting(newGreeting);
    setIsLoading(false);
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-12 z-10 text-white">
      {/* Header */}
      <header className="flex justify-between items-start animate-fade-in-down">
        <div>
          <h1 className="font-cinzel text-3xl md:text-5xl text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]">
            ARIX
          </h1>
          <p className="font-serif tracking-[0.3em] text-xs md:text-sm text-gray-300 mt-2 uppercase">
            Signature Collection
          </p>
        </div>
        <div className="hidden md:block">
            <span className="text-[#D4AF37] border border-[#D4AF37] px-4 py-1 rounded-full text-xs font-serif">
                Est. 2024
            </span>
        </div>
      </header>

      {/* Center Message */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg text-center pointer-events-none">
         <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-2xl transition-all duration-700">
            <p className="font-serif italic text-lg md:text-2xl text-[#fefae0] leading-relaxed drop-shadow-md">
                "{greeting}"
            </p>
         </div>
      </div>

      {/* Footer / Controls */}
      <footer className="pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4 w-full">
         <div className="text-xs text-white/50 font-sans tracking-wide">
             Interactive 3D Experience • Drag to Rotate
         </div>

         <button
            onClick={handleGenerateWish}
            disabled={isLoading}
            className={`
                group relative px-8 py-3 bg-gradient-to-r from-[#022b1c] to-[#000] 
                border border-[#D4AF37] text-[#D4AF37] font-cinzel font-bold tracking-widest uppercase text-sm
                hover:text-[#fff] transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.2)]
                disabled:opacity-50 disabled:cursor-not-allowed
            `}
         >
             <span className="absolute inset-0 w-0 bg-[#D4AF37] transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></span>
             {isLoading ? (
                 <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-[#D4AF37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Crafting Wish...
                 </span>
             ) : (
                 "Reveal New Wish"
             )}
         </button>
      </footer>
    </div>
  );
};