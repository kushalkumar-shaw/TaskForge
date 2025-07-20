import { Link } from 'react-router-dom'
import { FaceFrownIcon } from '@heroicons/react/24/outline'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <FaceFrownIcon className="h-16 w-16 text-gray-400 mb-4" />
      <h1 className="text-4xl font-bold text-gray-100 mb-2">404</h1>
      <h2 className="text-2xl font-medium text-gray-300 mb-6">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-accent-600 hover:bg-accent-700 rounded-md transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}

export default NotFound