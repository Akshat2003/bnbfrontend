import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import PublicLayout from '@layouts/PublicLayout';
import DashboardLayout from '@layouts/DashboardLayout';

// Public Pages
import Landing from '@pages/public/Landing';
import NotFound from '@pages/public/NotFound';
import About from '@pages/public/About';
import Contact from '@pages/public/Contact';
import Help from '@pages/public/Help';

// Auth Pages
import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import ForgotPassword from '@pages/auth/ForgotPassword';
import ResetPassword from '@pages/auth/ResetPassword';
import EmailVerification from '@pages/auth/EmailVerification';

// User Pages
import UserDashboard from '@pages/user/Dashboard';
import SearchParking from '@pages/user/SearchParking';
import PropertyDetail from '@pages/user/PropertyDetail';
import Booking from '@pages/user/Booking';
import MyBookings from '@pages/user/MyBookings';
import MyVehicles from '@pages/user/MyVehicles';
import PaymentMethods from '@pages/user/PaymentMethods';
import ProfileSettings from '@pages/user/ProfileSettings';
import Messages from '@pages/user/Messages';
import Notifications from '@pages/user/Notifications';

// Owner Pages
import OwnerDashboard from '@pages/owner/Dashboard';
import OwnerProperties from '@pages/owner/Properties';
import OwnerBookings from '@pages/owner/Bookings';
import OwnerEarnings from '@pages/owner/Earnings';
import OwnerReviews from '@pages/owner/Reviews';
import OwnerMessages from '@pages/owner/Messages';
import AddProperty from '@pages/owner/AddProperty';
import PropertySpaces from '@pages/owner/PropertySpaces';

// Admin Pages
import AdminDashboard from '@pages/admin/Dashboard';
import UserManagement from '@pages/admin/UserManagement';
import PropertyManagement from '@pages/admin/PropertyManagement';
import BookingsManagement from '@pages/admin/BookingsManagement';
import Analytics from '@pages/admin/Analytics';
import SupportTickets from '@pages/admin/SupportTickets';
import AdminSettings from '@pages/admin/Settings';

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
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'help',
        element: <Help />,
      },
      {
        path: 'search',
        element: <SearchParking />,
      },
      {
        path: 'become-owner',
        element: <AddProperty />,
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
    path: '/user',
    element: (
      <ProtectedRoute requiredRole="user">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <UserDashboard />,
      },
      {
        path: 'search',
        element: <SearchParking />,
      },
      {
        path: 'booking',
        element: <Booking />,
      },
      {
        path: 'bookings',
        element: <MyBookings />,
      },
      {
        path: 'vehicles',
        element: <MyVehicles />,
      },
      {
        path: 'settings',
        element: <ProfileSettings />,
      },
      {
        path: 'payment-methods',
        element: <PaymentMethods />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
    ],
  },

  // Redirect /dashboard to /user/dashboard for backward compatibility
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
        path: 'search',
        element: <SearchParking />,
      },
      {
        path: 'booking',
        element: <Booking />,
      },
      {
        path: 'bookings',
        element: <MyBookings />,
      },
      {
        path: 'vehicles',
        element: <MyVehicles />,
      },
      {
        path: 'profile',
        element: <ProfileSettings />,
      },
      {
        path: 'payments',
        element: <PaymentMethods />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
    ],
  },

  // Public parking space detail (accessible without login for browsing)
  {
    path: '/parking-spaces/:id',
    element: <PropertyDetail />,
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
        element: <OwnerProperties />,
      },
      {
        path: 'bookings',
        element: <OwnerBookings />,
      },
      {
        path: 'earnings',
        element: <OwnerEarnings />,
      },
      {
        path: 'reviews',
        element: <OwnerReviews />,
      },
      {
        path: 'messages',
        element: <OwnerMessages />,
      },
      {
        path: 'properties/add',
        element: <AddProperty />,
      },
      {
        path: 'properties/:propertyId/spaces',
        element: <PropertySpaces />,
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
        element: <UserManagement />,
      },
      {
        path: 'properties',
        element: <PropertyManagement />,
      },
      {
        path: 'bookings',
        element: <BookingsManagement />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'support',
        element: <SupportTickets />,
      },
      {
        path: 'settings',
        element: <AdminSettings />,
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
