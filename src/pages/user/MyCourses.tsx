"use client"

import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import React from "react"

interface MyCoursesProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

const enrolledCourses = [
  {
    id: "1",
    title: "Full Stack Web Development with MERN",
    instructor: "Priya Sharma",
    progress: 78,
    totalLessons: 45,
    completedLessons: 35,
    nextLesson: "Advanced React Hooks",
    estimatedCompletion: "2 weeks",
    lastAccessed: "2 hours ago",
    certificate: false,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Blockchain & Cryptocurrency Development",
    instructor: "Rahul Kumar",
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    nextLesson: "Smart Contract Security",
    estimatedCompletion: "4 weeks",
    lastAccessed: "1 day ago",
    certificate: false,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "AI/ML with Python & TensorFlow",
    instructor: "Ankit Singh",
    progress: 100,
    totalLessons: 38,
    completedLessons: 38,
    nextLesson: "Course Completed",
    estimatedCompletion: "Completed",
    lastAccessed: "3 days ago",
    certificate: true,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "DevOps & Cloud Computing (AWS)",
    instructor: "Sneha Patel",
    progress: 25,
    totalLessons: 28,
    completedLessons: 7,
    nextLesson: "Docker Fundamentals",
    estimatedCompletion: "6 weeks",
    lastAccessed: "5 days ago",
    certificate: false,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export const MyCourses: React.FC<MyCoursesProps> = ({ config, onNavigate }) => {
  const [filterStatus, setFilterStatus] = React.useState("All")

  const filteredCourses = enrolledCourses.filter((course) => {
    if (filterStatus === "All") return true
    if (filterStatus === "In Progress") return course.progress > 0 && course.progress < 100
    if (filterStatus === "Completed") return course.progress === 100
    if (filterStatus === "Not Started") return course.progress === 0
    return true
  })

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    if (progress >= 25) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={config.user} navigation={config.navigation} title="User Dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">My Courses</h1>
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {enrolledCourses.filter((c) => c.progress === 100).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Certificates</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {enrolledCourses.filter((c) => c.certificate).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {["All", "In Progress", "Completed", "Not Started"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === status
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button
                onClick={() => onNavigate("/browse")}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Browse More Courses
              </button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex space-x-4">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{course.title}</h3>
                        {course.certificate && (
                          <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                            🏆 Certified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">👨‍🏫 {course.instructor}</p>

                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>
                              Progress: {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Next: {course.nextLesson}</span>
                          <span>Last accessed: {course.lastAccessed}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Est. completion: {course.estimatedCompletion}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-3">
                    {course.progress === 100 ? (
                      <>
                        <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                          ✓ Completed
                        </button>
                        {course.certificate && (
                          <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                            Download Certificate
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          Continue Learning
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          View Details
                        </button>
                      </>
                    )}
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
