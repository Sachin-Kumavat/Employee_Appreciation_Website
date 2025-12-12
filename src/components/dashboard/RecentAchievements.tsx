import { Achievement } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { ArrowRight } from 'lucide-react';

interface RecentAchievementsProps {
  achievements: Achievement[];
  navigateTo: (page: any) => void;
  darkMode?: boolean;
}

export function RecentAchievements({ achievements, navigateTo, darkMode }: RecentAchievementsProps) {
  return (
    <div className={`${
      darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
    } border rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={darkMode ? 'text-white' : 'text-neutral-900'}>
          Recent Achievements
        </h3>
        <button
          onClick={() => navigateTo('achievements')}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border ${
              darkMode 
                ? 'border-neutral-700 hover:bg-neutral-700' 
                : 'border-neutral-100 hover:bg-neutral-50'
            } transition-colors cursor-pointer`}
            onClick={() => navigateTo('achievements')}
          >
            <div className="flex items-start gap-3">
              <img
                src={achievement.employeeAvatar}
                alt={achievement.employeeName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className={`${darkMode ? 'text-white' : 'text-neutral-900'} line-clamp-1`}>
                    {achievement.title}
                  </h4>
                  <StatusBadge status={achievement.status} />
                </div>
                <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'} line-clamp-2 mb-2`}>
                  {achievement.description}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className={darkMode ? 'text-neutral-400' : 'text-neutral-500'}>
                    {achievement.employeeName}
                  </span>
                  <span className={darkMode ? 'text-neutral-600' : 'text-neutral-300'}>•</span>
                  <span className={darkMode ? 'text-neutral-400' : 'text-neutral-500'}>
                    {new Date(achievement.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
