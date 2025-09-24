import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations';

const languages = [
  { code: 'hi', name: 'हिंदी', englishName: 'Hindi', flag: '🇮🇳' },
  { code: 'en', name: 'English', englishName: 'English', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', flag: '🇮🇳' }
];

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within TranslationProvider');
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', currentLanguage);
  }, [currentLanguage]);

  const t = (key) => translations[currentLanguage]?.[key] || translations.en[key] || key;
  const changeLanguage = (langCode) => setCurrentLanguage(langCode);

  return (
    <TranslationContext.Provider value={{ t, changeLanguage, currentLanguage, languages }}>
      {children}
    </TranslationContext.Provider>
  );
};