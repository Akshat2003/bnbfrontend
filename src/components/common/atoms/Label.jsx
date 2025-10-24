import PropTypes from 'prop-types';
import clsx from 'clsx';

const Label = ({
  children,
  htmlFor,
  required = false,
  optional = false,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        'block font-medium text-gray-700 mb-1',
        sizeClasses[size],
        className
      )}
    >
      {children}
      {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      {optional && <span className="text-gray-400 ml-1 font-normal">(optional)</span>}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
  optional: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Label;
