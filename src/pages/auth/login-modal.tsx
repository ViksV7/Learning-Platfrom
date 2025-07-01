"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  User,
  GraduationCap,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
} from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignup: () => void
  onSwitchToForgotPassword: () => void
  onLoginSuccess: (userType: string, userData: any) => void
}

interface FormErrors {
  email?: string
  password?: string
}

interface ToastState {
  show: boolean
  type: "success" | "error" | "warning"
  title: string
  message: string
}

const LoginModal = ({
  isOpen,
  onClose,
  onSwitchToSignup,
  onSwitchToForgotPassword,
  onLoginSuccess,
}: LoginModalProps) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("student") // student, instructor, admin
  const [errors, setErrors] = useState<FormErrors>({})
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: "success",
    title: "",
    message: "",
  })

  // Animation trigger on mount
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Custom Toast Component
  const CustomToast = ({ toast, onClose }: { toast: ToastState; onClose: () => void }) => {
    if (!toast.show) return null

    const getToastStyles = () => {
      switch (toast.type) {
        case "success":
          return "bg-green-900/90 border-green-500/50 text-green-100 shadow-2xl shadow-green-500/20"
        case "error":
          return "bg-red-900/90 border-red-500/50 text-red-100 shadow-2xl shadow-red-500/20"
        case "warning":
          return "bg-yellow-900/90 border-yellow-500/50 text-yellow-100 shadow-2xl shadow-yellow-500/20"
        default:
          return "bg-gray-900/90 border-gray-500/50 text-gray-100 shadow-2xl shadow-gray-500/20"
      }
    }

    const getIcon = () => {
      switch (toast.type) {
        case "success":
          return <CheckCircle className="h-5 w-5 text-green-400 drop-shadow-lg" />
        case "error":
          return <XCircle className="h-5 w-5 text-red-400 drop-shadow-lg" />
        case "warning":
          return <AlertCircle className="h-5 w-5 text-yellow-400 drop-shadow-lg" />
        default:
          return null
      }
    }

    return (
      <div className="fixed top-4 right-4 z-[9999] max-w-sm w-full">
        <div className={`border rounded-lg p-4 backdrop-blur-md ${getToastStyles()} transform transition-all duration-500 animate-in slide-in-from-right`}>
          <div className="flex items-start gap-3">
            {getIcon()}
            <div className="flex-1">
              <h4 className="font-semibold text-sm drop-shadow-md">{toast.title}</h4>
              <p className="text-sm opacity-90 mt-1 drop-shadow-sm">{toast.message}</p>
            </div>
            <button onClick={onClose} className="text-current/60 hover:text-current transition-colors">
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  const showToast = (type: ToastState["type"], title: string, message: string) => {
    setToast({ show: true, type, title, message })
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }))
    }, 5000)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Demo users for different roles
  const demoUsers = {
    student: {
      email: "student@demo.com",
      password: "student123",
      userData: {
        id: "1",
        name: "Rahul Sharma",
        email: "student@demo.com",
        role: "user", // Changed to match your dashboard config
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    instructor: {
      email: "instructor@demo.com",
      password: "instructor123",
      userData: {
        id: "2",
        name: "Priya Singh",
        email: "instructor@demo.com",
        role: "instructor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    admin: {
      email: "admin@demo.com",
      password: "admin123",
      userData: {
        id: "3",
        name: "Amit Kumar",
        email: "admin@demo.com",
        role: "admin",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
  }

  const getRedirectPath = (userRole: string) => {
    switch (userRole) {
      case "user":
      case "student":
        return "/dashboard"
      case "admin":
        return "/admin"
      case "instructor":
        return "/dashboard" // or create a separate instructor dashboard
      default:
        return "/dashboard"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast("error", "Validation Error", "Please fix the errors below")
      return
    }

    setIsLoading(true)

    try {
      // Simulate login API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check demo credentials
      const demoUser = demoUsers[userType as keyof typeof demoUsers]
      const isValidDemo = formData.email === demoUser.email && formData.password === demoUser.password

      // Also allow any email/password for demo purposes
      const isSuccess = isValidDemo || formData.password.length >= 6

      if (isSuccess) {
        const userData = isValidDemo
          ? demoUser.userData
          : {
              id: Date.now().toString(),
              name: formData.email.split("@")[0],
              email: formData.email,
              role: userType === "student" ? "user" : userType, // Map student to user
              avatar: "/placeholder.svg?height=40&width=40",
            }

        showToast("success", "Welcome back!", `Logged in as ${userType}`)

        // Call the login success callback
        onLoginSuccess(userData.role, userData)

        setTimeout(() => {
          // Redirect based on user role
          const redirectPath = getRedirectPath(userData.role)
          navigate(redirectPath)
          
          // Close modal and reset form
          onClose()
          setFormData({ email: "", password: "" })
          setErrors({})
        }, 1000)
      } else {
        showToast("error", "Login failed", "Invalid credentials. Please try again.")
      }
    } catch (error) {
      showToast("error", "Error", "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "student":
        return <User className="h-4 w-4" />
      case "instructor":
        return <GraduationCap className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getUserTypeColor = (type: string, isSelected: boolean) => {
    if (isSelected) {
      switch (type) {
        case "student":
          return "bg-teal-500/20 border-teal-500 text-teal-400 shadow-lg shadow-teal-500/25"
        case "instructor":
          return "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/25"
        case "admin":
          return "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-lg shadow-cyan-500/25"
        default:
          return "bg-teal-500/20 border-teal-500 text-teal-400 shadow-lg shadow-teal-500/25"
      }
    }
    return "bg-gray-950/60 border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-900/60 shadow-lg shadow-black/10"
  }

  const fillDemoCredentials = () => {
    const demoUser = demoUsers[userType as keyof typeof demoUsers]
    setFormData({
      email: demoUser.email,
      password: demoUser.password,
    })
    setErrors({})
  }

  if (!isOpen) return null

  return (
    <>
      <CustomToast toast={toast} onClose={() => setToast((prev) => ({ ...prev, show: false }))} />

      {/* Enhanced Modal overlay with animated background */}
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/90 backdrop-blur-md">
        {/* Animated Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-teal-400/8 rounded-full blur-3xl animate-pulse shadow-2xl shadow-teal-500/10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-emerald-400/6 rounded-full blur-3xl animate-pulse shadow-2xl shadow-emerald-500/10" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-48 sm:h-48 bg-cyan-400/5 rounded-full blur-3xl animate-pulse shadow-2xl shadow-cyan-500/8" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-teal-400/20 rounded-full animate-float shadow-lg shadow-teal-400/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Enhanced Modal Container with Gradient Border */}
        <div className={`relative max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto z-[9999] transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 via-emerald-400/30 to-cyan-400/30 rounded-2xl blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 via-emerald-400/20 to-cyan-400/20 rounded-2xl"></div>
          
          {/* Main Modal Content */}
          <div className="relative bg-black/95 backdrop-blur-xl border border-teal-400/30 rounded-2xl shadow-2xl shadow-teal-500/20 overflow-hidden">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[10000] text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-800/50"
            >
              <XCircle className="h-6 w-6 drop-shadow-lg" />
            </button>

            {/* Animated Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 via-transparent to-emerald-400/5 opacity-50"></div>
            
            <div className="relative z-10 p-6 sm:p-8">
              {/* Enhanced Header */}
              <div className={`text-center mb-6 sm:mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                {/* Animated Badge */}
                <div className="inline-flex items-center px-3 py-1 mb-4 bg-gray-900/50 backdrop-blur-sm rounded-full border border-teal-400/20 shadow-lg shadow-teal-500/10">
                  <Star className="h-3 w-3 text-teal-300 mr-2 animate-spin drop-shadow-lg" />
                  <span className="text-xs text-teal-100 font-medium drop-shadow-md">Secure Login</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-200 via-teal-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl">
                  Welcome Back
                </h2>
                <p className="text-gray-300 mt-2 drop-shadow-lg">Sign in to your account to continue</p>
              </div>

              {/* Enhanced User Type Selection */}
              <div className={`space-y-3 mb-6 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <label className="text-white text-sm flex items-center gap-2 drop-shadow-md">
                  {getUserTypeIcon(userType)}
                  Login as:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUserType("student")}
                    className={`p-3 border rounded-xl text-center transition-all duration-300 hover:scale-105 ${getUserTypeColor("student", userType === "student")}`}
                  >
                    <User className="h-5 w-5 mx-auto mb-1 drop-shadow-lg" />
                    <div className="font-medium text-sm drop-shadow-md">Student</div>
                    <div className="text-xs text-gray-400 mt-1 drop-shadow-sm">Learn</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("instructor")}
                    className={`p-3 border rounded-xl text-center transition-all duration-300 hover:scale-105 ${getUserTypeColor("instructor", userType === "instructor")}`}
                  >
                    <GraduationCap className="h-5 w-5 mx-auto mb-1 drop-shadow-lg" />
                    <div className="font-medium text-sm drop-shadow-md">Instructor</div>
                    <div className="text-xs text-gray-400 mt-1 drop-shadow-sm">Teach</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("admin")}
                    className={`p-3 border rounded-xl text-center transition-all duration-300 hover:scale-105 ${getUserTypeColor("admin", userType === "admin")}`}
                  >
                    <Shield className="h-5 w-5 mx-auto mb-1 drop-shadow-lg" />
                    <div className="font-medium text-sm drop-shadow-md">Admin</div>
                    <div className="text-xs text-gray-400 mt-1 drop-shadow-sm">Manage</div>
                  </button>
                </div>
              </div>

              {/* Enhanced Demo Credentials */}
              <div className={`mb-4 p-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-teal-400/20 shadow-lg shadow-teal-500/10 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-300 drop-shadow-md">
                    <strong className="text-teal-300">Demo {userType}:</strong> {demoUsers[userType as keyof typeof demoUsers].email}
                  </div>
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="text-xs bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-3 py-1 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-teal-500/25"
                  >
                    Fill
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className={`space-y-4 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white text-sm font-medium drop-shadow-md">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-teal-400 transition-colors duration-300 drop-shadow-lg" />
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-950/50 border text-white rounded-xl focus:ring-2 focus:ring-teal-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-lg shadow-black/10 hover:bg-gray-950/70 ${
                          errors.email ? "border-red-500 focus:border-red-500" : "border-teal-400/20 focus:border-teal-400"
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm flex items-center gap-1 drop-shadow-md">
                        <XCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-white text-sm font-medium drop-shadow-md">
                      Password
                    </label>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-teal-400 transition-colors duration-300 drop-shadow-lg" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`w-full pl-10 pr-10 py-3 bg-gray-950/50 border text-white rounded-xl focus:ring-2 focus:ring-teal-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm shadow-lg shadow-black/10 hover:bg-gray-950/70 ${
                          errors.password
                            ? "border-red-500 focus:border-red-500"
                            : "border-teal-400/20 focus:border-teal-400"
                        }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-gray-800/50"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 drop-shadow-lg" /> : <Eye className="h-4 w-4 drop-shadow-lg" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-sm flex items-center gap-1 drop-shadow-md">
                        <XCircle className="h-4 w-4" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div className={`flex items-center justify-between transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="rounded border-teal-400/20 bg-gray-950/50 text-teal-500 focus:ring-teal-500/20 transition-all duration-300"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 drop-shadow-sm">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={onSwitchToForgotPassword}
                    className="text-sm text-teal-400 hover:text-teal-300 transition-all duration-300 hover:scale-105 drop-shadow-md"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white py-3 text-lg shadow-2xl hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden hover:scale-105 group transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
                  style={{ transitionDelay: '1200ms' }}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin drop-shadow-lg" />
                      <span className="drop-shadow-md">Signing in...</span>
                    </>
                  ) : (
                    <>
                      {getUserTypeIcon(userType)}
                      <span className="ml-2 drop-shadow-md">Login as {userType}</span>
                    </>
                  )}
                </button>

                {/* Enhanced Sign Up Button */}
                <div className={`text-center transform transition-all duration-1000 delay-1400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                  <p className="text-gray-400 text-sm drop-shadow-sm">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToSignup}
                      className="text-teal-400 hover:text-teal-300 font-medium transition-all duration-300 hover:scale-105 drop-shadow-md"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginModal