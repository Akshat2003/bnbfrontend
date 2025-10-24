import { useState, useEffect } from 'react';
import { FaCar, FaPlus, FaEdit, FaTrash, FaStar, FaCheckCircle, FaClock } from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Modal from '@components/common/molecules/Modal';
import Input from '@components/common/atoms/Input';
import Select from '@components/common/atoms/Select';
import Spinner from '@components/common/atoms/Spinner';
import { useAuth } from '@context/AuthContext';

const MyVehicles = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    licensePlate: '',
    vehicleType: '',
    make: '',
    model: '',
    year: '',
    color: '',
    isElectric: false
  });
  const [errors, setErrors] = useState({});

  // Vehicle type options
  const vehicleTypes = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'truck', label: 'Truck' },
    { value: 'van', label: 'Van' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'bicycle', label: 'Bicycle' },
    { value: 'other', label: 'Other' }
  ];

  // Fetch vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await vehicleService.getUserVehicles(user.id);

        // Mock data
        const mockVehicles = [
          {
            id: '1',
            licensePlate: 'ABC-1234',
            vehicleType: 'sedan',
            make: 'Toyota',
            model: 'Camry',
            year: 2022,
            color: 'Silver',
            isElectric: false,
            isDefault: true,
            verificationStatus: 'verified',
            addedAt: new Date('2024-01-15')
          },
          {
            id: '2',
            licensePlate: 'XYZ-5678',
            vehicleType: 'suv',
            make: 'Honda',
            model: 'CR-V',
            year: 2023,
            color: 'Blue',
            isElectric: false,
            isDefault: false,
            verificationStatus: 'pending',
            addedAt: new Date('2024-08-10')
          },
          {
            id: '3',
            licensePlate: 'EV-9999',
            vehicleType: 'sedan',
            make: 'Tesla',
            model: 'Model 3',
            year: 2024,
            color: 'White',
            isElectric: true,
            isDefault: false,
            verificationStatus: 'verified',
            addedAt: new Date('2024-09-01')
          }
        ];

        setVehicles(mockVehicles);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchVehicles();
    }
  }, [user]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = 'License plate is required';
    }
    if (!formData.vehicleType) {
      newErrors.vehicleType = 'Vehicle type is required';
    }
    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Valid year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle add vehicle
  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setFormData({
      licensePlate: '',
      vehicleType: '',
      make: '',
      model: '',
      year: '',
      color: '',
      isElectric: false
    });
    setErrors({});
    setShowModal(true);
  };

  // Handle edit vehicle
  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      licensePlate: vehicle.licensePlate,
      vehicleType: vehicle.vehicleType,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color || '',
      isElectric: vehicle.isElectric
    });
    setErrors({});
    setShowModal(true);
  };

  // Handle save vehicle
  const handleSaveVehicle = async () => {
    if (!validateForm()) return;

    try {
      if (editingVehicle) {
        // TODO: API call to update vehicle
        setVehicles(vehicles.map(v =>
          v.id === editingVehicle.id ? { ...v, ...formData } : v
        ));
      } else {
        // TODO: API call to add vehicle
        const newVehicle = {
          id: Date.now().toString(),
          ...formData,
          isDefault: vehicles.length === 0,
          verificationStatus: 'pending',
          addedAt: new Date()
        };
        setVehicles([...vehicles, newVehicle]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  // Handle delete vehicle
  const handleDeleteVehicle = async (vehicleId) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      // TODO: API call to delete vehicle
      setVehicles(vehicles.filter(v => v.id !== vehicleId));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  // Handle set default vehicle
  const handleSetDefault = async (vehicleId) => {
    try {
      // TODO: API call to set default vehicle
      setVehicles(vehicles.map(v => ({
        ...v,
        isDefault: v.id === vehicleId
      })));
    } catch (error) {
      console.error('Error setting default vehicle:', error);
    }
  };

  // Get verification badge
  const getVerificationBadge = (status) => {
    const badges = {
      verified: {
        icon: <FaCheckCircle />,
        className: 'bg-green-100 text-green-800 border border-green-200',
        label: 'Verified'
      },
      pending: {
        icon: <FaClock />,
        className: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        label: 'Pending'
      },
      rejected: {
        icon: <FaClock />,
        className: 'bg-red-100 text-red-800 border border-red-200',
        label: 'Rejected'
      }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Vehicles</h1>
          <p className="mt-2 text-gray-600">
            Manage your vehicles for parking bookings
          </p>
        </div>
        <button
          onClick={handleAddVehicle}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <FaPlus className="mr-2" />
          Add Vehicle
        </button>
      </div>

      {/* Vehicles Grid */}
      {vehicles.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            <FaCar className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No vehicles added
          </h3>
          <p className="text-gray-600 mb-6">
            Add your first vehicle to start making bookings
          </p>
          <button
            onClick={handleAddVehicle}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <FaPlus className="mr-2" />
            Add Vehicle
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => {
            const badge = getVerificationBadge(vehicle.verificationStatus);
            return (
              <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  {/* Vehicle Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <FaCar className="text-2xl text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-sm text-gray-600">{vehicle.year}</p>
                      </div>
                    </div>
                    {vehicle.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        <FaStar className="mr-1" /> Default
                      </span>
                    )}
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">License Plate:</span>
                      <span className="font-medium text-gray-900">
                        {vehicle.licensePlate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900 capitalize">
                        {vehicle.vehicleType}
                      </span>
                    </div>
                    {vehicle.color && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Color:</span>
                        <span className="font-medium text-gray-900">
                          {vehicle.color}
                        </span>
                      </div>
                    )}
                    {vehicle.isElectric && (
                      <div className="flex items-center gap-1 text-green-600">
                        <span className="text-xs">⚡ Electric Vehicle</span>
                      </div>
                    )}
                  </div>

                  {/* Verification Status */}
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${badge.className}`}>
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-gray-200">
                    {!vehicle.isDefault && (
                      <button
                        onClick={() => handleSetDefault(vehicle.id)}
                        className="flex-1 px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleEditVehicle(vehicle)}
                      className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add/Edit Vehicle Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
      >
        <div className="space-y-4">
          <Input
            label="License Plate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleInputChange}
            error={errors.licensePlate}
            placeholder="ABC-1234"
            required
          />

          <Select
            label="Vehicle Type"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
            error={errors.vehicleType}
            required
          >
            <option value="">Select vehicle type</option>
            {vehicleTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Make"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              error={errors.make}
              placeholder="Toyota"
              required
            />

            <Input
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              error={errors.model}
              placeholder="Camry"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleInputChange}
              error={errors.year}
              placeholder="2024"
              min="1900"
              max={new Date().getFullYear() + 1}
              required
            />

            <Input
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              placeholder="Silver"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isElectric"
              name="isElectric"
              checked={formData.isElectric}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isElectric" className="ml-2 block text-sm text-gray-900">
              This is an electric vehicle
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveVehicle}
              className="flex-1 px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyVehicles;
