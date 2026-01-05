
import React, { useState, useEffect } from 'react';
import { ActivityItem } from '../types';
import { fetchRealActivity } from '../services/apiService';

const ActivityStream: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const loadActivity = async () => {
      const data = await fetchRealActivity();
      setActivities(data);
      setLoading(false);
    };
    loadActivity();
  }, []);

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post: ActivityItem = {
      id: Date.now().toString(),
      user: "You",
      avatar: "https://picsum.photos/seed/me/100/100",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0
    };
    setActivities([post, ...activities]);
    setNewPost("");
    alert("In a production app, this would use a POST request to BuddyPress API with your Auth token.");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <div className="w-8 h-8 border-2 border-black/5 border-t-black rounded-full animate-spin"></div>
        <p className="text-black/40 text-[10px] uppercase font-bold tracking-[0.3em]">Opening Resonance...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="glass-panel p-10 rounded-[3.5rem] space-y-8 border border-black/5">
        <div className="flex items-start space-x-6">
          <img src="https://picsum.photos/seed/me/100/100" className="w-14 h-14 rounded-full border border-black/5 shadow-sm" alt="me" />
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your resonance..."
            className="flex-1 bg-white/40 border border-black/5 rounded-[2rem] p-6 text-black focus:outline-none focus:ring-1 focus:ring-black/10 resize-none h-32 placeholder-black/20 text-base"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handlePost}
            disabled={!newPost.trim()}
            className="bg-black text-white px-12 py-4 rounded-[2rem] text-[10px] uppercase font-bold tracking-[0.3em] shadow-xl shadow-black/5 active:scale-95 transition-all disabled:opacity-10"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {activities.length === 0 && (
          <p className="text-center text-black/30 py-10">No activities found. Enable CORS on your WordPress site to see real data.</p>
        )}
        {activities.map((item) => (
          <div key={item.id} className="glass-panel rounded-[3.5rem] overflow-hidden transition-all hover:bg-white/60 group">
            <div className="p-10">
              <div className="flex items-center space-x-5 mb-8">
                <img src={item.avatar} className="w-14 h-14 rounded-full border border-black/5 shadow-sm" alt={item.user} />
                <div>
                  <h4 className="font-normal text-lg text-black">{item.user}</h4>
                  <p className="text-[10px] text-black/30 uppercase font-bold tracking-widest">{item.timestamp}</p>
                </div>
              </div>
              <p className="text-black/80 leading-relaxed text-base mb-8">{item.content}</p>
              <div className="flex items-center space-x-10 border-t border-black/5 pt-8">
                <button className="flex items-center space-x-2 text-black/30 hover:text-black transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-black/30 hover:text-black transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.comments}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStream;
