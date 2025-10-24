import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@components/common/molecules/Card';
import {
  FaParking,
  FaMapMarkerAlt,
  FaDollarSign,
  FaImage,
  FaClock,
  FaCheck,
  FaTimes,
  FaInfoCircle
} from 'react-icons/fa';

const AddProperty = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    type: 'garage',

    // Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    latitude: '',
    longitude: '',

    // Spaces & Pricing
    totalSpaces: 1,
    spaceSize: 'standard',
    pricePerHour: '',
    pricePerDay: '',
    pricePerWeek: '',
    pricePerMonth: '',

    // Features & Amenities
    features: {
      covered: false,
      outdoor: false,
      indoor: false,
      security: false,
      surveillance: false,
      lighting: false,
      evCharging: false,
      handicapAccessible: false,
      valetService: false,
      carWash: false,
      heightRestriction: false
    },
    maxVehicleHeight: '',

    // Availability
    availability: {
      monday: { enabled: true, from: '00:00', to: '23:59' },
      tuesday: { enabled: true, from: '00:00', to: '23:59' },
      wednesday: { enabled: true, from: '00:00', to: '23:59' },
      thursday: { enabled: true, from: '00:00', to: '23:59' },
      friday: { enabled: true, from: '00:00', to: '23:59' },
      saturday: { enabled: true, from: '00:00', to: '23:59' },
      sunday: { enabled: true, from: '00:00', to: '23:59' }
    },

    // Rules & Policies
    rules: '',
    cancellationPolicy: 'flexible',
    instantBooking: true,

    // Images (to be implemented with actual upload)
    images: []
  });

  const [errors, setErrors] = useState({});

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateNestedFormData = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
    }

    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    }

    if (step === 3) {
      if (!formData.totalSpaces || formData.totalSpaces < 1) newErrors.totalSpaces = 'At least 1 space required';
      if (!formData.pricePerHour || formData.pricePerHour < 1) newErrors.pricePerHour = 'Hourly price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    try {
      // TODO: Implement actual API call
      console.log('Submitting property:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to properties page
      navigate('/owner/properties');
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: FaParking },
    { number: 2, title: 'Location', icon: FaMapMarkerAlt },
    { number: 3, title: 'Pricing', icon: FaDollarSign },
    { number: 4, title: 'Features', icon: FaCheck },
    { number: 5, title: 'Review', icon: FaInfoCircle }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
        <p className="text-gray-600 mt-1">List your parking space and start earning</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? <FaCheck className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <p className={`text-sm mt-2 font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        currentStep > step.number ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Step Content */}
      <Card>
        <div className="p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="e.g., Downtown Garage - Premium Parking"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => updateFormData('type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="garage">Garage</option>
                  <option value="lot">Parking Lot</option>
                  <option value="street">Street Parking</option>
                  <option value="driveway">Driveway</option>
                  <option value="carport">Carport</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description * (minimum 50 characters)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Describe your parking space, location advantages, nearby landmarks..."
                  rows="6"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="flex items-center justify-between mt-1">
                  {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                  <p className="text-sm text-gray-500 ml-auto">{formData.description.length}/50</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Details</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  placeholder="123 Main Street"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.address && <p className="text-sm text-red-600 mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    placeholder="New York"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    placeholder="NY"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.state && <p className="text-sm text-red-600 mt-1">{errors.state}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData('zipCode', e.target.value)}
                    placeholder="10001"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.zipCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.zipCode && <p className="text-sm text-red-600 mt-1">{errors.zipCode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateFormData('country', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USA">United States</option>
                    <option value="CAN">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <FaInfoCircle className="inline w-4 h-4 mr-2" />
                  We'll use this address to show your property on the map and help users find it easily.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing & Spaces</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Number of Spaces *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalSpaces}
                  onChange={(e) => updateFormData('totalSpaces', parseInt(e.target.value) || 0)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.totalSpaces ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.totalSpaces && <p className="text-sm text-red-600 mt-1">{errors.totalSpaces}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Space Size
                </label>
                <select
                  value={formData.spaceSize}
                  onChange={(e) => updateFormData('spaceSize', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="compact">Compact</option>
                  <option value="standard">Standard</option>
                  <option value="large">Large (SUV/Truck)</option>
                  <option value="oversized">Oversized</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Hour * ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.50"
                    value={formData.pricePerHour}
                    onChange={(e) => updateFormData('pricePerHour', parseFloat(e.target.value) || '')}
                    placeholder="15.00"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.pricePerHour ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pricePerHour && <p className="text-sm text-red-600 mt-1">{errors.pricePerHour}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Day ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.pricePerDay}
                    onChange={(e) => updateFormData('pricePerDay', parseFloat(e.target.value) || '')}
                    placeholder="100.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Week ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.pricePerWeek}
                    onChange={(e) => updateFormData('pricePerWeek', parseFloat(e.target.value) || '')}
                    placeholder="600.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Month ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.pricePerMonth}
                    onChange={(e) => updateFormData('pricePerMonth', parseFloat(e.target.value) || '')}
                    placeholder="2000.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <FaInfoCircle className="inline w-4 h-4 mr-2" />
                  Platform fee: 15% will be deducted from your earnings. You'll receive 85% of the booking amount.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Features */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries({
                  covered: 'Covered Parking',
                  outdoor: 'Outdoor',
                  indoor: 'Indoor',
                  security: '24/7 Security',
                  surveillance: 'CCTV Surveillance',
                  lighting: 'Well Lit',
                  evCharging: 'EV Charging',
                  handicapAccessible: 'Handicap Accessible',
                  valetService: 'Valet Service',
                  carWash: 'Car Wash',
                  heightRestriction: 'Height Restriction'
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.features[key]}
                      onChange={(e) => updateNestedFormData('features', key, e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </label>
                ))}
              </div>

              {formData.features.heightRestriction && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Vehicle Height (feet)
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="15"
                    step="0.5"
                    value={formData.maxVehicleHeight}
                    onChange={(e) => updateFormData('maxVehicleHeight', e.target.value)}
                    placeholder="7.0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rules & Policies
                </label>
                <textarea
                  value={formData.rules}
                  onChange={(e) => updateFormData('rules', e.target.value)}
                  placeholder="e.g., No overnight parking, No RVs, etc."
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Policy
                </label>
                <select
                  value={formData.cancellationPolicy}
                  onChange={(e) => updateFormData('cancellationPolicy', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="flexible">Flexible (Full refund up to 24 hours before)</option>
                  <option value="moderate">Moderate (Full refund up to 5 days before)</option>
                  <option value="strict">Strict (50% refund up to 7 days before)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Enable Instant Booking</p>
                  <p className="text-sm text-gray-600">Guests can book without waiting for approval</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.instantBooking}
                    onChange={(e) => updateFormData('instantBooking', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Listing</h2>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Basic Information</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Title:</span> {formData.title}</p>
                    <p><span className="text-gray-600">Type:</span> {formData.type}</p>
                    <p><span className="text-gray-600">Description:</span> {formData.description}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Location</h3>
                  <div className="space-y-1 text-sm">
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                    <p>{formData.country}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Pricing</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Spaces:</span> {formData.totalSpaces}</p>
                    <p><span className="text-gray-600">Per Hour:</span> ${formData.pricePerHour}</p>
                    {formData.pricePerDay && <p><span className="text-gray-600">Per Day:</span> ${formData.pricePerDay}</p>}
                    {formData.pricePerWeek && <p><span className="text-gray-600">Per Week:</span> ${formData.pricePerWeek}</p>}
                    {formData.pricePerMonth && <p><span className="text-gray-600">Per Month:</span> ${formData.pricePerMonth}</p>}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(formData.features)
                      .filter(([, value]) => value)
                      .map(([key]) => (
                        <span key={key} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <FaInfoCircle className="inline w-4 h-4 mr-2" />
                    Your property will be submitted for admin review. You'll be notified once it's approved and live on the platform.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Navigation Buttons */}
      <Card>
        <div className="p-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/owner/properties')}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaCheck className="w-4 h-4" />
                Submit for Review
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddProperty;
