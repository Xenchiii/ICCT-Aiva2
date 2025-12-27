import { useState, useMemo, useEffect, useRef } from 'react';
import { MessageCircle, Send, Search, Phone, Video, MoreVertical } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role?: string;
  email?: string;
  avatar_url?: string;
  department?: string;
}

interface Message {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  time: string;
  timestamp?: number;
}

interface MessagesProps {
  messages?: Message[];
  teachers?: User[];
  students?: User[];
  currentUser?: User | null;
  darkMode?: boolean;
  onSendMessage?: (message: Message) => void;
}

const generateAvatar = (user: User): string => {
  if (user.avatar_url) return user.avatar_url;
  
  const initials = user.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  const colors = ['9333ea', '06b6d4', 'f59e0b', '10b981', 'ec4899', 'ef4444', '6366f1', '8b5cf6'];
  const colorIndex = user.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const color = colors[colorIndex];
  
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23${color}"/%3E%3Ctext x="50" y="65" font-size="40" fill="white" text-anchor="middle" font-family="system-ui"%3E${initials}%3C/text%3E%3C/svg%3E`;
};

const formatTime = (timestamp?: number): string => {
  if (!timestamp) return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  
  const now = Date.now();
  const diff = now - timestamp;
  const hours = diff / (1000 * 60 * 60);
  
  if (hours < 24) {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } else if (hours < 48) {
    return 'Yesterday';
  } else {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default function Messages({ 
  messages = [], 
  teachers = [], 
  students = [], 
  currentUser = null, 
  darkMode = false,
  onSendMessage 
}: MessagesProps) {
  const [selectedChat, setSelectedChat] = useState<User | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages, selectedChat]);

  const allUsers = useMemo(() => [...teachers, ...students], [teachers, students]);

  const conversationPartners = useMemo(() => {
    if (!currentUser) return [];
    
    const partnerIds = new Set<string>();
    localMessages.forEach(msg => {
      if (msg.sender === currentUser.id) {
        partnerIds.add(msg.receiver);
      } else if (msg.receiver === currentUser.id) {
        partnerIds.add(msg.sender);
      }
    });

    return allUsers.filter(user => partnerIds.has(user.id));
  }, [allUsers, localMessages, currentUser]);

  const filteredPartners = useMemo(() => {
    return conversationPartners.filter(partner =>
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversationPartners, searchQuery]);

  const getLastMessage = (partnerId: string): Message | null => {
    if (!currentUser) return null;
    
    const conversation = localMessages.filter(msg =>
      (msg.sender === currentUser.id && msg.receiver === partnerId) ||
      (msg.sender === partnerId && msg.receiver === currentUser.id)
    );
    
    return conversation.length > 0 ? conversation[conversation.length - 1] : null;
  };

  const currentConversation = useMemo(() => {
    if (!currentUser || !selectedChat) return [];
    
    return localMessages
      .filter(msg =>
        (msg.sender === currentUser.id && msg.receiver === selectedChat.id) ||
        (msg.sender === selectedChat.id && msg.receiver === currentUser.id)
      )
      .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  }, [localMessages, currentUser, selectedChat]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat || !currentUser) return;

    const timestamp = Date.now();
    const newMessage: Message = {
      id: `msg_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      sender: currentUser.id,
      receiver: selectedChat.id,
      message: messageInput.trim(),
      time: formatTime(timestamp),
      timestamp
    };

    setLocalMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    if (onSendMessage) {
      onSendMessage(newMessage);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <MessageCircle className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Please log in to access messages</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-gradient-to-br from-purple-600 to-indigo-600' : 'bg-gradient-to-br from-purple-500 to-indigo-500'
      } text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Messages</h2>
            <p className="text-purple-100">
              {conversationPartners.length > 0 
                ? `${conversationPartners.length} conversation${conversationPartners.length !== 1 ? 's' : ''}`
                : 'No conversations yet'}
            </p>
          </div>
          <MessageCircle className="h-16 w-16 text-purple-200" />
        </div>
      </div>

      {/* Main Chat Container */}
      <div className={`rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg overflow-hidden`} style={{ height: '600px' }}>
        <div className="flex h-full">
          {/* Conversations Sidebar */}
          <div className={`w-full md:w-1/3 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
            {/* Search Bar */}
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <Search className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-transparent outline-none flex-1 text-sm ${
                    darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredPartners.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <MessageCircle className={`h-12 w-12 mx-auto mb-3 ${
                    darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {searchQuery ? 'No conversations found' : 'No conversations yet'}
                  </p>
                </div>
              ) : (
                filteredPartners.map(partner => {
                  const lastMsg = getLastMessage(partner.id);
                  const isActive = selectedChat?.id === partner.id;

                  return (
                    <div
                      key={partner.id}
                      onClick={() => setSelectedChat(partner)}
                      className={`p-4 cursor-pointer border-b transition-all ${
                        darkMode 
                          ? 'border-gray-700 hover:bg-gray-700' 
                          : 'border-gray-100 hover:bg-gray-50'
                      } ${isActive ? (darkMode ? 'bg-gray-700' : 'bg-blue-50') : ''}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={generateAvatar(partner)}
                            className="w-12 h-12 rounded-full object-cover"
                            alt={partner.name}
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {partner.name}
                          </p>
                          {lastMsg ? (
                            <p className={`text-xs truncate ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {lastMsg.sender === currentUser.id ? 'You: ' : ''}{lastMsg.message}
                            </p>
                          ) : (
                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              No messages yet
                            </p>
                          )}
                        </div>
                        {lastMsg && (
                          <span className={`text-xs flex-shrink-0 ${
                            darkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            {lastMsg.time}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex-col hidden md:flex">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className={`p-4 border-b ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } flex items-center justify-between`}>
                  <div className="flex items-center space-x-3">
                    <img
                      src={generateAvatar(selectedChat)}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={selectedChat.name}
                    />
                    <div>
                      <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {selectedChat.name}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {selectedChat.department || selectedChat.role || 'User'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                    }`}>
                      <Phone className="h-5 w-5" />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                    }`}>
                      <Video className="h-5 w-5" />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
                    }`}>
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
                  darkMode ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                  {currentConversation.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <MessageCircle className={`h-12 w-12 mx-auto mb-3 ${
                          darkMode ? 'text-gray-600' : 'text-gray-400'
                        }`} />
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                          No messages yet. Start the conversation!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {currentConversation.map(msg => {
                        const isSent = msg.sender === currentUser.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isSent ? 'justify-end' : 'justify-start'} animate-slideIn`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                                isSent
                                  ? 'bg-blue-600 text-white rounded-br-none'
                                  : (darkMode ? 'bg-gray-800 text-gray-200 rounded-bl-none' : 'bg-white text-gray-900 rounded-bl-none')
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{msg.message}</p>
                              <p className={`text-xs mt-1 ${
                                isSent 
                                  ? 'text-blue-100' 
                                  : (darkMode ? 'text-gray-500' : 'text-gray-500')
                              }`}>
                                {msg.time}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Message Input */}
                <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className={`flex-1 px-4 py-3 rounded-lg border outline-none transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 focus:border-blue-500 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 focus:border-blue-500 placeholder-gray-500'
                      }`}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className={`h-16 w-16 mx-auto mb-4 ${
                    darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} />
                  <h3 className={`text-xl font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Select a conversation
                  </h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}