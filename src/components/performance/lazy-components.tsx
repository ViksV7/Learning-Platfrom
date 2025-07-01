"use client"

import type React from "react"
import { Suspense, lazy } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

// Lazy load heavy components
export const LazyAIRecommendations = lazy(() => import("../ai-recommendations"))
export const LazyStreamPlayer = lazy(() => import("../live-streaming/stream-player"))
export const LazyCourseWizard = lazy(() => import("../course-creation/course-wizard"))
// export const LazyAdminDashboard = lazy(() => import("../../pages/admin/Dashboard"))

// Loading components
export const RecommendationsLoading = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <Skeleton className="h-8 w-64 mx-auto bg-gray-700" />
      <Skeleton className="h-4 w-96 mx-auto bg-gray-700" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-4">
            <Skeleton className="aspect-video bg-gray-700 rounded-lg mb-3" />
            <Skeleton className="h-4 bg-gray-700 mb-2" />
            <Skeleton className="h-3 bg-gray-700 w-2/3 mb-2" />
            <div className="flex justify-between">
              <Skeleton className="h-3 bg-gray-700 w-1/3" />
              <Skeleton className="h-6 bg-gray-700 w-1/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)

export const StreamPlayerLoading = () => (
  <Card className="bg-gray-800/50 border-gray-700">
    <CardContent className="p-0">
      <Skeleton className="aspect-video bg-gray-700" />
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-48 bg-gray-700" />
            <Skeleton className="h-3 w-32 bg-gray-700" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 bg-gray-700" />
            <Skeleton className="h-8 w-8 bg-gray-700" />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 bg-gray-700" />
            <Skeleton className="h-8 w-8 bg-gray-700" />
            <Skeleton className="h-4 w-20 bg-gray-700" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-8 bg-gray-700" />
            <Skeleton className="h-8 w-8 bg-gray-700" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

export const CourseWizardLoading = () => (
  <div className="min-h-screen pt-20 pb-10">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Skeleton className="h-8 w-64 bg-gray-700 mb-2" />
        <Skeleton className="h-4 w-96 bg-gray-700" />
      </div>
      <div className="mb-8">
        <Skeleton className="h-2 w-full bg-gray-700" />
      </div>
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <div className="space-y-6">
            <Skeleton className="h-6 w-48 bg-gray-700" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-10 bg-gray-700" />
              <Skeleton className="h-10 bg-gray-700" />
            </div>
            <Skeleton className="h-24 bg-gray-700" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-10 bg-gray-700" />
              <Skeleton className="h-10 bg-gray-700" />
              <Skeleton className="h-10 bg-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)

// Wrapper components with Suspense
export const AIRecommendationsWithSuspense: React.FC<any> = (props) => (
  <Suspense fallback={<RecommendationsLoading />}>
    <LazyAIRecommendations {...props} />
  </Suspense>
)

export const StreamPlayerWithSuspense: React.FC<any> = (props) => (
  <Suspense fallback={<StreamPlayerLoading />}>
    <LazyStreamPlayer {...props} />
  </Suspense>
)

export const CourseWizardWithSuspense: React.FC<any> = (props) => (
  <Suspense fallback={<CourseWizardLoading />}>
    <LazyCourseWizard {...props} />
  </Suspense>
)
