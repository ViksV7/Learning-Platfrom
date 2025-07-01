"use client"

import type React from "react"
import { useState } from "react"
import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import { useNotifications } from "../../contexts/NotificationContext"

interface CertificatesProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

const certificateTemplates = [
  {
    id: "1",
    name: "Course Completion Certificate",
    description: "Standard certificate for course completion",
    isActive: true,
    usageCount: 1247,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Excellence Award Certificate",
    description: "Certificate for students with 95%+ scores",
    isActive: true,
    usageCount: 89,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Project Completion Certificate",
    description: "Certificate for completing capstone projects",
    isActive: true,
    usageCount: 456,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    name: "Participation Certificate",
    description: "Certificate for workshop/seminar participation",
    isActive: false,
    usageCount: 234,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

const issuedCertificates = [
  {
    id: "1",
    studentName: "Arjun Mehta",
    courseName: "Full Stack Web Development",
    certificateType: "Course Completion Certificate",
    issueDate: "2024-04-20",
    score: "92%",
    status: "Issued",
    downloadCount: 3,
  },
  {
    id: "2",
    studentName: "Kavya Reddy",
    courseName: "AI/ML with Python",
    certificateType: "Excellence Award Certificate",
    issueDate: "2024-04-18",
    score: "98%",
    status: "Issued",
    downloadCount: 5,
  },
  {
    id: "3",
    studentName: "Rohit Sharma",
    courseName: "Blockchain Development",
    certificateType: "Course Completion Certificate",
    issueDate: "2024-04-15",
    score: "87%",
    status: "Pending",
    downloadCount: 0,
  },
  {
    id: "4",
    studentName: "Neha Agarwal",
    courseName: "DevOps & Cloud Computing",
    certificateType: "Project Completion Certificate",
    issueDate: "2024-04-12",
    score: "94%",
    status: "Issued",
    downloadCount: 2,
  },
  {
    id: "5",
    studentName: "Siddharth Jain",
    courseName: "Cybersecurity Fundamentals",
    certificateType: "Course Completion Certificate",
    issueDate: "2024-04-10",
    score: "89%",
    status: "Revoked",
    downloadCount: 1,
  },
]

export const Certificates: React.FC<CertificatesProps> = ({ config, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"templates" | "issued" | "bulk">("templates")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const { addNotification } = useNotifications()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Issued":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Revoked":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleUploadTemplate = () => {
    addNotification({
      type: "success",
      title: "Template Uploaded",
      message: "New certificate template has been uploaded successfully.",
      category: "system",
    })
    setShowUploadModal(false)
  }

  const handleIssueCertificate = (studentName: string) => {
    addNotification({
      type: "success",
      title: "Certificate Issued",
      message: `Certificate has been issued to ${studentName}.`,
      category: "achievement",
    })
  }

  const handleRevokeCertificate = (studentName: string) => {
    if (confirm(`Are you sure you want to revoke certificate for ${studentName}?`)) {
      addNotification({
        type: "warning",
        title: "Certificate Revoked",
        message: `Certificate for ${studentName} has been revoked.`,
        category: "system",
      })
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={config.user}
        navigation={config.navigation}
        title={config.user.role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        onNavigate={onNavigate}
      />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">
              Certificate Management
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
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Templates</p>
                    <p className="text-2xl font-bold text-gray-900">{certificateTemplates.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Certificates Issued</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {issuedCertificates.filter((c) => c.status === "Issued").length}
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
                    <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {issuedCertificates.filter((c) => c.status === "Pending").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {issuedCertificates.reduce((sum, cert) => sum + cert.downloadCount, 0)}
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
                    { id: "templates", label: "Certificate Templates" },
                    { id: "issued", label: "Issued Certificates" },
                    { id: "bulk", label: "Bulk Operations" },
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
                {/* Templates Tab */}
                {activeTab === "templates" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Certificate Templates</h3>
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        + Upload New Template
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {certificateTemplates.map((template) => (
                        <div key={template.id} className="border border-gray-200 rounded-xl overflow-hidden">
                          <img
                            src={template.thumbnail || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{template.name}</h4>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  template.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                              >
                                {template.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <span>Used {template.usageCount} times</span>
                            </div>
                            <div className="flex space-x-2">
                              <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                                Edit
                              </button>
                              <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                Preview
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Issued Certificates Tab */}
                {activeTab === "issued" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Issued Certificates</h3>
                      <div className="flex space-x-2">
                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                          Export List
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Issue Certificate
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
                              Course
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Certificate Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Score
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Issue Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Downloads
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {issuedCertificates.map((certificate) => (
                            <tr key={certificate.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-600">
                                      {certificate.studentName.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-900">{certificate.studentName}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{certificate.courseName}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{certificate.certificateType}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{certificate.score}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{certificate.issueDate}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                    certificate.status,
                                  )}`}
                                >
                                  {certificate.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{certificate.downloadCount}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                {certificate.status === "Pending" && (
                                  <button
                                    onClick={() => handleIssueCertificate(certificate.studentName)}
                                    className="text-green-600 hover:text-green-900 mr-3"
                                  >
                                    Approve
                                  </button>
                                )}
                                {certificate.status === "Issued" && (
                                  <button
                                    onClick={() => handleRevokeCertificate(certificate.studentName)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Revoke
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Bulk Operations Tab */}
                {activeTab === "bulk" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Bulk Certificate Operations</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Bulk Issue Certificates</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Upload a CSV file with student details to issue certificates in bulk.
                        </p>
                        <div className="space-y-3">
                          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Upload CSV File
                          </button>
                          <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            Download Template
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Bulk Export Certificates</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Export multiple certificates as a ZIP file for distribution.
                        </p>
                        <div className="space-y-3">
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option>Select Course</option>
                            <option>Full Stack Web Development</option>
                            <option>AI/ML with Python</option>
                            <option>Blockchain Development</option>
                          </select>
                          <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            Export All Certificates
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Certificate Analytics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">1,247</div>
                          <div className="text-sm text-gray-600">Total Issued</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">98.5%</div>
                          <div className="text-sm text-gray-600">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">3,456</div>
                          <div className="text-sm text-gray-600">Total Downloads</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Upload Template Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Upload Certificate Template</h2>
                <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter template name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter template description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Template File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg
                    className="w-8 h-8 text-gray-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadTemplate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Upload Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
