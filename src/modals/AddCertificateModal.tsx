import React, { useState } from 'react'
import type { CertificateTemplate } from '../../types/dashboard'

interface AddCertificateModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCertificate: (certificate: Omit<CertificateTemplate, 'id' | 'createdDate'>) => void
}

export const AddCertificateModal: React.FC<AddCertificateModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddCertificate 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    template: '',
    isActive: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddCertificate(formData)
    setFormData({
      name: '',
      course: '',
      template: '',
      isActive: true
    })
    onClose()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a server
      setFormData({ ...formData, template: file.name })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-md border border-[#0097A7] shadow-2xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Upload Certificate Template</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Template Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white placeholder-gray-400"
              placeholder="e.g., Blockchain Certificate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Course</label>
            <select
              required
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#0097A7] focus:border-transparent text-white"
            >
              <option value="">Select Course</option>
              <option value="AI + Blockchain Bootcamp">AI + Blockchain Bootcamp</option>
              <option value="Web3 Development">Web3 Development</option>
              <option value="Smart Contract Security">Smart Contract Security</option>
              <option value="DeFi Protocol Development">DeFi Protocol Development</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Certificate Template</label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-[#0097A7] transition-colors">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="hidden"
                id="template-upload"
              />
              <label htmlFor="template-upload" className="cursor-pointer">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-gray-300 mb-1">Click to upload template</p>
                <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                {formData.template && (
                  <p className="text-[#0097A7] mt-2 text-sm">✓ {formData.template}</p>
                )}
              </label>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-gray-600 bg-gray-800 text-[#0097A7] focus:ring-[#0097A7]"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-300">
              Set as active template
            </label>
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
              Upload Template
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}