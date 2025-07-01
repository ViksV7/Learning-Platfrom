"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { NotificationContextType, Notification, Toast } from "../types/notifications"

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: React.ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "info",
      title: "Welcome to Dashboard",
      message: "Your dashboard is ready to use. Explore all the features available.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
      category: "system",
    },
    {
      id: "2",
      type: "success",
      title: "Course Enrollment Successful",
      message: "You have successfully enrolled in AI + Blockchain Bootcamp.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
      category: "course",
    },
    {
      id: "3",
      type: "warning",
      title: "Assignment Due Soon",
      message: "Your Web3 project assignment is due in 2 days.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
      category: "assignment",
    },
  ])
  const [toasts, setToasts] = useState<Toast[]>([])

  const addNotification = useCallback((notificationData: Omit<Notification, "id" | "timestamp" | "isRead">) => {
    const notification: Notification = {
      ...notificationData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      isRead: false,
    }

    setNotifications((prev) => [notification, ...prev])

    // Also create a toast for immediate visibility
    addToast({
      type: notification.type,
      title: notification.title,
      message: notification.message,
      duration: 5000,
    })
  }, [])

  const addToast = useCallback((toastData: Omit<Toast, "id" | "timestamp">) => {
    const toast: Toast = {
      ...toastData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      duration: toastData.duration || 5000,
    }

    setToasts((prev) => [...prev, toast])

    // Auto remove toast after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(toast.id)
      }, toast.duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const unreadCount = notifications.filter((n) => !n.isRead).length

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          type: "info" as const,
          title: "New Course Available",
          message: "Advanced React Patterns course is now live!",
          category: "course" as const,
        },
        {
          type: "success" as const,
          title: "Assignment Submitted",
          message: "Your Web3 project has been submitted successfully.",
          category: "assignment" as const,
        },
        {
          type: "warning" as const,
          title: "Deadline Reminder",
          message: "Blockchain assignment due in 2 days.",
          category: "assignment" as const,
        },
        {
          type: "info" as const,
          title: "Live Session Starting",
          message: "Smart Contract Development session starts in 15 minutes.",
          category: "course" as const,
        },
        {
          type: "success" as const,
          title: "Certificate Earned",
          message: "Congratulations! You earned a certificate in Blockchain Basics.",
          category: "achievement" as const,
        },
      ]

      // Randomly add a notification every 20-40 seconds
      if (Math.random() > 0.8) {
        const randomNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)]
        addNotification(randomNotification)
      }
    }, 20000) // Check every 20 seconds

    return () => clearInterval(interval)
  }, [addNotification])

  const value: NotificationContextType = {
    notifications,
    toasts,
    addNotification,
    addToast,
    removeToast,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    unreadCount,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
