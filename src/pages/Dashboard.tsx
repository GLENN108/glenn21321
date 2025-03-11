import { useState, useEffect } from 'react'
import { useCrypto } from '../context/CryptoContext'
import CryptoCard from '../components/CryptoCard'
import PriceChart from '../components/PriceChart'
import TimeframeSelector from '../components/TimeframeSelector'
import StatCard from '../components/StatCard'
import { 
  ChartPieIcon, 
  ArrowsRightLeftIcon, 
  CubeIcon, 
  Square3Stack3DIcon 
} from '@heroicons/react/24/outline'
import { formatCurrency, formatCompactCurrency } from '../utils/formatters'

const Dashboard = () => {
  const { filteredCryptocurrencies, loading, error, getHistoricalData, selectedCurrency } = useCrypto()
  const [selectedTimeframe, setSelectedTimeframe] = useState(30)
  const [historicalData, setHistoricalData] = useState(null)
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin')

  // Get top 4 cryptocurrencies
  const topCryptos = filteredCryptocurrencies.slice(0, 4)

  // Load Bitcoin data by default
  useEffect(() => {
    const loadBitcoinData = async () => {
      if (filteredCryptocurrencies.length > 0) {
        const data = await getHistoricalData('bitcoin', selectedTimeframe)
        setHistoricalData(data)
        setSelectedCrypto('bitcoin')
      }
    }
    
    loadBitcoinData()
  }, [filteredCryptocurrencies, getHistoricalData, selectedTimeframe])

  // Handle crypto selection for the main chart
  const handleCryptoSelect = async (id: string) => {
    const data = await getHistoricalData(id, selectedTimeframe)
    setHistoricalData(data)
    setSelectedCrypto(id)
  }

  // Handle timeframe change
  const handleTimeframeChange = async (days: number) => {
    setSelectedTimeframe(days)
    const data = await getHistoricalData(selectedCrypto, days)
    setHistoricalData(data)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-6 bg-gray-200 dark:bg-dark-lighter rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-4">
                <div className="h-24 bg-gray-200 dark:bg-dark-lighter rounded col-span-1"></div>
                <div className="h-24 bg-gray-200 dark:bg-dark-lighter rounded col-span-1"></div>
                <div className="h-24 bg-gray-200 dark:bg-dark-lighter rounded col-span-1"></div>
                <div className="h-24 bg-gray-200 dark:bg-dark-lighter rounded col-span-1"></div>
              </div>
              <div className="h-64 bg-gray-200 dark:bg-dark-lighter rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-danger-light bg-opacity-10 p-6 rounded-lg border border-danger border-opacity-20 text-danger animate-fade-in">
        <p className="font-medium">{error}</p>
      </div>
    )
  }

  // Find the selected crypto object
  const cryptoData = filteredCryptocurrencies.find(crypto => crypto.id === selectedCrypto)

  return (
    <div className="stagger-children">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-neon-blue bg-clip-text text-transparent">Cryptocurrency Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and analyze cryptocurrency market trends with comprehensive historical data
        </p>
      </div>

      {/* Market Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 p-1.5 rounded-md mr-2">
            <ChartPieIcon className="h-5 w-5 text-primary" />
          </span>
          Market Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Market Cap"
            value="$1.67T"
            change={-2.34}
            icon={<ChartPieIcon className="h-5 w-5" />}
          />
          <StatCard
            title="24h Trading Volume"
            value="$78.5B"
            change={5.67}
            icon={<ArrowsRightLeftIcon className="h-5 w-5" />}
          />
          <StatCard
            title="BTC Dominance"
            value="48.2%"
            change={-0.54}
            icon={<CubeIcon className="h-5 w-5" />}
          />
          <StatCard
            title="Active Cryptocurrencies"
            value="10,482"
            icon={<Square3Stack3DIcon className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Main Chart */}
      <div className="mb-8">
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              {cryptoData && (
                <img src={cryptoData.image} alt={cryptoData.name} className="w-6 h-6 mr-2" />
              )}
              {cryptoData ? cryptoData.name : 'Bitcoin'} Price Chart
            </h2>
            <TimeframeSelector
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={handleTimeframeChange}
            />
          </div>
          <div className="h-80">
            {historicalData ? (
              <PriceChart
                historicalData={historicalData}
                name={cryptoData ? cryptoData.name : 'Bitcoin'}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-dark-light rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-dark-light rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-dark-light rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Cryptocurrencies */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 p-1.5 rounded-md mr-2">
            <CubeIcon className="h-5 w-5 text-primary" />
          </span>
          Top Cryptocurrencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topCryptos.map((crypto) => (
            <div key={crypto.id} onClick={() => handleCryptoSelect(crypto.id)}>
              <CryptoCard crypto={crypto} />
            </div>
          ))}
        </div>
      </div>

      {/* All Cryptocurrencies */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <span className="bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 p-1.5 rounded-md mr-2">
              <Square3Stack3DIcon className="h-5 w-5 text-primary" />
            </span>
            All Cryptocurrencies
          </h2>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-dark-lighter">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  24h %
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-lighter divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCryptocurrencies.slice(0, 10).map((crypto) => (
                <tr 
                  key={crypto.id} 
                  className="hover:bg-gray-50 dark:hover:bg-dark-light cursor-pointer transition-colors duration-200"
                  onClick={() => handleCryptoSelect(crypto.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {crypto.market_cap_rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-8 w-8 rounded-full" src={crypto.image} alt={crypto.name} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {crypto.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                          {crypto.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                    {formatCurrency(crypto.current_price, selectedCurrency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${crypto.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'} flex items-center`}>
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      )}
                      {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatCompactCurrency(crypto.market_cap, selectedCurrency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard