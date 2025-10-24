import { useState } from 'react';
import { FiBell, FiCheck, FiTrash2, FiFilter } from 'react-icons/fi';
import { Button, Card, Badge } from '@components/common';

const Notifications = () => {
  const [filter, setFilter] = useState('all'); // all, unread, read

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your parking booking at Downtown Garage has been confirmed for Dec 25, 2024.',
      timestamp: '2 hours ago',
      read: false,
      icon: '🎉',
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of $45.00 has been processed successfully.',
      timestamp: '5 hours ago',
      read: false,
      icon: '💳',
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Parking Reminder',
      message: 'Your parking reservation starts in 1 hour at 123 Main St.',
      timestamp: '1 day ago',
      read: true,
      icon: '⏰',
    },
    {
      id: 4,
      type: 'review',
      title: 'Review Request',
      message: 'How was your parking experience? Please leave a review.',
      timestamp: '2 days ago',
      read: true,
      icon: '⭐',
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from the property owner.',
      timestamp: '3 days ago',
      read: true,
      icon: '💬',
    },
  ];

  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getNotificationColor = (type) => {
    const colors = {
      booking: 'bg-blue-50 border-blue-200',
      payment: 'bg-green-50 border-green-200',
      reminder: 'bg-yellow-50 border-yellow-200',
      review: 'bg-purple-50 border-purple-200',
      message: 'bg-pink-50 border-pink-200',
    };
    return colors[type] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FiBell className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : 'All caught up!'}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllAsRead}
              icon={<FiCheck />}
            >
              Mark all as read
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'read'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card padding="lg" className="text-center">
            <FiBell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No notifications to display</p>
          </Card>
        ) : (
          filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              padding="md"
              className={`${getNotificationColor(notif.type)} ${
                !notif.read ? 'border-l-4' : ''
              } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-3xl flex-shrink-0">{notif.icon}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <Badge variant="primary" size="sm">
                          New
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {notif.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{notif.message}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!notif.read && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                      >
                        <FiCheck className="w-3 h-3" />
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif.id)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                    >
                      <FiTrash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Empty state when all deleted */}
      {notifications.length === 0 && (
        <Card padding="lg" className="text-center">
          <FiBell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No notifications yet
          </h3>
          <p className="text-gray-600">
            When you receive notifications, they'll appear here.
          </p>
        </Card>
      )}
    </div>
  );
};

export default Notifications;
