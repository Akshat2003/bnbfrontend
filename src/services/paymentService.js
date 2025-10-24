import api from './api';

const paymentService = {
  // Get payment methods
  getPaymentMethods: async () => {
    try {
      const response = await api.get('/payment-methods');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch payment methods' };
    }
  },

  // Add payment method
  addPaymentMethod: async (paymentData) => {
    try {
      const response = await api.post('/payment-methods', paymentData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to add payment method' };
    }
  },

  // Delete payment method
  deletePaymentMethod: async (methodId) => {
    try {
      const response = await api.delete(`/payment-methods/${methodId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete payment method' };
    }
  },

  // Set default payment method
  setDefaultPaymentMethod: async (methodId) => {
    try {
      const response = await api.patch(`/payment-methods/${methodId}/default`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to set default payment method' };
    }
  },

  // Process payment for booking
  processPayment: async (bookingId, paymentData) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/payment`, paymentData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Payment failed' };
    }
  },

  // Get payment history
  getPaymentHistory: async (filters = {}) => {
    try {
      const response = await api.get('/payments', { params: filters });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch payment history' };
    }
  },

  // Get payment details
  getPaymentDetails: async (paymentId) => {
    try {
      const response = await api.get(`/payments/${paymentId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch payment details' };
    }
  },

  // Request refund
  requestRefund: async (paymentId, reason) => {
    try {
      const response = await api.post(`/payments/${paymentId}/refund`, { reason });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to request refund' };
    }
  },
};

export default paymentService;
