import React, { useState, useRef, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

const Textarea = forwardRef(
  (
    {
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
      rows = 4,
      maxLength,
      showCharCount = false,
      autoResize = false,
      size = 'md',
      fullWidth = true,
      className = '',
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);
    const internalRef = ref || textareaRef;

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && internalRef.current) {
        const textarea = internalRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [value, autoResize, internalRef]);

    const baseClasses =
      'block rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed resize-none';

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

    const textareaClasses = clsx(
      baseClasses,
      sizeClasses[size],
      getStateClass(),
      'border',
      {
        'w-full': fullWidth,
        'resize-y': !autoResize,
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

    const charCount = value ? value.length : 0;
    const isNearLimit = maxLength && charCount >= maxLength * 0.9;
    const isAtLimit = maxLength && charCount >= maxLength;

    return (
      <div className={clsx('relative', { 'w-full': fullWidth })}>
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <label htmlFor={name} className={labelClasses}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {(showCharCount || maxLength) && (
            <span
              className={clsx('text-xs', {
                'text-gray-500': !isNearLimit,
                'text-amber-600': isNearLimit && !isAtLimit,
                'text-red-600': isAtLimit,
              })}
            >
              {charCount}
              {maxLength && ` / ${maxLength}`}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            ref={internalRef}
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
            rows={autoResize ? 1 : rows}
            maxLength={maxLength}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? `${name}-error` : helperText ? `${name}-helper` : undefined
            }
            className={textareaClasses}
            {...rest}
          />
        </div>

        {error && (
          <p
            id={`${name}-error`}
            className="mt-1.5 text-sm text-red-600 flex items-start gap-1"
          >
            <FiAlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${name}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}

        {!error && success && typeof success === 'string' && (
          <p className="mt-1.5 text-sm text-green-600 flex items-start gap-1">
            <FiCheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            {success}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  rows: PropTypes.number,
  maxLength: PropTypes.number,
  showCharCount: PropTypes.bool,
  autoResize: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Textarea;
