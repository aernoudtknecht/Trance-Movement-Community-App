
import React, { useState, useEffect } from 'react';
import { AppSection, User } from './types';
import Layout from './components/Layout';
import BrowserView from './components/BrowserView';
import Login from './components/Login';

const SECTION_URLS: Record<AppSection, string> = {
  [AppSection.ACTIVITY]: 'https://trance-movement.com/activity/',
  [AppSection.EVENTS]: 'https://trance-movement.com/events/',
  [AppSection.RESOURCES]: 'https://trance-movement.com/resources/',
  [AppSection.FACILITATORS]: 'https://trance-movement.com/members/',
  [AppSection.MESSAGES]: 'https://trance-movement.com/messages/',
  [AppSection.GROUPS]: 'https://trance-movement.com/groups/',
  [AppSection.PORTAL]: 'https://trance-movement.com/',
  [AppSection.PROFILE]: 'https://trance-movement.com/profile/',
  [AppSection.COURSES]: 'https://trance-movement.com/online-courses/'
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.PORTAL);
  const [currentUrl, setCurrentUrl] = useState<string>(SECTION_URLS[AppSection.PORTAL]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Persistence Check on Launch
  useEffect(() => {
    const savedUser = localStorage.getItem('trance_session');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        // If returning, go straight to Activity
        setActiveSection(AppSection.ACTIVITY);
        setCurrentUrl(getUrlForSection(AppSection.ACTIVITY, user));
      } catch (e) {
        console.error("Failed to restore session");
      }
    }
    setIsInitialized(true);
  }, []);

  // Helper to generate dynamic URLs based on username
  const getUrlForSection = (section: AppSection, user: User | null): string => {
    if (!user) return SECTION_URLS[section];
    
    // Sluggify username (lowercase, replace spaces with hyphens)
    const userSlug = user.name.toLowerCase().trim().replace(/\s+/g, '-');

    switch (section) {
      case AppSection.PROFILE:
        return `https://trance-movement.com/facilitators/${userSlug}/`;
      case AppSection.MESSAGES:
        return `https://trance-movement.com/facilitators/${userSlug}/messages/`;
      default:
        return SECTION_URLS[section];
    }
  };

  const handleLogin = (user: User) => {
    // Save session to localStorage so user stays logged in like Instagram/Facebook
    localStorage.setItem('trance_session', JSON.stringify(user));
    setCurrentUser(user);
    
    // After login, immediately route to Activity
    const initialSection = AppSection.ACTIVITY;
    setActiveSection(initialSection);
    setCurrentUrl(getUrlForSection(initialSection, user));
  };

  const handleLogout = () => {
    localStorage.removeItem('trance_session');
    setCurrentUser(null);
    setActiveSection(AppSection.PORTAL);
    setCurrentUrl(SECTION_URLS[AppSection.PORTAL]);
  };

  const handleSectionChange = (section: AppSection) => {
    setActiveSection(section);
    setCurrentUrl(getUrlForSection(section, currentUser));
  };

  if (!isInitialized) return null; // Prevent flash of login screen

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      activeSection={activeSection} 
      setActiveSection={handleSectionChange}
      onLogout={handleLogout}
    >
      <BrowserView url={currentUrl} sectionName={activeSection} />
    </Layout>
  );
};

export default App;
