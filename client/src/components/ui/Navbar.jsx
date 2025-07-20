import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { HomeIcon, PlusIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="flex items-center text-white hover:text-accent-400 transition-colors"
            >
              <HomeIcon className="h-6 w-6 mr-2" />
              <span className="font-medium">TaskForge</span>
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">
                Welcome, {user.username}
              </span>
              <button
                onClick={logout}
                className="flex items-center text-gray-300 hover:text-red-400 transition-colors"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar