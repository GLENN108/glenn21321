import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  return (
    <div className="card group hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {icon && <div className="text-primary dark:text-primary-light">{icon}</div>}
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold font-mono">{value}</p>
        {change !== undefined && (
          <p
            className={`ml-2 text-sm font-medium flex items-center ${
              change >= 0 ? 'text-success' : 'text-danger'
            }`}
          >
            {change >= 0 ? (
              <ArrowUpIcon className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownIcon className="h-3 w-3 mr-1" />
            )}
            {Math.abs(change).toFixed(2)}%
          </p>
        )}
      </div>
    </div>
  )
}

export default StatCard