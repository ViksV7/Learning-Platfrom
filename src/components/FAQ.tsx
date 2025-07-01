import React, { useState } from 'react';
import { motion, AnimatePresence,Variants } from 'framer-motion';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      question: "How long does it take to complete a course?",
      answer: "Our comprehensive blockchain course takes 3 months to complete with daily 1-hour live sessions (Monday to Friday). This includes hands-on projects, mentorship sessions, and practical assignments. The course is designed to take you from beginner to job-ready in this timeframe.",
      category: "course"
    },
    {
      question: "Do I need prior programming experience?",
      answer: "No prior programming experience is required! Our course is designed for complete beginners. We start with the basics of blockchain technology and gradually build up to advanced concepts. However, having some basic computer skills and enthusiasm to learn will be helpful.",
      category: "course"
    },
    {
      question: "Is the internship guaranteed?",
      answer: "Yes! Upon successful completion of our Premium Plan, you are guaranteed a 3-month internship with Miraspark Technologies Pvt. Ltd. You'll work on real blockchain projects, receive mentorship, and gain valuable industry experience. This internship includes weekly check-ins, task reviews, and a completion certificate.",
      category: "internship"
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide comprehensive support including: 24/7 technical assistance, live mentorship sessions, career guidance, resume and GitHub profile reviews, interview preparation, job referrals, and access to our exclusive student community. Our mentors are available for doubt clearing and project guidance.",
      category: "support"
    },
    {
      question: "Are there any flexible payment options?",
      answer: "Yes, we offer flexible payment plans to make our courses accessible. You can choose from monthly installments, early bird discounts, and student-friendly payment schedules. We also provide scholarships for deserving candidates. Contact us to discuss the best payment option for you.",
      category: "payment"
    },
    {
      question: "What technologies will I learn?",
      answer: "You'll learn cutting-edge blockchain technologies including Solidity, Ethereum, Smart Contracts, Web3.js, React for DApps, IPFS, Node.js, Hardhat, Remix IDE, and various blockchain frameworks. We also cover DeFi protocols, NFT development, and real-world project deployment.",
      category: "course"
    },
    {
      question: "Are the classes live or recorded?",
      answer: "All our classes are 100% live and interactive! We conduct daily 1-hour sessions (Monday to Friday) where you can directly interact with mentors, ask questions in real-time, and participate in live coding sessions. This ensures personalized attention and immediate doubt resolution.",
      category: "course"
    },
    {
      question: "What kind of projects will I build?",
      answer: "You'll build real-world projects including: Decentralized Applications (DApps), Smart Contracts for various use cases, NFT marketplaces, DeFi protocols, Blockchain voting systems, Supply chain tracking systems, and Token creation. All projects are deployed on testnets and some on mainnet.",
      category: "course"
    },
    {
      question: "Do you provide job placement assistance?",
      answer: "Absolutely! We provide comprehensive job placement support including: Resume optimization, LinkedIn profile enhancement, GitHub portfolio review, Mock interviews (technical + HR rounds), Job referrals to our partner companies, and ongoing career mentorship even after course completion.",
      category: "support"
    },
    {
      question: "What is the success rate of your students?",
      answer: "We have a 95% job placement rate within 6 months of course completion. Our students have been placed in top blockchain companies, startups, and have also started their own Web3 ventures. Many of our alumni are now working as blockchain developers, smart contract auditors, and Web3 consultants.",
      category: "general"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'course', name: 'Course Details', icon: <MessageCircle className="h-4 w-4" /> },
    { id: 'internship', name: 'Internship', icon: <MessageCircle className="h-4 w-4" /> },
    { id: 'support', name: 'Support', icon: <MessageCircle className="h-4 w-4" /> },
    { id: 'payment', name: 'Payment', icon: <MessageCircle className="h-4 w-4" /> },
    { id: 'general', name: 'General', icon: <MessageCircle className="h-4 w-4" /> }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950/60 to-black/80 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0097A7]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-[#0097A7] to-purple-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Quick answers to common questions about our programs and services.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-[#0097A7] to-purple-600 text-white shadow-[0_0_20px_#0097A744]'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-[#0097A7]/20 hover:border-[#0097A7]/40'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-gray-900/40 backdrop-blur-md border border-[#0097A7]/20 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#0097A7]/40 hover:shadow-[0_0_30px_#0097A755]"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0097A7]/10 via-purple-600/10 to-[#0097A7]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating Particles */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#0097A7]/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-3 left-3 w-1 h-1 bg-purple-400/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>

              <div className="relative z-10">
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-800/20 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#0097A7] to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_#0097A744] group-hover:shadow-[0_0_25px_#0097A766] transition-all duration-300">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg group-hover:text-[#0097A7] transition-colors duration-300">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-[#0097A7] transition-colors duration-300" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="pl-14">
                          <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-300 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                initial={false}
                animate={openIndex === index ? { translateX: ['-100%', '100%'] } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-gray-950/60 to-black/80 rounded-2xl p-8 border border-[#0097A7]/20 shadow-[0_0_30px_#0097A744] backdrop-blur-md hover:border-[#0097A7]/40 transition-all duration-500 group relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0097A7]/5 via-purple-600/5 to-[#0097A7]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Still Have <span className="bg-gradient-to-r from-[#0097A7] to-purple-500 bg-clip-text text-transparent">Questions?</span>
              </h3>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our team is here to help you with any questions about our blockchain courses and programs.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px #0097A766" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#0097A7] to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-[0_0_20px_#0097A744] transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                <span className="relative z-10 flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Our Team</span>
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;