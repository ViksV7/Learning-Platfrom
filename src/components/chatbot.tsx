"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your blockchain learning assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const predefinedResponses: { [key: string]: string } = {
    hello:
      "Hello! Welcome to Miraspark Technologies. I'm here to help you with any questions about our blockchain courses.",
    courses:
      "We offer several blockchain courses: Blockchain Fundamentals (₹15k), Smart Contract Development (₹25k), and Web3 Full Stack Development (₹35k). Which one interests you?",
    pricing:
      "Our pricing ranges from ₹25k for Basic Plan to ₹60k for Premium Plan with guaranteed internship. Would you like details about a specific plan?",
    internship:
      "Yes! Our Premium Plan (₹60k) includes a guaranteed 3-month internship at Miraspark Technologies. You'll work on real blockchain projects.",
    duration:
      "Course durations vary: Basic courses are 6-8 weeks, while our comprehensive Blockchain Bootcamp is 3 months with internship included.",
    support:
      "We provide 24/7 technical support, live mentorship sessions, career guidance, and access to our community. You're never alone in your learning journey!",
    requirements:
      "No prior programming experience required for beginner courses! We start from basics and build up to advanced concepts gradually.",
    certificate:
      "Yes, all our courses include industry-recognized certificates. Premium plan students also get LinkedIn profile reviews and GitHub certifications.",
  }

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return predefinedResponses["pricing"]
    }

    if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
      return predefinedResponses["support"]
    }

    return "I'd be happy to help! You can ask me about our courses, pricing, internships, or any other questions about blockchain learning. You can also contact us directly at info@mirasparktechnologies.com or call +91 8793717659."
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: getBotResponse(inputValue),
          isBot: true,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "Tell me about courses",
    "What's the pricing?",
    "Internship details",
    "How long are courses?",
    "Do I need experience?",
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <Card className="h-full bg-gray-900/95 backdrop-blur-md border-gray-700 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Blockchain Assistant</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col h-full p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? "bg-gray-700 text-white"
                          : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.isBot && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        <p className="text-sm">{message.text}</p>
                        {!message.isBot && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-1">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(question)}
                        className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors duration-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="bg-gray-700 border-gray-600 text-white focus:border-cyan-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default Chatbot
