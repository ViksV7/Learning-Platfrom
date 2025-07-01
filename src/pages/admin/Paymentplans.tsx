"use client"

import type React from "react"
import { useState } from "react"
import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import { useNotifications } from "../../contexts/NotificationContext"

interface PaymentPlansProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

const subscriptionPlans = [
  {
    id: "1",
    name: "Basic Plan",
    price: "₹999",
    duration: "1 Month",
    features: ["Access to 5 courses", "Basic support", "Certificate of completion", "Mobile app access"],
    isActive: true,
    subscribers: 245,
    revenue: "₹2,44,755",
    description: "Perfect for beginners starting their tech journey",
  },
  {
    id: "2",
    name: "Pro Plan",
    price: "₹2,499",
    duration: "3 Months",
    features: [
      "Access to all courses",
      "Priority support",
      "Certificates & badges",
      "Live session access",
      "1-on-1 mentorship",
      "Assignment reviews",
    ],
    isActive: true,
    subscribers: 567,
    revenue: "₹14,16,933",
    description: "Most popular plan for serious learners",
  },
  {
    id: "3",
    name: "Premium Plan",
    price: "₹4,999",
    duration: "6 Months",
    features: [
      "Everything in Pro",
      "Career guidance",
      "Job placement assistance",
      "Industry projects",
      "Lifetime access to materials",
      "Interview preparation",
    ],
    isActive: true,
    subscribers: 189,
    revenue: "₹9,44,811",
    description: "Complete career transformation package",
  },
  {
    id: "4",
    name: "Enterprise Plan",
    price: "₹9,999",
    duration: "1 Year",
    features: [
      "Everything in Premium",
      "Custom learning paths",
      "Team management",
      "Advanced analytics",
      "Dedicated account manager",
      "Corporate training",
    ],
    isActive: false,
    subscribers: 45,
    revenue: "₹4,49,955",
    description: "For organizations and teams",
  },
]

const recentTransactions = [
  {
    id: "1",
    student: "Arjun Mehta",
    plan: "Pro Plan",
    amount: "₹2,499",
    status: "Completed",
    date: "2024-04-25 14:30",
    paymentMethod: "UPI",
    transactionId: "TXN123456789",
  },
  {
    id: "2",
    student: "Kavya Reddy",
    plan: "Premium Plan",
    amount: "₹4,999",
    status: "Completed",
    date: "2024-04-25 12:15",
    paymentMethod: "Credit Card",
    transactionId: "TXN123456790",
  },
  {
    id: "3",
    student: "Rohit Sharma",
    plan: "Basic Plan",
    amount: "₹999",
    status: "Pending",
    date: "2024-04-25 10:45",
    paymentMethod: "Net Banking",
    transactionId: "TXN123456791",
  },
  {
    id: "4",
    student: "Neha Agarwal",
    plan: "Pro Plan",
    amount: "₹2,499",
    status: "Failed",
    date: "2024-04-25 09:20",
    paymentMethod: "Debit Card",
    transactionId: "TXN123456792",
  },
  {
    id: "5",
    student: "Siddharth Jain",
    plan: "Premium Plan",
    amount: "₹4,999",
    status: "Completed",
    date: "2024-04-24 18:30",
    paymentMethod: "UPI",
    transactionId: "TXN123456793",
  },
]

