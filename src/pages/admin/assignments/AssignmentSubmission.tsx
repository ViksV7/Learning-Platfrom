"use client"

import type React from "react"
import { useState } from "react"
import type { Assignment,SubmissionFile } from "@/types/assignments"
import type { DashboardConfig } from "@/types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import { FileUpload } from "./FileUpload"

interface AssignmentSubmissionProps {
  assignment: Assignment
  config: DashboardConfig
  onNavigate: (path: string) => void
  onBack: () => void
}

export const AssignmentSubmission: React.FC<AssignmentSubmissionProps> = ({
  assignment,
  config,
  onNavigate,
  onBack,
}) => {
  const [textContent, setTextContent] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<SubmissionFile[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFileUpload = (files: SubmissionFile[]) => {
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const handleFileRemove = (fileId: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Show success message
    setTimeout(() => {
      onBack()
    }, 3000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilDue = getDaysUntilDue(assignment.dueDate)
  const isOverdue = daysUntilDue < 0

  if (isSubmitted) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar user={config.user} navigation={config.navigation} title="User Dashboard" onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Assignment Submitted!</h2>
              <p className="text-gray-600 mb-4">Your submission has been received successfully.</p>
              <p className="text-sm text-gray-500">Redirecting back to assignments...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={config.user} navigation={config.navigation} title="User Dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">Submit Assignment</h1>
            </div>
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
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Assignment Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{assignment.title}</h2>
                  <p className="text-gray-600 mb-4">{assignment.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>📚 {assignment.courseName}</span>
                    <span>📊 {assignment.maxPoints} points</span>
                    <span>📎 {assignment.submissionType} submission</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${isOverdue ? "text-red-600" : "text-green-600"}`}>
                    {isOverdue ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days left`}
                  </div>
                  <div className="text-sm text-gray-500">Due: {formatDate(assignment.dueDate)}</div>
                </div>
              </div>

              {isOverdue && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-800 font-medium">This assignment is overdue</span>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{assignment.instructions}</p>
              </div>
            </div>

            {/* Submission Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Submission</h3>

              {/* File Upload Section */}
              {(assignment.submissionType === "File" || assignment.submissionType === "Both") && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
                  <FileUpload
                    allowedTypes={assignment.allowedFileTypes}
                    maxSize={assignment.maxFileSize}
                    onUpload={handleFileUpload}
                  />

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleFileRemove(file.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Text Content Section */}
              {(assignment.submissionType === "Text" || assignment.submissionType === "Both") && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Written Response {assignment.submissionType === "Both" && "(Optional)"}
                  </label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your response here..."
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onBack}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting ||
                    (assignment.submissionType === "File" && uploadedFiles.length === 0) ||
                    (assignment.submissionType === "Text" && !textContent.trim()) ||
                    (assignment.submissionType === "Both" && uploadedFiles.length === 0 && !textContent.trim())
                  }
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Submit Assignment"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
