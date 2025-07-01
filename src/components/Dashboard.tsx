import React, { useState } from 'react'
import type { User, Course, LiveSession, Notification } from '../types/dashboard'
import { AddCourseModal } from '@/modals/AddCourseModal'
import { ScheduleClassModal } from '@/modals/ScheduleClassModal'
import { AddPlanModal } from '@/modals/AddPlanModal'
import { AddCertificateModal } from '@/modals/AddCertificateModal'

interface DashboardProps {
  user: User
  courses: Course[]
  liveSessions: LiveSession[]
  announcements: any[]
  overallProgress: number
  stats: {
    totalStudents: number
    activeCourses: number
    studentQueries: number
    supportTickets: number
  }
  studentQueries: any[]
  onNotificationAdd?: (notification: Notification) => void
}

// Circular Progress Component
const CircularProgress: React.FC<{ progress: number; size?: number; label?: string }> = ({ 
  progress, 
  size = 120, 
  label 
}) => {
  const radius = (size - 8) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size + 30 }}>
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
          strokeWidth="6"
          fill="transparent"
          className="text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-[#0097A7] transition-all duration-1000 ease-out"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-2xl font-bold text-white">{progress}%</span>
          {label && <div className="text-xs text-gray-400 mt-1">{label}</div>}
        </div>
      </div>
    </div>
  )
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNotificationAdd }) => {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)
  const [showScheduleClassModal, setShowScheduleClassModal] = useState(false)
  const [showAddPlanModal, setShowAddPlanModal] = useState(false)
  const [showAddCertificateModal, setShowAddCertificateModal] = useState(false)

  const isAdmin = user.role === 'admin'

  const handleAddCourse = (courseData: Omit<Course, 'id' | 'students'>) => {
    console.log('Adding course:', courseData)
    if (onNotificationAdd) {
      onNotificationAdd({
        id: Date.now().toString(),
        title: 'New Course Available',
        message: `New course "${courseData.title}" has been added to the catalog`,
        type: 'info',
        timestamp: new Date().toLocaleString(),
        read: false,
        role: 'user'
      })
    }
  }

  const handleScheduleClass = (classData: Omit<LiveSession, 'id' | 'enrolled'>) => {
    console.log('Scheduling class:', classData)
    if (onNotificationAdd) {
      onNotificationAdd({
        id: Date.now().toString(),
        title: 'New Live Class Scheduled',
        message: `Live class "${classData.title}" scheduled for ${classData.date} at ${classData.time}`,
        type: 'info',
        timestamp: new Date().toLocaleString(),
        read: false,
        role: 'user'
      })
    }
  }

  const handleAddPlan = (planData: any) => {
    console.log('Adding plan:', planData)
    if (onNotificationAdd) {
      onNotificationAdd({
        id: Date.now().toString(),
        title: 'New Payment Plan Available',
        message: `New payment plan "${planData.name}" is now available`,
        type: 'success',
        timestamp: new Date().toLocaleString(),
        read: false,
        role: 'user'
      })
    }
  }

  const handleAddCertificate = (certificateData: any) => {
    console.log('Adding certificate:', certificateData)
    if (onNotificationAdd) {
      onNotificationAdd({
        id: Date.now().toString(),
        title: 'New Certificate Template',
        message: `New certificate template "${certificateData.name}" has been uploaded`,
        type: 'success',
        timestamp: new Date().toLocaleString(),
        read: false,
        role: 'user'
      })
    }
  }

  if (isAdmin) {
    return (
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 text-white border border-[#0097A7] shadow-2xl">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="opacity-90">Here's what's happening with your platform today.</p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#0097A7]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white opacity-80">Total Students</p>
                <p className="text-3xl font-bold text-white mt-2">1,250</p>
              </div>
              <div className="text-4xl opacity-80">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#0097A7]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white opacity-80">Active Courses</p>
                <p className="text-3xl font-bold text-white mt-2">24</p>
              </div>
              <div className="text-4xl opacity-80">📚</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#0097A7]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white opacity-80">Live Sessions</p>
                <p className="text-3xl font-bold text-white mt-2">8</p>
              </div>
              <div className="text-4xl opacity-80">🎥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#0097A7]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white opacity-80">Revenue</p>
                <p className="text-3xl font-bold text-white mt-2">$125K</p>
              </div>
              <div className="text-4xl opacity-80">💰</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button
            onClick={() => setShowAddCourseModal(true)}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0097A7] to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">➕</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Add New Course</h3>
                <p className="text-gray-400 text-sm">Create and publish a new course</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowScheduleClassModal(true)}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Schedule Live Class</h3>
                <p className="text-gray-400 text-sm">Set up a new live session</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowAddPlanModal(true)}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">💳</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Add Payment Plan</h3>
                <p className="text-gray-400 text-sm">Create new pricing plan</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setShowAddCertificateModal(true)}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Upload Certificate</h3>
                <p className="text-gray-400 text-sm">Add certificate template</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-blue-100">👤</span>
              </div>
              <div>
                <p className="font-medium text-white">New student enrolled in AI + Blockchain Bootcamp</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-green-100">📚</span>
              </div>
              <div>
                <p className="font-medium text-white">Course "Web3 Development" updated</p>
                <p className="text-sm text-gray-400">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AddCourseModal
          isOpen={showAddCourseModal}
          onClose={() => setShowAddCourseModal(false)}
          onAddCourse={handleAddCourse}
        />
        <ScheduleClassModal
          isOpen={showScheduleClassModal}
          onClose={() => setShowScheduleClassModal(false)}
          onScheduleClass={handleScheduleClass}
        />
        <AddPlanModal
          isOpen={showAddPlanModal}
          onClose={() => setShowAddPlanModal(false)}
          onAddPlan={handleAddPlan}
        />
        <AddCertificateModal
          isOpen={showAddCertificateModal}
          onClose={() => setShowAddCertificateModal(false)}
          onAddCertificate={handleAddCertificate}
        />
      </div>
    )
  }

  // Student Dashboard with Progress Bars
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 text-white border border-[#0097A7] shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="opacity-90">Continue your learning journey today.</p>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#0097A7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white opacity-80">Enrolled Courses</p>
              <p className="text-3xl font-bold text-white mt-2">5</p>
            </div>
            <div className="text-4xl opacity-80">📚</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#0097A7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white opacity-80">Completed</p>
              <p className="text-3xl font-bold text-white mt-2">3</p>
            </div>
            <div className="text-4xl opacity-80">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#0097A7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white opacity-80">Certificates</p>
              <p className="text-3xl font-bold text-white mt-2">2</p>
            </div>
            <div className="text-4xl opacity-80">🏆</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#0097A7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white opacity-80">Study Hours</p>
              <p className="text-3xl font-bold text-white mt-2">124</p>
            </div>
            <div className="text-4xl opacity-80">⏰</div>
          </div>
        </div>
      </div>

      {/* Progress Overview with Circular Progress Bars */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
        <h3 className="text-lg font-semibold text-white mb-6">Learning Progress Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <CircularProgress progress={85} size={100} label="Overall" />
            <div className="mt-3">
              <div className="text-lg font-bold text-white">Overall Progress</div>
              <div className="text-sm text-gray-400">All courses combined</div>
            </div>
          </div>
          
          <div className="text-center">
            <CircularProgress progress={75} size={100} label="Current" />
            <div className="mt-3">
              <div className="text-lg font-bold text-white">Current Course</div>
              <div className="text-sm text-gray-400">AI + Blockchain</div>
            </div>
          </div>
          
          <div className="text-center">
            <CircularProgress progress={60} size={100} label="Weekly" />
            <div className="mt-3">
              <div className="text-lg font-bold text-white">Weekly Goal</div>
              <div className="text-sm text-gray-400">12 hours target</div>
            </div>
          </div>
          
          <div className="text-center">
            <CircularProgress progress={92} size={100} label="Assignments" />
            <div className="mt-3">
              <div className="text-lg font-bold text-white">Assignments</div>
              <div className="text-sm text-gray-400">Completion rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎥</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Live Sessions</h3>
              <p className="text-gray-400 text-sm">Join upcoming classes</p>
              <p className="text-[#0097A7] text-sm font-medium">3 sessions today</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Assignments</h3>
              <p className="text-gray-400 text-sm">Pending submissions</p>
              <p className="text-yellow-400 text-sm font-medium">2 due this week</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">💳</span>
            </div>
            <div>
              <h3 className="font-semibold text-white">Payment Plans</h3>
              <p className="text-gray-400 text-sm">Manage subscriptions</p>
              <p className="text-green-400 text-sm font-medium">Premium active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
        <h3 className="text-lg font-semibold text-white mb-4">Continue Learning</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-700">
            <h4 className="font-medium text-white">AI + Blockchain Bootcamp</h4>
            <p className="text-sm text-gray-400 mt-1">Progress: 75%</p>
            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="border border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-700">
            <h4 className="font-medium text-white">Web3 Development</h4>
            <p className="text-sm text-gray-400 mt-1">Progress: 60%</p>
            <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard