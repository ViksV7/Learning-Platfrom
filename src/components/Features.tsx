import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, Code, Users, Award, Zap, Target, Briefcase, GraduationCap } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Beginner-Friendly Learning",
      description: "We simplify complex blockchain concepts with videos, notes, and guided projects.",
      color: "from-[#0097A7] to-cyan-500"
    },
    {
      icon: <Code className="h-6 w-6 text-white" />,
      title: "Hands-on Projects",
      description: "You won't just watch — you'll build. Every module ends with a practical task.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "3-Month Internship Included",
      description: "Our premium plan guarantees an internship with Miraspark Technologies Pvt. Ltd.",
      color: "from-[#0097A7] to-purple-600"
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Expert Mentorship",
      description: "Live sessions with industry mentors to guide your growth.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Target className="h-6 w-6 text-white" />,
      title: "Live Daily Classes",
      description: "Learn directly from industry mentors in interactive sessions — no boring recorded videos.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Career Mentorship",
      description: "Get personalized guidance on resumes, GitHub portfolios, interview prep, and job hunting in Web3.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-white" />,
      title: "Mock Interviews & Placement Support",
      description: "Practice with real interview questions and scenarios to boost your confidence and readiness for blockchain roles.",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Real Blockchain Projects",
      description: "Build actual dApps, smart contracts, and deploy your work to the blockchain with mentor guidance.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/60 to-black/80 -skew-y-1 transform origin-top-left"></div>
      
      <div className="w-full max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
            💡 Why Choose <span className="bg-gradient-to-r from-[#0097A7] to-purple-500 bg-clip-text text-transparent">Us?</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            We provide comprehensive blockchain education with practical experience and guaranteed career support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 40px #1e3a8a55",
                borderColor: '#1e3a8a'
              }}
              className="group relative bg-gradient-to-br from-gray-950 via-slate-900 to-blue-950/80 backdrop-blur-md border border-slate-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 transition-all duration-500 hover:bg-gradient-to-br hover:from-black hover:via-slate-950 hover:to-blue-900/90 overflow-hidden min-h-[240px] sm:min-h-[260px] lg:min-h-[280px] w-full"
            >
              {/* Enhanced Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-slate-800/30 to-blue-950/30 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              {/* Floating Particles */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-1 h-1 bg-slate-400/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>

              <div className="relative z-10 h-full flex flex-col">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-4 sm:mb-5 lg:mb-6 shadow-[0_0_20px_#1e3a8a44] group-hover:shadow-[0_0_30px_#1e3a8a66] transition-all duration-300 flex-shrink-0`}
                >
                  {React.cloneElement(feature.icon as React.ReactElement, { 
                    className: "h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" 
                  })}
                </motion.div>

                <h3 className="text-white text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 flex-grow">
                  {feature.description}
                </p>
              </div>

              {/* Enhanced Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                initial={false}
                animate={{ translateX: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />

              {/* Dark overlay for more depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center px-2"
        >
          <div className="relative group">
            {/* Glow Effect for CTA Section */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl sm:rounded-2xl blur-sm opacity-40 group-hover:opacity-70 transition-all duration-300"></div>
            
            <div className="relative bg-gray-900/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700/50">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 px-2">
                🚀 Ready to Transform Your Career?
              </h3>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-3xl mx-auto px-2 leading-relaxed">
                Join 500+ successful students who have already started their blockchain journey with us. 
                Get hands-on experience, expert mentorship, and a guaranteed internship to kickstart your Web3 career.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#0097A7] to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 text-sm sm:text-base w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                Explore Our Courses
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements - responsive sizes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#0097A7]/10 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default Features;