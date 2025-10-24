import { useState, useEffect } from 'react';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatDate, formatCurrency } from '@utils/formatters';
import {
  FaSearch,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaBan,
  FaEye,
  FaUser,
  FaParking,
  FaCar,
  FaDollarSign,
  FaExclamationTriangle
} from 'react-icons/fa';

const BookingsManagement = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockBookings = [
          {
            id: 'BKG-001',
            user: {
              id: 'user1',
              name: 'John Smith',
              email: 'john.smith@example.com',
              phone: '+1 (555) 123-4567'
            },
            property: {
              id: 'prop1',
              title: 'Downtown Garage - Premium Parking',
              address: '123 Main St, New York, NY',
              owner: 'Sarah Johnson'
            },
            vehicle: {
              make: 'Toyota',
              model: 'Camry',
              plate: 'ABC-1234',
              color: 'Silver'
            },
            checkIn: new Date('2024-10-25T09:00:00'),
            checkOut: new Date('2024-10-25T17:00:00'),
            duration: '8 hours',
            amount: 120,
            platformFee: 18,
            totalAmount: 138,
            status: 'confirmed',
            paymentStatus: 'paid',
            paymentMethod: 'Credit Card',
            createdAt: new Date('2024-10-20T14:30:00'),
            lastUpdated: new Date('2024-10-20T14:30:00')
          },
          {
            id: 'BKG-002',
            user: {
              id: 'user2',
              name: 'Emma Wilson',
              email: 'emma.w@example.com',
              phone: '+1 (555) 234-5678'
            },
            property: {
              id: 'prop2',
              title: 'Airport Parking - Long-term',
              address: '456 Airport Rd, Los Angeles, CA',
              owner: 'Michael Davis'
            },
            vehicle: {
              make: 'Honda',
              model: 'Accord',
              plate: 'XYZ-5678',
              color: 'Black'
            },
            checkIn: new Date('2024-10-24T15:00:00'),
            checkOut: new Date('2024-10-27T10:00:00'),
            duration: '3 days',
            amount: 240,
            platformFee: 36,
            totalAmount: 276,
            status: 'active',
            paymentStatus: 'paid',
            paymentMethod: 'PayPal',
            createdAt: new Date('2024-10-22T10:15:00'),
            lastUpdated: new Date('2024-10-24T15:00:00')
          },
          {
            id: 'BKG-003',
            user: {
              id: 'user3',
              name: 'Michael Brown',
              email: 'mbrown@example.com',
              phone: '+1 (555) 345-6789'
            },
            property: {
              id: 'prop3',
              title: 'City Center Plaza Parking',
              address: '789 Center Ave, Chicago, IL',
              owner: 'Sarah Johnson'
            },
            vehicle: {
              make: 'Tesla',
              model: 'Model 3',
              plate: 'EV-9012',
              color: 'White'
            },
            checkIn: new Date('2024-10-23T08:00:00'),
            checkOut: new Date('2024-10-23T18:00:00'),
            duration: '10 hours',
            amount: 100,
            platformFee: 15,
            totalAmount: 115,
            status: 'completed',
            paymentStatus: 'paid',
            paymentMethod: 'Credit Card',
            createdAt: new Date('2024-10-21T16:45:00'),
            lastUpdated: new Date('2024-10-23T18:05:00')
          },
          {
            id: 'BKG-004',
            user: {
              id: 'user4',
              name: 'David Lee',
              email: 'david.lee@example.com',
              phone: '+1 (555) 456-7890'
            },
            property: {
              id: 'prop1',
              title: 'Downtown Garage - Premium Parking',
              address: '123 Main St, New York, NY',
              owner: 'Sarah Johnson'
            },
            vehicle: {
              make: 'BMW',
              model: 'X5',
              plate: 'LUX-3456',
              color: 'Blue'
            },
            checkIn: new Date('2024-10-26T10:00:00'),
            checkOut: new Date('2024-10-26T14:00:00'),
            duration: '4 hours',
            amount: 60,
            platformFee: 9,
            totalAmount: 69,
            status: 'pending',
            paymentStatus: 'pending',
            paymentMethod: 'Credit Card',
            createdAt: new Date('2024-10-24T11:20:00'),
            lastUpdated: new Date('2024-10-24T11:20:00')
          },
          {
            id: 'BKG-005',
            user: {
              id: 'user5',
              name: 'Lisa Anderson',
              email: 'lisa.a@example.com',
              phone: '+1 (555) 567-8901'
            },
            property: {
              id: 'prop4',
              title: 'Beach Front Parking',
              address: '321 Beach Blvd, Miami, FL',
              owner: 'Emma Wilson'
            },
            vehicle: {
              make: 'Ford',
              model: 'Mustang',
              plate: 'SPT-7890',
              color: 'Red'
            },
            checkIn: new Date('2024-10-22T12:00:00'),
            checkOut: new Date('2024-10-22T20:00:00'),
            duration: '8 hours',
            amount: 80,
            platformFee: 12,
            totalAmount: 92,
            status: 'cancelled',
            paymentStatus: 'refunded',
            paymentMethod: 'Credit Card',
            createdAt: new Date('2024-10-20T09:30:00'),
            lastUpdated: new Date('2024-10-21T14:15:00')
          }
        ];

        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalStats = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    active: bookings.filter(b => b.status === 'active').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalAmount, 0)
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Pending</span>;
      case 'confirmed':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Confirmed</span>;
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Active</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Cancelled</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{status}</span>;
    }
  };

  const getPaymentBadge = (status) => {
    switch (status) {
      case 'paid':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Paid</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Pending</span>;
      case 'refunded':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Refunded</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Failed</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{status}</span>;
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
          <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all platform bookings</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Export Bookings
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">{totalStats.all}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{totalStats.pending}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-blue-600">{totalStats.confirmed}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Active</p>
            <p className="text-2xl font-bold text-green-600">{totalStats.active}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-gray-600">{totalStats.completed}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-red-600">{totalStats.cancelled}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Revenue</p>
            <p className="text-xl font-bold text-green-600">{formatCurrency(totalStats.totalRevenue)}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by booking ID, user, property, or plate..."
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
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    {/* Booking ID */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{booking.id}</p>
                      <p className="text-xs text-gray-500">{formatDate(booking.createdAt, 'short')}</p>
                    </td>

                    {/* User */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{booking.user.name}</p>
                      <p className="text-xs text-gray-500">{booking.user.email}</p>
                    </td>

                    {/* Property */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 max-w-[200px] truncate">
                        {booking.property.title}
                      </p>
                      <p className="text-xs text-gray-500">Owner: {booking.property.owner}</p>
                    </td>

                    {/* Vehicle */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FaCar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{booking.vehicle.plate}</p>
                          <p className="text-xs text-gray-500">
                            {booking.vehicle.make} {booking.vehicle.model}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Schedule */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{formatDate(booking.checkIn, 'short')}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(booking.checkIn, 'time')} - {formatDate(booking.checkOut, 'time')}
                      </p>
                      <p className="text-xs text-gray-500">{booking.duration}</p>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(booking.totalAmount)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Fee: {formatCurrency(booking.platformFee)}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentBadge(booking.paymentStatus)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowDetailsModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedBooking.id}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedBooking(null);
                  }}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Status Badges */}
              <div className="flex gap-3 mb-6">
                {getStatusBadge(selectedBooking.status)}
                {getPaymentBadge(selectedBooking.paymentStatus)}
              </div>

              {/* Content Grid */}
              <div className="space-y-6">
                {/* User Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <FaUser className="w-4 h-4 text-gray-400" />
                    User Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.user.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Property Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <FaParking className="w-4 h-4 text-gray-400" />
                    Property Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Title:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.property.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Address:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.property.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Owner:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.property.owner}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <FaCar className="w-4 h-4 text-gray-400" />
                    Vehicle Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">License Plate:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.vehicle.plate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Make & Model:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {selectedBooking.vehicle.make} {selectedBooking.vehicle.model}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Color:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.vehicle.color}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Schedule */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                    Schedule
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Check-in:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(selectedBooking.checkIn, 'long')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Check-out:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatDate(selectedBooking.checkOut, 'long')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <FaDollarSign className="w-4 h-4 text-gray-400" />
                    Payment Information
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount:</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedBooking.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Platform Fee:</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(selectedBooking.platformFee)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-900">Total:</span>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(selectedBooking.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Payment Method:</span>
                      <span className="text-sm font-medium text-gray-900">{selectedBooking.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedBooking(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;
