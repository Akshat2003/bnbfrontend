// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Debounce function
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function
export const throttle = (func, limit = 300) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Get nested object property safely
export const getNestedValue = (obj, path, defaultValue = undefined) => {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
};

// Set nested object property
export const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;

  for (const key of keys) {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
  return obj;
};

// Remove duplicates from array
export const removeDuplicates = (array, key) => {
  if (!key) {
    return [...new Set(array)];
  }

  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

// Group array by key
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

// Sort array by key
export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = getNestedValue(a, key);
    const bVal = getNestedValue(b, key);

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Filter array by search term
export const searchFilter = (array, searchTerm, keys) => {
  if (!searchTerm) return array;

  const term = searchTerm.toLowerCase();

  return array.filter((item) => {
    return keys.some((key) => {
      const value = getNestedValue(item, key);
      return value && String(value).toLowerCase().includes(term);
    });
  });
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (!total) return 0;
  return (value / total) * 100;
};

// Calculate average
export const calculateAverage = (array) => {
  if (!array || array.length === 0) return 0;
  const sum = array.reduce((acc, val) => acc + val, 0);
  return sum / array.length;
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';

  const names = name.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

// Generate random color
export const generateColor = (str) => {
  if (!str) return '#6B7280'; // Default gray

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    '#EF4444', // red
    '#F59E0B', // amber
    '#10B981', // emerald
    '#3B82F6', // blue
    '#8B5CF6', // violet
    '#EC4899', // pink
    '#14B8A6', // teal
    '#F97316', // orange
  ];

  return colors[Math.abs(hash) % colors.length];
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

// Download file
export const downloadFile = (data, filename, type = 'text/plain') => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Sleep/delay function
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Check if mobile device
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Get browser info
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';

  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Opera')) browser = 'Opera';

  return browser;
};

// Format query string
export const buildQueryString = (params) => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return query ? `?${query}` : '';
};

// Parse query string
export const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString);
  const result = {};

  for (const [key, value] of params) {
    result[key] = value;
  }

  return result;
};

// Local storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage', error);
      return false;
    }
  },
};

// Session storage helpers
export const sessionStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from sessionStorage: ${key}`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to sessionStorage: ${key}`, error);
      return false;
    }
  },

  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from sessionStorage: ${key}`, error);
      return false;
    }
  },

  clear: () => {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage', error);
      return false;
    }
  },
};

export default {
  generateId,
  debounce,
  throttle,
  deepClone,
  getNestedValue,
  setNestedValue,
  removeDuplicates,
  groupBy,
  sortBy,
  searchFilter,
  calculatePercentage,
  calculateAverage,
  getInitials,
  generateColor,
  copyToClipboard,
  downloadFile,
  sleep,
  isMobileDevice,
  getBrowserInfo,
  buildQueryString,
  parseQueryString,
  storage,
  sessionStorage,
};
