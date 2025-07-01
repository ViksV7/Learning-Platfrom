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

// User's certificates data
const userCertificates = [
  {
    id: "1",
    courseName: "Full Stack Web Development",
    certificateType: "Course Completion Certificate",
    issueDate: "2024-04-20",
    score: "92%",
    status: "Issued",
    downloadCount: 3,
    certificateUrl: "/certificates/fullstack-cert-001.pdf",
    thumbnail: "/placeholder.svg?height=200&width=300",
    validUntil: "2027-04-20",
    credentialId: "FSWEB-2024-001",
  },
  {
    id: "2",
    courseName: "AI/ML with Python",
    certificateType: "Excellence Award Certificate",
    issueDate: "2024-04-18",
    score: "98%",
    status: "Issued",
    downloadCount: 5,
    certificateUrl: "/certificates/aiml-excellence-002.pdf",
    thumbnail: "/placeholder.svg?height=200&width=300",
    validUntil: "2027-04-18",
    credentialId: "AIML-EXC-2024-002",
  },
  {
    id: "3",
    courseName: "DevOps & Cloud Computing",
    certificateType: "Project Completion Certificate",
    issueDate: "2024-04-12",
    score: "94%",
    status: "Issued",
    downloadCount: 2,
    certificateUrl: "/certificates/devops-project-003.pdf",
    thumbnail: "/placeholder.svg?height=200&width=300",
    validUntil: "2027-04-12",
    credentialId: "DEVOPS-PROJ-2024-003",
  },
]

// Upcoming certificates (courses in progress)
const upcomingCertificates = [
  {
    id: "4",
    courseName: "Blockchain Development",
    certificateType: "Course Completion Certificate",
    progress: 75,
    expectedDate: "2024-05-15",
    status: "In Progress",
    requiredScore: 80,
    currentScore: 85,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    courseName: "Cybersecurity Fundamentals",
    certificateType: "Course Completion Certificate",
    progress: 45,
    expectedDate: "2024-06-10",
    status: "In Progress",
    requiredScore: 80,
    currentScore: 78,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "6",
    courseName: "React Native Development",
    certificateType: "Project Completion Certificate",
    progress: 90,
    expectedDate: "2024-05-01",
    status: "Pending Review",
    requiredScore: 85,
    currentScore: 92,
    thumbnail: "/placeholder.svg?height=200&width=300",
  },
]

