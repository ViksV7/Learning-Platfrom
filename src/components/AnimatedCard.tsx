"use client"

import type React from "react"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  gradient?: string
  onClick?: () => void
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  gradient = "from-gray-900 to-black",
  onClick,
}) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl p-6 
        bg-gradient-to-br ${gradient} 
        border border-gray-800 backdrop-blur-sm
        hover:border-gray-700 cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      <div className="relative z-10">{children}</div>
    </div>
  )
}
