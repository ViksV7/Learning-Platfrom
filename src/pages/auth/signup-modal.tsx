"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Loader2,
  Check,
  X,
  GraduationCap,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
  onSignupSuccess: (userType: string, userData: any) => void
}

interface ValidationErrors {
  name?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
}

interface ToastProps {
  type: "success" | "error"
  message: string
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-[60] p-4 rounded-lg shadow-2xl border-2 transform transition-all duration-300 animate-slide-in ${
        type === "success"
          ? "bg-green-900/90 border-green-500 text-green-100"
          : "bg-red-900/90 border-red-500 text-red-100"
      }`}
    >
      <div className="flex items-center space-x-3">
        {type === "success" ? (
          <CheckCircle className="h-5 w-5 text-green-400" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-400" />
        )}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "student",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1)
      }
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const passwordRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /[a-z]/, text: "One lowercase letter" },
    { regex: /\d/, text: "One number" },
    { regex: /[^A-Za-z0-9]/, text: "One special character" },
  ]

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long"
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name can only contain letters and spaces"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone.trim() && !/^[+]?[0-9\s\-$$$$]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else {
      const failedRequirements = passwordRequirements.filter((req) => !req.regex.test(formData.password))
      if (failedRequirements.length > 0) {
        newErrors.password = "Password doesn't meet all requirements"
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getPasswordStrength = (password: string): number => {
    const score = passwordRequirements.reduce((acc, req) => {
      return acc + (req.regex.test(password) ? 1 : 0)
    }, 0)
    return (score / passwordRequirements.length) * 100
  }

  const getPasswordStrengthLabel = (strength: number): { label: string; color: string } => {
    if (strength < 40) return { label: "Weak", color: "text-red-400" }
    if (strength < 80) return { label: "Medium", color: "text-yellow-400" }
    return { label: "Strong", color: "text-green-400" }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      setToast({
        type: "error",
        message: "Please fix the errors below and try again",
      })
      return
    }

    if (!agreedToTerms) {
      setToast({
        type: "error",
        message: "Please agree to the terms and conditions",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success toast
      setToast({
        type: "success",
        message: "Account created successfully! Redirecting...",
      })

      // Create user data
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.userType,
        createdAt: new Date().toISOString(),
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        userType: "student",
      })
      setAgreedToTerms(false)
      setErrors({})

      // Call success callback with user type and data
      setTimeout(() => {
        onSignupSuccess(formData.userType, userData)
        onClose()
      }, 1500)
    } catch (error) {
      setToast({
        type: "error",
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error for this field when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleClose = () => {
    onClose()
    // Reset form and errors when closing
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      userType: "student",
    })
    setErrors({})
    setAgreedToTerms(false)
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthInfo = getPasswordStrengthLabel(passwordStrength)

  if (!isOpen) return null

  return (
    <>
      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>

      {/* Toast Notification */}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div
          className="bg-black border border-gray-700/50 text-white max-w-md w-full mx-4 shadow-2xl rounded-lg relative"
          style={{
            maxHeight: "95vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              width: 0px;
              background: transparent;
            }
          `}</style>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Join EduSpark
              </h2>
              <p className="text-gray-300 mt-2">Create your account and start your learning journey</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-3">
                <label className="text-white text-base font-semibold block">I want to join as:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange("userType", "student")}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all duration-300 ${
                      formData.userType === "student"
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                        : "border-gray-600 bg-black hover:border-gray-500 text-gray-300"
                    }`}
                  >
                    <GraduationCap className="h-5 w-5" />
                    <span className="font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange("userType", "instructor")}
                    className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all duration-300 ${
                      formData.userType === "instructor"
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                        : "border-gray-600 bg-black hover:border-gray-500 text-gray-300"
                    }`}
                  >
                    <Users className="h-5 w-5" />
                    <span className="font-medium">Instructor</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-white block">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-black border text-white rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-colors ${
                      errors.name ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-cyan-500"
                    }`}
                    placeholder="Rahul Sharma"
                    required
                  />
                </div>
                {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-white block">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-black border text-white rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-colors ${
                      errors.email ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-cyan-500"
                    }`}
                    placeholder="rahul@email.com"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-white block">
                  Phone Number <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-black border text-white rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-colors ${
                      errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-cyan-500"
                    }`}
                    placeholder="+91 98765 43210"
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-white block">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 bg-black border text-white rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-colors ${
                      errors.password ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-cyan-500"
                    }`}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}

                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Password strength:</span>
                      <span className={`text-sm font-medium ${strengthInfo.color}`}>{strengthInfo.label}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <div className="space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          {req.regex.test(formData.password) ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <X className="h-3 w-3 text-gray-400" />
                          )}
                          <span
                            className={`text-xs ${req.regex.test(formData.password) ? "text-green-400" : "text-gray-400"}`}
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-white block">
                  Confirm Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 bg-black border text-white rounded-lg focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-colors ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-cyan-500"
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-cyan-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 rounded border-gray-600 bg-black accent-cyan-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                  I agree to the{" "}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Privacy Policy
                  </a>
                  <span className="text-red-400"> *</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !agreedToTerms}
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 border-0 rounded-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Switch to Login */}
              <div className="text-center pt-2 pb-4">
                <span className="text-gray-300">Already have an account? </span>
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupModal
