import { useState } from 'react';
import { ArrowLeft, Upload, X, Info, Save, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { WorkflowProgress } from '../components/achievements/WorkflowProgress';

interface AddAchievementPageProps {
  navigateTo: (page: any) => void;
  editId?: string | null;
}

export function AddAchievementPage({ navigateTo, editId }: AddAchievementPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'draft' | 'submitted'>('draft');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSaveDraft = () => {
    setStatus('draft');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigateTo('achievements');
    }, 1500);
  };

  const handleSubmit = () => {
    setStatus('submitted');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigateTo('achievements');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigateTo('achievements')}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Achievements
        </button>
        <h1 className="text-neutral-900">
          {editId ? 'Edit Achievement' : 'Add New Achievement'}
        </h1>
        <p className="text-neutral-600 mt-1">
          Document your accomplishments and milestones
        </p>
      </div>

      {/* Workflow Progress */}
      <WorkflowProgress currentStatus={status} />

      {/* Auto-Publish Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-blue-900 mb-1">Auto-Publish Rules</h4>
          <p className="text-blue-800 text-sm">
            Achievements are auto-published if: (1) Type is &quot;Training Completed&quot; with no proof required, OR (2) Employee level is Junior and manager auto-approval is enabled. All other achievements require manager review.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-neutral-700 mb-2">
            Achievement Title *
          </label>
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
          <label htmlFor="description" className="block text-neutral-700 mb-2">
            Description *
          </label>
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
          <label htmlFor="date" className="block text-neutral-700 mb-2">
            Achievement Date *
          </label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-neutral-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-3">
            <Input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add a tag and press Enter"
            />
            <Button type="button" variant="secondary" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-blue-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-neutral-700 mb-2">
            Proof (Image or PDF)
          </label>
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
                    <p className="text-sm text-neutral-500">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setUploadedFile(null);
                    }}
                    className="ml-auto p-2 hover:bg-neutral-100 rounded-lg"
                  >
                    <X className="w-5 h-5 text-neutral-600" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <p className="text-neutral-900 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-neutral-500">
                    PNG, JPG, or PDF (max 10MB)
                  </p>
                </>
              )}
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="secondary"
          icon={<Save className="w-5 h-5" />}
          onClick={handleSaveDraft}
          className="flex-1"
        >
          Save as Draft
        </Button>
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
          <p className="flex items-center gap-2">
            ✓ Achievement {status === 'draft' ? 'saved as draft' : 'submitted for review'}!
          </p>
        </div>
      )}
    </div>
  );
}
