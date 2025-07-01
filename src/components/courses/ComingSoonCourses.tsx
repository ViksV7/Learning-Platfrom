
// import React from 'react';
import { motion } from 'framer-motion';
import {  Brain, Zap, Globe, Shield } from 'lucide-react';

const ComingSoonCourses = () => {
  const upcomingCourses = [
    {
      icon: Brain,
      title: "AI + Blockchain Bootcamp",
      description: "Combine the power of Artificial Intelligence with Blockchain technology to build intelligent decentralized apps (dApps) that can make autonomous decisions.",
      topics: "AI agents, data privacy, smart contracts + ML, decentralized AI protocols, neural networks on blockchain.",
      launchDate: "July 2025",
      duration: "4 Months",
      level: "Advanced",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      features: ["AI-powered smart contracts", "Machine learning integration", "Decentralized AI networks", "Privacy-preserving ML"]
    },
    {
      icon: Globe,
      title: "Zero to Hero: Full-Stack Web3 Developer", 
      description: "Master complete full-stack dApp development from frontend to backend, including deployment, scaling, and maintenance of production-ready Web3 applications.",
      topics: "Advanced Solidity, React, Node.js, IPFS, Web3.js, GraphQL, microservices architecture, cloud deployment.",
      launchDate: "August 2025",
      duration: "5 Months",
      level: "Intermediate to Advanced",
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      features: ["Full-stack development", "Production deployment", "Scalability patterns", "DevOps for Web3"]
    },
    {
      icon: Shield,
      title: "Blockchain Security & Auditing",
      description: "Learn to identify vulnerabilities, perform security audits, and build secure smart contracts. Become a blockchain security expert.",
      topics: "Smart contract auditing, penetration testing, security tools, vulnerability assessment, secure coding practices.",
      launchDate: "September 2025",
      duration: "3 Months",
      level: "Advanced",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      features: ["Security auditing", "Penetration testing", "Vulnerability analysis", "Secure development"]
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
            📅 Upcoming Premium Courses
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced specialized programs for developers ready to master cutting-edge blockchain technologies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 xl:grid-cols-3 gap-8">
          {upcomingCourses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -10 }}
              className="relative group"
            >
              {/* Enhanced glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${course.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500`} />
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${course.gradient} rounded-2xl opacity-30`} />
              
              <div className="relative bg-gradient-to-br from-black via-gray-950 to-slate-900 rounded-2xl p-8 h-full border border-cyan-500/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <course.icon className="w-12 h-12 text-cyan-400" />
                  <div className="text-right">
                    <div className="text-sm text-cyan-300 font-semibold">{course.level}</div>
                    <div className="text-sm text-gray-400">{course.duration}</div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">
                  🚀 {course.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                  {course.description}
                </p>
                
                <div className="mb-6 p-4 bg-white/5 rounded-lg border border-cyan-500/20">
                  <p className="text-sm text-cyan-300 font-semibold mb-2">🧠 What You'll Learn:</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{course.topics}</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-purple-300 font-semibold mb-3">✨ Key Features:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        <span className="text-gray-300 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`inline-flex items-center space-x-2 bg-gradient-to-r ${course.gradient} text-white font-bold py-3 px-6 rounded-full shadow-lg`}
                >
                  <span>🕒 Launching: {course.launchDate}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonCourses;