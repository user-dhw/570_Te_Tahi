import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StoryPage } from '../data/story';

interface StoryViewerProps {
  page: StoryPage;
  direction: number;
  language: 'en' | 'mi';
}

const StoryViewer: React.FC<StoryViewerProps> = ({ page, direction, language }) => {
  const content = page[language];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  return (
    <div className="relative overflow-hidden min-h-[500px] flex items-center justify-center">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={page.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
        >
          <div className="md:w-1/2 h-64 md:h-auto relative">
            <img 
              src={page.image} 
              alt={content.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className={`text-3xl font-bold text-slate-900 mb-6 border-b-4 border-emerald-500 pb-2 inline-block ${language === 'mi' ? 'italic' : ''}`}>
              {content.title}
            </h2>
            <p className={`text-lg text-slate-700 leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-emerald-600 first-letter:mr-1 ${language === 'mi' ? 'italic' : ''}`}>
              {content.content}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StoryViewer;
