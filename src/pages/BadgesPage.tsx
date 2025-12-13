import { useState, useMemo, useEffect } from 'react';
import { Trophy, Lock, TrendingUp, Award, Zap } from 'lucide-react';
import { mockBadges, currentUser, topContributors } from '../data/mockData';
import { BadgeUnlockModal } from '../components/badges/BadgeUnlockModal';
import ProgressBar from '@ramonak/react-progress-bar';
import type { Badge } from '../types/index';
import apiRequest from '../utils/ApiService';
import Cookies from 'js-cookie';


// --- Badge thresholds (source of truth)
const BADGE_THRESHOLDS = {
  'Rising Star': 50,
  Achiever: 100,
  Performer: 150,
  Innovator: 200,
  Trailblazer: 500,
  Legend: 1000,
} as const;


type BadgeName =
  | 'Rising Star'
  | 'Achiever'
  | 'Performer'
  | 'Innovator'
  | 'Trailblazer'
  | 'Legend';


type Badge = {
  id: string;
  name: BadgeName;
  description: string;
  tier: number;
  pointsRequired: number;
  unlockedDate?: string; // optional, for display only
};


const BADGES: Badge[] = [
  {
    id: '1',
    name: 'Rising Star',
    description: 'Welcome to team! Awarded on first day.',
    tier: 1,
    pointsRequired: 50,
    unlockedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Achiever',
    description: 'Actively participating in peer recognition.',
    tier: 2,
    pointsRequired: 100,
    unlockedDate: '2024-03-20',
  },
  {
    id: '3',
    name: 'Performer',
    description: 'Completed 5 significant achievements.',
    tier: 3,
    pointsRequired: 150,
    unlockedDate: '2024-06-10',
  },
  {
    id: '4',
    name: 'Innovator',
    description: 'Consistently delivering excellent work.',
    tier: 4,
    pointsRequired: 200,
    unlockedDate: '2024-09-05',
  },
  {
    id: '5',
    name: 'Trailblazer',
    description: 'A leader in peer appreciation and achievement.',
    tier: 5,
    pointsRequired: 500,
  },
  {
    id: '6',
    name: 'Legend',
    description: 'The ultimate recognition master.',
    tier: 7,
    pointsRequired: 1000,
  },
]

// --- Helper: resolve emoji per badge (cleaner than nested ternaries)
function badgeEmoji(name: BadgeName): string {
  switch (name) {
    case 'Rising Star':
      return '🌟';
    case 'Achiever':
      return '🏅';
    case 'Performer':
      return '🎯';
    case 'Innovator':
      return '💡';
    case 'Trailblazer':
      return '🔥';
    case 'Legend':
      return '👑';
    default:
      return '';
  }
}

// Split badges based on points
function splitBadgesByPoints(points: number | null, badges: Badge[]) {
  if (points == null) {
    return { unlockedBadges: [] as Badge[], lockedBadges: badges.slice().sort((a, b) => a.pointsRequired - b.pointsRequired) };
  }
  const unlockedBadges = badges.filter(b => points >= b.pointsRequired).sort((a, b) => a.pointsRequired - b.pointsRequired);
  const lockedBadges = badges.filter(b => points < b.pointsRequired).sort((a, b) => a.pointsRequired - b.pointsRequired);
  return { unlockedBadges, lockedBadges };
}

// Find the next badge to unlock
function getNextBadge(points: number | null, badges: Badge[]) {
  if (points == null) return null;
  return badges
    .filter(b => b.pointsRequired > points)
    .sort((a, b) => a.pointsRequired - b.pointsRequired)[0] ?? null;
}


