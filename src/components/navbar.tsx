"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import Notifications from "./notifications"
import AuthButtons from "../pages/auth/auth-buttons"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    // { name: "Dashboard", path: "/dashboard" },
    // { name: "Forum", path: "/forum" },
    { name: "About", path: "/about" },
    { name: "Products & Services", path: "/products" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "Courses", path: "/courses" },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/90 backdrop-blur-md border-b border-[#0097A7]/30 shadow-[0_0_30px_#0097A722]" 
          : "bg-black/80 backdrop-blur-md border-b border-[#0097A7]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0097A7] to-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_#0097A744]">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#0097A7] to-purple-400 bg-clip-text text-transparent">
                Miraspark
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <Link
                  to={item.path}
                  className={`relative font-medium transition-all duration-300 group ${
                    location.pathname === item.path 
                      ? "text-[#0097A7]" 
                      : "text-gray-300 hover:text-[#0097A7]"
                  }`}
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="relative z-10"
                  >
                    {item.name}
                  </motion.span>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0097A7] to-purple-500 transform transition-transform duration-300 ${
                      location.pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></div>
                </Link>
              </motion.div>
            ))}
            
            <div className="flex items-center space-x-4">
              <Notifications />
              <AuthButtons />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:text-[#0097A7] transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-[#0097A7]/20 bg-black/95 backdrop-blur-md"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-medium px-4 py-2 transition-all duration-300 rounded-md ${
                      location.pathname === item.path
                        ? "text-[#0097A7] bg-[#0097A7]/10"
                        : "text-gray-300 hover:text-[#0097A7] hover:bg-[#0097A7]/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col space-y-2 px-4 pt-4 border-t border-[#0097A7]/20"
              >
                <div className="flex justify-center mb-2">
                  <Notifications />
                </div>
                <AuthButtons />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar