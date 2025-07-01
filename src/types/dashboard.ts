export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  joinDate: string
  lastLogin: string
  status: "active" | "inactive"
  avatar?: string
}

export interface NavigationItem {
  id: string
  label: string
  icon: string
  path: string
  isActive?: boolean
}

export interface StatCard {
  id: string
  title: string
  value: string | number
  subtitle?: string
  icon: string
  color: string
}

export interface Course {
  id: string
  title: string
  description: string
  status: "Active" | "Draft" | "Archived" | "In Progress" | "Completed" | "Not Started"
  instructor: string
  students: number
  duration: string
  price: string
  category: string
  level: string
  progress?: number
  icon?: string
  color?: string
}

export interface LiveSession {
  id: string
  title: string
  instructor: string
  date: string
  time: string
  duration: string
  maxStudents: number
  enrolled: number
  status: "upcoming" | "live" | "completed"
  description: string
  meetLink?: string
}

export interface PaymentPlan {
  id: string
  name: string
  price: number
  duration: string
  description: string
  features: string[]
}

export interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  status: "pending" | "submitted" | "graded"
  grade?: number
}

export interface CertificateTemplate {
  id: string
  name: string
  course: string
  template: string
  createdDate: string
  isActive: boolean
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  read: boolean
  userId?: string
  role?: "admin" | "user" | "all"
}

export interface Session {
  id: string
  date: string
  title: string
  instructor: string
}

export interface Query {
  id: string
  student: string
  date: string
  status: "Open" | "Closed" | "Pending"
}

export interface DashboardConfig {
  user: User
  role?: string
  type?: string
  navigation: NavigationItem[]
  stats?: StatCard[]
  courses?: Course[]
  sessions?: Session[]
  queries?: Query[]
  notifications?: Notification[]
}
