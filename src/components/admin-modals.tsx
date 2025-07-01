"use client"

import { useState } from "react"
import { Icons } from "./Icons"

// Type definitions
interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  price: string
  category: string
  level: string
  status: string
  students: number
}

interface Class {
  id: string
  title: string
  instructor: string
  date: string
  time: string
  duration: string
  maxStudents: string
  description: string
  enrolled: number
  status: string
}

interface PaymentPlan {
  id: string
  name: string
  price: number
  duration: string
  description: string
  features: string[]
}

// Component Props Types
interface AddCourseModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCourse: (course: Omit<Course, 'id' | 'status' | 'students'> & { id: string; status: string; students: number }) => void
}

interface ScheduleClassModalProps {
  isOpen: boolean
  onClose: () => void
  onScheduleClass: (classData: Omit<Class, 'id' | 'enrolled' | 'status'> & { id: string; enrolled: number; status: string }) => void
}

interface AddPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPlan: (plan: Omit<PaymentPlan, 'id'> & { id: string }) => void
}

// Add Course Modal
export const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAddCourse }) => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
    price: "",
    category: "",
    level: "beginner",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddCourse({
      ...courseData,
      id: Date.now().toString(),
      status: "draft",
      students: 0,
    })
    setCourseData({
      title: "",
      description: "",
      instructor: "",
      duration: "",
      price: "",
      category: "",
      level: "beginner",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add New Course</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Icons.Close />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
              <input
                type="text"
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
              <select
                value={courseData.instructor}
                onChange={(e) => setCourseData({ ...courseData, instructor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Instructor</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Michael Chen">Michael Chen</option>
                <option value="Alex Rodriguez">Alex Rodriguez</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={courseData.duration}
                onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                placeholder="e.g., 8 weeks"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                value={courseData.price}
                onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={courseData.category}
                onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="blockchain">Blockchain</option>
                <option value="ai">AI/ML</option>
                <option value="web3">Web3</option>
                <option value="cybersecurity">Cybersecurity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={courseData.level}
                onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={courseData.description}
              onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Schedule Class Modal
export const ScheduleClassModal: React.FC<ScheduleClassModalProps> = ({ isOpen, onClose, onScheduleClass }) => {
  const [classData, setClassData] = useState({
    title: "",
    instructor: "",
    date: "",
    time: "",
    duration: "",
    maxStudents: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onScheduleClass({
      ...classData,
      id: Date.now().toString(),
      enrolled: 0,
      status: "upcoming",
    })
    setClassData({
      title: "",
      instructor: "",
      date: "",
      time: "",
      duration: "",
      maxStudents: "",
      description: "",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Schedule Live Class</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Icons.Close />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Title</label>
              <input
                type="text"
                value={classData.title}
                onChange={(e) => setClassData({ ...classData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
              <select
                value={classData.instructor}
                onChange={(e) => setClassData({ ...classData, instructor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Instructor</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Michael Chen">Michael Chen</option>
                <option value="Alex Rodriguez">Alex Rodriguez</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={classData.date}
                onChange={(e) => setClassData({ ...classData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                value={classData.time}
                onChange={(e) => setClassData({ ...classData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={classData.duration}
                onChange={(e) => setClassData({ ...classData, duration: e.target.value })}
                placeholder="e.g., 2 hours"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Students</label>
              <input
                type="number"
                value={classData.maxStudents}
                onChange={(e) => setClassData({ ...classData, maxStudents: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={classData.description}
              onChange={(e) => setClassData({ ...classData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schedule Class
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Add Payment Plan Modal
export const AddPlanModal: React.FC<AddPlanModalProps> = ({ isOpen, onClose, onAddPlan }) => {
  const [planData, setPlanData] = useState({
    name: "",
    price: "",
    duration: "Monthly",
    description: "",
    features: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddPlan({
      ...planData,
      id: Date.now().toString(),
      price: Number.parseFloat(planData.price),
    })
    setPlanData({
      name: "",
      price: "",
      duration: "Monthly",
      description: "",
      features: [],
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Payment Plan</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Icons.Close />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Plan Name</label>
            <input
              type="text"
              value={planData.name}
              onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                value={planData.price}
                onChange={(e) => setPlanData({ ...planData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select
                value={planData.duration}
                onChange={(e) => setPlanData({ ...planData, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={planData.description}
              onChange={(e) => setPlanData({ ...planData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}