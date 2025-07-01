// "use client"

// import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
// // import { authService } from "../services/authService"
// import type {
//   User,
//   AuthContextType,
//   LoginCredentials,
//   RegisterData,
// //   ForgotPasswordData,
//   ResetPasswordData,
//   AuthResponse,
// } from "../types/auth"

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// interface AuthProviderProps {
//   children: ReactNode
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null)
//   const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
//   const [isLoading, setIsLoading] = useState(true)

//   const isAuthenticated = !!user && !!token

//   useEffect(() => {
//     const initializeAuth = async () => {
//       const storedToken = localStorage.getItem("token")
//       if (storedToken) {
//         try {
//           const response = await authService.verifyToken()
//           if (response.success && response.user) {
//             setUser(response.user)
//             setToken(storedToken)
//           } else {
//             localStorage.removeItem("token")
//             setToken(null)
//           }
//         } catch (error) {
//           localStorage.removeItem("token")
//           setToken(null)
//         }
//       }
//       setIsLoading(false)
//     }

//     initializeAuth()
//   }, [])

//   const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
//     setIsLoading(true)
//     try {
//       const response = await authService.login(credentials)
//       if (response.success && response.user && response.token) {
//         setUser(response.user)
//         setToken(response.token)
//         localStorage.setItem("token", response.token)
//       }
//       return response
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const register = async (data: RegisterData): Promise<AuthResponse> => {
//     setIsLoading(true)
//     try {
//       const response = await authService.register(data)
//       if (response.success && response.user && response.token) {
//         setUser(response.user)
//         setToken(response.token)
//         localStorage.setItem("token", response.token)
//       }
//       return response
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const logout = () => {
//     setUser(null)
//     setToken(null)
//     localStorage.removeItem("token")
//   }

//   const forgotPassword = async (data: ForgotPasswordData): Promise<AuthResponse> => {
//     return authService.forgotPassword(data)
//   }

//   const resetPassword = async (data: ResetPasswordData): Promise<AuthResponse> => {
//     return authService.resetPassword(data)
//   }

//   const value: AuthContextType = {
//     user,
//     token,
//     login,
//     register,
//     logout,
//     forgotPassword,
//     resetPassword,
//     isLoading,
//     isAuthenticated,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }
