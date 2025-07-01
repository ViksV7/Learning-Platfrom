"use client"

import type React from "react"
import { Toast } from "./Toast"
import { useNotifications } from "../contexts/NotificationContext"

export const ToastContainer: React.FC = () => {
  const { toasts } = useNotifications()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}
