
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimations: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/4 left-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-r from-[#0097A7]/8 to-blue-600/6 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1.1, 1, 1.1],
        }}
        transition={{ 
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-purple-600/6 to-[#0097A7]/8 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          rotate: 180,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          rotate: { duration: 35, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/2 left-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-r from-blue-500/4 to-purple-500/4 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default BackgroundAnimations;
