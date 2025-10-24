import api, { handleApiError } from './api';

const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData);

      // Update local storage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, ...response.data.user }));

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Upload profile image
  uploadProfileImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await api.post('/users/profile/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update local storage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, profileImage: response.data.imageUrl }));

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Delete user account
  deleteAccount: async (password) => {
    try {
      const response = await api.delete('/users/profile', {
        data: { password },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Get user's vehicles
  getVehicles: async () => {
    try {
      const response = await api.get('/users/vehicles');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Add vehicle
  addVehicle: async (vehicleData) => {
    try {
      const response = await api.post('/users/vehicles', vehicleData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Update vehicle
  updateVehicle: async (vehicleId, vehicleData) => {
    try {
      const response = await api.put(`/users/vehicles/${vehicleId}`, vehicleData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Delete vehicle
  deleteVehicle: async (vehicleId) => {
    try {
      const response = await api.delete(`/users/vehicles/${vehicleId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Get payment methods
  getPaymentMethods: async () => {
    try {
      const response = await api.get('/users/payment-methods');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Add payment method
  addPaymentMethod: async (paymentData) => {
    try {
      const response = await api.post('/users/payment-methods', paymentData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Delete payment method
  deletePaymentMethod: async (paymentMethodId) => {
    try {
      const response = await api.delete(`/users/payment-methods/${paymentMethodId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Set default payment method
  setDefaultPaymentMethod: async (paymentMethodId) => {
    try {
      const response = await api.put(`/users/payment-methods/${paymentMethodId}/default`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },
};

export default userService;
