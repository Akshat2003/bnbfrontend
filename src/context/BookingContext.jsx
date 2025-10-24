import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const BookingContext = createContext(undefined);

export const BookingProvider = ({ children }) => {
  // Search filters state
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkIn: null,
    checkOut: null,
    propertyType: 'all', // all, residential, commercial, outdoor
    spaceType: 'all', // all, garage, driveway, parking_lot, street
    features: [], // covered, ev_charging, security, etc.
    priceRange: [0, 1000],
    sortBy: 'recommended', // recommended, price_low, price_high, rating, distance
  });

  // Current booking flow state
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select, 2: Details, 3: Payment, 4: Confirmation

  // Search results
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Update search filters
  const updateFilters = useCallback((updates) => {
    setSearchFilters((prev) => ({ ...prev, ...updates }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchFilters({
      location: '',
      checkIn: null,
      checkOut: null,
      propertyType: 'all',
      spaceType: 'all',
      features: [],
      priceRange: [0, 1000],
      sortBy: 'recommended',
    });
  }, []);

  // Start new booking
  const startBooking = useCallback((parkingSpace) => {
    setCurrentBooking({
      parkingSpace,
      vehicle: null,
      paymentMethod: null,
      checkIn: searchFilters.checkIn,
      checkOut: searchFilters.checkOut,
      totalAmount: 0,
      createdAt: new Date().toISOString(),
    });
    setBookingStep(2);
  }, [searchFilters.checkIn, searchFilters.checkOut]);

  // Update current booking
  const updateBooking = useCallback((updates) => {
    setCurrentBooking((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  }, []);

  // Clear booking
  const clearBooking = useCallback(() => {
    setCurrentBooking(null);
    setBookingStep(1);
  }, []);

  // Go to next step
  const nextStep = useCallback(() => {
    setBookingStep((prev) => Math.min(prev + 1, 4));
  }, []);

  // Go to previous step
  const prevStep = useCallback(() => {
    setBookingStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Set specific step
  const goToStep = useCallback((step) => {
    if (step >= 1 && step <= 4) {
      setBookingStep(step);
    }
  }, []);

  // Search for parking spaces
  const searchParkingSpaces = useCallback(async () => {
    setIsSearching(true);
    try {
      // TODO: Implement API call
      // const response = await parkingSpaceService.search(searchFilters);
      // setSearchResults(response.data);

      // Mock data for now
      setTimeout(() => {
        setSearchResults([]);
        setIsSearching(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to search parking spaces:', error);
      setIsSearching(false);
    }
  }, [searchFilters]);

  // Calculate booking total
  const calculateTotal = useCallback((space, checkIn, checkOut) => {
    if (!space || !checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const hours = Math.ceil((end - start) / (1000 * 60 * 60));

    // Calculate based on hourly rate
    const subtotal = hours * (space.hourlyRate || 0);
    const serviceFee = subtotal * 0.15; // 15% service fee
    const tax = subtotal * 0.08; // 8% tax

    return {
      subtotal,
      serviceFee,
      tax,
      total: subtotal + serviceFee + tax,
      hours,
    };
  }, []);

  const value = {
    // Search
    searchFilters,
    updateFilters,
    resetFilters,
    searchResults,
    isSearching,
    searchParkingSpaces,

    // Booking flow
    currentBooking,
    bookingStep,
    startBooking,
    updateBooking,
    clearBooking,
    nextStep,
    prevStep,
    goToStep,

    // Utilities
    calculateTotal,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

BookingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export default BookingContext;
