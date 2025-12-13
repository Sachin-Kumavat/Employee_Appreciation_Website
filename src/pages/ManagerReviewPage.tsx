import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, Filter, Download } from 'lucide-react';
import { mockAchievements } from '../data/mockData';
import { Achievement } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { ReviewDrawer } from '../components/manager/ReviewDrawer';
import apiRequest from '../utils/ApiService';
import Cookies from 'js-cookie';

interface ManagerReviewPageProps {
  navigateTo: (page: any) => void;
}

interface APIReturnItem {
  employee: {
    id: number;
    name: string;
    total_points?: number;
  };
  achievements: {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    image_url?: string;
  }[];
}

interface TableItem {
  id: number;
  employeeName: string;
  achievementUrl: string;
  title: string;
  status: string;
  date: string;
  total_points: number;
  description: string;
}

export function ManagerReviewPage({ navigateTo }: ManagerReviewPageProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const [tableData, setTableData] = useState<TableItem[]>([]);
  const userEmail = Cookies.get("userEmail")

  const pendingAchievements = mockAchievements.filter(
    a => a.status === 'pending' || a.status === 'submitted'
  );

  const filteredAppreciations = filter === 'all'
    ? tableData
    : tableData.filter(a => a.status === filter);



  const getAllEmployeesAchievements = async () => {
    try {
      const response = await apiRequest({
        method: 'POST',
        url: '/achievement/admin/allachievements'
      });

      console.log("API raw response ----->", response);

      const data = response?.data?.data || [];
      // Flatten table data
      const flattened: TableItem[] = data.map((a: any) => ({
        id: a.id,
        employeeName: a.employee?.name || 'Unknown',
        achievementUrl: a.image_url || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        title: a.title,
        status: a.status,
        date: a.achievement_date || a.createdAt,
        total_points: a.employee?.total_points,
        description: a.description || ""
      }));

      setTableData(flattened);
      const total = flattened.length;
      const pending = flattened.filter(a => a.status === 'pending').length;
      const approved = flattened.filter(a => a.status === 'approved').length;
      const rejected = flattened.filter(a => a.status === 'rejected').length;

      setStats({ total, pending, approved, rejected });
    } catch (error) {
      console.log("error of getAllEmployeesAchievements -------->", error);
    }
  };


  useEffect(() => {
    getAllEmployeesAchievements();
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-neutral-900">Achievement Review</h1>
        <p className="text-neutral-600 mt-1">
          Review and approve pending achievements
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl max-w-4xl">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <p className="text-yellow-900 mb-1">Pending</p>
          <p className="text-3xl text-yellow-900">{stats.pending}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-900 mb-1">Approved</p>
          <p className="text-3xl text-green-900">{stats.approved}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-blue-900 mb-1">Rejected</p>
          <p className="text-3xl text-blue-900">{stats.rejected}</p>
        </div>
      </div>
      {/* Filters and Actions */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-neutral-600" />
            {['all', 'pending', 'approved'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${filter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>

                <th className="text-left px-6 py-3 text-neutral-900">
                  Employee
                </th>
                <th className="text-left px-6 py-3 text-neutral-900">
                  Achievement
                </th>
                {/* <th className="text-left px-6 py-3 text-neutral-900">
                  Department
                </th> */}
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
              {filteredAppreciations && filteredAppreciations.map((achievement) => (
                <tr key={achievement.id} className="hover:bg-neutral-50">

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={achievement?.employeeAvatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
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
          apiCall={() => getAllEmployeesAchievements()}
        />
      )}
    </div>
  );
}
