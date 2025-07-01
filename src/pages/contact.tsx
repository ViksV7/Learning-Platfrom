// import React, { useState, useEffect } from 'react';
// import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, ArrowRight, Star, Globe, Users, Award, Zap } from 'lucide-react';

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   subject: string;
//   message: string;
// }

// const Contact = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
//   const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
//   const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
//   const [currentStat, setCurrentStat] = useState<number>(0);
//   const [isVisible, setIsVisible] = useState<boolean>(false);

//   // Animation trigger on mount
//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   // Auto-rotate stats
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentStat((prev) => (prev + 1) % stats.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     setIsSubmitting(false);
//     setIsSubmitted(true);
    
//     // Reset form after 3 seconds
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });
//     }, 3000);
//   };

//   const handleChange = (field: keyof FormData, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleEnrollNow = () => {
//     window.location.href = '/login';
//   };

//   const handleScheduleCall = () => {
//     window.location.href = '/login';
//   };

//   const handleGetDirections = () => {
//     const address = "Mumbai, Maharashtra, India";
//     const encodedAddress = encodeURIComponent(address);
//     window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
//   };

//   const handleEmailClick = () => {
//     window.location.href = 'mailto:info@mirasparktechnologies.com';
//   };

//   const handlePhoneClick = () => {
//     window.location.href = 'tel:+918793717659';
//   };

//   const contactInfo = [
//     {
//       icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />,
//       title: "Email Us",
//       details: "info@mirasparktechnologies.com",
//       description: "Send us an email anytime",
//       gradient: "from-teal-400 to-teal-600",
//       shadow: "shadow-teal-500/25",
//       action: handleEmailClick
//     },
//     {
//       icon: <Phone className="h-5 w-5 sm:h-6 sm:w-6" />,
//       title: "Call Us",
//       details: "+91 8793717659",
//       description: "Mon-Fri from 9am to 6pm",
//       gradient: "from-teal-500 to-emerald-500",
//       shadow: "shadow-emerald-500/25",
//       action: handlePhoneClick
//     },
//     {
//       icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
//       title: "Visit Us",
//       details: "Mumbai, Maharashtra, India",
//       description: "Our main office location",
//       gradient: "from-emerald-400 to-teal-500",
//       shadow: "shadow-teal-400/25",
//       action: handleGetDirections
//     },
//     {
//       icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />,
//       title: "Working Hours",
//       details: "Mon-Fri: 9AM-6PM",
//       description: "Weekend support available",
//       gradient: "from-teal-600 to-cyan-600",
//       shadow: "shadow-cyan-500/25",
//       action: () => {}
//     },
//   ];

//   const faqs = [
//     {
//       question: "How long does it take to complete a course?",
//       answer: "Our courses range from 6 weeks to 3 months depending on the program you choose. The Blockchain Bootcamp is our most comprehensive 3-month program with hands-on projects and real-world applications.",
//     },
//     {
//       question: "Do I need prior programming experience?",
//       answer: "No prior experience is required for our beginner courses. We start from the basics and gradually build up to advanced concepts. Our curriculum is designed to accommodate learners from all backgrounds.",
//     },
//     {
//       question: "Is the internship guaranteed?",
//       answer: "Yes, our Premium Plan includes a guaranteed 3-month internship with Miraspark Technologies upon successful completion of the course. We also provide placement assistance for all our graduates.",
//     },
//     {
//       question: "What kind of support do you provide?",
//       answer: "We provide 24/7 technical support, live mentorship sessions, career guidance, resume building, interview preparation, and access to our community of learners and alumni.",
//     },
//     {
//       question: "Are there any flexible payment options?",
//       answer: "Yes, we offer flexible payment plans including EMI options, early bird discounts, and scholarship programs for deserving candidates. Contact us to discuss the best payment plan for you.",
//     }
//   ];

//   const stats = [
//     { number: "500+", label: "Students Trained", icon: <Users className="h-8 w-8" />, color: "text-teal-300" },
//     { number: "95%", label: "Placement Rate", icon: <Award className="h-8 w-8" />, color: "text-emerald-300" },
//     { number: "50+", label: "Partner Companies", icon: <Globe className="h-8 w-8" />, color: "text-cyan-300" },
//     { number: "24/7", label: "Support Available", icon: <Zap className="h-8 w-8" />, color: "text-teal-400" }
//   ];

