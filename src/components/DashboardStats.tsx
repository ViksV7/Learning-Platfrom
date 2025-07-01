import type React from "react"
import type { DashboardStats } from "../types"

interface DashboardStatsProps {
  stats: DashboardStats
  isAdmin: boolean
}

const DashboardStatsComponent: React.FC<DashboardStatsProps> = ({ stats, isAdmin }) => {
  if (!isAdmin) return null

  const statCards = [
    {
      title: "Total Students Enrolled",
      value: stats.totalStudents.toLocaleString(),
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      textColor: "text-white",
    },
    {
      title: "Active Courses",
      value: stats.activeCourses.toString(),
      icon: "📚",
      color: "from-white to-gray-50",
      textColor: "text-gray-900",
      border: "border border-gray-200",
    },
    {
      title: "Student Queries",
      value: stats.studentQueries.toString(),
      icon: "📈",
      color: "from-white to-gray-50",
      textColor: "text-gray-900",
      border: "border border-gray-200",
    },
    {
      title: "Student Queries / Support Tickets",
      value: stats.supportTickets.toString(),
      icon: "💬",
      color: "from-white to-gray-50",
      textColor: "text-gray-900",
      border: "border border-gray-200",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`
            bg-gradient-to-br ${card.color} ${card.border || ""} 
            rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 
            hover:scale-105 cursor-pointer
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${card.textColor} opacity-80`}>{card.title}</p>
              <p className={`text-3xl font-bold ${card.textColor} mt-2`}>{card.value}</p>
              {index === 0 && <p className={`text-sm ${card.textColor} opacity-80 mt-1`}>In Progress</p>}
            </div>
            <div className="text-4xl opacity-80">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStatsComponent
