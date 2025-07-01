"use client"

import type React from "react"
import { memo } from "react"
import { Star, Users, Sparkles, TrendingUp, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useAIRecommendations } from "../hooks/use-ai-recommendations"
import { useAuth } from "../contexts/auth-context"

interface AIRecommendationsProps {
  currentCourseId?: string
  className?: string
}

const CourseCard = memo(({ course, onEnroll }: { course: any; onEnroll: (courseId: string) => void }) => (
  <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group">
    <CardContent className="p-4">
      <div className="aspect-video bg-gray-700 rounded-lg mb-3 overflow-hidden">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-400 text-xs">{course.instructor}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 mr-1" />
              <span className="text-gray-300">{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-gray-400">{course.students}</span>
            </div>
          </div>
          <Badge variant="outline" className="border-cyan-400 text-cyan-400 text-xs">
            {course.level}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-green-400 font-semibold">₹{course.price.toLocaleString()}</span>
          <Button
            size="sm"
            onClick={() => onEnroll(course.id)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-xs"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
))

CourseCard.displayName = "CourseCard"

const SkeletonCard = memo(() => (
  <Card className="bg-gray-800/50 border-gray-700">
    <CardContent className="p-4">
      <Skeleton className="aspect-video bg-gray-700 rounded-lg mb-3" />
      <div className="space-y-2">
        <Skeleton className="h-4 bg-gray-700" />
        <Skeleton className="h-3 bg-gray-700 w-2/3" />
        <div className="flex justify-between">
          <Skeleton className="h-3 bg-gray-700 w-1/3" />
          <Skeleton className="h-3 bg-gray-700 w-1/4" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 bg-gray-700 w-1/4" />
          <Skeleton className="h-6 bg-gray-700 w-1/3" />
        </div>
      </div>
    </CardContent>
  </Card>
))

SkeletonCard.displayName = "SkeletonCard"

const AIRecommendations: React.FC<AIRecommendationsProps> = memo(({ currentCourseId, className }) => {
  const { user } = useAuth()
  const { personalizedCourses, trendingCourses, similarCourses, isLoading, refreshRecommendations } =
    useAIRecommendations(currentCourseId)

  const handleEnroll = (courseId: string) => {
    // Handle course enrollment
    console.log("Enrolling in course:", courseId)
  }

  const RecommendationSection = memo(
    ({
      title,
      courses,
      icon: Icon,
      description,
    }: {
      title: string
      courses: any[]
      icon: any
      description: string
    }) => (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No recommendations available at the moment.</p>
            <Button variant="outline" onClick={refreshRecommendations} className="mt-2 border-gray-600 text-gray-400">
              Refresh Recommendations
            </Button>
          </div>
        )}
      </div>
    ),
  )

  RecommendationSection.displayName = "RecommendationSection"

  return (
    <div className={`space-y-8 ${className}`}>
      {/* AI Recommendations Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-6 w-6 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white">AI-Powered Recommendations</h1>
        </div>
        <p className="text-gray-400">Personalized course suggestions powered by machine learning algorithms</p>
      </div>

      {/* Personalized Recommendations */}
      {user && personalizedCourses.length > 0 && (
        <RecommendationSection
          title="Recommended for You"
          courses={personalizedCourses}
          icon={Target}
          description="Courses tailored to your interests and learning path"
        />
      )}

      {/* Similar Courses */}
      {currentCourseId && similarCourses.length > 0 && (
        <RecommendationSection
          title="Similar Courses"
          courses={similarCourses}
          icon={Target}
          description="Courses similar to what you're currently viewing"
        />
      )}

      {/* Trending Courses */}
      <RecommendationSection
        title="Trending Now"
        courses={trendingCourses}
        icon={TrendingUp}
        description="Most popular courses among learners this month"
      />

      {/* Refresh Button */}
      <div className="text-center">
        <Button
          onClick={refreshRecommendations}
          variant="outline"
          className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white"
          disabled={isLoading}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isLoading ? "Updating..." : "Refresh Recommendations"}
        </Button>
      </div>
    </div>
  )
})

AIRecommendations.displayName = "AIRecommendations"

export default AIRecommendations
