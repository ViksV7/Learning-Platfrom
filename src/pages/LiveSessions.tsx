import React, { useState } from 'react'
import type { LiveSession } from '@/types/dashboard'

interface LiveSessionsProps {
  onNavigate?: (path: string) => void
}

export const LiveSessions: React.FC<LiveSessionsProps> = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  const sessions: LiveSession[] = [
    {
      id: '1',
      title: 'Blockchain Fundamentals Q&A',
      instructor: 'Dr. Sarah Johnson',
      date: '2024-04-25',
      time: '10:00',
      duration: '2 hours',
      maxStudents: 100, // Changed from string to number
      enrolled: 45,
      status: 'upcoming',
      description: 'Interactive Q&A session covering blockchain basics and real-world applications',
      meetLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      title: 'Smart Contract Development Workshop',
      instructor: 'Michael Chen',
      date: '2024-04-26',
      time: '14:00',
      duration: '3 hours',
      maxStudents: 50,
      enrolled: 32,
      status: 'upcoming',
      description: 'Hands-on workshop building smart contracts with Solidity',
      meetLink: 'https://meet.google.com/xyz-uvwx-yzab'
    },
    {
      id: '3',
      title: 'DeFi Protocol Deep Dive',
      instructor: 'Emma Thompson',
      date: '2024-04-28',
      time: '16:00',
      duration: '2.5 hours',
      maxStudents: 75,
      enrolled: 68,
      status: 'upcoming',
      description: 'Exploring advanced DeFi protocols and yield farming strategies',
      meetLink: 'https://meet.google.com/def-ghij-klmn'
    },
    {
      id: '4',
      title: 'Web3 Security Best Practices',
      instructor: 'Alex Rodriguez',
      date: '2024-04-20',
      time: '15:00',
      duration: '2 hours',
      maxStudents: 60,
      enrolled: 55,
      status: 'completed',
      description: 'Comprehensive overview of Web3 security vulnerabilities and prevention'
    },
    {
      id: '5',
      title: 'NFT Marketplace Development',
      instructor: 'David Kim',
      date: '2024-04-18',
      time: '11:00',
      duration: '3 hours',
      maxStudents: 40,
      enrolled: 38,
      status: 'completed',
      description: 'Building a complete NFT marketplace from scratch'
    }
  ]

  const upcomingSessions = sessions.filter(session => session.status === 'upcoming')
  const pastSessions = sessions.filter(session => session.status === 'completed')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-600 text-green-100'
      case 'live': return 'bg-red-600 text-red-100'
      case 'completed': return 'bg-gray-600 text-gray-100'
      default: return 'bg-gray-600 text-gray-100'
    }
  }

  const handleJoinSession = (sessionId: string, meetLink?: string) => {
    if (meetLink) {
      window.open(meetLink, '_blank')
    } else {
      alert(`Joining session ${sessionId}! This would open the live session interface.`)
    }
  }

  const handleWatchRecording = (sessionId: string) => {
    alert(`Playing recording for session ${sessionId}! This would open the recorded session.`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const date = new Date()
    date.setHours(parseInt(hours), parseInt(minutes))
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 text-white border border-[#0097A7] shadow-2xl">
        <h1 className="text-2xl font-bold mb-2">Live Sessions</h1>
        <p className="opacity-90">Join live classes and interact with instructors and peers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Upcoming Sessions</p>
              <p className="text-2xl font-bold text-blue-400">{upcomingSessions.length}</p>
            </div>
            <div className="text-3xl">📅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Sessions Attended</p>
              <p className="text-2xl font-bold text-green-400">{pastSessions.length}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Hours</p>
              <p className="text-2xl font-bold text-purple-400">12.5</p>
            </div>
            <div className="text-3xl">⏰</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-[#0097A7]">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'upcoming'
                  ? 'border-[#0097A7] text-[#0097A7]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Upcoming Sessions ({upcomingSessions.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'past'
                  ? 'border-[#0097A7] text-[#0097A7]'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              Past Sessions ({pastSessions.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {upcomingSessions.map(session => (
                <div key={session.id} className="border border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow bg-gray-700">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{session.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{session.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                        <div>
                          <span className="font-medium text-gray-300">Instructor:</span>
                          <div className="text-white">{session.instructor}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Date:</span>
                          <div className="text-white">{formatDate(session.date)}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Time:</span>
                          <div className="text-white">{formatTime(session.time)}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Duration:</span>
                          <div className="text-white">{session.duration}</div>
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-gray-400">
                        <span className="font-medium text-gray-300">Enrolled:</span> 
                        <span className="text-white ml-1">{session.enrolled}/{session.maxStudents} students</span>
                      </div>

                      {session.meetLink && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium text-gray-300">Meeting Link:</span>
                          <a 
                            href={session.meetLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#0097A7] hover:text-blue-400 ml-2 underline"
                          >
                            {session.meetLink}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <button
                        onClick={() => handleJoinSession(session.id, session.meetLink)}
                        className="w-full lg:w-auto px-6 py-2 bg-gradient-to-r from-[#0097A7] to-blue-600 text-white rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all font-medium"
                      >
                        Join Session
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {upcomingSessions.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-medium text-white mb-2">No upcoming sessions</h3>
                  <p className="text-gray-400">Check back later for new live sessions</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="space-y-4">
              {pastSessions.map(session => (
                <div key={session.id} className="border border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow bg-gray-700">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{session.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{session.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400">
                        <div>
                          <span className="font-medium text-gray-300">Instructor:</span>
                          <div className="text-white">{session.instructor}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Date:</span>
                          <div className="text-white">{formatDate(session.date)}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Time:</span>
                          <div className="text-white">{formatTime(session.time)}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-300">Duration:</span>
                          <div className="text-white">{session.duration}</div>
                        </div>
                      </div>

                      <div className="mt-3 text-sm text-gray-400">
                        <span className="font-medium text-gray-300">Attended:</span> 
                        <span className="text-white ml-1">{session.enrolled} students</span>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <button
                        onClick={() => handleWatchRecording(session.id)}
                        className="w-full lg:w-auto px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all font-medium"
                      >
                        Watch Recording
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {pastSessions.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎥</div>
                  <h3 className="text-lg font-medium text-white mb-2">No past sessions</h3>
                  <p className="text-gray-400">Your attended sessions will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}