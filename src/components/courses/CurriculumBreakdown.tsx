
// import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Rocket, Briefcase, Globe, Shield, Database } from 'lucide-react';

const CurriculumBreakdown = () => {
  const curriculum = [
    { 
      week: "Week 1-2", 
      title: "Introduction to Blockchain & Web3", 
      icon: BookOpen,
      topics: ["Blockchain fundamentals", "Cryptocurrency basics", "Web3 ecosystem", "Decentralization concepts"]
    },
    { 
      week: "Week 3-4", 
      title: "Ethereum Development Basics", 
      icon: Code,
      topics: ["Ethereum architecture", "Gas & transactions", "Wallets integration", "Web3.js fundamentals"]
    },
    { 
      week: "Week 5-6", 
      title: "Smart Contract Development", 
      icon: Shield,
      topics: ["Solidity programming", "Contract deployment", "Testing frameworks", "Security best practices"]
    },
    { 
      week: "Week 7-8", 
      title: "dApp Development", 
      icon: Rocket,
      topics: ["Frontend integration", "React + Web3", "User authentication", "Transaction handling"]
    },
    { 
      week: "Week 9-10", 
      title: "IPFS & Decentralized Storage", 
      icon: Database,
      topics: ["IPFS implementation", "File storage", "Metadata handling", "Content addressing"]
    },
    { 
      week: "Week 11", 
      title: "Real Project Development", 
      icon: Globe,
      topics: ["Full-stack dApp", "Team collaboration", "Code reviews", "Deployment strategies"]
    },
    { 
      week: "Week 12", 
      title: "Career & Interview Preparation", 
      icon: Briefcase,
      topics: ["Portfolio building", "Interview prep", "Industry networking", "Job application strategies"]
    }
  ];

  const careerPrep = [
    "GitHub Portfolio Setup & Optimization",
    "Resume & LinkedIn Profile Enhancement", 
    "Blockchain Interview Questions & Answers",
    "Mock Interview Practice Sessions",
    "Salary Negotiation Strategies",
    "Industry Networking Events"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        📘 Comprehensive Curriculum Breakdown
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {curriculum.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="relative group"
          >
            {/* Enhanced shadow and glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-60" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl" />
            
            <div className="relative bg-gradient-to-br from-black via-gray-950 to-slate-900 border-2 border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 shadow-2xl h-full">
              <item.icon className="w-10 h-10 text-cyan-400 mb-4 drop-shadow-lg" />
              <h4 className="text-lg font-semibold text-cyan-300 mb-2 drop-shadow-sm">{item.week}</h4>
              <p className="text-white font-medium mb-4">{item.title}</p>
              
              <div className="space-y-2">
                {item.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-cyan-400/50" />
                    <span className="text-gray-300 text-sm leading-relaxed">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative"
      >
        {/* Enhanced glow for career prep section */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0097A7]/30 via-purple-500/30 to-[#0097A7]/30 rounded-2xl blur-xl opacity-60" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0097A7]/40 to-purple-500/40 rounded-2xl" />
        
        <div className="relative bg-gradient-to-br from-black via-gray-950 to-slate-900 rounded-2xl p-8 border-2 border-cyan-500/30 shadow-2xl">
          <h4 className="text-2xl font-bold text-cyan-300 mb-6 drop-shadow-sm">
            🎯 Week 12 - Career Preparation Details:
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerPrep.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full shadow-lg shadow-cyan-400/50" />
                <span className="text-gray-300 text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CurriculumBreakdown;