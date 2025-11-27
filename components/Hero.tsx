import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  isVisible: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isVisible }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 ${!isVisible && 'hidden'}`}
    >
      <div className="text-center space-y-4 p-6">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400"
        >
          {PERSONAL_INFO.name}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 font-light"
        >
          {PERSONAL_INFO.title}
        </motion.p>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="pt-12 text-slate-500 flex flex-col items-center gap-2"
        >
          <span className="text-sm uppercase tracking-widest">Explore the Universe</span>
          <ChevronDown className="animate-bounce" />
        </motion.div>
      </div>
    </motion.div>
  );
};