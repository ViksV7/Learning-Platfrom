"use client"

import { useState } from "react"
import { Bell, X, Check, Clock, Award, MessageCircle, CreditCard, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  type: "course" | "assignment" | "achievement" | "payment" | "forum" | "deadline"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "course",
      title: "New Lesson Available",
      message: "Smart Contract Security module has been updated with new content",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      actionUrl: "/course/2",
    },
    {
      id: "2",
      type: "assignment",
      title: "Assignment Due Soon",
      message: "Your Solidity Basics assignment is due in 2 days",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      actionUrl: "/dashboard",
    },
    {
      id: "3",
      type: "achievement",
      title: "Congratulations! 🎉",
      message: "You've completed 50% of the Smart Contract Development course",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: false,
    },
    {
      id: "4",
      type: "forum",
      title: "New Reply to Your Question",
      message: "Someone replied to your question about gas optimization",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      read: true,
      actionUrl: "/forum/smart-contracts",
    },
    {
      id: "5",
      type: "payment",
      title: "Payment Successful",
      message: "Your enrollment for Web3 Full Stack Development is confirmed",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
    },
    {
      id: "6",
      type: "deadline",
      title: "Upcoming Deadline",
      message: "Final project submission deadline is tomorrow",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4 text-blue-400" />
      case "assignment":
        return <Clock className="h-4 w-4 text-orange-400" />
      case "achievement":
        return <Award className="h-4 w-4 text-yellow-400" />
      case "payment":
        return <CreditCard className="h-4 w-4 text-green-400" />
      case "forum":
        return <MessageCircle className="h-4 w-4 text-purple-400" />
      case "deadline":
        return <Clock className="h-4 w-4 text-red-400" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-300 hover:text-white"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 z-50">
          <Card className="bg-gray-900/95 backdrop-blur-md border-gray-700 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-white text-lg">Notifications</CardTitle>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={markAllAsRead}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-1 p-4">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                          notification.read
                            ? "bg-gray-800/30 hover:bg-gray-800/50"
                            : "bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20"
                        }`}
                        onClick={() => {
                          markAsRead(notification.id)
                          if (notification.actionUrl) {
                            window.location.href = notification.actionUrl
                          }
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p
                                className={`text-sm font-medium ${notification.read ? "text-gray-300" : "text-white"}`}
                              >
                                {notification.title}
                              </p>
                              {!notification.read && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                            </div>
                            <p className={`text-sm ${notification.read ? "text-gray-500" : "text-gray-400"} mt-1`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">{formatTimestamp(notification.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Notifications
