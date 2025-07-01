"use client"

import type React from "react"
import { useState } from "react"
import { getUserDashboardConfig } from "../config/dashboard"
import type { DashboardConfig, User, Notification } from "../types/dashboard"
import Dashboard from "./Dashboard"
import { Sidebar } from "./Sidebar"
import { NotificationCenter } from "./NotificationCenter"
import { BrowseCourses } from "@/pages/BrowseCourses"
import { MyCourses } from "@/pages/MyCourses"
import { LiveSessions } from "@/pages/LiveSessions"
import { Assignments } from "@/pages/Assignments"
import { CourseManagement } from "@/pages/CourseManagement"
import { PaymentPlans } from "@/pages/PaymentPlans"

interface RouterProps {
  user: User
}

export const Router: React.FC<RouterProps> = ({ user }) => {
  const [currentPath, setCurrentPath] = useState("/")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome to the Platform',
      message: 'Get started with your learning journey',
      type: 'info',
      timestamp: new Date().toLocaleString(),
      read: false,
      role: user.role
    }
  ])
  
  const dashboardConfig: DashboardConfig = getUserDashboardConfig(user)

  const handleNavigate = (path: string) => {
    setCurrentPath(path)
    // Update active state
    dashboardConfig.navigation.forEach((item) => {
      item.isActive = item.path === path
    })
  }

  const handleAddNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev])
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const handleClearAllNotifications = () => {
    setNotifications([])
  }

  const userNotifications = notifications.filter(n => 
    n.role === user.role || n.role === 'all'
  )

  const defaultDashboardProps = {
    user,
    courses: [],
    liveSessions: [],
    announcements: [],
    overallProgress: 85,
    stats: {
      totalStudents: 1250,
      activeCourses: 24,
      studentQueries: 12,
      supportTickets: 5,
    },
    studentQueries: [],
    onNotificationAdd: handleAddNotification
  }

  // Export data function for student management
  const handleExportStudentData = () => {
    const studentData = [
      ['Student Name', 'Email', 'Courses', 'Progress', 'Status', 'Join Date'],
      ['John Doe', 'john@example.com', '3', '75%', 'Active', '2024-01-15'],
      ['Jane Smith', 'jane@example.com', '2', '60%', 'Active', '2024-01-20'],
      ['Mike Johnson', 'mike@example.com', '4', '90%', 'Active', '2024-01-10'],
      ['Sarah Wilson', 'sarah@example.com', '1', '45%', 'Active', '2024-02-01'],
      ['David Brown', 'david@example.com', '5', '85%', 'Active', '2024-01-25']
    ]

    const csvContent = studentData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'student_data.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const renderPage = () => {
    switch (currentPath) {
      case "/":
        return <Dashboard {...defaultDashboardProps} />
      
      // Student Pages
      case "/my-courses":
        return <MyCourses onNavigate={handleNavigate} />
      case "/browse":
        return <BrowseCourses onNavigate={handleNavigate} />
      case "/sessions":
        return <LiveSessions onNavigate={handleNavigate} />
      case "/assignments":
        return <Assignments onNavigate={handleNavigate} />
      case "/forums":
        return (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
            <h2 className="text-2xl font-bold text-white mb-4">Discussion Forums</h2>
            <div className="space-y-4">
              <div className="border border-gray-600 rounded-lg p-4 bg-gray-700 hover:bg-gray-600 transition-colors">
                <h3 className="font-semibold text-white">General Discussion</h3>
                <p className="text-gray-400 text-sm">Ask questions and share knowledge with fellow students</p>
                <div className="mt-2 text-xs text-gray-500">245 posts • 89 members</div>
              </div>
              <div className="border border-gray-600 rounded-lg p-4 bg-gray-700 hover:bg-gray-600 transition-colors">
                <h3 className="font-semibold text-white">Course Help</h3>
                <p className="text-gray-400 text-sm">Get help with specific course content and assignments</p>
                <div className="mt-2 text-xs text-gray-500">156 posts • 67 members</div>
              </div>
            </div>
          </div>
        )
      case "/support":
        return (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
            <h2 className="text-2xl font-bold text-white mb-4">Support</h2>
            <div className="space-y-4">
              <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                <h3 className="font-semibold text-white">Contact Support</h3>
                <p className="text-gray-400 text-sm mb-3">Need help? Our support team is here for you.</p>
                <button className="bg-gradient-to-r from-[#0097A7] to-blue-600 text-white px-4 py-2 rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all">
                  Start Chat
                </button>
              </div>
              <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
                <h3 className="font-semibold text-white">FAQ</h3>
                <p className="text-gray-400 text-sm">Find answers to commonly asked questions</p>
              </div>
            </div>
          </div>
        )
      case "/payments":
        return <PaymentPlans onNavigate={handleNavigate} />

      // Admin Pages
      case "/courses":
        return <CourseManagement onNavigate={handleNavigate} />
      case "/students":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Student Management</h1>
                <p className="text-gray-400">Manage student accounts and track progress</p>
              </div>
              <button
                onClick={handleExportStudentData}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center space-x-2"
              >
                <span>📊</span>
                <span>Export Data</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-[#0097A7] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Courses</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {[
                      { name: "John Doe", email: "john@example.com", courses: 3, progress: 75 },
                      { name: "Jane Smith", email: "jane@example.com", courses: 2, progress: 60 },
                      { name: "Mike Johnson", email: "mike@example.com", courses: 4, progress: 90 },
                      { name: "Sarah Wilson", email: "sarah@example.com", courses: 1, progress: 45 },
                      { name: "David Brown", email: "david@example.com", courses: 5, progress: 85 },
                    ].map((student, index) => (
                      <tr key={index} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-[#0097A7] to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                              {student.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{student.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{student.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{student.courses}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-600 rounded-full h-2 mr-2">
                              <div className="bg-gradient-to-r from-[#0097A7] to-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${student.progress}%` }}></div>
                            </div>
                            <span className="text-sm text-gray-300">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-600 text-green-100">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case "/mentors":
        return (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
            <h2 className="text-2xl font-bold text-white mb-4">Mentor/Instructor Panel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Dr. Sarah Johnson", courses: 3, students: 245, rating: 4.9 },
                { name: "Michael Chen", courses: 2, students: 189, rating: 4.8 },
                { name: "Alex Rodriguez", courses: 1, students: 156, rating: 4.7 },
              ].map((mentor, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-6 bg-gray-700 hover:bg-gray-600 transition-colors">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#0097A7] to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {mentor.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <h3 className="font-semibold text-white">{mentor.name}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>Courses:</span>
                      <span className="font-medium text-white">{mentor.courses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span className="font-medium text-white">{mentor.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="font-medium text-white">⭐ {mentor.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "/schedule":
        return (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
            <h2 className="text-2xl font-bold text-white mb-4">Live Class Schedule</h2>
            <div className="space-y-4">
              {[
                { title: "Blockchain Basics", instructor: "Dr. Sarah Johnson", date: "2024-04-25", time: "10:00 AM", meetLink: "https://meet.google.com/abc-defg-hij" },
                { title: "Smart Contract Development", instructor: "Michael Chen", date: "2024-04-26", time: "2:00 PM", meetLink: "https://meet.google.com/xyz-uvwx-yzab" },
                { title: "DeFi Protocol Deep Dive", instructor: "Alex Rodriguez", date: "2024-04-28", time: "4:00 PM", meetLink: "https://meet.google.com/def-ghij-klmn" },
              ].map((session, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-700 hover:bg-gray-600 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{session.title}</h3>
                      <p className="text-sm text-gray-400">Instructor: {session.instructor}</p>
                      <p className="text-sm text-gray-400">{session.date} at {session.time}</p>
                      <a href={session.meetLink} target="_blank" rel="noopener noreferrer" className="text-[#0097A7] hover:text-blue-400 text-sm">
                        📹 Join Meeting
                      </a>
                    </div>
                    <span className="px-2 py-1 bg-green-600 text-green-100 text-xs rounded-full">Upcoming</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "/certificates":
        return (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
            <h2 className="text-2xl font-bold text-white mb-4">Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { course: "AI + Blockchain Bootcamp", issued: 45, pending: 12 },
                { course: "Web3 Development", issued: 32, pending: 8 },
                { course: "Smart Contract Security", issued: 28, pending: 5 },
              ].map((cert, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-6 text-center bg-gray-700 hover:bg-gray-600 transition-colors">
                  <div className="text-4xl mb-3">🏆</div>
                  <h3 className="font-semibold text-white mb-2">{cert.course}</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div>Issued: <span className="font-medium text-green-400">{cert.issued}</span></div>
                    <div>Pending: <span className="font-medium text-yellow-400">{cert.pending}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "/internship":
        return (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
            <h2 className="text-2xl font-bold text-white mb-4">Internship Tracker</h2>
            <div className="space-y-4">
              {[
                { student: "John Doe", company: "TechCorp", position: "Blockchain Developer", status: "Active" },
                { student: "Jane Smith", company: "CryptoStart", position: "Smart Contract Auditor", status: "Completed" },
                { student: "Mike Johnson", company: "DeFi Labs", position: "Web3 Developer", status: "Active" },
              ].map((internship, index) => (
                <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-700 hover:bg-gray-600 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{internship.student}</h3>
                      <p className="text-sm text-gray-400">{internship.position} at {internship.company}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      internship.status === 'Active' ? 'bg-green-600 text-green-100' : 'bg-blue-600 text-blue-100'
                    }`}>
                      {internship.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "/profile":
        return (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
            <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Name</label>
                <p className="mt-1 text-sm text-white">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email</label>
                <p className="mt-1 text-sm text-white">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Role</label>
                <p className="mt-1 text-sm text-white capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )
      case "/settings":
        return (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7]">
            <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Notifications</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-[#0097A7] focus:ring-[#0097A7]" defaultChecked />
                    <span className="ml-2 text-sm text-gray-300">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-[#0097A7] focus:ring-[#0097A7]" defaultChecked />
                    <span className="ml-2 text-sm text-gray-300">Course updates</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Privacy</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-[#0097A7] focus:ring-[#0097A7]" />
                    <span className="ml-2 text-sm text-gray-300">Make profile public</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-[#0097A7] focus:ring-[#0097A7]" defaultChecked />
                    <span className="ml-2 text-sm text-gray-300">Show progress to instructors</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return <Dashboard {...defaultDashboardProps} />
    }
  }

  const title = user.role === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Sidebar
        user={user}
        navigation={dashboardConfig.navigation}
        title={title}
        onNavigate={handleNavigate}
      />
      <main className="flex-1 lg:ml-72">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-[#0097A7] p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">
            {currentPath === "/" ? "Dashboard" : 
             currentPath === "/courses" ? "Course Management" :
             currentPath === "/students" ? "Student Management" :
             currentPath === "/my-courses" ? "My Courses" :
             currentPath === "/browse" ? "Browse Courses" :
             currentPath === "/sessions" ? "Live Sessions" :
             currentPath === "/assignments" ? "Assignments" :
             currentPath === "/forums" ? "Discussion Forums" :
             currentPath === "/support" ? "Support" :
             currentPath === "/mentors" ? "Mentor Panel" :
             currentPath === "/schedule" ? "Live Schedule" :
             currentPath === "/certificates" ? "Certificates" :
             currentPath === "/internship" ? "Internship Tracker" :
             currentPath === "/payments" ? "Payment Plans" :
             currentPath === "/profile" ? "Profile" :
             currentPath === "/settings" ? "Settings" : "Dashboard"}
          </h1>
          <NotificationCenter
            notifications={userNotifications}
            onMarkAsRead={handleMarkAsRead}
            onClearAll={handleClearAllNotifications}
          />
        </div>
        
        <div className="p-6 overflow-y-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}