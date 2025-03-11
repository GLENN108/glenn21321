import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCrypto } from '../context/CryptoContext'
import ThemeToggle from './ThemeToggle'
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline'

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void
}

const Navbar = ({ setSidebarOpen }: NavbarProps) => {
  const { searchTerm, setSearchTerm, selectedCurrency, setSelectedCurrency } = useCrypto()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-30 bg-white dark:bg-dark backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 ${
        scrolled ? 'shadow-md' : ''
      } transition-all duration-300`}
    >
      <div className="px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Sidebar and Search */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="h-10 w-10 flex items-center justify-center rounded-lg bg-white dark:bg-dark-lighter border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-light transition-colors duration-200"
            >
              <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="w-64">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search cryptocurrencies..."
                  className="w-full h-10 pl-10 pr-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-lighter text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Center section - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold neon-text tracking-tight">
                Cryptoverse
              </span>
            </Link>
          </div>

          {/* Right section - Currency and Theme */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-lighter text-sm appearance-none cursor-pointer"
            >
              <option value="usd">USD</option>
              <option value="inr">INR</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
              <option value="jpy">JPY</option>
            </select>
            <div className="h-10 flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar