"use client"

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// Define the Activity interface
export interface Activity {
  id: string
  userId: string
  userName: string
  userEmail: string
  type: 'course_enrollment' | 'lesson_completed' | 'payment' | 'forum_post' | 'live_session' | 'login' | 'trial_booking'
  description: string
  timestamp: string
  metadata?: Record<string, any>
}

// Define the context interface
interface ActivityContextType {
  activities: Activity[]
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void
  getAllActivities: () => Activity[]
  getActivitiesByUser: (userId: string) => Activity[]
  getUserActivities: (userId: string) => Activity[]
  getActivitiesByType: (type: Activity['type']) => Activity[]
  clearActivities: () => void
}

// Create the context
const ActivityContext = createContext<ActivityContextType | undefined>(undefined)

// Sample data for demonstration
const sampleActivities: Activity[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    type: 'course_enrollment',
    description: 'Enrolled in React Fundamentals course',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    type: 'lesson_completed',
    description: 'Completed lesson: Introduction to TypeScript',
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Mike Johnson',
    userEmail: 'mike.johnson@example.com',
    type: 'payment',
    description: 'Payment successful for Pro subscription',
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: '4',
    userId: 'user1',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    type: 'forum_post',
    description: 'Posted a question in React forum',
    timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
  },
  {
    id: '5',
    userId: 'user4',
    userName: 'Sarah Wilson',
    userEmail: 'sarah.wilson@example.com',
    type: 'live_session',
    description: 'Joined live session: Advanced React Patterns',
    timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
  },
  {
    id: '6',
    userId: 'user2',
    userName: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    type: 'login',
    description: 'User logged in',
    timestamp: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
  },
  {
    id: '7',
    userId: 'user5',
    userName: 'David Brown',
    userEmail: 'david.brown@example.com',
    type: 'trial_booking',
    description: 'Booked trial session for JavaScript course',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: '8',
    userId: 'user3',
    userName: 'Mike Johnson',
    userEmail: 'mike.johnson@example.com',
    type: 'lesson_completed',
    description: 'Completed lesson: React Hooks Deep Dive',
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  {
    id: '9',
    userId: 'user6',
    userName: 'Emma Davis',
    userEmail: 'emma.davis@example.com',
    type: 'course_enrollment',
    description: 'Enrolled in Advanced JavaScript course',
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
  },
  {
    id: '10',
    userId: 'user4',
    userName: 'Sarah Wilson',
    userEmail: 'sarah.wilson@example.com',
    type: 'payment',
    description: 'Payment successful for Premium course bundle',
    timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
  },
]

// Provider component
interface ActivityProviderProps {
  children: ReactNode
}

export const ActivityProvider: React.FC<ActivityProviderProps> = ({ children }) => {
  const [activities, setActivities] = useState<Activity[]>(sampleActivities)

  const addActivity = useCallback((newActivity: Omit<Activity, 'id' | 'timestamp'>) => {
    const activity: Activity = {
      ...newActivity,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    }
    setActivities(prev => [activity, ...prev])
  }, [])

  const getAllActivities = useCallback(() => {
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [activities])

  const getActivitiesByUser = useCallback((userId: string) => {
    return activities.filter(activity => activity.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [activities])

  const getUserActivities = useCallback((userId: string) => {
    return activities.filter(activity => activity.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [activities])

  const getActivitiesByType = useCallback((type: Activity['type']) => {
    return activities.filter(activity => activity.type === type)
  }, [activities])

  const clearActivities = useCallback(() => {
    setActivities([])
  }, [])

  const value: ActivityContextType = {
    activities,
    addActivity,
    getAllActivities,
    getActivitiesByUser,
    getUserActivities,
    getActivitiesByType,
    clearActivities,
  }

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  )
}

// Custom hook to use the activity context
export const useActivity = (): ActivityContextType => {
  const context = useContext(ActivityContext)
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider')
  }
  return context
}