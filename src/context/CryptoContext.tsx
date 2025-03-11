import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

// Types
export interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  price_change_percentage_7d_in_currency?: number
  price_change_percentage_30d_in_currency?: number
  price_change_percentage_1y_in_currency?: number
}

export interface HistoricalData {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

interface CryptoContextType {
  cryptocurrencies: Cryptocurrency[]
  loading: boolean
  error: string | null
  searchTerm: string
  setSearchTerm: (term: string) => void
  filteredCryptocurrencies: Cryptocurrency[]
  getHistoricalData: (id: string, days: number) => Promise<HistoricalData | null>
  selectedCurrency: string
  setSelectedCurrency: (currency: string) => void
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined)

export const useCrypto = () => {
  const context = useContext(CryptoContext)
  if (!context) {
    throw new Error('useCrypto must be used within a CryptoProvider')
  }
  return context
}

interface CryptoProviderProps {
  children: ReactNode
}

// Mock data to use when API is rate limited
const mockCryptocurrencies: Cryptocurrency[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 61245.32,
    market_cap: 1203456789012,
    market_cap_rank: 1,
    price_change_percentage_24h: 2.35,
    price_change_percentage_7d_in_currency: 5.78,
    price_change_percentage_30d_in_currency: 12.45,
    price_change_percentage_1y_in_currency: 42.67
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3245.67,
    market_cap: 389012345678,
    market_cap_rank: 2,
    price_change_percentage_24h: 1.23,
    price_change_percentage_7d_in_currency: 3.45,
    price_change_percentage_30d_in_currency: 8.91,
    price_change_percentage_1y_in_currency: 32.45
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
    current_price: 567.89,
    market_cap: 87654321098,
    market_cap_rank: 3,
    price_change_percentage_24h: -0.45,
    price_change_percentage_7d_in_currency: 2.34,
    price_change_percentage_30d_in_currency: 5.67,
    price_change_percentage_1y_in_currency: 28.91
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 123.45,
    market_cap: 45678901234,
    market_cap_rank: 4,
    price_change_percentage_24h: 3.21,
    price_change_percentage_7d_in_currency: 7.89,
    price_change_percentage_30d_in_currency: 15.67,
    price_change_percentage_1y_in_currency: 45.67
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.45,
    market_cap: 15678901234,
    market_cap_rank: 5,
    price_change_percentage_24h: -1.23,
    price_change_percentage_7d_in_currency: -2.34,
    price_change_percentage_30d_in_currency: 4.56,
    price_change_percentage_1y_in_currency: 12.34
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 0.56,
    market_cap: 28901234567,
    market_cap_rank: 6,
    price_change_percentage_24h: 0.78,
    price_change_percentage_7d_in_currency: 1.23,
    price_change_percentage_30d_in_currency: 3.45,
    price_change_percentage_1y_in_currency: 9.87
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    current_price: 6.78,
    market_cap: 7890123456,
    market_cap_rank: 7,
    price_change_percentage_24h: -0.56,
    price_change_percentage_7d_in_currency: 1.45,
    price_change_percentage_30d_in_currency: 5.67,
    price_change_percentage_1y_in_currency: 15.67
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    current_price: 0.12,
    market_cap: 15678901234,
    market_cap_rank: 8,
    price_change_percentage_24h: 4.56,
    price_change_percentage_7d_in_currency: 8.90,
    price_change_percentage_30d_in_currency: 12.34,
    price_change_percentage_1y_in_currency: 23.45
  },
  {
    id: "avalanche-2",
    symbol: "avax",
    name: "Avalanche",
    image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    current_price: 34.56,
    market_cap: 11234567890,
    market_cap_rank: 9,
    price_change_percentage_24h: 2.34,
    price_change_percentage_7d_in_currency: 5.67,
    price_change_percentage_30d_in_currency: 9.87,
    price_change_percentage_1y_in_currency: 21.34
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    current_price: 13.45,
    market_cap: 7123456789,
    market_cap_rank: 10,
    price_change_percentage_24h: 1.23,
    price_change_percentage_7d_in_currency: 3.45,
    price_change_percentage_30d_in_currency: 7.89,
    price_change_percentage_1y_in_currency: 18.90
  }
];

// Mock historical data
const generateMockHistoricalData = (days: number): HistoricalData => {
  const prices: [number, number][] = [];
  const market_caps: [number, number][] = [];
  const total_volumes: [number, number][] = [];
  
  const now = Date.now();
  const dayInMs = 86400000;
  let basePrice = 50000 + Math.random() * 10000;
  let baseMarketCap = 1000000000000;
  let baseVolume = 50000000000;
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - (i * dayInMs);
    
    // Add some randomness to create realistic looking price movements
    const change = (Math.random() - 0.5) * 0.05; // -2.5% to +2.5% daily change
    basePrice = basePrice * (1 + change);
    baseMarketCap = baseMarketCap * (1 + change);
    baseVolume = baseVolume * (1 + Math.random() * 0.2 - 0.1);
    
    prices.push([timestamp, basePrice]);
    market_caps.push([timestamp, baseMarketCap]);
    total_volumes.push([timestamp, baseVolume]);
  }
  
  return { prices, market_caps, total_volumes };
};

export const CryptoProvider = ({ children }: CryptoProviderProps) => {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('usd')

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d,30d,1y`,
          { timeout: 10000 } // Add timeout to prevent hanging requests
        )
        setCryptocurrencies(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching cryptocurrency data:', err)
        // Use mock data when API fails
        setCryptocurrencies(mockCryptocurrencies)
        setError('Using demo data due to API rate limits. Real API data would be used in production.')
      } finally {
        setLoading(false)
      }
    }

    fetchCryptocurrencies()
  }, [selectedCurrency])

  const getHistoricalData = async (id: string, days: number): Promise<HistoricalData | null> => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${selectedCurrency}&days=${days}`,
        { timeout: 10000 } // Add timeout to prevent hanging requests
      )
      return response.data
    } catch (err) {
      console.error('Error fetching historical data:', err)
      // Return mock historical data when API fails
      return generateMockHistoricalData(days)
    }
  }

  const filteredCryptocurrencies = cryptocurrencies.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <CryptoContext.Provider
      value={{
        cryptocurrencies,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        filteredCryptocurrencies,
        getHistoricalData,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </CryptoContext.Provider>
  )
}