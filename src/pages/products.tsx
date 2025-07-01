import { useState, useEffect } from 'react';
import { BookOpen, Users, Award, Code, Globe, Shield, Zap, Target, Star, ArrowRight, CheckCircle } from "lucide-react"

const Products = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<number>(0);

  // Animation trigger on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate featured products
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const products = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Blockchain Fundamentals Course",
      description:
        "Complete beginner-friendly course covering blockchain basics, cryptography, and distributed systems.",
      features: ["30+ Video Lessons", "Interactive Quizzes", "Downloadable Resources", "Certificate of Completion"],
      price: "₹15,000",
      duration: "6 weeks",
      gradient: "from-teal-500 to-emerald-600",
      shadow: "shadow-teal-500/25",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Smart Contract Development",
      description: "Advanced course on Solidity programming, smart contract security, and DApp development.",
      features: ["Solidity Programming", "Security Best Practices", "Real Project Building", "Code Reviews"],
      price: "₹25,000",
      duration: "8 weeks",
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/25",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web3 Full Stack Development",
      description: "Complete Web3 development stack including frontend integration and blockchain interaction.",
      features: ["React + Web3.js", "MetaMask Integration", "IPFS Storage", "DApp Deployment"],
      price: "₹35,000",
      duration: "12 weeks",
      gradient: "from-teal-600 to-cyan-600",
      shadow: "shadow-cyan-500/25",
    },
  ]

  const services = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Corporate Training",
      description: "Customized blockchain training programs for enterprises and development teams.",
      features: ["Custom Curriculum", "On-site Training", "Team Assessments", "Ongoing Support"],
      gradient: "from-teal-500 to-emerald-600",
      shadow: "shadow-teal-500/25",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Certification Programs",
      description: "Industry-recognized blockchain certifications to validate your skills and knowledge.",
      features: ["Proctored Exams", "Digital Certificates", "LinkedIn Integration", "Industry Recognition"],
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/25",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Career Placement",
      description: "Dedicated placement assistance with our network of blockchain companies and startups.",
      features: ["Resume Building", "Interview Prep", "Company Connections", "Salary Negotiation"],
      gradient: "from-teal-600 to-cyan-600",
      shadow: "shadow-cyan-500/25",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Blockchain Consulting",
      description: "Expert consulting services for businesses looking to implement blockchain solutions.",
      features: ["Technical Architecture", "Implementation Strategy", "Security Audits", "Ongoing Support"],
      gradient: "from-cyan-500 to-teal-600",
      shadow: "shadow-teal-400/25",
    },
  ]

  const specialPrograms = [
    {
      title: "Blockchain Bootcamp",
      description: "Intensive 3-month program with guaranteed internship placement",
      price: "₹60,000",
      features: [
        "Daily Live Classes",
        "3 Real Projects",
        "6 Mentorship Sessions",
        "3-Month Internship",
        "Job Placement Support",
      ],
      popular: true,
      gradient: "from-teal-500 to-emerald-600",
      shadow: "shadow-teal-500/25",
    },
    {
      title: "Weekend Warrior",
      description: "Part-time program designed for working professionals",
      price: "₹40,000",
      features: ["Weekend Classes", "Flexible Schedule", "Self-paced Learning", "Industry Projects", "Career Guidance"],
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/25",
    },
    {
      title: "Student Special",
      description: "Discounted program for college students and recent graduates",
      price: "₹25,000",
      features: [
        "Student Discount",
        "Peer Learning Groups",
        "Campus Partnerships",
        "Internship Opportunities",
        "Alumni Network",
      ],
      gradient: "from-teal-600 to-cyan-600",
      shadow: "shadow-cyan-500/25",
    },
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-teal-400/8 rounded-full blur-3xl animate-pulse shadow-2xl shadow-teal-500/10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-emerald-400/6 rounded-full blur-3xl animate-pulse shadow-2xl shadow-emerald-500/10" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse shadow-2xl shadow-cyan-500/8" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/6 w-20 h-20 sm:w-40 sm:h-40 lg:w-60 lg:h-60 bg-teal-300/6 rounded-full blur-3xl animate-pulse shadow-2xl shadow-teal-300/10" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-teal-400/20 rounded-full animate-float shadow-lg shadow-teal-400/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Animated Badge */}
            <div className={`inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 mb-6 sm:mb-8 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-400/20 shadow-2xl shadow-teal-500/10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-teal-300 mr-2 animate-spin drop-shadow-lg" />
              <span className="text-xs sm:text-sm text-teal-100 font-medium drop-shadow-md">Comprehensive Learning Solutions</span>
            </div>
            
            {/* Animated Title */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="bg-gradient-to-r from-teal-200 via-teal-300 to-emerald-300 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                Products &
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Services</span>
            </h1>
            
            {/* Animated Description */}
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 drop-shadow-lg transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Comprehensive blockchain education solutions designed to transform your career and business with cutting-edge technology.
            </p>

            {/* Animated Featured Product Carousel */}
            <div className={`mb-12 sm:mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-teal-400/20 hover:border-teal-300/30 transition-all duration-500 max-w-2xl mx-auto shadow-2xl shadow-teal-500/20 hover:shadow-teal-400/30 hover:scale-105">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${products[currentProduct].gradient} rounded-xl flex items-center justify-center text-white mb-4 mx-auto shadow-xl transition-all duration-500`}>
                    {products[currentProduct].icon}
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-bold mb-2 drop-shadow-md">{products[currentProduct].title}</h3>
                  <p className="text-gray-300 text-sm mb-4 drop-shadow-sm">{products[currentProduct].description}</p>
                  <div className="flex items-center justify-center space-x-4">
                    <span className="text-2xl font-bold text-teal-300 drop-shadow-md">{products[currentProduct].price}</span>
                    <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full drop-shadow-sm">{products[currentProduct].duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Products Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              Our <span className="text-teal-300">Courses</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto drop-shadow-lg">
              Structured learning paths to master blockchain technology from basics to advanced concepts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 transform shadow-2xl ${product.shadow} hover:shadow-2xl hover:shadow-teal-400/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{
                  animationDelay: `${index * 0.2 + 1}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Floating particles effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400/20 rounded-full animate-ping shadow-lg shadow-teal-400/30"></div>
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse shadow-md shadow-emerald-400/30" style={{animationDelay: '1s'}}></div>
                </div>

                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${product.gradient} rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl relative overflow-hidden`}>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {product.icon}
                </div>

                <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-md">
                  {product.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
                  {product.description}
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl sm:text-2xl font-bold text-teal-300 drop-shadow-md">{product.price}</span>
                    <div className="bg-teal-400/20 border border-teal-400/30 text-teal-300 px-3 py-1 rounded-full text-xs sm:text-sm font-medium drop-shadow-sm">
                      {product.duration}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 drop-shadow-lg" />
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300 drop-shadow-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white py-3 text-sm sm:text-base font-semibold rounded-lg shadow-2xl hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 group relative overflow-hidden hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Enroll Now</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </button>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-4 w-4 text-teal-300 drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/60">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              Professional <span className="text-teal-300">Services</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto drop-shadow-lg">
              Specialized services for individuals and organizations looking to leverage blockchain technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 transform shadow-2xl ${service.shadow} hover:shadow-2xl hover:shadow-teal-400/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{
                  animationDelay: `${index * 0.2 + 1.5}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Floating particles effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400/20 rounded-full animate-ping shadow-lg shadow-teal-400/30"></div>
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse shadow-md shadow-emerald-400/30" style={{animationDelay: '1s'}}></div>
                </div>

                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${service.gradient} rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl relative overflow-hidden`}>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {service.icon}
                </div>

                <h3 className="text-white text-base sm:text-lg font-bold mb-2 sm:mb-3 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-md">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 sm:mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0 drop-shadow-lg"></div>
                      <span className="text-gray-300 text-xs sm:text-sm group-hover:text-white transition-colors duration-300 drop-shadow-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover arrow */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-4 w-4 text-teal-300 drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Special Programs Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              Special <span className="text-teal-300">Programs</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto drop-shadow-lg">
              Tailored programs designed for different learning needs and career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {specialPrograms.map((program, index) => (
              <div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 transform shadow-2xl ${program.shadow} hover:shadow-2xl hover:shadow-teal-400/30 relative ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${
                  program.popular ? "ring-2 ring-teal-500/50 scale-105" : ""
                }`}
                style={{
                  animationDelay: `${index * 0.2 + 2}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Popular Badge */}
                {program.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    {/* <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow-2xl shadow-teal-500/30 drop-shadow-lg">
                      Most Popular
                    </div> */}
                  </div>
                )}

                {/* Floating particles effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400/20 rounded-full animate-ping shadow-lg shadow-teal-400/30"></div>
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse shadow-md shadow-emerald-400/30" style={{animationDelay: '1s'}}></div>
                </div>

                <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-md">
                  {program.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
                  {program.description}
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-teal-300 mb-4 sm:mb-6 drop-shadow-md">{program.price}</div>

                <ul className="space-y-3 mb-6 sm:mb-8">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Zap className="h-4 w-4 text-teal-400 flex-shrink-0 drop-shadow-lg" />
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300 drop-shadow-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white py-3 text-sm sm:text-base font-semibold rounded-lg shadow-2xl hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 group relative overflow-hidden hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </button>

                {/* Hover arrow */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-4 w-4 text-teal-300 drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;