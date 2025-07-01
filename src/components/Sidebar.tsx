"use client"

import type React from "react"
import { useState } from "react"
import type { NavigationItem, User } from "../types/dashboard"

interface SidebarProps {
  user: User
  navigation: NavigationItem[]
  title: string
  onNavigate?: (path: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ user, navigation, title, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: string } = {
      dashboard: "📊",
      courses: "📚",
      students: "👥",
      mentor: "👨‍🏫",
      schedule: "📅",
      certificates: "🏆",
      internship: "💼",
      payments: "💳",
      settings: "⚙️",
      browse: "🔍",
      video: "🎥",
      assignments: "📝",
      forums: "💬",
      support: "🎧",
    }
    return icons[iconName] || "📋"
  }

  const handleNavigation = (path: string) => {
    onNavigate?.(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md shadow-lg border border-[#0097A7]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col shadow-2xl border-r border-[#0097A7]
      `}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-white truncate">{title}</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-left
                hover:bg-gray-700 hover:translate-x-1 group
                ${
                  item.isActive
                    ? "bg-gradient-to-r from-[#0097A7] to-blue-600 text-white shadow-lg shadow-[#0097A7]/25"
                    : "text-gray-300 hover:text-white"
                }
              `}
            >
              <span className={`mr-3 text-lg flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                item.isActive ? "text-white" : "text-gray-400"
              }`}>
                {getIcon(item.icon)}
              </span>
              <span className="truncate font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={() => handleNavigation("/profile")}
            className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-[#0097A7] to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}