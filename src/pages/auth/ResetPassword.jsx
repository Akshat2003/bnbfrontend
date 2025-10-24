import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Input, Card, Alert } from '@components/common';
import { FiLock, FiCheck } from 'react-icons/fi';
import authService from '@services/authService';
import { getPasswordStrength } from '@utils/validators';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength.strength < 3) {
      setError('Password is too weak. Please choose a stronger password');
      return;
    }

    setLoading(true);

    const result = await authService.resetPassword(token, formData.password);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const strengthColors = {
    0: 'bg-red-500',
    1: 'bg-red-500',
    2: 'bg-yellow-500',
    3: 'bg-blue-500',
    4: 'bg-green-500',
    5: 'bg-green-600',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2">Enter your new password</p>
        </div>

        <Card padding="lg">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Password Reset!</h3>
              <p className="text-gray-600 mb-6">
                Your password has been reset successfully. Redirecting to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <Alert variant="danger">{error}</Alert>}

              <Input
                type="password"
                name="password"
                label="New Password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                required
                icon={<FiLock />}
              />

              {/* Password Strength Indicator */}
              {formData.password && (
                <div>
                  <div className="flex gap-1 mb-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded ${
                          level <= passwordStrength.strength - 1
                            ? strengthColors[passwordStrength.strength]
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Password strength: <span className="font-medium">{passwordStrength.label}</span>
                  </p>
                </div>
              )}

              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                icon={<FiLock />}
              />

              <Button type="submit" variant="primary" fullWidth loading={loading}>
                Reset Password
              </Button>

              <div className="text-center">
                <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
