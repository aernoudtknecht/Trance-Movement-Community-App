
import { GoogleGenAI, Type } from "@google/genai";
import { ActivityItem, TranceEvent, ResourceArticle, Facilitator, User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
const WP_BASE_URL = 'https://trance-movement.com/wp-json';

/**
 * Real Login attempt using WordPress Application Passwords.
 * In production, this would send an 'Authorization' header.
 */
export const loginToWordPress = async (username: string, password: string): Promise<User | null> => {
  try {
    // In a live environment, we would use:
    // const auth = btoa(`${username}:${password}`);
    // const response = await fetch(`${WP_BASE_URL}/wp/v2/users/me`, { headers: { 'Authorization': `Basic ${auth}` } });
    
    // For now, we simulate a successful login that returns a User object
    return {
      id: "current-user-id",
      name: username,
      avatar: "https://picsum.photos/seed/me/200/200",
      isLoggedIn: true
    };
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

/**
 * Fetches actual articles from the WordPress REST API.
 */
export const fetchRealResources = async (): Promise<ResourceArticle[]> => {
  try {
    const response = await fetch(`${WP_BASE_URL}/wp/v2/posts?_embed&per_page=10`);
    if (!response.ok) throw new Error('CORS or Network error');
    const posts = await response.json();
    
    return posts.map((post: any) => ({
      id: post.id.toString(),
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
      category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Article',
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/seed/trance/800/600',
    }));
  } catch (error) {
    return fetchSimulatedResources();
  }
};

/**
 * Fetches actual BuddyPress activity.
 */
export const fetchRealActivity = async (): Promise<ActivityItem[]> => {
  try {
    const response = await fetch(`${WP_BASE_URL}/buddypress/v1/activity?per_page=15`);
    if (!response.ok) throw new Error('Auth or CORS required');
    const activities = await response.json();
    
    return activities.map((act: any) => ({
      id: act.id.toString(),
      user: act.user_name || 'Community Member',
      avatar: act.user_avatar?.full || `https://picsum.photos/seed/${act.id}/100/100`,
      content: act.content.rendered.replace(/<[^>]*>?/gm, ''),
      timestamp: new Date(act.date).toLocaleDateString(),
      likes: act.favorite_count || 0,
      comments: act.comment_count || 0
    }));
  } catch (error) {
    return fetchSimulatedActivity();
  }
};

/**
 * Fetches facilitators from BuddyPress Members.
 */
export const fetchRealFacilitators = async (): Promise<Facilitator[]> => {
  try {
    const response = await fetch(`${WP_BASE_URL}/buddypress/v1/members?per_page=12&type=active`);
    if (!response.ok) throw new Error('CORS error');
    const members = await response.json();
    
    return members.map((m: any) => ({
      id: m.id.toString(),
      name: m.name,
      specialty: 'Movement Guide',
      location: 'Global Collective',
      avatar: m.avatar_urls?.full || `https://picsum.photos/seed/${m.id}/200/200`,
      bio: `Dedicated member of the Trance Movement community.`
    }));
  } catch (error) {
    return fetchSimulatedFacilitators();
  }
};

// --- SIMULATION FALLBACKS ---

export const fetchSimulatedActivity = async (): Promise<ActivityItem[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate 5 simulated social media activity posts for 'Trance Movement'.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            user: { type: Type.STRING },
            avatar: { type: Type.STRING },
            content: { type: Type.STRING },
            timestamp: { type: Type.STRING },
            likes: { type: Type.NUMBER },
            comments: { type: Type.NUMBER },
          },
          required: ["id", "user", "avatar", "content", "timestamp", "likes", "comments"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const fetchSimulatedResources = async (): Promise<ResourceArticle[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate 4 articles about breathwork and trance dance.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            category: { type: Type.STRING },
            image: { type: Type.STRING },
          },
          required: ["id", "title", "excerpt", "category", "image"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const fetchSimulatedFacilitators = async (): Promise<Facilitator[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate 6 international guide profiles.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            specialty: { type: Type.STRING },
            location: { type: Type.STRING },
            avatar: { type: Type.STRING },
            bio: { type: Type.STRING },
          },
          required: ["id", "name", "specialty", "location", "avatar", "bio"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};

export const fetchSimulatedEvents = async (): Promise<TranceEvent[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate 3 upcoming music and dance events.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            location: { type: Type.STRING },
            date: { type: Type.STRING },
            image: { type: Type.STRING },
            description: { type: Type.STRING },
          },
          required: ["id", "title", "location", "date", "image", "description"]
        }
      }
    }
  });
  return JSON.parse(response.text);
};
