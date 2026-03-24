import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { StoryPage } from '../data/story';

interface StoryViewerProps {
  page: StoryPage;
  direction: number;
  language: 'en' | 'mi';
  onNext: () => void;
  onPrev: () => void;
  currentPage: number;
  totalPages: number;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const StoryViewer: React.FC<StoryViewerProps> = ({ 
  page, 
  direction, 
  language, 
  onNext, 
  onPrev,
  currentPage,
  totalPages
}) => {
  const navigate = useNavigate();
  const [showCompletion, setShowCompletion] = useState(false);
  const content = page[language];

  const handleFinish = () => {
    setShowCompletion(true);
    
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const variants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 45 : -45,
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      rotateY: 0,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      rotateY: direction < 0 ? 45 : -45,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    })
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center">
      <div className="relative w-full overflow-visible min-h-[450px] md:min-h-[600px] flex items-center justify-center perspective-1000 py-4 md:py-8 px-4">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              rotateY: { duration: 0.4, ease: "easeInOut" },
              opacity: { duration: 0.3 },
              scale: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                if (currentPage === totalPages - 1) {
                  handleFinish();
                } else {
                  onNext();
                }
              } else if (swipe > swipeConfidenceThreshold) {
                onPrev();
              }
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full max-w-5xl bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100"
          >
            <div className="md:w-1/2 h-48 md:h-auto relative">
              <img 
                src={page.image} 
                alt={content.title}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
              <div className="hidden md:block absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
            </div>
            
            <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center relative">
              <div className="hidden md:block absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
              <h2 className={`text-2xl md:text-3xl font-bold text-slate-900 mb-4 md:mb-6 border-b-4 border-emerald-500 pb-2 inline-block ${language === 'mi' ? 'italic' : ''}`}>
                {content.title}
              </h2>
              <p className={`text-base md:text-lg text-slate-700 leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-emerald-600 first-letter:mr-1 ${language === 'mi' ? 'italic' : ''}`}>
                {content.content}
              </p>

              {page.factBox && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 md:mt-8 p-4 md:p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4"
                >
                  <div className="bg-emerald-500 text-white p-2 rounded-lg shrink-0">
                    <HelpCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-1">
                      {language === 'en' ? 'Did you know?' : 'I mōhio rānei koe?'}
                    </h4>
                    <p className={`text-emerald-900 leading-snug ${language === 'mi' ? 'italic' : ''}`}>
                      {page.factBox[language]}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="w-full max-w-2xl px-4 mt-2 md:mt-4">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <button
            onClick={onPrev}
            disabled={currentPage === 0}
            className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-bold transition-all ${
              currentPage === 0
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg active:scale-95'
            }`}
          >
            <ChevronLeft size={20} />
            {currentPage === 0 ? 'Start' : 'Back'}
          </button>

          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-0.5">Chapter Progress</span>
            <div className="text-slate-900 font-bold text-base md:text-lg">
              {currentPage + 1} <span className="text-slate-300 mx-1">/</span> {totalPages}
            </div>
          </div>

          <button
            onClick={() => {
              if (currentPage === totalPages - 1) {
                handleFinish();
              } else {
                onNext();
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-bold transition-all ${
              currentPage === totalPages - 1
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg active:scale-95'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg active:scale-95'
            }`}
          >
            {currentPage === totalPages - 1 ? 'Finish' : 'Next'}
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            className="h-full bg-emerald-500"
          />
        </div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletion && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <div className="bg-emerald-600 p-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-white rounded-full blur-3xl" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    scale: { delay: 0.2, type: 'spring' },
                    rotate: { delay: 0.5, duration: 0.5, times: [0, 0.2, 0.8, 1] }
                  }}
                  className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10"
                >
                  <Trophy className="text-emerald-600" size={48} />
                </motion.div>
                <h2 className="text-3xl font-extrabold text-white mb-2 relative z-10">
                  {language === 'en' ? 'Story Complete!' : 'Kua oti te pūrākau!'}
                </h2>
                <p className="text-emerald-100 font-medium relative z-10">
                  {language === 'en' 
                    ? 'You have discovered the legend of Te Tahi-o-Te-Rā.' 
                    : 'Kua kitea e koe te pūrākau o Te Tahi-o-Te-Rā.'}
                </p>
              </div>
              
              <div className="p-10 text-center">
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {language === 'en'
                    ? 'Ready to test your knowledge? Join the activities and see what you have learned!'
                    : 'Kua rite koe ki te whakamātau i ō mōhiotanga? Haere ki ngā mahi, kia kite ai koe i āu i ako ai!'}
                </p>
                
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => navigate('/activities')}
                    className="group flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95"
                  >
                    <Sparkles size={22} />
                    {language === 'en' ? 'Go to Activities' : 'Haere ki ngā Mahi'}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => setShowCompletion(false)}
                    className="text-slate-400 hover:text-slate-600 font-bold transition-colors"
                  >
                    {language === 'en' ? 'Maybe Later' : 'Taihoa ake'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HelpCircle = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
  </svg>
);

export default StoryViewer;
