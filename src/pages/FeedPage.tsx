import { useState } from 'react';
import { Filter, FileText } from 'lucide-react';
import { mockAppreciations, mockAchievements } from '../data/mockData';
import { FeedItem } from '../components/feed/FeedItem';
import { StatusBadge } from '../components/ui/StatusBadge';

interface FeedPageProps {
  darkMode?: boolean;
}

export function FeedPage({ darkMode }: FeedPageProps) {
  const [filter, setFilter] = useState<'all' | 'achievements' | 'peer'>('all');

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 py-6 space-y-6"> {/* Full width with padding */}
      {/* Header */}
      <div>
        <h1 className={darkMode ? 'text-white' : 'text-neutral-900'}>
          Spotlight Feed
        </h1>
        <p className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600'} mt-1`}>
          Celebrate your colleagues and their achievements
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        className={`${
          darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
        } border rounded-xl p-4`}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className={`w-5 h-5 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />

          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            All Posts
          </button>

          <button
            onClick={() => setFilter('achievements')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'achievements'
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Achievements
          </button>

          <button
            onClick={() => setFilter('peer')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'peer'
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Peer Appreciation
          </button>
        </div>
      </div>

      {/* ================================
          ACHIEVEMENTS VIEW
      ================================= */}
      {(filter === 'all' || filter === 'achievements') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <img
                    src={achievement.employeeAvatar}
                    alt={achievement.employeeName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-neutral-900 mb-1 line-clamp-2">{achievement.title}</h3>
                    <p className="text-sm text-neutral-600">
                      {achievement.employeeName} • {achievement.department}
                    </p>
                  </div>
                </div>
                <StatusBadge status={achievement.status} />
              </div>

              <p className="text-neutral-700 mb-4 line-clamp-3">{achievement.description}</p>

              {achievement.proofUrl && (
                <div className="mb-4">
                  <div className="relative h-32 bg-neutral-100 rounded-lg overflow-hidden">
                    {achievement.proofType === 'image' ? (
                      <img
                        src={achievement.proofUrl}
                        alt="Proof"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileText className="w-8 h-8 text-neutral-400" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div className="text-sm text-neutral-600">
                  {new Date(achievement.date).toLocaleDateString()} • {achievement.points} points
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================================
          PEER APPRECIATION VIEW
      ================================= */}
      {(filter === 'all' || filter === 'peer') && (
        <div className="space-y-4 mt-6">
          {mockAppreciations.map((appreciation) => (
            <div
              key={appreciation.id}
              className={`${
                darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
              } border rounded-xl overflow-hidden`}
            >
              <FeedItem appreciation={appreciation} darkMode={darkMode} />
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      <div className="text-center py-6">
        <button
          className={`px-6 py-3 rounded-lg ${
            darkMode
              ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
              : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
          } transition-colors`}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
