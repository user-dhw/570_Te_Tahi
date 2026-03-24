import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, HelpCircle, Languages } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface ActivityContent {
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  reflectionTitle: string;
  reflectionText: string;
  quote: string;
}

const Activities: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'mi'>('en');
  const [quizState, setQuizState] = useState<{
    questionIndex: number;
    selectedOption: number | null;
    isCorrect: boolean | null;
    score: number;
    showResults: boolean;
  }>({
    questionIndex: 0,
    selectedOption: null,
    isCorrect: null,
    score: 0,
    showResults: false
  });

  const content: Record<'en' | 'mi', ActivityContent> = {
    en: {
      title: "Activities",
      subtitle: "Test your knowledge about the story of Te Tahi-o-Te-Rā!",
      questions: [
        {
          question: "What was the name of the sacred rock where Te Tahi performed karakia?",
          options: ["Te Ana-o-Te Tahi", "Te Toka-a-Houmea", "Whakaari", "Whakatāne"],
          correct: 1
        },
        {
          question: "What did Te Tahi say when he returned home to his people?",
          options: [
            "I will punish you all",
            "I am the chief now",
            "Waiho mā te whakamā e patu",
            "I will never return"
          ],
          correct: 2
        },
        {
          question: "What type of guardian did Te Tahi transform into at the end?",
          options: ["A giant whale", "A taniwha", "A mountain mist", "A golden koura"],
          correct: 1
        }
      ],
      reflectionTitle: "Reflection Question",
      reflectionText: "Te Tahi-o-Te-Rā chose to forgive his people instead of taking revenge. Can you think of a time when you chose to be kind even when someone wasn't kind to you?",
      quote: "True strength is found in the heart that chooses peace."
    },
    mi: {
      title: "Ngā Mahi",
      subtitle: "Whakamātauhia tō mōhio ki te pūrākau o Te Tahi-o-Te-Rā!",
      questions: [
        {
          question: "Ko wai te ingoa o te toka tapu i tū ai a Te Tahi ki te karakia?",
          options: ["Te Ana-o-Te Tahi", "Te Toka-a-Houmea", "Whakaari", "Whakatāne"],
          correct: 1
        },
        {
          question: "He aha te kōrero a Te Tahi i tana hokinga atu ki tōna iwi?",
          options: [
            "Ka whiua koutou e au",
            "Ko au te rangatira ināianei",
            "Waiho mā te whakamā e patu",
            "E kore rawa au e hoki mai"
          ],
          correct: 2
        },
        {
          question: "I whakakētia a Te Tahi hei aha mō te moana?",
          options: ["He tohorā nui", "He taniwha", "He kohu maunga", "He koura koura"],
          correct: 1
        }
      ],
      reflectionTitle: "Pātai Whakaaro",
      reflectionText: "I whiriwhiria e Te Tahi te tuku noa, kaua ko te riri. Whakaarohia tētahi wā i whiriwhiria e koe te aroha, ahakoa te mahi nanakia a tētahi atu.",
      quote: "Kei te ngākau māhaki te tino mana."
    }
  };

  const currentContent = content[language];
  const currentQuestions = currentContent.questions;

  const handleOptionSelect = (index: number) => {
    if (quizState.selectedOption !== null) return;

    const isCorrect = index === currentQuestions[quizState.questionIndex].correct;
    setQuizState(prev => ({
      ...prev,
      selectedOption: index,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.questionIndex < currentQuestions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        questionIndex: prev.questionIndex + 1,
        selectedOption: null,
        isCorrect: null
      }));
    } else {
      setQuizState(prev => ({ ...prev, showResults: true }));
    }
  };

  const resetQuiz = () => {
    setQuizState({
      questionIndex: 0,
      selectedOption: null,
      isCorrect: null,
      score: 0,
      showResults: false
    });
  };

  const languages: { code: 'en' | 'mi'; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mi', label: 'Māori' },
  ];

  return (
    <div className="py-16 px-4 bg-slate-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{currentContent.title}</h1>
            <p className="text-lg text-slate-600">{currentContent.subtitle}</p>
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
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {!quizState.showResults ? (
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold mb-6">
                <HelpCircle size={20} />
                {language === 'en' ? 'Question' : 'Pātai'} {quizState.questionIndex + 1} / {currentQuestions.length}
              </div>
              
              <h2 className={`text-2xl font-bold text-slate-900 mb-8 ${language === 'mi' ? 'italic' : ''}`}>
                {currentQuestions[quizState.questionIndex].question}
              </h2>

              <div className="space-y-4">
                {currentQuestions[quizState.questionIndex].options.map((option, index) => {
                  let buttonClass = "w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between ";
                  
                  if (quizState.selectedOption === index) {
                    buttonClass += quizState.isCorrect ? "border-emerald-500 bg-emerald-50" : "border-red-500 bg-red-50";
                  } else if (quizState.selectedOption !== null && index === currentQuestions[quizState.questionIndex].correct) {
                    buttonClass += "border-emerald-500 bg-emerald-50";
                  } else {
                    buttonClass += "border-slate-100 hover:border-emerald-200 hover:bg-slate-50";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={quizState.selectedOption !== null}
                      className={buttonClass}
                    >
                      <span className={`font-medium text-slate-700 ${language === 'mi' ? 'italic' : ''}`}>{option}</span>
                      {quizState.selectedOption === index ? (
                        quizState.isCorrect ? <CheckCircle2 className="text-emerald-500" /> : <Circle className="text-red-500" />
                      ) : (
                        <Circle className="text-slate-200" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizState.selectedOption !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex justify-end"
                >
                  <button
                    onClick={handleNextQuestion}
                    className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all"
                  >
                    {quizState.questionIndex === currentQuestions.length - 1 
                      ? (language === 'en' ? 'Finish' : 'Whakaoti') 
                      : (language === 'en' ? 'Next' : 'Panuku')}
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {language === 'en' ? 'Quiz Complete!' : 'Kua oti te patapatai!'}
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                {language === 'en' ? 'You scored' : 'Ko tō māka'} <span className="text-emerald-600 font-bold">{quizState.score}</span> / {currentQuestions.length}
              </p>
              <button
                onClick={resetQuiz}
                className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg"
              >
                {language === 'en' ? 'Try Again' : 'Ngana anō'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 bg-emerald-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">{currentContent.reflectionTitle}</h2>
          <p className={`text-emerald-100 text-lg mb-6 leading-relaxed ${language === 'mi' ? 'italic' : ''}`}>
            {currentContent.reflectionText}
          </p>
          <div className="p-4 bg-emerald-800/50 rounded-xl border border-emerald-700 italic text-emerald-200">
            "{currentContent.quote}"
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
