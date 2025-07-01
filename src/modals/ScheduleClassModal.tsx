import React, { useState } from 'react'
import type { LiveSession } from '@/types/dashboard'

interface ScheduleClassModalProps {
  isOpen: boolean
  onClose: () => void
  onScheduleClass: (session: Omit<LiveSession, 'id' | 'enrolled'>) => void
}

export const ScheduleClassModal: React.FC<ScheduleClassModalProps> = ({ isOpen, onClose, onScheduleClass }) => {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    date: '',
    time: '',
    duration: '',
    maxStudents: '',
    description: '',
    meetLink: '',
    status: 'upcoming' as const
  })

  const generateMeetLink = () => {
    const meetId = Math.random().toString(36).substring(2, 15)
    const meetLink = `https://meet.google.com/${meetId}`
    setFormData({ ...formData, meetLink })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onScheduleClass({
      ...formData,
      maxStudents: Number(formData.maxStudents) // Convert maxStudents to a number
    })
    setFormData({
      title: '',
      instructor: '',
      date: '',
      time: '',
      duration: '',
      maxStudents: '',
      description: '',
      meetLink: '',
      status: 'upcoming'
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-md border border-[#0097A7] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Schedule Live Class</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Class Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
              placeholder="Enter class title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Instructor</label>
            <select
              required
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white"
            >
              <option value="">Select Instructor</option>
              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
              <option value="Michael Chen">Michael Chen</option>
              <option value="Alex Rodriguez">Alex Rodriguez</option>
              <option value="Emma Thompson">Emma Thompson</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
              <select
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white"
              >
                <option value="">Select Duration</option>
                <option value="1 hour">1 hour</option>
                <option value="1.5 hours">1.5 hours</option>
                <option value="2 hours">2 hours</option>
                <option value="2.5 hours">2.5 hours</option>
                <option value="3 hours">3 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Students</label>
              <input
                type="number"
                required
                value={formData.maxStudents}
                onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
                placeholder="50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Google Meet Link</label>
            <div className="flex space-x-2">
              <input
                type="url"
                value={formData.meetLink}
                onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
                placeholder="https://meet.google.com/..."
              />
              <button
                type="button"
                onClick={generateMeetLink}
                className="px-4 py-3 bg-gradient-to-r from-[#0097A7] to-blue-600 text-white rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all whitespace-nowrap"
              >
                Generate
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
              rows={3}
              placeholder="Class description"
            />
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
              Schedule Class
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}