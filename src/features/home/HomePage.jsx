import React, { useState } from 'react';
import { TranslationProvider, useTranslation } from '../../context/TranslationContext';
import { useNavigate } from 'react-router-dom'; 
import InternshipCard from './components/InternshipCard';

const HomeContent = () => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [userProfile] = useState(null); // or useState(undefined)

  // Mock AI recommendations
  const aiRecommendations = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TCS Digital',
      location: 'Chennai, Tamil Nadu',
      duration: '6 months',
      stipend: '₹25,000/month',
      matchScore: 95,
      matchReasons: ['Matches your JavaScript skills', 'Located in Chennai', 'CS Engineering preferred'],
      logo: '🏢',
      deadline: '15',
      tags: ['Web Development', 'JavaScript', 'React']
    },
    {
      id: 2,
      title: 'Software Development Intern',
      company: 'Infosys Mysore',
      location: 'Mysore, Karnataka',
      duration: '4 months',
      stipend: '₹20,000/month',
      matchScore: 88,
      matchReasons: ['Perfect for CS students', 'Web Development focus', 'Great for beginners'],
      logo: '💻',
      deadline: '22',
      tags: ['Software Development', 'Training Program']
    },
    {
      id: 3,
      title: 'UI/UX Developer Intern',
      company: 'Wipro Technologies',
      location: 'Bangalore, Karnataka',
      duration: '5 months',
      stipend: '₹22,000/month',
      matchScore: 82,
      matchReasons: ['Frontend skills match', 'South India location', 'Growth opportunities'],
      logo: '🎨',
      deadline: '18',
      tags: ['UI/UX', 'Frontend', 'Design']
    }
  ];

  const categories = [
    { id: 'all', name: t('allCategory'), icon: '🌟' },
    { id: 'tech', name: t('technology'), icon: '💻' },
    { id: 'design', name: t('design'), icon: '🎨' },
    { id: 'marketing', name: t('marketing'), icon: '📈' },
    { id: 'engineering', name: t('engineering'), icon: '⚙️' },
    { id: 'data', name: t('dataScience'), icon: '📊' }
  ];

   return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
       <header className="bg-white shadow-sm border-b-4 border-orange-500 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div>
              {/* You can add a logo or title here if needed */}
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold hover:bg-blue-700 transition"
              title={t('settings') || 'Settings'}
            >
              {/* User/Profile Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </header>

      {/* Search & Filters */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>{t('filters')}</span>
            </button>
          </div>
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* AI Recommendations Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                <span className="text-3xl">🎯</span>
                <span>{t('recommendedForYou')}</span>
              </h2>
              <p className="text-gray-600 mt-1 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm">{t('aiPowered')}</span>
              </p>
            </div>
            {/* Quick Stats */}
            <div className="hidden sm:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-blue-600">3</div>
                <div className="text-gray-500">{t('perfectMatches')}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-600">95%</div>
                <div className="text-gray-500">{t('bestMatch')}</div>
              </div>
            </div>
          </div>
          {/* Recommended Internships Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {aiRecommendations.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} isRecommended={true} />
            ))}
          </div>
          {/* Recommendation Actions */}
          <div className="mt-6 text-center">
            <button className="bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-200 transition-colors">
              {t('getMoreRec')}
            </button>
          </div>
        </section>

        {/* Explore All Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <span className="text-3xl">🌟</span>
              <span>{t('exploreAll')}</span>
            </h2>
            <p className="text-gray-500 text-sm">
              6 {t('available')}
            </p>
          </div>
          {/* Additional Internships */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <InternshipCard 
              internship={{
                id: 4,
                title: 'Data Analytics Intern',
                company: 'HCL Technologies',
                location: 'Noida, Uttar Pradesh',
                duration: '3 months',
                stipend: '₹18,000/month',
                logo: '📊',
                deadline: '12',
                tags: ['Data Analytics', 'Python']
              }} 
            />
            <InternshipCard 
              internship={{
                id: 5,
                title: 'Marketing Intern',
                company: 'Reliance Industries',
                location: 'Mumbai, Maharashtra',
                duration: '4 months',
                stipend: '₹15,000/month',
                logo: '📈',
                deadline: '25',
                tags: ['Marketing', 'Digital']
              }} 
            />
            <InternshipCard 
              internship={{
                id: 6,
                title: 'Mechanical Engineer Intern',
                company: 'Tata Motors',
                location: 'Pune, Maharashtra',
                duration: '6 months',
                stipend: '₹28,000/month',
                logo: '⚙️',
                deadline: '8',
                tags: ['Mechanical', 'Automotive']
              }} 
            />
          </div>
          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              {t('loadMore')}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

const HomePage = () => (
    <HomeContent />
);

export default HomePage;