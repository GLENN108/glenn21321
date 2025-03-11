import { useEffect, useState } from 'react';
import { useCrypto } from '../context/CryptoContext';

const PriceTicker = () => {
  const { cryptocurrencies } = useCrypto();
  const [tickerItems, setTickerItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (cryptocurrencies.length > 0) {
      const items = cryptocurrencies.slice(0, 15).map((crypto) => {
        const priceChangeColor = crypto.price_change_percentage_24h >= 0 
          ? 'text-success' 
          : 'text-danger';
        
        return (
          <div key={crypto.id} className="inline-flex items-center mx-4">
            <img src={crypto.image} alt={crypto.name} className="w-5 h-5 mr-2" />
            <span className="font-medium mr-1">{crypto.symbol.toUpperCase()}</span>
            <span>${crypto.current_price.toLocaleString()}</span>
            <span className={`ml-1 ${priceChangeColor}`}>
              {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        );
      });
      
      setTickerItems(items);
    }
  }, [cryptocurrencies]);

  if (tickerItems.length === 0) {
    return null;
  }

  return (
    <div className="ticker-container bg-gray-100 dark:bg-dark-lighter py-2 border-y border-gray-200 dark:border-gray-800">
      <div className="ticker">
        {tickerItems}
        {/* Duplicate items to ensure smooth looping */}
        {tickerItems}
      </div>
    </div>
  );
};

export default PriceTicker;