//   const testimonials = [
//     {
//       name: "Priya Sharma",
//       role: "Blockchain Developer",
//       company: "TechCorp",
//       content: "The blockchain course at Miraspark transformed my career. The practical approach and mentorship helped me land my dream job!",
//       avatar: "👩‍💻"
//     },
//     {
//       name: "Rahul Patel",
//       role: "Smart Contract Developer",
//       company: "CryptoTech",
//       content: "Outstanding curriculum and amazing support. The internship program gave me real-world experience that employers value.",
//       avatar: "👨‍💻"
//     },
//     {
//       name: "Anjali Singh",
//       role: "DeFi Specialist",
//       company: "FinanceDAO",
//       content: "From zero blockchain knowledge to expert level in 3 months. The instructors are industry professionals who really care.",
//       avatar: "👩‍🎓"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-black overflow-hidden relative">
//       {/* Enhanced Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-1/2 -left-1/2 w-full h-full">
//           <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-teal-400/8 rounded-full blur-3xl animate-pulse shadow-2xl shadow-teal-500/10"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-emerald-400/6 rounded-full blur-3xl animate-pulse shadow-2xl shadow-emerald-500/10" style={{animationDelay: '1s'}}></div>
//           <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse shadow-2xl shadow-cyan-500/8" style={{animationDelay: '2s'}}></div>
//           <div className="absolute top-3/4 left-1/6 w-20 h-20 sm:w-40 sm:h-40 lg:w-60 lg:h-60 bg-teal-300/6 rounded-full blur-3xl animate-pulse shadow-2xl shadow-teal-300/10" style={{animationDelay: '3s'}}></div>
//         </div>
//       </div>

//       {/* Floating Particles */}
//       <div className="fixed inset-0 pointer-events-none">
//         {[...Array(25)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-teal-400/20 rounded-full animate-float shadow-lg shadow-teal-400/10"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Hero Section with Step-by-step Animation */}
//       <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             {/* Animated Badge */}
//             <div className={`inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 mb-6 sm:mb-8 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-400/20 shadow-2xl shadow-teal-500/10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               <Star className="h-3 w-3 sm:h-4 sm:w-4 text-teal-300 mr-2 animate-spin drop-shadow-lg" />
//               <span className="text-xs sm:text-sm text-teal-100 font-medium drop-shadow-md">Trusted by 500+ Students</span>
//             </div>
            
//             {/* Animated Title */}
//             <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               <span className="bg-gradient-to-r from-teal-200 via-teal-300 to-emerald-300 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
//                 Get in Touch
//               </span>
//               <br />
//               <span className="text-white drop-shadow-2xl">Let's Build Together</span>
//             </h1>
            
//             {/* Animated Description */}
//             <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 drop-shadow-lg transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               Have questions about our courses? Need help choosing the right program? We're here to help you start your
//               blockchain journey and transform your career.
//             </p>

//             {/* Animated Rotating Stats */}
//             <div className={`mb-12 sm:mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-teal-400/20 hover:border-teal-300/30 transition-all duration-500 max-w-sm mx-auto shadow-2xl shadow-teal-500/20 hover:shadow-teal-400/30 hover:scale-105">
//                 <div className="flex items-center justify-center space-x-4">
//                   <div className={`${stats[currentStat].color} transition-all duration-500 drop-shadow-lg`}>
//                     {stats[currentStat].icon}
//                   </div>
//                   <div>
//                     <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">{stats[currentStat].number}</div>
//                     <div className="text-sm text-gray-400 drop-shadow-sm">{stats[currentStat].label}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Animated Testimonial Carousel */}
//             <div className={`mb-12 sm:mb-16 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-teal-400/20 hover:border-teal-300/30 transition-all duration-500 max-w-2xl mx-auto shadow-2xl shadow-teal-500/20 hover:shadow-teal-400/30 hover:scale-105">
//                 <div className="text-center">
//                   <div className="text-4xl mb-4 animate-bounce drop-shadow-lg">{testimonials[currentTestimonial].avatar}</div>
//                   <p className="text-gray-300 text-sm sm:text-base mb-4 italic drop-shadow-md leading-relaxed">
//                     "{testimonials[currentTestimonial].content}"
//                   </p>
//                   <div className="text-white font-semibold drop-shadow-md">{testimonials[currentTestimonial].name}</div>
//                   <div className="text-teal-300 text-sm drop-shadow-sm">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Contact Info Section */}
//       <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
//               Multiple Ways to <span className="text-teal-300">Connect</span>
//             </h2>
//             <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto drop-shadow-lg">
//               Choose the most convenient way to reach out to us
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//             {contactInfo.map((info, index) => (
//               <div
//                 key={index}
//                 onClick={info.action}
//                 className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 cursor-pointer transform shadow-2xl ${info.shadow} hover:shadow-2xl hover:shadow-teal-400/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
//                 style={{
//                   animationDelay: `${index * 0.2 + 1}s`,
//                   transitionDelay: `${index * 0.1}s`
//                 }}
//               >
//                 {/* Floating particles effect */}
//                 <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
//                   <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400/20 rounded-full animate-ping shadow-lg shadow-teal-400/30"></div>
//                   <div className="absolute bottom-3 left-3 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse shadow-md shadow-emerald-400/30" style={{animationDelay: '1s'}}></div>
//                 </div>
                
//                 <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${info.gradient} rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl relative overflow-hidden`}>
//                   {/* Shine effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                   {info.icon}
//                 </div>
                
//                 <h3 className="text-white text-sm sm:text-base lg:text-lg font-semibold mb-2 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-md">
//                   {info.title}
//                 </h3>
//                 <p className="text-teal-300 font-semibold text-xs sm:text-sm mb-2 break-all group-hover:text-teal-200 transition-colors duration-300 drop-shadow-sm">
//                   {info.details}
//                 </p>
//                 <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
//                   {info.description}
//                 </p>
                
