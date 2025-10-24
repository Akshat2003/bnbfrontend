import { useNavigate, useRouteError } from 'react-router-dom';
import { FaExclamationCircle, FaHome, FaRedo } from 'react-icons/fa';

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <FaExclamationCircle className="w-24 h-24 mx-auto text-red-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-4">
            We're sorry, but something unexpected happened. Please try again or go back to the homepage.
          </p>
          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg text-left">
              <p className="text-sm font-medium text-red-800 mb-1">Error Details:</p>
              <p className="text-xs text-red-700">{error.statusText || error.message}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FaRedo className="w-5 h-5" />
            Try Again
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <FaHome className="w-5 h-5" />
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
