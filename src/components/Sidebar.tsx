import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  ChartBarIcon, 
  BookOpenIcon, 
  XMarkIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Compare', href: '/compare', icon: ChartBarIcon },
    { name: 'Education', href: '/education', icon: BookOpenIcon },
  ]

  return (
    <>
      {/* Overlay and Sidebar */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop with blur */}
        <div
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-dark-lighter shadow-xl transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <span className="text-2xl font-bold neon-text">Cryptoverse</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-light transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-primary text-white shadow-neon'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-light'
                  } group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-300`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`${
                      location.pathname === item.href
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                    } mr-4 h-6 w-6 transition-colors duration-300`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="glass rounded-lg p-4 space-y-3 animated-border">
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-sm">Market Status</h3>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div className="flex justify-between">
                    <span>BTC Dominance:</span>
                    <span className="font-medium">48.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Cap:</span>
                    <span className="font-medium">$1.67T</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24h Volume:</span>
                    <span className="font-medium">$78.5B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar