import { CalendarIcon } from '@heroicons/react/24/outline'

interface TimeframeSelectorProps {
  selectedTimeframe: number
  setSelectedTimeframe: (days: number) => void
}

const TimeframeSelector = ({ selectedTimeframe, setSelectedTimeframe }: TimeframeSelectorProps) => {
  const timeframes = [
    { label: '24h', value: 1 },
    { label: '7d', value: 7 },
    { label: '30d', value: 30 },
    { label: '90d', value: 90 },
    { label: '1y', value: 365 },
    { label: '5y', value: 1825 },
  ]

  return (
    <div className="flex items-center space-x-2 mb-4">
      <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      <div className="flex space-x-1">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe.value}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
              selectedTimeframe === timeframe.value
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 dark:bg-dark-light text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-lighter'
            }`}
            onClick={() => setSelectedTimeframe(timeframe.value)}
          >
            {timeframe.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimeframeSelector