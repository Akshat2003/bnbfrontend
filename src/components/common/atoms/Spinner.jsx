import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Spinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizeClasses = {
    xs: 'h-3 w-3 border-2',
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
    xl: 'h-12 w-12 border-4',
  };

  const colorClasses = {
    primary: 'border-primary-200 border-t-primary-600',
    secondary: 'border-gray-200 border-t-gray-600',
    white: 'border-white/20 border-t-white',
    success: 'border-green-200 border-t-green-600',
    danger: 'border-red-200 border-t-red-600',
    warning: 'border-amber-200 border-t-amber-600',
  };

  const spinnerClasses = clsx(
    'inline-block rounded-full animate-spin',
    sizeClasses[size],
    colorClasses[color],
    className
  );

  return (
    <div className={spinnerClasses} role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'success', 'danger', 'warning']),
  className: PropTypes.string,
};

export default Spinner;
