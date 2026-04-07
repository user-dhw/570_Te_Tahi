import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  HelpCircle, 
  Languages, 
  ArrowRight, 
  RotateCcw, 
  Heart, 
  ListOrdered, 
  MessageCircle,
  Check,
  Star,
  Shield,
  Users,
  Trophy
} from 'lucide-react';

// --- Types ---

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  hint: string;
}

interface StoryEvent {
  id: number;
  text: string;
}

// --- Sub-components ---

/**
 * Progress Bar Component
 * Shows the current completion status of the activities.
 */
const ProgressBar: React.FC<{ current: number; total: number; language: 'en' | 'mi' }> = ({ current, total, language }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">
          {language === 'en' ? 'Activities Progress' : 'Te Kokenga o ngā Mahi'}
        </span>
        <span className="text-sm font-bold text-emerald-600">
          {current} / {total} {language === 'en' ? 'completed' : 'kua oti'}
        </span>
      </div>
      <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-emerald-500"
        />
      </div>
    </div>
  );
};

/**
 * Quiz Module
 */
const QuizSection: React.FC<{ language: 'en' | 'mi'; onComplete: () => void }> = ({ language, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const questions: QuizQuestion[] = [
    {
      question: language === 'en' 
        ? "Where did Te Tahi-o-Te-Rā live?" 
        : "I hea a Te Tahi-o-Te-Rā e noho ana?",
      options: language === 'en'
        ? ["In a mountain cave", "Inside a secret cave under the river", "On top of a sacred rock", "In a village hut"]
        : ["I tētahi ana maunga", "I tētahi ana huna i raro i te awa", "Ki runga i tētahi toka tapu", "I tētahi whare i te pā"],
      correct: 1,
      explanation: language === 'en'
        ? "Correct! Te Tahi lived in Te Ana-o-Te Tahi, hidden beneath the river."
        : "Tika! I noho a Te Tahi ki Te Ana-o-Te Tahi, i huna i raro i te awa.",
      hint: language === 'en'
        ? "Think about the water and the secret cave."
        : "Whakaarohia te wai me te ana huna."
    },
    {
      question: language === 'en'
        ? "Who helped Te Tahi return home from the island?"
        : "Ko wai i āwhina i a Te Tahi ki te hoki ki te kāinga mai i te moutere?",
      options: language === 'en'
        ? ["His village friends", "A giant eagle", "Tūtarakauika the whale", "He swam back alone"]
        : ["Ōna hoa i te pā", "Tētahi kahu nui", "Ko Tūtarakauika te tohorā", "I kaukau takitahi ia"],
      correct: 2,
      explanation: language === 'en'
        ? "That's right! Tūtarakauika, the chief of whales, carried him home."
        : "Tika tēnā! Ko Tūtarakauika, te rangatira o ngā tohorā, i kawe i a ia ki te kāinga.",
      hint: language === 'en'
        ? "It was a great creature from the sea."
        : "He kirehe nui nō te moana."
    }
  ];

  const current = questions[currentIndex];
  const isCorrect = selectedOption === current.correct;

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setSelectedOption(null);
      setShowFeedback(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
      onComplete();
    }
  };

  if (isFinished) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          {language === 'en' ? 'Quiz Completed!' : 'Kua oti te pātai!'}
        </h3>
        <p className="text-slate-600 mb-6">
          {language === 'en' ? 'You have a great memory of the story.' : 'He pai tō mahara ki te pūrākau.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-emerald-600 font-bold mb-2">
        <HelpCircle size={20} />
        <span>{language === 'en' ? 'Quiz' : 'Pātai'} {currentIndex + 1} / {questions.length}</span>
      </div>

      <h3 className="text-xl font-bold text-slate-800">
        {current.question}
      </h3>

      <div className="grid gap-3">
        {current.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!showFeedback) {
                setSelectedOption(idx);
                setShowFeedback(true);
              }
            }}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
              showFeedback
                ? idx === current.correct
                  ? "border-emerald-500 bg-emerald-50"
                  : idx === selectedOption
                    ? "border-red-500 bg-red-50"
                    : "border-slate-100 opacity-50"
                : "border-slate-100 hover:border-emerald-200 hover:bg-slate-50"
            }`}
          >
            <span className="font-bold text-lg">{option}</span>
            {showFeedback && idx === current.correct && <CheckCircle2 className="text-emerald-500" />}
            {showFeedback && idx === selectedOption && idx !== current.correct && <Circle className="text-red-500" />}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-6 rounded-2xl border-2 ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}
          >
            <p className="font-bold text-lg mb-2">
              {isCorrect 
                ? (language === 'en' ? '🌟 Well done!' : '🌟 Ka pai!') 
                : (language === 'en' ? '💡 Here is a hint:' : '💡 He tohu tēnei:')}
            </p>
            <p className="text-lg">{isCorrect ? current.explanation : current.hint}</p>
            
            {isCorrect && (
              <button 
                onClick={handleNext}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition-colors shadow-lg"
              >
                {currentIndex < questions.length - 1 
                  ? (language === 'en' ? 'Next Question' : 'Pātai Panuku')
                  : (language === 'en' ? 'Complete Quiz' : 'Whakaoti Pātai')} 
                <ArrowRight size={20} />
              </button>
            )}
            {!isCorrect && (
              <button 
                onClick={() => {
                  setSelectedOption(null);
                  setShowFeedback(false);
                }}
                className="mt-4 text-amber-700 font-bold flex items-center gap-2 hover:underline"
              >
                <RotateCcw size={16} /> {language === 'en' ? 'Try again' : 'Ngana anō'}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Reflection Module
 */
const ReflectionSection: React.FC<{ language: 'en' | 'mi'; onComplete: () => void }> = ({ language, onComplete }) => {
  const [choice, setChoice] = useState<string | null>(null);

  const message = language === 'en'
    ? "Te Tahi chose to forgive. He said 'Waiho mā te whakamā e patu' (Let shame be the punishment). This shows that true strength comes from peace and forgiveness, not revenge. By being kind, he kept his mana strong."
    : "I whiriwhiria e Te Tahi te tuku noa. I kī ia 'Waiho mā te whakamā e patu'. E whakaatu ana tēnei ko te tino mana ka puta mai i te rangimārie me te tuku noa, kaua ko te riri. Mā te manaakitanga, i tū pakari tonu tōna mana.";

  const handleChoice = (c: string) => {
    setChoice(c);
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-rose-500 font-bold mb-2">
        <Heart size={20} />
        <span>{language === 'en' ? 'Reflection' : 'Whakaaro'}</span>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 leading-tight">
        {language === 'en' 
          ? "What would you do if someone treated you unfairly?" 
          : "Mehemea ka mahi nanakia tētahi ki a koe, ka aha koe?"}
      </h3>

      {!choice ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleChoice('forgive')}
            className="p-8 rounded-[2rem] border-4 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center group"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌿</div>
            <span className="font-bold text-xl text-slate-700 block">
              {language === 'en' ? 'Forgive them' : 'Tuku noa i a rātou'}
            </span>
          </button>
          <button
            onClick={() => handleChoice('angry')}
            className="p-8 rounded-[2rem] border-4 border-slate-100 hover:border-rose-500 hover:bg-rose-50 transition-all text-center group"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🔥</div>
            <span className="font-bold text-xl text-slate-700 block">
              {language === 'en' ? 'Get angry' : 'Riri ki a rātou'}
            </span>
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-slate-900 text-white rounded-[2rem] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <MessageCircle size={100} />
          </div>
          <p className="text-xl leading-relaxed relative z-10 italic font-medium">
            {message}
          </p>
          <div className="mt-8 flex items-center gap-3 text-emerald-400 font-bold">
            <CheckCircle2 size={24} />
            <span>{language === 'en' ? 'Activity Completed' : 'Kua oti tēnei mahi'}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/**
 * Story Order Module
 */
const StoryOrderSection: React.FC<{ language: 'en' | 'mi'; onComplete: () => void }> = ({ language, onComplete }) => {
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const events: StoryEvent[] = language === 'en' ? [
    { id: 0, text: "The people plan to leave Te Tahi because they are afraid of his power." },
    { id: 1, text: "Te Tahi is left alone on Whakaari (White Island)." },
    { id: 2, text: "Te Tahi calls for Tūtarakauika the whale to carry him home." },
    { id: 3, text: "Te Tahi returns home and chooses to forgive his people." }
  ] : [
    { id: 0, text: "I whakatakoto mahere te iwi ki te waiho i a Te Tahi nā te mataku ki tōna mana." },
    { id: 1, text: "I mahue mokemoke a Te Tahi ki Whakaari." },
    { id: 2, text: "I karanga a Te Tahi ki a Tūtarakauika te tohorā kia kawea ia ki te kāinga." },
    { id: 3, text: "I hoki a Te Tahi ki te kāinga, ā, i whiriwhiria e ia te tuku noa i tōna iwi." }
  ];

  const correctOrder = [0, 1, 2, 3];

  const handleEventClick = (id: number) => {
    if (isSubmitted) return;
    if (userOrder.includes(id)) {
      setUserOrder(userOrder.filter(item => item !== id));
    } else if (userOrder.length < 4) {
      setUserOrder([...userOrder, id]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onComplete();
  };

  const reset = () => {
    setUserOrder([]);
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
        <ListOrdered size={20} />
        <span>{language === 'en' ? 'Story Order' : 'Raupapa Pūrākau'}</span>
      </div>

      <p className="text-lg text-slate-600 font-medium">
        {language === 'en' 
          ? "Click the events in the order they happened in the story:" 
          : "Pāwhiritia ngā kaupapa i runga i te raupapa tika o te pūrākau:"}
      </p>

      <div className="space-y-3">
        {events.map((event) => {
          const orderIndex = userOrder.indexOf(event.id);
          const isSelected = orderIndex !== -1;
          
          return (
            <button
              key={event.id}
              onClick={() => handleEventClick(event.id)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                isSelected 
                  ? "border-blue-500 bg-blue-50 shadow-inner" 
                  : "border-slate-100 hover:border-blue-200 bg-white"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                isSelected ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-400"
              }`}>
                {isSelected ? orderIndex + 1 : ""}
              </div>
              <span className="text-slate-700 font-bold text-lg">{event.text}</span>
            </button>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          disabled={userOrder.length < 4}
          onClick={handleSubmit}
          className={`w-full py-5 rounded-2xl font-bold text-xl transition-all shadow-lg ${
            userOrder.length === 4 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          {language === 'en' ? 'Check Order' : 'Tirohia te Raupapa'}
        </button>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 bg-blue-50 border-2 border-blue-200 rounded-[2rem]"
        >
          <div className="flex items-center gap-2 text-blue-800 font-bold text-xl mb-4">
            <Check size={24} /> {language === 'en' ? 'The Correct Order' : 'Te Raupapa Tika'}
          </div>
          <ol className="space-y-3 mb-8">
            {correctOrder.map((idx, i) => (
              <li key={idx} className="flex gap-3 text-blue-900 font-medium text-lg">
                <span className="font-bold text-blue-500">{i + 1}.</span>
                {events[idx].text}
              </li>
            ))}
          </ol>
          <div className="p-4 bg-white/50 rounded-xl border border-blue-100 text-blue-800 italic mb-6">
            {language === 'en'
              ? "The story shows how Te Tahi moved from being misunderstood to becoming a legendary guardian."
              : "E whakaatu ana te pūrākau i te huringa o Te Tahi mai i te tangata pohehetia ki te kaitiaki rongonui."}
          </div>
          <button 
            onClick={reset}
            className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            <RotateCcw size={16} /> {language === 'en' ? 'Reset and try again' : 'Tautuhi anō'}
          </button>
        </motion.div>
      )}
    </div>
  );
};

/**
 * Summary Section
 */
const SummarySection: React.FC<{ language: 'en' | 'mi'; onComplete: () => void }> = ({ language, onComplete }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedValue(id);
    onComplete();
  };

  const values = [
    { id: 'forgiveness', label: language === 'en' ? 'Forgiveness' : 'Tuku noa', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'respect', label: language === 'en' ? 'Respect' : 'Whakaute', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'guardianship', label: language === 'en' ? 'Guardianship' : 'Kaitiakitanga', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="text-center py-4">
      <div className="w-24 h-24 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
        <Trophy size={48} />
      </div>
      <h3 className="text-3xl font-bold text-slate-800 mb-4">
        {language === 'en' ? 'What did you learn?' : 'He aha i ako ai koe?'}
      </h3>
      <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto">
        {language === 'en' 
          ? 'The legend of Te Tahi-o-Te-Rā teaches us many important values. Which one do you like most?' 
          : 'He maha ngā akoranga hira i roto i te pūrākau o Te Tahi-o-Te-Rā. Ko tēhea tāu e pai ai?'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {values.map((val) => (
          <button
            key={val.id}
            onClick={() => handleSelect(val.id)}
            className={`p-6 rounded-2xl border-4 transition-all flex flex-col items-center gap-3 ${
              selectedValue === val.id 
                ? `border-slate-900 ${val.bg} scale-105 shadow-xl` 
                : 'border-slate-100 bg-white hover:border-slate-200'
            }`}
          >
            <val.icon className={val.color} size={32} />
            <span className="font-bold text-lg text-slate-800">{val.label}</span>
            {selectedValue === val.id && <CheckCircle2 className="text-slate-900 mt-1" size={20} />}
          </button>
        ))}
      </div>

      {selectedValue && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl"
        >
          <Star className="text-amber-400 mx-auto mb-4" size={32} fill="currentColor" />
          <h4 className="text-2xl font-bold mb-2">
            {language === 'en' ? 'Excellent Choice!' : 'Kōwhiringa Pai!'}
          </h4>
          <p className="text-lg text-slate-300 italic">
            {language === 'en' 
              ? `By choosing ${selectedValue}, you are carrying the spirit of the story with you.` 
              : `Mā te kōwhiri i te ${selectedValue}, kei te mau koe i te wairua o te pūrākau.`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

// --- Main Component ---

const Activities: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'mi'>('en');
  const [activeTab, setActiveTab] = useState<'quiz' | 'reflection' | 'order' | 'summary'>('quiz');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const handleComplete = (step: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev).add(step);
      
      // Trigger confetti if all are done
      if (newSet.size === tabs.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#f43f5e', '#fbbf24']
        });
      }
      
      return newSet;
    });

    // Auto-navigate to next tab
    const currentIndex = tabs.findIndex(t => t.id === step);
    if (currentIndex !== -1 && currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1].id;
      setTimeout(() => {
        setActiveTab(nextTab as any);
      }, 2000); // 2-second delay so user can see the feedback/success state
    }
  };

  const tabs = [
    { id: 'quiz', label: language === 'en' ? 'Quiz' : 'Pātai', icon: HelpCircle },
    { id: 'reflection', label: language === 'en' ? 'Reflection' : 'Whakaaro', icon: Heart },
    { id: 'order', label: language === 'en' ? 'Story Order' : 'Raupapa', icon: ListOrdered },
    { id: 'summary', label: language === 'en' ? 'Summary' : 'Whakarāpopoto', icon: Trophy },
  ];

  return (
    <div className="py-12 px-4 bg-slate-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header & Language Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {language === 'en' ? 'Activities' : 'Ngā Mahi'}
            </h1>
            <p className="text-lg text-slate-600 font-medium">
              {language === 'en' ? 'Learn and reflect on the legend' : 'Ako me te whakaaro ki te pūrākau'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <Languages size={20} className="text-slate-400 ml-2" />
            <div className="flex gap-1">
              {(['en', 'mi'] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    language === code
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {code === 'en' ? 'English' : 'Māori'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <ProgressBar 
          current={completedSteps.size} 
          total={tabs.length} 
          language={language} 
        />

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => {
            const isCompleted = completedSteps.has(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all relative ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-xl scale-105 z-10'
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200 shadow-sm'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
                {isCompleted && (
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg">
                    <Check size={12} strokeWidth={4} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'quiz' && <QuizSection language={language} onComplete={() => handleComplete('quiz')} />}
              {activeTab === 'reflection' && <ReflectionSection language={language} onComplete={() => handleComplete('reflection')} />}
              {activeTab === 'order' && <StoryOrderSection language={language} onComplete={() => handleComplete('order')} />}
              {activeTab === 'summary' && <SummarySection language={language} onComplete={() => handleComplete('summary')} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">
            {language === 'en' ? 'Keep Exploring' : 'Haere Tonu'}
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-200" />
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <div className="w-2 h-2 rounded-full bg-emerald-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
