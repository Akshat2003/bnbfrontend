import api from './api';

const vehicleService = {
  // Get all user vehicles
  getVehicles: async () => {
    try {
      const response = await api.get('/vehicles');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch vehicles' };
    }
  },

  // Get single vehicle by ID
  getVehicle: async (vehicleId) => {
    try {
      const response = await api.get(`/vehicles/${vehicleId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch vehicle' };
    }
  },

  // Add new vehicle
  addVehicle: async (vehicleData) => {
    try {
      const response = await api.post('/vehicles', vehicleData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to add vehicle' };
    }
  },

  // Update vehicle
  updateVehicle: async (vehicleId, vehicleData) => {
    try {
      const response = await api.put(`/vehicles/${vehicleId}`, vehicleData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update vehicle' };
    }
  },

  // Delete vehicle
  deleteVehicle: async (vehicleId) => {
    try {
      const response = await api.delete(`/vehicles/${vehicleId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete vehicle' };
    }
  },

  // Set default vehicle
  setDefaultVehicle: async (vehicleId) => {
    try {
      const response = await api.patch(`/vehicles/${vehicleId}/default`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to set default vehicle' };
    }
  },
};

export default vehicleService;
