export type NotificationType = "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
  timestamp: Date
  isRead?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  category: "system" | "course" | "assignment" | "message" | "achievement"
  metadata?: {
    courseId?: string
    userId?: string
    actionUrl?: string
  }
}

export interface NotificationContextType {
  notifications: Notification[]
  toasts: Toast[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => void
  addToast: (toast: Omit<Toast, "id" | "timestamp">) => void
  removeToast: (id: string) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
  unreadCount: number
}
