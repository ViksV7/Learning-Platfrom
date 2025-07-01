"use client"

import { useState } from "react"
// import { useParams } from "react-router-dom"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  Play,
  Download,
  Share2,
  Heart,
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  Code,
  Award,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import CoursePlayer from "../components/course-player"

const CourseDetail = () => {
  // const { id } = useParams()
  const [expandedModules, setExpandedModules] = useState<number[]>([0])
  const [, setCurrentLesson] = useState(0)

  // Mock course data - in real app, this would come from API based on ID
  const course = {
    id: 2,
    title: "Smart Contract Development",
    instructor: "Priya Singh",
    instructorAvatar: "PS",
    rating: 4.9,
    reviews: 1247,
    students: 5420,
    duration: "8 weeks",
    level: "Intermediate",
    price: "₹25,000",
    description:
      "Master Solidity programming and smart contract development. Learn to build secure, efficient smart contracts and deploy them on Ethereum blockchain.",
    whatYouLearn: [
      "Solidity programming language fundamentals",
      "Smart contract architecture and design patterns",
      "Security best practices and common vulnerabilities",
      "Testing and debugging smart contracts",
      "Deployment on Ethereum mainnet and testnets",
      "Integration with frontend applications",
    ],
    requirements: [
      "Basic programming knowledge (any language)",
      "Understanding of blockchain basics",
      "Computer with internet connection",
      "Willingness to learn and practice",
    ],
    modules: [
      {
        title: "Solidity Basics",
        duration: "2 weeks",
        lessons: [
          { title: "Introduction to Solidity", duration: "15 min", type: "video", completed: true },
          { title: "Variables and Data Types", duration: "20 min", type: "video", completed: true },
          { title: "Functions and Modifiers", duration: "25 min", type: "video", completed: true },
          { title: "Practice: First Smart Contract", duration: "30 min", type: "coding", completed: true },
          { title: "Quiz: Solidity Fundamentals", duration: "10 min", type: "quiz", completed: false },
        ],
      },
      {
        title: "Smart Contract Security",
        duration: "2 weeks",
        lessons: [
          { title: "Common Vulnerabilities", duration: "30 min", type: "video", completed: false },
          { title: "Reentrancy Attacks", duration: "25 min", type: "video", completed: false },
          { title: "Access Control Patterns", duration: "20 min", type: "video", completed: false },
          { title: "Security Audit Checklist", duration: "15 min", type: "document", completed: false },
          { title: "Secure Contract Exercise", duration: "45 min", type: "coding", completed: false },
        ],
      },
      {
        title: "Advanced Patterns",
        duration: "2 weeks",
        lessons: [
          { title: "Proxy Patterns", duration: "35 min", type: "video", completed: false },
          { title: "Factory Pattern", duration: "25 min", type: "video", completed: false },
          { title: "Oracle Integration", duration: "30 min", type: "video", completed: false },
          { title: "Gas Optimization", duration: "40 min", type: "video", completed: false },
        ],
      },
      {
        title: "Testing & Deployment",
        duration: "1 week",
        lessons: [
          { title: "Unit Testing with Hardhat", duration: "30 min", type: "video", completed: false },
          { title: "Integration Testing", duration: "25 min", type: "video", completed: false },
          { title: "Deployment Strategies", duration: "20 min", type: "video", completed: false },
          { title: "Mainnet Deployment", duration: "35 min", type: "video", completed: false },
        ],
      },
      {
        title: "DApp Integration",
        duration: "1 week",
        lessons: [
          { title: "Web3.js Integration", duration: "30 min", type: "video", completed: false },
          { title: "Frontend Connection", duration: "40 min", type: "video", completed: false },
          { title: "Final Project", duration: "2 hours", type: "project", completed: false },
        ],
      },
    ],
  }

  const toggleModule = (moduleIndex: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleIndex) ? prev.filter((i) => i !== moduleIndex) : [...prev, moduleIndex],
    )
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "coding":
        return <Code className="h-4 w-4" />
      case "quiz":
        return <Award className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "project":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Play className="h-4 w-4" />
    }
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Player */}
            <CoursePlayer title="Introduction to Solidity" duration="15:30" />

            {/* Course Info */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">{course.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>
                          {course.rating} ({course.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-400">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Course Content Tabs */}
            <Tabs defaultValue="curriculum" className="space-y-6">
              <TabsList className="bg-gray-800/50 border-gray-700">
                <TabsTrigger
                  value="curriculum"
                  className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                >
                  Curriculum
                </TabsTrigger>
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="instructor"
                  className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
                >
                  Instructor
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Course Curriculum</CardTitle>
                    <CardDescription className="text-gray-400">
                      {course.modules.length} modules • {totalLessons} lessons
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.modules.map((module, moduleIndex) => (
                        <Collapsible
                          key={moduleIndex}
                          open={expandedModules.includes(moduleIndex)}
                          onOpenChange={() => toggleModule(moduleIndex)}
                        >
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer">
                              <div className="flex items-center space-x-3">
                                {expandedModules.includes(moduleIndex) ? (
                                  <ChevronDown className="h-5 w-5 text-cyan-400" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-gray-400" />
                                )}
                                <div>
                                  <h3 className="text-white font-medium">{module.title}</h3>
                                  <p className="text-gray-400 text-sm">
                                    {module.lessons.length} lessons • {module.duration}
                                  </p>
                                </div>
                              </div>
                              <Badge variant="outline" className="border-cyan-400 text-cyan-400">
                                Module {moduleIndex + 1}
                              </Badge>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="mt-2 ml-8 space-y-2">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lessonIndex}
                                  className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors duration-300 cursor-pointer"
                                  onClick={() => setCurrentLesson(lessonIndex)}
                                >
                                  <div className="flex items-center space-x-3">
                                    <div
                                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                        lesson.completed
                                          ? "bg-green-500/20 text-green-400"
                                          : "bg-gray-600 text-gray-400"
                                      }`}
                                    >
                                      {lesson.completed ? (
                                        <CheckCircle className="h-4 w-4" />
                                      ) : (
                                        getIconForType(lesson.type)
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-white text-sm font-medium">{lesson.title}</p>
                                      <p className="text-gray-400 text-xs">{lesson.duration}</p>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                                    <Play className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overview">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Course Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                      <p className="text-gray-300 leading-relaxed">{course.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">What you'll learn</h3>
                      <ul className="space-y-2">
                        {course.whatYouLearn.map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {course.instructorAvatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{course.instructor}</h3>
                        <p className="text-cyan-400 mb-3">Senior Blockchain Developer & Educator</p>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Priya is a seasoned blockchain developer with over 8 years of experience in smart contract
                          development and DeFi protocols. She has worked with leading blockchain companies and has
                          taught thousands of students worldwide.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Students:</span>
                            <span className="text-white ml-2">15,420</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Courses:</span>
                            <span className="text-white ml-2">12</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Rating:</span>
                            <span className="text-white ml-2">4.9/5</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Experience:</span>
                            <span className="text-white ml-2">8+ years</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Student Reviews</CardTitle>
                    <CardDescription className="text-gray-400">
                      {course.rating}/5 based on {course.reviews} reviews
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="p-4 bg-gray-700/30 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                              A
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-white font-medium">Anonymous Student</span>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-300">
                                Excellent course! The instructor explains complex concepts very clearly and the hands-on
                                projects really help solidify the learning.
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-1">{progressPercentage}%</div>
                    <p className="text-gray-400 text-sm">Complete</p>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="text-sm text-gray-400 text-center">
                    {completedLessons} of {totalLessons} lessons completed
                  </div>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Course Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Level:</span>
                    <span className="text-white">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lessons:</span>
                    <span className="text-white">{totalLessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Students:</span>
                    <span className="text-white">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Language:</span>
                    <span className="text-white">English</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Resources */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600 text-gray-300 hover:text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Course Materials
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600 text-gray-300 hover:text-white"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Code Examples
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600 text-gray-300 hover:text-white"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Reading List
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
