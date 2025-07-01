"use client"

import { useState, useEffect, memo } from "react"
import { Calendar, Clock, Users, Video, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StreamPlayerWithSuspense } from "../components/performance/lazy-components"
import ProtectedRoute from "../components/protected-route"
import { useAuth } from "../contexts/auth-context"
import { useToast } from "../hooks/use-toast"

// Type definitions
interface ActiveStream {
  id: string
  title: string
  instructor: string
  viewers: number
  startTime: Date
  category: string
  isLive: boolean
}

interface UpcomingStream {
  id: string
  title: string
  instructor: string
  scheduledTime: Date
  category: string
  estimatedViewers: number
}

const LiveStreaming = memo(() => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeStreams, setActiveStreams] = useState<ActiveStream[]>([])
  const [upcomingStreams, setUpcomingStreams] = useState<UpcomingStream[]>([])
  const [selectedStream, setSelectedStream] = useState<string | null>(null)

  // Mock data
  const mockActiveStreams: ActiveStream[] = [
    {
      id: "stream-1",
      title: "Advanced React Patterns - Live Coding Session",
      instructor: "Sarah Johnson",
      viewers: 234,
      startTime: new Date(Date.now() - 30 * 60 * 1000), // Started 30 minutes ago
      category: "Web Development",
      isLive: true,
    },
    {
      id: "stream-2",
      title: "Machine Learning Q&A Session",
      instructor: "Dr. Amit Kumar",
      viewers: 156,
      startTime: new Date(Date.now() - 15 * 60 * 1000), // Started 15 minutes ago
      category: "AI/ML",
      isLive: true,
    },
  ]

  const mockUpcomingStreams: UpcomingStream[] = [
    {
      id: "stream-3",
      title: "Cloud Architecture Deep Dive",
      instructor: "Michael Chen",
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // In 2 hours
      category: "Cloud Computing",
      estimatedViewers: 180,
    },
    {
      id: "stream-4",
      title: "Mobile App Development Workshop",
      instructor: "Priya Patel",
      scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      category: "Mobile Development",
      estimatedViewers: 120,
    },
  ]

  useEffect(() => {
    setActiveStreams(mockActiveStreams)
    setUpcomingStreams(mockUpcomingStreams)
  }, [])

  const joinStream = (streamId: string) => {
    setSelectedStream(streamId)
    toast({
      title: "Joining stream",
      description: "Connecting to live session...",
      variant: "info",
    })
  }

  const leaveStream = () => {
    setSelectedStream(null)
    toast({
      title: "Left stream",
      description: "You have left the live session",
      variant: "info",
    })
  }

  const scheduleStream = () => {
    toast({
      title: "Stream scheduled",
      description: "Your live session has been scheduled successfully",
      variant: "success",
    })
  }

  const StreamCard = memo(({ stream, isUpcoming = false }: { stream: ActiveStream | UpcomingStream; isUpcoming?: boolean }) => (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-lg mb-2">{stream.title}</CardTitle>
            <CardDescription className="text-gray-400">by {stream.instructor}</CardDescription>
          </div>
          {!isUpcoming && <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">
                  {isUpcoming 
                    ? (stream as UpcomingStream).scheduledTime.toLocaleString() 
                    : (stream as ActiveStream).startTime.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">
                  {isUpcoming 
                    ? `~${(stream as UpcomingStream).estimatedViewers}` 
                    : (stream as ActiveStream).viewers}
                </span>
              </div>
            </div>
            <Badge variant="outline" className="border-cyan-400 text-cyan-400">
              {stream.category}
            </Badge>
          </div>

          <Button
            onClick={() => (isUpcoming ? scheduleStream() : joinStream(stream.id))}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
          >
            {isUpcoming ? "Set Reminder" : "Join Stream"}
          </Button>
        </div>
      </CardContent>
    </Card>
  ))

  StreamCard.displayName = "StreamCard"

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Live Streaming</h1>
                <p className="text-gray-400">Join live sessions and interactive workshops</p>
              </div>
              {(user?.role === "instructor" || user?.role === "admin") && (
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Stream
                </Button>
              )}
            </div>
          </div>

          {/* Selected Stream Player */}
          {selectedStream && (
            <div className="mb-8">
              <StreamPlayerWithSuspense
                streamId={selectedStream}
                title={activeStreams.find((s) => s.id === selectedStream)?.title || "Live Stream"}
                instructor={activeStreams.find((s) => s.id === selectedStream)?.instructor || "Instructor"}
                isLive={true}
                viewerCount={activeStreams.find((s) => s.id === selectedStream)?.viewers || 0}
                onLeaveStream={leaveStream}
                isInstructor={user?.role === "instructor" || user?.role === "admin"}
              />
            </div>
          )}

          <Tabs defaultValue="live" className="space-y-6">
            <TabsList className="bg-gray-800/50 border-gray-700">
              <TabsTrigger value="live" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Live Now ({activeStreams.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Upcoming ({upcomingStreams.length})
              </TabsTrigger>
              <TabsTrigger
                value="recordings"
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
              >
                Recordings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="live">
              {activeStreams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeStreams.map((stream) => (
                    <StreamCard key={stream.id} stream={stream} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Live Streams</h3>
                  <p className="text-gray-400">Check back later for live sessions</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming">
              {upcomingStreams.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingStreams.map((stream) => (
                    <StreamCard key={stream.id} stream={stream} isUpcoming={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Upcoming Streams</h3>
                  <p className="text-gray-400">New sessions will be scheduled soon</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="recordings">
              <div className="text-center py-12">
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Stream Recordings</h3>
                <p className="text-gray-400">Recorded sessions will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
})

LiveStreaming.displayName = "LiveStreaming"

export default LiveStreaming