// import React from 'react';
// import { motion } from 'framer-motion';

import CourseHero from './CourseHero';
import MainCourse from './MainCourse';
import ComingSoonCourses from './ComingSoonCourses';
import WhoShouldJoin from './WhoShouldJoin';
import Outcomes from './Outcomes';

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-slate-900 text-white overflow-hidden">
      <div className="relative">
        {/* Enhanced background glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-950 to-black opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#0097A7]/5 to-purple-500/5 rounded-full blur-3xl opacity-30" />

        <div className="relative z-10">
          <CourseHero />
          <MainCourse />
          <ComingSoonCourses />
          <WhoShouldJoin />
          <Outcomes />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;