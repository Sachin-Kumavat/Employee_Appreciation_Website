import { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, ThumbsUp, Zap } from 'lucide-react';
import { Appreciation } from '../../types';

interface FeedItemProps {
  appreciation: Appreciation;
  compact?: boolean;
  darkMode?: boolean;
}

export function FeedItem({ appreciation, compact = false, darkMode }: FeedItemProps) {
  const [userReaction, setUserReaction] = useState(appreciation.userReaction);
  const [isBookmarked, setIsBookmarked] = useState(appreciation.isBookmarked);
  const [reactions, setReactions] = useState(appreciation.reactions);

  const handleReaction = (type: 'like' | 'clap' | 'celebrate') => {
    if (userReaction === type) {
      setUserReaction(undefined);
      setReactions(prev => ({ ...prev, [type]: prev[type] - 1 }));
    } else {
      if (userReaction) {
        setReactions(prev => ({ ...prev, [userReaction]: prev[userReaction] - 1 }));
      }
      setUserReaction(type);
      setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const totalReactions = reactions.like + reactions.clap + reactions.celebrate;

  return (
    <div className={`${compact ? '' : 'p-6'} ${
      darkMode ? 'border-neutral-700' : 'border-neutral-100'
    } ${!compact && 'border rounded-xl'}`}>
      <div className="flex items-start gap-3">
        <img
          src={appreciation.senderAvatar}
          alt={appreciation.senderName}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <p className={darkMode ? 'text-white' : 'text-neutral-900'}>
              <span className="font-medium">{appreciation.senderName}</span>
              <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}> appreciated </span>
              {appreciation.receiverNames.map((name, index) => (
                <span key={index}>
                  <span className="font-medium text-blue-600">{name}</span>
                  {index < appreciation.receiverNames.length - 1 && ', '}
                </span>
              ))}
            </p>
            <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {formatTimeAgo(appreciation.timestamp)}
            </p>
          </div>
          
          <p className={`${darkMode ? 'text-neutral-300' : 'text-neutral-700'} mb-3`}>
            {appreciation.message}
          </p>

          {/* Reaction Buttons */}
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => handleReaction('like')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                userReaction === 'like'
                  ? 'bg-blue-100 text-blue-600'
                  : darkMode
                  ? 'hover:bg-neutral-700 text-neutral-400'
                  : 'hover:bg-neutral-100 text-neutral-600'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{reactions.like}</span>
            </button>
            
            <button
              onClick={() => handleReaction('clap')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                userReaction === 'clap'
                  ? 'bg-green-100 text-green-600'
                  : darkMode
                  ? 'hover:bg-neutral-700 text-neutral-400'
                  : 'hover:bg-neutral-100 text-neutral-600'
              }`}
            >
              <span className="text-sm">👏</span>
              <span className="text-sm">{reactions.clap}</span>
            </button>
            
            <button
              onClick={() => handleReaction('celebrate')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                userReaction === 'celebrate'
                  ? 'bg-yellow-100 text-yellow-600'
                  : darkMode
                  ? 'hover:bg-neutral-700 text-neutral-400'
                  : 'hover:bg-neutral-100 text-neutral-600'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm">{reactions.celebrate}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 text-sm">
            <button className={`flex items-center gap-1.5 ${
              darkMode ? 'text-neutral-400 hover:text-neutral-300' : 'text-neutral-600 hover:text-neutral-900'
            } transition-colors`}>
              <MessageCircle className="w-4 h-4" />
              <span>{appreciation.commentCount} comments</span>
            </button>
            
            <button className={`flex items-center gap-1.5 ${
              darkMode ? 'text-neutral-400 hover:text-neutral-300' : 'text-neutral-600 hover:text-neutral-900'
            } transition-colors`}>
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'text-blue-600'
                  : darkMode
                  ? 'text-neutral-400 hover:text-neutral-300'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
