import React, { Suspense } from 'react';
import { Scene } from './components/Scene';
import { UIOverlay } from './components/UIOverlay';

function App() {
  return (
    <div className="relative w-full h-screen bg-[#000906] overflow-hidden">
      {/* Background Gradient to blend with 3D scene vignetting */}
      <div className="absolute inset-0 bg-gradient-radial from-[#053b26] to-[#000000] opacity-40 z-0 pointer-events-none" />
      
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
            <Scene />
        </Suspense>
      </div>

      {/* Loading Overlay (Initial Load) */}
      <div id="loader" className="absolute inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1000 pointer-events-none opacity-0">
         <span className="text-[#D4AF37] font-cinzel text-xl animate-pulse">Loading Luxury...</span>
      </div>

      {/* UI Layer */}
      <UIOverlay />
      
      {/* Texture Overlay for Film Grain Effect (Static) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}

export default App;