import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { format } from 'date-fns'
import { HistoricalData } from '../context/CryptoContext'
import { useTheme } from '../context/ThemeContext'
import { useCrypto } from '../context/CryptoContext'
import { formatCurrency } from '../utils/formatters'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface PriceChartProps {
  historicalData: HistoricalData | null
  name: string
  color?: string
  isCompare?: boolean
}

const PriceChart = ({ historicalData, name, color = '#7c3aed', isCompare = false }: PriceChartProps) => {
  const [chartData, setChartData] = useState<any>(null)
  const { darkMode } = useTheme()
  const { selectedCurrency } = useCrypto()

  useEffect(() => {
    if (historicalData) {
      const labels = historicalData.prices.map(([timestamp]) => {
        const date = new Date(timestamp)
        return format(date, 'MMM d')
      })

      const prices = historicalData.prices.map(([, price]) => price)

      setChartData({
        labels,
        datasets: [
          {
            label: `${name} Price`,
            data: prices,
            borderColor: color,
            backgroundColor: `${color}20`,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.4,
            fill: !isCompare,
          },
        ],
      })
    }
  }, [historicalData, name, color, isCompare])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: isCompare,
        position: 'top' as const,
        labels: {
          color: darkMode ? '#e5e7eb' : '#374151',
          font: {
            family: "'Inter', sans-serif",
          }
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: darkMode ? 'rgba(26, 32, 44, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: darkMode ? '#e5e7eb' : '#374151',
        bodyColor: darkMode ? '#e5e7eb' : '#374151',
        borderColor: darkMode ? 'rgba(124, 58, 237, 0.5)' : 'rgba(124, 58, 237, 0.5)',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        titleFont: {
          family: "'Inter', sans-serif",
          weight: 'bold'
        },
        bodyFont: {
          family: "'Inter', sans-serif"
        },
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${formatCurrency(context.parsed.y, selectedCurrency)}`
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            family: "'Inter', sans-serif",
          }
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.6)',
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            family: "'Inter', sans-serif",
          },
          callback: function(value: any) {
            return formatCurrency(value, selectedCurrency)
          }
        }
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    elements: {
      line: {
        borderJoinStyle: 'round' as const,
      }
    },
    hover: {
      animationDuration: 0
    },
  }

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-64">
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
    )
  }

  return (
    <div className="chart-container animate-fade-in">
      <Line data={chartData} options={options} />
    </div>
  )
}

export default PriceChart