import { useAuth } from '@context/AuthContext';
import { Card } from '@components/common';
import { FiCalendar, FiTruck, FiCreditCard, FiMapPin } from 'react-icons/fi';

const UserDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Active Bookings',
      value: '3',
      icon: <FiCalendar className="w-6 h-6" />,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'My Vehicles',
      value: '2',
      icon: <FiTruck className="w-6 h-6" />,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Payment Methods',
      value: '1',
      icon: <FiCreditCard className="w-6 h-6" />,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      label: 'Favorite Spots',
      value: '5',
      icon: <FiMapPin className="w-6 h-6" />,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your parking</p>
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

      {/* Recent Activity */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-500 text-center py-12">
            No recent activity. Start booking parking spaces!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default UserDashboard;
