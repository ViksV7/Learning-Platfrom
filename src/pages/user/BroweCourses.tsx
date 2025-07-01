"use client"

import React from "react"
import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"

interface BrowseCoursesProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

const availableCourses = [
  {
    id: "1",
    title: "Advanced React & Next.js Masterclass",
    instructor: "Priya Sharma",
    rating: 4.9,
    students: 1247,
    duration: "16 weeks",
    price: "₹25,000",
    originalPrice: "₹35,000",
    level: "Advanced",
    category: "Web Development",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Master modern React patterns, Next.js 14, and build production-ready applications",
    skills: ["React 18", "Next.js 14", "TypeScript", "Tailwind CSS", "Server Components"],
    isEnrolled: false,
    isBestseller: true,
  },
  {
    id: "2",
    title: "Complete Blockchain Development Bootcamp",
    instructor: "Rahul Kumar",
    rating: 4.8,
    students: 892,
    duration: "12 weeks",
    price: "₹30,000",
    originalPrice: "₹40,000",
    level: "Intermediate",
    category: "Blockchain",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Learn Solidity, smart contracts, DeFi protocols, and Web3 development",
    skills: ["Solidity", "Web3.js", "Smart Contracts", "DeFi", "Ethereum"],
    isEnrolled: true,
    isBestseller: false,
  },
  {
    id: "3",
    title: "AI & Machine Learning with Python",
    instructor: "Ankit Singh",
    rating: 4.9,
    students: 1456,
    duration: "14 weeks",
    price: "₹35,000",
    originalPrice: "₹45,000",
    level: "Advanced",
    category: "Artificial Intelligence",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Build ML models, deep learning networks, and deploy AI applications",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision"],
    isEnrolled: false,
    isBestseller: true,
  },
  {
    id: "4",
    title: "DevOps & Cloud Computing Mastery",
    instructor: "Sneha Patel",
    rating: 4.7,
    students: 734,
    duration: "10 weeks",
    price: "₹28,000",
    originalPrice: "₹38,000",
    level: "Intermediate",
    category: "DevOps",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Master AWS, Docker, Kubernetes, and CI/CD pipelines",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    isEnrolled: false,
    isBestseller: false,
  },
  {
    id: "5",
    title: "Mobile App Development with React Native",
    instructor: "Vikram Gupta",
    rating: 4.6,
    students: 567,
    duration: "12 weeks",
    price: "₹22,000",
    originalPrice: "₹32,000",
    level: "Intermediate",
    category: "Mobile Development",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Build cross-platform mobile apps for iOS and Android",
    skills: ["React Native", "Expo", "Redux", "Firebase", "App Store"],
    isEnrolled: false,
    isBestseller: false,
  },
  {
    id: "6",
    title: "Cybersecurity & Ethical Hacking",
    instructor: "Ravi Sharma",
    rating: 4.8,
    students: 423,
    duration: "8 weeks",
    price: "₹32,000",
    originalPrice: "₹42,000",
    level: "Advanced",
    category: "Cybersecurity",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Learn penetration testing, network security, and ethical hacking",
    skills: ["Penetration Testing", "Network Security", "Kali Linux", "OWASP", "Security Auditing"],
    isEnrolled: false,
    isBestseller: false,
  },
]

export const BrowseCourses: React.FC<BrowseCoursesProps> = ({ config, onNavigate }) => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [selectedLevel, setSelectedLevel] = React.useState("All")
  const [priceRange, setPriceRange] = React.useState("All")

  const categories = ["All", ...Array.from(new Set(availableCourses.map((course) => course.category)))]
  const levels = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={config.user} navigation={config.navigation} title="User Dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">
              Browse Courses
            </h1>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <NotificationCenter />
              <button
                onClick={() => onNavigate("/profile")}
                className="flex items-center space-x-2 sm:space-x-3 hover:bg-gray-50 rounded-lg p-2"
              >
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{config.user.name}</span>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All Prices</option>
                    <option value="Free">Free</option>
                    <option value="Under 25k">Under ₹25,000</option>
                    <option value="25k-35k">₹25,000 - ₹35,000</option>
                    <option value="Above 35k">Above ₹35,000</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    {course.isBestseller && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                          Bestseller
                        </span>
                      </div>
                    )}
                    {course.isEnrolled && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
                          Enrolled
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          course.level === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : course.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>👨‍🏫 {course.instructor}</span>
                      <span>⭐ {course.rating}</span>
                      <span>👥 {course.students}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {course.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {course.skills.length > 3 && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            +{course.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                        <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                      </div>
                      <span className="text-sm text-gray-600">{course.duration}</span>
                    </div>

                    <div className="flex space-x-2">
                      {course.isEnrolled ? (
                        <button
                          onClick={() => onNavigate("/my-courses")}
                          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          Continue Learning
                        </button>
                      ) : (
                        <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          Enroll Now
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
