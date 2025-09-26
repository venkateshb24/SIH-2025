import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    emailAddress: '',
    currentAddress: '',
    educationLevel: '',
    fieldOfStudy: '',
    instituteName: '',
    yearOfStudy: '',
    graduationYear: '',
    percentage: '',
    technicalSkills: [],
    softSkills: [],
    interests: [],
    preferredLocation: '',
    expectedSalary: 20000,
    internshipDuration: ''
  });
  const [errors, setErrors] = useState({});
  const [customSkill, setCustomSkill] = useState('');

  const steps = [
    { id: 'personal', title: t('stepTitles')?.personal || 'Personal Information', subtitle: t('stepSubtitles')?.personal || '' },
    { id: 'education', title: t('stepTitles')?.education || 'Education Details', subtitle: t('stepSubtitles')?.education || '' },
    { id: 'skills', title: t('stepTitles')?.skills || 'Skills & Interests', subtitle: t('stepSubtitles')?.skills || '' },
    { id: 'preferences', title: t('stepTitles')?.preferences || 'Location & Salary', subtitle: t('stepSubtitles')?.preferences || '' },
    { id: 'complete', title: t('stepTitles')?.complete || 'Profile Complete!', subtitle: t('stepSubtitles')?.complete || '' }
  ];

  const educationLevels = [
    { id: 'class10', label: t('class10') || '10th Standard' },
    { id: 'class12', label: t('class12') || '12th Standard' },
    { id: 'diploma', label: t('diploma') || 'Diploma' },
    { id: 'undergraduate', label: t('undergraduate') || "Bachelor's Degree" },
    { id: 'postgraduate', label: t('postgraduate') || "Master's Degree" }
  ];

  const fieldsOfStudy = [
    { id: 'engineering', label: t('engineering') || 'Engineering' },
    { id: 'commerce', label: t('commerce') || 'Commerce' },
    { id: 'science', label: t('science') || 'Science' },
    { id: 'arts', label: t('arts') || 'Arts' },
    { id: 'medical', label: t('medical') || 'Medical' },
    { id: 'law', label: t('law') || 'Law' },
    { id: 'management', label: t('management') || 'Management' },
    { id: 'other', label: t('other') || 'Other' }
  ];

  const popularTechnicalSkills = [
    t('javascript') || 'JavaScript', t('python') || 'Python', t('excel') || 'Microsoft Excel', 'Java', 'C++', 'HTML/CSS', 'SQL', 'Photoshop'
  ];

  const popularSoftSkills = [
    t('communication') || 'Communication', t('teamwork') || 'Teamwork', t('leadership') || 'Leadership', t('problemSolving') || 'Problem Solving',
    t('timeManagement') || 'Time Management', 'Creativity', 'Adaptability', 'Critical Thinking'
  ];

  const interestAreas = [
    t('webDevelopment') || 'Web Development', t('mobileApps') || 'Mobile Apps', t('dataScience') || 'Data Science', t('digitalMarketing') || 'Digital Marketing',
    t('finance') || 'Finance', t('hr') || 'Human Resources', t('sales') || 'Sales & Marketing', t('operations') || 'Operations'
  ];

  const locationOptions = [
    { id: 'sameCity', label: t('sameCity') || 'Same City' },
    { id: 'sameState', label: t('sameState') || 'Same State' },
    { id: 'anywhere', label: t('anywhere') || 'Anywhere in India' },
    { id: 'remote', label: t('remote') || 'Remote Work' }
  ];

  const durationOptions = [
    { id: 'months1to3', label: t('months1to3') || '1-3 months' },
    { id: 'months3to6', label: t('months3to6') || '3-6 months' },
    { id: 'months6plus', label: t('months6plus') || '6+ months' },
    { id: 'flexible', label: t('flexible') || 'Flexible' }
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const addSkill = (skillType, skill) => {
    const currentSkills = formData[skillType];
    if (!currentSkills.includes(skill) && skill.trim()) {
      updateFormData(skillType, [...currentSkills, skill.trim()]);
    }
  };

  const removeSkill = (skillType, skillToRemove) => {
    const currentSkills = formData[skillType];
    updateFormData(skillType, currentSkills.filter((s) => s !== skillToRemove));
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    switch (currentStep) {
      case 0:
        if (!formData.fullName.trim()) newErrors.fullName = t('required') || 'This field is required';
        if (!formData.emailAddress.trim()) newErrors.emailAddress = t('required') || 'This field is required';
        else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) newErrors.emailAddress = t('invalidEmail') || 'Please enter a valid email address';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = t('required') || 'This field is required';
        break;
      case 1:
        if (!formData.educationLevel) newErrors.educationLevel = t('required') || 'This field is required';
        if (!formData.fieldOfStudy) newErrors.fieldOfStudy = t('required') || 'This field is required';
        break;
      case 3:
        if (!formData.preferredLocation) newErrors.preferredLocation = t('required') || 'This field is required';
        if (!formData.internshipDuration) newErrors.internshipDuration = t('required') || 'This field is required';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const handlePrevious = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const handleSkip = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));

  const handleFinish = () => {
    const userProfile = {
      name: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      location: formData.currentAddress,
      education: `${formData.educationLevel || ''} ${formData.fieldOfStudy || ''}`.trim(),
      skills: [...formData.technicalSkills, ...formData.softSkills],
      interests: formData.interests,
      preferences: {
        preferredLocation: formData.preferredLocation,
        expectedSalary: formData.expectedSalary,
        internshipDuration: formData.internshipDuration
      }
    };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('hasProfile', 'true');
    navigate('/home');
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm border-b-4 border-orange-500">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-white to-green-600 rounded-full flex items-center justify-center border-2 border-blue-900">
                  <div className="text-blue-900 font-bold text-xs">भारत</div>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-blue-900">PM Internship Scheme</h1>
                <p className="text-xs text-gray-600">{(t('step') || 'Step')} {currentStep + 1} {(t('of') || 'of')} {steps.length}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t('progress') || 'Progress'}</span>
            <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{currentStepData.subtitle}</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          {currentStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{(t('fullName') || 'Full Name')} *</label>
                <input type="text" value={formData.fullName} onChange={(e) => updateFormData('fullName', e.target.value)} placeholder={t('enterFullName') || 'Enter your full name'} className={`w-full p-4 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 ${errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`} />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('dateOfBirth') || 'Date of Birth'}</label>
                <input type="date" value={formData.dateOfBirth} onChange={(e) => updateFormData('dateOfBirth', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('gender') || 'Gender'}</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ id: 'male', label: t('male') || 'Male' }, { id: 'female', label: t('female') || 'Female' }, { id: 'other', label: t('other') || 'Other' }].map((option) => (
                    <button key={option.id} onClick={() => updateFormData('gender', option.id)} className={`p-3 border-2 rounded-lg transition-colors ${formData.gender === option.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-blue-300'}`}>{option.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{(t('phoneNumber') || 'Phone Number')} *</label>
                <input type="tel" value={formData.phoneNumber} onChange={(e) => updateFormData('phoneNumber', e.target.value)} placeholder="+91 98765 43210" className={`w-full p-4 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`} />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{(t('emailAddress') || 'Email Address')} *</label>
                <input type="email" value={formData.emailAddress} onChange={(e) => updateFormData('emailAddress', e.target.value)} placeholder={t('enterEmail') || 'Enter your email address'} className={`w-full p-4 border-2 rounded-lg focus:ring-2 focus:ring-blue-200 ${errors.emailAddress ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`} />
                {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('currentAddress') || 'Current Address'}</label>
                <input type="text" value={formData.currentAddress} onChange={(e) => updateFormData('currentAddress', e.target.value)} placeholder={t('enterAddress') || 'City, State'} className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{(t('educationLevel') || 'Education Level')} *</label>
                <div className="grid grid-cols-1 gap-3">
                  {educationLevels.map((level) => (
                    <button key={level.id} onClick={() => updateFormData('educationLevel', level.id)} className={`p-4 border-2 rounded-lg text-left transition-colors ${formData.educationLevel === level.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-blue-300'}`}>{level.label}</button>
                  ))}
                </div>
                {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{(t('fieldOfStudy') || 'Field of Study')} *</label>
                <div className="grid grid-cols-2 gap-3">
                  {fieldsOfStudy.map((field) => (
                    <button key={field.id} onClick={() => updateFormData('fieldOfStudy', field.id)} className={`p-3 border-2 rounded-lg text-center transition-colors ${formData.fieldOfStudy === field.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-blue-300'}`}>{field.label}</button>
                  ))}
                </div>
                {errors.fieldOfStudy && <p className="text-red-500 text-sm mt-1">{errors.fieldOfStudy}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('instituteName') || 'Institution Name'}</label>
                <input type="text" value={formData.instituteName} onChange={(e) => updateFormData('instituteName', e.target.value)} placeholder="e.g., Delhi University, IIT Delhi" className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('yearOfStudy') || 'Current Year'}</label>
                  <select value={formData.yearOfStudy} onChange={(e) => updateFormData('yearOfStudy', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="block text sm font-medium text-gray-700 mb-2">{t('graduationYear') || 'Expected Graduation'}</label>
                  <select value={formData.graduationYear} onChange={(e) => updateFormData('graduationYear', e.target.value)} className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                    <option value="">Select Year</option>
                    {[2024, 2025, 2026, 2027, 2028].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('percentage') || 'Percentage/CGPA'}</label>
                <input type="text" value={formData.percentage} onChange={(e) => updateFormData('percentage', e.target.value)} placeholder="e.g., 85% or 8.5 CGPA" className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('technicalSkills') || 'Technical Skills'}</label>
                {formData.technicalSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.technicalSkills.map((skill, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{skill}<button onClick={() => removeSkill('technicalSkills', skill)} className="ml-2 text-blue-600 hover:text-blue-800">×</button></span>
                    ))}
                  </div>
                )}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">{t('popularSkills') || 'Popular Skills'}</p>
                  <div className="flex flex-wrap gap-2">
                    {popularTechnicalSkills.map((skill, i) => (
                      <button key={i} onClick={() => addSkill('technicalSkills', skill)} className="px-3 py-2 border border-gray-300 rounded-full text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors" disabled={formData.technicalSkills.includes(skill)}>
                        {skill}{!formData.technicalSkills.includes(skill) && ' +'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input type="text" value={customSkill} onChange={(e) => setCustomSkill(e.target.value)} placeholder="Add custom skill..." className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200" onKeyDown={(e) => { if (e.key === 'Enter') { addSkill('technicalSkills', customSkill); setCustomSkill(''); } }} />
                  <button onClick={() => { addSkill('technicalSkills', customSkill); setCustomSkill(''); }} className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">{t('addSkill') || 'Add Skill'}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('softSkills') || 'Soft Skills'}</label>
                {formData.softSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.softSkills.map((skill, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{skill}<button onClick={() => removeSkill('softSkills', skill)} className="ml-2 text-green-600 hover:text-green-800">×</button></span>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {popularSoftSkills.map((skill, i) => (
                    <button key={i} onClick={() => addSkill('softSkills', skill)} className="px-3 py-2 border border-gray-300 rounded-full text-sm hover:border-green-500 hover:bg-green-50 transition-colors" disabled={formData.softSkills.includes(skill)}>
                      {skill}{!formData.softSkills.includes(skill) && ' +'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('interests') || 'Areas of Interest'}</label>
                {formData.interests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.interests.map((interest, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">{interest}<button onClick={() => removeSkill('interests', interest)} className="ml-2 text-purple-600 hover:text-purple-800">×</button></span>
                    ))}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {interestAreas.map((interest, i) => (
                    <button key={i} onClick={() => addSkill('interests', interest)} className="p-3 border border-gray-300 rounded-lg text-left hover:border-purple-500 hover:bg-purple-50 transition-colors" disabled={formData.interests.includes(interest)}>
                      {interest}{!formData.interests.includes(interest) && ' +'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{(t('preferredLocation') || 'Preferred Work Location')} *</label>
                <div className="space-y-3">
                  {locationOptions.map((option) => (
                    <button key={option.id} onClick={() => updateFormData('preferredLocation', option.id)} className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${formData.preferredLocation === option.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-blue-300'}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${formData.preferredLocation === option.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}></div>
                        <span>{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.preferredLocation && <p className="text-red-500 text-sm mt-1">{errors.preferredLocation}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('expectedSalary') || 'Expected Monthly Stipend'}</label>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">₹10,000</span>
                    <input type="range" min="10000" max="50000" step="5000" value={formData.expectedSalary} onChange={(e) => updateFormData('expectedSalary', parseInt(e.target.value))} className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    <span className="text-sm text-gray-600">₹50,000</span>
                  </div>
                  <div className="text-center"><span className="text-lg font-semibold text-blue-600">₹{formData.expectedSalary.toLocaleString()}/month</span></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{(t('internshipDuration') || 'Preferred Duration')} *</label>
                <div className="grid grid-cols-2 gap-3">
                  {durationOptions.map((option) => (
                    <button key={option.id} onClick={() => updateFormData('internshipDuration', option.id)} className={`p-4 border-2 rounded-lg text-center transition-colors ${formData.internshipDuration === option.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-blue-300'}`}>{option.label}</button>
                  ))}
                </div>
                {errors.internshipDuration && <p className="text-red-500 text-sm mt-1">{errors.internshipDuration}</p>}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('profileComplete') || 'Profile Complete!'}</h2>
                <p className="text-lg text-gray-600 mb-8">{t('readyToFind') || 'Your AI is ready to find perfect internships'}</p>
              </div>
              <div className="space-y-4">
                <button onClick={handleFinish} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">{t('recommendations') || 'Get Recommendations'}</button>
                <button onClick={() => navigate('/home')} className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors">{t('browseAll') || 'Browse All Internships'}</button>
              </div>
            </div>
          )}
        </div>

        {currentStep < 4 && (
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button onClick={handlePrevious} className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">{t('previous') || 'Previous'}</button>
            )}
            <button onClick={handleNext} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">{currentStep === 3 ? (t('finish') || 'Complete Profile') : (t('next') || 'Next')}</button>
            {currentStep > 1 && (
              <button onClick={handleSkip} className="px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">{t('skip') || 'Skip for Now'}</button>
            )}
          </div>
        )}

        {currentStep < 4 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <p className="text-blue-800 text-sm font-medium mb-1">Why do we need this?</p>
                <p className="text-blue-700 text-sm">{currentStep === 0 && (t('helpText')?.personal || 'This information helps us personalize your experience')}{currentStep === 1 && (t('helpText')?.education || "We'll match internships based on your education level")}{currentStep === 2 && (t('helpText')?.skills || 'Add skills you have or want to develop')}{currentStep === 3 && (t('helpText')?.preferences || "We'll prioritize internships based on your preferences")}</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <div className="h-6"></div>
    </div>
  );
};

export default ProfileSetup;


