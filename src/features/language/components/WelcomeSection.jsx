import React from 'react';

const WelcomeSection = ({ onArrowClick }) => (
  <div className="text-center mb-10">
    {/* Arrow Button */}
    <button
      onClick={onArrowClick}
      className="inline-block p-4 bg-white rounded-full shadow-lg mb-6 focus:outline-none hover:shadow-xl transition"
      aria-label="Continue"
    >
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
        </svg>
      </div>
    </button>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
      अपनी भाषा चुनें | Select Your Language
    </h2>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
      AI-powered internship recommendations tailored for you
      <br />
      <span className="text-sm text-gray-500">Choose your preferred language to continue</span>
    </p>
  </div>
);

export default WelcomeSection;