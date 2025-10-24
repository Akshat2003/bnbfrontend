import api from './api';

const parkingSpaceService = {
  // Public: Search parking spaces
  searchSpaces: async (searchParams) => {
    try {
      const response = await api.get('/parking-spaces/search', { params: searchParams });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to search parking spaces' };
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
