import { useState } from 'react';
import { Filter, TrendingUp, Users, Bookmark } from 'lucide-react';
import { mockAppreciations } from '../data/mockData';
import { FeedItem } from '../components/feed/FeedItem';

interface FeedPageProps {
  darkMode?: boolean;
}

export function FeedPage({ darkMode }: FeedPageProps) {
  const [filter, setFilter] = useState<'all' | 'department' | 'following' | 'trending'>('all');
  const [appreciations] = useState(mockAppreciations);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={darkMode ? 'text-white' : 'text-neutral-900'}>
          Appreciation Feed
        </h1>
        <p className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600'} mt-1`}>
          Celebrate your colleagues and their achievements
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={`${
        darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
      } border rounded-xl p-4`}>
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className={`w-5 h-5 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
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
            onClick={() => setFilter('department')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              filter === 'department'
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Users className="w-4 h-4" />
            My Department
          </button>
          <button
            onClick={() => setFilter('trending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              filter === 'trending'
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>
          <button
            onClick={() => setFilter('following')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              filter === 'following'
                ? 'bg-blue-600 text-white shadow-sm'
                : darkMode
                ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Bookmarked
          </button>
        </div>
      </div>

      {/* Feed Items */}
      <div className="space-y-4">
        {appreciations.map((appreciation) => (
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

      {/* Load More */}
      <div className="text-center py-6">
        <button className={`px-6 py-3 rounded-lg ${
          darkMode 
            ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700' 
            : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
        } transition-colors`}>
          Load More
        </button>
      </div>
    </div>
  );
}
