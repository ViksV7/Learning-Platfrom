"use client"

import type React from "react"
import type { Assignment } from "@/types/assignments"

interface AssignmentCardProps {
  assignment: Assignment
  onClick: () => void
  userRole: "admin" | "user"
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onClick, userRole }) => {
  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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

  const getDueDateColor = (daysUntilDue: number) => {
    if (daysUntilDue < 0) return "text-red-600"
    if (daysUntilDue <= 3) return "text-orange-600"
    if (daysUntilDue <= 7) return "text-yellow-600"
    return "text-green-600"
  }

  const daysUntilDue = getDaysUntilDue(assignment.dueDate)

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{assignment.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>📚 {assignment.courseName}</span>
            <span>📊 {assignment.maxPoints} pts</span>
          </div>
        </div>
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assignment.status)}`}
        >
          {assignment.status}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-gray-600">Due: {formatDate(assignment.dueDate)}</span>
        </div>
        <span className={`text-sm font-medium ${getDueDateColor(daysUntilDue)}`}>
          {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days left`}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>📎 {assignment.submissionType}</span>
          <span>📁 {assignment.allowedFileTypes.join(", ")}</span>
          <span>💾 Max {assignment.maxFileSize}MB</span>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          {userRole === "admin" ? "Grade →" : "Submit →"}
        </button>
      </div>
    </div>
  )
}
