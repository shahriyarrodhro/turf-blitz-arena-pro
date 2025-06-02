
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Phone, Video, MoreVertical, MessageCircle, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  sender: string;
  senderId: string;
  content: string;
  time: string;
  isOwn: boolean;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing?: boolean;
}

export const ChatComponent = ({ isOpen, onClose }: ChatProps) => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize contacts based on user role
  useEffect(() => {
    if (!user) return;

    const mockContacts: ChatContact[] = [
      {
        id: '1',
        name: user.role === 'player' ? 'Team Captain' : 'Ahmed Rahman',
        avatar: 'TC',
        lastMessage: 'Hey, are we still on for the match?',
        time: '2m ago',
        unread: 2,
        online: true
      },
      {
        id: '2',
        name: user.role === 'player' ? 'Coach Hassan' : 'Sakib Hassan',
        avatar: 'CH',
        lastMessage: 'Great game yesterday!',
        time: '1h ago',
        unread: 0,
        online: false
      },
      {
        id: '3',
        name: user.role === 'turf-owner' ? 'Booking Manager' : 'Team Lightning',
        avatar: 'BM',
        lastMessage: user.role === 'turf-owner' ? 'New booking request received' : 'Tournament registration is open',
        time: '3h ago',
        unread: 1,
        online: true
      }
    ];

    setContacts(mockContacts);
  }, [user]);

  // Initialize messages for selected chat
  useEffect(() => {
    if (!selectedChat || !user) return;

    const mockMessages: Message[] = [
      {
        id: 1,
        sender: 'Team Captain',
        senderId: '1',
        content: 'Hey, are we still on for the match tomorrow?',
        time: '10:30 AM',
        isOwn: false,
        type: 'text',
        status: 'read'
      },
      {
        id: 2,
        sender: user.name,
        senderId: user.id,
        content: 'Yes! The booking is confirmed for 6 PM at Champions Arena',
        time: '10:32 AM',
        isOwn: true,
        type: 'text',
        status: 'delivered'
      },
      {
        id: 3,
        sender: 'Team Captain',
        senderId: '1',
        content: 'Perfect! See you there 👍',
        time: '10:33 AM',
        isOwn: false,
        type: 'text',
        status: 'read'
      }
    ];

    setMessages(mockMessages);
  }, [selectedChat, user]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat || !user) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: user.name,
      senderId: user.id,
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Update contact's last message
    setContacts(prev => prev.map(contact => 
      contact.id === selectedChat 
        ? { ...contact, lastMessage: newMessage, time: 'now' }
        : contact
    ));

    // Simulate typing indicator and auto-response
    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        
        const autoReply: Message = {
          id: Date.now() + 1,
          sender: contacts.find(c => c.id === selectedChat)?.name || 'Contact',
          senderId: selectedChat,
          content: 'Thanks for the update! 👍',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false,
          type: 'text',
          status: 'sent'
        };
        
        setMessages(prev => [...prev, autoReply]);
      }, 1500);
    }, 500);

    toast({
      title: "Message sent",
      description: "Your message has been delivered",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] bg-white/95 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between p-6 border-b border-white/30 bg-gradient-to-r from-white/50 to-white/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Messages</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-2xl hover:bg-red-50/80 hover:text-red-600 transition-all duration-300">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-100px)]">
          <div className="flex h-full">
            {/* Contacts Sidebar */}
            <div className="w-1/3 border-r border-white/30 bg-gradient-to-b from-white/40 to-white/20">
              <div className="p-4 border-b border-white/20">
                <Input placeholder="Search conversations..." className="rounded-2xl border-white/30 bg-white/50 backdrop-blur-sm" />
              </div>
              <div className="overflow-y-auto h-full">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 border-b border-white/20 cursor-pointer hover:bg-white/30 transition-all duration-300 ${
                      selectedChat === contact.id ? 'bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border-l-4 border-emerald-500' : ''
                    }`}
                    onClick={() => setSelectedChat(contact.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12 shadow-lg">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-lg"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-800 truncate">{contact.name}</h4>
                          <span className="text-xs text-gray-500">{contact.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                          {contact.unread > 0 && (
                            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold shadow-lg">
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
            <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50/30 to-white/20">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/30 bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 shadow-lg">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            {contacts.find(c => c.id === selectedChat)?.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800">
                            {contacts.find(c => c.id === selectedChat)?.name}
                          </h4>
                          <p className="text-xs text-emerald-600">
                            {isTyping ? 'Typing...' : 'Online'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-blue-50/80 hover:text-blue-600">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-green-50/80 hover:text-green-600">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-gray-50/80">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-3xl shadow-lg transition-all duration-300 hover:scale-105 ${
                              message.isOwn
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                                : 'bg-white/80 backdrop-blur-sm text-gray-800 border border-white/30'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <div className="flex items-center justify-between mt-2">
                              <p className={`text-xs ${message.isOwn ? 'text-emerald-100' : 'text-gray-500'}`}>
                                {message.time}
                              </p>
                              {message.isOwn && (
                                <span className={`text-xs ${
                                  message.status === 'read' ? 'text-emerald-200' : 
                                  message.status === 'delivered' ? 'text-emerald-300' : 'text-emerald-400'
                                }`}>
                                  {message.status === 'read' ? '✓✓' : message.status === 'delivered' ? '✓✓' : '✓'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl px-4 py-3 shadow-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-white/30 bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-gray-50/80">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 rounded-3xl border-white/30 bg-white/50 backdrop-blur-sm focus:bg-white/70 transition-all duration-300"
                      />
                      <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-yellow-50/80">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl px-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <MessageCircle className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a conversation</h3>
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
