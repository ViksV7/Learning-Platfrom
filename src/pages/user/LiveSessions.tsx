"use client"

import type React from "react"
import { useState } from "react"
import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"

interface LiveSessionsProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

const sessions = [
  {
    id: "1",
    title: "Blockchain Basics",
    instructor: "Alice Carter",
    date: "April 25, 2024",
    time: "2:00 PM - 3:30 PM",
    status: "Upcoming",
    attendees: 45,
    maxAttendees: 50,
    description: "Introduction to blockchain technology and its applications",
  },
  {
    id: "2",
    title: "Smart Contract Development",
    instructor: "John Smith",
    date: "April 26, 2024",
    time: "10:00 AM - 11:30 AM",
    status: "Upcoming",
    attendees: 38,
    maxAttendees: 40,
    description: "Learn to develop and deploy smart contracts on Ethereum",
  },
  {
    id: "3",
    title: "DeFi Protocol Analysis",
    instructor: "Sarah Johnson",
    date: "April 24, 2024",
    time: "3:00 PM - 4:30 PM",
    status: "Completed",
    attendees: 42,
    maxAttendees: 45,
    description: "Deep dive into DeFi protocols and their mechanisms",
  },
  {
    id: "4",
    title: "Web3 Integration Workshop",
    instructor: "Michael Lee",
    date: "April 27, 2024",
    time: "1:00 PM - 2:30 PM",
    status: "Live",
    attendees: 35,
    maxAttendees: 40,
    description: "Hands-on workshop for integrating Web3 into applications",
  },
]

export const LiveSessions: React.FC<LiveSessionsProps> = ({ config, onNavigate }) => {
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredSessions = sessions.filter((session) => filterStatus === "All" || session.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-red-100 text-red-800"
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">Live Sessions</h1>
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
                {["All", "Live", "Upcoming", "Completed"].map((status) => (
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
                  + Schedule New Session
                </button>
              )}
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSessions.map((session) => (
                <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>👨‍🏫 {session.instructor}</span>
                        <span>📅 {session.date}</span>
                        <span>🕐 {session.time}</span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}
                    >
                      {session.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {session.attendees}/{session.maxAttendees} attendees
                      </span>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(session.attendees / session.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {session.status === "Live" && (
                      <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        🔴 Join Live
                      </button>
                    )}
                    {session.status === "Upcoming" && (
                      <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        📅 Set Reminder
                      </button>
                    )}
                    {session.status === "Completed" && (
                      <button className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                        📹 Watch Recording
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Live Now</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {sessions.filter((s) => s.status === "Live").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {sessions.filter((s) => s.status === "Upcoming").length}
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
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {sessions.filter((s) => s.status === "Completed").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
