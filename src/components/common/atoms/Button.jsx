import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

/**
 * Button Component
 * Reusable button component with multiple variants, sizes, and states
 *
 * @component
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 active:bg-gray-400',
    outline:
      'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100',
    ghost:
      'text-primary-600 hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
    success:
      'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className
  );

  const renderIcon = () => {
    if (loading) {
      return (
        <svg
          className={clsx('animate-spin', size === 'sm' ? 'h-4 w-4' : 'h-5 w-5')}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      );
    }
    if (icon) {
      return <span className={clsx(size === 'sm' ? 'text-sm' : 'text-base')}>{icon}</span>;
    }
    return null;
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {icon && iconPosition === 'left' && renderIcon()}
      {loading && !icon && renderIcon()}
      <span>{children}</span>
      {icon && iconPosition === 'right' && !loading && renderIcon()}
    </button>
  );
};

Button.propTypes = {
  /** Button style variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'danger', 'success']),
  /** Button size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Click handler function */
  onClick: PropTypes.func,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Loading state (shows spinner) */
  loading: PropTypes.bool,
  /** Icon element to display */
  icon: PropTypes.node,
  /** Icon position relative to text */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  /** Full width button */
  fullWidth: PropTypes.bool,
  /** Button type attribute */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default Button;
