import { useState } from 'react';
import { CheckCircle, XCircle, Eye, Filter, Download } from 'lucide-react';
import { mockAchievements } from '../data/mockData';
import { Achievement } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { ReviewDrawer } from '../components/manager/ReviewDrawer';
import { AdminAppreciationReviewDrawer } from '../components/manager/AdminAppreciationReviewDrawer';

interface AdminAppreciationReviewProps {
    navigateTo: (page: any) => void;
}

export function AdminAppreciationReview({ navigateTo }: AdminAppreciationReviewProps) {
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
                <h1 className="text-neutral-900">Appreciation Review</h1>
                <p className="text-neutral-600 mt-1">
                    Review and approve pending appreciation
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                    <p className="text-yellow-900 mb-1">Pending</p>
                    <p className="text-3xl text-yellow-900">{pendingAchievements.length}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-green-900 mb-1">Approved</p>
                    <p className="text-3xl text-green-900">24</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <p className="text-blue-900 mb-1">Total</p>
                    <p className="text-3xl text-blue-900">26</p>
                </div>
            </div>


            {/* Table */}

            <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    {/* Fixed-height scroll container for vertical overflow */}
                    <div className="max-h-72 overflow-y-auto"> {/* Adjust height: max-h-64 / max-h-80 as needed */}
                        <table className="w-full table-fixed">
                            {/* Sticky header so it stays visible while the body scrolls */}
                            <thead className="sticky top-0 z-10 bg-neutral-50 border-b border-neutral-200">
                                <tr>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-1/5">Employee</th>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-2/5">Achievement</th>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-1/6">Date</th>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-1/6">Status</th>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-1/6">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100">
                                {mockAchievements.map((achievement) => (
                                    <tr key={achievement.id} className="hover:bg-neutral-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={achievement.employeeAvatar}
                                                    alt={achievement.employeeName}
                                                    className="w-8 h-8 rounded-full object-cover"
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
            </div>


            {/* Review Drawer */}
            {selectedAchievement && (
                <AdminAppreciationReviewDrawer
                    achievement={selectedAchievement}
                    onClose={() => setSelectedAchievement(null)}
                />
            )}
        </div>
    );
}
