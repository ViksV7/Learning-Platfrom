import type React from "react"
import type { Course } from "../types/dashboard"
import { AnimatedCard } from "./AnimatedCard"

interface CourseCardProps {
  course: Course
  showContinueButton?: boolean
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, showContinueButton = false }) => {
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: string } = {
      ai: "🤖",
      blockchain: "⛓️",
      web3: "🌐",
      fullstack: "💻",
    }
    return icons[iconName] || "📚"
  }

  return (
    <AnimatedCard gradient={course.color} className="min-h-32">
      <div className="flex items-center gap-5 h-full">
        <div className="w-16 h-16 rounded-xl bg-black bg-opacity-20 flex items-center justify-center text-4xl">
          {getIcon(course.icon)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 text-white">{course.title}</h3>
          <p className="text-sm mb-3 text-gray-300">{course.status}</p>
          {course.progress && (
            <div className="w-full h-2 bg-black bg-opacity-20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          )}
        </div>
        {showContinueButton && (
          <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-black border border-gray-600 rounded-lg text-white font-semibold hover:from-gray-600 hover:to-gray-900">
            Continue
          </button>
        )}
      </div>
    </AnimatedCard>
  )
}
