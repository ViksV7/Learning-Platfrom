import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, Mail, Phone, MapPin, Github, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Courses",
      links: [
        { name: "Blockchain Basics", href: "#" },
        { name: "Smart Contracts", href: "#" },
        { name: "Web3 Development", href: "#" },
        { name: "DeFi Protocols", href: "#" },
        { name: "NFT Development", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Press", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Community", href: "#" },
        { name: "Discord", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "#", name: "GitHub" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", name: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", name: "LinkedIn" },
    { icon: <Youtube className="h-5 w-5" />, href: "#", name: "YouTube" }
  ];

  // Properly typed variants
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0 
    },
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
    <footer className="bg-gradient-to-br from-black to-gray-950 border-t border-[#0097A7]/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#0097A7]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 border-b border-[#0097A7]/10"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Our Latest Courses
            </h3>
            <p className="text-gray-400 mb-6">
              Get notified about new courses, workshops, and exclusive blockchain learning resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-[#0097A7]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0097A7] transition-colors duration-300"
              />
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px #0097A755" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#0097A7] to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-[0_0_15px_#0097A744] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0097A7] to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_#0097A744]">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#0097A7] to-purple-400 bg-clip-text text-transparent">
                Miraspark Technologies
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in blockchain education. We provide comprehensive courses, hands-on projects, 
              and guaranteed internships to help you build a successful career in Web3 and blockchain technology.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4 text-[#0097A7]" />
                <span className="text-sm">learn@mirasparktechnologies.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4 text-[#0097A7]" />
                <span className="text-sm">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4 text-[#0097A7]" />
                <span className="text-sm">Bangalore, Karnataka, India</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div key={index} variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5, color: '#0097A7' }}
                      className="text-gray-400 hover:text-[#0097A7] transition-all duration-300 text-sm block"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-6 border-t border-[#0097A7]/10 flex flex-col sm:flex-row items-center justify-between"
        >
          <div className="text-gray-400 text-sm mb-4 sm:mb-0">
            © 2024 Miraspark Technologies Pvt. Ltd. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ 
                  scale: 1.2, 
                  boxShadow: "0 0 15px #0097A755",
                  backgroundColor: '#0097A7'
                }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gray-800 hover:bg-[#0097A7] text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 border border-[#0097A7]/20 hover:border-[#0097A7]"
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 border-t border-[#0097A7]/10"
        > */}
          {/* <h3 className="text-2xl font-bold text-white mb-8 text-center">
            ❓ Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "Who is this course for?",
                answer: "This course is designed for students, developers, freshers, and tech enthusiasts who want to start a career in blockchain and Web3."
              },
              {
                question: "Are the classes live or recorded?",
                answer: "All classes are 100% live, conducted daily for 1 hour (Monday to Friday). You will interact directly with mentors."
              },
              {
                question: "Is there any internship opportunity?",
                answer: "Yes! After completing the 3-month course, you'll get a 3-month internship with Miraspark Technologies."
              },
              {
                question: "What kind of career support is provided?",
                answer: "We help with GitHub review, LinkedIn optimization, interview preparation, and job referrals."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-[#0097A7]/20 hover:border-[#0097A7]/40 transition-all duration-300"
              >
                <h4 className="text-white font-semibold mb-2">🔹 {faq.question}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div> */}
        {/* </motion.div> */}
      </div>
    </footer>
  );
};

export default Footer;