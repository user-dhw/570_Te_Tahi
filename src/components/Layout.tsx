import React from 'react';
import Navbar from './Navbar';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        {children}
      </motion.main>
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Te Tahi-o-Te-Rā Digital Storytelling Project. 
            Inspired by the Māori legend of Whakatāne.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
