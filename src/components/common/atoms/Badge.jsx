import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = 'md',
  dot = false,
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center font-medium transition-colors duration-200';

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-gray-200 text-gray-700',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const dotColors = {
    default: 'bg-gray-600',
    primary: 'bg-primary-600',
    secondary: 'bg-gray-600',
    success: 'bg-green-600',
    warning: 'bg-amber-600',
    danger: 'bg-red-600',
    info: 'bg-blue-600',
  };

  const badgeClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    roundedClasses[rounded],
    className
  );

  return (
    <span className={badgeClasses}>
      {dot && (
        <span
          className={clsx(
            'h-1.5 w-1.5 rounded-full mr-1.5',
            dotColors[variant]
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
  dot: PropTypes.bool,
  className: PropTypes.string,
};

export default Badge;
