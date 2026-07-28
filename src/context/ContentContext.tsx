import React, { createContext, useContext, useState, useEffect } from "react";
import { APP_CONFIG, MODULES, SPEAKERS, FAQS, VIDEOS } from "../data";
import { ModulItem, SpeakerItem, FAQItem, VideoItem } from "../types";

export interface AppConfigType {
  earlyBirdDeadline: string;
  eventDates: string;
  eventTime: string;
  eventLocation: string;
  waAdmin: string;
  waCS: string;
  prices: {
    masterclassNormal: string;
    masterclassCurrent: string;
    earlyBirdNormal: string;
    earlyBirdCurrent: string;
    mitraNormal: string;
    mitraCurrent: string;
    [key: string]: string;
  };
  slotTotal: number;
  slotTaken: number;
  heroBgUrl?: string;
  heroHeadlineTitle?: string;
  heroHeadlineSubtitle?: string;
  heroVideoUrl?: string;
  topBannerText?: string;
}

export interface SiteContentState {
  appConfig: AppConfigType;
  modules: ModulItem[];
  speakers: SpeakerItem[];
  faqs: FAQItem[];
  videos: VideoItem[];
}

const DEFAULT_CONFIG: AppConfigType = {
  ...APP_CONFIG,
  heroBgUrl: "https://lh3.googleusercontent.com/d/1xXjsZbHy46u6KcNG5Xw7rHiQT15K5HA2",
  heroHeadlineTitle: "BANGUN SISTEM KONTEN KAMU DENGAN AI SEKARANG!",
  heroHeadlineSubtitle: "Stop bikin konten manual satu per satu! Kreator yang tumbuh cepat bukan karena timnya lebih besar — tapi karena mereka punya sistem.",
  heroVideoUrl: "https://youtu.be/Rt4q44v09qc",
  topBannerText: "🔥 HARGA KHUSUS MITRA UNIVERSITAS & MASTERCLASS: Rp 1.800.000 (Diskon hingga Rp 700 Ribu)!",
};

interface ContentContextType {
  content: SiteContentState;
  updateAppConfig: (partial: Partial<AppConfigType>) => void;
  setModules: (modules: ModulItem[]) => void;
  setSpeakers: (speakers: SpeakerItem[]) => void;
  setFaqs: (faqs: FAQItem[]) => void;
  setVideos: (videos: VideoItem[]) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = "maxy_aicc_site_content_v1";

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContentState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          appConfig: { ...DEFAULT_CONFIG, ...parsed.appConfig },
          modules: parsed.modules || MODULES,
          speakers: parsed.speakers || SPEAKERS,
          faqs: parsed.faqs || FAQS,
          videos: parsed.videos || VIDEOS,
        };
      }
    } catch (e) {
      console.error("Failed to load custom site content:", e);
    }
    return {
      appConfig: DEFAULT_CONFIG,
      modules: MODULES,
      speakers: SPEAKERS,
      faqs: FAQS,
      videos: VIDEOS,
    };
  });

  // Save to localStorage whenever content changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error("Failed to save site content:", e);
    }
  }, [content]);

  const updateAppConfig = (partial: Partial<AppConfigType>) => {
    setContent((prev) => ({
      ...prev,
      appConfig: {
        ...prev.appConfig,
        ...partial,
        prices: {
          ...prev.appConfig.prices,
          ...(partial.prices || {}),
        },
      },
    }));
  };

  const setModules = (modules: ModulItem[]) => {
    setContent((prev) => ({ ...prev, modules }));
  };

  const setSpeakers = (speakers: SpeakerItem[]) => {
    setContent((prev) => ({ ...prev, speakers }));
  };

  const setFaqs = (faqs: FAQItem[]) => {
    setContent((prev) => ({ ...prev, faqs }));
  };

  const setVideos = (videos: VideoItem[]) => {
    setContent((prev) => ({ ...prev, videos }));
  };

  const resetToDefault = () => {
    const defaultState: SiteContentState = {
      appConfig: DEFAULT_CONFIG,
      modules: MODULES,
      speakers: SPEAKERS,
      faqs: FAQS,
      videos: VIDEOS,
    };
    setContent(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateAppConfig,
        setModules,
        setSpeakers,
        setFaqs,
        setVideos,
        resetToDefault,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
};
