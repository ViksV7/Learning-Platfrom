"use client"

import type React from "react"
import { useState, useRef, useEffect, memo } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  Users,
  MessageCircle,
  Share2,
  RepeatIcon as Record,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

interface StreamPlayerProps {
  streamId: string
  title: string
  instructor: string
  isLive?: boolean
  viewerCount?: number
  onJoinStream?: () => void
  onLeaveStream?: () => void
  isInstructor?: boolean
}

const StreamPlayer: React.FC<StreamPlayerProps> = memo(
  ({
   
    title,
    instructor,
    isLive = false,
    viewerCount = 0,
    onJoinStream,
    onLeaveStream,
    isInstructor = false,
  }) => {
    const { toast } = useToast()
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [volume, setVolume] = useState([80])
    const [isConnected, setIsConnected] = useState(false)
    const [isMicOn, setIsMicOn] = useState(true)
    const [isCameraOn, setIsCameraOn] = useState(true)
    const [isRecording, setIsRecording] = useState(false)
    const [streamQuality, setStreamQuality] = useState("720p")

    useEffect(() => {
      // Initialize WebRTC connection
      if (isLive && !isConnected) {
        initializeStream()
      }

      return () => {
        // Cleanup WebRTC connections
        if (isConnected) {
          disconnectStream()
        }
      }
    }, [isLive, isConnected])

    const initializeStream = async () => {
      try {
        // Simulate WebRTC connection
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsConnected(true)

        if (onJoinStream) {
          onJoinStream()
        }

        toast({
          title: "Connected to live stream",
          description: `Successfully joined ${title}`,
          variant: "success",
        })
      } catch (error) {
        toast({
          title: "Connection failed",
          description: "Unable to connect to the live stream",
          variant: "destructive",
        })
      }
    }

    const disconnectStream = () => {
      setIsConnected(false)
      setIsPlaying(false)

      if (onLeaveStream) {
        onLeaveStream()
      }

      toast({
        title: "Disconnected",
        description: "Left the live stream",
        variant: "info",
      })
    }

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
        } else {
          videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    }

    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        videoRef.current?.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }

    const handleVolumeChange = (value: number[]) => {
      const newVolume = value[0]
      setVolume(value)
      if (videoRef.current) {
        videoRef.current.volume = newVolume / 100
      }
    }

    const toggleMic = () => {
      setIsMicOn(!isMicOn)
      toast({
        title: isMicOn ? "Microphone muted" : "Microphone unmuted",
        variant: "info",
      })
    }

    const toggleCamera = () => {
      setIsCameraOn(!isCameraOn)
      toast({
        title: isCameraOn ? "Camera turned off" : "Camera turned on",
        variant: "info",
      })
    }

    const startRecording = () => {
      setIsRecording(!isRecording)
      toast({
        title: isRecording ? "Recording stopped" : "Recording started",
        description: isRecording ? "Stream recording has been saved" : "Stream is now being recorded",
        variant: "success",
      })
    }

    const shareStream = () => {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Stream link copied",
        description: "Share this link with others to join the stream",
        variant: "success",
      })
    }

    return (
      <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
        <CardContent className="p-0">
          {/* Video Player Area */}
          <div className="relative bg-black aspect-video">
            {/* Live Stream Badge */}
            {isLive && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
              </div>
            )}

            {/* Viewer Count */}
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
              <div className="bg-black/50 rounded-full px-3 py-1 flex items-center space-x-1">
                <Users className="h-4 w-4 text-white" />
                <span className="text-white text-sm">{viewerCount}</span>
              </div>
            </div>

            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster="/placeholder.svg?height=400&width=600"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/videos/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Connection Status Overlay */}
            {!isConnected && isLive && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-400 mb-4">Instructor: {instructor}</p>
                  <Button
                    onClick={initializeStream}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    Join Live Stream
                  </Button>
                </div>
              </div>
            )}

            {/* Play/Pause Overlay */}
            {isConnected && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="lg"
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-cyan-500/80 hover:bg-cyan-500 text-white"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                </Button>
              </div>
            )}
          </div>

          {/* Controls */}
          {isConnected && (
            <div className="p-4 space-y-4">
              {/* Stream Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="text-gray-400 text-sm">with {instructor}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" onClick={shareStream} className="text-gray-400 hover:text-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Main Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button size="sm" onClick={togglePlay} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>

                  <Button size="sm" variant="ghost" onClick={toggleMute} className="text-gray-400 hover:text-white">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>

                  <div className="w-20">
                    <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} className="w-full" />
                  </div>
                </div>

                {/* Instructor Controls */}
                {isInstructor && (
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant={isMicOn ? "default" : "destructive"} onClick={toggleMic}>
                      {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>

                    <Button size="sm" variant={isCameraOn ? "default" : "destructive"} onClick={toggleCamera}>
                      {isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>

                    <Button
                      size="sm"
                      variant={isRecording ? "destructive" : "outline"}
                      onClick={startRecording}
                      className={isRecording ? "animate-pulse" : ""}
                    >
                      <Record className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleFullscreen}
                    className="text-gray-400 hover:text-white"
                  >
                    {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  </Button>

                  {isLive && (
                    <Button size="sm" variant="destructive" onClick={disconnectStream}>
                      <PhoneOff className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Stream Quality Selector */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Quality:</span>
                  <select
                    value={streamQuality}
                    onChange={(e) => setStreamQuality(e.target.value)}
                    className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
                  >
                    <option value="1080p">1080p HD</option>
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                    <option value="360p">360p</option>
                  </select>
                </div>

                {isLive && <div className="text-gray-400">Stream delay: ~2-3 seconds</div>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  },
)

StreamPlayer.displayName = "StreamPlayer"

export default StreamPlayer
