import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaClock,
  FaCar,
  FaCalendarAlt,
  FaEye,
  FaTimes,
  FaRedo,
  FaStar,
  FaQrcode,
  FaDirections
} from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatDate, formatCurrency, formatDuration } from '@utils/formatters';
import { useAuth } from '@context/AuthContext';

const MyBookings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  // Tabs configuration
  const tabs = [
    { id: 'all', label: 'All Bookings', count: 0 },
    { id: 'active', label: 'Active', count: 0 },
    { id: 'upcoming', label: 'Upcoming', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
    { id: 'cancelled', label: 'Cancelled', count: 0 },
  ];

  // Mock data - Replace with actual API call
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await bookingService.getUserBookings(user.id);

        // Mock data for demonstration
        const mockBookings = [
          {
            id: 'BKG-001',
            bookingNumber: 'BKG-001',
            spaceName: 'Premium Covered Parking #12',
            spaceId: '1',
            propertyName: 'Downtown Plaza',
            location: '123 Main Street, City Center',
            startDate: new Date('2024-10-25T09:00:00'),
            endDate: new Date('2024-10-25T18:00:00'),
            duration: 9,
            totalAmount: 450,
            status: 'upcoming',
            vehicle: {
              make: 'Toyota',
              model: 'Camry',
              licensePlate: 'ABC-1234'
            },
            qrCode: 'QR-CODE-DATA-HERE',
            canExtend: true,
            canCancel: true
          },
          {
            id: 'BKG-002',
            bookingNumber: 'BKG-002',
            spaceName: 'Open Parking Lot #5',
            spaceId: '2',
            propertyName: 'Airport Parking Hub',
            location: '456 Airport Road',
            startDate: new Date('2024-10-24T08:00:00'),
            endDate: new Date('2024-10-24T20:00:00'),
            duration: 12,
            totalAmount: 600,
            status: 'active',
            vehicle: {
              make: 'Honda',
              model: 'Civic',
              licensePlate: 'XYZ-5678'
            },
            checkedInAt: new Date('2024-10-24T08:05:00'),
            qrCode: 'QR-CODE-DATA-HERE',
            canExtend: true,
            canCancel: false
          },
          {
            id: 'BKG-003',
            bookingNumber: 'BKG-003',
            spaceName: 'Garage Parking #A-23',
            spaceId: '3',
            propertyName: 'Shopping Mall Complex',
            location: '789 Commerce Blvd',
            startDate: new Date('2024-10-20T10:00:00'),
            endDate: new Date('2024-10-20T22:00:00'),
            duration: 12,
            totalAmount: 720,
            status: 'completed',
            vehicle: {
              make: 'Toyota',
              model: 'Camry',
              licensePlate: 'ABC-1234'
            },
            checkedInAt: new Date('2024-10-20T10:02:00'),
            checkedOutAt: new Date('2024-10-20T21:55:00'),
            canReview: true
          },
          {
            id: 'BKG-004',
            bookingNumber: 'BKG-004',
            spaceName: 'VIP Reserved Parking #1',
            spaceId: '4',
            propertyName: 'Business District Tower',
            location: '321 Corporate Ave',
            startDate: new Date('2024-10-15T07:00:00'),
            endDate: new Date('2024-10-15T19:00:00'),
            duration: 12,
            totalAmount: 900,
            status: 'cancelled',
            vehicle: {
              make: 'BMW',
              model: 'X5',
              licensePlate: 'LUX-9999'
            },
            cancelledAt: new Date('2024-10-14T15:30:00'),
            refundAmount: 850,
            refundStatus: 'processed'
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

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab;
    const matchesSearch =
      booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.spaceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Update tab counts
  const tabsWithCounts = tabs.map(tab => ({
    ...tab,
    count: tab.id === 'all'
      ? bookings.length
      : bookings.filter(b => b.status === tab.id).length
  }));

  // Get status badge color
  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800 border border-green-200',
      upcoming: 'bg-blue-100 text-blue-800 border border-blue-200',
      completed: 'bg-gray-100 text-gray-800 border border-gray-200',
      cancelled: 'bg-red-100 text-red-800 border border-red-200'
    };
    return badges[status] || badges.completed;
  };

  // Handle cancel booking
  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      // TODO: API call to cancel booking
      console.log('Cancelling booking:', bookingId);
      // Update local state
      setBookings(bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled', canCancel: false } : b
      ));
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  // Handle show QR code
  const handleShowQR = (booking) => {
    setSelectedBooking(booking);
    setShowQRModal(true);
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
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="mt-2 text-gray-600">
          Manage and track your parking space bookings
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by booking number, space, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabsWithCounts.map((tab) => (
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
              <span className={`
                ml-2 py-0.5 px-2 rounded-full text-xs
                ${activeTab === tab.id
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            <FaCalendarAlt className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bookings found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm
              ? 'No bookings match your search criteria'
              : activeTab === 'all'
                ? "You haven't made any bookings yet"
                : `You have no ${activeTab} bookings`
            }
          </p>
          {activeTab === 'all' && !searchTerm && (
            <Link
              to="/dashboard/search"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Find Parking Spaces
            </Link>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Booking Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.spaceName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Booking #{booking.bookingNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(booking.totalAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-start gap-2 text-sm">
                      <FaMapMarkerAlt className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-700">{booking.propertyName}</p>
                        <p className="text-gray-600">{booking.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      <FaClock className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">
                          {formatDate(booking.startDate, 'PPp')} - {formatDate(booking.endDate, 'p')}
                        </p>
                        <p className="text-gray-600">
                          Duration: {formatDuration(booking.duration)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                      <FaCar className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700">
                          {booking.vehicle.make} {booking.vehicle.model}
                        </p>
                        <p className="text-gray-600">{booking.vehicle.licensePlate}</p>
                      </div>
                    </div>

                    {booking.checkedInAt && (
                      <div className="flex items-start gap-2 text-sm">
                        <FaCalendarAlt className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-gray-700">
                            Checked in: {formatDate(booking.checkedInAt, 'p')}
                          </p>
                          {booking.checkedOutAt && (
                            <p className="text-gray-600">
                              Checked out: {formatDate(booking.checkedOutAt, 'p')}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/dashboard/bookings/${booking.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FaEye className="mr-1.5" /> View Details
                    </Link>

                    {booking.status === 'active' && (
                      <button
                        onClick={() => handleShowQR(booking)}
                        className="inline-flex items-center px-3 py-1.5 border border-primary-300 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100"
                      >
                        <FaQrcode className="mr-1.5" /> QR Code
                      </button>
                    )}

                    {booking.canExtend && (
                      <button
                        className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100"
                      >
                        <FaRedo className="mr-1.5" /> Extend
                      </button>
                    )}

                    {booking.canCancel && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100"
                      >
                        <FaTimes className="mr-1.5" /> Cancel
                      </button>
                    )}

                    {booking.canReview && (
                      <button
                        className="inline-flex items-center px-3 py-1.5 border border-yellow-300 rounded-lg text-sm font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
                      >
                        <FaStar className="mr-1.5" /> Write Review
                      </button>
                    )}

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(booking.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <FaDirections className="mr-1.5" /> Directions
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">Check-in QR Code</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="text-center mb-4">
              <div className="bg-gray-100 p-8 rounded-lg inline-block mb-4">
                {/* Placeholder QR Code - Replace with actual QR code library */}
                <div className="w-48 h-48 bg-white flex items-center justify-center border-2 border-gray-300">
                  <FaQrcode className="text-6xl text-gray-400" />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Show this QR code at the parking entrance
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Booking #{selectedBooking.bookingNumber}
              </p>
            </div>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
