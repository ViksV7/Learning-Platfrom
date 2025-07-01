import React from 'react';
import Navbar from '@/components/navbar';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Testimonials from '../components/testimonials/TestimonialsSection';
import ContactUs from '../components/ContactUs';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-blue-950 overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0097A7]/8 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#0097A7]/10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/6 rounded-full blur-3xl animate-pulse shadow-2xl shadow-purple-500/10" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse shadow-2xl shadow-cyan-500/8" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/6 w-60 h-60 bg-[#0097A7]/6 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#0097A7]/10" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
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

      <Navbar />
      <HeroSection />
      <Features />
      <Testimonials />
      <ContactUs />
      <FAQ />
      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;