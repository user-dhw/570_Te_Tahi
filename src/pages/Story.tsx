import React, { useState } from 'react';
import { storyData } from '../data/story';
import StoryViewer from '../components/StoryViewer';
import { Languages } from 'lucide-react';

const Story: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [language, setLanguage] = useState<'en' | 'mi'>('en');

  const handleNext = () => {
    if (currentPage < storyData.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  const languages: { code: 'en' | 'mi'; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mi', label: 'Māori' },
  ];

  return (
    <div className="py-6 md:py-12 px-4 bg-[#fdfcfb] min-h-[calc(100vh-64px)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8 gap-3 md:gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">The Story</h1>
            <div className="w-24 h-1.5 bg-emerald-500 rounded-full" />
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <Languages size={20} className="text-slate-400 ml-2" />
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    language === lang.code
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <StoryViewer 
          page={storyData[currentPage]} 
          direction={direction} 
          language={language}
          onNext={handleNext}
          onPrev={handlePrev}
          currentPage={currentPage}
          totalPages={storyData.length}
        />
      </div>
    </div>
  );
};

export default Story;
