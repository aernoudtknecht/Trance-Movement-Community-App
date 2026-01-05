
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<'login' | 'forgot' | 'sent'>('login');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const logoUrl = "https://trance-movement.com/wp-content/uploads/2024/04/Logo-website.png";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication and pass the captured username for dynamic URLs
    setTimeout(() => {
      onLogin({
        id: Date.now().toString(),
        name: username || "member",
        avatar: `https://picsum.photos/seed/${username}/200/200`,
        isLoggedIn: true
      });
      setLoading(false);
    }, 1200);
  };

  const handleRecovery = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setView('sent');
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden text-black bg-white">
      {/* Immersive Mobile Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://trance-movement.com/wp-content/uploads/2024/04/Trance-Movement-com-background-Mobile.jpg" 
          className="w-full h-full object-cover" 
          alt="" 
        />
      </div>

      <div className="max-w-md w-full glass-panel p-12 md:p-16 rounded-[3.5rem] border border-black/5 relative z-10 shadow-2xl animate-fade-in">
        <div className="text-center mb-10">
          <img 
            src={logoUrl} 
            alt="Trance Movement" 
            className="w-56 h-auto mx-auto mb-8 cursor-pointer" 
            onClick={() => setView('login')} 
          />
          
          {view === 'login' && (
            <>
              <h1 className="text-2xl font-normal mb-2 tracking-tight">Portal Entry</h1>
              <p className="text-black/30 text-[10px] uppercase font-bold tracking-[0.3em]">Authorize your Presence</p>
            </>
          )}
          
          {(view === 'forgot' || view === 'sent') && (
            <>
              <h1 className="text-2xl font-normal mb-2 tracking-tight">Password Recovery</h1>
              <p className="text-black/30 text-[10px] uppercase font-bold tracking-[0.3em]">Reconnect with the Community</p>
            </>
          )}
        </div>

        {view === 'login' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[9px] uppercase font-bold tracking-[0.2em] ml-4 text-black/40">Email Address</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/40 border border-black/5 rounded-[2rem] p-5 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/10 transition-all placeholder-black/20"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[9px] uppercase font-bold tracking-[0.2em] ml-4 text-black/40">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/40 border border-black/5 rounded-[2rem] p-5 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/10 transition-all placeholder-black/20"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 mt-4 rounded-[2rem] text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center shadow-xl shadow-black/10"
            >
              {loading ? (
                 <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>Login</span>
              )}
            </button>

            <div className="mt-8 text-center">
              <button 
                type="button"
                onClick={() => setView('forgot')}
                className="text-black/40 border-b border-black/10 pb-0.5 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-black transition-colors"
              >
                Forgotten Password?
              </button>
            </div>
          </form>
        ) : view === 'forgot' ? (
          <form onSubmit={handleRecovery} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[9px] uppercase font-bold tracking-[0.2em] ml-4 text-black/40">Registered Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/40 border border-black/5 rounded-[2rem] p-5 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/10 transition-all placeholder-black/20"
                placeholder="email@example.com"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-5 mt-4 rounded-[2rem] text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-zinc-800 transition-all flex items-center justify-center shadow-xl shadow-black/10"
            >
              {loading ? (
                 <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span>Send Recovery Link</span>
              )}
            </button>

            <div className="mt-8 text-center">
              <button 
                type="button"
                onClick={() => setView('login')}
                className="text-black/40 border-b border-black/10 pb-0.5 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-black transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 animate-fade-in">
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-black/60 leading-relaxed mb-8 px-4 font-normal">
              A Password recovery link has been dispatched to your registered email address.
            </p>
            <button 
              onClick={() => setView('login')}
              className="w-full bg-black text-white py-5 rounded-[2rem] text-[10px] uppercase font-bold tracking-[0.4em] hover:bg-zinc-800 transition-all"
            >
              Return to Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
