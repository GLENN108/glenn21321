import { useState, useEffect } from 'react'
import { useCrypto } from '../context/CryptoContext'
import PriceChart from '../components/PriceChart'
import TimeframeSelector from '../components/TimeframeSelector'

const Compare = () => {
  const { cryptocurrencies, getHistoricalData } = useCrypto()
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>(['bitcoin', 'ethereum'])
  const [historicalData, setHistoricalData] = useState<{[key: string]: any}>({})
  const [selectedTimeframe, setSelectedTimeframe] = useState(30)
  const [loading, setLoading] = useState(true)

  const colors = ['#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#3b82f6']

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true)
      const dataPromises = selectedCryptos.map(id => getHistoricalData(id, selectedTimeframe))
      const results = await Promise.all(dataPromises)
      
      const newHistoricalData: {[key: string]: any} = {}
      selectedCryptos.forEach((id, index) => {
        newHistoricalData[id] = results[index]
      })
      
      setHistoricalData(newHistoricalData)
      setLoading(false)
    }

    if (selectedCryptos.length > 0) {
      fetchHistoricalData()
    }
  }, [selectedCryptos, selectedTimeframe, getHistoricalData])

  const handleTimeframeChange = (days: number) => {
    setSelectedTimeframe(days)
  }

  const handleCryptoSelect = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const newSelectedCryptos = [...selectedCryptos]
    newSelectedCryptos[index] = e.target.value
    setSelectedCryptos(newSelectedCryptos)
  }

  const addComparison = () => {
    if (selectedCryptos.length < 5) {
      // Find a crypto that's not already selected
      const availableCryptos = cryptocurrencies.filter(crypto => !selectedCryptos.includes(crypto.id))
      if (availableCryptos.length > 0) {
        setSelectedCryptos([...selectedCryptos, availableCryptos[0].id])
      }
    }
  }

  const removeComparison = (index: number) => {
    if (selectedCryptos.length > 2) {
      const newSelectedCryptos = [...selectedCryptos]
      newSelectedCryptos.splice(index, 1)
      setSelectedCryptos(newSelectedCryptos)
    }
  }

  // Prepare data for the chart
  const chartDatasets = selectedCryptos.map((cryptoId, index) => {
    const crypto = cryptocurrencies.find(c => c.id === cryptoId)
    return {
      id: cryptoId,
      name: crypto?.name || cryptoId,
      color: colors[index % colors.length],
      data: historicalData[cryptoId]
    }
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Compare Cryptocurrencies</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Compare price performance of different cryptocurrencies over time
        </p>
      </div>

      {/* Comparison Controls */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold mb-4 md:mb-0">Select Cryptocurrencies to Compare</h2>
          <TimeframeSelector
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={handleTimeframeChange}
          />
        </div>

        <div className="space-y-4">
          {selectedCryptos.map((cryptoId, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></div>
              <select
                value={cryptoId}
                onChange={(e) => handleCryptoSelect(e, index)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {cryptocurrencies.map(crypto => (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name} ({crypto.symbol.toUpperCase()})
                  </option>
                ))}
              </select>
              {selectedCryptos.length > 2 && (
                <button
                  onClick={() => removeComparison(index)}
                  className="p-2 text-gray-500 hover:text-danger"
                  aria-label="Remove comparison"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))}

          {selectedCryptos.length < 5 && (
            <button
              onClick={addComparison}
              className="flex items-center text-primary hover:text-primary-dark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Add Cryptocurrency
            </button>
          )}
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Price Comparison</h2>
        <div className="h-96">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading comparison data...</p>
            </div>
          ) : (
            <div className="relative h-full">
              {chartDatasets.map((dataset, index) => (
                dataset.data && (
                  <div key={dataset.id} className="absolute inset-0">
                    <PriceChart
                      historicalData={dataset.data}
                      name={dataset.name}
                      color={dataset.color}
                      isCompare={true}
                    />
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Insights */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Comparison Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedCryptos.map((cryptoId, index) => {
            const crypto = cryptocurrencies.find(c => c.id === cryptoId)
            if (!crypto) return null
            
            return (
              <div key={cryptoId} className="card">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: colors[index % colors.length] }}></div>
                  <h3 className="text-lg font-semibold">{crypto.name}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Current Price:</span>
                    <span className="font-medium">${crypto.current_price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">24h Change:</span>
                    <span className={`font-medium ${crypto.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}`}>
                      {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">7d Change:</span>
                    <span className={`font-medium ${crypto.price_change_percentage_7d_in_currency && crypto.price_change_percentage_7d_in_currency >= 0 ? 'text-success' : 'text-danger'}`}>
                      {crypto.price_change_percentage_7d_in_currency && crypto.price_change_percentage_7d_in_currency >= 0 ? '+' : ''}
                      {crypto.price_change_percentage_7d_in_currency?.toFixed(2) || 'N/A'}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Market Cap:</span>
                    <span className="font-medium">${(crypto.market_cap / 1000000000).toFixed(2)}B</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Compare