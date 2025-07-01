import React, { useState } from 'react'
import type { Course } from '@/types/dashboard'

interface AddCourseModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCourse: (course: Omit<Course, 'id' | 'students'>) => void
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAddCourse }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    price: '',
    category: '',
    level: 'beginner',
    status: 'Draft' as const
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddCourse(formData)
    setFormData({
      title: '',
      description: '',
      instructor: '',
      duration: '',
      price: '',
      category: '',
      level: 'beginner',
      status: 'Draft'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-md border border-[#0097A7] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Add New Course</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Course Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
              rows={3}
              placeholder="Course description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Instructor</label>
            <input
              type="text"
              required
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
              placeholder="Instructor name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
                placeholder="e.g., 8 weeks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
                placeholder="299"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
              placeholder="e.g., blockchain, web3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#0097A7] to-blue-600 text-white rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}