export const Certificates: React.FC<CertificatesProps> = ({ config, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"issued" | "upcoming">("issued")
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const { addNotification } = useNotifications()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Issued":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownloadCertificate = (certificate: any) => {
    addNotification({
      type: "success",
      title: "Certificate Downloaded",
      message: `${certificate.courseName} certificate has been downloaded successfully.`,
      category: "achievement",
    })
    // Simulate download
    console.log(`Downloading certificate: ${certificate.certificateUrl}`)
  }

  const handleShareCertificate = (certificate: any) => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.courseName} Certificate`,
        text: `I've completed ${certificate.courseName} with ${certificate.score} score!`,
        url: `https://yourplatform.com/verify/${certificate.credentialId}`,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`https://yourplatform.com/verify/${certificate.credentialId}`)
      addNotification({
        type: "success",
        title: "Link Copied",
        message: "Certificate verification link copied to clipboard!",
        category: "system",
      })
    }
  }

  const handleVerifyCertificate = (certificate: any) => {
    setSelectedCertificate(certificate)
    setShowVerifyModal(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={config.user} navigation={config.navigation} title="Student Dashboard" onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">
              My Certificates
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
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Earned Certificates</p>
                    <p className="text-2xl font-bold text-gray-900">{userCertificates.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingCertificates.length}</p>
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
                      {userCertificates.reduce((sum, cert) => sum + cert.downloadCount, 0)}
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
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Score</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(
                        userCertificates.reduce((sum, cert) => sum + Number.parseInt(cert.score), 0) /
                          userCertificates.length,
                      )}
                      %
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
                    { id: "issued", label: "My Certificates", count: userCertificates.length },
                    { id: "upcoming", label: "Upcoming Certificates", count: upcomingCertificates.length },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          activeTab === tab.id ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Issued Certificates Tab */}
                {activeTab === "issued" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">My Earned Certificates</h3>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Download All
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userCertificates.map((certificate) => (
                        <div
                          key={certificate.id}
                          className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                        >
                          <div className="relative">
                            <img
                              src={certificate.thumbnail || "/placeholder.svg"}
                              alt={certificate.courseName}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-3 right-3">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(certificate.status)}`}
                              >
                                {certificate.status}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-1">{certificate.courseName}</h4>
                            <p className="text-sm text-gray-600 mb-2">{certificate.certificateType}</p>

                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Score:</span>
                                <span className="font-medium text-green-600">{certificate.score}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Issued:</span>
                                <span className="text-gray-900">{certificate.issueDate}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Valid Until:</span>
                                <span className="text-gray-900">{certificate.validUntil}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Downloads:</span>
                                <span className="text-gray-900">{certificate.downloadCount}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <button
                                onClick={() => handleDownloadCertificate(certificate)}
                                className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                <span>Download PDF</span>
                              </button>

                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleShareCertificate(certificate)}
                                  className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                    />
                                  </svg>
                                  <span>Share</span>
                                </button>
                                <button
                                  onClick={() => handleVerifyCertificate(certificate)}
                                  className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span>Verify</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Certificates Tab */}
                {activeTab === "upcoming" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Certificates in Progress</h3>
                      <p className="text-sm text-gray-600">Complete your courses to earn certificates</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingCertificates.map((certificate) => (
                        <div
                          key={certificate.id}
                          className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                        >
                          <div className="relative">
                            <img
                              src={certificate.thumbnail || "/placeholder.svg"}
                              alt={certificate.courseName}
                              className="w-full h-48 object-cover opacity-75"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                              <div className="text-white text-center">
                                <div className="text-2xl font-bold">{certificate.progress}%</div>
                                <div className="text-sm">Complete</div>
                              </div>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(certificate.status)}`}
                              >
                                {certificate.status}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-1">{certificate.courseName}</h4>
                            <p className="text-sm text-gray-600 mb-3">{certificate.certificateType}</p>

                            {/* Progress Bar */}
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span className="text-gray-900">{certificate.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${certificate.progress}%` }}
                                />
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Current Score:</span>
                                <span
                                  className={`font-medium ${certificate.currentScore >= certificate.requiredScore ? "text-green-600" : "text-yellow-600"}`}
                                >
                                  {certificate.currentScore}%
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Required:</span>
                                <span className="text-gray-900">{certificate.requiredScore}%</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Expected Date:</span>
                                <span className="text-gray-900">{certificate.expectedDate}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => onNavigate("/my-courses")}
                              className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                            >
                              Continue Course
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Certificate Verification Modal */}
      {showVerifyModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Certificate Verification</h2>
                <button onClick={() => setShowVerifyModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificate Verified ✅</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This certificate is authentic and verified by our platform.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-medium text-gray-900">{selectedCertificate.courseName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Credential ID:</span>
                  <span className="font-mono text-gray-900">{selectedCertificate.credentialId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Issue Date:</span>
                  <span className="text-gray-900">{selectedCertificate.issueDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valid Until:</span>
                  <span className="text-gray-900">{selectedCertificate.validUntil}</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 mb-4">
                  Verification URL: https://yourplatform.com/verify/{selectedCertificate.credentialId}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://yourplatform.com/verify/${selectedCertificate.credentialId}`)
                    addNotification({
                      type: "success",
                      title: "Link Copied",
                      message: "Verification link copied to clipboard!",
                      category: "system",
                    })
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Copy Verification Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
