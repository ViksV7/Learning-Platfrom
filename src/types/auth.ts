export interface User {
    id: string
    email: string
    name: string
    role: "admin" | "instructor" | "student"
    avatar?: string
    isEmailVerified: boolean
    createdAt: string
    updatedAt: string
  }
  
  export interface LoginCredentials {
    email: string
    password: string
  }
  
  export interface RegisterData {
    name: string
    email: string
    password: string
    confirmPassword: string
    role?: "student" | "instructor"
  }
  
  export interface ForgotPasswordData {
    email: string
  }
  
  export interface ResetPasswordData {
    token: string
    password: string
    confirmPassword: string
  }
  
  export interface AuthResponse {
    success: boolean
    message: string
    user?: User
    token?: string
  }
  
  export interface AuthContextType {
    user: User | null
    token: string | null
    login: (credentials: LoginCredentials) => Promise<AuthResponse>
    register: (data: RegisterData) => Promise<AuthResponse>
    logout: () => void
    forgotPassword: (data: ForgotPasswordData) => Promise<AuthResponse>
    resetPassword: (data: ResetPasswordData) => Promise<AuthResponse>
    isLoading: boolean
    isAuthenticated: boolean
  }
  