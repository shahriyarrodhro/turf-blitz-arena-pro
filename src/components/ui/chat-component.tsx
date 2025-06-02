
import React, { useState } from 'react';
import { X, Send, Phone, Video, MoreVertical, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
}

interface ChatContact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export const ChatComponent = ({ isOpen, onClose }: ChatProps) => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const contacts: ChatContact[] = [
    {
      id: 1,
      name: "Ahmed Rahman",
      avatar: "AR",
      lastMessage: "Hey, are we still on for the match?",
      time: "2m ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Sakib Hassan",
      avatar: "SH",
      lastMessage: "Great game yesterday!",
      time: "1h ago",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Team Lightning",
      avatar: "TL",
      lastMessage: "Tournament registration is open",
      time: "3h ago",
      unread: 1,
      online: true
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      sender: "Ahmed Rahman",
      content: "Hey, are we still on for the match tomorrow?",
      time: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "Yes! The booking is confirmed for 6 PM at Champions Arena",
      time: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Ahmed Rahman",
      content: "Perfect! See you there 👍",
      time: "10:33 AM",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-4xl h-[600px] bg-white/95 backdrop-blur-md border-gray-200/50">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-80px)]">
          <div className="flex h-full">
            {/* Contacts Sidebar */}
            <div className="w-1/3 border-r border-gray-200/50 bg-white/50">
              <div className="p-4 border-b border-gray-200/50">
                <Input placeholder="Search conversations..." className="rounded-xl" />
              </div>
              <div className="overflow-y-auto">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 border-b border-gray-200/30 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === contact.id ? 'bg-emerald-50' : ''
                    }`}
                    onClick={() => setSelectedChat(contact.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-800 truncate">{contact.name}</h4>
                          <span className="text-xs text-gray-500">{contact.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                          {contact.unread > 0 && (
                            <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200/50 bg-white/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            AR
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Ahmed Rahman</h4>
                          <p className="text-xs text-emerald-600">Online</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50/30">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                              message.isOwn
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white text-gray-800 border border-gray-200'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.isOwn ? 'text-emerald-100' : 'text-gray-500'}`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200/50 bg-white/50">
                    <div className="flex items-center space-x-3">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 rounded-xl"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50/30">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a contact to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
