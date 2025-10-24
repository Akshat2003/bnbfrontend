import { useState, useEffect } from 'react';
import {
  FaDollarSign,
  FaCalendarAlt,
  FaDownload,
  FaChartLine,
  FaCreditCard,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatCurrency, formatDate } from '@utils/formatters';
import { useAuth } from '@context/AuthContext';

const Earnings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [earningsData, setEarningsData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    const fetchEarningsData = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockData = {
          summary: {
            totalEarnings: 15420,
            thisMonth: 3240,
            pending: 450,
            available: 2790,
            lastPayout: 2100,
            nextPayoutDate: new Date('2024-11-01')
          },
          monthlyEarnings: [
            { month: 'Jan', earnings: 1800, bookings: 24 },
            { month: 'Feb', earnings: 2100, bookings: 28 },
            { month: 'Mar', earnings: 2400, bookings: 32 },
            { month: 'Apr', earnings: 2100, bookings: 27 },
            { month: 'May', earnings: 2450, bookings: 31 },
            { month: 'Jun', earnings: 2800, bookings: 36 },
            { month: 'Jul', earnings: 3100, bookings: 40 },
            { month: 'Aug', earnings: 2900, bookings: 37 },
            { month: 'Sep', earnings: 3400, bookings: 43 },
            { month: 'Oct', earnings: 3240, bookings: 41 }
          ],
          recentTransactions: [
            {
              id: 'TXN-001',
              type: 'booking',
              description: 'Booking #BKG-101 - Downtown Plaza',
              amount: 450,
              platformFee: 67.5,
              netAmount: 382.5,
              status: 'completed',
              date: new Date('2024-10-24T14:30:00')
            },
            {
              id: 'TXN-002',
              type: 'payout',
              description: 'Weekly Payout',
              amount: -2100,
              platformFee: 0,
              netAmount: -2100,
              status: 'completed',
              date: new Date('2024-10-21T10:00:00')
            },
            {
              id: 'TXN-003',
              type: 'booking',
              description: 'Booking #BKG-102 - Airport Hub',
              amount: 600,
              platformFee: 90,
              netAmount: 510,
              status: 'pending',
              date: new Date('2024-10-23T16:20:00')
            },
            {
              id: 'TXN-004',
              type: 'booking',
              description: 'Booking #BKG-103 - Shopping Mall',
              amount: 720,
              platformFee: 108,
              netAmount: 612,
              status: 'completed',
              date: new Date('2024-10-22T11:45:00')
            },
            {
              id: 'TXN-005',
              type: 'refund',
              description: 'Refund - Booking #BKG-099',
              amount: -340,
              platformFee: 51,
              netAmount: -289,
              status: 'completed',
              date: new Date('2024-10-20T09:30:00')
            }
          ],
          payoutHistory: [
            {
              id: 'PAY-001',
              amount: 2100,
              date: new Date('2024-10-21'),
              status: 'completed',
              method: 'Bank Transfer',
              reference: 'BT-20241021-001'
            },
            {
              id: 'PAY-002',
              amount: 1950,
              date: new Date('2024-10-14'),
              status: 'completed',
              method: 'Bank Transfer',
              reference: 'BT-20241014-001'
            },
            {
              id: 'PAY-003',
              amount: 2300,
              date: new Date('2024-10-07'),
              status: 'completed',
              method: 'Bank Transfer',
              reference: 'BT-20241007-001'
            }
          ]
        };

        setEarningsData(mockData);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEarningsData();
    }
  }, [user, selectedPeriod]);

  const getTransactionIcon = (type) => {
    const icons = {
      booking: <FaCheckCircle className="text-green-600" />,
      payout: <FaDollarSign className="text-blue-600" />,
      refund: <FaClock className="text-red-600" />
    };
    return icons[type] || <FaDollarSign />;
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return badges[status] || badges.pending;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  const { summary, monthlyEarnings, recentTransactions, payoutHistory } = earningsData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Earnings & Payouts</h1>
          <p className="mt-2 text-gray-600">
            Track your earnings and manage payouts
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <FaDownload className="mr-2" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div>
            <p className="text-green-100 text-sm mb-1">Total Earnings</p>
            <p className="text-3xl font-bold mb-2">{formatCurrency(summary.totalEarnings)}</p>
            <p className="text-green-100 text-sm">All time</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div>
            <p className="text-blue-100 text-sm mb-1">This Month</p>
            <p className="text-3xl font-bold mb-2">{formatCurrency(summary.thisMonth)}</p>
            <p className="text-blue-100 text-sm">October 2024</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div>
            <p className="text-yellow-100 text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold mb-2">{formatCurrency(summary.pending)}</p>
            <p className="text-yellow-100 text-sm">Being processed</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div>
            <p className="text-purple-100 text-sm mb-1">Available</p>
            <p className="text-3xl font-bold mb-2">{formatCurrency(summary.available)}</p>
            <p className="text-purple-100 text-sm">Ready for payout</p>
          </div>
        </Card>
      </div>

      {/* Next Payout Info */}
      <Card className="bg-blue-50 border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaCalendarAlt className="text-2xl text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-blue-900">Next Payout</p>
              <p className="text-sm text-blue-700">
                {formatCurrency(summary.available)} will be transferred on {formatDate(summary.nextPayoutDate, 'PPP')}
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
            Request Early Payout
          </button>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings Chart */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Monthly Earnings</h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
            >
              <option value="month">Last 12 Months</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="space-y-3">
            {monthlyEarnings.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-700">
                  {item.month}
                </div>
                <div className="flex-1">
                  <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg transition-all"
                      style={{ width: `${(item.earnings / 3500) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-28 text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(item.earnings)}
                  </p>
                  <p className="text-xs text-gray-600">{item.bookings} bookings</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payout History */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Payouts</h2>
          <div className="space-y-4">
            {payoutHistory.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FaCreditCard className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{payout.method}</p>
                    <p className="text-sm text-gray-600">{formatDate(payout.date, 'PPP')}</p>
                    <p className="text-xs text-gray-500">{payout.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(payout.amount)}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(payout.status)}`}>
                    {payout.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Fee</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Net</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(txn.type)}
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {txn.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {txn.description}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(txn.date, 'MMM d, p')}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-right ${
                    txn.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {txn.amount >= 0 ? '+' : ''}{formatCurrency(txn.amount)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 text-right">
                    {formatCurrency(txn.platformFee)}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm font-semibold text-right ${
                    txn.netAmount >= 0 ? 'text-gray-900' : 'text-red-600'
                  }`}>
                    {txn.netAmount >= 0 ? '+' : ''}{formatCurrency(txn.netAmount)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(txn.status)}`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Breakdown Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Payout</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(summary.lastPayout)}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <FaChartLine className="text-2xl text-gray-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Platform Fee (15%)</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(summary.thisMonth * 0.15)}
            </p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Net Earnings</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(summary.thisMonth * 0.85)}
            </p>
            <p className="text-xs text-gray-500 mt-1">After fees</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Earnings;
