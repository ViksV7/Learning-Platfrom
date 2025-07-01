"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, User, Mail, Phone, CheckCircle, ArrowRight, Crown, Sparkles } from "lucide-react"

interface TrialBookingPopupProps {
  isOpen: boolean
  onClose: () => void
  onBookTrial: (data: any) => void
}

const TrialBookingPopup: React.FC<TrialBookingPopupProps> = ({ isOpen, onClose, onBookTrial }) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agreeToSMS: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Reset form when popup closes
  useEffect(() => {
    if (!isOpen) {
      setShowForm(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        agreeToSMS: false,
      })
      setErrors({})
    }
  }, [isOpen])

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create trial booking data
      const trialData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: `+91${formData.phone}`,
        agreeToSMS: formData.agreeToSMS,
        status: "pending",
        createdAt: new Date().toISOString(),
        type: "trial_booking",
      }

      // Save to localStorage for demo
      const existingBookings = JSON.parse(localStorage.getItem("trialBookings") || "[]")
      existingBookings.push(trialData)
      localStorage.setItem("trialBookings", JSON.stringify(existingBookings))

      onBookTrial(trialData)
      onClose()

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        agreeToSMS: false,
      })
    } catch (error) {
      console.error("Error booking trial:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleBookTrialClick = () => {
    setShowForm(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Teal gradient border container */}
      <div className="relative rounded-3xl p-[3px] bg-gradient-to-r from-[#0097A7] via-cyan-500 to-[#0097A7]">
        <div className="bg-gradient-to-br from-black via-gray-900 to-blue-950 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>

          {!showForm ? (
            // Initial popup with just the button
            <div className="p-8 text-center">
              {/* Header with celebration graphics */}
              <div className="mb-8 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 left-4">
                  <Sparkles className="w-6 h-6 text-[#0097A7]" />
                </div>
                <div className="absolute top-2 right-6">
                  <Crown className="w-8 h-8 text-[#0097A7]" />
                </div>
                <div className="absolute bottom-0 left-6">
                  <div className="w-4 h-4 bg-[#0097A7] rounded-full"></div>
                </div>
                <div className="absolute bottom-2 right-4">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                </div>
                
                {/* Main celebration icon */}
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#0097A7] to-cyan-500 rounded-full flex items-center justify-center relative">
                  <Crown className="w-10 h-10 text-white" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">You're Awesome!</h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-sm mx-auto">
                  For wanting to upskill and accelerate your tech career. Book a free trial session to see how we will help you achieve your goals
                </p>
              </div>

              {/* Book Trial Button */}
              <button
                onClick={handleBookTrialClick}
                className="w-full bg-gradient-to-r from-[#0097A7] to-cyan-600 hover:from-cyan-600 hover:to-[#0097A7] text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span className="text-lg">Book Your Trial</span>
                <ArrowRight className="w-6 h-6" />
              </button>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  By booking a trial, you agree to our{" "}
                  <a href="#" className="text-[#0097A7] hover:underline">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
          ) : (
            // Form view
            <>
              {/* Header with celebration graphics */}
              <div className="bg-gradient-to-br from-black via-gray-900 to-blue-950 p-6 text-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-2 left-4">
                  <Sparkles className="w-5 h-5 text-[#0097A7]" />
                </div>
                <div className="absolute top-3 right-6">
                  <Crown className="w-6 h-6 text-[#0097A7]" />
                </div>
                <div className="absolute bottom-1 left-6">
                  <div className="w-3 h-3 bg-[#0097A7] rounded-full"></div>
                </div>
                <div className="absolute bottom-2 right-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                </div>
                
                {/* Main celebration icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#0097A7] to-cyan-500 rounded-full flex items-center justify-center relative">
                  <Crown className="w-8 h-8 text-white" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">You're Awesome!</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  For wanting to upskill and accelerate your tech career. Book a free trial session to see how we will help you achieve your goals
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-900 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0097A7] focus:border-transparent transition-all duration-300 ${
                        errors.name ? "border-red-400 bg-red-900/20" : "border-gray-700 focus:bg-gray-800"
                      }`}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-[#0097A7] rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  {errors.name && <p className="text-red-400 text-sm ml-2">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-900 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0097A7] focus:border-transparent transition-all duration-300 ${
                        errors.email ? "border-red-400 bg-red-900/20" : "border-gray-700 focus:bg-gray-800"
                      }`}
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-[#0097A7] rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  {errors.email && <p className="text-red-400 text-sm ml-2">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm flex items-center justify-center border border-gray-500">
                        <div className="w-3 h-3 border border-blue-800 rounded-full bg-blue-800 flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <span className="text-gray-300 font-medium text-sm">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className={`w-full pl-20 pr-12 py-4 bg-gray-900 border-2 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0097A7] focus:border-transparent transition-all duration-300 ${
                        errors.phone ? "border-red-400 bg-red-900/20" : "border-gray-700 focus:bg-gray-800"
                      }`}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-6 h-6 bg-[#0097A7] rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                  {errors.phone && <p className="text-red-400 text-sm ml-2">{errors.phone}</p>}
                </div>

                {/* SMS Agreement Checkbox */}
                <div className="flex items-start space-x-3 py-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange("agreeToSMS", !formData.agreeToSMS)}
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-0.5 ${
                      formData.agreeToSMS
                        ? "bg-[#0097A7] border-[#0097A7]"
                        : "bg-gray-900 border-gray-600 hover:border-[#0097A7]"
                    }`}
                  >
                    {formData.agreeToSMS && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    I agree to receive SMS & WhatsApp communications on this number.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#0097A7] to-cyan-600 hover:from-cyan-600 hover:to-[#0097A7] text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-6"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Book A Free Trial</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="bg-black px-6 py-4 text-center border-t border-gray-800">
                <p className="text-xs text-gray-400">
                  By booking a trial, you agree to our{" "}
                  <a href="#" className="text-[#0097A7] hover:underline">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrialBookingPopup