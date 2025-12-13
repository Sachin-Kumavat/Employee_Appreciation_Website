import { useState } from 'react';
import { X, CheckCircle, XCircle, FileText, Calendar, User, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import apiRequest from '../../utils/ApiService';
import appreciationImage from "../../assets/Appreciation_Image.png";

interface Appreciation {
    id: number;
    message: string;
    image_url?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    sender: { id: number; name: string; email: string };
    receivers: { name: string }[];
}

interface AdminAppreciationReviewDrawerProps {
    appreciation: Appreciation;
    onClose: () => void;
    apiCall: () => void;
}

export function AdminAppreciationReviewDrawer({
    appreciation,
    onClose,
    apiCall
}: AdminAppreciationReviewDrawerProps) {
    const [autoPublish, setAutoPublish] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleApprove = async () => {
        try {
            const response = await apiRequest({
                method: 'POST',
                url: '/Peerappreciation/update',
                data: { id: appreciation.id, action: "approved" }
            })
            setShowSuccess(true);
            setTimeout(onClose, 1500);
            apiCall()
        } catch (error) {
            console.log("error in appreciation approve--", error)
        }
    };

    const handleReject = async () => {
        try {
            const response = await apiRequest({
                method: 'POST',
                url: '/Peerappreciation/update',
                data: { id: appreciation.id, action: "rejected" }
            })
            setShowSuccess(true);
            setTimeout(onClose, 1500);
            apiCall()
        } catch (error) {
            console.log("error in appreciation approve--", error)
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-neutral-900">Appreciation Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status */}
                    <div>
                        <StatusBadge status={appreciation.status} />
                    </div>

                    {/* Sender */}
                    <div>
                        <h4 className="text-neutral-900 mb-1 flex items-center gap-2">
                            <User className="w-4 h-4" /> Sender
                        </h4>
                        <p className="text-neutral-700">{appreciation.sender.name}</p>
                        <p className="text-sm text-neutral-500">{appreciation.sender.email}</p>
                    </div>

                    {/* Receivers */}
                    <div>
                        <h4 className="text-neutral-900 mb-1 flex items-center gap-2">
                            <User className="w-4 h-4" /> Receivers
                        </h4>
                        <ul className="list-disc list-inside text-neutral-700">
                            {appreciation.receivers.map((r, idx) => (
                                <li key={idx}>{r.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Message */}
                    <div>
                        <h4 className="text-neutral-900 mb-1 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Message
                        </h4>
                        <p className="text-neutral-700">{appreciation.message}</p>
                    </div>

                    {/* Image */}
                    {appreciation.image_url && (
                        <div>
                            <h4 className="text-neutral-900 mb-1 flex items-center gap-2">Attachment</h4>
                            <img
                                src={appreciation.image_url || appreciationImage}
                                alt="Appreciation"
                                className="w-full rounded-lg border border-neutral-200"
                            />
                        </div>
                    )}

                    {/* Date */}
                    <div>
                        <h4 className="text-neutral-900 mb-1 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Date
                        </h4>
                        <p className="text-neutral-700">{new Date(appreciation.createdAt).toLocaleString()}</p>
                    </div>

                    {/* Auto-publish toggle */}
                    {appreciation.status === 'pending' && (
                        <label className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
                            <input
                                type="checkbox"
                                checked={autoPublish}
                                onChange={(e) => setAutoPublish(e.target.checked)}
                                className="w-5 h-5 rounded border-neutral-300 text-blue-600"
                            />
                            <div>
                                <p className="text-blue-900">Approve or Reject</p>
                                <p className="text-sm text-blue-700">
                                    Publish immediately to the feed after approval
                                </p>
                            </div>
                        </label>
                    )}

                    {/* Actions */}
                    {appreciation.status === 'pending' && (
                        <div className="flex gap-3 pt-4 border-t border-neutral-200">
                            <Button
                                variant="primary"
                                fullWidth
                                icon={<CheckCircle className="w-5 h-5" />}
                                onClick={handleApprove}
                                isDisabled={!autoPublish}
                            >
                                Approve
                            </Button>
                            <Button
                                variant="danger"
                                fullWidth
                                icon={<XCircle className="w-5 h-5" />}
                                onClick={handleReject}
                                isDisabled={!autoPublish}
                            >
                                Reject
                            </Button>
                        </div>
                    )}

                    {/* Success Message */}
                    {showSuccess && (
                        <div className="p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                            ✓ Review completed successfully!
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}