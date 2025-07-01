"use client"

import type React from "react"
import { useState } from "react"
import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import { CreateCourseModal } from "./CreateCourseModel"
import { useNotifications } from "../../contexts/NotificationContext"

interface CourseManagementProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

const courses = [
  {
    id: "1",
    title: "Full Stack Web Development with MERN",
    instructor: "Priya Sharma",
    students: 485,
    status: "Active",
    duration: "16 weeks",
    startDate: "2024-01-15",
    progress: 65,
    price: "₹25,000",
    category: "Web Development",
    level: "Intermediate",
    rating: 4.8,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Blockchain & Cryptocurrency Development",
    instructor: "Rahul Kumar",
    students: 324,
    status: "Active",
    duration: "12 weeks",
    startDate: "2024-02-01",
    progress: 40,
    price: "₹30,000",
    category: "Blockchain",
    level: "Advanced",
    rating: 4.9,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "AI/ML with Python & TensorFlow",
    instructor: "Ankit Singh",
    students: 567,
    status: "Active",
    duration: "14 weeks",
    startDate: "2024-01-20",
    progress: 80,
    price: "₹35,000",
    category: "Artificial Intelligence",
    level: "Advanced",
    rating: 4.7,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    title: "DevOps & Cloud Computing (AWS)",
    instructor: "Sneha Patel",
    students: 298,
    status: "Active",
    duration: "10 weeks",
    startDate: "2024-03-01",
    progress: 25,
    price: "₹28,000",
    category: "DevOps",
    level: "Intermediate",
    rating: 4.6,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    title: "Mobile App Development with React Native",
    instructor: "Vikram Gupta",
    students: 156,
    status: "Draft",
    duration: "12 weeks",
    startDate: "2024-04-15",
    progress: 0,
    price: "₹22,000",
    category: "Mobile Development",
    level: "Intermediate",
    rating: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    title: "Cybersecurity & Ethical Hacking",
    instructor: "Ravi Sharma",
    students: 89,
    status: "Draft",
    duration: "8 weeks",
    startDate: "2024-05-01",
    progress: 0,
    price: "₹32,000",
    category: "Cybersecurity",
    level: "Advanced",
    rating: 0,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export const CourseManagement: React.FC<CourseManagementProps> = ({ config, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const { addNotification } = useNotifications()

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || course.status === statusFilter
    const matchesCategory = categoryFilter === "All" || course.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))]

  const handleCreateCourse = (courseData: any) => {
    console.log("Creating course:", courseData)
    addNotification({
      type: "success",
      title: "Course Created",
      message: `Course "${courseData.title}" has been created successfully.`,
      category: "course",
    })
    setShowCreateModal(false)
  }

  const handlePublishCourse = (courseId: string) => {
    addNotification({
      type: "success",
      title: "Course Published",
      message: "Course has been published and is now available to students.",
      category: "course",
    })
  }

  const handleDeleteCourse = (courseId: string, courseTitle: string) => {
    if (confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
      addNotification({
        type: "warning",
        title: "Course Deleted",
        message: `Course "${courseTitle}" has been deleted.`,
        category: "course",
      })
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={config.user} navigation={config.navigation} title="Admin Dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">
              Course Management
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
            {/* Actions Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Completed">Completed</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Import Courses
                </button>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + Create New Course
                </button>
              </div>
            </div>

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
                    <p className="text-sm font-medium text-gray-600">Total Courses</p>
                    <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
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
                    <p className="text-sm font-medium text-gray-600">Active Courses</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {courses.filter((c) => c.status === "Active").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {courses.reduce((sum, course) => sum + course.students, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹45.2L</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="relative">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          course.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {course.instructor}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        {course.students} students
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {course.duration}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">{course.price}</span>
                        {course.rating > 0 && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-gray-600">{course.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {course.status === "Active" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        Edit
                      </button>
                      {course.status === "Draft" && (
                        <button
                          onClick={() => handlePublishCourse(course.id)}
                          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                        >
                          Publish
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteCourse(course.id, course.title)}
                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Create Course Modal */}
      {showCreateModal && <CreateCourseModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreateCourse} />}
    </div>
  )
}
