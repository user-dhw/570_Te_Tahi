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
            This digital storytelling platform was created to preserve and share the rich cultural heritage of the Māori people. 
            Our goal is to make traditional stories accessible, engaging, and educational for children everywhere.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-slate-700 leading-relaxed">
              We believe that stories are the heartbeat of a culture. For children living away from their ancestral lands, 
              digital tools can bridge the gap and help them stay connected to their roots. This project focuses on 
              "Te Tahi-o-Te-Rā" as a powerful example of Māori values like Kaitiakitanga (guardianship) and forgiveness.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Designed for use in classrooms and at home, the platform provides teachers with a structured way to 
              introduce these legends and their underlying themes to young learners.
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
                  <h3 className="font-bold text-slate-900">Hongwei Ding</h3>
                  <p className="text-sm text-slate-500">Prototype Development & UI Design</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  AS
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Umme Habiba Liza</h3>
                  <p className="text-sm text-slate-500">Story Research & Documentation</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                  MT
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Shubhangi Shirsale</h3>
                  <p className="text-sm text-slate-500">Client Feedback Analysis</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