//                 {/* Hover arrow */}
//                 <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
//                   <ArrowRight className="h-4 w-4 text-teal-300 drop-shadow-md" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Contact Form & FAQ Section */}
//       <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/60">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
//             {/* Enhanced Contact Form */}
//             <div className={`order-2 lg:order-1 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
//               <div className="mb-6 sm:mb-8">
//                 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
//                   Send us a <span className="text-teal-300">Message</span>
//                 </h2>
//                 <p className="text-gray-400 text-sm sm:text-base drop-shadow-lg">
//                   Fill out the form below and we'll get back to you within 24 hours.
//                 </p>
//               </div>

//               <div className="bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 transition-all duration-500">
//                 {/* Animated border effect */}
//                 <div className="absolute inset-0 rounded-xl sm:rounded-2xl">
//                   <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 via-emerald-400/10 to-cyan-400/10 opacity-0 hover:opacity-100 transition-opacity duration-1000 blur-sm"></div>
//                 </div>
                
//                 <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 relative z-10">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2 group">
//                       <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
//                         <span>Full Name *</span>
//                         <div className="w-2 h-2 bg-teal-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-teal-400/30"></div>
//                       </label>
//                       <input
//                         value={formData.name}
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("name", e.target.value)}
//                         className="w-full bg-gray-950/50 border border-teal-400/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 text-sm sm:text-base hover:bg-gray-950/70 shadow-lg shadow-black/10"
//                         placeholder="Your full name"
//                       />
//                     </div>
//                     <div className="space-y-2 group">
//                       <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
//                         <span>Email *</span>
//                         <div className="w-2 h-2 bg-teal-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-teal-400/30"></div>
//                       </label>
//                       <input
//                         type="email"
//                         value={formData.email}
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
//                         className="w-full bg-gray-950/50 border border-teal-400/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 text-sm sm:text-base hover:bg-gray-950/70 shadow-lg shadow-black/10"
//                         placeholder="your@email.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2 group">
//                       <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
//                         <span>Phone Number</span>
//                         <div className="w-2 h-2 bg-teal-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-teal-400/30"></div>
//                       </label>
//                       <input
//                         value={formData.phone}
//                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("phone", e.target.value)}
//                         className="w-full bg-gray-950/50 border border-teal-400/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 text-sm sm:text-base hover:bg-gray-950/70 shadow-lg shadow-black/10"
//                         placeholder="+91 XXXXX XXXXX"
//                       />
//                     </div>
//                     <div className="space-y-2 group">
//                       <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
//                         <span>Subject *</span>
//                         <div className="w-2 h-2 bg-teal-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-teal-400/30"></div>
//                       </label>
//                       <select
//                         value={formData.subject}
//                         onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("subject", e.target.value)}
//                         className="w-full bg-gray-950/50 border border-teal-400/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 text-sm sm:text-base hover:bg-gray-950/70 shadow-lg shadow-black/10"
//                       >
//                         <option value="" className="bg-gray-900">Select a subject</option>
//                         <option value="course-inquiry" className="bg-gray-900">Course Inquiry</option>
//                         <option value="technical-support" className="bg-gray-900">Technical Support</option>
//                         <option value="career-guidance" className="bg-gray-900">Career Guidance</option>
//                         <option value="partnership" className="bg-gray-900">Partnership</option>
//                         <option value="other" className="bg-gray-900">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="space-y-2 group">
//                     <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
//                       <span>Message *</span>
//                       <div className="w-2 h-2 bg-teal-400 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-teal-400/30"></div>
//                     </label>
//                     <textarea
//                       value={formData.message}
//                       onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("message", e.target.value)}
//                       className="w-full bg-gray-950/50 border border-teal-400/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 transition-all duration-300 min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base hover:bg-gray-950/70 shadow-lg shadow-black/10"
//                       placeholder="Tell us about your goals and how we can help..."
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting || isSubmitted}
//                     className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white py-3 sm:py-4 px-6 rounded-lg text-sm sm:text-lg font-semibold shadow-2xl hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:cursor-not-allowed relative overflow-hidden hover:scale-105"
//                   >
//                     {/* Button shine effect */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
//                     {isSubmitting ? (
//                       <>
//                         <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
//                         <span>Sending...</span>
//                       </>
//                     ) : isSubmitted ? (
//                       <>
//                         <CheckCircle className="h-5 w-5 animate-bounce" />
//                         <span>Message Sent!</span>
//                       </>
//                     ) : (
//                       <>
//                         <span>Send Message</span>
//                         <Send className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Enhanced FAQ Section */}
//             <div className={`order-1 lg:order-2 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
//               <div className="mb-6 sm:mb-8">
//                 <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
//                   Frequently Asked <span className="text-teal-300">Questions</span>
//                 </h2>
//                 <p className="text-gray-400 text-sm sm:text-base drop-shadow-lg">
//                   Quick answers to common questions about our programs and services.
//                 </p>
//               </div>

