import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

// Toast Context
const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      variant: 'info',
      duration: 5000,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    {
      success: (message, options) => addToast({ message, variant: 'success', ...options }),
      error: (message, options) => addToast({ message, variant: 'danger', ...options }),
      info: (message, options) => addToast({ message, variant: 'info', ...options }),
      warning: (message, options) => addToast({ message, variant: 'warning', ...options }),
    },
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Toast Container
const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

ToastContainer.propTypes = {
  toasts: PropTypes.array.isRequired,
  removeToast: PropTypes.func.isRequired,
};

// Toast Item
const ToastItem = ({ toast, onClose }) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-600',
      IconComponent: FiInfo,
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: 'text-green-600',
      IconComponent: FiCheckCircle,
    },
    warning: {
      container: 'bg-amber-50 border-amber-200',
      icon: 'text-amber-600',
      IconComponent: FiAlertTriangle,
    },
    danger: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-600',
      IconComponent: FiAlertCircle,
    },
  };

  const { container, icon, IconComponent } = variants[toast.variant];

  const toastClasses = clsx(
    'pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-lg',
    'min-w-[300px] max-w-[400px]',
    'animate-in slide-in-from-right duration-300',
    container
  );

  return (
    <div className={toastClasses} role="alert">
      <IconComponent className={clsx('h-5 w-5 flex-shrink-0 mt-0.5', icon)} />

      <div className="flex-1">
        {toast.title && (
          <div className="font-semibold text-sm mb-1">{toast.title}</div>
        )}
        <div className="text-sm text-gray-700">{toast.message}</div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className={clsx(
          'flex-shrink-0 p-0.5 rounded hover:bg-black/5 transition-colors',
          icon
        )}
        aria-label="Close"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
};

ToastItem.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    message: PropTypes.string.isRequired,
    title: PropTypes.string,
    variant: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
