import { useState, useEffect } from 'react';
import {
  FaParking,
  FaDollarSign,
  FaCalendarCheck,
  FaStar,
  FaChartLine,
  FaClock,
  FaExclamationTriangle
} from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatCurrency, formatDate } from '@utils/formatters';
import { useAuth } from '@context/AuthContext';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await ownerService.getDashboardData(user.id);

        // Mock data
        const mockData = {
          stats: {
            totalProperties: 5,
            totalSpaces: 12,
            activeBookings: 8,
            totalEarnings: 15420,
            monthlyEarnings: 3240,
            averageRating: 4.7,
            totalReviews: 128,
            occupancyRate: 78
          },
          recentBookings: [
            {
              id: 'BKG-101',
              spaceName: 'Premium Covered #A1',
              propertyName: 'Downtown Plaza',
              guestName: 'John Doe',
              startDate: new Date('2024-10-25T09:00:00'),
              endDate: new Date('2024-10-25T18:00:00'),
              amount: 450,
              status: 'confirmed'
            },
            {
              id: 'BKG-102',
              spaceName: 'Open Lot #5',
              propertyName: 'Airport Hub',
              guestName: 'Jane Smith',
              startDate: new Date('2024-10-26T08:00:00'),
              endDate: new Date('2024-10-26T20:00:00'),
              amount: 600,
              status: 'pending'
            },
            {
              id: 'BKG-103',
              spaceName: 'Garage #12',
              propertyName: 'Shopping Mall',
              guestName: 'Mike Johnson',
              startDate: new Date('2024-10-24T10:00:00'),
              endDate: new Date('2024-10-24T22:00:00'),
              amount: 720,
              status: 'active'
            }
          ],
          earningsChart: [
            { month: 'Apr', earnings: 2100 },
            { month: 'May', earnings: 2450 },
            { month: 'Jun', earnings: 2800 },
            { month: 'Jul', earnings: 3100 },
            { month: 'Aug', earnings: 2900 },
            { month: 'Sep', earnings: 3400 },
            { month: 'Oct', earnings: 3240 }
          ],
          alerts: [
            {
              id: 1,
              type: 'warning',
              message: 'Property "Downtown Plaza" has 2 pending maintenance requests',
              timestamp: new Date('2024-10-24T10:30:00')
            },
            {
              id: 2,
              type: 'info',
              message: 'New booking request for "Airport Hub" awaiting confirmation',
              timestamp: new Date('2024-10-24T09:15:00')
            }
          ],
          topPerformingSpaces: [
            { name: 'Premium Covered #A1', earnings: 1840, bookings: 23 },
            { name: 'Garage #12', earnings: 1620, bookings: 18 },
            { name: 'Open Lot #5', earnings: 1450, bookings: 22 }
          ]
        };

        setDashboardData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  const { stats, recentBookings, earningsChart, alerts, topPerformingSpaces } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back! Here's an overview of your properties and earnings.
        </p>
      </div>

      {/* Alerts */}
      {alerts && alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${
                alert.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <FaExclamationTriangle
                  className={`mt-0.5 flex-shrink-0 ${
                    alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`}
                />
                <div className="flex-1">
                  <p className={`font-medium ${
                    alert.type === 'warning' ? 'text-yellow-900' : 'text-blue-900'
                  }`}>
                    {alert.message}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(alert.timestamp, 'PPp')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Properties */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
              <p className="text-sm text-gray-500 mt-1">{stats.totalSpaces} spaces total</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <FaParking className="text-3xl text-primary-600" />
            </div>
          </div>
        </Card>

        {/* Monthly Earnings */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Month</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(stats.monthlyEarnings)}
              </p>
              <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                <FaChartLine /> +12% from last month
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FaDollarSign className="text-3xl text-green-600" />
            </div>
          </div>
        </Card>

        {/* Active Bookings */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeBookings}</p>
              <p className="text-sm text-gray-500 mt-1">Today</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaCalendarCheck className="text-3xl text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Average Rating */}
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
              <p className="text-sm text-gray-500 mt-1">{stats.totalReviews} reviews</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaStar className="text-3xl text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Earnings Overview
          </h2>
          <div className="space-y-3">
            {earningsChart.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-gray-700">
                  {item.month}
                </div>
                <div className="flex-1">
                  <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-primary-600 rounded-lg transition-all"
                      style={{
                        width: `${(item.earnings / 3500) * 100}%`
                      }}
                    />
                  </div>
                </div>
                <div className="w-24 text-right text-sm font-semibold text-gray-900">
                  {formatCurrency(item.earnings)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Earnings</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalEarnings)}
              </span>
            </div>
          </div>
        </Card>

        {/* Top Performing Spaces */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Top Performers
          </h2>
          <div className="space-y-4">
            {topPerformingSpaces.map((space, index) => (
              <div key={index} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {space.name}
                    </span>
                  </div>
                </div>
                <div className="ml-8 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Earnings:</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(space.earnings)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bookings:</span>
                    <span className="font-semibold text-gray-900">
                      {space.bookings}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
          <a href="/owner/bookings" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Space
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div>
                      <p className="font-medium">{booking.spaceName}</p>
                      <p className="text-gray-500">{booking.propertyName}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.guestName}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <FaClock className="text-gray-400" />
                      <span>{formatDate(booking.startDate, 'MMM d, p')}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(booking.amount)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Occupancy Rate</p>
            <div className="relative w-32 h-32 mx-auto mb-2">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - stats.occupancyRate / 100)}`}
                  className="text-primary-600"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{stats.occupancyRate}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">This Month</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Total Spaces</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">{stats.totalSpaces}</p>
            <p className="text-sm text-gray-500">Across {stats.totalProperties} properties</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">All-Time Earnings</p>
            <p className="text-4xl font-bold text-gray-900 mb-2">
              {formatCurrency(stats.totalEarnings)}
            </p>
            <p className="text-sm text-gray-500">Since you joined</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
