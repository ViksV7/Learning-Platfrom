"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Mail, RefreshCw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../../contexts/auth-context"
import { useToast } from "@/hooks/use-toast";

interface EmailVerificationProps {
  email: string
  onBack: () => void
  onVerified: () => void
}

const EmailVerification = ({ email, onBack, onVerified }: EmailVerificationProps) => {
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const { resendVerificationEmail, checkVerificationStatus } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Check verification status every 5 seconds
    const checkStatus = setInterval(async () => {
      const isVerified = await checkVerificationStatus(email)
      if (isVerified) {
        toast({
          title: "Email verified!",
          description: "Your email has been successfully verified.",
          variant: "success",
        })
        onVerified()
      }
    }, 5000)

    return () => clearInterval(checkStatus)
  }, [email, checkVerificationStatus, onVerified, toast])

  const handleResendEmail = async () => {
    setIsResending(true)

    try {
      const result = await resendVerificationEmail(email)

      if (result.success) {
        toast({
          title: "Email sent!",
          description: "Verification email has been resent to your inbox.",
          variant: "success",
        })
        setCountdown(60)
        setCanResend(false)
      } else {
        toast({
          title: "Failed to resend",
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
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <Card className="bg-gray-800/50 border-gray-700 max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-cyan-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Verify Your Email</CardTitle>
          <CardDescription className="text-gray-400">
            We've sent a verification link to <strong className="text-white">{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-300">
                <p className="font-medium mb-1">Check your email</p>
                <p>Click the verification link in the email we sent you to activate your account.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">Didn't receive the email? Check your spam folder.</p>
              <Button
                onClick={handleResendEmail}
                disabled={!canResend || isResending}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : canResend ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend verification email
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Resend in {countdown}s
                  </>
                )}
              </Button>
            </div>

            <Button onClick={onBack} variant="ghost" className="w-full text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to signup
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Having trouble? Contact our support team at{" "}
              <a href="mailto:support@miraspark.com" className="text-cyan-400 hover:text-cyan-300">
                support@miraspark.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmailVerification
