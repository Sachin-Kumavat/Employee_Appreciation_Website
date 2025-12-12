import { useState } from 'react';
import { Filter, Plus, MoreVertical, FileText, Image as ImageIcon } from 'lucide-react';
import { mockAchievements } from '../data/mockData';
import { Achievement, AchievementStatus } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';

interface AchievementsPageProps {
  navigateTo: (page: any, id?: string) => void;
}

export function AchievementsPage({ navigateTo }: AchievementsPageProps) {
  const [filter, setFilter] = useState<'all' | 'mine' | 'pending' | 'approved' | 'draft'>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [achievements] = useState<Achievement[]>(mockAchievements);

  const departments = ['all', ...Array.from(new Set(achievements.map(a => a.department)))];

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'mine' && achievement.employeeId !== '1') return false;
    if (filter !== 'all' && filter !== 'mine' && achievement.status !== filter) return false;
    if (selectedDepartment !== 'all' && achievement.department !== selectedDepartment) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-neutral-900">Achievements</h1>
          <p className="text-neutral-600 mt-1">
            Manage and track all team achievements
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-5 h-5" />}
          onClick={() => navigateTo('add-achievement')}
        >
          New Achievement
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="text-neutral-700">Filter:</span>
          </div>
          
          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {['all', 'mine', 'draft', 'pending', 'approved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  filter === status
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-1.5 border border-neutral-300 rounded-lg bg-white text-neutral-900"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-neutral-600">
        Showing {filteredAchievements.length} achievement{filteredAchievements.length !== 1 ? 's' : ''}
      </p>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAchievements.map((achievement) => (
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
                  <h3 className="text-neutral-900 mb-1 line-clamp-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {achievement.employeeName} • {achievement.department}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <StatusBadge status={achievement.status} />
                <button className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-neutral-600" />
                </button>
              </div>
            </div>

            <p className="text-neutral-700 mb-4 line-clamp-3">
              {achievement.description}
            </p>

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

            <div className="flex flex-wrap gap-2 mb-4">
              {achievement.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <div className="text-sm text-neutral-600">
                {new Date(achievement.date).toLocaleDateString()} • {achievement.points} points
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateTo('add-achievement', achievement.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-neutral-900 mb-2">No achievements found</h3>
          <p className="text-neutral-600 mb-6">
            Try adjusting your filters or create a new achievement
          </p>
          <Button
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => navigateTo('add-achievement')}
          >
            Create Achievement
          </Button>
        </div>
      )}
    </div>
  );
}
