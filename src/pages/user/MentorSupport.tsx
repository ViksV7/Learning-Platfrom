"use client"

import type React from "react"
import { useState } from "react"
import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import { useNotifications } from "../../contexts/NotificationContext"

interface MentorSupportProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

const mentors = [
  {
    id: "1",
    name: "Priya Sharma",
    expertise: "Full Stack Development",
    rating: 4.9,
    experience: "8 years",
    avatar: "/placeholder.svg?height=100&width=100",
    isOnline: true,
    responseTime: "Usually responds in 2 hours",
    courses: ["Full Stack Web Development", "React Advanced Patterns"],
    bio: "Senior Full Stack Developer with expertise in modern web technologies. Passionate about teaching and mentoring students.",
  },
  {
    id: "2",
    name: "Rahul Kumar",
    expertise: "Blockchain Development",
    rating: 4.8,
    experience: "6 years",
    avatar: "/placeholder.svg?height=100&width=100",
    isOnline: false,
    responseTime: "Usually responds in 4 hours",
    courses: ["Blockchain Development", "Smart Contract Security"],
    bio: "Blockchain expert with deep knowledge of cryptocurrency and DeFi protocols. Former tech lead at major fintech company.",
  },
  {
    id: "3",
    name: "Ankit Singh",
    expertise: "AI & Machine Learning",
    rating: 4.9,
    experience: "10 years",
    avatar: "/placeholder.svg?height=100&width=100",
    isOnline: true,
    responseTime: "Usually responds in 1 hour",
    courses: ["AI/ML with Python", "Deep Learning Fundamentals"],
    bio: "AI/ML researcher and practitioner with extensive experience in building production ML systems.",
  },
]

const supportTickets = [
  {
    id: "1",
    title: "Help with React useEffect hook",
    mentor: "Priya Sharma",
    status: "Open",
    priority: "Medium",
    created: "2 hours ago",
    lastReply: "1 hour ago",
    course: "Full Stack Web Development",
  },
  {
    id: "2",
    title: "Smart contract deployment issue",
    mentor: "Rahul Kumar",
    status: "In Progress",
    priority: "High",
    created: "1 day ago",
    lastReply: "4 hours ago",
    course: "Blockchain Development",
  },
  {
    id: "3",
    title: "Model accuracy improvement suggestions",
    mentor: "Ankit Singh",
    status: "Resolved",
    priority: "Low",
    created: "3 days ago",
    lastReply: "2 days ago",
    course: "AI/ML with Python",
  },
]

const upcomingSessions = [
  {
    id: "1",
    title: "1-on-1 Code Review Session",
    mentor: "Priya Sharma",
    date: "Tomorrow",
    time: "2:00 PM - 3:00 PM",
    type: "Code Review",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "2",
    title: "Career Guidance Session",
    mentor: "Ankit Singh",
    date: "Friday",
    time: "4:00 PM - 5:00 PM",
    type: "Career Guidance",
    meetingLink: "https://meet.google.com/xyz-uvwx-yz",
  },
]

export const MentorSupport: React.FC<MentorSupportProps> = ({ config, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"mentors" | "tickets" | "sessions">("mentors")
  const [showContactModal, setShowContactModal] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const { addNotification } = useNotifications()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleContactMentor = (mentor: any) => {
    setSelectedMentor(mentor)
    setShowContactModal(true)
  }

  const handleSendMessage = (messageData: any) => {
    addNotification({
      type: "success",
      title: "Message Sent",
      message: `Your message has been sent to ${selectedMentor.name}.`,
      category: "message",
    })
    setShowContactModal(false)
    setSelectedMentor(null)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={config.user} navigation={config.navigation} title="User Dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">
              Mentor Support
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Available Mentors</p>
                    <p className="text-2xl font-bold text-gray-900">{mentors.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Online Now</p>
                    <p className="text-2xl font-bold text-gray-900">{mentors.filter((m) => m.isOnline).length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {supportTickets.filter((t) => t.status !== "Resolved").length}
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
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming Sessions</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingSessions.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "mentors", label: "Available Mentors", icon: "👨‍🏫" },
                    { id: "tickets", label: "Support Tickets", icon: "🎫" },
                    { id: "sessions", label: "Upcoming Sessions", icon: "📅" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Mentors Tab */}
                {activeTab === "mentors" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {mentors.map((mentor) => (
                        <div key={mentor.id} className="border border-gray-200 rounded-xl p-6">
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="relative">
                              <img
                                src={mentor.avatar || "/placeholder.svg"}
                                alt={mentor.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              {mentor.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                              <p className="text-sm text-gray-600">{mentor.expertise}</p>
                              <div className="flex items-center mt-1">
                                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm font-medium">{mentor.rating}</span>
                                <span className="text-sm text-gray-500 ml-2">• {mentor.experience}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mb-4">{mentor.bio}</p>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-900 mb-2">Courses:</p>
                            <div className="flex flex-wrap gap-1">
                              {mentor.courses.map((course) => (
                                <span
                                  key={course}
                                  className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="text-sm text-gray-600 mb-4">{mentor.responseTime}</div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleContactMentor(mentor)}
                              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                            >
                              Contact Mentor
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              Schedule Session
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Support Tickets Tab */}
                {activeTab === "tickets" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Your Support Tickets</h3>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Create New Ticket
                      </button>
                    </div>

                    <div className="space-y-4">
                      {supportTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-gray-900 mb-2">{ticket.title}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                <span>👨‍🏫 {ticket.mentor}</span>
                                <span>📚 {ticket.course}</span>
                                <span>Created {ticket.created}</span>
                                <span>Last reply {ticket.lastReply}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}
                              >
                                {ticket.status}
                              </span>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}
                              >
                                {ticket.priority}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2 mt-3">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Details
                            </button>
                            {ticket.status !== "Resolved" && (
                              <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                                Add Reply
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Sessions Tab */}
                {activeTab === "sessions" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Upcoming Mentor Sessions</h3>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Schedule New Session
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">{session.title}</h4>
                              <p className="text-sm text-gray-600">with {session.mentor}</p>
                            </div>
                            <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                              {session.type}
                            </span>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {session.date}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {session.time}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                              Join Session
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Contact Mentor Modal */}
      {showContactModal && selectedMentor && (
        <ContactMentorModal
          mentor={selectedMentor}
          onClose={() => setShowContactModal(false)}
          onSubmit={handleSendMessage}
        />
      )}
    </div>
  )
}

// Contact Mentor Modal
interface ContactMentorModalProps {
  mentor: any
  onClose: () => void
  onSubmit: (messageData: any) => void
}

const ContactMentorModal: React.FC<ContactMentorModalProps> = ({ mentor, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    priority: "Medium",
    course: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Contact {mentor.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter subject"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Related Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select course</option>
                {mentor.courses.map((course: string) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your question or issue..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
