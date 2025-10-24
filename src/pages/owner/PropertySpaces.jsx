import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import {
  FaParking,
  FaPlus,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaCheckCircle,
  FaTimes,
  FaCar,
  FaDollarSign
} from 'react-icons/fa';

const PropertySpaces = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [formData, setFormData] = useState({
    spaceNumber: '',
    floor: '',
    section: '',
    size: 'standard',
    status: 'available',
    priceOverride: '',
    features: {
      covered: false,
      evCharging: false,
      handicapAccessible: false,
      extra_wide: false
    },
    notes: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockProperty = {
          id: propertyId,
          title: 'Downtown Garage - Premium Parking',
          address: '123 Main St, New York, NY 10001',
          totalSpaces: 50,
          basePrice: 15
        };

        const mockSpaces = [
          {
            id: 'space-1',
            spaceNumber: 'A-101',
            floor: '1',
            section: 'A',
            size: 'standard',
            status: 'available',
            priceOverride: null,
            features: { covered: true, evCharging: false, handicapAccessible: false, extra_wide: false },
            notes: '',
            currentBooking: null
          },
          {
            id: 'space-2',
            spaceNumber: 'A-102',
            floor: '1',
            section: 'A',
            size: 'large',
            status: 'occupied',
            priceOverride: 18,
            features: { covered: true, evCharging: true, handicapAccessible: false, extra_wide: true },
            notes: 'EV charging available',
            currentBooking: {
              user: 'John Smith',
              checkIn: new Date('2024-10-24T09:00:00'),
              checkOut: new Date('2024-10-24T18:00:00')
            }
          },
          {
            id: 'space-3',
            spaceNumber: 'A-103',
            floor: '1',
            section: 'A',
            size: 'standard',
            status: 'maintenance',
            priceOverride: null,
            features: { covered: true, evCharging: false, handicapAccessible: false, extra_wide: false },
            notes: 'Under maintenance - elevator repair',
            currentBooking: null
          },
          {
            id: 'space-4',
            spaceNumber: 'B-201',
            floor: '2',
            section: 'B',
            size: 'compact',
            status: 'available',
            priceOverride: 12,
            features: { covered: true, evCharging: false, handicapAccessible: false, extra_wide: false },
            notes: 'Compact cars only',
            currentBooking: null
          },
          {
            id: 'space-5',
            spaceNumber: 'H-001',
            floor: 'Ground',
            section: 'H',
            size: 'standard',
            status: 'available',
            priceOverride: null,
            features: { covered: false, evCharging: false, handicapAccessible: true, extra_wide: true },
            notes: 'Handicap accessible - closest to entrance',
            currentBooking: null
          }
        ];

        setProperty(mockProperty);
        setSpaces(mockSpaces);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyId]);

  const resetForm = () => {
    setFormData({
      spaceNumber: '',
      floor: '',
      section: '',
      size: 'standard',
      status: 'available',
      priceOverride: '',
      features: {
        covered: false,
        evCharging: false,
        handicapAccessible: false,
        extra_wide: false
      },
      notes: ''
    });
  };

  const handleAdd = () => {
    setShowAddModal(true);
    resetForm();
  };

  const handleEdit = (space) => {
    setSelectedSpace(space);
    setFormData({
      spaceNumber: space.spaceNumber,
      floor: space.floor,
      section: space.section,
      size: space.size,
      status: space.status,
      priceOverride: space.priceOverride || '',
      features: { ...space.features },
      notes: space.notes
    });
    setShowEditModal(true);
  };

  const handleDelete = (spaceId) => {
    if (window.confirm('Are you sure you want to delete this space?')) {
      // TODO: Implement actual API call
      setSpaces(prev => prev.filter(s => s.id !== spaceId));
    }
  };

  const handleSave = () => {
    const newSpace = {
      id: `space-${Date.now()}`,
      ...formData,
      priceOverride: formData.priceOverride ? parseFloat(formData.priceOverride) : null,
      currentBooking: null
    };

    // TODO: Implement actual API call
    setSpaces(prev => [...prev, newSpace]);
    setShowAddModal(false);
    resetForm();
  };

  const handleUpdate = () => {
    // TODO: Implement actual API call
    setSpaces(prev => prev.map(s =>
      s.id === selectedSpace.id
        ? {
            ...s,
            ...formData,
            priceOverride: formData.priceOverride ? parseFloat(formData.priceOverride) : null
          }
        : s
    ));
    setShowEditModal(false);
    setSelectedSpace(null);
    resetForm();
  };

  const toggleSpaceStatus = (spaceId, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'unavailable' : 'available';
    // TODO: Implement actual API call
    setSpaces(prev => prev.map(s =>
      s.id === spaceId ? { ...s, status: newStatus } : s
    ));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Available</span>;
      case 'occupied':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Occupied</span>;
      case 'maintenance':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Maintenance</span>;
      case 'unavailable':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Unavailable</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{status}</span>;
    }
  };

  const getSizeBadge = (size) => {
    const colors = {
      compact: 'bg-purple-100 text-purple-700',
      standard: 'bg-blue-100 text-blue-700',
      large: 'bg-orange-100 text-orange-700',
      oversized: 'bg-red-100 text-red-700'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[size] || 'bg-gray-100 text-gray-700'}`}>
        {size}
      </span>
    );
  };

  const stats = {
    total: spaces.length,
    available: spaces.filter(s => s.status === 'available').length,
    occupied: spaces.filter(s => s.status === 'occupied').length,
    maintenance: spaces.filter(s => s.status === 'maintenance').length
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
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => navigate('/owner/properties')}
            className="text-blue-600 hover:text-blue-700 text-sm mb-2"
          >
            ← Back to Properties
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{property?.title}</h1>
          <p className="text-gray-600 mt-1">{property?.address}</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add Space
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Spaces</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Available</p>
            <p className="text-2xl font-bold text-green-600">{stats.available}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Occupied</p>
            <p className="text-2xl font-bold text-blue-600">{stats.occupied}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Maintenance</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.maintenance}</p>
          </div>
        </Card>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <div className="p-12 text-center">
                <FaParking className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">No parking spaces added yet</p>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Your First Space
                </button>
              </div>
            </Card>
          </div>
        ) : (
          spaces.map((space) => (
            <Card key={space.id}>
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Space {space.spaceNumber}
                    </h3>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(space.status)}
                      {getSizeBadge(space.size)}
                    </div>
                  </div>
                  <FaParking className="w-8 h-8 text-blue-600" />
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Floor:</span>
                    <span className="font-medium text-gray-900">{space.floor}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Section:</span>
                    <span className="font-medium text-gray-900">{space.section}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-gray-900">
                      ${space.priceOverride || property?.basePrice}/hr
                    </span>
                  </div>
                </div>

                {/* Features */}
                {Object.values(space.features).some(v => v) && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Features</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(space.features)
                        .filter(([, value]) => value)
                        .map(([key]) => (
                          <span key={key} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                            {key.replace(/([A-Z])/g, ' $1').replace('_', ' ').trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Current Booking */}
                {space.currentBooking && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800 font-medium mb-1">Current Booking</p>
                    <p className="text-xs text-blue-700">{space.currentBooking.user}</p>
                    <p className="text-xs text-blue-600">
                      {space.currentBooking.checkIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                      {space.currentBooking.checkOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {space.notes && (
                  <p className="text-xs text-gray-600 mb-4 italic">{space.notes}</p>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(space)}
                    className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit
                  </button>
                  {space.status !== 'occupied' && (
                    <button
                      onClick={() => toggleSpaceStatus(space.id, space.status)}
                      className={`flex-1 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        space.status === 'available'
                          ? 'bg-red-50 text-red-700 hover:bg-red-100'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      {space.status === 'available' ? (
                        <>
                          <FaTimes className="w-4 h-4" />
                          Disable
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="w-4 h-4" />
                          Enable
                        </>
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(space.id)}
                    disabled={space.status === 'occupied'}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {showAddModal ? 'Add Parking Space' : 'Edit Parking Space'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setSelectedSpace(null);
                    resetForm();
                  }}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Space Number *
                    </label>
                    <input
                      type="text"
                      value={formData.spaceNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, spaceNumber: e.target.value }))}
                      placeholder="A-101"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Floor *
                    </label>
                    <input
                      type="text"
                      value={formData.floor}
                      onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
                      placeholder="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section
                    </label>
                    <input
                      type="text"
                      value={formData.section}
                      onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                      placeholder="A"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size *
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="compact">Compact</option>
                      <option value="standard">Standard</option>
                      <option value="large">Large</option>
                      <option value="oversized">Oversized</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="available">Available</option>
                      <option value="unavailable">Unavailable</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Override ($/hr)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.50"
                      value={formData.priceOverride}
                      onChange={(e) => setFormData(prev => ({ ...prev, priceOverride: e.target.value }))}
                      placeholder={`${property?.basePrice} (default)`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries({
                      covered: 'Covered',
                      evCharging: 'EV Charging',
                      handicapAccessible: 'Handicap Accessible',
                      extra_wide: 'Extra Wide'
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.features[key]}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            features: { ...prev.features, [key]: e.target.checked }
                          }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional information about this space..."
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setSelectedSpace(null);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={showAddModal ? handleSave : handleUpdate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showAddModal ? 'Add Space' : 'Update Space'}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PropertySpaces;
