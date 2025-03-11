import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import PriceTicker from './PriceTicker'
import { useState } from 'react'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark transition-colors duration-300">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex flex-col min-h-screen">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <PriceTicker />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 grid-bg">
          <div className="container mx-auto animate-slide-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout