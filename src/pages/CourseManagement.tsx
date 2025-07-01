import React, { useState } from 'react'
import type { Course } from '../../types/dashboard'
import { AddCourseModal } from '../modals/AddCourseModal'

interface CourseManagementProps {
  onNavigate?: (path: string) => void
}

export const CourseManagement: React.FC<CourseManagementProps> = () => {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'AI + Blockchain Bootcamp',
      description: 'Comprehensive course covering AI and Blockchain technologies',
      status: 'Active',
      instructor: 'Dr. Sarah Johnson',
      students: 245,
      duration: '12 weeks',
      price: '299',
      category: 'blockchain',
      level: 'intermediate'
    },
    {
      id: '2',
      title: 'Web3 Development Fundamentals',
      description: 'Learn the basics of Web3 development',
      status: 'Active',
      instructor: 'Michael Chen',
      students: 189,
      duration: '8 weeks',
      price: '199',
      category: 'web3',
      level: 'beginner'
    },
    {
      id: '3',
      title: 'Smart Contract Security',
      description: 'Advanced security practices for smart contracts',
      status: 'Draft',
      instructor: 'Alex Rodriguez',
      students: 0,
      duration: '6 weeks',
      price: '399',
      category: 'security',
      level: 'advanced'
    }
  ])

  const handleAddCourse = (courseData: Omit<Course, 'id' | 'students'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
      students: 0
    }
    setCourses(prev => [newCourse, ...prev])
  }

  const handleDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(course => course.id !== courseId))
  }

  const handleEditCourse = (courseId: string) => {
    alert(`Editing course ${courseId}! This would open the edit modal.`)
  }

  const handleExportData = () => {
    const csvContent = [
      ['Course Title', 'Instructor', 'Students', 'Status', 'Level', 'Price', 'Duration'],
      ...courses.map(course => [
        course.title,
        course.instructor,
        course.students.toString(),
        course.status,
        course.level,
        `$${course.price}`,
        course.duration
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'courses_data.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-600 text-green-100'
      case 'Draft': return 'bg-yellow-600 text-yellow-100'
      case 'Archived': return 'bg-gray-600 text-gray-100'
      default: return 'bg-gray-600 text-gray-100'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-blue-600 text-blue-100'
      case 'intermediate': return 'bg-purple-600 text-purple-100'
      case 'advanced': return 'bg-red-600 text-red-100'
      default: return 'bg-gray-600 text-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Course Management</h1>
          <p className="text-gray-400">Manage your courses, instructors, and content</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportData}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center space-x-2"
          >
            <span>📊</span>
            <span>Export Data</span>
          </button>
          <button
            onClick={() => setShowAddCourseModal(true)}
            className="bg-gradient-to-r from-[#0097A7] to-blue-600 text-white px-4 py-2 rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all flex items-center space-x-2"
          >
            <span>➕</span>
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Courses</p>
              <p className="text-2xl font-bold text-blue-400">{courses.length}</p>
            </div>
            <div className="text-3xl">📚</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Courses</p>
              <p className="text-2xl font-bold text-green-400">
                {courses.filter(c => c.status === 'Active').length}
              </p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Students</p>
              <p className="text-2xl font-bold text-purple-400">
                {courses.reduce((sum, course) => sum + course.students, 0)}
              </p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Draft Courses</p>
              <p className="text-2xl font-bold text-yellow-400">
                {courses.filter(c => c.status === 'Draft').length}
              </p>
            </div>
            <div className="text-3xl">📝</div>
          </div>
        </div>
      </div>

      {/* Course Table */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-[#0097A7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{course.title}</div>
                      <div className="text-sm text-gray-400 max-w-xs truncate">{course.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{course.instructor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{course.students}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">${course.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditCourse(course.id)}
                        className="text-blue-400 hover:text-blue-300 p-1 transition-colors"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-400 hover:text-red-300 p-1 transition-colors"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-white mb-2">No courses yet</h3>
          <p className="text-gray-400 mb-4">Create your first course to get started</p>
          <button
            onClick={() => setShowAddCourseModal(true)}
            className="bg-gradient-to-r from-[#0097A7] to-blue-600 text-white px-6 py-2 rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all"
          >
            Add New Course
          </button>
        </div>
      )}

      <AddCourseModal
        isOpen={showAddCourseModal}
        onClose={() => setShowAddCourseModal(false)}
        onAddCourse={handleAddCourse}
      />
    </div>
  )
}