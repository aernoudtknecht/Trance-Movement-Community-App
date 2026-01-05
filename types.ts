
export enum AppSection {
  ACTIVITY = 'activity',
  EVENTS = 'events',
  MESSAGES = 'messages',
  PORTAL = 'portal',
  PROFILE = 'profile',
  RESOURCES = 'resources',
  FACILITATORS = 'facilitators',
  GROUPS = 'groups',
  COURSES = 'courses'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export interface TranceEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ResourceArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
}

export interface Facilitator {
  id: string;
  name: string;
  specialty: string;
  location: string;
  avatar: string;
  bio: string;
}
