
import React, { useState, useEffect } from 'react';
import { ResourceArticle } from '../types';
import { fetchRealResources } from '../services/apiService';

const ResourceSection: React.FC = () => {
  const [resources, setResources] = useState<ResourceArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      const data = await fetchRealResources();
      setResources(data);
      setLoading(false);
    };
    loadResources();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <div className="w-10 h-10 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
        <p className="text-black/40 text-sm uppercase tracking-widest">Opening archives...</p>
      </div>
    );
  }

  return (
    <div className="space-y-14 animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <h2 className="text-4xl font-normal tracking-tight">Wisdom Library</h2>
        <p className="text-black/40 text-sm uppercase tracking-widest max-w-lg">Actual articles from trance-movement.com</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {resources.map((article) => (
          <div key={article.id} className="glass-panel rounded-[3.5rem] overflow-hidden group hover:border-black/20 transition-all duration-700 flex flex-col h-full">
            <div className="relative h-72 overflow-hidden">
              <img 
                src={article.image} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" 
                alt={article.title} 
              />
              <div className="absolute top-6 left-6">
                <span className="bg-white/80 backdrop-blur-md text-black text-[9px] uppercase font-bold tracking-[0.2em] px-5 py-2 rounded-full border border-black/5">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-10 flex flex-col flex-1">
              <h3 className="text-2xl font-normal mb-4 leading-snug text-black">
                {article.title}
              </h3>
              <p className="text-black/50 text-sm leading-relaxed mb-8 flex-1">
                {article.excerpt}
              </p>
              <button className="flex items-center space-x-3 text-black text-[10px] uppercase font-bold tracking-[0.3em] group-hover:translate-x-3 transition-transform">
                <span>Explore Wisdom</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4 4H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceSection;
