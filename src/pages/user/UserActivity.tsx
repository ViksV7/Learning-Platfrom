"use client"

import type React from "react"
import { useState } from "react"
import { useActivity, type Activity } from "@/contexts/ActivityContext"
import { Clock, User, BookOpen, Award, CreditCard, MessageSquare, Calendar, Filter } from "lucide-react"

interface UserActivityProps {
  userId: string
}

const UserActivity: React.FC<UserActivityProps> = ({ userId }) => {
  const { getUserActivities } = useActivity()
  const [filter, setFilter] = useState<string>("all")

  const userActivities = getUserActivities(userId)

  const filteredActivities =
    filter === "all" ? userActivities : userActivities.filter((activity: Activity) => activity.type === filter)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course_enrollment":
        return <BookOpen className="w-5 h-5 text-blue-500" />
      case "lesson_completed":
        return <Award className="w-5 h-5 text-green-500" />
      case "payment":
        return <CreditCard className="w-5 h-5 text-purple-500" />
      case "forum_post":
        return <MessageSquare className="w-5 h-5 text-cyan-500" />
      case "live_session":
        return <Calendar className="w-5 h-5 text-orange-500" />
      case "login":
        return <User className="w-5 h-5 text-gray-500" />
      case "trial_booking":
        return <Clock className="w-5 h-5 text-yellow-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "course_enrollment":
        return "bg-blue-100 border-blue-200"
      case "lesson_completed":
        return "bg-green-100 border-green-200"
      case "payment":
        return "bg-purple-100 border-purple-200"
      case "forum_post":
        return "bg-cyan-100 border-cyan-200"
      case "live_session":
        return "bg-orange-100 border-orange-200"
      case "login":
        return "bg-gray-100 border-gray-200"
      case "trial_booking":
        return "bg-yellow-100 border-yellow-200"
      default:
        return "bg-gray-50 border-gray-100"
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const activityTypes = [
    { value: "all", label: "All Activities" },
    { value: "course_enrollment", label: "Course Enrollments" },
    { value: "lesson_completed", label: "Lessons Completed" },
    { value: "payment", label: "Payments" },
    { value: "forum_post", label: "Forum Posts" },
    { value: "live_session", label: "Live Sessions" },
    { value: "login", label: "Login Activity" },
    { value: "trial_booking", label: "Trial Bookings" },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Clock className="w-6 h-6 text-cyan-500 mr-2" />
          My Activity
        </h3>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {activityTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No activities found</p>
            <p className="text-sm text-gray-400">Start learning to see your activity here!</p>
          </div>
        ) : (
          filteredActivities.map((activity: Activity) => (
            <div
              key={activity.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border ${getActivityColor(activity.type)} hover:shadow-sm transition-shadow duration-200`}
            >
              <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-1">{activity.description}</p>
                <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>

                {activity.metadata && (
                  <div className="mt-2 text-xs text-gray-600">
                    {Object.entries(activity.metadata).map(([key, value]) => (
                      <span key={key} className="inline-block bg-white px-2 py-1 rounded mr-2">
                        {key}: {String(value)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UserActivity