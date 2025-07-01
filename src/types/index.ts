// types.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    joinDate: string;
    lastLogin: string;
    status: "active" | "inactive";
  }
  
  export interface Course {
    id: string;
    title: string;
    description: string;
    status: "Active" | "Draft" | "Archived";
    instructor: string;
    students: number;
    duration: string;
    price: string;
    category: string;
    level: string;
  }
  
  export interface LiveSession {
    id: string;
    title: string;
    instructor: string;
    date: string;
    time: string;
    duration: string;
    maxStudents: string;
    enrolled: number;
    status: "upcoming" | "live" | "completed";
    description: string;
  }
  
  export interface Notification {
    id: string;
    title: string;
    message: string;
    type: "info" | "warning" | "success" | "error";
    date: string;
    read: boolean;
  }
  
  export interface PaymentPlan {
    id: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    features: string[];
  }
  
  export interface Certificate {
    id: string;
    courseName: string;
    issued: number;
    pending: number;
  }
  
  export interface Student {
    id: string;
    name: string;
    email: string;
    courses: number;
    progress: number;
    status: string;
  }
  
  export interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
  }

  import type React from "react"
export interface User {
  id: string
  name: string
  role: "user" | "admin"
  avatar?: string
}




export interface Announcement {
  id: string
  title: string
  description: string
  date: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  date: string
  read: boolean
}

export interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  adminOnly?: boolean
}

export interface DashboardStats {
  totalStudents: number
  activeCourses: number
  studentQueries: number
  supportTickets: number
}

export interface StudentQuery {
  id: string
  studentName: string
  date: string
  subject: string
}
