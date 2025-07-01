
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  testimonials: any[];
  activeTestimonial: number;
  onSetActive: (index: number) => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onScrollLeft,
  onScrollRight,
  testimonials,
  activeTestimonial,
  onSetActive
}) => {
  return (
    <>
      {/* Centered Navigation Arrows */}
      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onScrollLeft}
          className="pointer-events-auto flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#0097A7]/20 to-purple-500/20 backdrop-blur-md border border-[#0097A7]/30 rounded-full text-[#0097A7] hover:bg-[#0097A7]/30 hover:border-[#0097A7]/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,151,167,0.3)] hover:shadow-[0_0_25px_rgba(0,151,167,0.5)]"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onScrollRight}
          className="pointer-events-auto flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#0097A7]/20 to-purple-500/20 backdrop-blur-md border border-[#0097A7]/30 rounded-full text-[#0097A7] hover:bg-[#0097A7]/30 hover:border-[#0097A7]/50 transition-all duration-300 shadow-[0_0_15px_rgba(0,151,167,0.3)] hover:shadow-[0_0_25px_rgba(0,151,167,0.5)]"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Enhanced Navigation Indicators */}
      <div className="flex justify-center space-x-2 mt-6 sm:mt-8 px-4">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSetActive(index)}
            className={`relative transition-all duration-300 ${
              activeTestimonial === index
                ? "w-6 sm:w-8 h-2 sm:h-3 bg-[#0097A7] rounded-full shadow-[0_0_15px_rgba(0,151,167,0.6)]"
                : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-600 rounded-full hover:bg-gray-500"
            }`}
          >
            {activeTestimonial === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-gradient-to-r from-[#0097A7] to-purple-500 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default NavigationControls;