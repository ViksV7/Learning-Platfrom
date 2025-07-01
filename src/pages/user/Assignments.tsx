"use client"

import type React from "react"
import { useState } from "react"
import type { DashboardConfig } from "../../types/dashboard"
import type { Assignment, Submission } from "../../types/assignments"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import { AssignmentCard } from "../admin/assignments/AssignmentCard"
import { AssignmentSubmission } from "../admin/assignments/AssignmentSubmission"
import { AssignmentGrading } from "../admin/assignments/AssignmentGrading"

interface AssignmentsProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

// Mock data
const assignments: Assignment[] = [
  {
    id: "1",
    title: "Blockchain Smart Contract Development",
    description: "Create a simple smart contract using Solidity and deploy it to a testnet.",
    courseId: "course-1",
    courseName: "AI + Blockchain Bootcamp",
    dueDate: "2024-05-15T23:59:00Z",
    maxPoints: 100,
    status: "Published",
    submissionType: "Both",
    allowedFileTypes: [".sol", ".js", ".md", ".pdf"],
    maxFileSize: 10,
    instructions:
      "Create a smart contract that implements a simple voting system. Include documentation and deployment scripts.",
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-04-01T10:00:00Z",
  },
  {
    id: "2",
    title: "DeFi Protocol Analysis",
    description: "Analyze a DeFi protocol and write a comprehensive report.",
    courseId: "course-2",
    courseName: "Web3 Development",
    dueDate: "2024-05-20T23:59:00Z",
    maxPoints: 80,
    status: "Published",
    submissionType: "File",
    allowedFileTypes: [".pdf", ".docx"],
    maxFileSize: 5,
    instructions: "Choose a DeFi protocol and analyze its tokenomics, security, and market impact.",
    createdAt: "2024-04-05T14:00:00Z",
    updatedAt: "2024-04-05T14:00:00Z",
  },
  {
    id: "3",
    title: "AI Model Implementation",
    description: "Implement and train a machine learning model for cryptocurrency price prediction.",
    courseId: "course-1",
    courseName: "AI + Blockchain Bootcamp",
    dueDate: "2024-05-25T23:59:00Z",
    maxPoints: 120,
    status: "Published",
    submissionType: "Both",
    allowedFileTypes: [".py", ".ipynb", ".pdf", ".csv"],
    maxFileSize: 50,
    instructions:
      "Use historical cryptocurrency data to build and train a prediction model. Include model evaluation and documentation.",
    createdAt: "2024-04-10T09:00:00Z",
    updatedAt: "2024-04-10T09:00:00Z",
  },
]

const submissions: Submission[] = [
  {
    id: "1",
    assignmentId: "1",
    studentId: "student-1",
    studentName: "John Doe",
    submittedAt: "2024-05-14T18:30:00Z",
    status: "Submitted",
    files: [
      {
        id: "file-1",
        name: "VotingContract.sol",
        size: 2048,
        type: "application/x-solidity",
        url: "/files/VotingContract.sol",
        uploadedAt: "2024-05-14T18:30:00Z",
      },
      {
        id: "file-2",
        name: "deployment.js",
        size: 1024,
        type: "application/javascript",
        url: "/files/deployment.js",
        uploadedAt: "2024-05-14T18:30:00Z",
      },
    ],
    textContent:
      "This smart contract implements a simple voting system with the following features:\n\n1. Voter registration\n2. Candidate management\n3. Secure voting mechanism\n4. Result tallying\n\nThe contract has been tested on Goerli testnet.",
  },
]

export const Assignments: React.FC<AssignmentsProps> = ({ config, onNavigate }) => {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "submission" | "grading">("list")
  const [filterStatus, setFilterStatus] = useState<string>("All")

  const filteredAssignments = assignments.filter((assignment) => {
    if (filterStatus === "All") return true
    return assignment.status === filterStatus
  })

  const handleAssignmentClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment)
    if (config.user.role === "admin") {
      setViewMode("grading")
    } else {
      setViewMode("submission")
    }
  }

  const handleBackToList = () => {
    setSelectedAssignment(null)
    setViewMode("list")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (viewMode === "submission" && selectedAssignment) {
    return (
      <AssignmentSubmission
        assignment={selectedAssignment}
        config={config}
        onNavigate={onNavigate}
        onBack={handleBackToList}
      />
    )
  }

  if (viewMode === "grading" && selectedAssignment) {
    return (
      <AssignmentGrading
        assignment={selectedAssignment}
        submissions={submissions.filter((s) => s.assignmentId === selectedAssignment.id)}
        config={config}
        onNavigate={onNavigate}
        onBack={handleBackToList}
      />
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={config.user}
        navigation={config.navigation}
        title={config.user.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">Assignments</h1>
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
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex space-x-2">
                {["All", "Published", "Draft", "Closed"].map((status) => (
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
              {config.user.role === "admin" && (
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  + Create Assignment
                </button>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                    <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
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
                    <p className="text-sm font-medium text-gray-600">Due This Week</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {
                        assignments.filter((a) => getDaysUntilDue(a.dueDate) <= 7 && getDaysUntilDue(a.dueDate) > 0)
                          .length
                      }
                    </p>
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
                    <p className="text-sm font-medium text-gray-600">
                      {config.user.role === "admin" ? "Submissions" : "Completed"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {config.user.role === "admin" ? submissions.length : 2}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Overdue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {assignments.filter((a) => getDaysUntilDue(a.dueDate) < 0).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assignments Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onClick={() => handleAssignmentClick(assignment)}
                  userRole={config.user.role}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
