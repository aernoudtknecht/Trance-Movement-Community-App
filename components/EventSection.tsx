
import React, { useState, useEffect } from 'react';
import { TranceEvent } from '../types';
import { fetchSimulatedEvents } from '../services/geminiService';

const EventSection: React.FC = () => {
  const [events, setEvents] = useState<TranceEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchSimulatedEvents();
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <div className="w-10 h-10 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
        <p className="text-black/40 text-sm uppercase tracking-widest">Aligning timelines...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-3xl font-normal tracking-tight">Gatherings</h2>
        <button className="bg-white/40 hover:bg-white/60 text-black px-6 py-2 rounded-2xl text-[10px] uppercase font-bold tracking-[0.2em] transition-all border border-black/5">
          Submit Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div key={event.id} className="glass-panel rounded-[3rem] overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-black/5 transition-all duration-700 flex flex-col h-full">
            <div className="relative h-60 overflow-hidden">
              <img src={event.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90" alt={event.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-8">
                <span className="bg-white/90 backdrop-blur-sm text-black text-[9px] uppercase font-bold tracking-[0.3em] px-4 py-2 rounded-full border border-black/5">Open</span>
              </div>
            </div>
            <div className="p-10 flex flex-col flex-1">
              <h3 className="text-2xl font-normal mb-4 text-black group-hover:text-black/60 transition-colors">{event.title}</h3>
              <div className="flex flex-col space-y-3 text-[11px] text-black/50 mb-6 uppercase tracking-widest">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {event.location}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {event.date}
                </div>
              </div>
              <p className="text-black/60 text-sm line-clamp-2 leading-relaxed mb-8 flex-1">{event.description}</p>
              <button className="w-full py-4 rounded-2xl bg-black text-white text-[10px] uppercase tracking-[0.3em] hover:bg-black/90 transition-all">
                Registration
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSection;
