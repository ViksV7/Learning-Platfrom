
import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-6 sm:mb-8 px-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-block mb-3"
      >
        <span className="bg-gradient-to-r from-[#0097A7] to-purple-500 bg-clip-text text-transparent text-xs sm:text-sm font-semibold tracking-wider uppercase">
          Success Stories
        </span>
      </motion.div>
      
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
        Transforming Careers in
        <span className="block bg-gradient-to-r from-[#0097A7] via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Web3 & Blockchain
        </span>
      </h2>
      
      <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
        Hear from our graduates who've launched successful careers at top blockchain companies worldwide
      </p>
    </motion.div>
  );
};

export default SectionHeader;
