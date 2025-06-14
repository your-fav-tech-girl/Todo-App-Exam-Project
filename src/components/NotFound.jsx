import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 text-center">
    <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
    <p className="text-xl text-red-700 mb-6">Page not found</p>
    <Link
      to="/"
      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-500"
    >
      Back to Home
    </Link>
  </div>
);

export default NotFound;

