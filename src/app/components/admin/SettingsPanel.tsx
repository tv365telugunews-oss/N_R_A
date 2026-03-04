import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Palette,
  Database,
  Key,
  Mail
} from "lucide-react";

export function SettingsPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#212121] dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Configure admin panel and application settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="general" className="gap-2">
            <Settings size={16} />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell size={16} />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield size={16} />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette size={16} />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4 flex items-center gap-2">
              <Globe size={20} />
              Application Settings
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input id="app-name" defaultValue="NEWS ROBO" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="app-version">Version</Label>
                  <Input id="app-version" defaultValue="1.0.0" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="app-description">Description</Label>
                <Input 
                  id="app-description" 
                  defaultValue="Hyperlocal multilingual news app for India"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Maintenance Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Temporarily disable the app for users</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Auto-Publish News</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically publish approved articles</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Citizen Journalism</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Allow users to submit news reports</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
                Save Changes
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4 flex items-center gap-2">
              <Mail size={20} />
              Email Settings
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" placeholder="smtp.example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" placeholder="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">SMTP Username</Label>
                  <Input id="smtp-user" placeholder="username@example.com" />
                </div>
              </div>

              <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
                Save Email Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4">Notification Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">New User Registration</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when new users sign up</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Citizen Reports Submitted</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alert when new reports need approval</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Buzz Videos Uploaded</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notify for new video submissions</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Ad Campaign Alerts</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Updates on ad performance and budget</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">System Alerts</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Critical system notifications</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Daily Report Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive daily analytics summary</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
                Save Notification Settings
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4 flex items-center gap-2">
              <Shield size={20} />
              Security Settings
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Login Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Alert on new login attempts</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Change Password</Label>
                <Input type="password" placeholder="Current password" />
                <Input type="password" placeholder="New password" />
                <Input type="password" placeholder="Confirm new password" />
              </div>

              <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white">
                Update Password
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4 flex items-center gap-2">
              <Key size={20} />
              API Keys
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Production API Key</p>
                <Input value="nr_prod_abc123xyz789..." readOnly />
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Development API Key</p>
                <Input value="nr_dev_xyz789abc123..." readOnly />
              </div>

              <Button variant="outline">
                Regenerate API Keys
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4 flex items-center gap-2">
              <Palette size={20} />
              Brand Colors
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Primary Red</Label>
                <div className="flex gap-2">
                  <Input value="#D32F2F" readOnly />
                  <div className="w-12 h-10 rounded bg-[#D32F2F] border" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Dark Black</Label>
                <div className="flex gap-2">
                  <Input value="#212121" readOnly />
                  <div className="w-12 h-10 rounded bg-[#212121] border" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Background</Label>
                <div className="flex gap-2">
                  <Input value="#F5F5F5" readOnly />
                  <div className="w-12 h-10 rounded bg-[#F5F5F5] border" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Highlight Yellow</Label>
                <div className="flex gap-2">
                  <Input value="#FFC107" readOnly />
                  <div className="w-12 h-10 rounded bg-[#FFC107] border" />
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Dark Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enable dark theme</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Glassmorphism Effects</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Apply frosted glass UI effects</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Animations</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enable micro-interactions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-[#1E1E1E] border-none shadow-lg">
            <h3 className="text-lg font-bold text-[#212121] dark:text-white mb-4 flex items-center gap-2">
              <Database size={20} />
              Content Layout
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Screen Split Ratio</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current: 42% Photo, 52% Text, 6% UI/Padding
                </p>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 h-8 bg-blue-500 rounded-l flex items-center justify-center text-white text-xs">
                    42% Photo
                  </div>
                  <div className="flex-1 h-8 bg-green-500 flex items-center justify-center text-white text-xs">
                    52% Text
                  </div>
                  <div className="w-16 h-8 bg-gray-400 rounded-r flex items-center justify-center text-white text-xs">
                    6% UI
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-[#212121] dark:text-white">Vertical Flip Gesture</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">TikTok-style news browsing</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
