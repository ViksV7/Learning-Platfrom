
// import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Trophy, Target, Star } from 'lucide-react';

const Outcomes = () => {
  const outcomes = [
    {
      icon: CheckCircle,
      title: "Master Core Technologies",
      description: "Complete mastery of Solidity, Smart Contracts, and dApp development with hands-on experience"
    },
    {
      icon: Target,
      title: "Real Project Portfolio", 
      description: "Build and showcase real blockchain projects on GitHub that demonstrate your expertise to employers"
    },
    {
      icon: Star,
      title: "Industry Experience",
      description: "3-month remote internship with mentorship, performance evaluation, and professional certification"
    },
    {
      icon: Trophy,
      title: "Career Readiness",
      description: "Complete interview preparation, resume optimization, and job placement support for Web3 roles"
    }
  ];

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-yellow-400/30">
            <Trophy className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            🏁 Program Outcomes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform your career with comprehensive blockchain expertise and real-world experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative group"
            >
              {/* Enhanced glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0097A7] via-purple-500 to-[#0097A7] rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0097A7] via-purple-500 to-[#0097A7] rounded-2xl opacity-40" />
              
              <div className="relative bg-gradient-to-br from-black via-gray-950 to-slate-900 rounded-2xl p-8 border border-cyan-500/20 shadow-2xl hover:border-cyan-400/40 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0097A7] to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-cyan-400/30">
                  <outcome.icon className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-sm">{outcome.title}</h3>
                <p className="text-gray-300 leading-relaxed">{outcome.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 151, 167, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#0097A7] to-purple-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Start Your Blockchain Journey Today! 🚀
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Outcomes;