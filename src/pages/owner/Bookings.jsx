import { useState, useEffect } from 'react';
import {
  FaCalendarAlt,
  FaCar,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatCurrency, formatDate } from '@utils/formatters';
import { useAuth } from '@context/AuthContext';

const OwnerBookings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Bookings' },
    { id: 'pending', label: 'Pending' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockBookings = [
          {
            id: 'BKG-101',
            propertyName: 'Downtown Plaza',
            spaceName: 'Premium Covered #A1',
            guestName: 'John Doe',
            guestEmail: 'john@example.com',
            guestPhone: '+1-555-0101',
            vehicleInfo: 'Toyota Camry - ABC-1234',
            startDate: new Date('2024-10-25T09:00:00'),
            endDate: new Date('2024-10-25T18:00:00'),
            amount: 450,
            status: 'confirmed',
            checkInTime: null,
            checkOutTime: null
          },
          {
            id: 'BKG-102',
            propertyName: 'Airport Hub',
            spaceName: 'Open Lot #5',
            guestName: 'Jane Smith',
            guestEmail: 'jane@example.com',
            guestPhone: '+1-555-0102',
            vehicleInfo: 'Honda Civic - XYZ-5678',
            startDate: new Date('2024-10-26T08:00:00'),
            endDate: new Date('2024-10-26T20:00:00'),
            amount: 600,
            status: 'pending',
            checkInTime: null,
            checkOutTime: null
          },
          {
            id: 'BKG-103',
            propertyName: 'Shopping Mall',
            spaceName: 'Garage #12',
            guestName: 'Mike Johnson',
            guestEmail: 'mike@example.com',
            guestPhone: '+1-555-0103',
            vehicleInfo: 'BMW X5 - LUX-9999',
            startDate: new Date('2024-10-24T10:00:00'),
            endDate: new Date('2024-10-24T22:00:00'),
            amount: 720,
            status: 'active',
            checkInTime: new Date('2024-10-24T10:05:00'),
            checkOutTime: null
          },
          {
            id: 'BKG-104',
            propertyName: 'Downtown Plaza',
            spaceName: 'Premium Covered #A2',
            guestName: 'Sarah Williams',
            guestEmail: 'sarah@example.com',
            guestPhone: '+1-555-0104',
            vehicleInfo: 'Tesla Model 3 - EV-1111',
            startDate: new Date('2024-10-20T07:00:00'),
            endDate: new Date('2024-10-20T19:00:00'),
            amount: 540,
            status: 'completed',
            checkInTime: new Date('2024-10-20T07:10:00'),
            checkOutTime: new Date('2024-10-20T18:55:00')
          },
          {
            id: 'BKG-105',
            propertyName: 'Airport Hub',
            spaceName: 'Open Lot #3',
            guestName: 'Robert Brown',
            guestEmail: 'robert@example.com',
            guestPhone: '+1-555-0105',
            vehicleInfo: 'Ford F-150 - TRK-7890',
            startDate: new Date('2024-10-18T06:00:00'),
            endDate: new Date('2024-10-18T18:00:00'),
            amount: 600,
            status: 'cancelled',
            checkInTime: null,
            checkOutTime: null
          }
        ];

        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    const matchesSearch =
      searchTerm === '' ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProperty =
      selectedProperty === 'all' || booking.propertyName === selectedProperty;

    return matchesTab && matchesSearch && matchesProperty;
  });

  // Get unique properties for filter
  const properties = ['all', ...new Set(bookings.map(b => b.propertyName))];

  // Handle approve booking
  const handleApproveBooking = async (bookingId) => {
    try {
      // TODO: API call
      setBookings(bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'confirmed' } : b
      ));
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  // Handle reject booking
  const handleRejectBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to reject this booking?')) return;

    try {
      // TODO: API call
      setBookings(bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return badges[status] || badges.pending;
  };

  const getTabCount = (tabId) => {
    if (tabId === 'all') return bookings.length;
    return bookings.filter(b => b.status === tabId).length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
        <p className="mt-2 text-gray-600">
          Manage and track bookings across all your properties
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by booking ID, guest name, or property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {properties.map(property => (
                <option key={property} value={property}>
                  {property === 'all' ? 'All Properties' : property}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
              <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {getTabCount(tab.id)}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <Card className="text-center py-12">
          <FaCalendarAlt className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bookings found
          </h3>
          <p className="text-gray-600">
            {searchTerm || selectedProperty !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Bookings will appear here once guests make reservations'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.propertyName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Booking #{booking.id} • {booking.spaceName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(booking.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Guest Info */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Guest Information</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{booking.guestName}</p>
                        <p>{booking.guestEmail}</p>
                        <p>{booking.guestPhone}</p>
                      </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Vehicle</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaCar />
                        <span>{booking.vehicleInfo}</span>
                      </div>
                    </div>

                    {/* Booking Time */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Booking Period</p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaClock />
                          <span>{formatDate(booking.startDate, 'PPp')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaClock />
                          <span>{formatDate(booking.endDate, 'PPp')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Check-in/out Times */}
                    {(booking.checkInTime || booking.checkOutTime) && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Actual Times</p>
                        <div className="space-y-1 text-sm text-gray-600">
                          {booking.checkInTime && (
                            <p>Check-in: {formatDate(booking.checkInTime, 'p')}</p>
                          )}
                          {booking.checkOutTime && (
                            <p>Check-out: {formatDate(booking.checkOutTime, 'p')}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveBooking(booking.id)}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                        >
                          <FaCheckCircle className="mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectBooking(booking.id)}
                          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
                        >
                          <FaTimesCircle className="mr-2" />
                          Reject
                        </button>
                      </>
                    )}
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Contact Guest
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {bookings.filter(b => b.status === 'pending').length}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {bookings.filter(b => b.status === 'active').length}
          </p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(bookings.reduce((sum, b) => sum + b.amount, 0))}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default OwnerBookings;
