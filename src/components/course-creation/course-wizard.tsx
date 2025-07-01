"use client"

import React, { useState, useCallback, memo } from "react"
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  Settings,
  Upload,
  Plus,
  Trash2,
  Eye,
  Save,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "../hooks/use-toast"
import { useAuth } from "../../contexts/auth-context"

interface CourseData {
  title: string
  description: string
  category: string
  level: string
  price: number
  duration: string
  thumbnail: string
  tags: string[]
  modules: Module[]
  settings: CourseSettings
}

interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  type: "video" | "text" | "quiz" | "assignment"
  content: string
  duration: number
  resources: string[]
}

interface CourseSettings {
  isPublic: boolean
  allowComments: boolean
  certificateEnabled: boolean
  prerequisiteCourses: string[]
}

const CourseWizard: React.FC = memo(() => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    category: "",
    level: "",
    price: 0,
    duration: "",
    thumbnail: "",
    tags: [],
    modules: [],
    settings: {
      isPublic: true,
      allowComments: true,
      certificateEnabled: false,
      prerequisiteCourses: [],
    },
  })

  const steps = [
    { id: 0, title: "Basic Info", icon: BookOpen, description: "Course title, description, and category" },
    { id: 1, title: "Content", icon: Video, description: "Add modules and lessons" },
    { id: 2, title: "Resources", icon: FileText, description: "Upload materials and resources" },
    { id: 3, title: "Settings", icon: Settings, description: "Configure course settings" },
    { id: 4, title: "Preview", icon: Eye, description: "Review and publish" },
  ]

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Blockchain",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
    "Digital Marketing",
  ]

  const levels = ["Beginner", "Intermediate", "Advanced"]

  const updateCourseData = useCallback((field: keyof CourseData, value: any) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
  }, [])

  const addModule = useCallback(() => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: "",
      description: "",
      lessons: [],
    }
    setCourseData((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }))
  }, [])

  const updateModule = useCallback((moduleId: string, field: keyof Module, value: any) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) => (module.id === moduleId ? { ...module, [field]: value } : module)),
    }))
  }, [])

  const deleteModule = useCallback((moduleId: string) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.filter((module) => module.id !== moduleId),
    }))
  }, [])

  const addLesson = useCallback((moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: "",
      type: "video",
      content: "",
      duration: 0,
      resources: [],
    }
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, newLesson] } : module,
      ),
    }))
  }, [])

  const updateLesson = useCallback((moduleId: string, lessonId: string, field: keyof Lesson, value: any) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, [field]: value } : lesson,
              ),
            }
          : module,
      ),
    }))
  }, [])

  const deleteLesson = useCallback((moduleId: string, lessonId: string) => {
    setCourseData((prev) => ({
      ...prev,
      modules: prev.modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
          : module,
      ),
    }))
  }, [])

  const handleTagAdd = useCallback(
    (tag: string) => {
      if (tag && !courseData.tags.includes(tag)) {
        updateCourseData("tags", [...courseData.tags, tag])
      }
    },
    [courseData.tags, updateCourseData],
  )

  const handleTagRemove = useCallback(
    (tagToRemove: string) => {
      updateCourseData(
        "tags",
        courseData.tags.filter((tag) => tag !== tagToRemove),
      )
    },
    [courseData.tags, updateCourseData],
  )

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveDraft = async () => {
    toast({
      title: "Draft saved",
      description: "Your course has been saved as a draft",
      variant: "success",
    })
  }

  const publishCourse = async () => {
    // Validate course data
    if (!courseData.title || !courseData.description || !courseData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Course Published!",
      description: "Your course is now live and available to students",
      variant: "success",
    })
  }

  const getStepProgress = () => {
    return ((currentStep + 1) / steps.length) * 100
  }

  const BasicInfoStep = memo(() => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-white">
            Course Title *
          </Label>
          <Input
            id="title"
            value={courseData.title}
            onChange={(e) => updateCourseData("title", e.target.value)}
            placeholder="Enter course title"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">
            Category *
          </Label>
          <Select value={courseData.category} onValueChange={(value) => updateCourseData("category", value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-white">
          Description *
        </Label>
        <Textarea
          id="description"
          value={courseData.description}
          onChange={(e) => updateCourseData("description", e.target.value)}
          placeholder="Describe your course..."
          rows={4}
          className="bg-gray-700 border-gray-600 text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="level" className="text-white">
            Level
          </Label>
          <Select value={courseData.level} onValueChange={(value) => updateCourseData("level", value)}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {levels.map((level) => (
                <SelectItem key={level} value={level} className="text-white">
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-white">
            Price (₹)
          </Label>
          <Input
            id="price"
            type="number"
            value={courseData.price}
            onChange={(e) => updateCourseData("price", Number.parseInt(e.target.value) || 0)}
            placeholder="0"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-white">
            Duration
          </Label>
          <Input
            id="duration"
            value={courseData.duration}
            onChange={(e) => updateCourseData("duration", e.target.value)}
            placeholder="e.g., 8 weeks"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {courseData.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-cyan-400 text-cyan-400">
              {tag}
              <button onClick={() => handleTagRemove(tag)} className="ml-2 text-red-400 hover:text-red-300">
                ×
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Add a tag"
            className="bg-gray-700 border-gray-600 text-white"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleTagAdd(e.currentTarget.value)
                e.currentTarget.value = ""
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const input = document.querySelector('input[placeholder="Add a tag"]') as HTMLInputElement
              if (input?.value) {
                handleTagAdd(input.value)
                input.value = ""
              }
            }}
            className="border-gray-600 text-gray-400"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  ))

  const ContentStep = memo(() => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Course Modules</h3>
        <Button onClick={addModule} className="bg-gradient-to-r from-cyan-500 to-blue-600">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      {courseData.modules.length === 0 ? (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No modules yet. Add your first module to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {courseData.modules.map((module, moduleIndex) => (
            <Card key={module.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={module.title}
                      onChange={(e) => updateModule(module.id, "title", e.target.value)}
                      placeholder={`Module ${moduleIndex + 1} Title`}
                      className="bg-gray-700 border-gray-600 text-white font-semibold"
                    />
                    <Textarea
                      value={module.description}
                      onChange={(e) => updateModule(module.id, "description", e.target.value)}
                      placeholder="Module description..."
                      rows={2}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteModule(module.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">Lessons</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addLesson(module.id)}
                      className="border-gray-600 text-gray-400"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Lesson
                    </Button>
                  </div>

                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="bg-gray-700/30 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          value={lesson.title}
                          onChange={(e) => updateLesson(module.id, lesson.id, "title", e.target.value)}
                          placeholder={`Lesson ${lessonIndex + 1} Title`}
                          className="bg-gray-600 border-gray-500 text-white"
                        />
                        <div className="flex space-x-2">
                          <Select
                            value={lesson.type}
                            onValueChange={(value) => updateLesson(module.id, lesson.id, "type", value)}
                          >
                            <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-600 border-gray-500">
                              <SelectItem value="video" className="text-white">
                                Video
                              </SelectItem>
                              <SelectItem value="text" className="text-white">
                                Text
                              </SelectItem>
                              <SelectItem value="quiz" className="text-white">
                                Quiz
                              </SelectItem>
                              <SelectItem value="assignment" className="text-white">
                                Assignment
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteLesson(module.id, lesson.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  ))

  const ResourcesStep = memo(() => (
    <div className="space-y-6">
      <div className="text-center">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Upload Course Resources</h3>
        <p className="text-gray-400">Add videos, documents, and other materials for your course</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Course Thumbnail</CardTitle>
            <CardDescription className="text-gray-400">Upload a cover image for your course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Click to upload or drag and drop</p>
              <p className="text-gray-500 text-xs">PNG, JPG up to 2MB</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Course Materials</CardTitle>
            <CardDescription className="text-gray-400">Upload additional resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Upload PDFs, documents, code files</p>
              <p className="text-gray-500 text-xs">Multiple files supported</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ))

  const SettingsStep = memo(() => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Course Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Visibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Public Course</p>
                <p className="text-gray-400 text-sm">Anyone can find and enroll</p>
              </div>
              <input
                type="checkbox"
                checked={courseData.settings.isPublic}
                onChange={(e) =>
                  updateCourseData("settings", {
                    ...courseData.settings,
                    isPublic: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Allow Comments</p>
                <p className="text-gray-400 text-sm">Students can comment on lessons</p>
              </div>
              <input
                type="checkbox"
                checked={courseData.settings.allowComments}
                onChange={(e) =>
                  updateCourseData("settings", {
                    ...courseData.settings,
                    allowComments: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Enable Certificates</p>
                <p className="text-gray-400 text-sm">Award certificates upon completion</p>
              </div>
              <input
                type="checkbox"
                checked={courseData.settings.certificateEnabled}
                onChange={(e) =>
                  updateCourseData("settings", {
                    ...courseData.settings,
                    certificateEnabled: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ))

  const PreviewStep = memo(() => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Course Preview</h3>
        <p className="text-gray-400">Review your course before publishing</p>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{courseData.title || "Untitled Course"}</CardTitle>
          <CardDescription className="text-gray-400">{courseData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Category</p>
              <p className="text-white">{courseData.category || "Not set"}</p>
            </div>
            <div>
              <p className="text-gray-400">Level</p>
              <p className="text-white">{courseData.level || "Not set"}</p>
            </div>
            <div>
              <p className="text-gray-400">Price</p>
              <p className="text-white">₹{courseData.price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Modules</p>
              <p className="text-white">{courseData.modules.length}</p>
            </div>
          </div>

          {courseData.tags.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {courseData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-cyan-400 text-cyan-400">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button onClick={saveDraft} variant="outline" className="flex-1 border-gray-600 text-gray-400">
          <Save className="h-4 w-4 mr-2" />
          Save as Draft
        </Button>
        <Button onClick={publishCourse} className="flex-1 bg-gradient-to-r from-green-500 to-green-600">
          <CheckCircle className="h-4 w-4 mr-2" />
          Publish Course
        </Button>
      </div>
    </div>
  ))

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep />
      case 1:
        return <ContentStep />
      case 2:
        return <ResourcesStep />
      case 3:
        return <SettingsStep />
      case 4:
        return <PreviewStep />
      default:
        return <BasicInfoStep />
    }
  }

  // Check if user is instructor or admin
  if (user?.role !== "instructor" && user?.role !== "admin") {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-400">Only instructors can create courses.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Course</h1>
          <p className="text-gray-400">Build and publish your course step by step</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-400">{Math.round(getStepProgress())}% Complete</span>
          </div>
          <Progress value={getStepProgress()} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 ${index <= currentStep ? "text-cyan-400" : "text-gray-500"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? "bg-cyan-500" : "bg-gray-600"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <div className="hidden md:block">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-xs text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              {React.createElement(steps[currentStep].icon, { className: "h-5 w-5" })}
              <span>{steps[currentStep].title}</span>
            </CardTitle>
            <CardDescription className="text-gray-400">{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
            className="border-gray-600 text-gray-400"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <div className="space-x-2">
              <Button onClick={saveDraft} variant="outline" className="border-gray-600 text-gray-400">
                Save Draft
              </Button>
              <Button onClick={publishCourse} className="bg-gradient-to-r from-green-500 to-green-600">
                Publish Course
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

CourseWizard.displayName = "CourseWizard"

export default CourseWizard
