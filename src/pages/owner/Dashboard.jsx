import { useAuth } from '@context/AuthContext';
import { Card } from '@components/common';
import { FiDollarSign, FiHome, FiCalendar, FiStar } from 'react-icons/fi';

const OwnerDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Earnings',
      value: '$2,450',
      icon: <FiDollarSign className="w-6 h-6" />,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Properties',
      value: '4',
      icon: <FiHome className="w-6 h-6" />,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Active Bookings',
      value: '12',
      icon: <FiCalendar className="w-6 h-6" />,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      label: 'Avg Rating',
      value: '4.8',
      icon: <FiStar className="w-6 h-6" />,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user?.name}! Manage your properties</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} padding="lg">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          <p className="text-gray-500 text-center py-12">
            No recent bookings. Your properties will show up here.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default OwnerDashboard;
