
import React, { useState } from 'react';
import { X, Bell, CheckCircle, AlertTriangle, Info, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NotificationsComponent = ({ isOpen, onClose }: NotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'success',
      title: 'Booking Confirmed',
      message: 'Your turf booking for Champions Arena is confirmed for tomorrow 6 PM',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      title: 'New Achievement!',
      message: 'You have scored 10 goals this month and earned the "Goal Scorer" badge',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Tournament Update',
      message: 'Spring Championship 2024 registration deadline is in 3 days',
      time: '2 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Payment Reminder',
      message: 'Your subscription will expire in 7 days. Please renew to continue.',
      time: '1 day ago',
      read: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'achievement':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl h-[600px] bg-white/95 backdrop-blur-md border-gray-200/50">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-700">{unreadCount} new</Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-emerald-600">
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-80px)]">
          <Tabs defaultValue="all" className="h-full">
            <div className="p-4 border-b border-gray-200/50">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100/50 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg">All</TabsTrigger>
                <TabsTrigger value="unread" className="rounded-lg">Unread</TabsTrigger>
                <TabsTrigger value="achievements" className="rounded-lg">Achievements</TabsTrigger>
                <TabsTrigger value="system" className="rounded-lg">System</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-120px)]">
              <TabsContent value="all" className="m-0">
                <div className="space-y-2 p-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                        notification.read ? 'bg-white border-gray-200' : getBgColor(notification.type)
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="m-0">
                <div className="space-y-2 p-4">
                  {notifications.filter(n => !n.read).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${getBgColor(notification.type)}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="m-0">
                <div className="space-y-2 p-4">
                  {notifications.filter(n => n.type === 'achievement').map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                        notification.read ? 'bg-white border-gray-200' : getBgColor(notification.type)
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="system" className="m-0">
                <div className="space-y-2 p-4">
                  {notifications.filter(n => n.type === 'info' || n.type === 'warning').map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md ${
                        notification.read ? 'bg-white border-gray-200' : getBgColor(notification.type)
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
