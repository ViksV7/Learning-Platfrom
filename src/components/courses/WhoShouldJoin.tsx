
// import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Rocket, Briefcase, GraduationCap, Lightbulb, Target, TrendingUp } from 'lucide-react';

const WhoShouldJoin = () => {
  const targetAudience = [
    { 
      icon: GraduationCap, 
      title: "Students & Freshers", 
      description: "Build a strong foundation in blockchain technology and jumpstart your tech career",
      details: ["Recent graduates", "Computer science students", "Career changers", "Tech enthusiasts"]
    },
    { 
      icon: Code, 
      title: "Web2 Developers", 
      description: "Transition smoothly from traditional web development to cutting-edge Web3 technologies",
      details: ["JavaScript developers", "React/Node.js experts", "Full-stack developers", "Backend engineers"]
    },
    { 
      icon: Lightbulb, 
      title: "Startup Founders", 
      description: "Understand blockchain technology to build innovative decentralized solutions for your business",
      details: ["Tech entrepreneurs", "Product managers", "Innovation leaders", "Business strategists"]
    },
    { 
      icon: Target, 
      title: "Job Seekers", 
      description: "Land high-paying blockchain development roles in the rapidly growing Web3 industry",
      details: ["Career switchers", "Skill upgraders", "Remote workers", "Freelancers"]
    }
  ];

  const benefits = [
    { icon: TrendingUp, text: "High demand, high salary roles" },
    { icon: Rocket, text: "Future-proof your career" },
    { icon: Users, text: "Join thriving Web3 community" },
    { icon: Briefcase, text: "Remote work opportunities" }
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
            🧠 Who Should Join This Program?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Perfect for ambitious individuals ready to master the future of technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {targetAudience.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group h-full"
            >
              {/* Enhanced glow effects - using consistent gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0097A7] via-purple-500 to-[#0097A7] rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0097A7] via-purple-500 to-[#0097A7] rounded-xl opacity-40" />
              
              <div className="relative bg-gradient-to-br from-black via-gray-950 to-slate-900 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300 h-full shadow-2xl">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0097A7] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-400/30">
                  <audience.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{audience.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{audience.description}</p>
                
                <div className="space-y-2">
                  {audience.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#0097A7] to-purple-500 rounded-full shadow-lg shadow-cyan-400/50" />
                      <span className="text-gray-400 text-xs">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#0097A7] via-purple-500 to-[#0097A7] rounded-2xl blur-xl opacity-40" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0097A7] via-purple-500 to-[#0097A7] rounded-2xl opacity-50" />
          
          <div className="relative bg-gradient-to-br from-black via-gray-950 to-slate-900 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl">
            <h3 className="text-2xl font-bold text-center text-cyan-300 mb-8 drop-shadow-sm">
              🎯 Why Choose Blockchain Development?
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center p-4 bg-white/5 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <benefit.icon className="w-8 h-8 text-cyan-400 mb-3" />
                  <span className="text-gray-300 font-medium text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoShouldJoin;