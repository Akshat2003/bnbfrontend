import React, { useState, useRef, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiChevronDown, FiX, FiSearch, FiAlertCircle, FiCheckCircle, FiCheck } from 'react-icons/fi';

const Select = forwardRef(
  (
    {
      label,
      name,
      value,
      onChange,
      onBlur,
      options = [],
      placeholder = 'Select an option...',
      disabled = false,
      required = false,
      error,
      helperText,
      success = false,
      searchable = false,
      clearable = false,
      multiple = false,
      size = 'md',
      fullWidth = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const selectRef = useRef(null);
    const searchInputRef = useRef(null);

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    const baseClasses =
      'block w-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

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

    const selectClasses = clsx(
      baseClasses,
      sizeClasses[size],
      getStateClass(),
      'border',
      'flex items-center justify-between',
      {
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

    // Filter options based on search term
    const filteredOptions = searchable
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    // Get selected option(s) display text
    const getDisplayValue = () => {
      if (multiple && Array.isArray(value)) {
        if (value.length === 0) return placeholder;
        const selectedOptions = options.filter((opt) => value.includes(opt.value));
        return selectedOptions.map((opt) => opt.label).join(', ');
      }

      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    };

    const isSelected = (optionValue) => {
      if (multiple && Array.isArray(value)) {
        return value.includes(optionValue);
      }
      return value === optionValue;
    };

    const handleSelect = (optionValue) => {
      if (multiple) {
        const newValue = Array.isArray(value) ? [...value] : [];
        const index = newValue.indexOf(optionValue);

        if (index > -1) {
          newValue.splice(index, 1);
        } else {
          newValue.push(optionValue);
        }

        onChange({ target: { name, value: newValue } });
      } else {
        onChange({ target: { name, value: optionValue } });
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    const handleClear = (e) => {
      e.stopPropagation();
      onChange({ target: { name, value: multiple ? [] : '' } });
    };

    const handleKeyDown = (e) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          if (!isOpen) {
            setIsOpen(true);
          } else if (filteredOptions.length > 0) {
            handleSelect(filteredOptions[highlightedIndex].value);
          }
          e.preventDefault();
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          break;
        case 'ArrowDown':
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          e.preventDefault();
          break;
        case 'ArrowUp':
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    const hasValue = multiple ? value?.length > 0 : value;

    return (
      <div className={clsx('relative', { 'w-full': fullWidth })} ref={selectRef}>
        {label && (
          <label htmlFor={name} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={selectClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={label ? name : undefined}
          aria-invalid={error ? 'true' : 'false'}
        >
          <span
            className={clsx('truncate flex-1', {
              'text-gray-400': !hasValue,
            })}
          >
            {getDisplayValue()}
          </span>

          <div className="flex items-center gap-1 ml-2">
            {clearable && hasValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                aria-label="Clear selection"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
            <FiChevronDown
              className={clsx(
                'h-5 w-5 text-gray-400 transition-transform duration-200',
                {
                  'transform rotate-180': isOpen,
                }
              )}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setHighlightedIndex(0);
                    }}
                    placeholder="Search..."
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            )}

            <ul
              className="overflow-y-auto max-h-48 py-1"
              role="listbox"
              aria-label={label}
            >
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-2 text-sm text-gray-500 text-center">
                  No options found
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={clsx(
                      'px-4 py-2 text-sm cursor-pointer transition-colors flex items-center justify-between',
                      {
                        'bg-primary-50 text-primary-700': highlightedIndex === index,
                        'hover:bg-gray-100': highlightedIndex !== index,
                        'bg-primary-100 font-medium': isSelected(option.value),
                      }
                    )}
                    role="option"
                    aria-selected={isSelected(option.value)}
                  >
                    <span>{option.label}</span>
                    {isSelected(option.value) && (
                      <FiCheck className="h-4 w-4 text-primary-600" />
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {error && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <FiAlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
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

Select.displayName = 'Select';

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  helperText: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  searchable: PropTypes.bool,
  clearable: PropTypes.bool,
  multiple: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;