//               <div className="space-y-4 sm:space-y-6">
//                 {faqs.map((faq, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl overflow-hidden hover:border-teal-300/30 transition-all duration-300 group shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-teal-500/15"
//                   >
//                     <button
//                       onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
//                       className="w-full p-4 sm:p-6 text-left flex items-start justify-between hover:bg-gray-900/60 transition-colors duration-300 group"
//                     >
//                       <div className="flex items-start space-x-3 flex-1">
//                         <MessageCircle className={`h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mt-1 flex-shrink-0 transition-all duration-300 drop-shadow-lg ${expandedFaq === index ? 'rotate-12 scale-110' : ''}`} />
//                         <span className="text-white text-sm sm:text-base lg:text-lg font-medium pr-4 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-md">
//                           {faq.question}
//                         </span>
//                       </div>
//                       <div className={`transform transition-all duration-500 ${expandedFaq === index ? 'rotate-180 text-teal-400' : 'text-gray-400'}`}>
//                         <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 drop-shadow-md" />
//                       </div>
//                     </button>
//                     <div className={`overflow-hidden transition-all duration-500 ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
//                       <div className="px-4 pb-4 sm:px-6 sm:pb-6">
//                         <p className="text-gray-400 text-sm sm:text-base leading-relaxed pl-6 sm:pl-8 drop-shadow-sm">{faq.answer}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Map Section */}
//       <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className={`text-center mb-8 sm:mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
//               Visit Our <span className="text-teal-300">Office</span>
//             </h2>
//             <p className="text-gray-400 text-sm sm:text-base lg:text-lg drop-shadow-lg">Located in the heart of Mumbai's tech district</p>
//           </div>

//           <div className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl overflow-hidden hover:border-teal-300/30 transition-all duration-500 group transform shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             <div className="bg-gradient-to-br from-gray-950/80 to-black/90 h-48 sm:h-64 lg:h-80 flex items-center justify-center relative overflow-hidden">
//               {/* Animated background particles */}
//               <div className="absolute inset-0">
//                 <div className="absolute top-4 left-4 w-3 h-3 bg-teal-400/30 rounded-full animate-ping shadow-lg shadow-teal-400/30"></div>
//                 <div className="absolute top-8 right-8 w-2 h-2 bg-emerald-400/40 rounded-full animate-pulse shadow-lg shadow-emerald-400/30" style={{animationDelay: '1s'}}></div>
//                 <div className="absolute bottom-6 left-8 w-4 h-4 bg-cyan-400/20 rounded-full animate-bounce shadow-lg shadow-cyan-400/20" style={{animationDelay: '2s'}}></div>
//                 <div className="absolute bottom-4 right-4 w-2 h-2 bg-teal-300/30 rounded-full animate-ping shadow-lg shadow-teal-300/30" style={{animationDelay: '3s'}}></div>
//               </div>
              
//               <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 to-emerald-400/5 group-hover:from-teal-400/8 group-hover:to-emerald-400/8 transition-all duration-500"></div>
//               <div className="text-center relative z-10 p-4 group-hover:scale-105 transition-all duration-500">
//                 <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full p-3 sm:p-4 inline-block mb-4 shadow-2xl group-hover:shadow-2xl group-hover:shadow-teal-500/40 transition-all duration-500 relative overflow-hidden">
//                   {/* Icon shine effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
//                   <MapPin className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-white relative z-10 group-hover:rotate-12 transition-all duration-500 drop-shadow-xl" />
//                 </div>
//                 <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-2 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-xl">Miraspark Technologies</h3>
//                 <p className="text-gray-300 text-sm sm:text-base mb-1 group-hover:text-white transition-colors duration-300 drop-shadow-lg">Mumbai, Maharashtra, India</p>
//                 <p className="text-gray-400 text-xs sm:text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300 drop-shadow-md">Tech Hub District</p>
//                 <button 
//                   onClick={handleGetDirections}
//                   className="mt-4 bg-gray-900/50 hover:bg-gray-800/60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-teal-400/20 hover:border-teal-300/30 hover:scale-105 hover:shadow-xl group relative overflow-hidden shadow-lg shadow-black/10"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
//                   <span className="relative z-10 flex items-center space-x-2">
//                     <span>Get Directions</span>
//                     <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced CTA Section */}
//       <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/80">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className={`bg-gradient-to-br from-gray-950/60 to-black/80 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 border border-teal-400/20 backdrop-blur-md hover:border-teal-300/30 transition-all duration-500 relative overflow-hidden group transform shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//             {/* Animated background effects */}
//             <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl">
//               <div className="absolute top-4 left-4 w-6 h-6 bg-teal-400/8 rounded-full animate-pulse shadow-lg shadow-teal-400/20"></div>
//               <div className="absolute top-8 right-8 w-4 h-4 bg-emerald-400/10 rounded-full animate-ping shadow-lg shadow-emerald-400/25" style={{animationDelay: '1s'}}></div>
//               <div className="absolute bottom-6 left-8 w-5 h-5 bg-cyan-400/8 rounded-full animate-bounce shadow-lg shadow-cyan-400/20" style={{animationDelay: '2s'}}></div>
//               <div className="absolute bottom-4 right-4 w-3 h-3 bg-teal-300/12 rounded-full animate-pulse shadow-lg shadow-teal-300/25" style={{animationDelay: '3s'}}></div>
//             </div>
            
