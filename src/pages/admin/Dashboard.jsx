import { useState, useEffect } from 'react';
import { useAuth } from '@context/AuthContext';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatDate, formatCurrency } from '@utils/formatters';
import {
  FaUsers,
  FaParking,
  FaCalendarCheck,
  FaDollarSign,
  FaChartLine,
  FaExclamationTriangle,
  FaStar,
  FaTicketAlt,
  FaArrowUp,
  FaArrowDown,
  FaUserPlus,
  FaCheckCircle,
  FaClock,
  FaTimes
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockStats = {
          users: {
            total: 15847,
            active: 12453,
            new: 347,
            growth: 12.5
          },
          properties: {
            total: 3245,
            active: 2891,
            pending: 54,
            growth: 8.3
          },
          bookings: {
            total: 45678,
            active: 892,
            completed: 44321,
            cancelled: 465,
            growth: 15.7
          },
          revenue: {
            total: 1847523,
            thisMonth: 145890,
            lastMonth: 132450,
            growth: 10.1
          },
          reviews: {
            total: 28945,
            average: 4.6,
            pending: 123
          },
          support: {
            open: 47,
            pending: 23,
            resolved: 1245
          }
        };

        const mockActivity = [
          {
            id: '1',
            type: 'user_registration',
            user: 'John Smith',
            action: 'New user registered',
            timestamp: new Date('2024-10-24T14:30:00'),
            status: 'success'
          },
          {
            id: '2',
            type: 'property_approval',
            user: 'Admin',
            action: 'Property approved: Downtown Garage',
            timestamp: new Date('2024-10-24T14:15:00'),
            status: 'success'
          },
          {
            id: '3',
            type: 'booking_completed',
            user: 'Emma Wilson',
            action: 'Booking completed successfully',
            timestamp: new Date('2024-10-24T14:00:00'),
            status: 'success'
          },
          {
            id: '4',
            type: 'payment_received',
            user: 'System',
            action: 'Payment received: $125.00',
            timestamp: new Date('2024-10-24T13:45:00'),
            status: 'success'
          },
          {
            id: '5',
            type: 'review_submitted',
            user: 'Michael Brown',
            action: 'New review submitted (5 stars)',
            timestamp: new Date('2024-10-24T13:30:00'),
            status: 'info'
          },
          {
            id: '6',
            type: 'support_ticket',
            user: 'Lisa Anderson',
            action: 'New support ticket opened',
            timestamp: new Date('2024-10-24T13:15:00'),
            status: 'warning'
          }
        ];

        const mockAlerts = [
          {
            id: '1',
            type: 'warning',
            title: 'Pending Property Approvals',
            message: '54 properties waiting for approval',
            action: 'Review Now',
            timestamp: new Date('2024-10-24T14:00:00')
          },
          {
            id: '2',
            type: 'info',
            title: 'System Maintenance',
            message: 'Scheduled maintenance on Oct 26, 2:00 AM',
            timestamp: new Date('2024-10-24T10:00:00')
          },
          {
            id: '3',
            type: 'error',
            title: 'High Support Ticket Volume',
            message: '47 open tickets require attention',
            action: 'View Tickets',
            timestamp: new Date('2024-10-24T09:00:00')
          }
        ];

        setStats(mockStats);
        setRecentActivity(mockActivity);
        setAlerts(mockAlerts);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Users',
      value: stats.users.total.toLocaleString(),
      subValue: `${stats.users.active.toLocaleString()} active`,
      change: stats.users.growth,
      icon: FaUsers,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Properties',
      value: stats.properties.total.toLocaleString(),
      subValue: `${stats.properties.pending} pending`,
      change: stats.properties.growth,
      icon: FaParking,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      label: 'Total Bookings',
      value: stats.bookings.total.toLocaleString(),
      subValue: `${stats.bookings.active} active`,
      change: stats.bookings.growth,
      icon: FaCalendarCheck,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(stats.revenue.total),
      subValue: `${formatCurrency(stats.revenue.thisMonth)} this month`,
      change: stats.revenue.growth,
      icon: FaDollarSign,
      color: 'yellow',
      bgGradient: 'from-yellow-500 to-orange-600'
    }
  ];

  const quickStats = [
    {
      label: 'Avg Rating',
      value: stats.reviews.average,
      icon: FaStar,
      color: 'yellow'
    },
    {
      label: 'Open Tickets',
      value: stats.support.open,
      icon: FaTicketAlt,
      color: 'red'
    },
    {
      label: 'New Users',
      value: stats.users.new,
      icon: FaUserPlus,
      color: 'blue'
    },
    {
      label: 'Pending Reviews',
      value: stats.reviews.pending,
      icon: FaClock,
      color: 'orange'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration':
        return <FaUserPlus className="w-4 h-4" />;
      case 'property_approval':
        return <FaCheckCircle className="w-4 h-4" />;
      case 'booking_completed':
        return <FaCalendarCheck className="w-4 h-4" />;
      case 'payment_received':
        return <FaDollarSign className="w-4 h-4" />;
      case 'review_submitted':
        return <FaStar className="w-4 h-4" />;
      case 'support_ticket':
        return <FaTicketAlt className="w-4 h-4" />;
      default:
        return <FaCheckCircle className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      case 'error':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return <FaTimes className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <FaExclamationTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <FaChartLine className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.name}! Here's your platform overview
        </p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-2 ${getAlertColor(alert.type)} flex items-start gap-3`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{alert.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
              </div>
              {alert.action && (
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  {alert.action}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.bgGradient}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change >= 0 ? (
                      <FaArrowUp className="w-3 h-3" />
                    ) : (
                      <FaArrowDown className="w-3 h-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.subValue}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <div className="p-4 flex items-center gap-3">
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${getActivityColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {activity.user} • {formatDate(activity.timestamp, 'time')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Platform Health */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Health</h2>
            <div className="space-y-4">
              {/* User Activity Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">User Activity Rate</span>
                  <span className="text-sm font-medium text-gray-900">
                    {((stats.users.active / stats.users.total) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(stats.users.active / stats.users.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Property Approval Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Property Approval Rate</span>
                  <span className="text-sm font-medium text-gray-900">
                    {((stats.properties.active / stats.properties.total) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(stats.properties.active / stats.properties.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Booking Success Rate */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Booking Success Rate</span>
                  <span className="text-sm font-medium text-gray-900">
                    {((stats.bookings.completed / stats.bookings.total) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(stats.bookings.completed / stats.bookings.total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Support Ticket Resolution */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700">Support Resolution Rate</span>
                  <span className="text-sm font-medium text-gray-900">
                    {((stats.support.resolved / (stats.support.resolved + stats.support.open)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${(stats.support.resolved / (stats.support.resolved + stats.support.open)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Overview */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.revenue.thisMonth)}</p>
              <p className="text-xs text-green-600 mt-1">
                +{stats.revenue.growth}% from last month
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Last Month</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.revenue.lastMonth)}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.revenue.total)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
