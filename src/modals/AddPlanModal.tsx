import React, { useState } from 'react'
import type { PaymentPlan } from '../../types/dashboard'

interface AddPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPlan: (plan: Omit<PaymentPlan, 'id'>) => void
}

export const AddPlanModal: React.FC<AddPlanModalProps> = ({ isOpen, onClose, onAddPlan }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    duration: 'Monthly',
    description: '',
    features: ['']
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredFeatures = formData.features.filter(feature => feature.trim() !== '')
    onAddPlan({ ...formData, features: filteredFeatures })
    setFormData({
      name: '',
      price: 0,
      duration: 'Monthly',
      description: '',
      features: ['']
    })
    onClose()
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-md border border-[#0097A7] shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Add Payment Plan</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Plan Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
              placeholder="e.g., Premium Plan"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
                placeholder="99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Lifetime">Lifetime</option>
              </select>
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
              placeholder="Plan description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Features</label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter feature"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="text-[#0097A7] hover:text-blue-400 text-sm font-medium transition-colors"
            >
              + Add Feature
            </button>
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
              Add Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}