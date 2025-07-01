import React, { useState } from 'react'
import type { PaymentPlan } from '../../types/dashboard'
import { AddPlanModal } from '../modals/AddPlanModal'

interface PaymentPlansProps {
  onNavigate?: (path: string) => void
}

export const PaymentPlans: React.FC<PaymentPlansProps> = () => {
  const [showAddPlanModal, setShowAddPlanModal] = useState(false)
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([
    {
      id: '1',
      name: 'Basic Plan',
      price: 99,
      duration: 'Monthly',
      description: 'Perfect for beginners starting their learning journey',
      features: [
        'Access to 5 courses',
        'Basic support',
        'Certificate of completion',
        'Community access'
      ]
    },
    {
      id: '2',
      name: 'Premium Plan',
      price: 199,
      duration: 'Monthly',
      description: 'Best value for serious learners',
      features: [
        'Unlimited course access',
        'Priority support',
        'Live sessions',
        'Certificates',
        '1-on-1 mentoring',
        'Project reviews'
      ]
    },
    {
      id: '3',
      name: 'Enterprise Plan',
      price: 499,
      duration: 'Monthly',
      description: 'For teams and organizations',
      features: [
        'Everything in Premium',
        'Team management',
        'Custom courses',
        'Analytics dashboard',
        'Dedicated support',
        'API access'
      ]
    }
  ])

  const handleAddPlan = (planData: Omit<PaymentPlan, 'id'>) => {
    const newPlan: PaymentPlan = {
      ...planData,
      id: Date.now().toString()
    }
    setPaymentPlans(prev => [newPlan, ...prev])
  }

  const handleDeletePlan = (planId: string) => {
    setPaymentPlans(prev => prev.filter(plan => plan.id !== planId))
  }

  const handleEditPlan = (planId: string) => {
    alert(`Editing plan ${planId}! This would open the edit modal.`)
  }

  const handleSubscribe = (planId: string) => {
    alert(`Subscribing to plan ${planId}! This would integrate with payment processing.`)
  }

  const getDurationColor = (duration: string) => {
    switch (duration) {
      case 'Monthly': return 'bg-blue-600 text-blue-100'
      case 'Yearly': return 'bg-green-600 text-green-100'
      case 'Lifetime': return 'bg-purple-600 text-purple-100'
      default: return 'bg-gray-600 text-gray-100'
    }
  }

  const getPlanIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'basic plan': return '🌟'
      case 'premium plan': return '💎'
      case 'enterprise plan': return '🏢'
      default: return '💳'
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 text-white border border-[#0097A7] shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Payment Plans</h1>
            <p className="opacity-90">Choose the perfect plan for your learning journey</p>
          </div>
          {/* Only show Add Plan button for admin */}
          {window.location.pathname.includes('admin') && (
            <button
              onClick={() => setShowAddPlanModal(true)}
              className="bg-gradient-to-r from-[#0097A7] to-blue-600 text-white px-4 py-2 rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Add New Plan</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Plans</p>
              <p className="text-2xl font-bold text-blue-400">{paymentPlans.length}</p>
            </div>
            <div className="text-3xl">💳</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Active Subscribers</p>
              <p className="text-2xl font-bold text-green-400">1,247</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Monthly Revenue</p>
              <p className="text-2xl font-bold text-purple-400">$125K</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-orange-400">12.5%</p>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentPlans.map((plan, index) => (
          <div key={plan.id} className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg border border-[#0097A7] hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden ${
            index === 1 ? 'ring-2 ring-[#0097A7] ring-opacity-50' : ''
          }`}>
            {/* Popular badge for middle plan */}
            {index === 1 && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#0097A7] to-blue-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getPlanIcon(plan.name)}</span>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              </div>
              {/* Only show admin controls for admin */}
              {window.location.pathname.includes('admin') && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditPlan(plan.id)}
                    className="text-blue-400 hover:text-blue-300 p-1 transition-colors"
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDeletePlan(plan.id)}
                    className="text-red-400 hover:text-red-300 p-1 transition-colors"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>

            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-[#0097A7] mb-1">${plan.price}</div>
              <div className="text-gray-400">per {plan.duration.toLowerCase()}</div>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full mt-2 ${getDurationColor(plan.duration)}`}>
                {plan.duration}
              </span>
            </div>

            <p className="text-gray-400 mb-6 text-center">{plan.description}</p>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-300">
                  <span className="text-green-400 mr-3 text-lg">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-700 pt-4">
              {window.location.pathname.includes('admin') ? (
                <div className="text-sm text-gray-400 text-center">
                  <div className="font-medium text-white">Subscribers: 423</div>
                  <div>Revenue: ${(plan.price * 423).toLocaleString()}/month</div>
                </div>
              ) : (
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    index === 1 
                      ? 'bg-gradient-to-r from-[#0097A7] to-blue-600 text-white hover:from-[#007A87] hover:to-blue-700 shadow-lg' 
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700'
                  }`}
                >
                  {index === 1 ? 'Get Started' : 'Choose Plan'}
                </button>
              )}
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0097A7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {paymentPlans.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💳</div>
          <h3 className="text-lg font-medium text-white mb-2">No payment plans yet</h3>
          <p className="text-gray-400 mb-4">Create your first payment plan to start monetizing</p>
          <button
            onClick={() => setShowAddPlanModal(true)}
            className="bg-gradient-to-r from-[#0097A7] to-blue-600 text-white px-6 py-2 rounded-lg hover:from-[#007A87] hover:to-blue-700 transition-all"
          >
            Add New Plan
          </button>
        </div>
      )}

      <AddPlanModal
        isOpen={showAddPlanModal}
        onClose={() => setShowAddPlanModal(false)}
        onAddPlan={handleAddPlan}
      />
    </div>
  )
}