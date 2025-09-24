import React from 'react';
import LanguageCard from './languageCard';

const LanguageGrid = ({ languages, selectedLanguage, isLoading, onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {languages.map((language) => (
      <LanguageCard
        key={language.code}
        language={language}
        isSelected={selectedLanguage === language.code}
        isLoading={isLoading && selectedLanguage === language.code}
        onSelect={onSelect}
      />
    ))}
  </div>
);

export default LanguageGrid;