import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { Input, Button, Alert, Radio } from '@components/common';
import { useAuth } from '@context/AuthContext';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  role: yup.string().required('Please select a role').oneOf(['user', 'owner']),
  termsAccepted: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
}).required();

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'user',
    },
  });

  const onSubmit = async (data) => {
    setError('');

    const result = await registerUser(data);

    if (result.success) {
      navigate(`/${data.role}/dashboard`, { replace: true });
    } else {
      setError(result.error?.message || 'Registration failed. Please try again.');
    }
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4">
              <div className="h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">ParkingBnB</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an Account</h2>
            <p className="text-gray-600">Join thousands of users finding convenient parking</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="danger" className="mb-6" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => handleRoleChange('user')}
                  className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                    selectedRole === 'user'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Radio
                    name="role"
                    value="user"
                    checked={selectedRole === 'user'}
                    onChange={() => handleRoleChange('user')}
                    label="Find Parking"
                  />
                  <p className="text-sm text-gray-600 mt-2 ml-7">
                    Search and book parking spaces
                  </p>
                </div>
                <div
                  onClick={() => handleRoleChange('owner')}
                  className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                    selectedRole === 'owner'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Radio
                    name="role"
                    value="owner"
                    checked={selectedRole === 'owner'}
                    onChange={() => handleRoleChange('owner')}
                    label="List My Space"
                  />
                  <p className="text-sm text-gray-600 mt-2 ml-7">
                    Earn money from your parking space
                  </p>
                </div>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="John Doe"
                icon={<FiUser />}
                error={errors.name?.message}
                required
                fullWidth
                {...register('name')}
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="1234567890"
                icon={<FiPhone />}
                error={errors.phone?.message}
                required
                fullWidth
                {...register('phone')}
              />
            </div>

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={<FiMail />}
              error={errors.email?.message}
              required
              fullWidth
              {...register('email')}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                icon={<FiLock />}
                error={errors.password?.message}
                required
                fullWidth
                {...register('password')}
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                icon={<FiLock />}
                error={errors.confirmPassword?.message}
                required
                fullWidth
                {...register('confirmPassword')}
              />
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                  {...register('termsAccepted')}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6 mb-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="md" fullWidth>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" size="md" fullWidth>
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
