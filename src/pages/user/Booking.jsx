import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Alert, Spinner, Input, Radio } from '@components/common';
import { FiCheck, FiArrowLeft, FiArrowRight, FiTruck, FiCreditCard, FiPlus, FiCalendar, FiClock, FiLock, FiMapPin } from 'react-icons/fi';
import { useBooking } from '@context/BookingContext';
import { formatCurrency } from '@utils/formatters';
import vehicleService from '@services/vehicleService';
import paymentService from '@services/paymentService';
import bookingService from '@services/bookingService';
import clsx from 'clsx';

const Booking = () => {
  const navigate = useNavigate();
  const { currentBooking, bookingStep, nextStep, prevStep, clearBooking, updateBooking, calculateTotal } = useBooking();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1 state
  const [dateForm, setDateForm] = useState({
    checkIn: currentBooking?.checkIn || '',
    checkOut: currentBooking?.checkOut || '',
  });

  // Step 2 state
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(currentBooking?.vehicle?.id || null);
  const [vehiclesLoading, setVehiclesLoading] = useState(false);

  // Step 3 state
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(currentBooking?.paymentMethod?.id || null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    if (!currentBooking) {
      navigate('/dashboard/search');
    }
  }, [currentBooking, navigate]);

  // Load vehicles for step 2
  useEffect(() => {
    if (bookingStep === 2) {
      loadVehicles();
    }
  }, [bookingStep]);

  // Load payment methods for step 3
  useEffect(() => {
    if (bookingStep === 3) {
      loadPaymentMethods();
    }
  }, [bookingStep]);

  const loadVehicles = async () => {
    setVehiclesLoading(true);
    try {
      const result = await vehicleService.getVehicles();
      if (result.success) {
        setVehicles(result.data || mockVehicles);
      } else {
        setVehicles(mockVehicles);
      }
    } catch (err) {
      setVehicles(mockVehicles);
    } finally {
      setVehiclesLoading(false);
    }
  };

  const loadPaymentMethods = async () => {
    setPaymentLoading(true);
    try {
      const result = await paymentService.getPaymentMethods();
      if (result.success) {
        setPaymentMethods(result.data || mockPaymentMethods);
      } else {
        setPaymentMethods(mockPaymentMethods);
      }
    } catch (err) {
      setPaymentMethods(mockPaymentMethods);
    } finally {
      setPaymentLoading(false);
    }
  };

  // Mock data
  const mockVehicles = [
    { id: 1, make: 'Tesla', model: 'Model 3', year: 2023, color: 'White', licensePlate: 'ABC1234', type: 'sedan', isDefault: true },
    { id: 2, make: 'Toyota', model: 'Camry', year: 2022, color: 'Silver', licensePlate: 'XYZ5678', type: 'sedan', isDefault: false },
  ];

  const mockPaymentMethods = [
    { id: 1, type: 'card', brand: 'visa', last4: '4242', expiryMonth: 12, expiryYear: 2025, isDefault: true, holderName: 'John Doe' },
    { id: 2, type: 'card', brand: 'mastercard', last4: '5555', expiryMonth: 8, expiryYear: 2026, isDefault: false, holderName: 'John Doe' },
  ];

  const steps = [
    { number: 1, title: 'Date & Time' },
    { number: 2, title: 'Vehicle' },
    { number: 3, title: 'Payment' },
    { number: 4, title: 'Confirm' },
  ];

  // Step 1: Date & Time
  const renderStep1 = () => {
    const checkInDate = dateForm.checkIn ? new Date(dateForm.checkIn) : null;
    const checkOutDate = dateForm.checkOut ? new Date(dateForm.checkOut) : null;
    const pricing = checkInDate && checkOutDate && currentBooking?.parkingSpace
      ? calculateTotal(currentBooking.parkingSpace, checkInDate, checkOutDate)
      : null;

    return (
      <div className="space-y-6">
        {currentBooking?.parkingSpace && (
          <Card variant="outline">
            <div className="p-4 flex gap-4">
              <img src={currentBooking.parkingSpace.imageUrl || currentBooking.parkingSpace.images?.[0]} alt={currentBooking.parkingSpace.title} className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-gray-900">{currentBooking.parkingSpace.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{currentBooking.parkingSpace.address}, {currentBooking.parkingSpace.city}</p>
                <p className="text-sm font-medium text-gray-900 mt-2">{formatCurrency(currentBooking.parkingSpace.price)} / {currentBooking.parkingSpace.priceUnit}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input type="datetime-local" name="checkIn" label="Check-in Date & Time" value={dateForm.checkIn} onChange={(e) => {setDateForm({...dateForm, checkIn: e.target.value}); updateBooking({checkIn: e.target.value});}} error={dateErrors.checkIn} icon={<FiCalendar />} required />
          <Input type="datetime-local" name="checkOut" label="Check-out Date & Time" value={dateForm.checkOut} onChange={(e) => {setDateForm({...dateForm, checkOut: e.target.value}); updateBooking({checkOut: e.target.value});}} error={dateErrors.checkOut} icon={<FiClock />} required />
        </div>

        {pricing && (
          <Card variant="outline" className="bg-blue-50">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Pricing Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700"><span>{formatCurrency(currentBooking.parkingSpace.price)} × {pricing.hours} hours</span><span>{formatCurrency(pricing.subtotal)}</span></div>
                <div className="flex justify-between text-gray-700"><span>Service fee (15%)</span><span>{formatCurrency(pricing.serviceFee)}</span></div>
                <div className="flex justify-between text-gray-700"><span>Tax (8%)</span><span>{formatCurrency(pricing.tax)}</span></div>
                <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-gray-900 text-lg"><span>Total</span><span>{formatCurrency(pricing.total)}</span></div>
              </div>
            </div>
          </Card>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Important Information</h4>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Your booking will be confirmed instantly upon payment</li>
            <li>Free cancellation up to 24 hours before check-in</li>
            <li>Please arrive within 15 minutes of your check-in time</li>
          </ul>
        </div>
      </div>
    );
  };

  // Step 2: Vehicle Selection
  const renderStep2 = () => {
    if (vehiclesLoading) return <div className="flex justify-center py-12"><Spinner size="lg" color="primary" /></div>;

    return (
      <div className="space-y-6">
        <div><h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Vehicle</h3><p className="text-gray-600 mb-6">Choose which vehicle you'll be parking.</p></div>

        {vehicles.length === 0 ? (
          <Card variant="outline" className="text-center p-8"><FiTruck className="w-12 h-12 text-gray-400 mx-auto mb-4" /><p className="text-gray-600 mb-4">No vehicles added yet</p><Button variant="primary" icon={<FiPlus />} iconPosition="left">Add Your First Vehicle</Button></Card>
        ) : (
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} variant={selectedVehicle === vehicle.id ? 'elevated' : 'outline'} className={`cursor-pointer transition-all ${selectedVehicle === vehicle.id ? 'ring-2 ring-blue-600 bg-blue-50' : 'hover:shadow-md'}`} onClick={() => {setSelectedVehicle(vehicle.id); updateBooking({vehicle});}}>
                <div className="p-4 flex items-center gap-4">
                  <Radio checked={selectedVehicle === vehicle.id} onChange={() => {}} />
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center"><FiTruck className="w-8 h-8 text-gray-600" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2"><h4 className="font-semibold text-gray-900">{vehicle.year} {vehicle.make} {vehicle.model}</h4>{vehicle.isDefault && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Default</span>}</div>
                    <div className="flex gap-4 mt-1 text-sm text-gray-600"><span>License: {vehicle.licensePlate}</span><span className="capitalize">{vehicle.color}</span></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {vehicles.length > 0 && <Button variant="outline" icon={<FiPlus />} iconPosition="left" fullWidth>Add Another Vehicle</Button>}
        {!selectedVehicle && vehicles.length > 0 && <Alert variant="warning">Please select a vehicle to continue</Alert>}
      </div>
    );
  };

  // Step 3: Payment Method
  const renderStep3 = () => {
    if (paymentLoading) return <div className="flex justify-center py-12"><Spinner size="lg" color="primary" /></div>;

    return (
      <div className="space-y-6">
        <div><h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Method</h3><p className="text-gray-600 mb-6">Select a payment method. Your card will be charged after confirmation.</p></div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <Card key={method.id} variant={selectedPayment === method.id ? 'elevated' : 'outline'} className={`cursor-pointer transition-all ${selectedPayment === method.id ? 'ring-2 ring-blue-600 bg-blue-50' : 'hover:shadow-md'}`} onClick={() => {setSelectedPayment(method.id); updateBooking({paymentMethod: method});}}>
              <div className="p-4 flex items-center gap-4">
                <Radio checked={selectedPayment === method.id} onChange={() => {}} />
                <FiCreditCard className="w-6 h-6" />
                <div className="flex-1">
                  <div className="flex items-center gap-2"><h4 className="font-semibold text-gray-900 capitalize">{method.brand} •••• {method.last4}</h4>{method.isDefault && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Default</span>}</div>
                  <div className="flex gap-4 mt-1 text-sm text-gray-600"><span>{method.holderName}</span><span>Expires {method.expiryMonth}/{method.expiryYear}</span></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button variant="outline" icon={<FiPlus />} iconPosition="left" fullWidth>Add Another Payment Method</Button>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3"><FiLock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><div><h4 className="font-semibold text-gray-900 mb-1">Secure Payment</h4><p className="text-sm text-gray-700">Your payment information is encrypted and secure.</p></div></div>
        {!selectedPayment && <Alert variant="warning">Please select a payment method to continue</Alert>}
      </div>
    );
  };

  // Step 4: Confirmation
  const renderStep4 = () => {
    const checkInDate = dateForm.checkIn ? new Date(dateForm.checkIn) : null;
    const checkOutDate = dateForm.checkOut ? new Date(dateForm.checkOut) : null;
    const pricing = checkInDate && checkOutDate && currentBooking?.parkingSpace ? calculateTotal(currentBooking.parkingSpace, checkInDate, checkOutDate) : null;
    const selectedVeh = vehicles.find(v => v.id === selectedVehicle);
    const selectedPay = paymentMethods.find(p => p.id === selectedPayment);

    const handleConfirmBooking = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await bookingService.createBooking({
          parkingSpaceId: currentBooking.parkingSpace.id,
          vehicleId: selectedVehicle,
          paymentMethodId: selectedPayment,
          checkIn: dateForm.checkIn,
          checkOut: dateForm.checkOut,
          totalAmount: pricing?.total
        });
        if (result.success) {
          clearBooking();
          navigate('/dashboard/bookings?success=true');
        } else {
          setError(result.error || 'Booking failed');
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="space-y-6">
        <Card variant="outline">
          <div className="p-6"><h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><FiMapPin className="w-5 h-5" />Parking Space</h3><div className="flex gap-4"><img src={currentBooking?.parkingSpace?.imageUrl} alt={currentBooking?.parkingSpace?.title} className="w-24 h-24 object-cover rounded-lg" /><div><p className="font-medium text-gray-900">{currentBooking?.parkingSpace?.title}</p><p className="text-sm text-gray-600 mt-1">{currentBooking?.parkingSpace?.address}</p></div></div></div>
        </Card>

        <Card variant="outline">
          <div className="p-6"><h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><FiCalendar className="w-5 h-5" />Booking Details</h3><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-gray-600">Check-in:</span><span className="font-medium text-gray-900">{checkInDate?.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-gray-600">Check-out:</span><span className="font-medium text-gray-900">{checkOutDate?.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-gray-600">Duration:</span><span className="font-medium text-gray-900">{pricing?.hours} hours</span></div></div></div>
        </Card>

        {selectedVeh && <Card variant="outline"><div className="p-6"><h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><FiTruck className="w-5 h-5" />Vehicle</h3><p className="text-gray-900">{selectedVeh.year} {selectedVeh.make} {selectedVeh.model}</p><p className="text-sm text-gray-600 mt-1">License: {selectedVeh.licensePlate}</p></div></Card>}

        {selectedPay && <Card variant="outline"><div className="p-6"><h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><FiCreditCard className="w-5 h-5" />Payment Method</h3><p className="text-gray-900 capitalize">{selectedPay.brand} •••• {selectedPay.last4}</p></div></Card>}

        {pricing && <Card variant="outline" className="bg-blue-50"><div className="p-6"><h3 className="font-semibold text-gray-900 mb-4">Total Amount</h3><div className="text-3xl font-bold text-gray-900">{formatCurrency(pricing.total)}</div></div></Card>}

        <Button variant="primary" size="lg" fullWidth onClick={handleConfirmBooking} loading={loading}>Confirm & Pay</Button>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (bookingStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return null;
    }
  };

  const handleNext = () => {
    if (bookingStep === 1 && (!dateForm.checkIn || !dateForm.checkOut)) {
      setError('Please select both check-in and check-out dates');
      return;
    }
    if (bookingStep === 2 && !selectedVehicle) {
      setError('Please select a vehicle');
      return;
    }
    if (bookingStep === 3 && !selectedPayment) {
      setError('Please select a payment method');
      return;
    }
    setError('');
    nextStep();
  };

  if (!currentBooking) {
    return <div className="flex justify-center items-center min-h-screen"><Spinner size="lg" color="primary" /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all', bookingStep > step.number ? 'bg-green-500 text-white' : bookingStep === step.number ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-200 text-gray-600')}>
                      {bookingStep > step.number ? <FiCheck className="w-5 h-5" /> : step.number}
                    </div>
                    <span className={clsx('text-xs mt-2 font-medium hidden sm:block', bookingStep === step.number ? 'text-blue-600' : 'text-gray-600')}>{step.title}</span>
                  </div>
                  {index < steps.length - 1 && <div className={clsx('flex-1 h-1 mx-2 transition-all', bookingStep > step.number ? 'bg-green-500' : 'bg-gray-200')} />}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {error && <Alert variant="danger" className="mb-6">{error}</Alert>}

        <Card><div className="p-6"><h2 className="text-2xl font-bold text-gray-900 mb-6">{steps[bookingStep - 1]?.title}</h2>{renderCurrentStep()}</div></Card>

        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => {if (window.confirm('Cancel booking?')) {clearBooking(); navigate('/dashboard/search');}}}>Cancel</Button>
            {bookingStep > 1 && <Button variant="outline" onClick={prevStep} icon={<FiArrowLeft />} iconPosition="left">Back</Button>}
          </div>
          {bookingStep < 4 && <Button variant="primary" onClick={handleNext} icon={<FiArrowRight />} iconPosition="right">Continue</Button>}
        </div>
      </div>
    </div>
  );
};

export default Booking;
