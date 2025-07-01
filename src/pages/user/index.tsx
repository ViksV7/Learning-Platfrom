"use client";
import { Router } from "@/components/Router";
import { getUserDashboardConfig } from "@/config/dashboard"
// import type { DashboardConfig } from "../types/dashboard"
import type { User } from "@/types";

const studentUser: User = {
  id: "1",
  name: "Krishna",
  role: "user",
  email: "krishna@example.com",
  joinDate: "2024-01-01",
  lastLogin: "2024-06-28",
  status: "active" // or "inactive" etc.
};

export default function UserDashboardPage() {
  const config = getUserDashboardConfig(studentUser);

  return <Router config={config} title="Student Dashboard" user={studentUser} />;
}
