import type React from "react"

interface ShellProps {
  children: React.ReactNode
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  return <div className="container mx-auto py-10">{children}</div>
}
