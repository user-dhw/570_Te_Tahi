import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const content = page[language];

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
      {/* Navigation Buttons Overlay */}
      <div className="absolute inset-y-0 left-0 -translate-x-1/2 md:-translate-x-full z-20 flex items-center px-4 md:px-8">
        <button
          onClick={onPrev}
          disabled={currentPage === 0}
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all shadow-xl ${
            currentPage === 0
              ? 'bg-white/50 text-slate-300 cursor-not-allowed'
              : 'bg-white text-slate-900 hover:bg-emerald-600 hover:text-white active:scale-90'
          }`}
        >
          <ChevronLeft size={32} />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 translate-x-1/2 md:translate-x-full z-20 flex items-center px-4 md:px-8">
        <button
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
          className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all shadow-xl ${
            currentPage === totalPages - 1
              ? 'bg-white/50 text-slate-300 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-90'
          }`}
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="relative w-full overflow-hidden min-h-[600px] flex items-center justify-center perspective-1000 py-8 px-4">
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
                onNext();
              } else if (swipe > swipeConfidenceThreshold) {
                onPrev();
              }
            }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100"
          >
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img 
                src={page.image} 
                alt={content.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
              <div className="hidden md:block absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              <div className="hidden md:block absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
              <h2 className={`text-3xl font-bold text-slate-900 mb-6 border-b-4 border-emerald-500 pb-2 inline-block ${language === 'mi' ? 'italic' : ''}`}>
                {content.title}
              </h2>
              <p className={`text-lg text-slate-700 leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-emerald-600 first-letter:mr-1 ${language === 'mi' ? 'italic' : ''}`}>
                {content.content}
              </p>

              {page.factBox && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4"
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

      {/* Progress Indicator */}
      <div className="w-full max-w-2xl px-4 mt-4">
        <div className="flex justify-between items-end mb-2">
          <span className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">Story Progress</span>
          <span className="text-slate-900 font-bold text-sm">
            {currentPage + 1} <span className="text-slate-300 mx-1">/</span> {totalPages}
          </span>
        </div>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
            className="h-full bg-emerald-500"
          />
        </div>
      </div>
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
