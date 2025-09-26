import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';

const SettingsPage = () => {
  const { t, currentLanguage, changeLanguage, languages } = useTranslation();

  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('userProfile');
      const fallback = {
        name: '',
        email: '',
        phone: '',
        location: '',
        education: '',
        skills: [],
        interests: []
      };
      return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
    } catch {
      return { name: '', email: '', phone: '', location: '', education: '', skills: [], interests: [] };
    }
  });

  const [preferences, setPreferences] = useState({
    matchSensitivity: 'medium',
    locationRange: 'sameState',
    minSalary: 15000,
    fontSize: 'normal',
    highContrast: false,
    screenReader: false
  });

  const [notifications, setNotifications] = useState({
    email: { new: true, updates: true, deadlines: true },
    sms: { new: false, updates: true, deadlines: true },
    push: { new: true, updates: true, deadlines: false }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleSave = () => {
    try {
      const merged = { ...profile };
      localStorage.setItem('userProfile', JSON.stringify(merged));
      alert((t('saveChanges') || 'Save Changes') + ' - Settings saved successfully!');
    } catch {
      alert('Failed to save');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logging out...');
    }
  };

  const settingsSections = [
    { id: 'profile', icon: '👤', label: t('profileSettings') },
    { id: 'applications', icon: '📂', label: 'Applications' },
    { id: 'language', icon: '🌐', label: t('languagePreference') },
    { id: 'ai', icon: '🎯', label: t('aiPreferences') },
    { id: 'notifications', icon: '🔔', label: t('notifications') },
    { id: 'accessibility', icon: '♿', label: t('accessibility') },
    { id: 'help', icon: '❓', label: t('helpSupport') },
    { id: 'account', icon: '⚙️', label: t('account') }
  ];

  const SettingCard = ({ children, title, description }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600 text-sm mb-4">{description}</p>}
      {children}
    </div>
  );

  const Toggle = ({ checked, onChange, label }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <SettingCard title={t('personalInfo')} description="Update your personal information and preferences">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('name')}</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('phone')}</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('location')}</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('education')}</label>
                  <input
                    type="text"
                    value={profile.education}
                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </SettingCard>
          </div>
        );

      case 'applications':
        {
          let applied = [];
          let catalog = [];
          try { applied = JSON.parse(localStorage.getItem('appliedInternships') || '[]'); } catch {}
          try { catalog = JSON.parse(localStorage.getItem('catalog') || '[]'); } catch {}
          const appliedItems = catalog.filter((c) => applied.includes(c.id));
          return (
            <div className="space-y-6">
              <SettingCard title="Applied Internships" description="Track your applications">
                {appliedItems.length === 0 ? (
                  <div className="text-gray-500 text-sm">No applications yet.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {appliedItems.map((it) => (
                      <div key={it.id} className="p-4 border rounded-lg flex items-start space-x-3">
                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-lg">{it.logo || '🏢'}</div>
                        <div>
                          <div className="font-medium text-gray-900">{it.title}</div>
                          <div className="text-sm text-gray-600">{it.company}</div>
                          <div className="text-xs text-gray-500 mt-1">{it.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SettingCard>
            </div>
          );
        }

      case 'language':
        return (
          <div className="space-y-6">
            <SettingCard title={t('languagePreference')} description={t('selectLanguage')}>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌐</span>
                    <div>
                      <p className="font-medium text-blue-900">{t('currentLanguage')}</p>
                      <p className="text-blue-700 text-sm">
                        {languages.find((l) => l.code === currentLanguage)?.name} ({languages.find((l) => l.code === currentLanguage)?.englishName})
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLanguageModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Change
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`p-4 text-center border rounded-lg transition-colors ${
                        currentLanguage === lang.code
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{lang.flag}</div>
                      <div className="font-medium text-sm">{lang.name}</div>
                      <div className="text-xs text-gray-500">{lang.englishName}</div>
                    </button>
                  ))}
                </div>
              </div>
            </SettingCard>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <SettingCard title={t('aiPreferences')} description={t('aiDescription')}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('matchSensitivity')}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['high', 'medium', 'low'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setPreferences({ ...preferences, matchSensitivity: level })}
                        className={`p-3 text-center border rounded-lg transition-colors ${
                          preferences.matchSensitivity === level
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        {t(level)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('locationRange')}</label>
                  <div className="space-y-2">
                    {['sameCity', 'sameState', 'anywhere'].map((range) => (
                      <label
                        key={range}
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="locationRange"
                          value={range}
                          checked={preferences.locationRange === range}
                          onChange={(e) => setPreferences({ ...preferences, locationRange: e.target.value })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span>{t(range)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('salaryRange')}</label>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">₹10,000</span>
                    <input
                      type="range"
                      min="10000"
                      max="50000"
                      step="5000"
                      value={preferences.minSalary}
                      onChange={(e) => setPreferences({ ...preferences, minSalary: parseInt(e.target.value) })}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm">₹50,000</span>
                  </div>
                  <div className="text-center mt-2 text-blue-600 font-medium">₹{preferences.minSalary.toLocaleString()}/month</div>
                </div>
              </div>
            </SettingCard>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <SettingCard title={t('emailNotifications')}>
              <div className="divide-y divide-gray-200">
                <Toggle
                  checked={notifications.email.new}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      email: { ...notifications.email, new: value }
                    })
                  }
                  label={t('newRecommendations')}
                />
                <Toggle
                  checked={notifications.email.updates}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      email: { ...notifications.email, updates: value }
                    })
                  }
                  label={t('applicationUpdates')}
                />
                <Toggle
                  checked={notifications.email.deadlines}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      email: { ...notifications.email, deadlines: value }
                    })
                  }
                  label={t('deadlineReminders')}
                />
              </div>
            </SettingCard>

            <SettingCard title={t('smsNotifications')}>
              <div className="divide-y divide-gray-200">
                <Toggle
                  checked={notifications.sms.new}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      sms: { ...notifications.sms, new: value }
                    })
                  }
                  label={t('newRecommendations')}
                />
                <Toggle
                  checked={notifications.sms.updates}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      sms: { ...notifications.sms, updates: value }
                    })
                  }
                  label={t('applicationUpdates')}
                />
                <Toggle
                  checked={notifications.sms.deadlines}
                  onChange={(value) =>
                    setNotifications({
                      ...notifications,
                      sms: { ...notifications.sms, deadlines: value }
                    })
                  }
                  label={t('deadlineReminders')}
                />
              </div>
            </SettingCard>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-6">
            <SettingCard title={t('accessibility')} description="Customize the interface for better accessibility">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('fontSize')}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['small', 'normal', 'large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setPreferences({ ...preferences, fontSize: size })}
                        className={`p-3 text-center border rounded-lg transition-colors ${
                          preferences.fontSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className={`${
                          size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'
                        }`}
                        >
                          {t(size)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  <Toggle
                    checked={preferences.highContrast}
                    onChange={(value) => setPreferences({ ...preferences, highContrast: value })}
                    label={t('highContrast')}
                  />
                  <Toggle
                    checked={preferences.screenReader}
                    onChange={(value) => setPreferences({ ...preferences, screenReader: value })}
                    label={t('screenReader')}
                  />
                </div>
              </div>
            </SettingCard>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6">
            <SettingCard title={t('helpSupport')} description="Get help and learn how to use the portal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <span className="text-2xl">📖</span>
                  <div>
                    <div className="font-medium">{t('howToUse')}</div>
                    <div className="text-sm text-gray-500">Step-by-step guide</div>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <span className="text-2xl">❓</span>
                  <div>
                    <div className="font-medium">{t('faq')}</div>
                    <div className="text-sm text-gray-500">Common questions</div>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <span className="text-2xl">🎥</span>
                  <div>
                    <div className="font-medium">{t('videoTutorials')}</div>
                    <div className="text-sm text-gray-500">Video guides</div>
                  </div>
                </button>

                <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-medium">{t('contactSupport')}</div>
                    <div className="text-sm text-gray-500">Get direct help</div>
                  </div>
                </button>
              </div>
            </SettingCard>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <SettingCard title={t('account')} description="Manage your account and data">
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🔑</span>
                    <span>{t('changePassword')}</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📥</span>
                    <span>{t('downloadData')}</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 border border-orange-200 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-orange-700"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🚪</span>
                    <span>{t('logout')}</span>
                  </div>
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-red-700">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🗑️</span>
                    <span>{t('deleteAccount')}</span>
                  </div>
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </SettingCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Indian Emblem */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 via-white to-green-600 rounded-full flex items-center justify-center border-2 border-blue-900">
                  <div className="text-blue-900 font-bold text-xs sm:text-sm">भारत</div>
                </div>
              </div>
              {/* Title */}
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-blue-900">{t('pmScheme')}</h1>
                <p className="text-sm text-gray-600">{t('settings')}</p>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">{t('backToHome')}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === section.id
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{section.icon}</span>
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {renderContent()}
            {/* Action Buttons */}
            {activeTab !== 'help' && activeTab !== 'account' && (
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                >
                  {t('saveChanges')}
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  {t('cancel')}
                </button>
                <button className="flex-1 bg-orange-100 text-orange-700 py-3 px-6 rounded-lg font-medium hover:bg-orange-200 transition-colors">
                  {t('reset')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-96 overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t('selectLanguage')}</h3>
                <button
                  onClick={() => setShowLanguageModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setShowLanguageModal(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                      currentLanguage === lang.code
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <div className="font-medium">{lang.name}</div>
                      <div className="text-sm text-gray-500">{lang.englishName}</div>
                    </div>
                    {currentLanguage === lang.code && (
                      <span className="ml-auto text-blue-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation (for smaller screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-center space-x-4 overflow-x-auto">
          {settingsSections.slice(0, 4).map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg min-w-16 ${
                activeTab === section.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600'
              }`}
            >
              <span className="text-xl">{section.icon}</span>
              <span className="text-xs font-medium truncate">{section.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default SettingsPage;
