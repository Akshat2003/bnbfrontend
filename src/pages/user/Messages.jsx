import { useState, useEffect, useRef } from 'react';
import {
  FaSearch,
  FaPaperPlane,
  FaImage,
  FaPaperclip,
  FaEllipsisV,
  FaCheckDouble,
  FaCheck,
  FaUserCircle
} from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatDate } from '@utils/formatters';
import { useAuth } from '@context/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data for conversations
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockConversations = [
          {
            id: '1',
            otherUser: {
              id: 'owner1',
              name: 'Sarah Johnson',
              avatar: null,
              role: 'owner'
            },
            lastMessage: {
              text: 'Sure, the parking space will be available from 9 AM.',
              timestamp: new Date('2024-10-24T14:30:00'),
              isRead: true,
              senderId: 'owner1'
            },
            unreadCount: 0,
            relatedBooking: 'BKG-001'
          },
          {
            id: '2',
            otherUser: {
              id: 'owner2',
              name: 'Mike Davis',
              avatar: null,
              role: 'owner'
            },
            lastMessage: {
              text: 'Thank you for your booking!',
              timestamp: new Date('2024-10-24T10:15:00'),
              isRead: false,
              senderId: 'owner2'
            },
            unreadCount: 2,
            relatedBooking: 'BKG-002'
          },
          {
            id: '3',
            otherUser: {
              id: 'owner3',
              name: 'Emily Chen',
              avatar: null,
              role: 'owner'
            },
            lastMessage: {
              text: 'The access code is 1234. See you tomorrow!',
              timestamp: new Date('2024-10-23T18:45:00'),
              isRead: true,
              senderId: user?.id
            },
            unreadCount: 0,
            relatedBooking: 'BKG-003'
          }
        ];

        setConversations(mockConversations);
        if (mockConversations.length > 0) {
          setSelectedConversation(mockConversations[0]);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchConversations();
    }
  }, [user]);

  // Fetch messages for selected conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;

      try {
        // TODO: Replace with actual API call
        const mockMessages = [
          {
            id: '1',
            senderId: user?.id,
            text: 'Hi, I have a question about the parking space for tomorrow.',
            timestamp: new Date('2024-10-24T14:00:00'),
            isRead: true
          },
          {
            id: '2',
            senderId: selectedConversation.otherUser.id,
            text: 'Hello! Sure, I\'d be happy to help. What would you like to know?',
            timestamp: new Date('2024-10-24T14:05:00'),
            isRead: true
          },
          {
            id: '3',
            senderId: user?.id,
            text: 'What time will the parking space be available?',
            timestamp: new Date('2024-10-24T14:10:00'),
            isRead: true
          },
          {
            id: '4',
            senderId: selectedConversation.otherUser.id,
            text: 'Sure, the parking space will be available from 9 AM.',
            timestamp: new Date('2024-10-24T14:30:00'),
            isRead: true
          }
        ];

        setMessages(mockMessages);
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedConversation, user]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter conversations
  const filteredConversations = conversations.filter(conv =>
    conv.otherUser.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle send message
  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: user?.id,
      text: messageText,
      timestamp: new Date(),
      isRead: false
    };

    try {
      // TODO: API call to send message
      // await messageService.sendMessage(selectedConversation.id, messageText);

      setMessages([...messages, newMessage]);
      setMessageText('');
      scrollToBottom();

      // Update conversation's last message
      setConversations(conversations.map(conv =>
        conv.id === selectedConversation.id
          ? {
            ...conv,
            lastMessage: {
              text: messageText,
              timestamp: new Date(),
              isRead: false,
              senderId: user?.id
            }
          }
          : conv
      ));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format time
  const formatMessageTime = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDate(messageDate, 'p'); // Time only
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return formatDate(messageDate, 'MMM d'); // Month and day
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="mt-2 text-gray-600">
          Chat with property owners
        </p>
      </div>

      {/* Messages Container */}
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <div className="col-span-12 md:col-span-4 flex flex-col">
          <Card className="h-full flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No conversations found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${selectedConversation?.id === conversation.id ? 'bg-primary-50' : ''
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {conversation.otherUser.avatar ? (
                            <img
                              src={conversation.otherUser.avatar}
                              alt={conversation.otherUser.name}
                              className="w-12 h-12 rounded-full"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                              <FaUserCircle className="text-2xl text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <p className="font-semibold text-gray-900 truncate">
                              {conversation.otherUser.name}
                            </p>
                            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                              {formatMessageTime(conversation.lastMessage.timestamp)}
                            </span>
                          </div>
                          <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                            }`}>
                            {conversation.lastMessage.senderId === user?.id && (
                              <FaCheckDouble className="inline mr-1 text-xs" />
                            )}
                            {conversation.lastMessage.text}
                          </p>
                          {conversation.relatedBooking && (
                            <p className="text-xs text-gray-500 mt-1">
                              Booking #{conversation.relatedBooking}
                            </p>
                          )}
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="flex-shrink-0 ml-2">
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-600 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Message Thread */}
        <div className="col-span-12 md:col-span-8 flex flex-col">
          {selectedConversation ? (
            <Card className="h-full flex flex-col">
              {/* Message Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedConversation.otherUser.avatar ? (
                    <img
                      src={selectedConversation.otherUser.avatar}
                      alt={selectedConversation.otherUser.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUserCircle className="text-xl text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedConversation.otherUser.name}
                    </p>
                    {typing && (
                      <p className="text-xs text-gray-500">Typing...</p>
                    )}
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <FaEllipsisV className="text-gray-500" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isOwnMessage = message.senderId === user?.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`px-4 py-2 rounded-lg ${isOwnMessage
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                            }`}
                        >
                          <p className="text-sm break-words">{message.text}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${isOwnMessage ? 'justify-end' : 'justify-start'
                          }`}>
                          <span>{formatDate(message.timestamp, 'p')}</span>
                          {isOwnMessage && (
                            message.isRead ? (
                              <FaCheckDouble className="text-primary-600" />
                            ) : (
                              <FaCheck />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-end gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                    <FaImage size={20} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                    <FaPaperclip size={20} />
                  </button>
                  <div className="flex-1">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      style={{ minHeight: '40px', maxHeight: '120px' }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <p className="text-lg mb-2">No conversation selected</p>
                <p className="text-sm">Choose a conversation to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
