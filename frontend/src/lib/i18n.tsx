import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from "react";

export type Language = 'en' | 'zh-CN' | 'zh-TW';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
}

export const languages: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
];

export const STORAGE_KEY = 'vibe-trading-language';

type Messages = typeof import('./locales/en').messages;

const messagesMap: Record<Language, Messages> = {
  'en': {} as Messages,
  'zh-CN': {} as Messages,
  'zh-TW': {} as Messages,
};

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && languages.some(l => l.code === stored)) {
    return stored;
  }
  
  const browserLang = navigator.language;
  if (browserLang.startsWith('zh-CN') || browserLang === 'zh-Hans') {
    return 'zh-CN';
  }
  if (browserLang.startsWith('zh') || browserLang === 'zh-Hant') {
    return 'zh-TW';
  }
  
  return 'en';
}

interface I18nContextType {
  t: Messages;
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: LanguageConfig[];
}

const I18nCtx = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [messages, setMessages] = useState<Messages>(messagesMap['en']);

  useEffect(() => {
    const loadMessages = async () => {
      const lang = getInitialLanguage();
      setLanguageState(lang);
      
      try {
        const module = await import(`./locales/${lang}.ts`);
        setMessages(module.messages);
      } catch (error) {
        console.warn(`Failed to load messages for ${lang}, falling back to English`);
        try {
          const enModule = await import('./locales/en.ts');
          setMessages(enModule.messages);
        } catch {
          console.error('Failed to load English messages');
        }
      }
    };
    
    loadMessages();
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    
    import(`./locales/${lang}.ts`)
      .then(module => {
        setMessages(module.messages);
      })
      .catch(error => {
        console.error(`Failed to load messages for ${lang}:`, error);
      });
  };

  const contextValue = useMemo(() => ({
    t: messages,
    language,
    setLanguage,
    languages,
  }), [messages, language]);

  return (
    <I18nCtx.Provider value={contextValue}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nCtx);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
