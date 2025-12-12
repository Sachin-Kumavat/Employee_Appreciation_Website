import { Download, Award, Heart, Trophy, Calendar } from 'lucide-react';
import { currentUser, mockAchievements, mockAppreciations, mockBadges } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';

export function ProfilePage() {
  const userAchievements = mockAchievements.filter(a => a.employeeId === currentUser.id);
  const receivedAppreciations = mockAppreciations.filter(
    a => a.receiverIds.includes(currentUser.id)
  );
  const unlockedBadges = mockBadges.filter(b => b.unlocked);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-white mb-2">{currentUser.name}</h1>
            <p className="text-blue-100 mb-4">{currentUser.role} • {currentUser.department}</p>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <div>
                <p className="text-2xl text-white">{currentUser.points}</p>
                <p className="text-blue-100 text-sm">Points</p>
              </div>
              <div>
                <p className="text-2xl text-white">{unlockedBadges.length}</p>
                <p className="text-blue-100 text-sm">Badges</p>
              </div>
              <div>
                <p className="text-2xl text-white">{userAchievements.length}</p>
                <p className="text-blue-100 text-sm">Achievements</p>
              </div>
              <div>
                <p className="text-2xl text-white">{receivedAppreciations.length}</p>
                <p className="text-blue-100 text-sm">Appreciations</p>
              </div>
            </div>
          </div>
          <Button
            variant="secondary"
            icon={<Download className="w-5 h-5" />}
          >
            Download Summary
          </Button>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 className="text-neutral-900 mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Badges Earned
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {unlockedBadges.map((badge) => (
            <div
              key={badge.id}
              className="text-center p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <p className="text-neutral-900 mb-1">{badge.name}</p>
              <p className="text-xs text-neutral-500">
                {new Date(badge.unlockedDate || '').toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6">
        <h2 className="text-neutral-900 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          Recognition Timeline
        </h2>
        <div className="space-y-6">
          {/* Achievements */}
          {userAchievements.slice(0, 3).map((achievement) => (
            <div key={achievement.id} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-neutral-900">{achievement.title}</h3>
                    <p className="text-sm text-neutral-600">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={achievement.status} />
                </div>
                <p className="text-neutral-700 mb-2">{achievement.description}</p>
                <div className="flex flex-wrap gap-2">
                  {achievement.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Appreciations */}
          {receivedAppreciations.slice(0, 2).map((appreciation) => (
            <div key={appreciation.id} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-2">
                  <h3 className="text-neutral-900">
                    Appreciation from {appreciation.senderName}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {new Date(appreciation.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-neutral-700">{appreciation.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <h3 className="text-neutral-900 mb-4">Recognition Given</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Appreciations Sent</span>
              <span className="text-2xl text-neutral-900">{currentUser.recognitionsGiven}</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-6">
          <h3 className="text-neutral-900 mb-4">Recognition Received</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600">Total Received</span>
              <span className="text-2xl text-neutral-900">{currentUser.recognitionsReceived}</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
