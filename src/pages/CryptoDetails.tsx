import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useCrypto } from '../context/CryptoContext'
import { formatCurrency, formatCompactCurrency } from '../utils/formatters'
import PriceChart from '../components/PriceChart'
import TimeframeSelector from '../components/TimeframeSelector'
import StatCard from '../components/StatCard'

interface CryptoDetailsData {
  id: string
  name: string
  symbol: string
  image: {
    large: string
  }
  market_data: {
    current_price: {
      [key: string]: number
    }
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_30d: number
    price_change_percentage_1y: number
    market_cap: {
      [key: string]: number
    }
    total_volume: {
      [key: string]: number
    }
    circulating_supply: number
    total_supply: number
    max_supply: number
  }
  description: {
    en: string
  }
}

const CryptoDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { getHistoricalData, selectedCurrency } = useCrypto()
  const [cryptoData, setCryptoData] = useState<CryptoDetailsData | null>(null)
  const [historicalData, setHistoricalData] = useState(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState(30)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
        setCryptoData(response.data)
        
        // Fetch historical data
        const data = await getHistoricalData(id as string, selectedTimeframe)
        setHistoricalData(data)
        
        setError(null)
      } catch (err) {
        console.error('Error fetching crypto details:', err)
        setError('Failed to fetch cryptocurrency details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCryptoDetails()
    }
  }, [id, selectedTimeframe, getHistoricalData])

  const handleTimeframeChange = async (days: number) => {
    setSelectedTimeframe(days)
    const data = await getHistoricalData(id as string, days)
    setHistoricalData(data)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Loading cryptocurrency details...</p>
      </div>
    )
  }

  if (error || !cryptoData) {
    return (
      <div className="bg-danger-light bg-opacity-10 p-4 rounded-md text-danger">
        <p>{error || 'Failed to load cryptocurrency details'}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center">
          <img src={cryptoData.image.large} alt={cryptoData.name} className="w-12 h-12 mr-4" />
          <div>
            <h1 className="text-2xl font-bold">{cryptoData.name} ({cryptoData.symbol.toUpperCase()})</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed analysis and historical data
            </p>
          </div>
        </div>
      </div>

      {/* Price Overview */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Current Price"
            value={formatCurrency(cryptoData.market_data.current_price[selectedCurrency], selectedCurrency)}
            change={cryptoData.market_data.price_change_percentage_24h}
          />
          <StatCard
            title="Market Cap"
            value={formatCompactCurrency(cryptoData.market_data.market_cap[selectedCurrency], selectedCurrency)}
          />
          <StatCard
            title="24h Trading Volume"
            value={formatCompactCurrency(cryptoData.market_data.total_volume[selectedCurrency], selectedCurrency)}
          />
          <StatCard
            title="Circulating Supply"
            value={`${cryptoData.market_data.circulating_supply.toLocaleString()} ${cryptoData.symbol.toUpperCase()}`}
          />
        </div>
      </div>

      {/* Price Performance */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Price Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="7 Days"
            value={`${cryptoData.market_data.price_change_percentage_7d >= 0 ? '+' : ''}${cryptoData.market_data.price_change_percentage_7d.toFixed(2)}%`}
            change={cryptoData.market_data.price_change_percentage_7d}
          />
          <StatCard
            title="30 Days"
            value={`${cryptoData.market_data.price_change_percentage_30d >= 0 ? '+' : ''}${cryptoData.market_data.price_change_percentage_30d.toFixed(2)}%`}
            change={cryptoData.market_data.price_change_percentage_30d}
          />
          <StatCard
            title="1 Year"
            value={`${cryptoData.market_data.price_change_percentage_1y >= 0 ? '+' : ''}${cryptoData.market_data.price_change_percentage_1y.toFixed(2)}%`}
            change={cryptoData.market_data.price_change_percentage_1y}
          />
        </div>
      </div>

      {/* Price Chart */}
      <div className="mb-8">
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-semibold">{cryptoData.name} Price Chart</h2>
            <TimeframeSelector
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={handleTimeframeChange}
            />
          </div>
          <div className="h-80">
            {historicalData ? (
              <PriceChart
                historicalData={historicalData}
                name={cryptoData.name}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Loading chart data...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">About {cryptoData.name}</h2>
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: cryptoData.description.en }}
          />
        </div>
      </div>

      {/* Supply Information */}
      <div className="mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Supply Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Circulating Supply</h3>
              <p className="text-lg font-semibold">
                {cryptoData.market_data.circulating_supply.toLocaleString()} {cryptoData.symbol.toUpperCase()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Supply</h3>
              <p className="text-lg font-semibold">
                {cryptoData.market_data.total_supply ? 
                  `${cryptoData.market_data.total_supply.toLocaleString()} ${cryptoData.symbol.toUpperCase()}` : 
                  'Not Available'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Max Supply</h3>
              <p className="text-lg font-semibold">
                {cryptoData.market_data.max_supply ? 
                  `${cryptoData.market_data.max_supply.toLocaleString()} ${cryptoData.symbol.toUpperCase()}` : 
                  'Not Available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoDetails