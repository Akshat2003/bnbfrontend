import api from './api';

const propertyService = {
  // Owner: Get all properties
  getProperties: async (filters = {}) => {
    try {
      const response = await api.get('/owner/properties', { params: filters });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch properties' };
    }
  },

  // Owner: Get single property
  getProperty: async (propertyId) => {
    try {
      const response = await api.get(`/owner/properties/${propertyId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch property' };
    }
  },

  // Owner: Create property
  createProperty: async (propertyData) => {
    try {
      const response = await api.post('/owner/properties', propertyData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create property' };
    }
  },

  // Owner: Update property
  updateProperty: async (propertyId, propertyData) => {
    try {
      const response = await api.put(`/owner/properties/${propertyId}`, propertyData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update property' };
    }
  },

  // Owner: Delete property
  deleteProperty: async (propertyId) => {
    try {
      const response = await api.delete(`/owner/properties/${propertyId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete property' };
    }
  },

  // Owner: Upload property images
  uploadPropertyImages: async (propertyId, files) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await api.post(`/owner/properties/${propertyId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to upload images' };
    }
  },

  // Owner: Delete property image
  deletePropertyImage: async (propertyId, imageId) => {
    try {
      const response = await api.delete(`/owner/properties/${propertyId}/images/${imageId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete image' };
    }
  },

  // Owner: Get property analytics
  getPropertyAnalytics: async (propertyId, period = '30days') => {
    try {
      const response = await api.get(`/owner/properties/${propertyId}/analytics`, {
        params: { period },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch analytics' };
    }
  },
};

export default propertyService;
