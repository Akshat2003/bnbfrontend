import { format, formatDistance, formatRelative, parseISO, isValid } from 'date-fns';

// Date formatters
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? format(parsedDate, formatStr) : '';
};

export const formatDateTime = (date) => {
  return formatDate(date, 'MMM dd, yyyy hh:mm a');
};

export const formatTimeAgo = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? formatDistance(parsedDate, new Date(), { addSuffix: true }) : '';
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsedDate) ? formatRelative(parsedDate, new Date()) : '';
};

// Currency formatters
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return '';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPrice = (amount) => {
  return formatCurrency(amount);
};

// Number formatters
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) return '';

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '';
  return `${formatNumber(value, decimals)}%`;
};

export const formatCompactNumber = (number) => {
  if (number === null || number === undefined) return '';

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(number);
};

// Phone formatter
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone;
};

// Text formatters
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

export const truncate = (str, length = 50, suffix = '...') => {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + suffix;
};

export const slugify = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// File size formatter
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  if (!bytes) return '';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Duration formatter (in minutes)
export const formatDuration = (minutes) => {
  if (!minutes) return '0 min';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

// Rating formatter
export const formatRating = (rating) => {
  if (!rating) return '0.0';
  return Number(rating).toFixed(1);
};

// Distance formatter
export const formatDistance = (distance, unit = 'mi') => {
  if (distance === null || distance === undefined) return '';

  const formatted = distance < 1 ? distance.toFixed(2) : distance.toFixed(1);
  return `${formatted} ${unit}`;
};

// Address formatter
export const formatAddress = (address) => {
  if (!address) return '';

  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode,
  ].filter(Boolean);

  return parts.join(', ');
};

export default {
  formatDate,
  formatDateTime,
  formatTimeAgo,
  formatRelativeTime,
  formatCurrency,
  formatPrice,
  formatNumber,
  formatPercentage,
  formatCompactNumber,
  formatPhoneNumber,
  capitalize,
  capitalizeWords,
  truncate,
  slugify,
  formatFileSize,
  formatDuration,
  formatRating,
  formatDistance,
  formatAddress,
};
