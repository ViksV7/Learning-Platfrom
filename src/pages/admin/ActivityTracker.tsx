"use client"

import type React from "react"
import { useState } from "react"
import { useActivity } from "../../contexts/ActivityContext"
import {
  Activity,
  Users,
  TrendingUp,
  Calendar,
  Download,
  Search,
  Eye,
  Clock,
  User,
  BookOpen,
  Award,
  CreditCard,
  MessageSquare,
} from "lucide-react"

const ActivityTracker: React.FC = () => {
  const { getAllActivities } = useActivity()
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<string>("all")

  const allActivities = getAllActivities()

  // Filter activities
  let filteredActivities = allActivities

  if (filter !== "all") {
    filteredActivities = filteredActivities.filter((activity) => activity.type === filter)
  }

  if (searchTerm) {
    filteredActivities = filteredActivities.filter(
      (activity) =>
        activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  if (dateFilter !== "all") {
    const now = new Date()
    const filterDate = new Date()

    switch (dateFilter) {
      case "today":
        filterDate.setHours(0, 0, 0, 0)
        break
      case "week":
        filterDate.setDate(now.getDate() - 7)
        break
      case "month":
        filterDate.setMonth(now.getMonth() - 1)
        break
    }

    filteredActivities = filteredActivities.filter((activity) => new Date(activity.timestamp) >= filterDate)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course_enrollment":
        return <BookOpen className="w-4 h-4 text-blue-500" />
      case "lesson_completed":
        return <Award className="w-4 h-4 text-green-500" />
      case "payment":
        return <CreditCard className="w-4 h-4 text-purple-500" />
      case "forum_post":
        return <MessageSquare className="w-4 h-4 text-cyan-500" />
      case "live_session":
        return <Calendar className="w-4 h-4 text-orange-500" />
      case "login":
        return <User className="w-4 h-4 text-gray-500" />
      case "trial_booking":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const getActivityStats = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayActivities = allActivities.filter((activity) => new Date(activity.timestamp) >= today)

    const uniqueUsers = new Set(allActivities.map((activity) => activity.userId)).size
    const totalActivities = allActivities.length

    return {
      todayActivities: todayActivities.length,
      uniqueUsers,
      totalActivities,
      avgActivitiesPerUser: uniqueUsers > 0 ? Math.round(totalActivities / uniqueUsers) : 0,
    }
  }

  const stats = getActivityStats()

  const exportActivities = () => {
    const csvContent = [
      ["Timestamp", "User Name", "User Email", "Activity Type", "Description"],
      ...filteredActivities.map((activity) => [
        new Date(activity.timestamp).toLocaleString(),
        activity.userName,
        activity.userEmail,
        activity.type,
        activity.description,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `user-activities-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Activities</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayActivities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.uniqueUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalActivities}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg per User</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgActivitiesPerUser}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <h2 className="text-xl font-semibold text-gray-900">User Activity Tracker</h2>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {/* Activity Type Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Activities</option>
              <option value="course_enrollment">Course Enrollments</option>
              <option value="lesson_completed">Lessons Completed</option>
              <option value="payment">Payments</option>
              <option value="forum_post">Forum Posts</option>
              <option value="live_session">Live Sessions</option>
              <option value="login">Login Activity</option>
              <option value="trial_booking">Trial Bookings</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>

            {/* Export Button */}
            <button
              onClick={exportActivities}
              className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Activities Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No activities found</p>
                    <p className="text-sm text-gray-400">Try adjusting your filters</p>
                  </td>
                </tr>
              ) : (
                filteredActivities.slice(0, 50).map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {activity.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{activity.userName}</div>
                          <div className="text-sm text-gray-500">{activity.userEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{activity.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getActivityIcon(activity.type)}
                        <span className="text-sm text-gray-600 capitalize">{activity.type.replace("_", " ")}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-cyan-600 hover:text-cyan-900 flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredActivities.length > 50 && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Showing first 50 activities. Use filters to narrow down results.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityTracker
