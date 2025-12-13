import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Eye, Filter, Download } from 'lucide-react';
import { mockAchievements } from '../data/mockData';
import { Achievement } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { ReviewDrawer } from '../components/manager/ReviewDrawer';
import { AdminAppreciationReviewDrawer } from '../components/manager/AdminAppreciationReviewDrawer';
import apiRequest from '../utils/ApiService';

interface AdminAppreciationReviewProps {
    navigateTo: (page: any) => void;
}

interface Appreciation {
    id: number;
    message: string;
    image_url: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    sender: {
        id: number;
        name: string;
        email: string;
    };
    receivers: { name: string }[];
}

export function AdminAppreciationReview({ navigateTo }: AdminAppreciationReviewProps) {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('all');
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [appreciations, setAppreciations] = useState<Appreciation[]>([]);
    const [summary, setSummary] = useState({
        total_peer_appreciations: 0,
        total_approved: 0,
        total_pending: 0,
        total_rejected: 0
    });

    const getAppreciations = async () => {
        try {
            const response = await apiRequest({
                method: 'POST',
                url: '/Peerappreciation/admin/allPeerAppreciation'
            });
            console.log("res of appreciation------->", response)
            setAppreciations(response.data.data);
            setSummary(response.data.summary);
        } catch (error) {
            console.error("Error fetching appreciations:", error);
        }
    };

    useEffect(() => {
        getAppreciations();
    }, []);

    const pendingAchievements = mockAchievements.filter(
        a => a.status === 'pending' || a.status === 'submitted'
    );

    const filteredAppreciations = filter === 'all'
        ? appreciations
        : appreciations.filter(a => a.status === filter);


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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl max-w-4xl">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                    <p className="text-yellow-900 mb-1">Pending</p>
                    <p className="text-3xl text-yellow-900">{summary.total_pending}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <p className="text-green-900 mb-1">Approved</p>
                    <p className="text-3xl text-green-900">{summary.total_approved}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <p className="text-blue-900 mb-1">Rejected</p>
                    <p className="text-3xl text-blue-900">{summary.total_rejected}</p>
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
                    {/* Fixed-height scroll container for vertical overflow */}
                    <div className="max-h-72 overflow-y-auto"> {/* Adjust height: max-h-64 / max-h-80 as needed */}
                        <table className="w-full table-fixed">
                            {/* Sticky header so it stays visible while the body scrolls */}
                            <thead className="sticky top-0 z-10 bg-neutral-50 border-b border-neutral-200">
                                <tr>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-1/5">Sender</th>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-2/5">Receiver</th>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-1/6">Date</th>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-1/6">Status</th>
                                    <th className="text-left px-6 py-3 text-neutral-900 w-1/6">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-100">
                                {filteredAppreciations && filteredAppreciations.map((app) => (
                                    <tr key={app.id} className="hover:bg-neutral-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={app?.employeeAvatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                                    alt={app.sender.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <span className="text-neutral-900">{app.sender.name}</span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="text-neutral-900 max-w-md line-clamp-2">
                                                {app.receivers.map(r => r.name).join(', ')}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4 text-neutral-600">
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            <StatusBadge status={app.status} />
                                        </td>

                                        <td className="px-6 py-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                icon={<Eye className="w-4 h-4" />}
                                                onClick={() => setSelectedAchievement(app)}
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
                    appreciation={selectedAchievement}
                    onClose={() => setSelectedAchievement(null)}
                    apiCall={()=> getAppreciations()}
                />
            )}
        </div>
    );
}
