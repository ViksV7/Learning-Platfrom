// import React from 'react';
import { Check, Star, Mail,Award, Phone, Calendar, Briefcase, Clock,  Trophy, Target } from 'lucide-react';

function  Pricing() {
  const plans = [
    {
      name: 'JavaScript',
      price: '₹10,000',
      popular: false,
      features: [
        'Daily 1-hour Live Classes (3 months)',
        'Downloadable Notes & Resources',
        'Certificate of Completion',
        'Access to Peer Community',
        'Career Guidance & Resume Tips',
        '3 Real Projects',
        'Interview Practice Sessions',
        'GitHub Profile Review'
      ]
    },
    {
      name: 'Basic Blockchain',
      price: '₹20,000',
      popular: true,
      features: [
        'Daily 1-hour Live Classes (3 months)',
        'Downloadable Notes & Resources',
        'Certificate of Completion',
        'Access to Peer Community',
        'Interview Practice Session',
        'Career Guidance & Resume Tips',
        '3 Real Blockchain Projects',
        '3-Month Internship at Miraspark'
      ]
    },
    {
      name: 'Advanced Blockchain',
      price: '₹30,000',
      popular: false,
      features: [
        'Daily 1-hour Live Classes (3 months)',
        'Downloadable Notes & Resources',
        'Certificate of Completion',
        'Access to Peer Community',
        'Interview Practice Session',
        'Career Guidance & Resume Tips',
        '3 Real Blockchain Projects',
        '3-Month Internship at Miraspark'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-400 bg-clip-text text-transparent">
            Choose Your Path
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform your career with our comprehensive programming courses. From JavaScript fundamentals to advanced Blockchain development.
          </p>
        </div>

        {/* Pricing Cards - Equal Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <div key={index} className="relative group">
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-black px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}
              
              {/* Gradient Border Wrapper */}
              <div className="p-[2px] bg-gradient-to-r from-[#0097A7] to-purple-600 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                {/* Card with Fixed Height */}
                <div className="bg-black rounded-xl h-[480px] flex flex-col transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="p-5 flex flex-col h-full">
                    {/* Header - Fixed Height */}
                    <div className="text-center mb-5 h-[100px] flex flex-col justify-center">
                      <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                      <div className="mb-2">
                        <span className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                          {plan.price}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">Complete Program</p>
                    </div>

                    {/* Features - Flex Grow to Fill Space */}
                    <div className="flex-grow mb-5 overflow-hidden">
                      <ul className="space-y-2.5 h-full">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2 text-gray-300">
                            <Check className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Button - Fixed at Bottom */}
                    <button className="w-full py-3 px-4 rounded-lg font-semibold text-black bg-gradient-to-r from-teal-400 to-cyan-500 hover:shadow-md hover:shadow-teal-500/30 transform hover:scale-105 transition-all duration-300">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Program Details */}
        <div className="relative mb-12">
          <div className="p-[2px] bg-gradient-to-r from-[#0097A7] to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
            <div className="bg-black rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Program Structure
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center p-4 bg-gray-900/40 rounded-lg border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-8 h-8 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Live Classes</h3>
                  <p className="text-gray-300 text-sm mb-1">1 hour daily for 3 months</p>
                  <div className="flex items-center gap-1 text-teal-400 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>90+ hours total</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-gray-900/40 rounded-lg border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-8 h-8 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Internship</h3>
                  <p className="text-gray-300 text-sm mb-1">3 months after completion</p>
                  <div className="flex items-center gap-1 text-teal-400 text-xs">
                    <Target className="w-3 h-3" />
                    <span>Real experience</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-gray-900/40 rounded-lg border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Interview Prep</h3>
                  <p className="text-gray-300 text-sm mb-1">Tech + HR rounds</p>
                  <div className="flex items-center gap-1 text-teal-400 text-xs">
                    <Trophy className="w-3 h-3" />
                    <span>Job ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="relative text-center">
          <div className="p-[2px] bg-gradient-to-r from-[#0097A7] to-purple-600 rounded-xl shadow-lg shadow-purple-500/20">
            <div className="bg-black rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Need Help Choosing?
              </h2>
              <p className="text-gray-300 mb-6 text-base">
                Our team is here to help you find the perfect program for your career goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="mailto:info@mirasparktechnologies.com" 
                   className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>info@mirasparktechnologies.com</span>
                </a>
                <a href="tel:8793717659" 
                   className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm">
                  <Phone className="w-4 h-4" />
                  +91 87937 17659
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;