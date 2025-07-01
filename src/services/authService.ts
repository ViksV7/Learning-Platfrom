// import axios from "axios"
// import type { LoginCredentials, RegisterData, ForgotPasswordData, ResetPasswordData, AuthResponse } from "../types/auth"

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Response interceptor to handle auth errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")
//       window.location.href = "/auth/login"
//     }
//     return Promise.reject(error)
//   },
// )

// export const authService = {
//   async login(credentials: LoginCredentials): Promise<AuthResponse> {
//     try {
//       const response = await api.post("/auth/login", credentials)
//       return response.data
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Login failed",
//       }
//     }
//   },

//   async register(data: RegisterData): Promise<AuthResponse> {
//     try {
//       const response = await api.post("/auth/register", data)
//       return response.data
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Registration failed",
//       }
//     }
//   },

//   async forgotPassword(data: ForgotPasswordData): Promise<AuthResponse> {
//     try {
//       const response = await api.post("/auth/forgot-password", data)
//       return response.data
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Failed to send reset email",
//       }
//     }
//   },

//   async resetPassword(data: ResetPasswordData): Promise<AuthResponse> {
//     try {
//       const response = await api.post("/auth/reset-password", data)
//       return response.data
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Password reset failed",
//       }
//     }
//   },

//   async getCurrentUser(): Promise<AuthResponse> {
//     const response = await api.get("/auth/me")
//     return response.data
//   },

//   async updatePassword(data: any): Promise<AuthResponse> {
//     try {
//       const response = await api.put("/auth/update-password", data)
//       return response.data
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Password update failed",
//       }
//     }
//   },

//   async logout(): Promise<void> {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//   },

//   async verifyToken(): Promise<AuthResponse> {
//     try {
//       const response = await api.get("/auth/verify")
//       return response.data
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Token verification failed",
//       }
//     }
//   },

//   async refreshToken(): Promise<AuthResponse> {
//     try {
//       const response = await api.post("/auth/refresh")
//       return response.data
//     } catch (error: any) {
//       return {
//         success: false,
//         message: error.response?.data?.message || "Token refresh failed",
//       }
//     }
//   },
// }

// export default api
