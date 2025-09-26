import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const canSubmit = fullName.trim() && /\S+@\S+\.\S+/.test(email) && password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('hasProfile', 'false');
      const userProfile = {
        name: fullName,
        email,
        phone: '',
        location: '',
      };
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      navigate('/profile-setup');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      <header className="bg-white shadow-sm border-b-4 border-orange-500">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-white to-green-600 rounded-full flex items-center justify-center border-2 border-blue-900">
                <div className="text-blue-900 font-bold text-sm">भारत</div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-blue-900 leading-tight">PM Internship Scheme</h1>
              <p className="text-xs text-gray-600 mt-1">Ministry of Corporate Affairs | Government of India</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{t('register') || 'Create Account'}</h2>
          <p className="text-gray-600 text-sm mb-6">{t('helpText')?.personal || 'This helps us personalize your experience.'}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('fullName') || 'Full Name'}</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder={t('enterFullName') || 'Enter your full name'} className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('emailAddress') || 'Email Address'}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('enterEmail') || 'Enter your email address'} className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            </div>
            <button type="submit" disabled={!canSubmit || isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              {isLoading ? '...' : (t('register') || 'Register')}
            </button>
          </form>
          <div className="text-center text-sm text-gray-600 mt-4">
            <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">{t('login') || 'Login'}</button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs text-gray-500">{t('digitalIndia') || 'Digital India Initiative'}</p>
          <p className="text-xs text-gray-400 mt-1">© 2024 Government of India</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;


