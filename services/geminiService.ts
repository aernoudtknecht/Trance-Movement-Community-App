
import { GoogleGenAI, Type } from "@google/genai";
import { ActivityItem, TranceEvent, ResourceArticle, Facilitator } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchSimulatedActivity = async (): Promise<ActivityItem[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate 5 simulated social media activity posts for a trance music community called 'Trance Movement'. Include user names, avatars (use random picsum urls), enthusiastic trance-related content about DJs, festivals, or tracks, and a few likes/comments count.",
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
  } catch (error) {
    console.error("Error fetching activity:", error);
    return [];
  }
};

export const fetchSimulatedEvents = async (): Promise<TranceEvent[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate 3 upcoming trance music events. Include title, location, date, a vivid description, and a banner image URL (use high quality music festival related images).",
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
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const fetchSimulatedResources = async (): Promise<ResourceArticle[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate 4 educational articles about trance movement, breathwork, and conscious dancing. Include title, a short excerpt, category, and an evocative image URL.",
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
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
};

export const fetchSimulatedFacilitators = async (): Promise<Facilitator[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate 6 international facilitator profiles for Trance Movement. Include name, specialty (e.g. Somatic Breathwork, Ecstatic Dance DJ), location (global), a bio, and a professional-looking avatar URL.",
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
  } catch (error) {
    console.error("Error fetching facilitators:", error);
    return [];
  }
};
