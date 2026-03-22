import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About the Project</h1>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-8" />
          <p className="text-xl text-slate-600 leading-relaxed">
            XXXXXX
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-700 leading-relaxed">
             XXXXXX
            </p>
           
          </div>
          
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Team</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">XXX</h3>
                  <p className="text-sm text-slate-500"> Developer & Designer</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  AS
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">XXX</h3>
                  <p className="text-sm text-slate-500">Documentation</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                  MT
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">XXX</h3>
                  <p className="text-sm text-slate-500">Presentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="text-slate-400 mb-8">
            Interested in learning more about our digital storytelling initiatives? 
            We'd love to hear from you.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
              <Mail size={24} />
            </a>
            <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
              <Github size={24} />
            </a>
            <a href="#" className="p-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
              <Globe size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
