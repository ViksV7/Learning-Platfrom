
// import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Award, Calendar } from 'lucide-react';

const InternshipProgram = () => {
  const internshipFeatures = [
    {
      icon: Code,
      title: "Real-World Projects",
      description: "Work on 2–3 live blockchain projects with actual business requirements and real users"
    },
    {
      icon: Users,
      title: "Expert Mentorship", 
      description: "1-on-1 guidance from experienced Miraspark developers with industry expertise"
    },
    {
      icon: Calendar,
      title: "Progress Tracking",
      description: "Weekly check-ins, code reviews, and detailed progress reports throughout the program"
    },
    {
      icon: Award,
      title: "Professional Certification",
      description: "Final performance review and Certificate of Internship completion from Miraspark Technologies"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          💼 3-Month Remote Internship Program
        </h3>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Gain real-world experience with professional mentorship and build your portfolio with live projects
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {internshipFeatures.map((feature, index) => (
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
                <feature.icon className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              
              <h4 className="text-xl font-bold text-white mb-4 drop-shadow-sm">{feature.title}</h4>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InternshipProgram;
