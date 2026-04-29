import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Heart, Users, Zap } from 'lucide-react';

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
    {
      icon: <Zap className="text-amber-500" size={32} />,
      color: "bg-amber-50 border-amber-200",
      en: {
        title: "Fear (Mataku)",
        description: "The people's fear of Te Tahi's immense mana led them to make a hard decision. It teaches us how misunderstanding power can lead to isolation."
      },
      mi: {
        title: "Te Mataku",
        description: "Nā te mataku o te iwi ki te mana nui o Te Tahi, ka tau te whakatau taumaha. He akoranga tēnei mō te kore mārama ki te mana o tētahi."
      }
    },
    {
      icon: <Users className="text-red-500" size={32} />,
      color: "bg-red-50 border-red-200",
      en: {
        title: "Betrayal (Whakamā)",
        description: "Being abandoned on Whakaari was a deep betrayal. However, the story shows that those who betray others often carry the heaviest burden: shame."
      },
      mi: {
        title: "Te Whakamā",
        description: "He mahi nanakia te whakarere i a Te Tahi ki Whakaari. Heoi, e whakaatu ana te pūrākau, ko te hunga e ninihi ana, ko te whakamā te whiu nui rawa."
      }
    },
    {
      icon: <Heart className="text-rose-500" size={32} />,
      color: "bg-rose-50 border-rose-200",
      en: {
        title: "Forgiveness (Aroha)",
        description: "\"Waiho mā te whakamā e patu\" — Let shame be the punishment. Te Tahi chose peace over revenge, showing true spiritual strength."
      },
      mi: {
        title: "Te Tuku Noa",
        description: "\"Waiho mā te whakamā e patu.\" I whiriwhiria e Te Tahi te rangimārie, kaua ko te riri. He tohu tēnei o te mana wairua tūturu."
      }
    },
    {
      icon: <Shield className="text-emerald-500" size={32} />,
      color: "bg-emerald-50 border-emerald-200",
      en: {
        title: "Guardianship (Kaitiaki)",
        description: "Te Tahi transformed into a taniwha to protect his descendants. This represents the eternal connection between ancestors and the living."
      },
      mi: {
        title: "Te Kaitiakitanga",
        description: "I whakakētia a Te Tahi hei taniwha hei tiaki i ana uri. He tohu tēnei o te hononga mauroa i waenga i ngā tūpuna me te hunga ora."
      }
    }
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
              {language === 'en' ? 'Key Themes' : 'Ngā Kaupapa Matua'}
            </h1>
            <div className="w-24 h-1.5 bg-emerald-500 rounded-full" />
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
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
