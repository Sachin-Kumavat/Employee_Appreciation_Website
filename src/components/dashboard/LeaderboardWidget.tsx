import { Trophy } from 'lucide-react';
import { topContributors } from '../../data/mockData';

interface LeaderboardWidgetProps {
  darkMode?: boolean;
  navigateTo: (page: any) => void;
}

export function LeaderboardWidget({ darkMode, navigateTo }: LeaderboardWidgetProps) {
  return (
    <div className={`${
      darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
    } border rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={darkMode ? 'text-white' : 'text-neutral-900'}>
          Top Contributors
        </h3>
        <Trophy className="w-5 h-5 text-yellow-500" />
      </div>
      <div className="space-y-3">
        {topContributors.map((contributor, index) => (
          <div
            key={contributor.name}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-50'
            } transition-colors cursor-pointer`}
            onClick={() => navigateTo('profile')}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              index === 0
                ? 'bg-yellow-100 text-yellow-700'
                : index === 1
                ? 'bg-gray-100 text-gray-700'
                : index === 2
                ? 'bg-orange-100 text-orange-700'
                : darkMode
                ? 'bg-neutral-700 text-neutral-300'
                : 'bg-neutral-100 text-neutral-600'
            }`}>
              {index + 1}
            </div>
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <p className={darkMode ? 'text-white' : 'text-neutral-900'}>
                {contributor.name}
              </p>
              <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {contributor.recognitions} recognitions
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