//             <div className="mb-6 sm:mb-8 relative z-10">
//               <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 bg-gray-900/50 rounded-full border border-teal-400/20 group-hover:border-teal-300/30 transition-all duration-500 shadow-lg shadow-teal-500/10">
//                 <span className="text-xs sm:text-sm text-teal-200 font-medium drop-shadow-md">🚀 Join 500+ Successful Students</span>
//               </div>
//               <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 group-hover:text-teal-300 transition-colors duration-500 drop-shadow-2xl">
//                 Ready to Start Your <span className="text-teal-300 group-hover:text-white transition-colors duration-500">Journey?</span>
//               </h2>
//               <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto group-hover:text-white transition-colors duration-500 drop-shadow-lg">
//                 Don't wait! Join thousands of successful blockchain developers who started their journey with us. 
//                 Transform your career today with our industry-leading programs.
//               </p>
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto sm:max-w-none relative z-10">
//               <button
//                 onClick={handleEnrollNow}
//                 className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg shadow-2xl hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 group relative overflow-hidden hover:scale-105"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                 <span className="relative z-10 flex items-center justify-center space-x-2">
//                   <span>Enroll Now</span>
//                   <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
//                 </span>
//               </button>
//               <button
//                 onClick={handleScheduleCall}
//                 className="bg-transparent border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30 relative overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//                 <span className="relative z-10 flex items-center justify-center space-x-2">
//                   <span>Schedule Call</span>
//                   <Phone className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;



