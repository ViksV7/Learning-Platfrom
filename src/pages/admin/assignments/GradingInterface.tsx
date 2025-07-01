"use client"

import type React from "react"
import { useState } from "react"
import type { Assignment,Submission } from "@/types/assignments"
import type { DashboardConfig } from "@/types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"

interface GradingInterfaceProps {
  assignment: Assignment
  submission: Submission
  config: DashboardConfig
  onNavigate: (path: string) => void
  onBack: () => void
}

export const GradingInterface: React.FC<GradingInterfaceProps> = ({
  assignment,
  submission,
  config,
  onNavigate,
  onBack,
}) => {
  const [grade, setGrade] = useState(submission.grade || 0)
  const [feedback, setFeedback] = useState(submission.feedback || "")
  const [isGrading, setIsGrading] = useState(false)
  const [rubricScores, setRubricScores] = useState<{ [key: string]: number }>({})

  // Mock rubric data
  const rubric = {
    criteria: [
      {
        id: "1",
        name: "Code Quality",
        description: "Clean, readable, and well-structured code",
        maxPoints: 25,
        levels: [
          { id: "1", name: "Excellent", description: "Exceptional code quality", points: 25 },
          { id: "2", name: "Good", description: "Good code quality with minor issues", points: 20 },
          { id: "3", name: "Satisfactory", description: "Adequate code quality", points: 15 },
          { id: "4", name: "Needs Improvement", description: "Poor code quality", points: 10 },
        ],
      },
      {
        id: "2",
        name: "Functionality",
        description: "Code works as expected and meets requirements",
        maxPoints: 35,
        levels: [
          { id: "1", name: "Excellent", description: "All requirements met perfectly", points: 35 },
          { id: "2", name: "Good", description: "Most requirements met", points: 28 },
          { id: "3", name: "Satisfactory", description: "Basic requirements met", points: 21 },
          { id: "4", name: "Needs Improvement", description: "Requirements not met", points: 14 },
        ],
      },
      {
        id: "3",
        name: "Documentation",
        description: "Clear documentation and comments",
        maxPoints: 20,
        levels: [
          { id: "1", name: "Excellent", description: "Comprehensive documentation", points: 20 },
          { id: "2", name: "Good", description: "Good documentation", points: 16 },
          { id: "3", name: "Satisfactory", description: "Basic documentation", points: 12 },
          { id: "4", name: "Needs Improvement", description: "Poor documentation", points: 8 },
        ],
      },
      {
        id: "4",
        name: "Innovation",
        description: "Creative solutions and additional features",
        maxPoints: 20,
        levels: [
          { id: "1", name: "Excellent", description: "Highly innovative approach", points: 20 },
          { id: "2", name: "Good", description: "Some innovative elements", points: 16 },
          { id: "3", name: "Satisfactory", description: "Standard approach", points: 12 },
          { id: "4", name: "Needs Improvement", description: "Lacks innovation", points: 8 },
        ],
      },
    ],
  }

  const handleRubricScore = (criterionId: string, points: number) => {
    setRubricScores({ ...rubricScores, [criterionId]: points })

    // Calculate total grade from rubric
    const newScores = { ...rubricScores, [criterionId]: points }
    const totalScore = Object.values(newScores).reduce((sum, score) => sum + score, 0)
    setGrade(totalScore)
  }

  const handleSubmitGrade = async () => {
    setIsGrading(true)

    // Simulate grading submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsGrading(false)

    // Show success message and go back
    alert("Grade submitted successfully!")
    onBack()
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getGradeColor = (grade: number, maxPoints: number) => {
    const percentage = (grade / maxPoints) * 100
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 70) return "text-yellow-600"
    if (percentage >= 60) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={config.user} navigation={config.navigation} title="Admin Dashboard" onNavigate={onNavigate} />

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
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
                Grading: {submission.studentName}
              </h1>
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
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Assignment & Submission Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Title:</span>
                    <p className="text-sm text-gray-900">{assignment.title}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Course:</span>
                    <p className="text-sm text-gray-900">{assignment.courseName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Max Points:</span>
                    <p className="text-sm text-gray-900">{assignment.maxPoints}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Due Date:</span>
                    <p className="text-sm text-gray-900">{formatDate(assignment.dueDate)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Student:</span>
                    <p className="text-sm text-gray-900">{submission.studentName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Submitted:</span>
                    <p className="text-sm text-gray-900">{formatDate(submission.submittedAt)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        submission.status === "Late" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Current Grade:</span>
                    <p className={`text-sm font-medium ${getGradeColor(grade, assignment.maxPoints)}`}>
                      {grade}/{assignment.maxPoints} ({Math.round((grade / assignment.maxPoints) * 100)}%)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Files */}
              {submission.files.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Submitted Files</h3>
                  <div className="space-y-3">
                    {submission.files.map((file) => (
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
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Text Content */}
              {submission.textContent && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Written Response</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{submission.textContent}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Grading Rubric */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Grading Rubric</h3>
              <div className="space-y-6">
                {rubric.criteria.map((criterion) => (
                  <div key={criterion.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{criterion.name}</h4>
                      <span className="text-sm text-gray-500">Max: {criterion.maxPoints} pts</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{criterion.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {criterion.levels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => handleRubricScore(criterion.id, level.points)}
                          className={`p-3 text-left border rounded-lg transition-colors ${
                            rubricScores[criterion.id] === level.points
                              ? "border-blue-500 bg-blue-50 text-blue-900"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="font-medium text-sm">{level.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{level.description}</div>
                          <div className="text-sm font-medium mt-2">{level.points} pts</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual Grade Override */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Override</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manual Grade</label>
                  <input
                    type="number"
                    min="0"
                    max={assignment.maxPoints}
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Percentage</label>
                  <input
                    type="text"
                    value={`${Math.round((grade / assignment.maxPoints) * 100)}%`}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback</h3>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Provide detailed feedback for the student..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={onBack}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Save Draft
              </button>
              <button
                onClick={handleSubmitGrade}
                disabled={isGrading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isGrading ? "Submitting..." : "Submit Grade"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
