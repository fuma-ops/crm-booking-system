import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('clinic-os-lang');
    return (saved as Language) || 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('clinic-os-lang', lang);
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = React.useMemo(() => {
    const base = translations.fr;
    const current = translations[language] || {};
    
    // Simple deep merge for the main keys
    const merge = (b: any, c: any) => {
      const res = { ...b };
      if (!c) return res;
      Object.keys(c).forEach(key => {
        if (c[key] && typeof c[key] === 'object' && !Array.isArray(c[key])) {
          res[key] = { ...b[key], ...c[key] };
        } else {
          res[key] = c[key];
        }
      });
      return res;
    };
    
    return merge(base, current);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};
