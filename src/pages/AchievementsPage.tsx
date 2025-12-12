import { useState } from 'react';
import { Filter, Plus, FileText, ArrowLeft, Upload, X, Send } from 'lucide-react';
import { mockAchievements } from '../data/mockData';
import { Achievement } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function AchievementsPage() {
  const [filter, setFilter] = useState<'pending' | 'approved'>('pending');
  const [achievements] = useState<Achievement[]>(mockAchievements);
  const [showAddForm, setShowAddForm] = useState(false);

  // Add Achievement form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredAchievements = achievements.filter(a => a.status === filter);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowAddForm(false);
      // Reset form
      setTitle('');
      setDescription('');
      setDate('');
      setUploadedFile(null);
    }, 1500);
  };

  if (showAddForm) {
    // Render Add Achievement Form - Full Width
    return (
      <div className="w-full space-y-6 p-6"> {/* Full width with padding */}

        {/* Header */}
        <div>
          <button
            onClick={() => setShowAddForm(false)}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Achievements
          </button>
          <h1 className="text-neutral-900">Add New Achievement</h1>
          <p className="text-neutral-600 mt-1">Document your accomplishments and milestones</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6 w-full">
          <div>
            <label htmlFor="title" className="block text-neutral-700 mb-2">Achievement Title *</label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Completed AWS Solutions Architect Certification"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-neutral-700 mb-2">Description *</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your achievement in detail..."
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-neutral-700 mb-2">Achievement Date *</label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-neutral-700 mb-2">Proof (Image or PDF)</label>
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-neutral-900">{uploadedFile.name}</p>
                      <p className="text-sm text-neutral-500">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setUploadedFile(null); }}
                      className="ml-auto p-2 hover:bg-neutral-100 rounded-lg"
                    >
                      <X className="w-5 h-5 text-neutral-600" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                    <p className="text-neutral-900 mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-neutral-500">PNG, JPG, or PDF (max 10MB)</p>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant="primary"
            icon={<Send className="w-5 h-5" />}
            onClick={handleSubmit}
            className="flex-1"
            disabled={!title || !description || !date}
          >
            Submit for Review
          </Button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl animate-in slide-in-from-bottom-4 duration-300">
            <p className="flex items-center gap-2">✓ Achievement submitted for review!</p>
          </div>
        )}
      </div>
    );
  }

  // Render Achievements list
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-neutral-900">Achievements</h1>
          <p className="text-neutral-600 mt-1">
            Manage and track all achievements
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-5 h-5" />}
          onClick={() => setShowAddForm(true)}
        >
          New Achievement
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-600" />
            <span className="text-neutral-700">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['pending', 'approved'].map((status) => (
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
                  <h3 className="text-neutral-900 mb-1 line-clamp-2">{achievement.title}</h3>
                  <p className="text-sm text-neutral-600">
                    {achievement.employeeName} • {achievement.department}
                  </p>
                </div>
              </div>
              <StatusBadge status={achievement.status} />
            </div>

            <p className="text-neutral-700 mb-4 line-clamp-3">{achievement.description}</p>

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

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <div className="text-sm text-neutral-600">
                {new Date(achievement.date).toLocaleDateString()} • {achievement.points} points
              </div>
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
            onClick={() => setShowAddForm(true)}
          >
            Create Achievement
          </Button>
        </div>
      )}
    </div>
  );
}
