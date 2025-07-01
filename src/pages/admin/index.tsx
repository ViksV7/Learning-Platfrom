"use client"

import { Router } from "@/components/Router"
import { getUserDashboardConfig } from "@/config/dashboard"
import type { User } from "@/types"

const adminUser: User = {
  id: "99",
  name: "Admin",
  role: "admin",
  email: "admin@example.com",
  joinDate: "2023-01-01",
  lastLogin: "2024-06-29",
  status: "active"
}

export default function AdminDashboardPage() {
  const config = getUserDashboardConfig(adminUser)

  return <Router config={config} title="Admin Dashboard" user={adminUser} />
}
