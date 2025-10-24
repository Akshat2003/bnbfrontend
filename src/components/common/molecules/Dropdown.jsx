import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({
  trigger,
  children,
  position = 'bottom-left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={clsx(
            'absolute z-50 min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200',
            'animate-in fade-in zoom-in-95 duration-200',
            positionClasses[position],
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
  className: PropTypes.string,
};

// Dropdown Item Component
export const DropdownItem = ({
  children,
  onClick,
  icon,
  danger = false,
  className = '',
}) => {
  const itemClasses = clsx(
    'flex items-center gap-3 px-4 py-2 text-sm transition-colors',
    'hover:bg-gray-100 cursor-pointer',
    {
      'text-red-600 hover:bg-red-50': danger,
      'text-gray-700': !danger,
    },
    className
  );

  return (
    <div onClick={onClick} className={itemClasses} role="menuitem">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
    </div>
  );
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  danger: PropTypes.bool,
  className: PropTypes.string,
};

// Dropdown Divider Component
export const DropdownDivider = () => (
  <div className="my-1 border-t border-gray-200" role="separator" />
);

export default Dropdown;
