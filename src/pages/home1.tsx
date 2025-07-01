"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  BookOpen,
  Award,
  Zap,
  Code
 
} from "lucide-react"

// TypeScript interfaces
interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

interface Course {
  title: string
  description: string
  duration: string
  level: string
  topics: string[]
}

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

interface PricingPlan {
  name: string
  price: string
  color: string
  popular?: boolean
  features: string[]
}

interface SelectedCourse {
  id: string
  title: string
  price: string
  originalPrice?: string
  discount?: string
}

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false)
  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse | null>(null)
  const [currentFeature, setCurrentFeature] = useState<number>(0)
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0)
const [, setScrollY] = useState<number>(0)

// const handleScroll = () => {
//   setScrollY(window.scrollY)
//   console.log(scrollY) // Example usage to read the value
// }



  useEffect(() => {
    setIsVisible(true)

    // Handle scroll for parallax effects
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Auto-rotate features with smooth transitions
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearInterval(featureInterval)
      clearInterval(testimonialInterval)
    }
  }, [])

  const handleStartLearning = (): void => {
    // Replace with your routing logic or redirect
    window.location.href = "/login"
  }

  const features: Feature[] = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Beginner-Friendly Learning",
      description: "We simplify complex blockchain concepts with videos, notes, and guided projects.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Hands-on Projects",
      description: "You won't just watch — you'll build. Every module ends with a practical task.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "3-Month Internship Included",
      description: "Our premium plan guarantees an internship with Miraspark Technologies Pvt. Ltd.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Expert Mentorship",
      description: "Live sessions with industry mentors to guide your growth.",
    },
  ]

  const courses: Course[] = [
    {
      title: "Blockchain Basics",
      description:
        "Master the fundamentals of blockchain technology, cryptography, and distributed systems. Learn how blocks are created, validated, and linked together.",
      duration: "2 weeks",
      level: "Beginner",
      topics: [
        "Hash Functions",
        "Digital Signatures",
        "Consensus Mechanisms",
        "Mining & Validation",
        "Merkle Trees",
        "Byzantine Fault Tolerance",
      ],
    },
    {
      title: "Smart Contracts (Solidity)",
      description:
        "Learn to write, deploy and test smart contracts on Ethereum blockchain. Master Solidity programming language and contract interaction patterns.",
      duration: "3 weeks",
      level: "Intermediate",
      topics: [
        "Solidity Language",
        "Contract Deployment",
        "Gas Optimization",
        "Security Best Practices",
        "Upgradeable Contracts",
        "Testing Frameworks",
      ],
    },
    
 
    {
      title: "IPFS & Decentralized Storage",
      description:
        "Implement decentralized file storage and content distribution systems. Learn to build censorship-resistant storage solutions.",
      duration: "2 weeks",
      level: "Intermediate",
      topics: [
        "IPFS Protocol",
        "Content Addressing",
        "Pinning Services",
        "Integration with DApps",
        "Filecoin Network",
        "Decentralized CDN",
      ],
    },
    {
      title: "Web3 & DApps",
      description:
        "Create modern decentralized applications with React and blockchain integration. Build responsive, user-friendly blockchain interfaces.",
      duration: "3 weeks",
      level: "Advanced",
      topics: [
        "React + Web3",
        "Wallet Connection",
        "Transaction Handling",
        "UI/UX for DApps",
        "State Management",
        "Error Handling",
      ],
    },
    {
      title: "Node Deployment & Dev Tools",
      description:
        "Set up blockchain nodes and master development tools for production. Learn DevOps practices for blockchain applications.",
      duration: "2 weeks",
      level: "Advanced",
      topics: ["Node Setup", "Remix IDE", "Hardhat", "Deployment Strategies", "CI/CD Pipeline", "Monitoring Tools"],
    },
    {
      title: "Project Building on Testnets",
      description:
        "Deploy and test your projects on various testnets before mainnet launch. Learn testing strategies and network migration techniques.",
      duration: "3 weeks",
      level: "Advanced",
      topics: [
        "Testnet Deployment",
        "Faucets & Testing",
        "Multi-chain Support",
        "Mainnet Migration",
        "Performance Testing",
        "Security Audits",
      ],
    },
  ]

  const testimonials: Testimonial[] = [
    {
      name: "Akash",
      role: "Web3 Learner",
      content: "The course helped me go from zero to internship-ready in just 3 months!",
      rating: 5,
    },
    {
      name: "Sneha",
      role: "Blockchain Intern",
      content: "The live sessions and support were game-changing. Highly recommend Miraspark.",
      rating: 5,
    },
    {
      name: "Rahul",
      role: "Smart Contract Developer",
      content: "Best investment I made for my career. The mentorship was invaluable.",
      rating: 5,
    },
  ]

  const pricingPlans: PricingPlan[] = [
    {
      name: "Basic Plan",
      price: "₹25k",
      color: "from-emerald-600 to-teal-700",
      features: [
        "Daily 1-hour Live Blockchain Classes (3 months)",
        "Downloadable Notes & Resources",
        "Certificate of Completion",
        "Access to Peer Community & Discussion Group",
      ],
    },
    {
      name: "Pro Plan",
      price: "₹40k",
      color: "from-amber-500 to-orange-600",
      popular: true,
      features: [
        "Everything in Basic",
        "2 Live Mentorship Calls per Month",
        "1 Mini Blockchain Project (Reviewed)",
        "1 Interview Practice Session (Tech round)",
        "Career Guidance & Resume Tips",
      ],
    },
    {
      name: "Premium Plan",
      price: "₹60k",
      color: "from-blue-600 to-indigo-700",
      features: [
        "Everything in Pro",
        "6 Mentor Sessions + 3 Real Blockchain Projects",
        "3-Month Blockchain Internship at Miraspark",
        "2 Interview Practice Sessions (Tech + HR)",
        "GitHub Profile Review & Certification",
      ],
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

      {/* Hero Section with Enhanced Animations */}
      <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Animated Badge */}
            <div className={`inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 mb-6 sm:mb-8 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-400/20 shadow-2xl shadow-teal-500/10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-teal-300 mr-2 animate-spin drop-shadow-lg" />
              <span className="text-xs sm:text-sm text-teal-100 font-medium drop-shadow-md">Master Blockchain. Build Your Future.</span>
            </div>

            {/* Animated Title */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="bg-gradient-to-r from-teal-200 via-teal-300 to-emerald-300 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                Learn Blockchain
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Build the Future</span>
            </h1>

            {/* Animated Description */}
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 drop-shadow-lg transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Your one-stop destination to learn Blockchain, Web3, and Decentralized Technologies. From basics to
              real-world projects — ending with a{" "}
              <span className="text-teal-400 font-semibold">3-month internship</span>.
            </p>

            {/* Animated CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button
                onClick={handleStartLearning}
                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg shadow-2xl hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 group relative overflow-hidden hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Start Learning Today</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </button>
              <button className="bg-transparent border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Watch Demo</span>
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section with Auto-Swapping Cards */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              💡 Why Choose <span className="text-teal-300">Us?</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto drop-shadow-lg">
              We provide comprehensive blockchain education with practical experience and guaranteed career support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 transform shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 relative overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${
                  currentFeature === index
                    ? "border-teal-500/70 shadow-2xl shadow-teal-500/40 scale-105"
                    : ""
                }`}
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

                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl relative overflow-hidden ${
                    currentFeature === index ? "scale-110 shadow-lg shadow-teal-500/50" : "group-hover:scale-110 group-hover:rotate-6"
                  }`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {feature.icon}
                </div>
                <h3
                  className={`text-white text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 transition-colors duration-300 drop-shadow-md ${
                    currentFeature === index ? "text-teal-400" : "group-hover:text-teal-400"
                  }`}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">{feature.description}</p>

                {/* Hover arrow */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-teal-300 drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Courses Section with Hover Animations */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/60">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              📚 Explore Our <span className="text-teal-300">Courses</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto drop-shadow-lg">
              Comprehensive curriculum designed to take you from blockchain basics to advanced development. Each course
              includes hands-on projects, live sessions, and industry-relevant skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 transform shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 relative overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
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

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-500 rounded-full animate-pulse shadow-lg shadow-teal-500/30"></div>
                      <span
                        className={`text-xs font-medium px-2 py-1 sm:px-3 sm:py-1 rounded-full transition-all duration-300 ${
                          course.level === "Beginner"
                            ? "bg-green-500/20 text-green-400 group-hover:bg-green-500/30"
                            : course.level === "Intermediate"
                              ? "bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30"
                              : "bg-red-500/20 text-red-400 group-hover:bg-red-500/30"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full group-hover:bg-teal-500/20 group-hover:text-teal-300 transition-all duration-300 drop-shadow-sm">
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-teal-400 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                    <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg group-hover:text-teal-400 transition-colors duration-300 drop-shadow-md">
                      {course.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed overflow-hidden max-h-16 sm:max-h-24 group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
                    {course.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-xs sm:text-sm font-medium text-teal-300 group-hover:text-teal-200 transition-colors duration-300 drop-shadow-md">
                      Key Topics:
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {course.topics.slice(0, 4).map((topic, topicIndex) => (
                        <span
                          key={topicIndex}
                          className="text-xs bg-teal-500/10 text-teal-300 px-2 py-1 rounded-md border border-teal-500/20 group-hover:bg-teal-500/20 group-hover:border-teal-500/40 transition-all duration-300 drop-shadow-sm"
                        >
                          {topic}
                        </span>
                      ))}
                      {course.topics.length > 4 && (
                        <span className="text-xs text-gray-500 px-2 py-1 group-hover:text-gray-400 transition-colors duration-300 drop-shadow-sm">
                          +{course.topics.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-teal-300 drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              Choose Your <span className="text-teal-300">Learning Path</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg drop-shadow-lg">Select the plan that best fits your learning goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 transform shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 relative overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${
                  plan.popular
                    ? "border-teal-500/70 shadow-2xl shadow-teal-500/30 scale-105 -translate-y-2"
                    : ""
                }`}
                style={{
                  animationDelay: `${index * 0.2 + 2}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    {/* <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-2xl shadow-teal-500/30 animate-bounce drop-shadow-lg">
                      Most Popular
                    </div> */}
                  </div>
                )}

                {/* Floating particles effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400/20 rounded-full animate-ping shadow-lg shadow-teal-400/30"></div>
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse shadow-md shadow-emerald-400/30" style={{animationDelay: '1s'}}></div>
                </div>

                <div className="relative z-10">
  <div className="mb-4 sm:mb-5">
    <h3 className="text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-md">
      {plan.name}
    </h3>
    <div className="flex items-baseline mb-1.5">
      <span
        className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent drop-shadow-lg`}
      >
        {plan.price}
      </span>
      <span className="text-gray-400 text-sm sm:text-base ml-2 drop-shadow-sm">/course</span>
    </div>
  </div>

  <ul className="space-y-2 sm:space-y-3 mb-5">
    {plan.features.map((feature, featureIndex) => (
      <li key={featureIndex} className="flex items-start space-x-2">
        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
        <span className="text-gray-300 text-xs sm:text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300 drop-shadow-sm">
          {feature}
        </span>
      </li>
    ))}
  </ul>

  <button
    onClick={() => {
      setSelectedCourse({
        id: index.toString(),
        title: plan.name,
        price: plan.price,
        originalPrice: plan.name === "Pro Plan" ? "₹50k" : undefined,
        discount: plan.name === "Pro Plan" ? "20% OFF" : undefined,
      })
      setIsPaymentModalOpen(true)
    }}
    className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:shadow-2xl transition-all duration-300 border-0 transform hover:scale-105 group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1000ms]"></div>
    <span className="relative z-10">Choose Plan</span>
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

      {/* Enhanced Testimonials Section with Auto-Swapping */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/60">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              What Our <span className="text-teal-300">Students Say</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg drop-shadow-lg">Real success stories from our blockchain learners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 transform shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 relative overflow-hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${
                  currentTestimonial === index
                    ? "border-teal-500/70 shadow-2xl shadow-teal-500/40 scale-105 -translate-y-2"
                    : ""
                }`}
                style={{
                  animationDelay: `${index * 0.2 + 2.5}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Floating particles effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400/20 rounded-full animate-ping shadow-lg shadow-teal-400/30"></div>
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse shadow-md shadow-emerald-400/30" style={{animationDelay: '1s'}}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center space-x-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current transition-all duration-300 drop-shadow-lg ${
                          currentTestimonial === index ? "animate-pulse" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-3 sm:mb-4 group-hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base drop-shadow-sm">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold transition-all duration-300 shadow-xl group-hover:shadow-2xl ${
                        currentTestimonial === index ? "scale-110 shadow-lg shadow-teal-500/50" : "group-hover:scale-110"
                      }`}
                    >
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-medium group-hover:text-teal-300 transition-colors duration-300 text-sm sm:text-base drop-shadow-md">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-teal-300 drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`bg-gradient-to-br from-gray-950/60 to-black/80 rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 border border-teal-400/20 backdrop-blur-md hover:border-teal-300/30 transition-all duration-500 relative overflow-hidden group transform shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Animated background effects */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl">
              <div className="absolute top-4 left-4 w-6 h-6 bg-teal-400/8 rounded-full animate-pulse shadow-lg shadow-teal-400/20"></div>
              <div className="absolute top-8 right-8 w-4 h-4 bg-emerald-400/10 rounded-full animate-ping shadow-lg shadow-emerald-400/25" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-6 left-8 w-5 h-5 bg-cyan-400/8 rounded-full animate-bounce shadow-lg shadow-cyan-400/20" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-teal-300/12 rounded-full animate-pulse shadow-lg shadow-teal-300/25" style={{animationDelay: '3s'}}></div>
            </div>
            
            <div className="mb-6 sm:mb-8 relative z-10">
              <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 mb-4 sm:mb-6 bg-gray-900/50 rounded-full border border-teal-400/20 group-hover:border-teal-300/30 transition-all duration-500 shadow-lg shadow-teal-500/10">
                <span className="text-xs sm:text-sm text-teal-200 font-medium drop-shadow-md">🚀 Join 500+ Successful Students</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 group-hover:text-teal-300 transition-colors duration-500 drop-shadow-2xl">
                Ready to Start Your <span className="text-teal-300 group-hover:text-white transition-colors duration-500">Blockchain Journey?</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto group-hover:text-white transition-colors duration-500 drop-shadow-lg">
                Join thousands of students who have transformed their careers with our comprehensive blockchain education.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto sm:max-w-none relative z-10">
              <button
                onClick={handleStartLearning}
                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg shadow-2xl hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 group relative overflow-hidden hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>📲 Start Learning Today</span>
                </span>
              </button>
              <button className="bg-transparent border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>📨 Contact Us</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

    

      {/* Enhanced Payment Modal */}
      {isPaymentModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-950/90 to-black/95 border border-teal-500/30 rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-teal-500/20 backdrop-blur-xl">
            <h3 className="text-white text-lg sm:text-xl font-bold mb-4 text-center drop-shadow-md">Selected Course</h3>
            <div className="space-y-3 mb-6">
              <p className="text-gray-300 text-sm sm:text-base">
                Course: <span className="text-teal-400 font-semibold">{selectedCourse.title}</span>
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                Price: <span className="text-green-400 font-semibold">{selectedCourse.price}</span>
              </p>
              {selectedCourse.discount && (
                <p className="text-gray-300 text-sm sm:text-base">
                  Discount: <span className="text-yellow-400 font-semibold">{selectedCourse.discount}</span>
                </p>
              )}
            </div>
            <div className="flex gap-3 sm:gap-4">
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                Close
              </button>
              <button className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Home