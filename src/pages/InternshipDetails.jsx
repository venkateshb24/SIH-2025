import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

const getCatalog = () => {
  try {
    // Build a minimal catalog union from Home list stored or fallback to empty
    const stored = JSON.parse(localStorage.getItem('catalog') || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch { return []; }
};

const InternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [appliedIds, setAppliedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('appliedInternships') || '[]'); } catch { return []; }
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [cover, setCover] = useState('');

  const profile = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('userProfile') || '{}'); } catch { return {}; }
  }, []);

  const catalog = useMemo(() => getCatalog(), []);
  const internship = useMemo(() => catalog.find((i) => String(i.id) === String(id)), [catalog, id]);

  const apply = () => {
    if (!internship) return;
    if (!appliedIds.includes(internship.id)) {
      const next = [...appliedIds, internship.id];
      setAppliedIds(next);
      localStorage.setItem('appliedInternships', JSON.stringify(next));
    }
    alert(t('applicationSubmitted') || 'Application submitted successfully!');
    navigate('/home');
  };

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <div>
          <div className="text-4xl mb-2">🔎</div>
          <div>Internship not found</div>
          <div className="mt-4 text-center"><button onClick={() => navigate('/home')} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Back to Home</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-4 border-orange-500">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button onClick={() => navigate(-1)} className="text-blue-600">← Back</button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">{internship.logo || '🏢'}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{internship.title}</h1>
                <div className="text-gray-600">{internship.company}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-600 font-semibold">{internship.stipend}</div>
              <div className="text-xs text-orange-600 mt-1">{internship.deadline} {t('daysLeft')}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
            <div>📍 {internship.location}</div>
            <div>⏰ {internship.duration}</div>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold mb-2">About the role</h2>
            <p className="text-gray-700 leading-relaxed">You will collaborate with mentors, contribute to real projects, and learn industry best practices. Demonstrated interest in the domain and willingness to learn are key.</p>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Required skills</h2>
            <div className="flex flex-wrap gap-2">
              {(internship.tags || []).map((tag, i) => <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{tag}</span>)}
            </div>
          </div>
          {/* Application Form */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">{t('applyTitle') || 'Application Form'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">{t('name')}</label>
                <input defaultValue={profile.name || ''} className="w-full p-3 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">{t('email')}</label>
                <input defaultValue={profile.email || ''} className="w-full p-3 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">{t('phone')}</label>
                <input defaultValue={profile.phone || ''} className="w-full p-3 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">{t('location')}</label>
                <input defaultValue={profile.location || ''} className="w-full p-3 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-700 mb-1">{t('education')}</label>
                <input defaultValue={profile.education || ''} className="w-full p-3 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-700 mb-1">{t('skills')}</label>
                <input defaultValue={(profile.skills || []).join(', ')} className="w-full p-3 border border-gray-300 rounded-lg" readOnly />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-700 mb-1">{t('resume')}</label>
                <input type="file" accept="application/pdf" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} className="w-full" />
                <div className="text-xs text-gray-500 mt-1">{t('uploadResume')}</div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-700 mb-1">{t('coverLetter')}</label>
                <textarea value={cover} onChange={(e) => setCover(e.target.value)} rows={5} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Write a brief cover letter..." />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={apply} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300">{t('submitApplication') || 'Submit Application'}</button>
              <button onClick={() => navigate('/home')} className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">{t('exploreAll')}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InternshipDetails;