export function BadgesPage() {
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [points, setPoints] = useState<number | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [nextBadgeName, setNextBadgeName] = useState("");
  const [approvedAchievements, setApprovedAchievements] = useState("");
  const [receivedAppreciation, setReceivedAppreciation] = useState("");
  const [postReaction, setPostReaction] = useState("");
  const [pointsNeeded, setPointsNeeded] = useState(0);


  const userEmail = Cookies.get("userEmail");


  const fetchPoints = async () => {
    const res = await apiRequest({
      method: 'POST',
      url: '/spotlight/empBadges',
      data: { email: userEmail }
    })

    setApprovedAchievements(res?.data?.totals?.total_achievements_uploaded ?? 0)
    setReceivedAppreciation(res?.data?.totals?.total_peer_appreciations_received ?? 0)
    setPostReaction(res?.data?.totals?.total_peer_appreciations_sent ?? 0)
    setNextBadgeName(res?.data?.badges?.next_badge?.name ?? '')
    setPointsNeeded(res?.data?.badges?.next_badge?.points_needed)

    setPoints(res?.data?.employee?.total_points ?? 0)
  };
  useEffect(() => {
    fetchPoints();
  }, []);

  const { unlockedBadges, lockedBadges } = useMemo(
    () => splitBadgesByPoints(points, BADGES),
    [points]
  );

  const nextBadge = useMemo(() => getNextBadge(points, BADGES), [points]);
  const pointsToNext = nextBadge && points != null ? Math.max(nextBadge.pointsRequired - points, 0) : 0;
  const progressPercent = nextBadge && points != null
    ? Math.min((points / nextBadge.pointsRequired) * 100, 100)
    : 100;


  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    setShowUnlockModal(true);
  };


  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-neutral-900">Badges & Gamification</h1>
        <p className="text-neutral-600 mt-2">
          Track your progress and unlock achievements
        </p>
      </div>

      {/* Current Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-blue-100 mb-2">Your Current Points</p>
            <p className="text-5xl mb-4">{points}</p>
            <p className="text-blue-100">
              {pointsNeeded > 0
                ? `${pointsNeeded} points to ${nextBadgeName}`
                : 'All badges unlocked! 🎉'
              }
            </p>
          </div>
          <div className="flex-1 max-w-md w-full">
            {nextBadge && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100">Progress to {nextBadgeName}</span>
                  <span className="text-white">{Math.round(progressPercent)}%</span>
                </div>
                <ProgressBar
                  completed={progressPercent}
                  maxCompleted={100}
                  height="16px"
                  bgColor="#ffffff"
                  baseBgColor="#1e3a8a" // dark blue background
                  isLabelVisible={true}
                  labelColor="#ffffff"
                  animateOnRender={true}
                  transitionDuration="0.5s"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Points Rules */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 className="text-neutral-900 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          How to Earn Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-900">Approved Achievement</span>
              <span className="text-2xl text-green-900">{approvedAchievements}</span>
            </div>
            <p className="text-sm text-green-700">
              When your achievement gets approved
            </p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-900">Received Appreciation</span>
              <span className="text-2xl text-blue-900">{receivedAppreciation}</span>
            </div>
            <p className="text-sm text-blue-700">
              Each appreciation you receive
            </p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-900">Post Reaction</span>
              <span className="text-2xl text-purple-900">{postReaction}</span>
            </div>
            <p className="text-sm text-purple-700">
              When someone reacts to your post
            </p>
          </div>
        </div>
      </div>

      {/* Badge Gallery */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 className="text-neutral-900 mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Badge Gallery
        </h2>

        {/* Unlocked Badges */}
        <div className="mb-8">
          <h3 className="text-neutral-700 mb-4">
            Unlocked ({unlockedBadges.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {unlockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="relative group cursor-pointer"
                onClick={() => handleBadgeClick(badge)}
              >
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-105">


                  <div className="text-5xl mb-3">
                    {badgeEmoji(badge.name)}
                  </div>

                  <h4 className="text-neutral-900 mb-1">{badge.name}</h4>
                  <p className="text-xs text-neutral-600 mb-2">{badge.description}</p>
                  {badge.unlockedDate && (
                    <p className="text-xs text-yellow-700">
                      {new Date(badge.unlockedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked Badges */}
        <div>
          <h3 className="text-neutral-700 mb-4">
            Locked ({lockedBadges.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {lockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-6 text-center opacity-60"
              >
                <div className="relative">


                  <div className="text-5xl mb-3 grayscale">
                    {badgeEmoji(badge.name)}
                  </div>

                  <Lock className="w-6 h-6 text-neutral-400 absolute top-0 right-0" />
                </div>
                <h4 className="text-neutral-700 mb-1">{badge.name}</h4>
                <p className="text-xs text-neutral-500 mb-2">{badge.description}</p>
                <p className="text-xs text-neutral-600">
                  {badge.pointsRequired} points required
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      {/* <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 className="text-neutral-900 mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-600" />
          Global Leaderboard
        </h2>
        <div className="space-y-3">
          {topContributors.map((contributor, index) => (
            <div
              key={contributor.name}
              className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0
                  ? 'bg-yellow-100 text-yellow-700'
                  : index === 1
                    ? 'bg-gray-100 text-gray-700'
                    : index === 2
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-neutral-200 text-neutral-700'
                }`}>
                {index + 1}
              </div>
              <img
                src={contributor.avatar}
                alt={contributor.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h4 className="text-neutral-900">{contributor.name}</h4>
                <p className="text-sm text-neutral-600">
                  {contributor.recognitions} recognitions
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-green-600">+{Math.floor(Math.random() * 10) + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Badge Unlock Modal */}
      {showUnlockModal && (
        <BadgeUnlockModal
          badge={selectedBadge}
          onClose={() => setShowUnlockModal(false)}
        />
      )}
    </div>
  );
}