export const PaymentPlans: React.FC<PaymentPlansProps> = ({ config, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"plans" | "transactions" | "analytics">("plans")
  const [showCreatePlan, setShowCreatePlan] = useState(false)
  const [showEditPlan, setShowEditPlan] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const { addNotification } = useNotifications()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleTogglePlan = (planId: string, planName: string, isActive: boolean) => {
    addNotification({
      type: isActive ? "warning" : "success",
      title: `Plan ${isActive ? "Deactivated" : "Activated"}`,
      message: `${planName} has been ${isActive ? "deactivated" : "activated"}.`,
      category: "system",
    })
  }

  const handleCreatePlan = () => {
    addNotification({
      type: "success",
      title: "Plan Created",
      message: "New subscription plan has been created successfully.",
      category: "system",
    })
    setShowCreatePlan(false)
  }

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan)
    setShowEditPlan(true)
  }

  const handleDeletePlan = (planId: string, planName: string) => {
    if (confirm(`Are you sure you want to delete "${planName}"?`)) {
      addNotification({
        type: "warning",
        title: "Plan Deleted",
        message: `${planName} has been deleted successfully.`,
        category: "system",
      })
    }
  }

  const totalRevenue = subscriptionPlans.reduce((sum, plan) => {
    return sum + Number.parseFloat(plan.revenue.replace(/[₹,]/g, ""))
  }, 0)

  const totalSubscribers = subscriptionPlans.reduce((sum, plan) => sum + plan.subscribers, 0)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={config.user} navigation={config.navigation} title="Admin Dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">
              Payment Plans Management
            </h1>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <NotificationCenter />
              <button
                onClick={() => onNavigate("/profile")}
                className="flex items-center space-x-2 sm:space-x-3 hover:bg-gray-50 rounded-lg p-2"
              >
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{config.user.name}</span>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                    <p className="text-2xl font-bold text-gray-900">{totalSubscribers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Plans</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {subscriptionPlans.filter((p) => p.isActive).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {recentTransactions.filter((t) => t.status === "Pending").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "plans", label: "Subscription Plans" },
                    { id: "transactions", label: "Recent Transactions" },
                    { id: "analytics", label: "Revenue Analytics" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Subscription Plans Tab */}
                {activeTab === "plans" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Manage Subscription Plans</h3>
                      <button
                        onClick={() => setShowCreatePlan(true)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        + Create New Plan
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                      {subscriptionPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className="border border-gray-200 rounded-xl p-6 relative bg-white hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${plan.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                              >
                                {plan.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                          <div className="mb-6">
                            <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                            <div className="text-sm text-gray-500">per {plan.duration}</div>
                          </div>

                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <svg
                                  className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>

                          <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Subscribers:</span>
                              <span className="font-semibold text-gray-900">{plan.subscribers}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Monthly Revenue:</span>
                              <span className="font-semibold text-green-600">{plan.revenue}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditPlan(plan)}
                              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                            >
                              Edit Plan
                            </button>
                            <button
                              onClick={() => handleTogglePlan(plan.id, plan.name, plan.isActive)}
                              className={`flex-1 px-4 py-2 rounded-lg text-sm transition-colors ${
                                plan.isActive
                                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                  : "bg-green-500 text-white hover:bg-green-600"
                              }`}
                            >
                              {plan.isActive ? "Deactivate" : "Activate"}
                            </button>
                            <button
                              onClick={() => handleDeletePlan(plan.id, plan.name)}
                              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transactions Tab */}
                {activeTab === "transactions" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Payment Transactions</h3>
                      <div className="flex space-x-2">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                          Export CSV
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Filter Transactions
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Student
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Plan
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Payment Method
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Transaction ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentTransactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-600">
                                      {transaction.student.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{transaction.student}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{transaction.plan}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-gray-900">{transaction.amount}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{transaction.paymentMethod}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}
                                >
                                  {transaction.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{transaction.date}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 font-mono">{transaction.transactionId}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                                {transaction.status === "Failed" && (
                                  <button className="text-green-600 hover:text-green-900">Retry Payment</button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Analytics Tab */}
                {activeTab === "analytics" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics & Insights</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Revenue by Plan</h4>
                        <div className="space-y-4">
                          {subscriptionPlans.map((plan) => (
                            <div key={plan.id} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div
                                  className={`w-3 h-3 rounded-full mr-3 ${plan.isActive ? "bg-green-500" : "bg-gray-400"}`}
                                ></div>
                                <span className="text-sm text-gray-600">{plan.name}</span>
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{plan.revenue}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Payment Methods Distribution</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">UPI</span>
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">45%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Credit Card</span>
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">30%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Net Banking</span>
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">15%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Debit Card</span>
                            <div className="flex items-center">
                              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                              </div>
                              <span className="text-sm font-medium text-gray-900">10%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h4>
                      <div className="text-center py-12 text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <p className="text-lg font-medium">Revenue Analytics Chart</p>
                        <p className="text-sm">Interactive revenue charts and trends will be displayed here</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Create Plan Modal */}
      {showCreatePlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Plan</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Plan Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Price (₹)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Duration"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                rows={3}
              ></textarea>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreatePlan}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Create Plan
              </button>
              <button
                onClick={() => setShowCreatePlan(false)}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
