import { Check } from 'lucide-react';

interface WorkflowProgressProps {
  currentStatus: 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected';
}

export function WorkflowProgress({ currentStatus }: WorkflowProgressProps) {
  const steps = [
    { id: 'draft', label: 'Draft' },
    { id: 'submitted', label: 'Submitted' },
    { id: 'pending', label: 'Under Review' },
    { id: 'approved', label: 'Approved' },
  ];

  const statusIndex = {
    draft: 0,
    submitted: 1,
    pending: 2,
    approved: 3,
    rejected: 2,
  };

  const currentIndex = statusIndex[currentStatus];

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6">
      <h3 className="text-neutral-900 mb-6">Workflow Progress</h3>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isRejected = currentStatus === 'rejected' && step.id === 'pending';

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-blue-600 border-blue-600'
                      : isCurrent
                      ? 'bg-white border-blue-600'
                      : isRejected
                      ? 'bg-red-100 border-red-500'
                      : 'bg-white border-neutral-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span
                      className={`${
                        isCurrent
                          ? 'text-blue-600'
                          : isRejected
                          ? 'text-red-600'
                          : 'text-neutral-400'
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-2 text-sm text-center ${
                    isCurrent || isCompleted
                      ? 'text-neutral-900'
                      : 'text-neutral-500'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {currentStatus === 'rejected' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-900">
            Achievement was rejected. Please review feedback and resubmit.
          </p>
        </div>
      )}
    </div>
  );
}
