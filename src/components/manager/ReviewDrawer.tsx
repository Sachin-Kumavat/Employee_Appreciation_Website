import { useState } from 'react';
import { X, CheckCircle, XCircle, FileText, Calendar, Tag, User, Clock } from 'lucide-react';
import { Achievement } from '../../types';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';

interface ReviewDrawerProps {
  achievement: Achievement;
  onClose: () => void;
}

export function ReviewDrawer({ achievement, onClose }: ReviewDrawerProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [autoPublish, setAutoPublish] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApprove = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
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
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-neutral-900">Review Achievement</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Employee Info */}
          <div className="flex items-center gap-3">
            <img
              src={achievement.employeeAvatar}
              alt={achievement.employeeName}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-neutral-900">{achievement.employeeName}</h3>
              <p className="text-neutral-600">{achievement.department}</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <StatusBadge status={achievement.status} />
          </div>

          {/* Achievement Details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-neutral-900 mb-2">Achievement Title</h4>
              <p className="text-neutral-700">{achievement.title}</p>
            </div>

            <div>
              <h4 className="text-neutral-900 mb-2">Description</h4>
              <p className="text-neutral-700">{achievement.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-neutral-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Date</span>
                </div>
                <p className="text-neutral-900">
                  {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-neutral-600 mb-1">
                  <Tag className="w-4 h-4" />
                  <span className="text-sm">Points</span>
                </div>
                <p className="text-neutral-900">{achievement.points}</p>
              </div>
            </div>

            {achievement.tags.length > 0 && (
              <div>
                <h4 className="text-neutral-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {achievement.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {achievement.proofUrl && (
              <div>
                <h4 className="text-neutral-900 mb-2">Proof</h4>
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  {achievement.proofType === 'image' ? (
                    <img
                      src={achievement.proofUrl}
                      alt="Proof"
                      className="w-full"
                    />
                  ) : (
                    <div className="p-8 text-center">
                      <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                      <p className="text-neutral-600">PDF Document</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* History */}
          {achievement.submittedDate && (
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="text-neutral-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                History
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Submitted</span>
                  <span className="text-neutral-900">
                    {new Date(achievement.submittedDate).toLocaleString()}
                  </span>
                </div>
                {achievement.reviewedDate && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Reviewed by</span>
                    <span className="text-neutral-900">{achievement.reviewedBy}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rejection Reason Input */}
          {achievement.status === 'pending' && (
            <div>
              <label className="block text-neutral-700 mb-2">
                Rejection Reason (if applicable)
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Provide feedback for the employee..."
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </div>
          )}

          {/* Auto-publish Toggle */}
          {achievement.status === 'pending' && (
            <label className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={autoPublish}
                onChange={(e) => setAutoPublish(e.target.checked)}
                className="w-5 h-5 rounded border-neutral-300 text-blue-600"
              />
              <div>
                <p className="text-blue-900">Approve & Publish</p>
                <p className="text-sm text-blue-700">
                  Publish immediately to the feed after approval
                </p>
              </div>
            </label>
          )}

          {/* Actions */}
          {achievement.status === 'pending' && (
            <div className="flex gap-3 pt-4 border-t border-neutral-200">
              <Button
                variant="primary"
                fullWidth
                icon={<CheckCircle className="w-5 h-5" />}
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Button
                variant="danger"
                fullWidth
                icon={<XCircle className="w-5 h-5" />}
                onClick={handleReject}
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
