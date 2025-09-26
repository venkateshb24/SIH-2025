import React, { useState } from 'react';
import { TranslationProvider, useTranslation } from '../../context/TranslationContext';
import { useNavigate } from 'react-router-dom'; 
import InternshipCard from './components/InternshipCard';

const HomeContent = () => {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCount, setShowCount] = useState(9);
  const [appliedIds, setAppliedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('appliedInternships') || '[]'); } catch { return []; }
  });
  const [dismissedIds, setDismissedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dismissedInternships') || '[]'); } catch { return []; }
  });
  const navigate = useNavigate();
  const [userProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('userProfile');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Mock AI recommendations adapted to user profile
  const aiRecommendations = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TCS Digital',
      location:
        userProfile?.preferences?.preferredLocation === 'sameCity' && userProfile?.location
          ? userProfile.location
          : 'Chennai, Tamil Nadu',
      duration: '6 months',
      stipend: '₹25,000/month',
      matchScore: 95,
      matchReasons: [
        (userProfile?.skills || []).includes('JavaScript') ? 'Matches your JavaScript skills' : 'Frontend friendly role',
        userProfile?.location ? `Near ${userProfile.location}` : 'Popular metro location',
        'CS Engineering preferred'
      ],
      logo: '🏢',
      deadline: '15',
      tags: ['Web Development', 'JavaScript', 'React']
    },
    {
      id: 2,
      title: 'Software Development Intern',
      company: 'Infosys Mysore',
      location:
        userProfile?.preferences?.preferredLocation === 'sameState' && userProfile?.location?.includes(',')
          ? userProfile.location.split(',')[1].trim() + ', India'
          : 'Mysore, Karnataka',
      duration: '4 months',
      stipend: '₹20,000/month',
      matchScore: 88,
      matchReasons: [
        userProfile?.education ? `Good for ${userProfile.education}` : 'Great for CS students',
        (userProfile?.interests || []).includes('Web Development') ? 'Web Development focus' : 'Software foundations',
        'Great for beginners'
      ],
      logo: '💻',
      deadline: '22',
      tags: ['Software Development', 'Training Program']
    },
    {
      id: 3,
      title: 'UI/UX Developer Intern',
      company: 'Wipro Technologies',
      location: userProfile?.preferences?.preferredLocation === 'remote' ? 'Remote, India' : 'Bangalore, Karnataka',
      duration: '5 months',
      stipend: '₹22,000/month',
      matchScore: 82,
      matchReasons: [
        (userProfile?.skills || []).some((s) => /ui|design|frontend/i.test(s)) ? 'Frontend skills match' : 'Design-friendly team',
        userProfile?.preferences?.preferredLocation === 'remote' ? 'Remote friendly' : 'South India location',
        'Growth opportunities'
      ],
      logo: '🎨',
      deadline: '18',
      tags: ['UI/UX', 'Frontend', 'Design']
    },
    {
      id: 7,
      title: 'Data Science Intern',
      company: 'Flipkart',
      location:
        userProfile?.preferences?.preferredLocation === 'anywhere'
          ? 'India (Multiple locations)'
          : 'Bengaluru, Karnataka',
      duration: '6 months',
      stipend: '₹30,000/month',
      matchScore: 84,
      matchReasons: [
        (userProfile?.skills || []).some((s) => /python|sql|excel|data/i.test(s)) ? 'Your data skills fit' : 'Beginner-friendly data role',
        'Top e-commerce brand'
      ],
      logo: '🧠',
      deadline: '20',
      tags: ['Data Science', 'Python', 'SQL']
    },
    {
      id: 8,
      title: 'HR Operations Intern',
      company: 'HDFC Bank',
      location:
        userProfile?.preferences?.preferredLocation === 'sameCity' && userProfile?.location
          ? userProfile.location
          : 'Mumbai, Maharashtra',
      duration: '3 months',
      stipend: '₹12,000/month',
      matchScore: 76,
      matchReasons: [
        (userProfile?.interests || []).includes('Human Resources') ? 'Matches HR interest' : 'Great intro to HR',
        'Banking sector exposure'
      ],
      logo: '🏦',
      deadline: '10',
      tags: ['HR', 'Operations']
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

  // Explore All internships (25+ items)
  const allInternships = [
    { id: 4, title: 'Data Analytics Intern', company: 'HCL Technologies', location: 'Noida, Uttar Pradesh', duration: '3 months', stipend: '₹18,000/month', logo: '📊', deadline: '12', tags: ['Python', 'Excel', 'Analytics'], category: 'data' },
    { id: 5, title: 'Marketing Intern', company: 'Reliance Industries', location: 'Mumbai, Maharashtra', duration: '4 months', stipend: '₹15,000/month', logo: '📈', deadline: '25', tags: ['Marketing', 'Digital'], category: 'marketing' },
    { id: 6, title: 'Mechanical Engineer Intern', company: 'Tata Motors', location: 'Pune, Maharashtra', duration: '6 months', stipend: '₹28,000/month', logo: '⚙️', deadline: '8', tags: ['Mechanical', 'Automotive'], category: 'engineering' },
    { id: 7, title: 'Data Science Intern', company: 'Flipkart', location: 'Bengaluru, Karnataka', duration: '6 months', stipend: '₹30,000/month', logo: '🧠', deadline: '20', tags: ['Data Science', 'Python', 'SQL'], category: 'data' },
    { id: 8, title: 'HR Operations Intern', company: 'HDFC Bank', location: 'Mumbai, Maharashtra', duration: '3 months', stipend: '₹12,000/month', logo: '🏦', deadline: '10', tags: ['HR', 'Operations'], category: 'marketing' },
    { id: 9, title: 'Backend Developer Intern', company: 'Zoho Corp', location: 'Chennai, Tamil Nadu', duration: '6 months', stipend: '₹22,000/month', logo: '🧩', deadline: '17', tags: ['Node.js', 'APIs', 'Databases'], category: 'tech' },
    { id: 10, title: 'Android Developer Intern', company: 'Paytm', location: 'Noida, Uttar Pradesh', duration: '5 months', stipend: '₹25,000/month', logo: '📱', deadline: '14', tags: ['Kotlin', 'Android'], category: 'tech' },
    { id: 11, title: 'iOS Developer Intern', company: 'Zomato', location: 'Gurugram, Haryana', duration: '5 months', stipend: '₹25,000/month', logo: '🍎', deadline: '21', tags: ['Swift', 'iOS'], category: 'tech' },
    { id: 12, title: 'Graphic Design Intern', company: 'Byju’s', location: 'Bengaluru, Karnataka', duration: '3 months', stipend: '₹15,000/month', logo: '🎨', deadline: '9', tags: ['Photoshop', 'Illustrator'], category: 'design' },
    { id: 13, title: 'UI/UX Intern', company: 'Freshworks', location: 'Chennai, Tamil Nadu', duration: '4 months', stipend: '₹20,000/month', logo: '🖌️', deadline: '18', tags: ['Figma', 'UX Research'], category: 'design' },
    { id: 14, title: 'Civil Engineer Intern', company: 'Larsen & Toubro', location: 'Hyderabad, Telangana', duration: '6 months', stipend: '₹26,000/month', logo: '🏗️', deadline: '11', tags: ['Civil', 'Site'], category: 'engineering' },
    { id: 15, title: 'Electrical Engineer Intern', company: 'Siemens India', location: 'Nashik, Maharashtra', duration: '6 months', stipend: '₹27,000/month', logo: '🔌', deadline: '19', tags: ['Electrical', 'PLC'], category: 'engineering' },
    { id: 16, title: 'Social Media Intern', company: 'Mamaearth', location: 'Gurugram, Haryana', duration: '3 months', stipend: '₹12,000/month', logo: '📣', deadline: '16', tags: ['Content', 'Social'], category: 'marketing' },
    { id: 17, title: 'Digital Marketing Intern', company: 'Tata CLiQ', location: 'Mumbai, Maharashtra', duration: '4 months', stipend: '₹15,000/month', logo: '💡', deadline: '22', tags: ['SEO', 'SEM'], category: 'marketing' },
    { id: 18, title: 'Business Analyst Intern', company: 'Deloitte India', location: 'Hyderabad, Telangana', duration: '4 months', stipend: '₹30,000/month', logo: '📈', deadline: '27', tags: ['BA', 'Excel', 'SQL'], category: 'data' },
    { id: 19, title: 'Cloud Engineer Intern', company: 'AWS India', location: 'Bengaluru, Karnataka', duration: '6 months', stipend: '₹35,000/month', logo: '☁️', deadline: '15', tags: ['AWS', 'DevOps'], category: 'tech' },
    { id: 20, title: 'AI/ML Intern', company: 'TCS Research', location: 'Pune, Maharashtra', duration: '6 months', stipend: '₹32,000/month', logo: '🤖', deadline: '26', tags: ['ML', 'Python', 'NLP'], category: 'data' },
    { id: 21, title: 'Web Development Intern', company: 'Infosys', location: 'Mysuru, Karnataka', duration: '5 months', stipend: '₹22,000/month', logo: '🕸️', deadline: '13', tags: ['HTML', 'CSS', 'React'], category: 'tech' },
    { id: 22, title: 'Operations Intern', company: 'Swiggy', location: 'Bengaluru, Karnataka', duration: '3 months', stipend: '₹18,000/month', logo: '🍽️', deadline: '24', tags: ['Ops', 'Excel'], category: 'marketing' },
    { id: 23, title: 'Product Design Intern', company: 'CRED', location: 'Bengaluru, Karnataka', duration: '4 months', stipend: '₹30,000/month', logo: '🧭', deadline: '17', tags: ['Figma', 'Prototyping'], category: 'design' },
    { id: 24, title: 'Embedded Systems Intern', company: 'Bosch India', location: 'Coimbatore, Tamil Nadu', duration: '6 months', stipend: '₹28,000/month', logo: '🔧', deadline: '20', tags: ['C', 'Embedded'], category: 'engineering' },
    { id: 25, title: 'QA Automation Intern', company: 'Mindtree', location: 'Chennai, Tamil Nadu', duration: '4 months', stipend: '₹20,000/month', logo: '🧪', deadline: '29', tags: ['Selenium', 'Cypress'], category: 'tech' },
    { id: 26, title: 'Data Engineer Intern', company: 'PhonePe', location: 'Bengaluru, Karnataka', duration: '6 months', stipend: '₹32,000/month', logo: '🧱', deadline: '18', tags: ['ETL', 'SQL', 'Python'], category: 'data' },
    { id: 27, title: 'Content Writer Intern', company: 'The Hindu', location: 'Chennai, Tamil Nadu', duration: '3 months', stipend: '₹10,000/month', logo: '📝', deadline: '7', tags: ['Writing', 'SEO'], category: 'marketing' },
    { id: 28, title: 'CAD Design Intern', company: 'Hero MotoCorp', location: 'Gurugram, Haryana', duration: '5 months', stipend: '₹24,000/month', logo: '📐', deadline: '12', tags: ['SolidWorks', 'CAD'], category: 'engineering' },
    { id: 29, title: 'Frontend Intern (Next.js)', company: 'Razorpay', location: 'Bengaluru, Karnataka', duration: '6 months', stipend: '₹35,000/month', logo: '💳', deadline: '21', tags: ['Next.js', 'TypeScript'], category: 'tech' },
    { id: 30, title: 'Data Visualization Intern', company: 'Zoho Analytics', location: 'Chennai, Tamil Nadu', duration: '4 months', stipend: '₹22,000/month', logo: '📊', deadline: '16', tags: ['Tableau', 'PowerBI'], category: 'data' }
  ];

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredInternships = allInternships.filter((item) => {
    const matchesCategory = selectedCategory === 'all' ? true : item.category === selectedCategory;
    if (!normalizedQuery) return matchesCategory;
    const haystack = `${item.title} ${item.company} ${item.location} ${item.tags.join(' ')}`.toLowerCase();
    return matchesCategory && haystack.includes(normalizedQuery);
  });

  const visibleInternships = filteredInternships.slice(0, showCount);

  const markApplied = (id) => {
    if (appliedIds.includes(id)) return;
    const next = [...appliedIds, id];
    setAppliedIds(next);
    localStorage.setItem('appliedInternships', JSON.stringify(next));
  };

  const markDismissed = (id) => {
    if (dismissedIds.includes(id)) return;
    const next = [...dismissedIds, id];
    setDismissedIds(next);
    localStorage.setItem('dismissedInternships', JSON.stringify(next));
  };

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
              {(() => {
                const initial = userProfile?.name?.trim()?.[0]?.toUpperCase();
                return initial ? (
                  <span className="text-lg">{initial}</span>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                );
              })()}
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
            {aiRecommendations
              .filter((i) => !dismissedIds.includes(i.id))
              .map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  isRecommended={true}
                  onApply={(it) => {
                    try { localStorage.setItem('catalog', JSON.stringify(allInternships)); } catch {}
                    navigate(`/internship/${it.id}`);
                  }}
                  onDismiss={(it) => markDismissed(it.id)}
                  onOpen={(it) => navigate(`/internship/${it.id}`)}
                />
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
          {/* Additional Internships (filtered) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleInternships
              .filter((i) => !dismissedIds.includes(i.id))
              .map((internship) => (
                <InternshipCard
                  key={internship.id}
                  internship={internship}
                  onApply={(it) => {
                    try { localStorage.setItem('catalog', JSON.stringify(allInternships)); } catch {}
                    navigate(`/internship/${it.id}`);
                  }}
                  onDismiss={(it) => markDismissed(it.id)}
                  onOpen={(it) => {
                    // Keep catalog snapshot for details page
                    try { localStorage.setItem('catalog', JSON.stringify(allInternships)); } catch {}
                    navigate(`/internship/${it.id}`);
                  }}
                />
              ))}
          </div>
          {/* Load More */}
          <div className="mt-8 text-center">
            {showCount < filteredInternships.length ? (
              <button onClick={() => setShowCount(filteredInternships.length)} className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                {t('loadMore')}
              </button>
            ) : null}
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