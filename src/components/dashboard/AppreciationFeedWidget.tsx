import { Appreciation } from '../../types';
import { FeedItem } from '../feed/FeedItem';
import { ArrowRight } from 'lucide-react';

interface AppreciationFeedWidgetProps {
  appreciations: Appreciation[];
  navigateTo: (page: any) => void;
  darkMode?: boolean;
}

export function AppreciationFeedWidget({ appreciations, navigateTo, darkMode }: AppreciationFeedWidgetProps) {
  return (
    <div className={`${
      darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
    } border rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={darkMode ? 'text-white' : 'text-neutral-900'}>
          Recent Appreciation Feed
        </h3>
        <button
          onClick={() => navigateTo('feed')}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          View Full Feed
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4">
        {appreciations.map((appreciation) => (
          <FeedItem key={appreciation.id} appreciation={appreciation} compact darkMode={darkMode} />
        ))}
      </div>
    </div>
  );
}
