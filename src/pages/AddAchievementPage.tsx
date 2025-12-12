import { useState } from 'react';
import { ArrowLeft, Upload, X, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface AddAchievementPageProps {
  navigateTo: (page: string) => void;
}

export function AddAchievementPage({ navigateTo }: AddAchievementPageProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigateTo('achievements'); // Back to Achievements feed
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
        <h1 className="text-neutral-900">Add New Achievement</h1>
        <p className="text-neutral-600 mt-1">Document your accomplishments and milestones</p>
      </div>

      {/* Form */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-6">
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
      <div className="flex flex-col sm:flex-row gap-3">
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
