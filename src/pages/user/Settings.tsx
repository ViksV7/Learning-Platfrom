"use client"

import type React from "react"
import { useState } from "react"
import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import { useNotifications } from "../../contexts/NotificationContext"

interface SettingsProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

export const Settings: React.FC<SettingsProps> = ({ config, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<"general" | "notifications" | "security" | "integrations" | "advanced">(
    "general",
  )
  const { addNotification } = useNotifications()

  const [generalSettings, setGeneralSettings] = useState({
    platformName: "TechAcademy Pro",
    platformDescription: "Advanced learning platform for technology professionals",
    supportEmail: "support@techacademy.com",
    timezone: "Asia/Kolkata",
    language: "English",
    currency: "INR",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false,
    courseUpdates: true,
    systemAlerts: true,
    paymentNotifications: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    ipWhitelist: "",
    sslEnabled: true,
    dataEncryption: true,
  })

  const [integrationSettings, setIntegrationSettings] = useState({
    googleAnalytics: "GA-XXXXXXXXX",
    razorpayKey: "rzp_test_XXXXXXXXX",
    awsAccessKey: "",
    awsSecretKey: "",
    emailProvider: "SendGrid",
    smsProvider: "Twilio",
    videoProvider: "Zoom",
    storageProvider: "AWS S3",
  })

  const handleSaveSettings = (settingsType: string) => {
    addNotification({
      type: "success",
      title: "Settings Saved",
      message: `${settingsType} settings have been updated successfully.`,
      category: "system",
    })
  }

  const handleTestIntegration = (provider: string) => {
    addNotification({
      type: "info",
      title: "Testing Integration",
      message: `Testing ${provider} integration...`,
      category: "system",
    })

    setTimeout(() => {
      addNotification({
        type: "success",
        title: "Integration Test Successful",
        message: `${provider} integration is working correctly.`,
        category: "system",
      })
    }, 2000)
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
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 ml-12 lg:ml-0">Settings</h1>
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
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "general", label: "General", icon: "⚙️" },
                    { id: "notifications", label: "Notifications", icon: "🔔" },
                    { id: "security", label: "Security", icon: "🔒" },
                    { id: "integrations", label: "Integrations", icon: "🔗" },
                    { id: "advanced", label: "Advanced", icon: "⚡" },
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
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* General Settings */}
                {activeTab === "general" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                          <input
                            type="text"
                            value={generalSettings.platformName}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                          <input
                            type="email"
                            value={generalSettings.supportEmail}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                          <select
                            value={generalSettings.timezone}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">America/New_York (EST)</option>
                            <option value="Europe/London">Europe/London (GMT)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                          <select
                            value={generalSettings.currency}
                            onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="INR">Indian Rupee (₹)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                            <option value="GBP">British Pound (£)</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Description</label>
                        <textarea
                          value={generalSettings.platformDescription}
                          onChange={(e) =>
                            setGeneralSettings({ ...generalSettings, platformDescription: e.target.value })
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Control</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                            <p className="text-sm text-gray-500">Temporarily disable access to the platform</p>
                          </div>
                          <button
                            onClick={() =>
                              setGeneralSettings({
                                ...generalSettings,
                                maintenanceMode: !generalSettings.maintenanceMode,
                              })
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              generalSettings.maintenanceMode ? "bg-red-500" : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                generalSettings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">User Registration</h4>
                            <p className="text-sm text-gray-500">Allow new users to register</p>
                          </div>
                          <button
                            onClick={() =>
                              setGeneralSettings({
                                ...generalSettings,
                                registrationEnabled: !generalSettings.registrationEnabled,
                              })
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              generalSettings.registrationEnabled ? "bg-blue-500" : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                generalSettings.registrationEnabled ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Email Verification</h4>
                            <p className="text-sm text-gray-500">Require email verification for new accounts</p>
                          </div>
                          <button
                            onClick={() =>
                              setGeneralSettings({
                                ...generalSettings,
                                emailVerificationRequired: !generalSettings.emailVerificationRequired,
                              })
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              generalSettings.emailVerificationRequired ? "bg-blue-500" : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                generalSettings.emailVerificationRequired ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSaveSettings("General")}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        {Object.entries(notificationSettings).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {key === "emailNotifications" && "Receive notifications via email"}
                                {key === "smsNotifications" && "Receive notifications via SMS"}
                                {key === "pushNotifications" && "Receive browser push notifications"}
                                {key === "weeklyReports" && "Get weekly analytics reports"}
                                {key === "marketingEmails" && "Receive marketing and promotional emails"}
                                {key === "courseUpdates" && "Get notified about course updates"}
                                {key === "systemAlerts" && "Receive system maintenance alerts"}
                                {key === "paymentNotifications" && "Get notified about payment activities"}
                              </p>
                            </div>
                            <button
                              onClick={() => setNotificationSettings({ ...notificationSettings, [key]: !value })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                value ? "bg-blue-500" : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                  value ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSaveSettings("Notification")}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Configuration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session Timeout (minutes)
                          </label>
                          <input
                            type="number"
                            value={securitySettings.sessionTimeout}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                sessionTimeout: Number.parseInt(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                          <input
                            type="number"
                            value={securitySettings.passwordExpiry}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                passwordExpiry: Number.parseInt(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                          <input
                            type="number"
                            value={securitySettings.maxLoginAttempts}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                maxLoginAttempts: Number.parseInt(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist</label>
                          <input
                            type="text"
                            value={securitySettings.ipWhitelist}
                            onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                            placeholder="192.168.1.1, 10.0.0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                            <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                          </div>
                          <button
                            onClick={() =>
                              setSecuritySettings({
                                ...securitySettings,
                                twoFactorAuth: !securitySettings.twoFactorAuth,
                              })
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              securitySettings.twoFactorAuth ? "bg-blue-500" : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                securitySettings.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">SSL Encryption</h4>
                            <p className="text-sm text-gray-500">Force HTTPS connections</p>
                          </div>
                          <button
                            onClick={() =>
                              setSecuritySettings({ ...securitySettings, sslEnabled: !securitySettings.sslEnabled })
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              securitySettings.sslEnabled ? "bg-green-500" : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                securitySettings.sslEnabled ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Data Encryption</h4>
                            <p className="text-sm text-gray-500">Encrypt sensitive data at rest</p>
                          </div>
                          <button
                            onClick={() =>
                              setSecuritySettings({
                                ...securitySettings,
                                dataEncryption: !securitySettings.dataEncryption,
                              })
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              securitySettings.dataEncryption ? "bg-green-500" : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                securitySettings.dataEncryption ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSaveSettings("Security")}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Integration Settings */}
                {activeTab === "integrations" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Third-Party Integrations</h3>
                      <div className="space-y-6">
                        {/* Payment Gateway */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Payment Gateway</h4>
                              <p className="text-sm text-gray-500">Razorpay integration for payments</p>
                            </div>
                            <button
                              onClick={() => handleTestIntegration("Razorpay")}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Test Connection
                            </button>
                          </div>
                          <input
                            type="text"
                            value={integrationSettings.razorpayKey}
                            onChange={(e) =>
                              setIntegrationSettings({ ...integrationSettings, razorpayKey: e.target.value })
                            }
                            placeholder="Razorpay Key ID"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Analytics */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Google Analytics</h4>
                              <p className="text-sm text-gray-500">Track website analytics</p>
                            </div>
                            <button
                              onClick={() => handleTestIntegration("Google Analytics")}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Test Connection
                            </button>
                          </div>
                          <input
                            type="text"
                            value={integrationSettings.googleAnalytics}
                            onChange={(e) =>
                              setIntegrationSettings({ ...integrationSettings, googleAnalytics: e.target.value })
                            }
                            placeholder="GA Tracking ID"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Cloud Storage */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">AWS S3 Storage</h4>
                              <p className="text-sm text-gray-500">File storage and CDN</p>
                            </div>
                            <button
                              onClick={() => handleTestIntegration("AWS S3")}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Test Connection
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={integrationSettings.awsAccessKey}
                              onChange={(e) =>
                                setIntegrationSettings({ ...integrationSettings, awsAccessKey: e.target.value })
                              }
                              placeholder="AWS Access Key"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="password"
                              value={integrationSettings.awsSecretKey}
                              onChange={(e) =>
                                setIntegrationSettings({ ...integrationSettings, awsSecretKey: e.target.value })
                              }
                              placeholder="AWS Secret Key"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        {/* Communication */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Email Provider</h4>
                            <select
                              value={integrationSettings.emailProvider}
                              onChange={(e) =>
                                setIntegrationSettings({ ...integrationSettings, emailProvider: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="SendGrid">SendGrid</option>
                              <option value="Mailgun">Mailgun</option>
                              <option value="AWS SES">AWS SES</option>
                            </select>
                          </div>
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Video Provider</h4>
                            <select
                              value={integrationSettings.videoProvider}
                              onChange={(e) =>
                                setIntegrationSettings({ ...integrationSettings, videoProvider: e.target.value })
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="Zoom">Zoom</option>
                              <option value="Google Meet">Google Meet</option>
                              <option value="Microsoft Teams">Microsoft Teams</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSaveSettings("Integration")}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Advanced Settings */}
                {activeTab === "advanced" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Management</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                          🔄 Clear Cache
                        </button>
                        <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                          📊 Generate Reports
                        </button>
                        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                          💾 Backup Database
                        </button>
                        <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">
                          🔍 System Diagnostics
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Export Data</h4>
                          <p className="text-sm text-gray-500 mb-4">Export platform data for backup or migration</p>
                          <div className="flex space-x-2">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                              Export Users
                            </button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                              Export Courses
                            </button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                              Export All Data
                            </button>
                          </div>
                        </div>

                        <div className="border border-red-200 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-red-900 mb-2">Danger Zone</h4>
                          <p className="text-sm text-red-600 mb-4">These actions cannot be undone</p>
                          <div className="flex space-x-2">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                              Reset Platform
                            </button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
                              Delete All Data
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Platform Version:</span>
                            <span className="ml-2 text-gray-600">v2.1.0</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Database Version:</span>
                            <span className="ml-2 text-gray-600">PostgreSQL 14.2</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Server Uptime:</span>
                            <span className="ml-2 text-gray-600">15 days, 4 hours</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Last Backup:</span>
                            <span className="ml-2 text-gray-600">2 hours ago</span>
                          </div>
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
    </div>
  )
}
