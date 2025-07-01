// ✅ Merged App.tsx with React Router and demo user switcher functionality

import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/auth-context"
import { Toaster } from "./components/toaster"
import Navbar from "./components/navbar"
import Footer from "./components/Footer"
import Chatbot from "./components/chatbot"
import ProtectedRoute from "./components/protected-route"
import TrialBookingPopup from "./components/TrialBookingPopup"
import { useTrialPopup } from "./hooks/UseTrialPopus"

// import Index from "./pages/Index";
import Courses from "./pages/courses";

import Home from "./pages/Home"
import About from "./pages/about"
import Products from "./pages/products"
import Contact from "./pages/contact"
import ResetPassword from "./pages/reset-password"
import LiveStreaming from "./pages/live-streaming"
import CourseDetail from "./pages/course-detail"
import Profile from "./pages/profile"
import { AIRecommendationsWithSuspense, CourseWizardWithSuspense } from "./components/performance/lazy-components"
import { Router as DashboardRouter } from "./components/Router"
import type { DashboardConfig } from "./types/dashboard"
import type { User } from "./types"

import "./styles/globals.css"
import Pricing from "./pages/pricing"

const HomeWithTrialPopup = () => {
  const { showPopup, closePopup, handleBookTrial } = useTrialPopup()
  return (
    <>
      <Home />
      <TrialBookingPopup
        isOpen={showPopup}
        onClose={closePopup}
        onBookTrial={handleBookTrial}
      />
    </>
  )
}

function App() {
  // Demo users with state management
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user_123",
    name: "Krishna",
    email: "krishna@example.com",
    role: "user", // Default to student view
    joinDate: "2024-01-15",
    lastLogin: "2025-06-27",
    status: "active"
  })

  // Create mock users based on current role
  const mockStudentUser: User = {
    ...currentUser,
    role: "user"
  }

  const mockAdminUser: User = {
    ...currentUser,
    id: "admin_456",
    name: "Admin",
    email: "admin@example.com",
    role: "admin",
    joinDate: "2023-12-01"
  }

  // Dashboard configurations
  const mockDashboardConfig: DashboardConfig = {
    user: mockStudentUser,
    navigation: [
      { id: "1", path: "/", label: "Dashboard", icon: "dashboard", isActive: true },
      { id: "2", path: "/profile", label: "Profile", icon: "settings", isActive: false },
      { id: "3", path: "/my-courses", label: "My Courses", icon: "courses", isActive: false },
      { id: "4", path: "/browse", label: "Browse Courses", icon: "browse", isActive: false },
      { id: "5", path: "/sessions", label: "Live Sessions", icon: "video", isActive: false },
      { id: "6", path: "/assignments", label: "Assignments", icon: "assignments", isActive: false },
      { id: "7", path: "/support", label: "Support", icon: "support", isActive: false },
      { id: "8", path: "/settings", label: "Settings", icon: "settings", isActive: false },
    ]
  }

  const mockAdminConfig: DashboardConfig = {
    user: mockAdminUser,
    navigation: [
      { id: "1", path: "/", label: "Dashboard", icon: "dashboard", isActive: true },
      { id: "2", path: "/courses", label: "Course Management", icon: "courses", isActive: false },
      { id: "3", path: "/students", label: "Students", icon: "students", isActive: false },
      { id: "4", path: "/mentors", label: "Mentors", icon: "mentor", isActive: false },
      { id: "5", path: "/schedule", label: "Schedule", icon: "schedule", isActive: false },
      { id: "6", path: "/assignments", label: "Assignments", icon: "assignments", isActive: false },
      { id: "7", path: "/certificates", label: "Certificates", icon: "certificates", isActive: false },
      { id: "8", path: "/payments", label: "Payments", icon: "payments", isActive: false },
      { id: "9", path: "/forums", label: "Forums", icon: "forums", isActive: false },
      { id: "10", path: "/settings", label: "Settings", icon: "settings", isActive: false },
    ]
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Demo User Switcher - Remove in production */}
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg p-3 border border-[#0097A7]">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentUser({...currentUser, role: "admin"})}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                currentUser.role === "admin" 
                  ? "bg-gradient-to-r from-[#0097A7] to-blue-600 text-white" 
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setCurrentUser({...currentUser, role: "user"})}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                currentUser.role === "user" 
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white" 
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Student
            </button>
          </div>
        </div>

        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeWithTrialPopup />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* <Route path="/" element={<Index />} /> */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/recommendations" element={<AIRecommendationsWithSuspense />} />

            {/* User Dashboard: /user/* - Uses current user's role */}
            <Route
              path="/user/*"
              element={
                <ProtectedRoute>
                  <DashboardRouter
                    user={currentUser.role === "admin" ? mockAdminUser : mockStudentUser}
                  />
                </ProtectedRoute>
              }
            />

            {/* Admin Dashboard: /admin/* - Always uses admin config */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <DashboardRouter
                    user={mockAdminUser}
                  />
                </ProtectedRoute>
              }
            />

            {/* Other protected pages */}
            <Route
              path="/create-course"
              element={
                <ProtectedRoute>
                  <CourseWizardWithSuspense />
                </ProtectedRoute>
              }
            />
            <Route
              path="/live"
              element={
                <ProtectedRoute>
                  <LiveStreaming />
                </ProtectedRoute>
              }
            />
            <Route
              path="/course/:id"
              element={
                <ProtectedRoute>
                  <CourseDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Chatbot />
          <Toaster />
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App