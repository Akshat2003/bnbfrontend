import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaMapMarkerAlt,
  FaParking,
  FaStar,
  FaToggleOn,
  FaToggleOff,
  FaThLarge,
  FaList
} from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatCurrency } from '@utils/formatters';
import { useAuth } from '@context/AuthContext';

const Properties = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await propertyService.getOwnerProperties(user.id);

        // Mock data
        const mockProperties = [
          {
            id: '1',
            name: 'Downtown Plaza Parking',
            address: '123 Main Street, Downtown',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
            totalSpaces: 5,
            availableSpaces: 2,
            activeBookings: 3,
            monthlyRevenue: 1240,
            averageRating: 4.8,
            totalReviews: 45,
            status: 'active',
            featured: true,
            images: []
          },
          {
            id: '2',
            name: 'Airport Hub Parking',
            address: '456 Airport Road',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94128',
            totalSpaces: 3,
            availableSpaces: 1,
            activeBookings: 2,
            monthlyRevenue: 890,
            averageRating: 4.6,
            totalReviews: 32,
            status: 'active',
            featured: false,
            images: []
          },
          {
            id: '3',
            name: 'Shopping Mall Complex',
            address: '789 Commerce Blvd',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94102',
            totalSpaces: 2,
            availableSpaces: 0,
            activeBookings: 2,
            monthlyRevenue: 670,
            averageRating: 4.5,
            totalReviews: 28,
            status: 'active',
            featured: false,
            images: []
          },
          {
            id: '4',
            name: 'Business District Tower',
            address: '321 Corporate Ave',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94111',
            totalSpaces: 1,
            availableSpaces: 1,
            activeBookings: 0,
            monthlyRevenue: 0,
            averageRating: 0,
            totalReviews: 0,
            status: 'draft',
            featured: false,
            images: []
          },
          {
            id: '5',
            name: 'Residential Area Parking',
            address: '555 Park Avenue',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94115',
            totalSpaces: 1,
            availableSpaces: 0,
            activeBookings: 1,
            monthlyRevenue: 440,
            averageRating: 4.9,
            totalReviews: 23,
            status: 'inactive',
            featured: false,
            images: []
          }
        ];

        setProperties(mockProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProperties();
    }
  }, [user]);

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch =
      searchTerm === '' ||
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || property.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Handle toggle property status
  const handleToggleStatus = async (propertyId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      // TODO: API call to update property status
      setProperties(properties.map(p =>
        p.id === propertyId ? { ...p, status: newStatus } : p
      ));
    } catch (error) {
      console.error('Error toggling property status:', error);
    }
  };

  // Handle delete property
  const handleDeleteProperty = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }

    try {
      // TODO: API call to delete property
      setProperties(properties.filter(p => p.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800 border border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border border-gray-200',
      draft: 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    };
    return badges[status] || badges.draft;
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
          <p className="mt-2 text-gray-600">
            Manage your parking properties and spaces
          </p>
        </div>
        <Link
          to="/owner/properties/add"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <FaPlus className="mr-2" />
          Add Property
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaThLarge size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaList size={20} />
            </button>
          </div>
        </div>
      </Card>

      {/* Properties List/Grid */}
      {filteredProperties.length === 0 ? (
        <Card className="text-center py-12">
          <FaParking className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No properties found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first property'}
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Link
              to="/owner/properties/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              <FaPlus className="mr-2" />
              Add Property
            </Link>
          )}
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              {/* Property Image */}
              <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-t-lg flex items-center justify-center mb-4 -mx-4 -mt-4">
                {property.images && property.images.length > 0 ? (
                  <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
                ) : (
                  <FaParking className="text-6xl text-white opacity-50" />
                )}
                {property.featured && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">
                    FEATURED
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {property.name}
                  </h3>
                  <div className="flex items-start gap-1 text-sm text-gray-600">
                    <FaMapMarkerAlt className="mt-0.5 flex-shrink-0" />
                    <span>{property.address}, {property.city}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Total Spaces</p>
                    <p className="text-lg font-semibold text-gray-900">{property.totalSpaces}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Available</p>
                    <p className="text-lg font-semibold text-green-600">{property.availableSpaces}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Monthly Revenue</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(property.monthlyRevenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Rating</p>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <p className="text-lg font-semibold text-gray-900">
                        {property.averageRating > 0 ? property.averageRating : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(property.status)}`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                  <span className="text-xs text-gray-600">
                    {property.totalReviews} reviews
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link
                    to={`/owner/properties/${property.id}`}
                    className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 text-center"
                  >
                    <FaEye className="inline mr-1" /> View
                  </Link>
                  <Link
                    to={`/owner/properties/${property.id}/edit`}
                    className="flex-1 px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 text-center"
                  >
                    <FaEdit className="inline mr-1" /> Edit
                  </Link>
                  <button
                    onClick={() => handleToggleStatus(property.id, property.status)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      property.status === 'active'
                        ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                        : 'text-green-700 bg-green-50 hover:bg-green-100'
                    }`}
                    title={property.status === 'active' ? 'Deactivate' : 'Activate'}
                  >
                    {property.status === 'active' ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Property Image */}
                <div className="w-full md:w-48 h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  {property.images && property.images.length > 0 ? (
                    <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <FaParking className="text-6xl text-white opacity-50" />
                  )}
                </div>

                {/* Property Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {property.name}
                      </h3>
                      <div className="flex items-start gap-1 text-sm text-gray-600">
                        <FaMapMarkerAlt className="mt-0.5 flex-shrink-0" />
                        <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(property.status)}`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Spaces</p>
                      <p className="text-lg font-semibold text-gray-900">{property.totalSpaces}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Available</p>
                      <p className="text-lg font-semibold text-green-600">{property.availableSpaces}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Active Bookings</p>
                      <p className="text-lg font-semibold text-blue-600">{property.activeBookings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Monthly Revenue</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatCurrency(property.monthlyRevenue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Rating</p>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <p className="text-lg font-semibold text-gray-900">
                          {property.averageRating > 0 ? `${property.averageRating} (${property.totalReviews})` : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/owner/properties/${property.id}`}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <FaEye className="inline mr-1" /> View Details
                    </Link>
                    <Link
                      to={`/owner/properties/${property.id}/edit`}
                      className="px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100"
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </Link>
                    <button
                      onClick={() => handleToggleStatus(property.id, property.status)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        property.status === 'active'
                          ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                          : 'text-green-700 bg-green-50 hover:bg-green-100'
                      }`}
                    >
                      {property.status === 'active' ? (
                        <><FaToggleOn className="inline mr-1" /> Deactivate</>
                      ) : (
                        <><FaToggleOff className="inline mr-1" /> Activate</>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                      <FaTrash className="inline mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Properties</p>
            <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Spaces</p>
            <p className="text-3xl font-bold text-gray-900">
              {properties.reduce((sum, p) => sum + p.totalSpaces, 0)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
            <p className="text-3xl font-bold text-blue-600">
              {properties.reduce((sum, p) => sum + p.activeBookings, 0)}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(properties.reduce((sum, p) => sum + p.monthlyRevenue, 0))}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Properties;
