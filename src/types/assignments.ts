export interface Assignment {
    id: string
    title: string
    description: string
    courseId: string
    courseName: string
    dueDate: string
    maxPoints: number
    status: "Draft" | "Published" | "Closed"
    submissionType: "File" | "Text" | "Both"
    allowedFileTypes: string[]
    maxFileSize: number // in MB
    instructions: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Submission {
    id: string
    assignmentId: string
    studentId: string
    studentName: string
    submittedAt: string
    status: "Submitted" | "Late" | "Graded" | "Returned"
    files: SubmissionFile[]
    textContent?: string
    grade?: number
    feedback?: string
    gradedAt?: string
    gradedBy?: string
  }
  
  export interface SubmissionFile {
    id: string
    name: string
    size: number
    type: string
    url: string
    uploadedAt: string
  }
  
  export interface GradingRubric {
    id: string
    assignmentId: string
    criteria: RubricCriterion[]
  }
  
  export interface RubricCriterion {
    id: string
    name: string
    description: string
    maxPoints: number
    levels: RubricLevel[]
  }
  
  export interface RubricLevel {
    id: string
    name: string
    description: string
    points: number
  }
  