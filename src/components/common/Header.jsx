import React from 'react';

const Header = () => (
  <header className="bg-white shadow-sm border-b-4 border-orange-500">
    <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 via-white to-green-600 rounded-full flex items-center justify-center border-2 border-blue-900">
            <div className="text-blue-900 font-bold text-sm sm:text-lg">भारत</div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 leading-tight">
            PM Internship Scheme
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Ministry of Corporate Affairs | भारत सरकार
          </p>
        </div>
      </div>
    </div>
  </header>
);

export default Header;