import { useState, useEffect } from 'react';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatCurrency } from '@utils/formatters';
import {
  FaChartLine,
  FaUsers,
  FaParking,
  FaCalendarAlt,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaDownload
} from 'react-icons/fa';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 90d, 1y
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockAnalytics = {
          overview: {
            totalRevenue: 2456890,
            revenueGrowth: 15.3,
            totalUsers: 15847,
            usersGrowth: 12.5,
            totalBookings: 45678,
            bookingsGrowth: 18.7,
            avgBookingValue: 53.78,
            avgBookingGrowth: 8.2
          },
          revenueByMonth: [
            { month: 'Apr', revenue: 145890, bookings: 3245 },
            { month: 'May', revenue: 178450, bookings: 3891 },
            { month: 'Jun', revenue: 195670, bookings: 4123 },
            { month: 'Jul', revenue: 212340, bookings: 4456 },
            { month: 'Aug', revenue: 234560, bookings: 4789 },
            { month: 'Sep', revenue: 267890, bookings: 5234 },
            { month: 'Oct', revenue: 298120, bookings: 5678 }
          ],
          topProperties: [
            { id: 1, name: 'Downtown Garage', revenue: 187500, bookings: 1250, rating: 4.8 },
            { id: 2, name: 'Airport Parking', revenue: 156300, bookings: 1045, rating: 4.7 },
            { id: 3, name: 'City Center Plaza', revenue: 124800, bookings: 832, rating: 4.6 },
            { id: 4, name: 'Beach Front', revenue: 89400, bookings: 596, rating: 4.5 },
            { id: 5, name: 'Stadium Parking', revenue: 67200, bookings: 448, rating: 4.3 }
          ],
          userGrowth: [
            { month: 'Apr', users: 12453, active: 9845 },
            { month: 'May', users: 13124, active: 10234 },
            { month: 'Jun', users: 13678, active: 10567 },
            { month: 'Jul', users: 14156, active: 10923 },
            { month: 'Aug', users: 14589, active: 11234 },
            { month: 'Sep', users: 15012, active: 11678 },
            { month: 'Oct', users: 15847, active: 12453 }
          ],
          bookingsByType: [
            { type: 'Hourly', count: 28456, percentage: 62.3 },
            { type: 'Daily', count: 12345, percentage: 27.0 },
            { type: 'Weekly', count: 3456, percentage: 7.6 },
            { type: 'Monthly', count: 1421, percentage: 3.1 }
          ],
          geographicDistribution: [
            { city: 'New York', bookings: 8945, revenue: 456789 },
            { city: 'Los Angeles', bookings: 7234, revenue: 389456 },
            { city: 'Chicago', bookings: 6123, revenue: 312345 },
            { city: 'San Francisco', bookings: 5456, revenue: 289012 },
            { city: 'Miami', bookings: 4789, revenue: 234567 }
          ]
        };

        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  const maxRevenue = Math.max(...analytics.revenueByMonth.map(m => m.revenue));
  const maxUsers = Math.max(...analytics.userGrowth.map(m => m.users));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-1">Platform performance and insights</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FaDownload className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                <FaDollarSign className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                analytics.overview.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.overview.revenueGrowth >= 0 ? (
                  <FaArrowUp className="w-3 h-3" />
                ) : (
                  <FaArrowDown className="w-3 h-3" />
                )}
                {Math.abs(analytics.overview.revenueGrowth)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(analytics.overview.totalRevenue)}
            </h3>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                analytics.overview.usersGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.overview.usersGrowth >= 0 ? (
                  <FaArrowUp className="w-3 h-3" />
                ) : (
                  <FaArrowDown className="w-3 h-3" />
                )}
                {Math.abs(analytics.overview.usersGrowth)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {analytics.overview.totalUsers.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                <FaCalendarAlt className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                analytics.overview.bookingsGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.overview.bookingsGrowth >= 0 ? (
                  <FaArrowUp className="w-3 h-3" />
                ) : (
                  <FaArrowDown className="w-3 h-3" />
                )}
                {Math.abs(analytics.overview.bookingsGrowth)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {analytics.overview.totalBookings.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                <FaChartLine className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                analytics.overview.avgBookingGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.overview.avgBookingGrowth >= 0 ? (
                  <FaArrowUp className="w-3 h-3" />
                ) : (
                  <FaArrowDown className="w-3 h-3" />
                )}
                {Math.abs(analytics.overview.avgBookingGrowth)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(analytics.overview.avgBookingValue)}
            </h3>
            <p className="text-sm text-gray-600">Avg Booking Value</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend</h2>
            <div className="space-y-3">
              {analytics.revenueByMonth.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.month}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.revenue)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.bookings} bookings</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* User Growth Chart */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">User Growth</h2>
            <div className="space-y-3">
              {analytics.userGrowth.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{item.month}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.users.toLocaleString()} users
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(item.users / maxUsers) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.active.toLocaleString()} active ({((item.active / item.users) * 100).toFixed(1)}%)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Properties */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Properties</h2>
            <div className="space-y-4">
              {analytics.topProperties.map((property, index) => (
                <div key={property.id} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{property.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                      <span>{property.bookings} bookings</span>
                      <span>•</span>
                      <span>★ {property.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {formatCurrency(property.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Bookings by Type */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bookings by Type</h2>
            <div className="space-y-4">
              {analytics.bookingsByType.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">{item.type}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.count.toLocaleString()} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-blue-600' :
                        index === 1 ? 'bg-green-600' :
                        index === 2 ? 'bg-purple-600' :
                        'bg-orange-600'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Bookings</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Avg Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analytics.geographicDistribution.map((location, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{location.city}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">
                      {location.bookings.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-gray-900">
                      {formatCurrency(location.revenue)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">
                      {formatCurrency(location.revenue / location.bookings)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
