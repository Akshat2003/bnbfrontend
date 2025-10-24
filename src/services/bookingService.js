import api from './api';

const bookingService = {
  // User: Create new booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create booking' };
    }
  },

  // User: Get user bookings
  getUserBookings: async (filters = {}) => {
    try {
      const response = await api.get('/bookings', { params: filters });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch bookings' };
    }
  },

  // User: Get booking details
  getBooking: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch booking' };
    }
  },

  // User: Cancel booking
  cancelBooking: async (bookingId, reason) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/cancel`, { reason });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to cancel booking' };
    }
  },

  // User: Extend booking
  extendBooking: async (bookingId, newCheckOut) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/extend`, { newCheckOut });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to extend booking' };
    }
  },

  // Owner: Get property bookings
  getPropertyBookings: async (propertyId, filters = {}) => {
    try {
      const response = await api.get(`/owner/properties/${propertyId}/bookings`, { params: filters });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch property bookings' };
    }
  },

  // Owner: Get all bookings
  getOwnerBookings: async (filters = {}) => {
    try {
      const response = await api.get('/owner/bookings', { params: filters });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch bookings' };
    }
  },

  // Owner: Accept/Reject booking (if manual approval required)
  updateBookingStatus: async (bookingId, status, reason = '') => {
    try {
      const response = await api.patch(`/owner/bookings/${bookingId}/status`, { status, reason });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update booking status' };
    }
  },

  // Get upcoming bookings
  getUpcomingBookings: async () => {
    try {
      const response = await api.get('/bookings/upcoming');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch upcoming bookings' };
    }
  },

  // Get active bookings
  getActiveBookings: async () => {
    try {
      const response = await api.get('/bookings/active');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch active bookings' };
    }
  },

  // Get booking history
  getBookingHistory: async (page = 1, limit = 10) => {
    try {
      const response = await api.get('/bookings/history', { params: { page, limit } });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch booking history' };
    }
  },
};

export default bookingService;
