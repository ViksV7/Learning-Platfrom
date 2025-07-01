"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Building, Shield, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  course: {
    id: string
    title: string
    price: string
    originalPrice?: string
    discount?: string
  }
}

const PaymentModal = ({ isOpen, onClose, course }: PaymentModalProps) => {
  const [step, setStep] = useState<"payment" | "processing" | "success">("payment")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    upiId: "",
    bankAccount: "",
    ifscCode: "",
  })

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Visa, Mastercard, RuPay",
    },
    {
      id: "upi",
      name: "UPI",
      icon: <Smartphone className="h-5 w-5" />,
      description: "PhonePe, GPay, Paytm",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: <Building className="h-5 w-5" />,
      description: "All major banks",
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`
    }
    return v
  }

  const handlePayment = async () => {
    setStep("processing")

    // Simulate payment processing
    setTimeout(() => {
      setStep("success")
    }, 3000)
  }

  const handleClose = () => {
    setStep("payment")
    setFormData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      upiId: "",
      bankAccount: "",
      ifscCode: "",
    })
    onClose()
  }

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber" className="text-white">
                Card Number
              </Label>
              <Input
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-white">
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-white">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cardholderName" className="text-white">
                Cardholder Name
              </Label>
              <Input
                id="cardholderName"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="John Doe"
              />
            </div>
          </div>
        )
      case "upi":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="upiId" className="text-white">
                UPI ID
              </Label>
              <Input
                id="upiId"
                value={formData.upiId}
                onChange={(e) => handleInputChange("upiId", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="yourname@paytm"
              />
            </div>
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">You will be redirected to your UPI app to complete the payment.</p>
            </div>
          </div>
        )
      case "netbanking":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bankAccount" className="text-white">
                Account Number
              </Label>
              <Input
                id="bankAccount"
                value={formData.bankAccount}
                onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="1234567890"
              />
            </div>
            <div>
              <Label htmlFor="ifscCode" className="text-white">
                IFSC Code
              </Label>
              <Input
                id="ifscCode"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="SBIN0001234"
              />
            </div>
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">
                You will be redirected to your bank's website to complete the payment.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (step === "processing") {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-400 mb-4">Please wait while we process your payment securely...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (step === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Successful! 🎉</h3>
            <p className="text-gray-400 mb-4">
              Welcome to <strong className="text-white">{course.title}</strong>
            </p>
            <div className="bg-gray-700/30 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-300">
                You will receive a confirmation email shortly. You can now access your course from the dashboard.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleClose} variant="outline" className="flex-1">
                Close
              </Button>
              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-cyan-400" />
            <span>Secure Payment</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">Complete your enrollment for {course.title}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <Card className="bg-gray-700/30 border-gray-600">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-white">{course.title}</h4>
                    <p className="text-sm text-gray-400">Blockchain Development Course</p>
                  </div>
                  <Separator className="bg-gray-600" />
                  <div className="flex justify-between">
                    <span className="text-gray-400">Course Price:</span>
                    <div className="text-right">
                      {course.originalPrice && (
                        <span className="text-gray-500 line-through text-sm mr-2">{course.originalPrice}</span>
                      )}
                      <span className="text-white font-semibold">{course.price}</span>
                    </div>
                  </div>
                  {course.discount && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Discount:</span>
                      <Badge className="bg-green-500/20 text-green-400">{course.discount}</Badge>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">GST (18%):</span>
                    <span className="text-white">₹4,500</span>
                  </div>
                  <Separator className="bg-gray-600" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-white">Total:</span>
                    <span className="text-cyan-400">₹29,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">256-bit SSL encrypted payment</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer flex-1">
                    <div className="text-cyan-400">{method.icon}</div>
                    <div>
                      <div className="text-white font-medium">{method.name}</div>
                      <div className="text-gray-400 text-sm">{method.description}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {renderPaymentForm()}

            <div className="mt-6 flex space-x-3">
              <Button onClick={handleClose} variant="outline" className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handlePayment}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                Pay ₹29,500
              </Button>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              By completing this payment, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal
