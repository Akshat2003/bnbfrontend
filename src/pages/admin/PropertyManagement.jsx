import { useState, useEffect } from 'react';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatDate, formatCurrency } from '@utils/formatters';
import {
  FaSearch,
  FaParking,
  FaMapMarkerAlt,
  FaStar,
  FaCheckCircle,
  FaTimes,
  FaEdit,
  FaTrash,
  FaEye,
  FaClock,
  FaExclamationTriangle,
  FaBan,
  FaImage,
  FaCalendarAlt,
  FaDollarSign
} from 'react-icons/fa';

const PropertyManagement = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockProperties = [
          {
            id: 'prop1',
            title: 'Downtown Garage - Premium Parking',
            owner: {
              id: 'owner1',
              name: 'Sarah Johnson',
              email: 'sarah.j@example.com'
            },
            address: '123 Main St, New York, NY 10001',
            type: 'garage',
            spaces: 50,
            availableSpaces: 35,
            pricePerHour: 15,
            rating: 4.8,
            reviews: 145,
            status: 'active',
            featured: true,
            images: 8,
            amenities: ['Covered', 'Security', '24/7 Access', 'EV Charging'],
            stats: {
              totalBookings: 1250,
              revenue: 187500,
              occupancyRate: 85
            },
            createdAt: new Date('2023-06-15T10:00:00'),
            lastUpdated: new Date('2024-10-20T14:30:00')
          },
          {
            id: 'prop2',
            title: 'Airport Parking - Long-term',
            owner: {
              id: 'owner2',
              name: 'Michael Davis',
              email: 'mdavis@example.com'
            },
            address: '456 Airport Rd, Los Angeles, CA 90045',
            type: 'lot',
            spaces: 200,
            availableSpaces: 120,
            pricePerHour: 8,
            rating: 4.5,
            reviews: 89,
            status: 'pending',
            featured: false,
            images: 5,
            amenities: ['Shuttle Service', 'Security', 'Covered'],
            stats: {
              totalBookings: 0,
              revenue: 0,
              occupancyRate: 0
            },
            createdAt: new Date('2024-10-15T09:00:00'),
            lastUpdated: new Date('2024-10-15T09:00:00')
          },
          {
            id: 'prop3',
            title: 'City Center Plaza Parking',
            owner: {
              id: 'owner1',
              name: 'Sarah Johnson',
              email: 'sarah.j@example.com'
            },
            address: '789 Center Ave, Chicago, IL 60601',
            type: 'garage',
            spaces: 75,
            availableSpaces: 60,
            pricePerHour: 12,
            rating: 4.6,
            reviews: 67,
            status: 'active',
            featured: false,
            images: 6,
            amenities: ['Covered', 'Security', 'Valet'],
            stats: {
              totalBookings: 456,
              revenue: 54720,
              occupancyRate: 72
            },
            createdAt: new Date('2023-11-10T11:30:00'),
            lastUpdated: new Date('2024-10-18T16:20:00')
          },
          {
            id: 'prop4',
            title: 'Beach Front Parking',
            owner: {
              id: 'owner3',
              name: 'Emma Wilson',
              email: 'emma.w@example.com'
            },
            address: '321 Beach Blvd, Miami, FL 33139',
            type: 'lot',
            spaces: 30,
            availableSpaces: 0,
            pricePerHour: 10,
            rating: 4.2,
            reviews: 34,
            status: 'suspended',
            featured: false,
            images: 4,
            amenities: ['Outdoor', 'Beach Access'],
            stats: {
              totalBookings: 234,
              revenue: 23400,
              occupancyRate: 0
            },
            createdAt: new Date('2024-03-20T13:45:00'),
            lastUpdated: new Date('2024-09-10T10:00:00')
          },
          {
            id: 'prop5',
            title: 'Stadium Event Parking',
            owner: {
              id: 'owner4',
              name: 'James Brown',
              email: 'jbrown@example.com'
            },
            address: '555 Stadium Way, Dallas, TX 75201',
            type: 'lot',
            spaces: 150,
            availableSpaces: 150,
            pricePerHour: 20,
            rating: 0,
            reviews: 0,
            status: 'inactive',
            featured: false,
            images: 3,
            amenities: ['Event Parking', 'Security'],
            stats: {
              totalBookings: 0,
              revenue: 0,
              occupancyRate: 0
            },
            createdAt: new Date('2024-09-01T08:00:00'),
            lastUpdated: new Date('2024-09-01T08:00:00')
          }
        ];

        setProperties(mockProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.owner.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesType = typeFilter === 'all' || property.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalStats = {
    all: properties.length,
    active: properties.filter(p => p.status === 'active').length,
    pending: properties.filter(p => p.status === 'pending').length,
    suspended: properties.filter(p => p.status === 'suspended').length,
    totalSpaces: properties.reduce((sum, p) => sum + p.spaces, 0),
    totalRevenue: properties.reduce((sum, p) => sum + p.stats.revenue, 0)
  };

  const handleAction = (property, action) => {
    setSelectedProperty(property);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    // TODO: Implement actual API call
    console.log(`Performing ${actionType} on property:`, selectedProperty.id);

    if (actionType === 'approve') {
      setProperties(prev => prev.map(p =>
        p.id === selectedProperty.id ? { ...p, status: 'active' } : p
      ));
    } else if (actionType === 'reject') {
      setProperties(prev => prev.map(p =>
        p.id === selectedProperty.id ? { ...p, status: 'inactive' } : p
      ));
    } else if (actionType === 'suspend') {
      setProperties(prev => prev.map(p =>
        p.id === selectedProperty.id ? { ...p, status: 'suspended' } : p
      ));
    } else if (actionType === 'activate') {
      setProperties(prev => prev.map(p =>
        p.id === selectedProperty.id ? { ...p, status: 'active' } : p
      ));
    } else if (actionType === 'delete') {
      setProperties(prev => prev.filter(p => p.id !== selectedProperty.id));
    }

    setShowActionModal(false);
    setSelectedProperty(null);
    setActionType(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Active</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Pending Approval</span>;
      case 'suspended':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Suspended</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">Inactive</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{status}</span>;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'garage':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Garage</span>;
      case 'lot':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">Parking Lot</span>;
      case 'street':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Street</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{type}</span>;
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
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <p className="text-gray-600 mt-1">Manage and moderate parking properties</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Export Properties
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">{totalStats.all}</p>
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
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{totalStats.pending}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Suspended</p>
            <p className="text-2xl font-bold text-red-600">{totalStats.suspended}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Spaces</p>
            <p className="text-2xl font-bold text-blue-600">{totalStats.totalSpaces}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="garage">Garage</option>
              <option value="lot">Parking Lot</option>
              <option value="street">Street Parking</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProperties.length === 0 ? (
          <div className="col-span-2">
            <Card>
              <div className="p-12 text-center text-gray-500">
                No properties found
              </div>
            </Card>
          </div>
        ) : (
          filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                      {property.featured && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      <span>{property.address}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Owner: <span className="font-medium">{property.owner.name}</span>
                    </p>
                  </div>
                  {getStatusBadge(property.status)}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Type</p>
                    {getTypeBadge(property.type)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Spaces</p>
                    <p className="text-sm font-medium text-gray-900">
                      {property.availableSpaces}/{property.spaces}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Price/hr</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(property.pricePerHour)}
                    </p>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <FaStar className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-700">
                      {property.rating > 0 ? `${property.rating} (${property.reviews})` : 'No reviews'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaImage className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{property.images} images</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{property.stats.totalBookings} bookings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{formatCurrency(property.stats.revenue)}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b">
                  <span>Created: {formatDate(property.createdAt, 'short')}</span>
                  <span>Updated: {formatDate(property.lastUpdated, 'short')}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // TODO: Open property details modal
                      console.log('View property:', property.id);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEye className="w-4 h-4" />
                    View
                  </button>

                  {property.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleAction(property, 'approve')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(property, 'reject')}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FaTimes className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}

                  {property.status === 'active' && (
                    <button
                      onClick={() => handleAction(property, 'suspend')}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaBan className="w-4 h-4" />
                      Suspend
                    </button>
                  )}

                  {property.status === 'suspended' && (
                    <button
                      onClick={() => handleAction(property, 'activate')}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle className="w-4 h-4" />
                      Activate
                    </button>
                  )}

                  <button
                    onClick={() => handleAction(property, 'delete')}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <FaExclamationTriangle className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm {actionType?.charAt(0).toUpperCase() + actionType?.slice(1)}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {actionType} <strong>{selectedProperty?.title}</strong>?
                {actionType === 'delete' && ' This action cannot be undone.'}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowActionModal(false);
                    setSelectedProperty(null);
                    setActionType(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;