import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, ArrowRight, Star, Globe, Users, Award, Zap } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [currentStat, setCurrentStat] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Animation trigger on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEnrollNow = () => {
    window.location.href = '/login';
  };

  const handleScheduleCall = () => {
    window.location.href = '/login';
  };

  const handleGetDirections = () => {
    const address = "Mumbai, Maharashtra, India";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@mirasparktechnologies.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+918793717659';
  };

  const contactInfo = [
    {
      icon: <Mail className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Email Us",
      details: "info@mirasparktechnologies.com",
      description: "Send us an email anytime",
      gradient: "from-[#0097A7] to-purple-600",
      shadow: "shadow-[#0097A7]/25",
      action: handleEmailClick
    },
    {
      icon: <Phone className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Call Us",
      details: "+91 8793717659",
      description: "Mon-Fri from 9am to 6pm",
      gradient: "from-[#0097A7] to-purple-500",
      shadow: "shadow-purple-500/25",
      action: handlePhoneClick
    },
    {
      icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Visit Us",
      details: "Mumbai, Maharashtra, India",
      description: "Our main office location",
      gradient: "from-purple-500 to-[#0097A7]",
      shadow: "shadow-[#0097A7]/25",
      action: handleGetDirections
    },
    {
      icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Working Hours",
      details: "Mon-Fri: 9AM-6PM",
      description: "Weekend support available",
      gradient: "from-purple-600 to-[#0097A7]",
      shadow: "shadow-purple-500/25",
      action: () => {}
    },
  ];

  const faqs = [
    {
      question: "How long does it take to complete a course?",
      answer: "Our courses range from 6 weeks to 3 months depending on the program you choose.",
    },
    {
      question: "Do I need prior programming experience?",
      answer: "No prior experience is required for our beginner courses. We start from the basics.",
    },
    {
      question: "Is the internship guaranteed?",
      answer: "Yes, our Premium Plan includes a guaranteed 3-month internship upon completion.",
    },
  ];

  const stats = [
    { number: "500+", label: "Students Trained", icon: <Users className="h-6 w-6" />, color: "text-[#0097A7]" },
    { number: "95%", label: "Placement Rate", icon: <Award className="h-6 w-6" />, color: "text-purple-400" },
    { number: "50+", label: "Partner Companies", icon: <Globe className="h-6 w-6" />, color: "text-[#0097A7]" },
    { number: "24/7", label: "Support Available", icon: <Zap className="h-6 w-6" />, color: "text-purple-400" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Blockchain Developer",
      company: "TechCorp",
      content: "The blockchain course at Miraspark transformed my career. The practical approach helped me land my dream job!",
      avatar: "👩‍💻"
    },
    {
      name: "Rahul Patel",
      role: "Smart Contract Developer",
      company: "CryptoTech",
      content: "Outstanding curriculum and amazing support. The internship program gave me real-world experience.",
      avatar: "👨‍💻"
    },
    {
      name: "Anjali Singh",
      role: "DeFi Specialist",
      company: "FinanceDAO",
      content: "From zero blockchain knowledge to expert level in 3 months. The instructors really care.",
      avatar: "👩‍🎓"
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-[#0097A7]/8 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#0097A7]/10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-400/6 rounded-full blur-3xl animate-pulse shadow-2xl shadow-purple-500/10" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-[#0097A7]/5 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#0097A7]/8" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/6 w-20 h-20 sm:w-40 sm:h-40 lg:w-60 lg:h-60 bg-purple-300/6 rounded-full blur-3xl animate-pulse shadow-2xl shadow-purple-300/10" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#0097A7]/20 rounded-full animate-float shadow-lg shadow-[#0097A7]/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section with Step-by-step Animation */}
      <section className="relative pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            {/* Animated Badge */}
            <div className={`inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 bg-gray-900/60 backdrop-blur-sm rounded-full border-2 border-transparent bg-gradient-to-r from-[#0097A7] to-purple-600 p-[1px] shadow-2xl shadow-[#0097A7]/20 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-black rounded-full px-3 py-1 sm:px-4 sm:py-2 flex items-center">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-[#0097A7] mr-2 animate-spin drop-shadow-lg" />
                <span className="text-xs sm:text-sm text-[#0097A7] font-medium drop-shadow-md">Trusted by 500+ Students</span>
              </div>
            </div>
            
            {/* Animated Title */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="bg-gradient-to-r from-[#0097A7] via-purple-400 to-purple-300 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                Get in Touch
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Let's Build Together</span>
            </h1>
            
            {/* Animated Description */}
            <p className={`text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-lg transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Have questions about our courses? Need help choosing the right program? We're here to help you start your
              blockchain journey and transform your career.
            </p>

            {/* Animated Rotating Stats */}
            <div className={`mb-12 sm:mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-teal-400/20 hover:border-teal-300/30 transition-all duration-500 max-w-sm mx-auto shadow-2xl shadow-teal-500/20 hover:shadow-teal-400/30 hover:scale-105">
//                 <div className="flex items-center justify-center space-x-4">
//                   <div className={`${stats[currentStat].color} transition-all duration-500 drop-shadow-lg`}>
//                     {stats[currentStat].icon}
//                   </div>
//                   <div>
//                     <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">{stats[currentStat].number}</div>
//                     <div className="text-sm text-gray-400 drop-shadow-sm">{stats[currentStat].label}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

            {/* Animated Testimonial Carousel */}
            <div className={`mb-12 sm:mb-16 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
//               <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-teal-400/20 hover:border-teal-300/30 transition-all duration-500 max-w-2xl mx-auto shadow-2xl shadow-teal-500/20 hover:shadow-teal-400/30 hover:scale-105">
//                 <div className="text-center">
//                   <div className="text-4xl mb-4 animate-bounce drop-shadow-lg">{testimonials[currentTestimonial].avatar}</div>
//                   <p className="text-gray-300 text-sm sm:text-base mb-4 italic drop-shadow-md leading-relaxed">
//                     "{testimonials[currentTestimonial].content}"
//                   </p>
//                   <div className="text-white font-semibold drop-shadow-md">{testimonials[currentTestimonial].name}</div>
//                   <div className="text-teal-300 text-sm drop-shadow-sm">{testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}</div>
//                 </div>
//               </div>
//             </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Info Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-8 sm:mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 drop-shadow-xl">
              Multiple Ways to <span className="text-[#0097A7]">Connect</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto drop-shadow-lg">
              Choose the most convenient way to reach out to us
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                onClick={info.action}
                className={`bg-gray-900/50 backdrop-blur-md border-2 border-transparent bg-gradient-to-r ${info.gradient} p-[1px] rounded-xl hover:scale-105 cursor-pointer transform shadow-xl ${info.shadow} hover:shadow-2xl hover:shadow-purple-400/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-500`}
                style={{
                  animationDelay: `${index * 0.2 + 1}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div className="bg-black rounded-lg p-4 group hover:bg-gray-900/60 transition-all duration-500">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${info.gradient} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    {info.icon}
                  </div>
                  
                  <h3 className="text-white text-sm font-semibold mb-2 group-hover:text-[#0097A7] transition-colors duration-300 drop-shadow-md">
                    {info.title}
                  </h3>
                  <p className="text-[#0097A7] font-semibold text-xs mb-2 break-all group-hover:text-purple-300 transition-colors duration-300 drop-shadow-sm">
                    {info.details}
                  </p>
                  <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
                    {info.description}
                  </p>
                  
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="h-3 w-3 text-[#0097A7] drop-shadow-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & FAQ Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Enhanced Contact Form */}
            <div className={`order-2 lg:order-1 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-xl">
                  Send us a <span className="text-[#0097A7]">Message</span>
                </h2>
                <p className="text-gray-400 text-sm drop-shadow-lg">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-md border-2 border-transparent bg-gradient-to-r from-[#0097A7] to-purple-600 p-[1px] rounded-xl shadow-2xl shadow-[#0097A7]/15 hover:shadow-purple-400/20 transition-all duration-500">
                <div className="bg-black rounded-lg p-4 sm:p-6 relative overflow-hidden">
                  <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2 group">
                        <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
                          <span>Full Name *</span>
                          <div className="w-2 h-2 bg-[#0097A7] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-[#0097A7]/30"></div>
                        </label>
                        <input
                          value={formData.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("name", e.target.value)}
                          className="w-full bg-gray-950/50 border border-[#0097A7]/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-[#0097A7] focus:outline-none focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300 text-sm hover:bg-gray-950/70 shadow-lg shadow-black/10"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
                          <span>Email *</span>
                          <div className="w-2 h-2 bg-[#0097A7] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-[#0097A7]/30"></div>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
                          className="w-full bg-gray-950/50 border border-[#0097A7]/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-[#0097A7] focus:outline-none focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300 text-sm hover:bg-gray-950/70 shadow-lg shadow-black/10"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2 group">
                        <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
                          <span>Phone Number</span>
                          <div className="w-2 h-2 bg-[#0097A7] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-[#0097A7]/30"></div>
                        </label>
                        <input
                          value={formData.phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("phone", e.target.value)}
                          className="w-full bg-gray-950/50 border border-[#0097A7]/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-[#0097A7] focus:outline-none focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300 text-sm hover:bg-gray-950/70 shadow-lg shadow-black/10"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div className="space-y-2 group">
                        <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
                          <span>Subject *</span>
                          <div className="w-2 h-2 bg-[#0097A7] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-[#0097A7]/30"></div>
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("subject", e.target.value)}
                          className="w-full bg-gray-950/50 border border-[#0097A7]/20 rounded-lg px-3 py-2 text-white focus:border-[#0097A7] focus:outline-none focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300 text-sm hover:bg-gray-950/70 shadow-lg shadow-black/10"
                        >
                          <option value="" className="bg-gray-900">Select a subject</option>
                          <option value="course-inquiry" className="bg-gray-900">Course Inquiry</option>
                          <option value="technical-support" className="bg-gray-900">Technical Support</option>
                          <option value="career-guidance" className="bg-gray-900">Career Guidance</option>
                          <option value="partnership" className="bg-gray-900">Partnership</option>
                          <option value="other" className="bg-gray-900">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-white text-sm font-medium flex items-center space-x-2 drop-shadow-md">
                        <span>Message *</span>
                        <div className="w-2 h-2 bg-[#0097A7] rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 shadow-lg shadow-[#0097A7]/30"></div>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("message", e.target.value)}
                        className="w-full bg-gray-950/50 border border-[#0097A7]/20 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-[#0097A7] focus:outline-none focus:ring-2 focus:ring-[#0097A7]/20 transition-all duration-300 min-h-[80px] resize-none text-sm hover:bg-gray-950/70 shadow-lg shadow-black/10"
                        placeholder="Tell us about your goals and how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className="w-full bg-gradient-to-r from-[#0097A7] to-purple-600 hover:from-purple-600 hover:to-[#0097A7] disabled:from-gray-500 disabled:to-gray-600 text-white py-3 px-6 rounded-lg text-sm font-semibold shadow-2xl hover:shadow-2xl hover:shadow-[#0097A7]/30 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:cursor-not-allowed relative overflow-hidden hover:scale-105"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Sending...</span>
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle className="h-4 w-4 animate-bounce" />
                          <span>Message Sent!</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Enhanced FAQ Section */}
            <div className={`order-1 lg:order-2 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-xl">
                  Frequently Asked <span className="text-[#0097A7]">Questions</span>
                </h2>
                <p className="text-gray-400 text-sm drop-shadow-lg">
                  Quick answers to common questions about our programs.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 backdrop-blur-md border-2 border-transparent bg-gradient-to-r from-[#0097A7] to-purple-600 p-[1px] rounded-xl overflow-hidden transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-[#0097A7]/15"
                  >
                    <div className="bg-black rounded-lg">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full p-3 sm:p-4 text-left flex items-start justify-between hover:bg-gray-900/60 transition-colors duration-300 group"
                      >
                        <div className="flex items-start space-x-2 flex-1">
                          <MessageCircle className={`h-4 w-4 text-[#0097A7] mt-1 flex-shrink-0 transition-all duration-300 drop-shadow-lg ${expandedFaq === index ? 'rotate-12 scale-110' : ''}`} />
                          <span className="text-white text-sm font-medium pr-3 group-hover:text-[#0097A7] transition-colors duration-300 drop-shadow-md">
                            {faq.question}
                          </span>
                        </div>
                        <div className={`transform transition-all duration-500 ${expandedFaq === index ? 'rotate-180 text-[#0097A7]' : 'text-gray-400'}`}>
                          <ArrowRight className="h-4 w-4 drop-shadow-md" />
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-500 ${expandedFaq === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                          <p className="text-gray-400 text-sm leading-relaxed pl-6 drop-shadow-sm">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-6 sm:mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-xl">
              Visit Our <span className="text-[#0097A7]">Office</span>
            </h2>
            <p className="text-gray-400 text-sm drop-shadow-lg">Located in the heart of Mumbai's tech district</p>
          </div>

          <div className={`bg-gradient-to-br from-black via-gray-950 to-blue-950/30 border-2 border-transparent bg-gradient-to-r from-[#0097A7] to-purple-600 p-[1px] rounded-xl overflow-hidden transition-all duration-500 group transform shadow-2xl shadow-[#0097A7]/15 hover:shadow-purple-400/20 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-br from-black via-gray-950/90 to-blue-950/20 h-40 sm:h-48 flex items-center justify-center relative overflow-hidden rounded-lg">
              {/* Animated background particles */}
              <div className="absolute inset-0">
                <div className="absolute top-3 left-3 w-2 h-2 bg-[#0097A7]/30 rounded-full animate-ping shadow-lg shadow-[#0097A7]/30"></div>
                <div className="absolute top-6 right-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse shadow-lg shadow-purple-400/30" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-4 left-6 w-3 h-3 bg-[#0097A7]/20 rounded-full animate-bounce shadow-lg shadow-[#0097A7]/20" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-3 right-3 w-1 h-1 bg-purple-300/30 rounded-full animate-ping shadow-lg shadow-purple-300/30" style={{animationDelay: '3s'}}></div>
              </div>
              
              <div className="text-center relative z-10 p-4 group-hover:scale-105 transition-all duration-500">
                <div className="bg-gradient-to-r from-[#0097A7] to-purple-600 rounded-full p-2 sm:p-3 inline-block mb-3 shadow-2xl group-hover:shadow-2xl group-hover:shadow-[#0097A7]/40 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white relative z-10 group-hover:rotate-12 transition-all duration-500 drop-shadow-xl" />
                </div>
                <h3 className="text-white text-base sm:text-lg font-bold mb-1 group-hover:text-[#0097A7] transition-colors duration-300 drop-shadow-xl">Miraspark Technologies</h3>
                <p className="text-gray-300 text-sm mb-1 group-hover:text-white transition-colors duration-300 drop-shadow-lg">Mumbai, Maharashtra, India</p>
                <p className="text-gray-400 text-xs mb-3 group-hover:text-gray-300 transition-colors duration-300 drop-shadow-md">Tech Hub District</p>
                <button 
                  onClick={handleGetDirections}
                  className="bg-gray-900/60 hover:bg-gray-800/60 text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 border border-[#0097A7]/20 hover:border-[#0097A7]/30 hover:scale-105 hover:shadow-xl group relative overflow-hidden shadow-lg shadow-black/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10 flex items-center space-x-1">
                    <span>Get Directions</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-950/80">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`bg-gradient-to-br from-black via-gray-950 to-blue-950/20 border-2 border-transparent bg-gradient-to-r from-[#0097A7] to-purple-600 p-[1px] rounded-xl backdrop-blur-md transition-all duration-500 relative overflow-hidden group transform shadow-2xl shadow-[#0097A7]/15 hover:shadow-purple-400/20 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-gradient-to-br from-black via-gray-950/90 to-blue-950/20 rounded-lg p-6 sm:p-8">
              {/* Animated background effects */}
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute top-3 left-3 w-4 h-4 bg-[#0097A7]/8 rounded-full animate-pulse shadow-lg shadow-[#0097A7]/20"></div>
                <div className="absolute top-6 right-6 w-3 h-3 bg-purple-400/10 rounded-full animate-ping shadow-lg shadow-purple-400/25" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-4 left-6 w-3 h-3 bg-[#0097A7]/8 rounded-full animate-bounce shadow-lg shadow-[#0097A7]/20" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-3 right-3 w-2 h-2 bg-purple-300/12 rounded-full animate-pulse shadow-lg shadow-purple-300/25" style={{animationDelay: '3s'}}></div>
              </div>
              
              <div className="mb-4 sm:mb-6 relative z-10">
                <div className="inline-flex items-center px-3 py-1 mb-3 sm:mb-4 bg-gray-900/60 rounded-full border border-[#0097A7]/20 group-hover:border-[#0097A7]/30 transition-all duration-500 shadow-lg shadow-[#0097A7]/10">
                  <span className="text-xs text-[#0097A7] font-medium drop-shadow-md">🚀 Join 500+ Successful Students</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 group-hover:text-[#0097A7] transition-colors duration-500 drop-shadow-2xl">
                  Ready to Start Your <span className="text-[#0097A7] group-hover:text-white transition-colors duration-500">Journey?</span>
                </h2>
                <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 max-w-xl mx-auto group-hover:text-white transition-colors duration-500 drop-shadow-lg">
                  Don't wait! Join thousands of successful blockchain developers who started their journey with us. 
                  Transform your career today with our industry-leading programs.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto sm:max-w-none relative z-10">
                <button
                  onClick={handleEnrollNow}
                  className="bg-gradient-to-r from-[#0097A7] to-purple-600 hover:from-purple-600 hover:to-[#0097A7] text-white px-6 py-3 text-sm font-semibold rounded-lg shadow-2xl hover:shadow-2xl hover:shadow-[#0097A7]/30 transition-all duration-300 group relative overflow-hidden hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Enroll Now</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>
                <button
                  onClick={handleScheduleCall}
                  className="bg-transparent border-2 border-[#0097A7] text-[#0097A7] hover:bg-[#0097A7] hover:text-black px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-[#0097A7]/30 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0097A7]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Schedule Call</span>
                    <Phone className="h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;