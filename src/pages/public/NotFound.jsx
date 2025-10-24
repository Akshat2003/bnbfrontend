import { Link } from 'react-router-dom';
import { Button } from '@components/common';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or
          deleted.
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Link to="/">
            <Button variant="primary" icon={<FiHome />} iconPosition="left">
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            icon={<FiArrowLeft />}
            iconPosition="left"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>

        <div className="mt-12">
          <img
            src="https://illustrations.popsy.co/amber/page-not-found.svg"
            alt="404 illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
