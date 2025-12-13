// src/pages/AchievementsPage.tsx
import { useState, useEffect } from 'react';
import { Filter, Plus, FileText, ArrowLeft, Upload, X, Send } from 'lucide-react';
import { Achievement } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import apiRequest from '../utils/ApiService';
import Cookies from 'js-cookie';

export function AchievementsPage() {
  const [filter, setFilter] = useState<'pending' | 'approved'>('pending');
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Employee info
  const [employee, setEmployee] = useState<{ id: number; name: string; total_points: number } | null>(null);

  const email = Cookies.get("userEmail");
  const filteredAchievements = achievements.filter(a => a.status === filter);

  const fetchAchievements = async () => {
    if (!email) return;
    try {
      setLoading(true);
      const response = await apiRequest({
        url: '/achievement/emp/allachievements',
        method: 'POST',
        data: { email },
      });
      const data = response.data;
      if (data) {
        setEmployee(data.employee || null);
        setAchievements(data.achievements || []);
      }
    } catch (err) {
      console.error('Failed to fetch achievements:', err);
      alert('Failed to load achievements.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [email]);

  const handleSubmit = async () => {
    if (!title || !description || !date) return;
    try {
      const response = await apiRequest({
        url: '/achievement/add',
        method: 'POST',
        data: { email, title, description, achievement_date: date, image_url: fileUrl },
      });
      setShowSuccess(true);
      fetchAchievements();
      setAchievements(prev => [...prev, response.data]);
      setTimeout(() => {
        setShowSuccess(false);
        setShowAddForm(false);
        setTitle('');
        setDescription('');
        setDate('');
        setUploadedFile(null);
        setFileUrl('');
      }, 1500);
    } catch (err) {
      console.error('Failed to add achievement:', err);
      alert('Failed to submit achievement. Please try again.');
    }
  };

  if (showAddForm) {
    return (
      <div className="w-full space-y-6 p-6">
        {/* Header */}
        <div>
          <button onClick={() => setShowAddForm(false)} className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4 transition-colors">
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
            <Input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Completed AWS Solutions Architect Certification" required />
          </div>

          <div>
            <label htmlFor="description" className="block text-neutral-700 mb-2">Description *</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your achievement in detail..."
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-neutral-700 mb-2">Achievement Date *</label>
            <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-neutral-700 mb-2">Proof (Image or PDF)</label>
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={async e => {
                  if (!e.target.files || !e.target.files[0]) return;
                  const file = e.target.files[0];
                  setUploadedFile(file);
                  try {
                    const formData = new FormData();
                    formData.append('file', file);
                    const response = await apiRequest({ url: '/upload/file', method: 'POST', data: formData, headers: { 'Content-Type': 'multipart/form-data' } });
                    setFileUrl(response.data.fileUrl);
                  } catch (err) {
                    console.error('Upload failed', err);
                  }
                }}
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
                    <button type="button" onClick={e => { e.preventDefault(); setUploadedFile(null); setFileUrl(''); }} className="ml-auto p-2 hover:bg-neutral-100 rounded-lg">
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
          <Button variant="primary" icon={<Send className="w-5 h-5" />} onClick={handleSubmit} className="flex-1" disabled={!title || !description || !date}>
            Submit for Review
          </Button>
        </div>

        {showSuccess && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl animate-in slide-in-from-bottom-4 duration-300">
            <p className="flex items-center gap-2">✓ Achievement submitted for review!</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-neutral-900">Achievements</h1>
          <p className="text-neutral-600 mt-1">Manage and track all achievements</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-5 h-5" />} onClick={() => setShowAddForm(true)}>
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
            {['pending', 'approved'].map(status => (
              <button key={status} onClick={() => setFilter(status as any)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${filter === status ? 'bg-blue-600 text-white shadow-sm' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      {loading ? <p className="text-neutral-600">Loading achievements...</p> : <p className="text-neutral-600">Showing {filteredAchievements.length} achievement{filteredAchievements.length !== 1 ? 's' : ''}</p>}

      {/* Achievements cards */}
      <div className="flex flex-col gap-6 w-full">
        {!loading && filteredAchievements.map((achievement) => (
          <div key={achievement.id} className="bg-white border border-neutral-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 w-full flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-600">
                  {employee?.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-neutral-900 font-semibold mb-1 line-clamp-2">{achievement.title}</h3>
                  <p className="text-sm text-neutral-600">{employee?.name}</p>
                </div>
              </div>
              <StatusBadge status={achievement.status} />
            </div>

            {/* Body: Image 50% + Description 50% */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Image */}
              {achievement.image_url && (
                <div className="w-full sm:w-1/2 h-48 bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {achievement.image_url.endsWith('.pdf') ? (
                    <FileText className="w-10 h-10 text-neutral-400" />
                  ) : (
                    <img src={achievement.image_url} alt="Proof" className="w-full h-full object-contain" />
                  )}
                </div>
              )}
              {/* Description */}
              <div className="w-full sm:w-1/2 text-neutral-700 text-sm flex items-center">
                <p>{achievement.description}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-sm text-neutral-600 mt-2 border-t border-neutral-200 pt-2">
              {new Date(achievement.achievement_date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* No achievements */}
      {!loading && filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-neutral-900 mb-2">No achievements found</h3>
          <p className="text-neutral-600 mb-6">Try adjusting your filters or create a new achievement</p>
          <Button variant="primary" icon={<Plus className="w-5 h-5" />} onClick={() => setShowAddForm(true)}>
            Create Achievement
          </Button>
        </div>
      )}
    </div>
  );
}
