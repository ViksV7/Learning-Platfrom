import React, { useState } from 'react'
import type { Course } from '@/types/dashboard'

interface BrowseCoursesProps {
  onNavigate?: (path: string) => void
}

export const BrowseCourses: React.FC<BrowseCoursesProps> = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const availableCourses: Course[] = [
    {
      id: '1',
      title: 'AI + Blockchain Bootcamp',
      description: 'Comprehensive course covering AI and Blockchain technologies with hands-on projects and real-world applications',
      status: 'Active',
      instructor: 'Dr. Sarah Johnson',
      students: 245,
      duration: '12 weeks',
      price: '299',
      category: 'blockchain',
      level: 'intermediate',
      progress: 0
    },
    {
      id: '2',
      title: 'Web3 Development Fundamentals',
      description: 'Learn the basics of Web3 development including smart contracts, DApps, and decentralized systems',
      status: 'Active',
      instructor: 'Michael Chen',
      students: 189,
      duration: '8 weeks',
      price: '199',
      category: 'web3',
      level: 'beginner',
      progress: 0
    },
    {
      id: '3',
      title: 'Advanced Smart Contract Security',
      description: 'Deep dive into smart contract security best practices and vulnerability assessment techniques',
      status: 'Active',
      instructor: 'Alex Rodriguez',
      students: 156,
      duration: '6 weeks',
      price: '399',
      category: 'security',
      level: 'advanced',
      progress: 0
    },
    {
      id: '4',
      title: 'DeFi Protocol Development',
      description: 'Build decentralized finance protocols from scratch using cutting-edge technologies',
      status: 'Active',
      instructor: 'Emma Thompson',
      students: 98,
      duration: '10 weeks',
      price: '499',
      category: 'defi',
      level: 'advanced',
      progress: 0
    },
    {
      id: '5',
      title: 'NFT Marketplace Creation',
      description: 'Create your own NFT marketplace with modern web technologies and blockchain integration',
      status: 'Active',
      instructor: 'David Kim',
      students: 234,
      duration: '8 weeks',
      price: '249',
      category: 'nft',
      level: 'intermediate',
      progress: 0
    },
    {
      id: '6',
      title: 'Cryptocurrency Trading Strategies',
      description: 'Learn professional trading strategies and risk management in cryptocurrency markets',
      status: 'Active',
      instructor: 'Lisa Wang',
      students: 312,
      duration: '4 weeks',
      price: '149',
      category: 'trading',
      level: 'beginner',
      progress: 0
    }
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'web3', label: 'Web3' },
    { value: 'security', label: 'Security' },
    { value: 'defi', label: 'DeFi' },
    { value: 'nft', label: 'NFT' },
    { value: 'trading', label: 'Trading' }
  ]

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-600 text-green-100'
      case 'intermediate': return 'bg-yellow-600 text-yellow-100'
      case 'advanced': return 'bg-red-600 text-red-100'
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

  const handleEnroll = (courseId: string) => {
    alert(`Enrolled in course ${courseId}! This would integrate with your enrollment system.`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 text-white border border-[#0097A7] shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Browse Courses</h1>
        <p className="opacity-90">Discover new skills and advance your career with our expert-led courses</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-[#0097A7] hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden">
            {/* Course Header */}
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getCategoryIcon(course.category)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#0097A7]">${course.price}</span>
                  <p className="text-xs text-gray-400">one-time</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#0097A7] transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{course.description}</p>

              {/* Course Details */}
              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-2">👨‍🏫</span>
                    Instructor:
                  </span>
                  <span className="font-medium text-white">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-2">⏱️</span>
                    Duration:
                  </span>
                  <span className="font-medium text-white">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="mr-2">👥</span>
                    Students:
                  </span>
                  <span className="font-medium text-white">{course.students}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                <div className="flex text-yellow-400">
                  {'⭐'.repeat(5)}
                </div>
                <span className="text-sm text-gray-400">(4.8)</span>
              </div>
            </div>

            {/* Course Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={() => handleEnroll(course.id)}
                className="w-full bg-gradient-to-r from-[#0097A7] to-blue-600 text-white py-3 px-4 rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all font-medium group-hover:shadow-lg"
              >
                Enroll Now
              </button>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0097A7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-white mb-2">No courses found</h3>
          <p className="text-gray-400">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  )
}