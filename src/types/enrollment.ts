// services/enrollmentService.ts

import User from '../models/User'
import Course from '../models/Course'
import Activity from '../models/Activity'
import { EnrollmentRequest, EnrollmentData } from '../types/enrollment'

export class EnrollmentService {
  
  // Get all enrollments
  static async getAllEnrollments(): Promise<EnrollmentData[]> {
    try {
      // This would typically fetch from an Enrollment model
      // For now, returning empty array as placeholder
      const enrollments: EnrollmentData[] = []
      return enrollments
    } catch (error) {
      console.error('Service: Get all enrollments error:', error)
      throw new Error('Failed to fetch enrollments')
    }
  }

  // Create new enrollment
  static async createEnrollment(enrollmentData: EnrollmentRequest): Promise<EnrollmentData> {
    try {
      const { userId, courseId, paymentMethod, amount } = enrollmentData

      // Check if user exists
      const user = await User.findById(userId)
      if (!user) {
        throw new Error('User not found')
      }

      // Check if course exists
      const course = await Course.findById(courseId)
      if (!course) {
        throw new Error('Course not found')
      }

      // Create enrollment data
      const newEnrollment: EnrollmentData = {
        id: `enr_${Date.now()}`, // Temporary ID generation
        userId,
        courseId,
        enrolledAt: new Date(),
        status: 'active',
        user: {
          name: user.name,
          email: user.email
        },
        course: {
          title: course.title,
          duration: course.duration
        }
      }

      // Log enrollment activity
      await this.logEnrollmentActivity(user, course, newEnrollment.id, paymentMethod, amount)

      return newEnrollment
    } catch (error) {
      console.error('Service: Create enrollment error:', error)
      throw error
    }
  }

  // Get enrollments by user ID
  static async getEnrollmentsByUserId(userId: string): Promise<{ enrollments: EnrollmentData[], user: any }> {
    try {
      // Check if user exists
      const user = await User.findById(userId)
      if (!user) {
        throw new Error('User not found')
      }

      // Fetch user's enrollments (placeholder for now)
      const userEnrollments: EnrollmentData[] = []

      return {
        enrollments: userEnrollments,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    } catch (error) {
      console.error('Service: Get user enrollments error:', error)
      throw error
    }
  }

  // Get enrollment by ID
  static async getEnrollmentById(enrollmentId: string): Promise<EnrollmentData | null> {
    try {
      // Placeholder for fetching specific enrollment
      // This would typically query an Enrollment model
      return null
    } catch (error) {
      console.error('Service: Get enrollment by ID error:', error)
      throw new Error('Failed to fetch enrollment details')
    }
  }

  // Cancel enrollment
  static async cancelEnrollment(enrollmentId: string): Promise<{ enrollmentId: string, status: string, cancelledAt: Date }> {
    try {
      // Here you would typically:
      // 1. Find the enrollment by ID
      // 2. Update enrollment status to 'cancelled'
      // 3. Log the cancellation activity

      return {
        enrollmentId,
        status: 'cancelled',
        cancelledAt: new Date()
      }
    } catch (error) {
      console.error('Service: Cancel enrollment error:', error)
      throw new Error('Failed to cancel enrollment')
    }
  }

  // Private method to log enrollment activity
  private static async logEnrollmentActivity(
    user: any, 
    course: any, 
    enrollmentId: string, 
    paymentMethod?: string, 
    amount?: number
  ): Promise<void> {
    try {
      const activity = new Activity({
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        type: 'enrollment',
        description: `${user.name} enrolled in ${course.title}`,
        metadata: {
          courseId: course._id,
          courseName: course.title,
          paymentMethod,
          amount,
          enrollmentId
        }
      })
      await activity.save()
    } catch (error) {
      console.error('Service: Log enrollment activity error:', error)
      // Don't throw error here to avoid breaking enrollment creation
    }
  }
}