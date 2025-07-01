"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/auth-context"

interface Course {
  id: string
  title: string
  instructor: string
  rating: number
  students: number
  price: number
  thumbnail: string
  category: string
  level: string
  duration: string
  tags: string[]
}

interface RecommendationEngine {
  personalizedCourses: Course[]
  trendingCourses: Course[]
  similarCourses: Course[]
  isLoading: boolean
  refreshRecommendations: () => void
}

export const useAIRecommendations = (currentCourseId?: string): RecommendationEngine => {
  const { user } = useAuth()
  const [personalizedCourses, setPersonalizedCourses] = useState<Course[]>([])
  const [trendingCourses, setTrendingCourses] = useState<Course[]>([])
  const [similarCourses, setSimilarCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock course database
  const allCourses: Course[] = [
    {
      id: "1",
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 2341,
      price: 35000,
      thumbnail: "/placeholder.svg?height=200&width=300",
      category: "Web Development",
      level: "Advanced",
      duration: "6 weeks",
      tags: ["react", "javascript", "frontend", "patterns"],
    },
    {
      id: "2",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Amit Kumar",
      rating: 4.9,
      students: 1876,
      price: 45000,
      thumbnail: "/placeholder.svg?height=200&width=300",
      category: "AI/ML",
      level: "Beginner",
      duration: "8 weeks",
      tags: ["machine-learning", "python", "ai", "data-science"],
    },
    {
      id: "3",
      title: "Cloud Architecture Mastery",
      instructor: "Michael Chen",
      rating: 4.7,
      students: 1543,
      price: 55000,
      thumbnail: "/placeholder.svg?height=200&width=300",
      category: "Cloud Computing",
      level: "Intermediate",
      duration: "10 weeks",
      tags: ["aws", "cloud", "architecture", "devops"],
    },
    {
      id: "4",
      title: "Mobile App Development with Flutter",
      instructor: "Priya Patel",
      rating: 4.6,
      students: 987,
      price: 40000,
      thumbnail: "/placeholder.svg?height=200&width=300",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "7 weeks",
      tags: ["flutter", "dart", "mobile", "cross-platform"],
    },
    {
      id: "5",
      title: "Cybersecurity Essentials",
      instructor: "Robert Singh",
      rating: 4.8,
      students: 2156,
      price: 38000,
      thumbnail: "/placeholder.svg?height=200&width=300",
      category: "Security",
      level: "Beginner",
      duration: "5 weeks",
      tags: ["security", "ethical-hacking", "networking", "privacy"],
    },
    {
      id: "6",
      title: "Data Visualization with D3.js",
      instructor: "Lisa Wang",
      rating: 4.5,
      students: 743,
      price: 32000,
      thumbnail: "/placeholder.svg?height=200&width=300",
      category: "Data Science",
      level: "Advanced",
      duration: "4 weeks",
      tags: ["d3js", "visualization", "javascript", "data"],
    },
  ]

  // AI Recommendation Algorithm
  const generateRecommendations = async () => {
    setIsLoading(true)

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!user) {
      // For non-authenticated users, show trending courses
      const trending = allCourses.sort((a, b) => b.students - a.students).slice(0, 4)

      setTrendingCourses(trending)
      setPersonalizedCourses([])
      setSimilarCourses([])
      setIsLoading(false)
      return
    }

    // Personalized recommendations based on user profile
    const userInterests = getUserInterests(user)
    const userLevel = getUserLevel(user)

    // Score courses based on user preferences
    const scoredCourses = allCourses.map((course) => ({
      ...course,
      score: calculateRecommendationScore(course, userInterests, userLevel, user.enrolledCourses),
    }))

    // Personalized courses (highest scoring)
    const personalized = scoredCourses
      .filter((course) => !user.enrolledCourses.includes(course.id))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)

    // Trending courses (most popular)
    const trending = allCourses
      .filter((course) => !user.enrolledCourses.includes(course.id))
      .sort((a, b) => b.students - a.students)
      .slice(0, 4)

    // Similar courses (if viewing a specific course)
    let similar: Course[] = []
    if (currentCourseId) {
      const currentCourse = allCourses.find((c) => c.id === currentCourseId)
      if (currentCourse) {
        similar = findSimilarCourses(currentCourse, allCourses)
          .filter((course) => course.id !== currentCourseId && !user.enrolledCourses.includes(course.id))
          .slice(0, 4)
      }
    }

    setPersonalizedCourses(personalized)
    setTrendingCourses(trending)
    setSimilarCourses(similar)
    setIsLoading(false)
  }

  // Helper functions for AI algorithm
  const getUserInterests = (user: any): string[] => {
    // In a real app, this would analyze user's course history, search history, etc.
    const enrolledCourseIds = user.enrolledCourses || []
    const interests: string[] = []

    enrolledCourseIds.forEach((courseId: string) => {
      const course = allCourses.find((c) => c.id === courseId)
      if (course) {
        interests.push(...course.tags)
      }
    })

    return [...new Set(interests)] // Remove duplicates
  }

  const getUserLevel = (user: any): string => {
    // Determine user level based on completed courses
    const enrolledCount = user.enrolledCourses?.length || 0
    if (enrolledCount === 0) return "Beginner"
    if (enrolledCount <= 2) return "Beginner"
    if (enrolledCount <= 5) return "Intermediate"
    return "Advanced"
  }

  const calculateRecommendationScore = (
    course: Course,
    userInterests: string[],
    userLevel: string,
    enrolledCourses: string[],
  ): number => {
    let score = 0

    // Interest matching (40% weight)
    const interestMatch = course.tags.filter((tag) =>
      userInterests.some((interest) => interest.toLowerCase().includes(tag.toLowerCase())),
    ).length
    score += (interestMatch / course.tags.length) * 40

    // Level appropriateness (25% weight)
    const levelScore =
      course.level === userLevel
        ? 25
        : course.level === "Beginner" && userLevel === "Intermediate"
          ? 15
          : course.level === "Intermediate" && userLevel === "Advanced"
            ? 15
            : 5
    score += levelScore

    // Popularity (20% weight)
    const maxStudents = Math.max(...allCourses.map((c) => c.students))
    score += (course.students / maxStudents) * 20

    // Rating (15% weight)
    score += (course.rating / 5) * 15

    return score
  }

  const findSimilarCourses = (targetCourse: Course, allCourses: Course[]): Course[] => {
    return allCourses
      .map((course) => ({
        ...course,
        similarity: calculateSimilarity(targetCourse, course),
      }))
      .sort((a, b) => b.similarity - a.similarity)
  }

  const calculateSimilarity = (course1: Course, course2: Course): number => {
    let similarity = 0

    // Category match (40% weight)
    if (course1.category === course2.category) similarity += 40

    // Tag overlap (35% weight)
    const commonTags = course1.tags.filter((tag) => course2.tags.includes(tag))
    similarity += (commonTags.length / Math.max(course1.tags.length, course2.tags.length)) * 35

    // Level match (15% weight)
    if (course1.level === course2.level) similarity += 15

    // Rating similarity (10% weight)
    const ratingDiff = Math.abs(course1.rating - course2.rating)
    similarity += Math.max(0, 1 - ratingDiff / 5) * 10

    return similarity
  }

  const refreshRecommendations = () => {
    generateRecommendations()
  }

  useEffect(() => {
    generateRecommendations()
  }, [user, currentCourseId])

  return {
    personalizedCourses,
    trendingCourses,
    similarCourses,
    isLoading,
    refreshRecommendations,
  }
}
