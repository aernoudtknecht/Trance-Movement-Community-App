
import React, { useState } from 'react';

const Portal: React.FC = () => {
  const [activeUrl, setActiveUrl] = useState<string | null>(null);

  const sections = [
    { name: 'Community Forum', url: 'https://trance-movement.com/forum', color: 'border-black/10' },
    { name: 'Latest News', url: 'https://trance-movement.com/news', color: 'border-black/10' },
    { name: 'Radio Station', url: 'https://trance-movement.com/radio', color: 'border-black/10' },
    { name: 'Movement Shop', url: 'https://trance-movement.com/shop', color: 'border-black/10' },
  ];

  if (activeUrl) {
    return (
      <div className="flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-120px)] animate-fade-in">
        <div className="flex items-center justify-between mb-4 px-2">
          <button 
            onClick={() => setActiveUrl(null)}
            className="flex items-center space-x-2 text-black/40 hover:text-black transition-colors uppercase text-[10px] font-bold tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Hub</span>
          </button>
          <span className="text-[10px] text-black/20 font-bold tracking-widest uppercase truncate max-w-[200px]">
            {activeUrl}
          </span>
        </div>
        <div className="flex-1 glass-panel rounded-[3rem] overflow-hidden border border-black/5 relative">
          <iframe 
            src={activeUrl} 
            className="w-full h-full bg-white/50"
            title="Trance Movement Browser"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-normal tracking-tight">The Hub</h2>
        <p className="text-black/40 text-sm uppercase tracking-[0.2em]">Connect with our external ecosystem</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {sections.map((section) => (
          <button
            key={section.name}
            onClick={() => setActiveUrl(section.url)}
            className={`glass-panel p-8 rounded-[2.5rem] flex items-center justify-between group border-l-[6px] ${section.color} hover:bg-white/80 transition-all duration-500 shadow-sm w-full text-left`}
          >
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-black/5 rounded-[1.5rem] group-hover:bg-black transition-colors duration-500">
                <svg className="w-6 h-6 text-black/40 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h3 className="font-normal text-xl text-black">{section.name}</h3>
                <p className="text-[10px] text-black/30 uppercase tracking-widest mt-1">Browse internal section</p>
              </div>
            </div>
            <svg className="w-6 h-6 text-black/20 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      <div className="glass-panel p-12 rounded-[3.5rem] text-center border-dashed border-2 border-black/5">
        <div className="w-24 h-24 mx-auto mb-6 bg-black/5 rounded-full flex items-center justify-center">
           <svg className="w-10 h-10 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h4 className="text-2xl font-normal mb-3">Community Contributions</h4>
        <p className="text-black/40 text-sm max-w-sm mx-auto mb-8">Have a resource, event, or insight you'd like to feature in our library?</p>
        <button className="text-black font-normal border-b border-black/10 pb-1 text-sm uppercase tracking-widest hover:text-black/60 transition-colors">Submit Proposal</button>
      </div>
    </div>
  );
};

export default Portal;
