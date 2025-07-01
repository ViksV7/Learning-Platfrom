"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Loader2, Check, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "../contexts/auth-context"
import { useToast } from "../hooks/use-toast"

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState(true)
  const { resetPassword } = useAuth()
  const { toast } = useToast()

  const token = searchParams.get("token")

  useEffect(() => {
    // Validate token on component mount
    if (!token) {
      setTokenValid(false)
    }
  }, [token])

  const passwordRequirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /[a-z]/, text: "One lowercase letter" },
    { regex: /\d/, text: "One number" },
    { regex: /[^A-Za-z0-9]/, text: "One special character" },
  ]

  const getPasswordStrength = (password: string) => {
    const score = passwordRequirements.reduce((acc, req) => {
      return acc + (req.regex.test(password) ? 1 : 0)
    }, 0)
    return (score / passwordRequirements.length) * 100
  }

  const getPasswordStrengthLabel = (strength: number) => {
    if (strength < 40) return { label: "Weak", color: "text-red-400" }
    if (strength < 80) return { label: "Medium", color: "text-yellow-400" }
    return { label: "Strong", color: "text-green-400" }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    const passwordStrength = getPasswordStrength(formData.password)
    if (passwordStrength < 80) {
      toast({
        title: "Weak password",
        description: "Please create a stronger password",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await resetPassword(token!, formData.password)

      if (result.success) {
        setIsSuccess(true)
        toast({
          title: "Password reset successful!",
          description: result.message,
        })
      } else {
        toast({
          title: "Reset failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthInfo = getPasswordStrengthLabel(passwordStrength)

  if (!tokenValid) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Card className="bg-gray-800/50 border-gray-700 max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <X className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Invalid Reset Link</h2>
            <p className="text-gray-400 mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Card className="bg-gray-800/50 border-gray-700 max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h2>
            <p className="text-gray-400 mb-6">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white focus:border-cyan-500"
                      placeholder="Create a strong password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Password strength:</span>
                        <span className={`text-sm font-medium ${strengthInfo.color}`}>{strengthInfo.label}</span>
                      </div>
                      <Progress value={passwordStrength} className="h-2" />
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirm New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white focus:border-cyan-500"
                      placeholder="Confirm your new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-400 text-sm">Passwords do not match</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || passwordStrength < 80 || formData.password !== formData.confirmPassword}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResetPassword
