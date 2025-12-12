import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  color: 'blue' | 'green' | 'orange' | 'purple';
  darkMode?: boolean;
  onClick?: () => void;
}

export function StatCard({ title, value, icon, trend, color, darkMode, onClick }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  const darkColorClasses = {
    blue: 'bg-blue-900 text-blue-300',
    green: 'bg-green-900 text-green-300',
    orange: 'bg-orange-900 text-orange-300',
    purple: 'bg-purple-900 text-purple-300',
  };

  return (
    <div
      onClick={onClick}
      className={`${
        darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
      } border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${darkMode ? darkColorClasses[color] : colorClasses[color]}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isPositive ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      <h3 className={`text-3xl ${darkMode ? 'text-white' : 'text-neutral-900'} mb-1`}>
        {value}
      </h3>
      <p className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>{title}</p>
    </div>
  );
}
