import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Briefcase, Users } from 'lucide-react';
import CurriculumBreakdown from './CurriculumBreakdown';
import InternshipProgram from './InternshipProgram';

const MainCourse = () => {
  const courseFeatures = [
    {
      icon: Clock,
      title: "Duration",
      description: "Daily Live Classes (Monday to Friday)\nTotal: 12 Weeks + 12 Weeks Internship",
      details: ["Interactive live sessions", "Recorded for later review", "Q&A with instructors", "Hands-on coding practice"]
    },
    {
      icon: Briefcase,
      title: "Internship Program",
      description: "Provided by Miraspark Technologies Pvt. Ltd.\nWork on real blockchain-based projects\nIncludes mentorship and performance certificate",
      details: ["Real-world project experience", "1-on-1 mentorship", "Performance evaluation", "Industry certification"]
    }
  ];

  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Course Overview
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A 3-Month Live Javascript, Basic Blockchain and Advanced Blockchain Training Program designed for students, 
            developers, and tech enthusiasts who want to build a strong foundation in Web3, smart contracts, 
            and decentralized technologies — followed by a 3-month remote internship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {courseFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              {/* Enhanced glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0097A7] via-purple-500 to-[#0097A7] rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0097A7] via-purple-500 to-[#0097A7] rounded-2xl opacity-40" />
              
              <div className="relative bg-gradient-to-br from-black via-gray-950 to-slate-900 rounded-2xl p-8 h-full border border-cyan-500/20 shadow-2xl">
                <feature.icon className="w-12 h-12 text-cyan-400 mb-6 drop-shadow-lg" />
                <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-sm">{feature.title}</h3>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <CurriculumBreakdown />
        <InternshipProgram />
      </div>
    </section>
  );
};

export default MainCourse;
