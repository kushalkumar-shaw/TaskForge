import { Outlet } from 'react-router-dom'
import Navbar from './ui/Navbar'
import { useAuth } from '../context/AuthContext'

const Layout = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Navbar />}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
      <footer className="py-4 text-center text-gray-500 text-sm">
        TaskForge © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Layout