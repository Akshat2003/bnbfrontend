import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Header from '@components/layout/organisms/Header';
import Sidebar from '@components/layout/organisms/Sidebar';
import { useAuth } from '@context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={logout} notifications={[]} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar role={user?.role} isCollapsed={sidebarCollapsed} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <div
              className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <Sidebar role={user?.role} isCollapsed={false} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden p-4 border-b border-gray-200 bg-white">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="flex items-center gap-2 text-gray-700 hover:text-primary-600"
            >
              <FiMenu className="h-6 w-6" />
              <span className="font-medium">Menu</span>
            </button>
          </div>

          {/* Page Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
