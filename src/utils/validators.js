// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: 'Empty' };

  let strength = 0;

  // Length
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Contains lowercase
  if (/[a-z]/.test(password)) strength++;

  // Contains uppercase
  if (/[A-Z]/.test(password)) strength++;

  // Contains number
  if (/\d/.test(password)) strength++;

  // Contains special character
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return {
    strength: Math.min(strength, 5),
    label: labels[Math.min(strength, 5)],
  };
};

// Phone validation
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

// URL validation
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Credit card validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber) => {
  const cleaned = cardNumber.replace(/\D/g, '');

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// ZIP code validation
export const isValidZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

// License plate validation (US format)
export const isValidLicensePlate = (plate) => {
  // Basic validation - 2-8 alphanumeric characters
  const plateRegex = /^[A-Z0-9]{2,8}$/i;
  return plateRegex.test(plate);
};

// VIN validation
export const isValidVIN = (vin) => {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  return vinRegex.test(vin);
};

// Required field validation
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Min length validation
export const minLength = (value, min) => {
  if (typeof value === 'string') {
    return value.length >= min;
  }
  return true;
};

// Max length validation
export const maxLength = (value, max) => {
  if (typeof value === 'string') {
    return value.length <= max;
  }
  return true;
};

// Number range validation
export const inRange = (value, min, max) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

// Date validation
export const isValidDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

export const isFutureDate = (date) => {
  const d = new Date(date);
  return d > new Date();
};

export const isPastDate = (date) => {
  const d = new Date(date);
  return d < new Date();
};

export const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return d >= start && d <= end;
};

// File validation
export const isValidFileType = (file, allowedTypes) => {
  if (!file) return false;
  return allowedTypes.includes(file.type);
};

export const isValidFileSize = (file, maxSizeInMB) => {
  if (!file) return false;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

// Image validation
export const isValidImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return isValidFileType(file, allowedTypes);
};

// Booking validation
export const isValidBookingDates = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return false;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Check if dates are valid
  if (!isValidDate(checkInDate) || !isValidDate(checkOutDate)) {
    return false;
  }

  // Check if check-in is in the future
  if (!isFutureDate(checkInDate)) {
    return false;
  }

  // Check if check-out is after check-in
  return checkOutDate > checkInDate;
};

// Price validation
export const isValidPrice = (price) => {
  const num = Number(price);
  return !isNaN(num) && num > 0;
};

// Rating validation
export const isValidRating = (rating) => {
  return inRange(rating, 1, 5);
};

export default {
  isValidEmail,
  isValidPassword,
  getPasswordStrength,
  isValidPhone,
  isValidURL,
  isValidCreditCard,
  isValidZipCode,
  isValidLicensePlate,
  isValidVIN,
  isRequired,
  minLength,
  maxLength,
  inRange,
  isValidDate,
  isFutureDate,
  isPastDate,
  isDateInRange,
  isValidFileType,
  isValidFileSize,
  isValidImage,
  isValidBookingDates,
  isValidPrice,
  isValidRating,
};
