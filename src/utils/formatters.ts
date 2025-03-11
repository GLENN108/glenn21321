export const getCurrencySymbol = (currency: string): string => {
  const symbols: { [key: string]: string } = {
    usd: '$',
    inr: '₹',
    eur: '€',
    gbp: '£',
    jpy: '¥'
  };
  return symbols[currency.toLowerCase()] || '$';
};

export const formatCurrency = (amount: number, currency: string): string => {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${amount.toLocaleString()}`;
};

export const formatCompactCurrency = (amount: number, currency: string): string => {
  const symbol = getCurrencySymbol(currency);
  if (amount >= 1e9) {
    return `${symbol}${(amount / 1e9).toFixed(2)}B`;
  } else if (amount >= 1e6) {
    return `${symbol}${(amount / 1e6).toFixed(2)}M`;
  } else if (amount >= 1e3) {
    return `${symbol}${(amount / 1e3).toFixed(2)}K`;
  }
  return `${symbol}${amount.toFixed(2)}`;
}; 