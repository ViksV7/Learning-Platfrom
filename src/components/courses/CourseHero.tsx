// import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, BookOpen, Users } from 'lucide-react';

const CourseHero = () => {
  return (
    <section className="relative px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-block p-1 rounded-2xl bg-gradient-to-r from-[#0097A7] via-purple-500 to-[#0097A7] mb-8"
        >
          <div className="bg-gray-900 rounded-2xl px-8 py-4">
            <BookOpen className="inline-block w-8 h-8 mr-3 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Blockchain Courses
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight"
        >
          Become a Blockchain
          <br />
          <span className="text-cyan-400">Developer</span> in 3 Months
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
        >
          Live Classes • Real Projects • Internship • Career Support
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 text-lg"
        >
          {[
            { icon: Rocket, text: "Live Training" },
            { icon: BookOpen, text: "Real Projects" },
            { icon: Users, text: "Mentorship" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300"
            >
              <item.icon className="w-6 h-6 text-cyan-400" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CourseHero;
