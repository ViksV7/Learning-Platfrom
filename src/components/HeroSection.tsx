import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  const handleStartLearning = () => {
    window.location.href = "/login";
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0097A7]/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/6 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 mb-8 bg-gray-900/50 backdrop-blur-sm rounded-full border border-[#0097A7]/30 shadow-[0_0_20px_#0097A744]"
          >
            <Zap className="h-4 w-4 text-[#0097A7] mr-2 animate-pulse" />
            <span className="text-sm text-gray-200 font-medium">Master Blockchain. Build Your Future.</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <motion.span
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-r from-[#0097A7] via-cyan-400 to-purple-500 bg-[length:200%_100%] bg-clip-text text-transparent drop-shadow-2xl"
            >
              Learn Blockchain
            </motion.span>
            <br />
            <span className="text-white drop-shadow-2xl">Build the Future</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Your one-stop destination to learn Blockchain, Web3, and Decentralized Technologies. From basics to
            real-world projects — ending with a{" "}
            <span className="text-[#0097A7] font-semibold">3-month internship</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              onClick={handleStartLearning}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px #0097A766" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#0097A7] to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-[0_0_20px_#0097A744] transition-all duration-300 group relative overflow-hidden min-w-[200px]"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={{ translateX: ['100%', '-100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Start Learning Today</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: '#0097A7' }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-[#0097A7]/50 text-[#0097A7] hover:bg-[#0097A7] hover:text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 group min-w-[200px]"
            >
              <span className="flex items-center justify-center space-x-2">
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Watch Demo</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: "500+", label: "Students Trained" },
              { number: "95%", label: "Job Placement Rate" },
              { number: "3 Months", label: "Guaranteed Internship" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-[#0097A7]/20 shadow-[0_0_15px_#0097A733] hover:shadow-[0_0_25px_#0097A755] transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#0097A7] mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;