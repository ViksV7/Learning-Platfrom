import React from 'react'
import type { Course } from '@/types/dashboard';

interface MyCoursesProps {
  onNavigate?: (path: string) => void
}

// Circular Progress Component
const CircularProgress: React.FC<{ progress: number; size?: number }> = ({ progress, size = 60 }) => {
  const radius = (size - 8) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-600"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-[#0097A7] transition-all duration-300"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-white">{progress}%</span>
      </div>
    </div>
  )
}

export const MyCourses: React.FC<MyCoursesProps> = () => {
  const enrolledCourses: Course[] = [
    {
      id: '1',
      title: 'AI + Blockchain Bootcamp',
      description: 'Comprehensive course covering AI and Blockchain technologies',
      status: 'In Progress',
      instructor: 'Dr. Sarah Johnson',
      students: 245,
      duration: '12 weeks',
      price: '299',
      category: 'blockchain',
      level: 'intermediate',
      progress: 75
    },
    {
      id: '2',
      title: 'Web3 Development Fundamentals',
      description: 'Learn the basics of Web3 development',
      status: 'In Progress',
      instructor: 'Michael Chen',
      students: 189,
      duration: '8 weeks',
      price: '199',
      category: 'web3',
      level: 'beginner',
      progress: 60
    },
    {
      id: '3',
      title: 'Smart Contract Security',
      description: 'Advanced security practices for smart contracts',
      status: 'Completed',
      instructor: 'Alex Rodriguez',
      students: 156,
      duration: '6 weeks',
      price: '399',
      category: 'security',
      level: 'advanced',
      progress: 100
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-600 text-blue-100'
      case 'Completed': return 'bg-green-600 text-green-100'
      case 'Not Started': return 'bg-gray-600 text-gray-100'
      default: return 'bg-gray-600 text-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'blockchain': return '⛓️'
      case 'web3': return '🌐'
      case 'security': return '🔒'
      case 'defi': return '💰'
      case 'nft': return '🎨'
      case 'trading': return '📈'
      default: return '📚'
    }
  }

  const handleContinue = (courseId: string) => {
    alert(`Continuing course ${courseId}! This would navigate to the course content.`)
  }

  const handleViewCertificate = (courseId: string) => {
    alert(`Viewing certificate for course ${courseId}! This would show the certificate.`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 text-white border border-[#0097A7] shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">My Courses</h1>
        <p className="opacity-90">Track your learning progress and continue your journey</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
        <h3 className="text-lg font-semibold text-white mb-6">Learning Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <CircularProgress progress={75} size={80} />
            <div className="mt-3">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-gray-400">Enrolled Courses</div>
            </div>
          </div>
          <div className="text-center">
            <CircularProgress progress={33} size={80} />
            <div className="mt-3">
              <div className="text-2xl font-bold text-green-400">1</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>
          </div>
          <div className="text-center">
            <CircularProgress progress={78} size={80} />
            <div className="mt-3">
              <div className="text-2xl font-bold text-orange-400">78%</div>
              <div className="text-sm text-gray-400">Average Progress</div>
            </div>
          </div>
          <div className="text-center">
            <CircularProgress progress={124} size={80} />
            <div className="mt-3">
              <div className="text-2xl font-bold text-purple-400">124</div>
              <div className="text-sm text-gray-400">Study Hours</div>
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {enrolledCourses.map(course => (
          <div key={course.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 group">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{getCategoryIcon(course.category)}</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#0097A7] transition-colors">{course.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                  <div>
                    <span className="font-medium text-gray-300">Instructor:</span>
                    <div className="text-white">{course.instructor}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-300">Duration:</span>
                    <div className="text-white">{course.duration}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-300">Level:</span>
                    <div className="text-white capitalize">{course.level}</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-300">Progress:</span>
                    <div className="text-white">{course.progress}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Course Progress</span>
                    <span className="font-medium text-white">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#0097A7] to-blue-600 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 lg:ml-6">
                <CircularProgress progress={course.progress || 0} size={60} />
                <div className="flex flex-col space-y-2">
                  {course.status === 'Completed' ? (
                    <button
                      onClick={() => handleViewCertificate(course.id)}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium"
                    >
                      View Certificate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleContinue(course.id)}
                      className="px-4 py-2 bg-gradient-to-r from-[#0097A7] to-blue-600 text-white rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all font-medium"
                    >
                      Continue Learning
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {enrolledCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-white mb-2">No courses enrolled yet</h3>
          <p className="text-gray-400 mb-4">Start your learning journey by browsing our available courses</p>
          <button className="bg-gradient-to-r from-[#0097A7] to-blue-600 text-white px-6 py-2 rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  )
}