import { X, Sparkles } from 'lucide-react';
import { Badge } from '../../types';
import { Button } from '../ui/Button';

interface BadgeUnlockModalProps {
  badge: Badge;
  onClose: () => void;
}

export function BadgeUnlockModal({ badge, onClose }: BadgeUnlockModalProps) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="relative">
          {/* Confetti Background Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
            ))}
          </div>

          {/* Modal Content */}
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-500 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              {/* Badge Icon with Animation */}
              <div className="mb-6 animate-bounce">
                <div className="inline-block p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-full border-4 border-yellow-400 shadow-xl">
                  <span className="text-7xl">{badge.icon}</span>
                </div>
              </div>

              <h2 className="text-neutral-900 mb-2">
                🎉 Badge Unlocked!
              </h2>
              <h3 className="text-2xl text-neutral-900 mb-3">
                {badge.name}
              </h3>
              <p className="text-neutral-600 mb-6">
                {badge.description}
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-900 mb-1">Points Required</p>
                <p className="text-3xl text-blue-900">{badge.pointsRequired}</p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center gap-2 text-neutral-600">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>Tier {badge.tier} Achievement</span>
                </div>
                {badge.unlockedDate && (
                  <p className="text-sm text-neutral-500">
                    Unlocked on {new Date(badge.unlockedDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              <Button variant="primary" fullWidth onClick={onClose}>
                Awesome!
              </Button>

              <p className="text-sm text-neutral-500 mt-4">
                Keep up the great work! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
