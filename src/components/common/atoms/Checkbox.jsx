import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiCheck, FiMinus } from 'react-icons/fi';

const Checkbox = forwardRef(
  (
    {
      label,
      name,
      checked = false,
      indeterminate = false,
      onChange,
      disabled = false,
      error,
      size = 'md',
      className = '',
      ...rest
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const iconSizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    const checkboxClasses = clsx(
      'rounded transition-all duration-200 cursor-pointer',
      'border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
      sizeClasses[size],
      {
        'border-gray-300 bg-white': !checked && !indeterminate && !error,
        'border-primary-600 bg-primary-600': (checked || indeterminate) && !error,
        'border-red-500 bg-red-500': error && (checked || indeterminate),
        'border-red-300': error && !checked && !indeterminate,
        'opacity-50 cursor-not-allowed': disabled,
      },
      className
    );

    const labelClasses = clsx('text-sm font-medium', {
      'text-gray-700': !error,
      'text-red-600': error,
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    });

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            className="sr-only"
            {...rest}
          />
          <label htmlFor={name} className={checkboxClasses}>
            {(checked || indeterminate) && (
              <span className="flex items-center justify-center h-full w-full text-white">
                {indeterminate ? (
                  <FiMinus className={iconSizeClasses[size]} strokeWidth={3} />
                ) : (
                  <FiCheck className={iconSizeClasses[size]} strokeWidth={3} />
                )}
              </span>
            )}
          </label>
        </div>
        {label && (
          <label htmlFor={name} className={clsx(labelClasses, 'ml-2')}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Checkbox;
