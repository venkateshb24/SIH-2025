import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loginMethod, setLoginMethod] = useState(null); // 'phone', 'aadhaar', 'email'
  const [step, setStep] = useState('methods'); // 'methods', 'input', 'otp'
  const [inputValue, setInputValue] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (step === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, otpTimer]);

  const handleLoginMethodSelect = (method) => {
    setLoginMethod(method);
    setStep('input');
  };

  const handleSendOTP = () => {
    if (!validateInput()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (loginMethod === 'email') {
        // Email login completes immediately in this mock
        onAuthSuccess();
      } else {
        setStep('otp');
        setOtpTimer(30);
      }
    }, 1000);
  };

  const onAuthSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true');
    const hasProfile = localStorage.getItem('hasProfile') === 'true';
    navigate(hasProfile ? '/home' : '/profile-setup');
  };

  const handleVerifyOTP = () => {
    if (otpValue.length !== 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 1000);
  };

  const handleResendOTP = () => {
    setOtpTimer(30);
    // toast could be added
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    const trimmed = numbers.substring(0, 10);
    return trimmed.replace(/(\d{5})(\d{0,5})/, (m, a, b) => (b ? `${a} ${b}` : a));
  };

  const formatAadhaarNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    const trimmed = numbers.substring(0, 12);
    return trimmed.replace(/(\d{4})(\d{0,4})(\d{0,4})/, (m, a, b, c) => [a, b, c].filter(Boolean).join(' '));
  };

  const validateInput = () => {
    switch (loginMethod) {
      case 'phone':
        return inputValue.replace(/\D/g, '').length === 10;
      case 'aadhaar':
        return inputValue.replace(/\D/g, '').length === 12;
      case 'email':
        return /\S+@\S+\.\S+/.test(inputValue);
      default:
        return false;
    }
  };

  const getInputPlaceholder = () => {
    switch (loginMethod) {
      case 'phone':
        return t('enterPhone') || 'Enter your mobile number';
      case 'aadhaar':
        return t('enterAadhaar') || 'Enter your 12-digit Aadhaar number';
      case 'email':
        return t('enterEmail') || 'Enter your email address';
      default:
        return '';
    }
  };

  const getInputLabel = () => {
    switch (loginMethod) {
      case 'phone':
        return t('phoneNumber') || 'Phone Number';
      case 'aadhaar':
        return t('aadhaarNumber') || 'Aadhaar Number';
      case 'email':
        return t('emailAddress') || 'Email Address';
      default:
        return '';
    }
  };

  const getHelpText = () => {
    switch (loginMethod) {
      case 'phone':
        return t('phoneHelp') || "We'll send you a verification code";
      case 'aadhaar':
        return t('aadhaarHelp') || 'Secure authentication using your Aadhaar';
      case 'email':
        return t('emailHelp') || "We'll send a login link to your email";
      default:
        return '';
    }
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
        {step === 'methods' && (
          <>
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('loginTitle') || 'Login to Continue'}</h2>
              <p className="text-gray-600 text-sm">{t('loginSubtitle') || 'Choose your preferred login method'}</p>
            </div>

            <div className="space-y-4">
              <button onClick={() => handleLoginMethodSelect('phone')} className="w-full flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">{t('loginWithPhone') || 'Login with Phone Number'}</div>
                  <div className="text-sm text-gray-500">{t('phoneHelp') || "We'll send you a verification code"}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button onClick={() => handleLoginMethodSelect('aadhaar')} className="w-full flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">{t('loginWithAadhaar') || 'Login with Aadhaar'}</div>
                  <div className="text-sm text-gray-500">{t('aadhaarHelp') || 'Secure authentication using your Aadhaar'}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button onClick={() => handleLoginMethodSelect('email')} className="w-full flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900">{t('loginWithEmail') || 'Login with Email'}</div>
                  <div className="text-sm text-gray-500">{t('emailHelp') || "We'll send a login link to your email"}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}

        {step === 'input' && (
          <>
            <button onClick={() => setStep('methods')} className="flex items-center space-x-2 text-blue-600 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t('backToOptions') || 'Back to Login Options'}</span>
            </button>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{getInputLabel()}</h3>
                <p className="text-gray-600 text-sm mt-2">{getHelpText()}</p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">{getInputLabel()}</label>
                <input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  value={inputValue}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (loginMethod === 'phone') value = formatPhoneNumber(value);
                    else if (loginMethod === 'aadhaar') value = formatAadhaarNumber(value);
                    setInputValue(value);
                  }}
                  placeholder={getInputPlaceholder()}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg"
                />
              </div>
              <button onClick={handleSendOTP} disabled={!validateInput() || isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>...</span>
                  </div>
                ) : loginMethod === 'email' ? (t('login') || 'Login') : (t('sendOTP') || 'Send OTP')}
              </button>
            </div>
          </>
        )}

        {step === 'otp' && (
          <>
            <button onClick={() => setStep('input')} className="flex items-center space-x-2 text-blue-600 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t('backToOptions') || 'Back'}</span>
            </button>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{t('enterOTP') || 'Enter 6-digit OTP'}</h3>
                <p className="text-gray-600 text-sm mt-2">{(t('otpSent') || 'OTP sent to') + ' ' + inputValue}</p>
                <div className={`text-sm mt-2 ${otpTimer > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                  {(t('otpExpires') || 'OTP expires in') + ' ' + otpTimer + ' ' + (t('seconds') || 'seconds')}
                </div>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 6) setOtpValue(value);
                  }}
                  placeholder="000000"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg text-center tracking-widest"
                  maxLength="6"
                />
              </div>
              <button onClick={handleVerifyOTP} disabled={otpValue.length !== 6 || isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4">
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>...</span>
                  </div>
                ) : (t('verifyOTP') || 'Verify OTP')}
              </button>
              <button onClick={handleResendOTP} disabled={otpTimer > 0} className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {t('resendOTP') || 'Resend OTP'}
              </button>
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <button onClick={() => navigate('/register')} className="text-blue-600 hover:underline">
              {(t('newUser') || 'New here?') + ' '}<span className="font-medium">{t('createAccount') || 'Create Account'}</span>
            </button>
            <button className="text-gray-600 hover:underline">
              {t('contactSupport') || 'Contact Support'}
            </button>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">{t('digitalIndia') || 'Digital India Initiative'}</p>
            <p className="text-xs text-gray-400 mt-1">© 2024 Government of India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;


