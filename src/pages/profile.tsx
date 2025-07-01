"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Edit, Save, X, Camera, Shield, Bell, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "../contexts/auth-context"
import { useToast } from "../hooks/use-toast"
import ProtectedRoute from "../components/protected-route"

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bio: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    courseUpdates: true,
    language: "en",
    timezone: "UTC+05:30",
  })

  const handleSave = async () => {
    setIsLoading(true)

    try {
      const result = await updateProfile(formData)

      if (result.success) {
        toast({
          title: "Profile updated!",
          description: "Your profile has been successfully updated.",
          variant: "success",
        })
        setIsEditing(false)
      } else {
        toast({
          title: "Update failed",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
  }

  const profileCompletion = 75 // Mock calculation

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-gray-800/50 border-gray-700">
              <TabsTrigger value="profile" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Account
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
              >
                Preferences
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Overview */}
                <div className="lg:col-span-1">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader className="text-center">
                      <div className="relative mx-auto mb-4">
                        <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {user?.avatar}
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white hover:bg-cyan-600 transition-colors duration-300">
                          <Camera className="h-4 w-4" />
                        </button>
                      </div>
                      <CardTitle className="text-white">{user?.name}</CardTitle>
                      <CardDescription className="text-gray-400">{user?.email}</CardDescription>
                      <Badge variant="outline" className="border-cyan-400 text-cyan-400 w-fit mx-auto">
                        {user?.role}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Profile Completion</span>
                            <span className="text-cyan-400">{profileCompletion}%</span>
                          </div>
                          <Progress value={profileCompletion} className="h-2" />
                        </div>
                        <div className="text-sm text-gray-400">
                          <p>Member since {user?.joinedDate.toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Profile Form */}
                <div className="lg:col-span-2">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-white">Personal Information</CardTitle>
                          <CardDescription className="text-gray-400">
                            Update your personal details and contact information
                          </CardDescription>
                        </div>
                        {!isEditing ? (
                          <Button
                            onClick={() => setIsEditing(true)}
                            variant="outline"
                            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        ) : (
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => setIsEditing(false)}
                              variant="outline"
                              className="border-gray-600 text-gray-400"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={isLoading} className="bg-cyan-500 hover:bg-cyan-600">
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              disabled={!isEditing}
                              className="pl-10 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            Email Address
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              disabled={!isEditing}
                              className="pl-10 bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-white">
                            Phone Number
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              disabled={!isEditing}
                              className="pl-10 bg-gray-700 border-gray-600 text-white"
                              placeholder="+91 XXXXX XXXXX"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-white">
                            Location
                          </Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              id="location"
                              value={formData.location}
                              onChange={(e) => handleInputChange("location", e.target.value)}
                              disabled={!isEditing}
                              className="pl-10 bg-gray-700 border-gray-600 text-white"
                              placeholder="City, Country"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="bio" className="text-white">
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            disabled={!isEditing}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Tell us about yourself..."
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="website" className="text-white">
                            Website
                          </Label>
                          <Input
                            id="website"
                            value={formData.website}
                            onChange={(e) => handleInputChange("website", e.target.value)}
                            disabled={!isEditing}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="https://yourwebsite.com"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="linkedin" className="text-white">
                            LinkedIn
                          </Label>
                          <Input
                            id="linkedin"
                            value={formData.linkedin}
                            onChange={(e) => handleInputChange("linkedin", e.target.value)}
                            disabled={!isEditing}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="linkedin.com/in/username"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Preferences</CardTitle>
                  <CardDescription className="text-gray-400">
                    Customize your learning experience and notification settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Notifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-cyan-400" />
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Email Notifications</p>
                            <p className="text-gray-400 text-sm">Receive course updates and announcements via email</p>
                          </div>
                          <Switch
                            checked={preferences.emailNotifications}
                            onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Push Notifications</p>
                            <p className="text-gray-400 text-sm">Get instant notifications on your device</p>
                          </div>
                          <Switch
                            checked={preferences.pushNotifications}
                            onCheckedChange={(checked) => handlePreferenceChange("pushNotifications", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Marketing Emails</p>
                            <p className="text-gray-400 text-sm">Receive promotional content and special offers</p>
                          </div>
                          <Switch
                            checked={preferences.marketingEmails}
                            onCheckedChange={(checked) => handlePreferenceChange("marketingEmails", checked)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Language & Region */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-cyan-400" />
                        Language & Region
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white">Language</Label>
                          <Select
                            value={preferences.language}
                            onValueChange={(value) => handlePreferenceChange("language", value)}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="hi">Hindi</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Timezone</Label>
                          <Select
                            value={preferences.timezone}
                            onValueChange={(value) => handlePreferenceChange("timezone", value)}
                          >
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="UTC+05:30">IST (UTC+05:30)</SelectItem>
                              <SelectItem value="UTC+00:00">UTC (UTC+00:00)</SelectItem>
                              <SelectItem value="UTC-05:00">EST (UTC-05:00)</SelectItem>
                              <SelectItem value="UTC-08:00">PST (UTC-08:00)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-cyan-400" />
                    Security Settings
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your account security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Two-Factor Authentication</p>
                        <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                      >
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Change Password</p>
                        <p className="text-gray-400 text-sm">Update your account password</p>
                      </div>
                      <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                        Change Password
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Login Sessions</p>
                        <p className="text-gray-400 text-sm">Manage your active login sessions</p>
                      </div>
                      <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
                        View Sessions
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Delete Account</p>
                        <p className="text-gray-400 text-sm">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Profile
