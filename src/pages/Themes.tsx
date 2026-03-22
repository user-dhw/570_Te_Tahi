import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Heart, Users, Zap, Languages } from 'lucide-react';

interface ThemeContent {
  title: string;
  description: string;
}

interface ThemeItem {
  icon: React.ReactNode;
  color: string;
  en: ThemeContent;
  mi: ThemeContent;
}

const Themes: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'mi'>('en');

  const themes: ThemeItem[] = [

  ];

  const languages: { code: 'en' | 'mi'; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mi', label: 'Māori' },
  ];

  return (
    <div className="py-16 px-4 bg-white min-h-[calc(100vh-64px)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {language === 'en' ? 'Key Themes' : language === 'mi' ? 'Ngā Kaupapa Matua' : '核心主题'}
            </h1>
            <div className="w-24 h-1.5 bg-emerald-500 rounded-full" />
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <Languages size={20} className="text-slate-400 ml-2" />
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    language === lang.code
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {themes.map((theme, index) => (
            <motion.div
              key={theme[language].title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-3xl border-2 ${theme.color} transition-all hover:shadow-lg`}
            >
              <div className="mb-4">{theme.icon}</div>
              <h3 className={`text-2xl font-bold text-slate-900 mb-3 ${language === 'mi' ? 'italic' : ''}`}>
                {theme[language].title}
              </h3>
              <p className={`text-slate-700 leading-relaxed ${language === 'mi' ? 'italic' : ''}`}>
                {theme[language].description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Themes;
