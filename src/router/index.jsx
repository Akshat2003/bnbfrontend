import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import PublicLayout from '@layouts/PublicLayout';
import DashboardLayout from '@layouts/DashboardLayout';

// Public Pages
import Landing from '@pages/public/Landing';
import NotFound from '@pages/public/NotFound';

// Auth Pages
import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import ForgotPassword from '@pages/auth/ForgotPassword';
import ResetPassword from '@pages/auth/ResetPassword';
import EmailVerification from '@pages/auth/EmailVerification';

// User Pages
import UserDashboard from '@pages/user/Dashboard';

// Owner Pages
import OwnerDashboard from '@pages/owner/Dashboard';

// Admin Pages
import AdminDashboard from '@pages/admin/Dashboard';

const router = createBrowserRouter([
  // Public routes with PublicLayout
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'about',
        element: <div>About Page (TODO)</div>,
      },
      {
        path: 'how-it-works',
        element: <div>How It Works Page (TODO)</div>,
      },
      {
        path: 'contact',
        element: <div>Contact Page (TODO)</div>,
      },
    ],
  },

  // Auth routes (no layout)
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/verify-email/:token',
    element: <EmailVerification />,
  },

  // User protected routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute requiredRole="user">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: 'bookings',
        element: <div>User Bookings (TODO)</div>,
      },
      {
        path: 'vehicles',
        element: <div>User Vehicles (TODO)</div>,
      },
      {
        path: 'profile',
        element: <div>User Profile (TODO)</div>,
      },
      {
        path: 'payments',
        element: <div>User Payments (TODO)</div>,
      },
      {
        path: 'messages',
        element: <div>User Messages (TODO)</div>,
      },
    ],
  },

  // Owner protected routes
  {
    path: '/owner',
    element: (
      <ProtectedRoute requiredRole="owner">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <OwnerDashboard />,
      },
      {
        path: 'properties',
        element: <div>Owner Properties (TODO)</div>,
      },
      {
        path: 'bookings',
        element: <div>Owner Bookings (TODO)</div>,
      },
      {
        path: 'earnings',
        element: <div>Owner Earnings (TODO)</div>,
      },
      {
        path: 'reviews',
        element: <div>Owner Reviews (TODO)</div>,
      },
      {
        path: 'messages',
        element: <div>Owner Messages (TODO)</div>,
      },
    ],
  },

  // Admin protected routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'users',
        element: <div>Admin Users (TODO)</div>,
      },
      {
        path: 'properties',
        element: <div>Admin Properties (TODO)</div>,
      },
      {
        path: 'bookings',
        element: <div>Admin Bookings (TODO)</div>,
      },
      {
        path: 'reports',
        element: <div>Admin Reports (TODO)</div>,
      },
      {
        path: 'settings',
        element: <div>Admin Settings (TODO)</div>,
      },
    ],
  },

  // 404 Not Found
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
