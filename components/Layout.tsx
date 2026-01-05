
import React from 'react';
import { AppSection } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, setActiveSection, onLogout }) => {
  const logoUrl = "https://trance-movement.com/wp-content/uploads/2024/04/Logo-website.png";
  const menuBg = "https://trance-movement.com/wp-content/uploads/2024/04/Trance-Movement-com-menu-background-1.jpg";

  // Navigation items
  const navItems = [
    { id: AppSection.PROFILE, label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: AppSection.ACTIVITY, label: 'Activity', icon: 'M19 20H5V10h14v10zM5 8V6h14v2H5z' },
    { id: AppSection.COURSES, label: 'Courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: AppSection.GROUPS, label: 'Groups', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: AppSection.MESSAGES, label: 'Messages', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: AppSection.EVENTS, label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  // Desaturated Quartz Rose (Toned down pink, half saturation)
  const accentColor = "#d4baba";

  return (
    <div className="flex h-screen w-full overflow-hidden text-black bg-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass-panel p-6 space-y-6 z-20 border-r border-black/5 bg-white/80">
        <div className="flex flex-col items-center mb-6 cursor-pointer" onClick={() => setActiveSection(AppSection.PORTAL)}>
          <img src={logoUrl} alt="Trance Movement" className="w-40 h-auto mb-2" />
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-300 border-l-4 ${
                activeSection === item.id 
                  ? 'bg-black text-white border-[#d4baba] shadow-md translate-x-1' 
                  : 'text-black border-transparent hover:bg-black/5'
              }`}
            >
              <svg 
                className={`w-4 h-4 transition-colors ${activeSection === item.id ? 'text-[#d4baba]' : 'text-black'}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-black/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-black/30 hover:text-black transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-[9px] uppercase font-bold tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden z-10 bg-transparent">
        
        {/* Content Container */}
        <div className="flex-1 overflow-hidden relative pb-14 md:pb-0">
          {children}
        </div>

        {/* MOBILE BOTTOM NAVIGATION */}
        <nav 
          className="md:hidden flex justify-around items-center px-0 py-0 border-t border-black/10 z-[100] fixed bottom-0 left-0 right-0 h-14 bg-white"
          style={{
            backgroundImage: `url('${menuBg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle overlay for the background image */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] pointer-events-none"></div>
          
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex-1 h-full flex flex-col items-center justify-center transition-all duration-300 relative ${
                activeSection === item.id 
                  ? 'bg-black text-white' 
                  : 'text-black hover:bg-white/40'
              }`}
            >
              {/* Highlight Bar - Desaturated Quartz Rose */}
              {activeSection === item.id && (
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: accentColor }}></div>
              )}
              
              <div className="flex flex-col items-center space-y-0.5">
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${activeSection === item.id ? 'scale-110' : 'text-black opacity-80'}`} 
                  style={{ color: activeSection === item.id ? accentColor : undefined }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={activeSection === item.id ? 2 : 1.5} d={item.icon} />
                </svg>
                <span className={`text-[7px] uppercase font-bold tracking-[0.05em] transition-colors ${activeSection === item.id ? 'text-white' : 'text-black opacity-60'}`}>
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};

export default Layout;
