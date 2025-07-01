import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Coins, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface Card {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cards: Card[] = [
    {
      id: 'gpu-net',
      title: 'GPU.NET',
      description: 'Decentralized computing power for AI and machine learning workloads.',
      icon: <Cpu className="w-8 h-8" />,
    },
    {
      id: 'rwa',
      title: 'RWA Protocol',
      description: 'Real World Assets tokenization and fractional ownership platform.',
      icon: <Coins className="w-8 h-8" />,
    },
    {
      id: 'defi-vault',
      title: 'DeFi Vault',
      description: 'Secure yield farming and liquidity mining with automated strategies.',
      icon: <Shield className="w-8 h-8" />,
    },
    {
      id: 'lightning',
      title: 'Lightning DEX',
      description: 'Ultra-fast decentralized exchange with zero-knowledge proofs.',
      icon: <Zap className="w-8 h-8" />,
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, cards.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-[#0097A7] to-cyan-400 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Cutting-edge Web3 solutions that power the future of decentralized finance and blockchain technology.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm border-2 border-[#0097A7]/50 rounded-full flex items-center justify-center text-gray-300 hover:bg-[#0097A7]/30 hover:border-[#0097A7] hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-sm border-2 border-[#0097A7]/50 rounded-full flex items-center justify-center text-gray-300 hover:bg-[#0097A7]/30 hover:border-[#0097A7] hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="flex items-center justify-center space-x-8 min-h-[400px]">
            {cards.map((card, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + cards.length) % cards.length;
              const isNext = index === (currentIndex + 1) % cards.length;
              const isVisible = isActive || isPrev || isNext;

              return (
                <AnimatePresence key={card.id}>
                  {isVisible && (
                    <motion.div
                      className={`relative cursor-pointer ${isActive ? 'z-10' : 'z-0'}`}
                      initial={{ opacity: 0, scale: 0.8, x: index > currentIndex ? 300 : -300 }}
                      animate={{
                        opacity: isActive ? 1 : 0.6,
                        scale: isActive ? 1.1 : 0.9,
                        x: 0,
                        y: isActive ? -20 : 0,
                      }}
                      exit={{ opacity: 0, scale: 0.8, x: index > currentIndex ? 300 : -300 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      onClick={() => goToSlide(index)}
                    >
                      {/* Teal gradient border container - reduced to 2px */}
                      <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#0097A7] via-cyan-500 to-[#0097A7] transition-all duration-500">
                        {/* Glassmorphic card */}
                        <div className="bg-gradient-to-br from-black/95 via-gray-950/98 to-black/95 backdrop-blur-xl rounded-3xl p-8 w-80 h-96 flex flex-col items-center justify-center text-center">
                          {/* Floating shadow */}
                          <motion.div
                            className="absolute inset-0 rounded-3xl shadow-2xl shadow-[#0097A7]/40 transition-all duration-500"
                            animate={isActive ? { 
                              boxShadow: [
                                `0 25px 50px -12px rgba(0, 151, 167, 0.4)`,
                                `0 25px 50px -12px rgba(6, 182, 212, 0.6)`,
                                `0 25px 50px -12px rgba(0, 151, 167, 0.4)`,
                              ]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          />

                          {/* Content */}
                          <div className="relative z-10">
                            {/* Icon with gradient ring */}
                            <motion.div
                              className="w-20 h-20 rounded-full mb-6 flex items-center justify-center bg-gradient-to-r from-[#0097A7]/30 to-cyan-500/30 transition-all duration-500"
                              animate={isActive ? { 
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                              } : {}}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0097A7] to-cyan-500 flex items-center justify-center text-white">
                                {card.icon}
                              </div>
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300">
                              {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-gray-300 transition-colors duration-300">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-[#0097A7] to-cyan-500 shadow-lg shadow-cyan-500/50' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardCarousel;