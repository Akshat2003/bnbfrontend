import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const Input = forwardRef(
  (
    {
      type = 'text',
      label,
      name,
      value,
      onChange,
      onBlur,
      placeholder,
      disabled = false,
      readOnly = false,
      required = false,
      error,
      helperText,
      success = false,
      icon,
      iconPosition = 'left',
      size = 'md',
      fullWidth = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const baseClasses =
      'block rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    const stateClasses = {
      default:
        'border-gray-300 focus:border-primary-500 focus:ring-primary-500 bg-white text-gray-900',
      error:
        'border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 text-red-900',
      success:
        'border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50 text-green-900',
      disabled: 'border-gray-200 bg-gray-100 text-gray-500',
    };

    const getStateClass = () => {
      if (disabled) return stateClasses.disabled;
      if (error) return stateClasses.error;
      if (success) return stateClasses.success;
      return stateClasses.default;
    };

    const inputClasses = clsx(
      baseClasses,
      sizeClasses[size],
      getStateClass(),
      'border',
      {
        'pl-10': icon && iconPosition === 'left',
        'pr-10': (icon && iconPosition === 'right') || isPassword,
        'w-full': fullWidth,
      },
      className
    );

    const labelClasses = clsx(
      'block text-sm font-medium mb-1.5',
      {
        'text-gray-700': !error && !success,
        'text-red-600': error,
        'text-green-600': success,
      }
    );

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
    };

    const renderIcon = () => {
      if (error) {
        return (
          <FiAlertCircle className="h-5 w-5 text-red-500" aria-label="Error" />
        );
      }
      if (success) {
        return (
          <FiCheckCircle className="h-5 w-5 text-green-500" aria-label="Success" />
        );
      }
      if (icon) {
        return <span className="text-gray-400">{icon}</span>;
      }
      return null;
    };

    return (
      <div className={clsx('relative', { 'w-full': fullWidth })}>
        {label && (
          <label htmlFor={name} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {renderIcon()}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${name}-error` : helperText ? `${name}-helper` : undefined
            }
            className={inputClasses}
            {...rest}
          />

          {((icon && iconPosition === 'right') || error || success) && !isPassword && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {renderIcon()}
            </div>
          )}

          {isPassword && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors disabled:opacity-50"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5" />
                ) : (
                  <FiEye className="h-5 w-5" />
                )}
              </button>
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${name}-error`}
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
          >
            <FiAlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${name}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}

        {!error && success && typeof success === 'string' && (
          <p className="mt-1.5 text-sm text-green-600 flex items-center gap-1">
            <FiCheckCircle className="h-4 w-4 flex-shrink-0" />
            {success}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'number',
    'tel',
    'url',
    'search',
    'date',
    'time',
    'datetime-local',
  ]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
