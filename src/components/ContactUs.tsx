import React, { useState } from 'react';
import { motion,Variants } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      value: "info@mirasparktechnologies.com",
      description: "Send us an email anytime",
      color: "from-[#0097A7] to-cyan-500"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      value: "+91 8793717659",
      description: "Mon-Fri from 9am to 6pm",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      value: "Mumbai, Maharashtra, India",
      description: "Our main office location",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      value: "Mon-Fri: 9AM-6PM",
      description: "Weekend support available",
      color: "from-orange-500 to-red-500"
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/60 to-black/80 -skew-y-1 transform origin-top-left"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Get in <span className="bg-gradient-to-r from-[#0097A7] to-purple-500 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Multiple Ways to Connect - Choose the most convenient way to reach out to us
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px #0097A755",
                borderColor: '#0097A7'
              }}
              className="group relative bg-gray-900/40 backdrop-blur-md border border-[#0097A7]/20 rounded-2xl p-6 transition-all duration-500 hover:bg-gray-900/60 overflow-hidden"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0097A7]/20 via-purple-600/20 to-[#0097A7]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              {/* Floating Particles */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#0097A7]/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-3 left-3 w-1 h-1 bg-purple-400/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>

              <div className="relative z-10 text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center text-white mb-4 mx-auto shadow-[0_0_20px_#0097A744] group-hover:shadow-[0_0_30px_#0097A766] transition-all duration-300`}
                >
                  {method.icon}
                </motion.div>

                <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-[#0097A7] transition-colors duration-300">
                  {method.title}
                </h3>

                <p className="text-[#0097A7] font-medium mb-2 group-hover:text-white transition-colors duration-300">
                  {method.value}
                </p>

                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {method.description}
                </p>
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                initial={false}
                animate={{ translateX: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Send Message Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-900/40 backdrop-blur-md border border-[#0097A7]/20 rounded-2xl p-8 shadow-[0_0_30px_#0097A744] hover:border-[#0097A7]/40 transition-all duration-500 relative overflow-hidden group"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0097A7]/5 via-purple-600/5 to-[#0097A7]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="h-6 w-6 text-[#0097A7]" />
                <h3 className="text-2xl font-bold text-white">
                  Send us a <span className="bg-gradient-to-r from-[#0097A7] to-purple-500 bg-clip-text text-transparent">Message</span>
                </h3>
              </div>
              
              <p className="text-gray-400 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Full Name <span className="text-[#0097A7]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-[#0097A7]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0097A7] focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email <span className="text-[#0097A7]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-[#0097A7]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0097A7] focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-[#0097A7]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0097A7] focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Subject <span className="text-[#0097A7]">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-[#0097A7]/20 rounded-lg text-white focus:outline-none focus:border-[#0097A7] focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="course-inquiry">Course Inquiry</option>
                      <option value="internship">Internship Information</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message <span className="text-[#0097A7]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Tell us about your goals and how we can help..."
                    className="w-full px-4 py-3 bg-gray-800/50 border border-[#0097A7]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0097A7] focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px #0097A766" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#0097A7] to-purple-600 text-white px-8 py-4 rounded-lg font-semibold shadow-[0_0_20px_#0097A744] transition-all duration-300 flex items-center justify-center space-x-2 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                  <span className="relative z-10">Send Message</span>
                  <Send className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-900/40 backdrop-blur-md border border-[#0097A7]/20 rounded-2xl p-8 shadow-[0_0_30px_#0097A744] hover:border-[#0097A7]/40 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why <span className="bg-gradient-to-r from-[#0097A7] to-purple-500 bg-clip-text text-transparent">Contact Us?</span>
              </h3>
              <ul className="space-y-4">
                {[
                  "Get personalized course recommendations",
                  "Learn about our internship programs",
                  "Discuss flexible payment options",
                  "Schedule a free consultation call",
                  "Get technical support and guidance"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-[#0097A7] rounded-full animate-pulse"></div>
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-md border border-[#0097A7]/20 rounded-2xl p-8 shadow-[0_0_30px_#0097A744] hover:border-[#0097A7]/40 transition-all duration-500">
              <h3 className="text-xl font-bold text-white mb-4">
                Quick <span className="text-[#0097A7]">Response</span>
              </h3>
              <p className="text-gray-300 mb-4">
                We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Usually responds within 2-4 hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;