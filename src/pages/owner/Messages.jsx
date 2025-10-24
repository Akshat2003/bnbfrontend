import { useState, useEffect, useRef } from 'react';
import {
  FaSearch,
  FaPaperPlane,
  FaImage,
  FaPaperclip,
  FaEllipsisV,
  FaCheckDouble,
  FaCheck,
  FaUserCircle,
  FaStar,
  FaCar,
  FaCalendarAlt
} from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatDate } from '@utils/formatters';
import { useAuth } from '@context/AuthContext';

const OwnerMessages = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [typing, setTyping] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all'); // all, booking, inquiry
  const messagesEndRef = useRef(null);

  // Mock data for owner conversations with guests
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockConversations = [
          {
            id: '1',
            guest: {
              id: 'user1',
              name: 'John Smith',
              avatar: null,
              rating: 4.8,
              totalBookings: 12
            },
            lastMessage: {
              text: 'What time can I check in tomorrow?',
              timestamp: new Date('2024-10-24T14:30:00'),
              isRead: false,
              senderId: 'user1'
            },
            unreadCount: 2,
            relatedBooking: {
              id: 'BKG-001',
              property: 'Downtown Garage - Space A1',
              status: 'confirmed',
              checkIn: new Date('2024-10-25T09:00:00'),
              checkOut: new Date('2024-10-25T18:00:00')
            },
            type: 'booking'
          },
          {
            id: '2',
            guest: {
              id: 'user2',
              name: 'Emma Wilson',
              avatar: null,
              rating: 5.0,
              totalBookings: 8
            },
            lastMessage: {
              text: 'Thank you! The space was perfect.',
              timestamp: new Date('2024-10-24T11:20:00'),
              isRead: true,
              senderId: 'user2'
            },
            unreadCount: 0,
            relatedBooking: {
              id: 'BKG-002',
              property: 'Airport Parking - Space B5',
              status: 'completed',
              checkIn: new Date('2024-10-23T08:00:00'),
              checkOut: new Date('2024-10-24T10:00:00')
            },
            type: 'booking'
          },
          {
            id: '3',
            guest: {
              id: 'user3',
              name: 'Michael Brown',
              avatar: null,
              rating: 4.5,
              totalBookings: 5
            },
            lastMessage: {
              text: 'Is monthly parking available at this location?',
              timestamp: new Date('2024-10-23T16:45:00'),
              isRead: false,
              senderId: 'user3'
            },
            unreadCount: 1,
            relatedBooking: null,
            type: 'inquiry'
          },
          {
            id: '4',
            guest: {
              id: 'user4',
              name: 'Lisa Anderson',
              avatar: null,
              rating: 4.9,
              totalBookings: 15
            },
            lastMessage: {
              text: 'The gate code worked perfectly. Thanks!',
              timestamp: new Date('2024-10-23T09:30:00'),
              isRead: true,
              senderId: 'user4'
            },
            unreadCount: 0,
            relatedBooking: {
              id: 'BKG-004',
              property: 'City Center Parking - Space C2',
              status: 'active',
              checkIn: new Date('2024-10-23T08:00:00'),
              checkOut: new Date('2024-10-25T20:00:00')
            },
            type: 'booking'
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
            senderId: selectedConversation.guest.id,
            text: 'Hi! I have a booking for tomorrow. Just wanted to confirm the details.',
            timestamp: new Date('2024-10-24T14:15:00'),
            isRead: true
          },
          {
            id: '2',
            senderId: user?.id,
            text: 'Hello! Yes, your booking is confirmed. You have Space A1 from 9 AM to 6 PM.',
            timestamp: new Date('2024-10-24T14:20:00'),
            isRead: true
          },
          {
            id: '3',
            senderId: selectedConversation.guest.id,
            text: 'Great! What time can I check in tomorrow?',
            timestamp: new Date('2024-10-24T14:30:00'),
            isRead: true
          },
          {
            id: '4',
            senderId: selectedConversation.guest.id,
            text: 'Also, do you have EV charging available?',
            timestamp: new Date('2024-10-24T14:31:00'),
            isRead: false
          }
        ];

        setMessages(mockMessages);

        // Mark messages as read
        if (selectedConversation.unreadCount > 0) {
          // TODO: API call to mark messages as read
          setConversations(prev =>
            prev.map(conv =>
              conv.id === selectedConversation.id
                ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } }
                : conv
            )
          );
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [selectedConversation, user]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: user?.id,
      text: messageText,
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    // Update conversation list
    setConversations(prev =>
      prev.map(conv =>
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
      )
    );

    // TODO: Send message to API
  };

  const filteredConversations = conversations
    .filter(conv => {
      const matchesSearch = conv.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conv.relatedBooking?.property.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || conv.type === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">
            Communicate with your guests
            {totalUnread > 0 && (
              <span className="ml-2 text-blue-600 font-medium">
                ({totalUnread} unread)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-250px)]">
          {/* Conversations List */}
          <div className="lg:col-span-4 border-r border-gray-200 flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200 space-y-3">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('booking')}
                  className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    filterStatus === 'booking'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bookings
                </button>
                <button
                  onClick={() => setFilterStatus('inquiry')}
                  className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    filterStatus === 'inquiry'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inquiries
                </button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No conversations found</p>
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <FaUserCircle className="w-12 h-12 text-gray-400" />
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {conversation.guest.name}
                          </h3>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                            {formatDate(conversation.lastMessage.timestamp, 'short')}
                          </span>
                        </div>

                        {/* Guest Rating */}
                        <div className="flex items-center gap-1 mb-1">
                          <FaStar className="w-3 h-3 text-yellow-400" />
                          <span className="text-xs text-gray-600">
                            {conversation.guest.rating} • {conversation.guest.totalBookings} bookings
                          </span>
                        </div>

                        {/* Related Booking */}
                        {conversation.relatedBooking && (
                          <div className="text-xs text-blue-600 mb-1 truncate">
                            {conversation.relatedBooking.property}
                          </div>
                        )}

                        {/* Last Message */}
                        <p className={`text-sm truncate ${
                          conversation.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-600'
                        }`}>
                          {conversation.lastMessage.senderId === user?.id && 'You: '}
                          {conversation.lastMessage.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-8 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="w-10 h-10 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {selectedConversation.guest.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FaStar className="w-3 h-3 text-yellow-400" />
                            {selectedConversation.guest.rating}
                          </span>
                          <span>•</span>
                          <span>{selectedConversation.guest.totalBookings} bookings</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <FaEllipsisV className="text-gray-600" />
                    </button>
                  </div>

                  {/* Booking Info Card */}
                  {selectedConversation.relatedBooking && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-500">
                              {selectedConversation.relatedBooking.id}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              selectedConversation.relatedBooking.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : selectedConversation.relatedBooking.status === 'active'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {selectedConversation.relatedBooking.status}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-2">
                            {selectedConversation.relatedBooking.property}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="w-3 h-3" />
                              {formatDate(selectedConversation.relatedBooking.checkIn, 'short')}
                            </span>
                            <span>→</span>
                            <span>
                              {formatDate(selectedConversation.relatedBooking.checkOut, 'short')}
                            </span>
                          </div>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => {
                    const isOwner = message.senderId === user?.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwner ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${isOwner ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              isOwner
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${
                            isOwner ? 'justify-end' : 'justify-start'
                          }`}>
                            <span>{formatDate(message.timestamp, 'time')}</span>
                            {isOwner && (
                              message.isRead ? (
                                <FaCheckDouble className="text-blue-500" />
                              ) : (
                                <FaCheck className="text-gray-400" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {typing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <FaImage className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <FaPaperclip className="w-5 h-5" />
                      </button>
                    </div>
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message..."
                      rows="1"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      <FaPaperPlane className="w-4 h-4" />
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FaUserCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Select a conversation</p>
                  <p className="text-sm">Choose a guest to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerMessages;
