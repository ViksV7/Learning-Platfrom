"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { Toast as ToastType } from "../types/notifications"
import { useNotifications } from "../contexts/NotificationContext"

interface ToastProps {
  toast: ToastType
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { removeToast } = useNotifications()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => removeToast(toast.id), 300)
  }

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-500 border-green-600"
      case "error":
        return "bg-red-500 border-red-600"
      case "warning":
        return "bg-yellow-500 border-yellow-600"
      case "info":
        return "bg-blue-500 border-blue-600"
      default:
        return "bg-gray-500 border-gray-600"
    }
  }

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "✓"
      case "error":
        return "✕"
      case "warning":
        return "⚠"
      case "info":
        return "ℹ"
      default:
        return "📢"
    }
  }

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out mb-4 max-w-sm w-full
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div className={`rounded-lg border shadow-lg ${getToastStyles()} text-white p-4`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-lg font-bold">{getIcon()}</span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{toast.title}</p>
            <p className="text-sm opacity-90 mt-1">{toast.message}</p>
            {toast.action && (
              <button onClick={toast.action.onClick} className="mt-2 text-sm underline hover:no-underline">
                {toast.action.label}
              </button>
            )}
          </div>
          <button onClick={handleClose} className="ml-4 flex-shrink-0 text-white hover:text-gray-200">
            <span className="sr-only">Close</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
