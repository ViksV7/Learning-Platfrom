import React from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import BackgroundAnimations from './BackgroundAnimations';
import SectionHeader from './SectionHeader';
import FeaturedTestimonial from './FeaturedTestimonial';
import NavigationControls from './NavigationControls';
import { testimonialsData } from './TestimonialsData';

const TestimonialsSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // card width + gap
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // card width + gap
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="testimonials" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden">
      <BackgroundAnimations />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader />

        <FeaturedTestimonial testimonial={testimonialsData[activeTestimonial]} />

        {/* Testimonials Container with Navigation */}
        <div className="relative">
          {/* Scrollable Testimonials Grid */}
          <div className="relative">
            <motion.div
              ref={scrollContainerRef}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory px-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {testimonialsData.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <TestimonialCard
                    {...testimonial}
                    isActive={activeTestimonial === index}
                    onClick={() => setActiveTestimonial(index)}
                  />
                </div>
              ))}
            </motion.div>

            {/* Centered Navigation Arrows */}
            <NavigationControls
              onScrollLeft={scrollLeft}
              onScrollRight={scrollRight}
              testimonials={testimonialsData}
              activeTestimonial={activeTestimonial}
              onSetActive={setActiveTestimonial}
            />
          </div>
        </div>
      </div>

      {/* CSS for scrollbar hiding and smooth scrolling */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Enhanced responsive breakpoints */
        @media (min-width: 768px) {
          .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            overflow: visible;
          }
          .testimonials-grid > div {
            width: auto;
          }
        }
        
        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
