import React, { useState, useEffect } from 'react';
import { Users, Target, Award, Star, ArrowRight, Zap, Globe, TrendingUp } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentStat, setCurrentStat] = useState<number>(0);

  // Animation trigger on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Our Mission",
      description:
        "To democratize blockchain education and make cutting-edge technology accessible to everyone, regardless of their background.",
      gradient: "from-teal-400 to-teal-600",
      shadow: "shadow-teal-500/25",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Our Vision",
      description:
        "To create a global community of blockchain developers and innovators who will shape the future of decentralized technology.",
      gradient: "from-teal-500 to-emerald-500",
      shadow: "shadow-emerald-500/25",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Our Values",
      description:
        "Excellence in education, practical learning, mentorship, and guaranteed career support for every student.",
      gradient: "from-emerald-400 to-teal-500",
      shadow: "shadow-teal-400/25",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      experience: "10+ years in Blockchain",
      description: "Former blockchain architect at major tech companies, passionate about education.",
      avatar: "👨‍💼",
      gradient: "from-teal-500 to-emerald-600",
    },
    {
      name: "Priya Sharma",
      role: "Head of Education",
      experience: "8+ years in EdTech",
      description: "Expert in curriculum design and student success strategies.",
      avatar: "👩‍🏫",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      name: "Amit Patel",
      role: "Lead Blockchain Developer",
      experience: "7+ years in Web3",
      description: "Smart contract expert and DApp development specialist.",
      avatar: "👨‍💻",
      gradient: "from-teal-600 to-cyan-600",
    },
  ];

  const stats = [
    { number: "5000+", label: "Students Trained", icon: <Users className="h-8 w-8" />, color: "text-teal-300" },
    { number: "95%", label: "Job Placement Rate", icon: <Award className="h-8 w-8" />, color: "text-emerald-300" },
    { number: "50+", label: "Industry Partners", icon: <Globe className="h-8 w-8" />, color: "text-cyan-300" },
    { number: "3", label: "Years of Excellence", icon: <TrendingUp className="h-8 w-8" />, color: "text-teal-400" }
  ];

  const achievements = [
    { number: "5000+", label: "Students Trained" },
    { number: "95%", label: "Job Placement Rate" },
    { number: "50+", label: "Industry Partners" },
    { number: "3", label: "Years of Excellence" },
  ];

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
              <span className="text-xs sm:text-sm text-teal-100 font-medium drop-shadow-md">Pioneering Blockchain Education</span>
            </div>
            
            {/* Animated Title */}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="bg-gradient-to-r from-teal-200 via-teal-300 to-emerald-300 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                About Miraspark
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">Technologies</span>
            </h1>
            
            {/* Animated Description */}
            <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 drop-shadow-lg transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Pioneering blockchain education with practical learning, expert mentorship, and guaranteed career
              opportunities for the next generation of innovators.
            </p>

            {/* Animated Rotating Stats */}
            <div className={`mb-12 sm:mb-16 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-teal-400/20 hover:border-teal-300/30 transition-all duration-500 max-w-sm mx-auto shadow-2xl shadow-teal-500/20 hover:shadow-teal-400/30 hover:scale-105">
                <div className="flex items-center justify-center space-x-4">
                  <div className={`${stats[currentStat].color} transition-all duration-500 drop-shadow-lg`}>
                    {stats[currentStat].icon}
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">{stats[currentStat].number}</div>
                    <div className="text-sm text-gray-400 drop-shadow-sm">{stats[currentStat].label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-950/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {achievements.map((stat, index) => (
              <div
                key={index}
                className={`text-center bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl p-4 sm:p-6 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{
                  animationDelay: `${index * 0.2 + 1}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              Our <span className="text-teal-300">Core Values</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto drop-shadow-lg">
              The principles that guide everything we do at Miraspark Technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 transform shadow-2xl ${value.shadow} hover:shadow-2xl hover:shadow-teal-400/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
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

                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${value.gradient} rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl relative overflow-hidden`}>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {value.icon}
                </div>

                <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-md">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
                  {value.description}
                </p>

                {/* Hover arrow */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="h-4 w-4 text-teal-300 drop-shadow-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/60">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              Meet Our <span className="text-teal-300">Expert Team</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto drop-shadow-lg">
              Industry veterans and education experts dedicated to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-teal-300/30 transition-all duration-500 group hover:scale-105 hover:bg-gray-900/60 transform shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{
                  animationDelay: `${index * 0.2 + 2}s`,
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                {/* Floating particles effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400/20 rounded-full animate-ping shadow-lg shadow-teal-400/30"></div>
                  <div className="absolute bottom-3 left-3 w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse shadow-md shadow-emerald-400/30" style={{animationDelay: '1s'}}></div>
                </div>

                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-4 animate-bounce drop-shadow-lg">{member.avatar}</div>
                  
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${member.gradient} rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold mb-4 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl relative overflow-hidden`}>
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
                    <span className="relative z-10">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>

                  <h3 className="text-white text-lg sm:text-xl font-bold mb-2 group-hover:text-teal-300 transition-colors duration-300 drop-shadow-md">
                    {member.name}
                  </h3>
                  <p className="text-teal-300 font-semibold text-sm sm:text-base mb-1 group-hover:text-teal-200 transition-colors duration-300 drop-shadow-sm">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
                    {member.experience}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300 drop-shadow-sm">
                    {member.description}
                  </p>
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

      {/* Enhanced Story Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-8 sm:mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-xl">
              Our <span className="text-teal-300">Story</span>
            </h2>
          </div>

          <div className={`bg-gray-900/40 backdrop-blur-md border border-teal-400/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 hover:border-teal-300/30 transition-all duration-500 relative overflow-hidden shadow-2xl shadow-teal-500/15 hover:shadow-teal-400/20 hover:scale-105 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Animated background effects */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl">
              <div className="absolute top-4 left-4 w-6 h-6 bg-teal-400/8 rounded-full animate-pulse shadow-lg shadow-teal-400/20"></div>
              <div className="absolute top-8 right-8 w-4 h-4 bg-emerald-400/10 rounded-full animate-ping shadow-lg shadow-emerald-400/25" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-6 left-8 w-5 h-5 bg-cyan-400/8 rounded-full animate-bounce shadow-lg shadow-cyan-400/20" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-teal-300/12 rounded-full animate-pulse shadow-lg shadow-teal-300/25" style={{animationDelay: '3s'}}></div>
            </div>

            <div className="prose prose-lg prose-invert max-w-none relative z-10">
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 drop-shadow-md">
                Founded in 2021, Miraspark Technologies emerged from a simple observation: the blockchain industry was
                growing rapidly, but quality education was scarce and often inaccessible to aspiring developers.
              </p>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 drop-shadow-md">
                Our founders, having worked in the blockchain space for over a decade, recognized the gap between
                industry needs and available talent. They envisioned a platform that would not just teach blockchain
                concepts, but provide hands-on experience and guaranteed career opportunities.
              </p>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 drop-shadow-md">
                Today, we've trained over 5,000 students, with a 95% job placement rate. Our unique approach combines
                theoretical knowledge with practical projects, mentorship, and real-world internships.
              </p>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed drop-shadow-md">
                We're not just an education platform – we're a launchpad for the next generation of blockchain
                innovators who will shape the future of decentralized technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/80">
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
                <span className="text-xs sm:text-sm text-teal-200 font-medium drop-shadow-md">🚀 Join Our Success Story</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 group-hover:text-teal-300 transition-colors duration-500 drop-shadow-2xl">
                Ready to Transform <span className="text-teal-300 group-hover:text-white transition-colors duration-500">Your Future?</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto group-hover:text-white transition-colors duration-500 drop-shadow-lg">
                Join thousands of successful blockchain developers who started their journey with us. 
                Experience world-class education with guaranteed career opportunities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto sm:max-w-none relative z-10">
              <button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg shadow-2xl hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 group relative overflow-hidden hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Start Learning</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </button>
              <button className="bg-transparent border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold rounded-lg transition-all duration-300 group hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Learn More</span>
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;