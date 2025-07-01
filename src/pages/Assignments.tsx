import React, { useState } from 'react'
import type { Assignment } from '../../types/dashboard'

interface AssignmentsProps {
  onNavigate?: (path: string) => void
}

export const Assignments: React.FC<AssignmentsProps> = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'submitted' | 'graded'>('pending')

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Smart Contract Development Project',
      course: 'AI + Blockchain Bootcamp',
      dueDate: '2024-04-30',
      status: 'pending'
    },
    {
      id: '2',
      title: 'DeFi Protocol Analysis',
      course: 'Web3 Development Fundamentals',
      dueDate: '2024-05-05',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Blockchain Security Audit',
      course: 'Smart Contract Security',
      dueDate: '2024-04-20',
      status: 'submitted'
    },
    {
      id: '4',
      title: 'NFT Marketplace Implementation',
      course: 'Web3 Development Fundamentals',
      dueDate: '2024-04-15',
      status: 'graded',
      grade: 92
    },
    {
      id: '5',
      title: 'Cryptocurrency Trading Strategy',
      course: 'AI + Blockchain Bootcamp',
      dueDate: '2024-04-10',
      status: 'graded',
      grade: 88
    }
  ]

  const pendingAssignments = assignments.filter(a => a.status === 'pending')
  const submittedAssignments = assignments.filter(a => a.status === 'submitted')
  const gradedAssignments = assignments.filter(a => a.status === 'graded')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'submitted': return 'bg-blue-100 text-blue-800'
      case 'graded': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600'
    if (grade >= 80) return 'text-blue-600'
    if (grade >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleStartAssignment = (assignmentId: string) => {
    alert(`Starting assignment ${assignmentId}! This would open the assignment interface.`)
  }

  const handleViewSubmission = (assignmentId: string) => {
    alert(`Viewing submission for assignment ${assignmentId}! This would show the submitted work.`)
  }

  const handleViewGrade = (assignmentId: string) => {
    alert(`Viewing grade details for assignment ${assignmentId}! This would show detailed feedback.`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Assignments</h1>
        <p className="opacity-90">Complete assignments to test your knowledge and skills</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingAssignments.length}</p>
            </div>
            <div className="text-3xl">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Submitted</p>
              <p className="text-2xl font-bold text-blue-600">{submittedAssignments.length}</p>
            </div>
            <div className="text-3xl">📤</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Graded</p>
              <p className="text-2xl font-bold text-green-600">{gradedAssignments.length}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Grade</p>
              <p className="text-2xl font-bold text-purple-600">
                {gradedAssignments.length > 0 
                  ? Math.round(gradedAssignments.reduce((sum, a) => sum + (a.grade || 0), 0) / gradedAssignments.length)
                  : 0}%
              </p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'pending'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending ({pendingAssignments.length})
            </button>
            <button
              onClick={() => setActiveTab('submitted')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'submitted'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Submitted ({submittedAssignments.length})
            </button>
            <button
              onClick={() => setActiveTab('graded')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'graded'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Graded ({gradedAssignments.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {pendingAssignments.map(assignment => {
                const daysUntilDue = getDaysUntilDue(assignment.dueDate)
                const isOverdue = daysUntilDue < 0
                const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

                return (
                  <div key={assignment.id} className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${
                    isOverdue ? 'border-red-200 bg-red-50' : isDueSoon ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200'
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                            {assignment.status}
                          </span>
                          {isOverdue && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Overdue
                            </span>
                          )}
                          {isDueSoon && !isOverdue && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Due Soon
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Course:</span> {assignment.course}
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Due Date:</span> {formatDate(assignment.dueDate)}
                          {!isOverdue && (
                            <span className="ml-2">
                              ({daysUntilDue === 0 ? 'Due today' : daysUntilDue === 1 ? '1 day left' : `${daysUntilDue} days left`})
                            </span>
                          )}
                          {isOverdue && (
                            <span className="ml-2 text-red-600 font-medium">
                              ({Math.abs(daysUntilDue)} days overdue)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <button
                          onClick={() => handleStartAssignment(assignment.id)}
                          className="w-full lg:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Start Assignment
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}

              {pendingAssignments.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending assignments</h3>
                  <p className="text-gray-600">Great job! You're all caught up</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'submitted' && (
            <div className="space-y-4">
              {submittedAssignments.map(assignment => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Course:</span> {assignment.course}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Submitted on:</span> {formatDate(assignment.dueDate)}
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <button
                        onClick={() => handleViewSubmission(assignment.id)}
                        className="w-full lg:w-auto px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                      >
                        View Submission
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {submittedAssignments.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📤</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No submitted assignments</h3>
                  <p className="text-gray-600">Your submitted assignments will appear here</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'graded' && (
            <div className="space-y-4">
              {gradedAssignments.map(assignment => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                        <span className={`text-lg font-bold ${getGradeColor(assignment.grade || 0)}`}>
                          {assignment.grade}%
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Course:</span> {assignment.course}
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Graded on:</span> {formatDate(assignment.dueDate)}
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <button
                        onClick={() => handleViewGrade(assignment.id)}
                        className="w-full lg:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        View Feedback
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {gradedAssignments.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No graded assignments</h3>
                  <p className="text-gray-600">Your graded assignments will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}