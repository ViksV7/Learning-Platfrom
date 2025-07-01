"use client"

import type React from "react"
import { useState } from "react"
import type { DashboardConfig } from "../../types/dashboard"
import { Sidebar } from "@/components/Sidebar"
import { NotificationCenter } from "@/components/NotificationCenter"
import { useNotifications } from "../../contexts/NotificationContext"

interface DiscussionForumsProps {
  config: DashboardConfig
  onNavigate: (path: string) => void
}

const forumCategories = [
  {
    id: "1",
    name: "General Discussion",
    description: "General topics and announcements",
    topics: 45,
    posts: 234,
    lastActivity: "2 hours ago",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Full Stack Development",
    description: "React, Node.js, MongoDB discussions",
    topics: 78,
    posts: 456,
    lastActivity: "30 minutes ago",
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Blockchain & Web3",
    description: "Smart contracts, DeFi, and crypto discussions",
    topics: 34,
    posts: 189,
    lastActivity: "1 hour ago",
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "AI & Machine Learning",
    description: "ML algorithms, Python, TensorFlow discussions",
    topics: 56,
    posts: 298,
    lastActivity: "45 minutes ago",
    color: "bg-orange-500",
  },
  {
    id: "5",
    name: "DevOps & Cloud",
    description: "AWS, Docker, Kubernetes discussions",
    topics: 23,
    posts: 134,
    lastActivity: "3 hours ago",
    color: "bg-indigo-500",
  },
  {
    id: "6",
    name: "Career Guidance",
    description: "Job search, interviews, career advice",
    topics: 67,
    posts: 345,
    lastActivity: "1 hour ago",
    color: "bg-pink-500",
  },
]

const recentTopics = [
  {
    id: "1",
    title: "Best practices for React performance optimization",
    author: "Arjun Mehta",
    category: "Full Stack Development",
    replies: 12,
    views: 234,
    lastReply: "15 minutes ago",
    lastReplyBy: "Priya Sharma",
    isPinned: true,
    tags: ["React", "Performance", "Optimization"],
  },
  {
    id: "2",
    title: "How to deploy smart contracts on Polygon network?",
    author: "Kavya Reddy",
    category: "Blockchain & Web3",
    replies: 8,
    views: 156,
    lastReply: "1 hour ago",
    lastReplyBy: "Rahul Kumar",
    isPinned: false,
    tags: ["Polygon", "Smart Contracts", "Deployment"],
  },
  {
    id: "3",
    title: "Machine Learning model deployment best practices",
    author: "Rohit Sharma",
    category: "AI & Machine Learning",
    replies: 15,
    views: 298,
    lastReply: "2 hours ago",
    lastReplyBy: "Ankit Singh",
    isPinned: true,
    tags: ["ML", "Deployment", "Production"],
  },
  {
    id: "4",
    title: "Docker vs Kubernetes: When to use what?",
    author: "Neha Agarwal",
    category: "DevOps & Cloud",
    replies: 6,
    views: 189,
    lastReply: "3 hours ago",
    lastReplyBy: "Sneha Patel",
    isPinned: false,
    tags: ["Docker", "Kubernetes", "DevOps"],
  },
  {
    id: "5",
    title: "Transitioning from frontend to full-stack development",
    author: "Siddharth Jain",
    category: "Career Guidance",
    replies: 23,
    views: 567,
    lastReply: "4 hours ago",
    lastReplyBy: "Vikram Gupta",
    isPinned: false,
    tags: ["Career", "Full Stack", "Transition"],
  },
  {
    id: "6",
    title: "Welcome to the new discussion forum!",
    author: "Admin",
    category: "General Discussion",
    replies: 34,
    views: 789,
    lastReply: "5 hours ago",
    lastReplyBy: "Kavya Reddy",
    isPinned: true,
    tags: ["Welcome", "Announcement"],
  },
]

const topContributors = [
  { name: "Priya Sharma", posts: 156, reputation: 2340, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Ankit Singh", posts: 134, reputation: 2100, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Rahul Kumar", posts: 98, reputation: 1890, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Sneha Patel", posts: 87, reputation: 1650, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Arjun Mehta", posts: 76, reputation: 1420, avatar: "/placeholder.svg?height=40&width=40" },
]

export const DiscussionForums: React.FC<DiscussionForumsProps> = ({ config, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCreateTopic, setShowCreateTopic] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { addNotification } = useNotifications()

  const handleCreateTopic = (topicData: any) => {
    console.log("Creating topic:", topicData)
    addNotification({
      type: "success",
      title: "Topic Created",
      message: `Your topic "${topicData.title}" has been posted successfully.`,
      category: "message",
    })
    setShowCreateTopic(false)
  }

  const handlePinTopic = (topicId: string, title: string) => {
    addNotification({
      type: "info",
      title: "Topic Pinned",
      message: `Topic "${title}" has been pinned to the top.`,
      category: "system",
    })
  }

  const handleDeleteTopic = (topicId: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      addNotification({
        type: "warning",
        title: "Topic Deleted",
        message: `Topic "${title}" has been deleted.`,
        category: "system",
      })
    }
  }

  const filteredTopics = recentTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

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
              Discussion Forums
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
                        d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Topics</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {forumCategories.reduce((sum, cat) => sum + cat.topics, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Posts</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {forumCategories.reduce((sum, cat) => sum + cat.posts, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Members</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Categories</p>
                    <p className="text-2xl font-bold text-gray-900">{forumCategories.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="flex space-x-3">
                {config.user.role === "admin" && (
                  <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Manage Categories
                  </button>
                )}
                <button
                  onClick={() => setShowCreateTopic(true)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + New Topic
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Categories Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-3">
                    {forumCategories.map((category) => (
                      <div
                        key={category.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedCategory === category.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
                            <p className="text-xs text-gray-500">{category.topics} topics</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Contributors */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contributors</h3>
                  <div className="space-y-3">
                    {topContributors.map((contributor, index) => (
                      <div key={contributor.name} className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                        </div>
                        <img
                          src={contributor.avatar || "/placeholder.svg"}
                          alt={contributor.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{contributor.name}</p>
                          <p className="text-xs text-gray-500">{contributor.posts} posts</p>
                        </div>
                        <div className="text-xs text-gray-500">{contributor.reputation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Topics List */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Topics</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {filteredTopics.map((topic) => (
                      <div key={topic.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {topic.isPinned && (
                                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 6.707 6.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                              <h4 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                                {topic.title}
                              </h4>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <span>By {topic.author}</span>
                              <span>in {topic.category}</span>
                              <span>{topic.views} views</span>
                              <span>{topic.replies} replies</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {topic.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <div className="text-sm text-gray-500">
                              Last reply {topic.lastReply}
                              <br />
                              by {topic.lastReplyBy}
                            </div>
                            {config.user.role === "admin" && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handlePinTopic(topic.id, topic.title)}
                                  className="text-yellow-600 hover:text-yellow-800 text-sm"
                                >
                                  Pin
                                </button>
                                <button
                                  onClick={() => handleDeleteTopic(topic.id, topic.title)}
                                  className="text-red-600 hover:text-red-800 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Create Topic Modal */}
      {showCreateTopic && (
        <CreateTopicModal
          categories={forumCategories}
          onClose={() => setShowCreateTopic(false)}
          onSubmit={handleCreateTopic}
        />
      )}
    </div>
  )
}

// Create Topic Modal
interface CreateTopicModalProps {
  categories: any[]
  onClose: () => void
  onSubmit: (topicData: any) => void
}

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({ categories, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Create New Topic</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topic Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter topic title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your topic content here..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="React, JavaScript, Help"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Create Topic
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
