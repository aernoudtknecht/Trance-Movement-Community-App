
import React, { useState, useEffect } from 'react';
import { Facilitator } from '../types';
import { fetchRealFacilitators } from '../services/apiService';

const FacilitatorSection: React.FC = () => {
  const [facilitators, setFacilitators] = useState<Facilitator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFacilitators = async () => {
      const data = await fetchRealFacilitators();
      setFacilitators(data);
      setLoading(false);
    };
    loadFacilitators();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <div className="w-10 h-10 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
        <p className="text-black/40 text-sm uppercase tracking-widest">Calling the circle...</p>
      </div>
    );
  }

  return (
    <div className="space-y-14 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-normal tracking-tight">Facilitators</h2>
        <p className="text-black/40 text-sm uppercase tracking-widest">Actual members of our global collective</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilitators.map((f) => (
          <div key={f.id} className="glass-panel p-10 rounded-[3rem] hover:bg-white/80 transition-all duration-500 group flex flex-col">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <img 
                  src={f.avatar} 
                  className="w-28 h-28 rounded-full object-cover border border-black/5 p-1 group-hover:scale-105 transition-transform duration-700" 
                  alt={f.name} 
                />
              </div>
              <div>
                <h4 className="font-normal text-xl text-black mb-1">{f.name}</h4>
                <p className="text-black/30 text-[9px] uppercase font-bold tracking-[0.2em]">{f.specialty}</p>
              </div>
              <p className="text-black/50 text-sm leading-relaxed italic line-clamp-3">
                "{f.bio}"
              </p>
              <button className="w-full mt-4 py-3 rounded-2xl bg-black/5 border border-black/5 text-[10px] uppercase font-bold tracking-[0.2em] text-black/60 hover:bg-black hover:text-white transition-all">
                Resonance Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitatorSection;
