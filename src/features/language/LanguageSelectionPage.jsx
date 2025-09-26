import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../context/TranslationContext';
import WelcomeSection from './components/WelcomeSection';
import LanguageGrid from './components/LanguageGrid';
import PageLayout from '../../components/layout/PageLayout';

const LanguageSelectionPage = ({ onLanguageSelected }) => {
  const navigate = useNavigate();
  const { languages, changeLanguage, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState('');

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setWarning('');
    changeLanguage(languageCode); // Set language globally
  };

  // Handler for the top arrow button
  const handleArrowClick = () => {
    if (!selectedLanguage) {
      setWarning(t('chooseLanguageWarning') || 'Please choose a language');
      return;
    }
    setWarning('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLanguageSelected) onLanguageSelected(selectedLanguage);
      navigate('/welcome');
    }, 500);
  };

  return (
    <PageLayout>
      <WelcomeSection onArrowClick={handleArrowClick} loading={isLoading} />
      <div className="text-center my-4">
        <h2>{t('selectLanguage')}</h2>
        <p>{t('chooseLanguageDesc')}</p>
        {warning && (
          <div className="text-red-600 font-semibold mt-2">{warning}</div>
        )}
        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
      <LanguageGrid
        languages={languages}
        selectedLanguage={selectedLanguage}
        isLoading={isLoading}
        onSelect={handleLanguageSelect}
      />
    </PageLayout>
  );
};

export default LanguageSelectionPage;