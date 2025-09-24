import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, languages } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
      >
        <span>{currentLang?.flag}</span>
        <span>{currentLang?.name}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  changeLanguage(language.code);
                  setShowDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3 ${
                  currentLanguage === language.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div>
                  <div className="font-medium">{language.name}</div>
                  <div className="text-xs text-gray-500">{language.englishName}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;