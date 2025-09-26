import React from 'react';
import { useTranslation } from '../../../context/TranslationContext';

const InternshipCard = ({ internship, isRecommended = false, onApply, onDismiss, onOpen }) => {
  const { t } = useTranslation();

  if (!internship) return null; // Prevent rendering if no data

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 ${isRecommended ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-white' : 'border-gray-100 hover:border-blue-200'} p-6 relative`}>
      {isRecommended && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          {internship.matchScore}% {t('matchScore')}
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
            {internship.logo}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{internship.title}</h3>
            <p className="text-gray-600 text-sm">{internship.company}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">📍</span>
          <span className="text-gray-700">{internship.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">⏰</span>
          <span className="text-gray-700">{internship.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">💰</span>
          <span className="text-green-600 font-medium">{internship.stipend}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">📅</span>
          <span className="text-orange-600 text-xs font-medium">{internship.deadline} {t('daysLeft')}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {(internship.tags || []).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
      {isRecommended && (internship.matchReasons?.length > 0) && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-medium text-blue-900 mb-2">{t('why')}</p>
          <ul className="space-y-1">
            {internship.matchReasons.map((reason, index) => (
              <li key={index} className="text-xs text-blue-700 flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={`flex gap-2 ${isRecommended ? 'flex-col sm:flex-row' : ''}`}>
        <button onClick={() => onOpen?.(internship)} className="flex-1 bg-white border border-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 text-sm">
          {t('moreDetails') || 'More Details'}
        </button>
        <button onClick={() => onApply?.(internship)} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-sm">
          {t('applyNow')}
        </button>
        <button onClick={() => onDismiss?.(internship)} className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">
          {t('notInterested')}
        </button>
      </div>
    </div>
  );
};

export default InternshipCard;