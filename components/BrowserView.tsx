
import React, { useState, useEffect } from 'react';

interface BrowserViewProps {
  url: string;
  sectionName: string;
}

const BrowserView: React.FC<BrowserViewProps> = ({ url, sectionName }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [url]);

  return (
    <div className="flex flex-col h-full animate-fade-in relative bg-white">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
          <div className="w-12 h-12 border-2 border-black/5 border-t-black rounded-full animate-spin mb-4"></div>
          <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-black/40">Syncing with Movement...</p>
        </div>
      )}

      {/* Connection Indicator - Subtle */}
      <div className="absolute top-4 right-4 z-40 pointer-events-none opacity-20">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-black">Connected</span>
        </div>
      </div>

      {/* The website content */}
      <div className="flex-1 overflow-hidden">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title={`Trance Movement - ${sectionName}`}
          onLoad={() => setIsLoading(false)}
          allow="camera; microphone; geolocation"
        />
      </div>
    </div>
  );
};

export default BrowserView;
