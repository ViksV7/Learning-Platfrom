"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: "student" | "instructor" | "admin"
  enrolledCourses: string[]
  joinedDate: Date
  isEmailVerified?: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (data: SignupData) => Promise<{ success: boolean; message: string; requiresVerification?: boolean }>
  logout: () => void
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; message: string }>
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message: string }>
  socialLogin: (provider: "google" | "github" | "linkedin") => Promise<{ success: boolean; message: string }>
  resendVerificationEmail: (email: string) => Promise<{ success: boolean; message: string }>
  checkVerificationStatus: (email: string) => Promise<boolean>
}

interface SignupData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock users database
  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      avatar: "JD",
      role: "student" as const,
      enrolledCourses: ["1", "2"],
      joinedDate: new Date("2024-01-15"),
      isEmailVerified: true,
    },
    {
      id: "2",
      name: "Priya Singh",
      email: "priya@miraspark.com",
      password: "instructor123",
      avatar: "PS",
      role: "instructor" as const,
      enrolledCourses: [],
      joinedDate: new Date("2023-06-01"),
      isEmailVerified: true,
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@miraspark.com",
      password: "admin123",
      avatar: "AU",
      role: "admin" as const,
      enrolledCourses: [],
      joinedDate: new Date("2023-01-01"),
      isEmailVerified: true,
    },
  ]

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("userData")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        localStorage.removeItem("authToken")
        localStorage.removeItem("userData")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)

      // Store auth data
      localStorage.setItem("authToken", "mock-jwt-token")
      localStorage.setItem("userData", JSON.stringify(userWithoutPassword))

      setIsLoading(false)
      return { success: true, message: "Login successful!" }
    } else {
      setIsLoading(false)
      return { success: false, message: "Invalid email or password" }
    }
  }

  const signup = async (
    data: SignupData,
  ): Promise<{ success: boolean; message: string; requiresVerification?: boolean }> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, message: "User with this email already exists" }
    }

    setIsLoading(false)
    return {
      success: true,
      message: "Account created successfully! Please check your email for verification.",
      requiresVerification: true,
    }
  }

  const socialLogin = async (
    provider: "google" | "github" | "linkedin",
  ): Promise<{ success: boolean; message: string }> => {
    // Simulate OAuth flow delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful social login
    const socialUser = {
      id: Date.now().toString(),
      name: `${provider} User`,
      email: `user@${provider}.com`,
      avatar: provider.charAt(0).toUpperCase() + provider.slice(1).charAt(0),
      role: "student" as const,
      enrolledCourses: [],
      joinedDate: new Date(),
      isEmailVerified: true,
    }

    setUser(socialUser)
    localStorage.setItem("authToken", "mock-jwt-token")
    localStorage.setItem("userData", JSON.stringify(socialUser))

    return { success: true, message: `Successfully signed in with ${provider}` }
  }

  const resendVerificationEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: "Verification email sent successfully!" }
  }

  const checkVerificationStatus = async (email: string): Promise<boolean> => {
    // Simulate checking verification status
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Mock: return true after 30 seconds for demo purposes
    return Math.random() > 0.8 // 20% chance of being verified on each check
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
  }

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser) {
      return { success: true, message: "Password reset link sent to your email!" }
    } else {
      return { success: false, message: "No account found with this email address" }
    }
  }

  const resetPassword = async (token: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you'd validate the token here
    return { success: true, message: "Password reset successfully!" }
  }

  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; message: string }> => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("userData", JSON.stringify(updatedUser))
      return { success: true, message: "Profile updated successfully!" }
    }
    return { success: false, message: "No user logged in" }
  }

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    socialLogin,
    resendVerificationEmail,
    checkVerificationStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
