
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  company?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  rating,
  avatar,
  company,
  isActive = false,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-[2px] rounded-2xl cursor-pointer overflow-hidden group max-w-[300px] transition-all duration-500 ${
        isActive 
          ? "bg-gradient-to-br from-[#0097A7] via-blue-500 to-purple-600" 
          : "bg-gradient-to-br from-[#0097A7] via-blue-500 to-purple-600 hover:from-[#0097A7] hover:via-blue-400 hover:to-purple-500"
      }`}
      onClick={onClick}
    >
      {/* Main Card Content */}
      <div className={`relative bg-gradient-to-br from-black/95 via-gray-900/90 to-black/95 backdrop-blur-xl rounded-2xl p-5 transition-all duration-500 overflow-hidden h-full ${
        isActive 
          ? "shadow-[0_0_30px_rgba(0,151,167,0.4),0_0_60px_rgba(0,151,167,0.2)]" 
          : "shadow-[0_0_15px_rgba(0,151,167,0.2)] hover:shadow-[0_0_25px_rgba(0,151,167,0.3)]"
      }`}>
        
        {/* Enhanced Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0097A7]/3 via-blue-600/5 to-purple-600/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Animated Dots */}
        <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#0097A7]/40 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400/50 rounded-full animate-ping" style={{animationDelay: '1.5s'}} />

        <div className="relative z-10">
          {/* Quote Icon */}
          <div className="mb-3">
            <Quote className="h-5 w-5 text-[#0097A7]/50 group-hover:text-[#0097A7]/80 transition-colors duration-300" />
          </div>

          {/* Testimonial Content */}
          <motion.p 
            className="text-gray-300 leading-relaxed mb-4 text-sm group-hover:text-gray-200 transition-colors duration-300 line-clamp-3"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            "{content}"
          </motion.p>

          {/* Rating Stars */}
          <div className="flex items-center space-x-1 mb-4">
            {[...Array(rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Star className="h-3 w-3 text-yellow-400 fill-current drop-shadow-sm" />
              </motion.div>
            ))}
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={avatar}
                alt={name}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#0097A7]/30 shadow-lg group-hover:border-[#0097A7]/60 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0097A7]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <motion.h4 
                className="text-white font-semibold text-sm group-hover:text-[#0097A7] transition-colors duration-300 truncate"
                whileHover={{ x: 1 }}
              >
                {name}
              </motion.h4>
              <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300 truncate">
                {role}
              </p>
              {company && (
                <p className="text-[#0097A7]/70 text-xs font-medium mt-0.5 truncate">
                  @ {company}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          initial={false}
          animate={isActive ? { translateX: ['-100%', '100%'] } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        />

        {/* Enhanced Border Glow */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isActive 
            ? "shadow-[inset_0_0_15px_rgba(0,151,167,0.15)]" 
            : "group-hover:shadow-[inset_0_0_10px_rgba(0,151,167,0.08)]"
        }`} />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;