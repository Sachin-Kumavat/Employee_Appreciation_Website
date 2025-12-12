import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Filter, Download } from 'lucide-react';
import { mockAchievements } from '../data/mockData';
import { Achievement } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { ReviewDrawer } from '../components/manager/ReviewDrawer';

interface ManagerReviewPageProps {
  navigateTo: (page: any) => void;
}

export function ManagerReviewPage({ navigateTo }: ManagerReviewPageProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('pending');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const pendingAchievements = mockAchievements.filter(
    a => a.status === 'pending' || a.status === 'submitted'
  );

  const filteredAchievements = filter === 'all' 
    ? mockAchievements 
    : filter === 'pending'
    ? pendingAchievements
    : mockAchievements.filter(a => a.status === 'approved' || a.status === 'rejected');

  const handleSelectAll = () => {
    if (selectedItems.size === filteredAchievements.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredAchievements.map(a => a.id)));
    }
  };

  const handleSelectItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-neutral-900">Manager Review Queue</h1>
        <p className="text-neutral-600 mt-1">
          Review and approve pending achievements
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-yellow-900 mb-1">Pending Review</p>
          <p className="text-3xl text-yellow-900">{pendingAchievements.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-green-900 mb-1">Approved This Month</p>
          <p className="text-3xl text-green-900">24</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-900 mb-1">Avg Review Time</p>
          <p className="text-3xl text-blue-900">2.5h</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            {['all', 'pending', 'reviewed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4" />}
            >
              Export
            </Button>
            {selectedItems.size > 0 && (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<CheckCircle className="w-4 h-4" />}
                >
                  Approve ({selectedItems.size})
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  icon={<XCircle className="w-4 h-4" />}
                >
                  Reject ({selectedItems.size})
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === filteredAchievements.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-neutral-300 text-blue-600"
                  />
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Employee
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Achievement
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Department
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredAchievements.map((achievement) => (
                <tr key={achievement.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(achievement.id)}
                      onChange={() => handleSelectItem(achievement.id)}
                      className="w-4 h-4 rounded border-neutral-300 text-blue-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={achievement.employeeAvatar}
                        alt={achievement.employeeName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-neutral-900">{achievement.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-neutral-900 max-w-md line-clamp-2">
                      {achievement.title}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {achievement.department}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {new Date(achievement.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={achievement.status} />
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={() => setSelectedAchievement(achievement)}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Drawer */}
      {selectedAchievement && (
        <ReviewDrawer
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      )}
    </div>
  );
}
