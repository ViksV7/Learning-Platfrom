"use client"

import type React from "react"
import { useState } from "react"
import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import { useNotifications } from "../../contexts/NotificationContext"

interface MentorPanelProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

const instructors = [
  {
    id: "inst-1",
    name: "Priya Sharma",
    email: "priya.sharma@techacademy.com",
    phone: "+91 98765 43210",
    expertise: ["Full Stack Development", "React", "Node.js", "MongoDB"],
    experience: "8 years",
    rating: 4.9,
    totalStudents: 1247,
    activeCourses: 3,
    completedCourses: 12,
    status: "Active",
    joinDate: "2022-01-15",
    bio: "Senior Full Stack Developer with expertise in modern web technologies. Passionate about teaching and mentoring students.",
    education: "B.Tech Computer Science, IIT Delhi",
    certifications: ["AWS Certified", "Google Cloud Professional", "MongoDB Certified"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/priyasharma",
      github: "https://github.com/priyasharma",
      twitter: "https://twitter.com/priyasharma",
    },
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "inst-2",
    name: "Rahul Kumar",
    email: "rahul.kumar@techacademy.com",
    phone: "+91 87654 32109",
    expertise: ["Blockchain Development", "Solidity", "Web3", "Smart Contracts"],
    experience: "6 years",
    rating: 4.8,
    totalStudents: 892,
    activeCourses: 2,
    completedCourses: 8,
    status: "Active",
    joinDate: "2022-03-20",
    bio: "Blockchain expert with deep knowledge of cryptocurrency and DeFi protocols. Former tech lead at major fintech company.",
    education: "M.Tech Blockchain Technology, IIT Bombay",
    certifications: ["Ethereum Developer", "Hyperledger Certified", "Solidity Expert"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/rahulkumar",
      github: "https://github.com/rahulkumar",
    },
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "inst-3",
    name: "Ankit Singh",
    email: "ankit.singh@techacademy.com",
    phone: "+91 76543 21098",
    expertise: ["Machine Learning", "Python", "TensorFlow", "Data Science"],
    experience: "10 years",
    rating: 4.9,
    totalStudents: 1456,
    activeCourses: 4,
    completedCourses: 15,
    status: "Active",
    joinDate: "2021-08-10",
    bio: "AI/ML researcher and practitioner with extensive experience in building production ML systems.",
    education: "PhD Machine Learning, IISc Bangalore",
    certifications: ["Google ML Engineer", "AWS ML Specialty", "TensorFlow Developer"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/ankitsingh",
      github: "https://github.com/ankitsingh",
      twitter: "https://twitter.com/ankitsingh",
    },
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "inst-4",
    name: "Sneha Patel",
    email: "sneha.patel@techacademy.com",
    phone: "+91 65432 10987",
    expertise: ["DevOps", "AWS", "Docker", "Kubernetes", "CI/CD"],
    experience: "7 years",
    rating: 4.7,
    totalStudents: 734,
    activeCourses: 2,
    completedCourses: 9,
    status: "Active",
    joinDate: "2022-05-12",
    bio: "DevOps engineer with expertise in cloud infrastructure and automation. Helps students build scalable applications.",
    education: "B.Tech Information Technology, NIT Surat",
    certifications: ["AWS Solutions Architect", "Kubernetes Administrator", "Docker Certified"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/snehapatel",
      github: "https://github.com/snehapatel",
    },
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "inst-5",
    name: "Vikram Gupta",
    email: "vikram.gupta@techacademy.com",
    phone: "+91 54321 09876",
    expertise: ["Cybersecurity", "Ethical Hacking", "Network Security", "Penetration Testing"],
    experience: "9 years",
    rating: 4.8,
    totalStudents: 567,
    activeCourses: 2,
    completedCourses: 7,
    status: "On Leave",
    joinDate: "2022-09-01",
    bio: "Cybersecurity expert with hands-on experience in securing enterprise systems and conducting security audits.",
    education: "M.Tech Cybersecurity, IIT Kanpur",
    certifications: ["CISSP", "CEH", "OSCP", "Security+"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/vikramgupta",
    },
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "inst-6",
    name: "Kavya Reddy",
    email: "kavya.reddy@techacademy.com",
    phone: "+91 43210 98765",
    expertise: ["UI/UX Design", "Figma", "Adobe Creative Suite", "User Research"],
    experience: "5 years",
    rating: 4.6,
    totalStudents: 423,
    activeCourses: 1,
    completedCourses: 5,
    status: "Pending Approval",
    joinDate: "2024-01-15",
    bio: "Creative UI/UX designer with a passion for creating user-centered designs and improving user experiences.",
    education: "B.Des Visual Communication, NID Ahmedabad",
    certifications: ["Google UX Design", "Adobe Certified Expert", "Figma Professional"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/kavyareddy",
      behance: "https://behance.net/kavyareddy",
    },
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export const MentorPanel: React.FC<MentorPanelProps> = ({ config, onNavigate }) => {
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const { addNotification } = useNotifications()

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesStatus = filterStatus === "All" || instructor.status === filterStatus
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.expertise.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800"
      case "Pending Approval":
        return "bg-blue-100 text-blue-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleApproveInstructor = (instructorId: string, name: string) => {
    addNotification({
      type: "success",
      title: "Instructor Approved",
      message: `${name} has been approved and can now start teaching.`,
      category: "system",
    })
  }

  const handleSuspendInstructor = (instructorId: string, name: string) => {
    if (confirm(`Are you sure you want to suspend ${name}?`)) {
      addNotification({
        type: "warning",
        title: "Instructor Suspended",
        message: `${name} has been suspended from teaching.`,
        category: "system",
      })
    }
  }

  const handleAddInstructor = (instructorData: any) => {
    console.log("Adding instructor:", instructorData)
    addNotification({
      type: "success",
      title: "Instructor Added",
      message: `${instructorData.name} has been added to the platform.`,
      category: "system",
    })
    setShowAddModal(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={config.user} navigation={config.navigation} title="Admin Dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">
              Instructor Management
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
                    <p className="text-sm font-medium text-gray-600">Total Instructors</p>
                    <p className="text-2xl font-bold text-gray-900">{instructors.length}</p>
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
                    <p className="text-sm font-medium text-gray-600">Active Instructors</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {instructors.filter((i) => i.status === "Active").length}
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
                    <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {instructors.filter((i) => i.status === "Pending Approval").length}
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
                    <p className="text-sm font-medium text-gray-600">Total Students Taught</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {instructors.reduce((sum, instructor) => sum + instructor.totalStudents, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search instructors..."
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
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Export List
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + Add Instructor
                </button>
              </div>
            </div>

            {/* Instructors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredInstructors.map((instructor) => (
                <div key={instructor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={instructor.avatar || "/placeholder.svg"}
                        alt={instructor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
                        <p className="text-sm text-gray-600">{instructor.experience} experience</p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(instructor.status)}`}
                    >
                      {instructor.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-medium">{instructor.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{instructor.totalStudents}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Active Courses:</span>
                      <span className="font-medium">{instructor.activeCourses}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {instructor.expertise.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {instructor.expertise.length > 3 && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          +{instructor.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedInstructor(instructor)}
                      className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </button>
                    {instructor.status === "Pending Approval" && (
                      <button
                        onClick={() => handleApproveInstructor(instructor.id, instructor.name)}
                        className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    {instructor.status === "Active" && (
                      <button
                        onClick={() => handleSuspendInstructor(instructor.id, instructor.name)}
                        className="px-3 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors"
                      >
                        Suspend
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Instructor Details Modal */}
      {selectedInstructor && (
        <InstructorDetailsModal instructor={selectedInstructor} onClose={() => setSelectedInstructor(null)} />
      )}

      {/* Add Instructor Modal */}
      {showAddModal && <AddInstructorModal onClose={() => setShowAddModal(false)} onSubmit={handleAddInstructor} />}
    </div>
  )
}

// Instructor Details Modal
interface InstructorDetailsModalProps {
  instructor: any
  onClose: () => void
}

const InstructorDetailsModal: React.FC<InstructorDetailsModalProps> = ({ instructor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Instructor Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="text-center mb-6">
                <img
                  src={instructor.avatar || "/placeholder.svg"}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">{instructor.name}</h3>
                <p className="text-gray-600">{instructor.experience} experience</p>
                <div className="flex items-center justify-center mt-2">
                  <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{instructor.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">📧 {instructor.email}</p>
                    <p className="text-gray-600">📱 {instructor.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Social Links</h4>
                  <div className="flex space-x-2">
                    {instructor.socialLinks.linkedin && (
                      <a
                        href={instructor.socialLinks.linkedin}
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    )}
                    {instructor.socialLinks.github && (
                      <a
                        href={instructor.socialLinks.github}
                        className="text-gray-600 hover:text-gray-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                    {instructor.socialLinks.twitter && (
                      <a
                        href={instructor.socialLinks.twitter}
                        className="text-blue-400 hover:text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">About</h4>
                  <p className="text-gray-700">{instructor.bio}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Education</h4>
                  <p className="text-gray-700">{instructor.education}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.expertise.map((skill: string) => (
                      <span
                        key={skill}
                        className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Certifications</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {instructor.certifications.map((cert: string) => (
                      <div key={cert} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{instructor.totalStudents}</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{instructor.activeCourses}</div>
                    <div className="text-sm text-gray-600">Active Courses</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{instructor.completedCourses}</div>
                    <div className="text-sm text-gray-600">Completed Courses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add Instructor Modal
interface AddInstructorModalProps {
  onClose: () => void
  onSubmit: (instructorData: any) => void
}

const AddInstructorModal: React.FC<AddInstructorModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    expertise: "",
    experience: "",
    education: "",
    bio: "",
    linkedin: "",
    github: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      expertise: formData.expertise.split(",").map((skill) => skill.trim()),
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Add New Instructor</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 5 years"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expertise (comma separated) *</label>
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="React, Node.js, MongoDB, JavaScript"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="B.Tech Computer Science, IIT Delhi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description about the instructor"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://github.com/username"
              />
            </div>
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
              Add Instructor
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
