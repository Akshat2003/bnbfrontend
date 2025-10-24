import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '@context/AuthContext';
import { Spinner } from '@components/common';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    // Redirect based on user's actual role
    const redirectMap = {
      user: '/user/dashboard',
      owner: '/owner/dashboard',
      admin: '/admin/dashboard',
    };

    return <Navigate to={redirectMap[user.role] || '/user/dashboard'} replace />;
  }

  // All checks passed - render children
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOf(['user', 'owner', 'admin', null]),
};

export default ProtectedRoute;
