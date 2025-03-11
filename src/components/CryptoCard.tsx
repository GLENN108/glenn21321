import { Link } from 'react-router-dom'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import { Cryptocurrency } from '../context/CryptoContext'
import { formatCurrency, formatCompactCurrency } from '../utils/formatters'
import { useCrypto } from '../context/CryptoContext'

interface CryptoCardProps {
  crypto: Cryptocurrency
}

const CryptoCard = ({ crypto }: CryptoCardProps) => {
  const { selectedCurrency } = useCrypto()
  const priceChangeColor = crypto.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'

  return (
    <Link to={`/crypto/${crypto.id}`} className="block group">
      <div className="card hover:shadow-neon transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={crypto.image} alt={crypto.name} className="w-10 h-10 mr-3 animate-float" />
            <div>
              <h3 className="font-semibold">{crypto.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">{crypto.symbol}</p>
            </div>
          </div>
          <div className="text-sm bg-gray-100 dark:bg-dark-light px-2 py-1 rounded-full">
            Rank #{crypto.market_cap_rank}
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold font-mono">{formatCurrency(crypto.current_price, selectedCurrency)}</p>
            <p className={`${priceChangeColor} text-sm font-medium flex items-center`}>
              {crypto.price_change_percentage_24h >= 0 ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
            <p className="font-medium">{formatCompactCurrency(crypto.market_cap, selectedCurrency)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CryptoCard