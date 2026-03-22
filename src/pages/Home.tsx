import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-slate-900">

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/story" 
              className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95"
            >
              <BookOpen size={22} />
              Start Reading
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
