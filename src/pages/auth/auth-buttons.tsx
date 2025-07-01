"use client"

import { useState } from "react"
import { LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "../../contexts/auth-context"
import LoginModal from "./login-modal"
import SignupModal from "./signup-modal"
import ForgotPasswordModal from "./forgot-password-modal"

const AuthButtons = () => {
  const { user, logout } = useAuth()
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false)

  const handleSwitchToSignup = () => {
    setLoginModalOpen(false)
    setSignupModalOpen(true)
  }

  const handleSwitchToLogin = () => {
    setSignupModalOpen(false)
    setForgotPasswordModalOpen(false)
    setLoginModalOpen(true)
  }

  const handleSwitchToForgotPassword = () => {
    setLoginModalOpen(false)
    setForgotPasswordModalOpen(true)
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.avatar}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-white">{user.name}</p>
              <p className="text-xs leading-none text-gray-400">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <div className="flex items-center space-x-4">
        <Button
          onClick={() => setLoginModalOpen(true)}
          variant="outline"
          className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
        >
          Login
        </Button>
        <Button
          onClick={() => setSignupModalOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
        >
          Register
        </Button>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
        onSwitchToForgotPassword={handleSwitchToForgotPassword}
      />

      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <ForgotPasswordModal
        isOpen={forgotPasswordModalOpen}
        onClose={() => setForgotPasswordModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  )
}

export default AuthButtons
