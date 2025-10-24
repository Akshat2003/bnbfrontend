import { useState, useEffect } from 'react';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatDate } from '@utils/formatters';
import {
  FaSearch,
  FaTicketAlt,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaReply,
  FaExclamationCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const SupportTickets = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockTickets = [
          {
            id: 'TKT-001',
            user: {
              id: 'user1',
              name: 'John Smith',
              email: 'john.smith@example.com'
            },
            subject: 'Unable to complete booking payment',
            category: 'payment',
            priority: 'high',
            status: 'open',
            description: 'I am trying to book a parking space but the payment keeps failing. I have tried multiple cards.',
            createdAt: new Date('2024-10-24T09:30:00'),
            updatedAt: new Date('2024-10-24T09:30:00'),
            assignedTo: null,
            replies: []
          },
          {
            id: 'TKT-002',
            user: {
              id: 'user2',
              name: 'Emma Wilson',
              email: 'emma.w@example.com'
            },
            subject: 'Property not showing up in search',
            category: 'technical',
            priority: 'medium',
            status: 'in_progress',
            description: 'My parking property is not appearing in search results even though it is marked as active.',
            createdAt: new Date('2024-10-23T14:15:00'),
            updatedAt: new Date('2024-10-24T10:00:00'),
            assignedTo: 'Admin Team',
            replies: [
              {
                id: '1',
                author: 'Support Agent',
                text: 'We are looking into this issue. Can you provide your property ID?',
                timestamp: new Date('2024-10-23T15:30:00'),
                isAdmin: true
              },
              {
                id: '2',
                author: 'Emma Wilson',
                text: 'Sure, the property ID is PROP-12345',
                timestamp: new Date('2024-10-23T16:00:00'),
                isAdmin: false
              }
            ]
          },
          {
            id: 'TKT-003',
            user: {
              id: 'owner1',
              name: 'Michael Davis',
              email: 'mdavis@example.com'
            },
            subject: 'Payout delay issue',
            category: 'billing',
            priority: 'high',
            status: 'open',
            description: 'My payout has been pending for over 5 days. When can I expect to receive it?',
            createdAt: new Date('2024-10-24T11:00:00'),
            updatedAt: new Date('2024-10-24T11:00:00'),
            assignedTo: null,
            replies: []
          },
          {
            id: 'TKT-004',
            user: {
              id: 'user3',
              name: 'Sarah Johnson',
              email: 'sarah.j@example.com'
            },
            subject: 'How to add EV charging amenity?',
            category: 'general',
            priority: 'low',
            status: 'resolved',
            description: 'I want to add EV charging as an amenity to my property. How do I do this?',
            createdAt: new Date('2024-10-22T10:30:00'),
            updatedAt: new Date('2024-10-23T09:15:00'),
            assignedTo: 'Support Team',
            replies: [
              {
                id: '1',
                author: 'Support Agent',
                text: 'You can add amenities by going to your property settings and clicking on "Edit Amenities".',
                timestamp: new Date('2024-10-22T11:00:00'),
                isAdmin: true
              },
              {
                id: '2',
                author: 'Sarah Johnson',
                text: 'Thank you! I found it.',
                timestamp: new Date('2024-10-22T11:30:00'),
                isAdmin: false
              }
            ]
          },
          {
            id: 'TKT-005',
            user: {
              id: 'user4',
              name: 'David Lee',
              email: 'david.lee@example.com'
            },
            subject: 'Account verification stuck',
            category: 'account',
            priority: 'medium',
            status: 'closed',
            description: 'My account verification has been pending for 2 weeks. Please help.',
            createdAt: new Date('2024-10-20T13:45:00'),
            updatedAt: new Date('2024-10-21T16:20:00'),
            assignedTo: 'Verification Team',
            replies: [
              {
                id: '1',
                author: 'Support Agent',
                text: 'Your account has been verified. You should be able to access all features now.',
                timestamp: new Date('2024-10-21T16:20:00'),
                isAdmin: true
              }
            ]
          }
        ];

        setTickets(mockTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const totalStats = {
    all: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    closed: tickets.filter(t => t.status === 'closed').length
  };

  const handleReply = () => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now().toString(),
      author: 'Admin',
      text: replyText,
      timestamp: new Date(),
      isAdmin: true
    };

    setTickets(prev => prev.map(t =>
      t.id === selectedTicket.id
        ? { ...t, replies: [...t.replies, newReply], updatedAt: new Date(), status: 'in_progress' }
        : t
    ));

    setSelectedTicket({
      ...selectedTicket,
      replies: [...selectedTicket.replies, newReply]
    });

    setReplyText('');
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t =>
      t.id === ticketId ? { ...t, status: newStatus, updatedAt: new Date() } : t
    ));
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Open</span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">In Progress</span>;
      case 'resolved':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Resolved</span>;
      case 'closed':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">Closed</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">High</span>;
      case 'medium':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Medium</span>;
      case 'low':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Low</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{priority}</span>;
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <FaExclamationCircle className="w-4 h-4 text-red-600" />;
      case 'medium':
        return <FaExclamationTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <FaClock className="w-4 h-4 text-green-600" />;
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-1">Manage customer support requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">{totalStats.all}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Open</p>
            <p className="text-2xl font-bold text-red-600">{totalStats.open}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">{totalStats.inProgress}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Resolved</p>
            <p className="text-2xl font-bold text-green-600">{totalStats.resolved}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Closed</p>
            <p className="text-2xl font-bold text-gray-600">{totalStats.closed}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <Card>
            <div className="p-12 text-center text-gray-500">
              No tickets found
            </div>
          </Card>
        ) : (
          filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedTicket(ticket);
                setShowDetailsModal(true);
              }}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getPriorityIcon(ticket.priority)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                        {ticket.status === 'open' && (
                          <span className="text-xs text-red-600 font-medium">NEW</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{ticket.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaUser className="w-3 h-3" />
                          {ticket.user.name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FaTicketAlt className="w-3 h-3" />
                          {ticket.id}
                        </span>
                        <span>•</span>
                        <span>{formatDate(ticket.createdAt, 'short')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    {getStatusBadge(ticket.status)}
                    {getPriorityBadge(ticket.priority)}
                  </div>
                </div>
                {ticket.assignedTo && (
                  <div className="text-xs text-gray-500">
                    Assigned to: <span className="font-medium">{ticket.assignedTo}</span>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Ticket Details Modal */}
      {showDetailsModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{selectedTicket.subject}</h3>
                    {getStatusBadge(selectedTicket.status)}
                    {getPriorityBadge(selectedTicket.priority)}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{selectedTicket.id}</span>
                    <span>•</span>
                    <span>{formatDate(selectedTicket.createdAt, 'long')}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedTicket(null);
                  }}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* User Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">User Information</p>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>{selectedTicket.user.name}</span>
                  <span>•</span>
                  <span>{selectedTicket.user.email}</span>
                </div>
              </div>

              {/* Original Message */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-900 mb-2">Description</p>
                <p className="text-sm text-gray-700">{selectedTicket.description}</p>
              </div>

              {/* Replies */}
              {selectedTicket.replies.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-4">Replies</p>
                  <div className="space-y-4">
                    {selectedTicket.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className={`p-4 rounded-lg ${
                          reply.isAdmin ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-gray-900">{reply.author}</p>
                          <p className="text-xs text-gray-500">{formatDate(reply.timestamp, 'short')}</p>
                        </div>
                        <p className="text-sm text-gray-700">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply Box */}
              {selectedTicket.status !== 'closed' && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-900 mb-2">Add Reply</p>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <button
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <FaReply className="w-4 h-4" />
                    Send Reply
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {selectedTicket.status === 'open' && (
                  <button
                    onClick={() => updateTicketStatus(selectedTicket.id, 'in_progress')}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Working
                  </button>
                )}
                {(selectedTicket.status === 'open' || selectedTicket.status === 'in_progress') && (
                  <button
                    onClick={() => updateTicketStatus(selectedTicket.id, 'resolved')}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaCheckCircle className="w-4 h-4" />
                    Mark Resolved
                  </button>
                )}
                {selectedTicket.status === 'resolved' && (
                  <button
                    onClick={() => updateTicketStatus(selectedTicket.id, 'closed')}
                    className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close Ticket
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SupportTickets;
