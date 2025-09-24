import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const LanguageCard = ({ language, isSelected, isLoading, onSelect }) => (
  <button
    onClick={() => onSelect(language.code)}
    disabled={isLoading}
    className={`relative group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 ${
      isSelected
        ? 'border-blue-500 bg-blue-50 scale-105'
        : 'border-gray-200 hover:border-blue-300'
    } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    {isSelected && isLoading && (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-xl">
        <LoadingSpinner />
      </div>
    )}
    <div className="text-center space-y-3">
      <div className="text-3xl mb-2">{language.flag}</div>
      <div className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
        {language.name}
      </div>
      <div className="text-sm text-gray-500">
        {language.englishName}
      </div>
    </div>
    {isSelected && (
      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    )}
  </button>
);

export default LanguageCard;