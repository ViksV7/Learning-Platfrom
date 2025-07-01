
import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  company?: string;
  phone?: string;
}

interface FeaturedTestimonialProps {
  testimonial: Testimonial;
}

const FeaturedTestimonial: React.FC<FeaturedTestimonialProps> = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
    >
      <div className="relative p-[2px] bg-gradient-to-r from-[#0097A7] via-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl">
        <div className="bg-gradient-to-br from-black/95 via-gray-900/90 to-black/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_0_50px_rgba(0,151,167,0.25),0_0_100px_rgba(0,151,167,0.1)] relative overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,151,167,0.4),transparent_70%)]" />
          </div>
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4"
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto object-cover border-3 border-[#0097A7]/40 shadow-[0_0_25px_rgba(0,151,167,0.4)]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 leading-relaxed font-light italic"
            >
              "{testimonial.content}"
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-white font-bold text-base sm:text-lg mb-1">
                {testimonial.name}
              </h4>
              <p className="text-[#0097A7] text-sm font-medium mb-1">
                {testimonial.role}
              </p>
              {testimonial.company && (
                <p className="text-gray-400 text-xs">
                  @ {testimonial.company}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedTestimonial;