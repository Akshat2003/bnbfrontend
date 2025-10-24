import api from './api';

// Mock data for development
const mockSpaces = [
  {
    id: 1,
    title: 'Modern Covered Garage',
    address: '123 Main St',
    city: 'San Francisco',
    distance: 0.5,
    price: 8,
    priceUnit: 'hour',
    rating: 4.8,
    reviewCount: 45,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3EGarage%3C/text%3E%3C/svg%3E',
    availability: 'available',
    features: ['covered', 'security', '24/7'],
    propertyType: 'residential',
    spaceType: 'garage',
  },
  {
    id: 2,
    title: 'Downtown Parking Lot',
    address: '456 Market St',
    city: 'San Francisco',
    distance: 1.2,
    price: 12,
    priceUnit: 'hour',
    rating: 4.5,
    reviewCount: 32,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23dbeafe"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%233b82f6"%3EParking Lot%3C/text%3E%3C/svg%3E',
    availability: 'available',
    features: ['ev_charging', 'security'],
    propertyType: 'commercial',
    spaceType: 'parking_lot',
  },
  {
    id: 3,
    title: 'Convenient Driveway',
    address: '789 Oak Ave',
    city: 'San Francisco',
    distance: 0.8,
    price: 5,
    priceUnit: 'hour',
    rating: 4.9,
    reviewCount: 78,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23dcfce7"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%2316a34a"%3EDriveway%3C/text%3E%3C/svg%3E',
    availability: 'limited',
    features: ['covered'],
    propertyType: 'residential',
    spaceType: 'driveway',
  },
  {
    id: 4,
    title: 'Secure Underground Parking',
    address: '321 Pine St',
    city: 'San Francisco',
    distance: 0.3,
    price: 15,
    priceUnit: 'hour',
    rating: 4.7,
    reviewCount: 56,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23fee2e2"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23ef4444"%3EUnderground%3C/text%3E%3C/svg%3E',
    availability: 'available',
    features: ['covered', 'security', 'ev_charging', '24/7'],
    propertyType: 'commercial',
    spaceType: 'garage',
  },
  {
    id: 5,
    title: 'Street Parking Spot',
    address: '555 Broadway',
    city: 'San Francisco',
    distance: 1.5,
    price: 3,
    priceUnit: 'hour',
    rating: 4.2,
    reviewCount: 23,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23fef3c7"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23f59e0b"%3EStreet%3C/text%3E%3C/svg%3E',
    availability: 'available',
    features: [],
    propertyType: 'public',
    spaceType: 'street',
  },
  {
    id: 6,
    title: 'Airport Parking Facility',
    address: '100 Airport Blvd',
    city: 'San Francisco',
    distance: 5.2,
    price: 20,
    priceUnit: 'day',
    rating: 4.6,
    reviewCount: 142,
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e0e7ff"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%236366f1"%3EAirport%3C/text%3E%3C/svg%3E',
    availability: 'available',
    features: ['covered', 'security', '24/7', 'shuttle'],
    propertyType: 'commercial',
    spaceType: 'parking_lot',
  },
];

const parkingSpaceService = {
  // Public: Search parking spaces
  searchSpaces: async (searchParams) => {
    try {
      const response = await api.get('/parking-spaces/search', { params: searchParams });
      return { success: true, data: response.data };
    } catch (error) {
      // Return mock data when API is not available
      console.log('Using mock data - backend not available');
      return {
        success: true,
        data: {
          spaces: mockSpaces,
          total: mockSpaces.length,
          page: 1,
          limit: 12
        }
      };
    }
  },

  // Public: Get space details
  getSpace: async (spaceId) => {
    try {
      const response = await api.get(`/parking-spaces/${spaceId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch space details' };
    }
  },

  // Public: Check availability
  checkAvailability: async (spaceId, checkIn, checkOut) => {
    try {
      const response = await api.post(`/parking-spaces/${spaceId}/check-availability`, {
        checkIn,
        checkOut,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to check availability' };
    }
  },

  // Owner: Get spaces for a property
  getPropertySpaces: async (propertyId) => {
    try {
      const response = await api.get(`/owner/properties/${propertyId}/spaces`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch spaces' };
    }
  },

  // Owner: Create parking space
  createSpace: async (propertyId, spaceData) => {
    try {
      const response = await api.post(`/owner/properties/${propertyId}/spaces`, spaceData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create parking space' };
    }
  },

  // Owner: Update parking space
  updateSpace: async (spaceId, spaceData) => {
    try {
      const response = await api.put(`/owner/spaces/${spaceId}`, spaceData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update parking space' };
    }
  },

  // Owner: Delete parking space
  deleteSpace: async (spaceId) => {
    try {
      const response = await api.delete(`/owner/spaces/${spaceId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete parking space' };
    }
  },

  // Owner: Update space availability
  updateAvailability: async (spaceId, availabilityData) => {
    try {
      const response = await api.patch(`/owner/spaces/${spaceId}/availability`, availabilityData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update availability' };
    }
  },

  // Owner: Get space analytics
  getSpaceAnalytics: async (spaceId, period = '30days') => {
    try {
      const response = await api.get(`/owner/spaces/${spaceId}/analytics`, {
        params: { period },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch analytics' };
    }
  },
};

export default parkingSpaceService;
