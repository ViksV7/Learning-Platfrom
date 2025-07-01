import type { DashboardConfig, User } from "../types/dashboard"

export const getUserDashboardConfig = (user: User): DashboardConfig => {
  if (user.role === "admin") {
    return {
      user,
      navigation: [
        { id: "1", label: "Dashboard", path: "/", icon: "dashboard", isActive: true },
        { id: "2", label: "Course Management", path: "/courses", icon: "courses", isActive: false },
        { id: "3", label: "Student Management", path: "/students", icon: "students", isActive: false },
        { id: "4", label: "Mentor/Instructor Panel", path: "/mentors", icon: "mentor", isActive: false },
        { id: "5", label: "Live Class Schedule", path: "/schedule", icon: "schedule", isActive: false },
        { id: "6", label: "Certificates", path: "/certificates", icon: "certificates", isActive: false },
        { id: "7", label: "Internship Tracker", path: "/internship", icon: "internship", isActive: false },
        { id: "8", label: "Payments & Plans", path: "/payments", icon: "payments", isActive: false },
        { id: "9", label: "Settings", path: "/settings", icon: "settings", isActive: false }
      ]
    }
  }

  // Default: Student config
  return {
    user,
    navigation: [
      { id: "1", label: "Dashboard", path: "/", icon: "dashboard", isActive: true },
      { id: "2", label: "My Courses", path: "/my-courses", icon: "courses", isActive: false },
      { id: "3", label: "Browse Courses", path: "/browse", icon: "browse", isActive: false },
      { id: "4", label: "Live Sessions", path: "/sessions", icon: "video", isActive: false },
      { id: "5", label: "Assignments", path: "/assignments", icon: "assignments", isActive: false },
      { id: "6", label: "Discussion Forums", path: "/forums", icon: "forums", isActive: false },
      { id: "7", label: "Support", path: "/support", icon: "support", isActive: false },
      { id: "8", label: "Settings", path: "/settings", icon: "settings", isActive: false }
    ]
  }
}