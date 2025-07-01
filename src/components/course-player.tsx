"use client"

import { useState } from "react"
import { Play, Pause, Volume2, Maximize, SkipBack, SkipForward, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

interface CoursePlayerProps {
  videoUrl?: string
  title: string
  duration: string
  onComplete?: () => void
}

const CoursePlayer = ({ videoUrl, title, duration, onComplete }: CoursePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalTime] = useState(1800) // 30 minutes in seconds
  const [volume, setVolume] = useState(80)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = (currentTime / totalTime) * 100

  return (
    <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
      <CardContent className="p-0">
        {/* Video Player Area */}
        <div className="relative bg-black aspect-video flex items-center justify-center">
          {videoUrl ? (
            <video className="w-full h-full object-cover" poster="/placeholder.svg?height=400&width=600">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-10 w-10 text-cyan-400" />
              </div>
              <p className="text-white text-lg font-medium">{title}</p>
              <p className="text-gray-400">{duration}</p>
            </div>
          )}

          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Button
              size="lg"
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-cyan-500/80 hover:bg-cyan-500 text-white"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalTime)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={togglePlay} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <Volume2 className="h-4 w-4" />
              </Button>
              <div className="w-20">
                <Progress value={volume} className="h-1" />
              </div>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CoursePlayer
