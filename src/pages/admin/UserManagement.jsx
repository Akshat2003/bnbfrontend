import { useState, useEffect } from 'react';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatDate } from '@utils/formatters';
import {
  FaSearch,
  FaFilter,
  FaUserCircle,
  FaEllipsisV,
  FaBan,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaStar,
  FaCar,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
  FaExclamationTriangle
} from 'react-icons/fa';

const UserManagement = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockUsers = [
          {
            id: 'user1',
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '+1 (555) 123-4567',
            role: 'user',
            status: 'active',
            verified: true,
            registeredAt: new Date('2024-01-15T10:30:00'),
            lastActive: new Date('2024-10-24T14:30:00'),
            stats: {
              bookings: 15,
              reviews: 12,
              rating: 4.8,
              vehicles: 2
            },
            location: 'New York, NY'
          },
          {
            id: 'owner1',
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            phone: '+1 (555) 234-5678',
            role: 'owner',
            status: 'active',
            verified: true,
            registeredAt: new Date('2023-11-20T09:15:00'),
            lastActive: new Date('2024-10-24T13:00:00'),
            stats: {
              properties: 5,
              bookings: 127,
              revenue: 25890,
              rating: 4.9
            },
            location: 'Los Angeles, CA'
          },
          {
            id: 'user2',
            name: 'Michael Brown',
            email: 'mbrown@example.com',
            phone: '+1 (555) 345-6789',
            role: 'user',
            status: 'suspended',
            verified: true,
            registeredAt: new Date('2024-03-10T14:20:00'),
            lastActive: new Date('2024-09-15T10:00:00'),
            stats: {
              bookings: 8,
              reviews: 6,
              rating: 3.2,
              vehicles: 1
            },
            location: 'Chicago, IL'
          },
          {
            id: 'owner2',
            name: 'Emma Wilson',
            email: 'emma.wilson@example.com',
            phone: '+1 (555) 456-7890',
            role: 'owner',
            status: 'active',
            verified: false,
            registeredAt: new Date('2024-09-01T11:00:00'),
            lastActive: new Date('2024-10-23T16:45:00'),
            stats: {
              properties: 2,
              bookings: 18,
              revenue: 3200,
              rating: 4.5
            },
            location: 'San Francisco, CA'
          },
          {
            id: 'user3',
            name: 'David Lee',
            email: 'david.lee@example.com',
            phone: '+1 (555) 567-8901',
            role: 'user',
            status: 'inactive',
            verified: true,
            registeredAt: new Date('2023-08-05T08:30:00'),
            lastActive: new Date('2024-05-10T12:00:00'),
            stats: {
              bookings: 3,
              reviews: 2,
              rating: 4.0,
              vehicles: 1
            },
            location: 'Miami, FL'
          },
          {
            id: 'admin1',
            name: 'Admin User',
            email: 'admin@parkingbnb.com',
            phone: '+1 (555) 678-9012',
            role: 'admin',
            status: 'active',
            verified: true,
            registeredAt: new Date('2023-01-01T00:00:00'),
            lastActive: new Date('2024-10-24T15:00:00'),
            stats: {},
            location: 'San Francisco, CA'
          }
        ];

        setUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalStats = {
    all: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    inactive: users.filter(u => u.status === 'inactive').length
  };

  const handleAction = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    // TODO: Implement actual API call
    console.log(`Performing ${actionType} on user:`, selectedUser.id);

    if (actionType === 'suspend') {
      setUsers(prev => prev.map(u =>
        u.id === selectedUser.id ? { ...u, status: 'suspended' } : u
      ));
    } else if (actionType === 'activate') {
      setUsers(prev => prev.map(u =>
        u.id === selectedUser.id ? { ...u, status: 'active' } : u
      ));
    } else if (actionType === 'delete') {
      setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
    }

    setShowActionModal(false);
    setSelectedUser(null);
    setActionType(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Active</span>;
      case 'suspended':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Suspended</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">Inactive</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{status}</span>;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">Admin</span>;
      case 'owner':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">Owner</span>;
      case 'user':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">User</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">{role}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all platform users and permissions</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Export Users
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{totalStats.all}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Active</p>
            <p className="text-2xl font-bold text-green-600">{totalStats.active}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Suspended</p>
            <p className="text-2xl font-bold text-red-600">{totalStats.suspended}</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-1">Inactive</p>
            <p className="text-2xl font-bold text-gray-600">{totalStats.inactive}</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="owner">Owners</option>
              <option value="admin">Admins</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    {/* User */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <FaUserCircle className="w-10 h-10 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {user.verified ? (
                              <FaCheckCircle className="w-3 h-3 text-green-500" />
                            ) : (
                              <FaExclamationTriangle className="w-3 h-3 text-yellow-500" />
                            )}
                            <span>{user.verified ? 'Verified' : 'Unverified'}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-2 mb-1">
                          <FaEnvelope className="w-3 h-3 text-gray-400" />
                          <span className="truncate max-w-[200px]">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaPhone className="w-3 h-3 text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>

                    {/* Stats */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.role === 'owner' ? (
                          <>
                            <div className="flex items-center gap-1 mb-1">
                              <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                              <span>{user.stats.properties} properties</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaStar className="w-3 h-3 text-yellow-400" />
                              <span>{user.stats.rating}</span>
                            </div>
                          </>
                        ) : user.role === 'user' ? (
                          <>
                            <div className="flex items-center gap-1 mb-1">
                              <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                              <span>{user.stats.bookings} bookings</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaStar className="w-3 h-3 text-yellow-400" />
                              <span>{user.stats.rating}</span>
                            </div>
                          </>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </div>
                    </td>

                    {/* Last Active */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">{formatDate(user.lastActive, 'short')}</p>
                      <p className="text-xs text-gray-500">{formatDate(user.lastActive, 'time')}</p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        {user.status === 'active' && user.role !== 'admin' && (
                          <button
                            onClick={() => handleAction(user, 'suspend')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Suspend User"
                          >
                            <FaBan className="w-4 h-4" />
                          </button>
                        )}
                        {user.status === 'suspended' && (
                          <button
                            onClick={() => handleAction(user, 'activate')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Activate User"
                          >
                            <FaCheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => handleAction(user, 'delete')}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Confirmation Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FaExclamationTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm {actionType?.charAt(0).toUpperCase() + actionType?.slice(1)}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {actionType} <strong>{selectedUser?.name}</strong>?
                This action {actionType === 'delete' ? 'cannot be undone' : 'can be reversed later'}.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowActionModal(false);
                    setSelectedUser(null);
                    setActionType(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
