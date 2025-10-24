import { useState, useEffect } from 'react';
import {
  FaCreditCard,
  FaPlus,
  FaTrash,
  FaStar,
  FaCheckCircle,
  FaLock,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover
} from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Modal from '@components/common/molecules/Modal';
import Input from '@components/common/atoms/Input';
import Select from '@components/common/atoms/Select';
import Spinner from '@components/common/atoms/Spinner';
import { useAuth } from '@context/AuthContext';

const PaymentMethods = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingZip: ''
  });
  const [errors, setErrors] = useState({});

  // Fetch payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await paymentService.getUserPaymentMethods(user.id);

        // Mock data
        const mockMethods = [
          {
            id: '1',
            type: 'visa',
            lastFour: '4242',
            cardHolderName: 'John Doe',
            expiryMonth: '12',
            expiryYear: '2025',
            isDefault: true,
            addedAt: new Date('2024-01-15')
          },
          {
            id: '2',
            type: 'mastercard',
            lastFour: '5555',
            cardHolderName: 'John Doe',
            expiryMonth: '08',
            expiryYear: '2026',
            isDefault: false,
            addedAt: new Date('2024-06-20')
          }
        ];

        setPaymentMethods(mockMethods);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPaymentMethods();
    }
  }, [user]);

  // Get card icon
  const getCardIcon = (type) => {
    const icons = {
      visa: <FaCcVisa className="text-4xl text-blue-600" />,
      mastercard: <FaCcMastercard className="text-4xl text-red-600" />,
      amex: <FaCcAmex className="text-4xl text-blue-800" />,
      discover: <FaCcDiscover className="text-4xl text-orange-600" />
    };
    return icons[type] || <FaCreditCard className="text-4xl text-gray-600" />;
  };

  // Format card number input
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Detect card type
  const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'visa';
    if (cleaned.startsWith('5')) return 'mastercard';
    if (cleaned.startsWith('3')) return 'amex';
    if (cleaned.startsWith('6')) return 'discover';
    return 'unknown';
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formatted = formatCardNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'cvv') {
      const cvv = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: cvv }));
    } else if (name === 'expiryMonth' || name === 'expiryYear') {
      const num = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: num }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Card number validation (basic)
    const cardNumber = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
    }

    const month = parseInt(formData.expiryMonth);
    if (!month || month < 1 || month > 12) {
      newErrors.expiryMonth = 'Invalid month';
    }

    const year = parseInt(formData.expiryYear);
    const currentYear = new Date().getFullYear();
    if (!year || year < currentYear || year > currentYear + 20) {
      newErrors.expiryYear = 'Invalid year';
    }

    // Check if card is expired
    if (month && year) {
      const expiry = new Date(year, month - 1);
      const now = new Date();
      if (expiry < now) {
        newErrors.expiryMonth = 'Card is expired';
      }
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'CVV is required (3-4 digits)';
    }

    if (!formData.billingZip.trim()) {
      newErrors.billingZip = 'Billing ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle add payment method
  const handleAddPaymentMethod = () => {
    setFormData({
      cardNumber: '',
      cardHolderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      billingZip: ''
    });
    setErrors({});
    setShowModal(true);
  };

  // Handle save payment method
  const handleSavePaymentMethod = async () => {
    if (!validateForm()) return;

    try {
      // TODO: API call to tokenize and save card (use Stripe/payment gateway)
      // In production, never send raw card data to your server
      // Use Stripe Elements or similar to tokenize

      const cardNumber = formData.cardNumber.replace(/\s/g, '');
      const cardType = detectCardType(cardNumber);

      const newMethod = {
        id: Date.now().toString(),
        type: cardType,
        lastFour: cardNumber.slice(-4),
        cardHolderName: formData.cardHolderName,
        expiryMonth: formData.expiryMonth.padStart(2, '0'),
        expiryYear: formData.expiryYear,
        isDefault: paymentMethods.length === 0,
        addedAt: new Date()
      };

      setPaymentMethods([...paymentMethods, newMethod]);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving payment method:', error);
    }
  };

  // Handle delete payment method
  const handleDeletePaymentMethod = async (methodId) => {
    if (!confirm('Are you sure you want to remove this payment method?')) return;

    try {
      // TODO: API call to delete payment method
      setPaymentMethods(paymentMethods.filter(m => m.id !== methodId));
    } catch (error) {
      console.error('Error deleting payment method:', error);
    }
  };

  // Handle set default
  const handleSetDefault = async (methodId) => {
    try {
      // TODO: API call to set default payment method
      setPaymentMethods(paymentMethods.map(m => ({
        ...m,
        isDefault: m.id === methodId
      })));
    } catch (error) {
      console.error('Error setting default payment method:', error);
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
          <p className="mt-2 text-gray-600">
            Manage your payment methods for quick and easy bookings
          </p>
        </div>
        <button
          onClick={handleAddPaymentMethod}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          <FaPlus className="mr-2" />
          Add Payment Method
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <FaLock className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-900">Your payment information is secure</p>
            <p className="text-blue-700 mt-1">
              We use industry-standard encryption to protect your payment details. Your card information is tokenized and stored securely.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods List */}
      {paymentMethods.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            <FaCreditCard className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No payment methods added
          </h3>
          <p className="text-gray-600 mb-6">
            Add a payment method to make bookings faster and easier
          </p>
          <button
            onClick={handleAddPaymentMethod}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <FaPlus className="mr-2" />
            Add Payment Method
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getCardIcon(method.type)}
                    <div>
                      <p className="text-sm text-gray-600 capitalize">{method.type} Card</p>
                      <p className="text-lg font-semibold text-gray-900">
                        •••• •••• •••• {method.lastFour}
                      </p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      <FaStar className="mr-1" /> Default
                    </span>
                  )}
                </div>

                {/* Card Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card Holder:</span>
                    <span className="font-medium text-gray-900">
                      {method.cardHolderName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expires:</span>
                    <span className="font-medium text-gray-900">
                      {method.expiryMonth}/{method.expiryYear}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <FaCheckCircle />
                    <span className="text-xs">Verified</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-200">
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="flex-1 px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDeletePaymentMethod(method.id)}
                    className="px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Payment Method Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add Payment Method"
      >
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <FaLock className="inline mr-1" />
              Your card information is encrypted and securely stored. We never store your CVV.
            </p>
          </div>

          <Input
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />

          <Input
            label="Card Holder Name"
            name="cardHolderName"
            value={formData.cardHolderName}
            onChange={handleInputChange}
            error={errors.cardHolderName}
            placeholder="John Doe"
            required
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Month"
              name="expiryMonth"
              value={formData.expiryMonth}
              onChange={handleInputChange}
              error={errors.expiryMonth}
              placeholder="MM"
              maxLength={2}
              required
            />

            <Input
              label="Year"
              name="expiryYear"
              value={formData.expiryYear}
              onChange={handleInputChange}
              error={errors.expiryYear}
              placeholder="YYYY"
              maxLength={4}
              required
            />

            <Input
              label="CVV"
              name="cvv"
              type="password"
              value={formData.cvv}
              onChange={handleInputChange}
              error={errors.cvv}
              placeholder="123"
              maxLength={4}
              required
            />
          </div>

          <Input
            label="Billing ZIP Code"
            name="billingZip"
            value={formData.billingZip}
            onChange={handleInputChange}
            error={errors.billingZip}
            placeholder="12345"
            required
          />

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePaymentMethod}
              className="flex-1 px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Add Card
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentMethods;
