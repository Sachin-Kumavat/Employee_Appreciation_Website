import React, { useState } from 'react';
import { Filter, Plus, Send, ArrowLeft } from 'lucide-react';
import { mockAchievements } from '../data/mockData';
import { Achievement } from '../types';
import { Button } from '../components/ui/Button';
import { FeedItem } from '../components/feed/FeedItem';
import Select from 'react-select';

interface Appreciation {
  id: string;
  message: string;
  from: string;
  date: string;
}

interface PeerAppreciationPageProps {
  darkMode: boolean;
  navigateTo: (page: string) => void;
}

export function PeerAppreciationPage({ darkMode }: PeerAppreciationPageProps) {
  const [filter, setFilter] = useState<'pending' | 'approved'>('pending');
  const [achievements] = useState<Achievement[]>(mockAchievements);

  const [showFormPage, setShowFormPage] = useState(false);

  // NEW — Multi-select state
  const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const filteredAchievements = achievements.filter(a => a.status === filter);

  const appreciations: Appreciation[] = [
    { id: '1', message: 'Great teamwork on the Q3 project!', from: 'Alice Johnson', date: '2025-11-10' },
    { id: '2', message: 'Thanks for your help during the client presentation.', from: 'Bob Smith', date: '2025-11-12' },
    { id: '3', message: 'Appreciate your quick response to the issue.', from: 'Charlie Brown', date: '2025-11-15' }
  ];

  const employees = [
    'Sarah Johnson - Product Manager',
    'David Lee - UX Designer',
    'James Carter - DevOps Engineer'
  ];

  // Convert employees → react-select option format
  const employeeOptions = employees.map((emp) => ({
    label: emp,
    value: emp
  }));

  const handleSubmit = () => {
    if (selectedEmployees.length === 0 || !message.trim()) return;

    console.log("New Appreciation Created:", {
      selectedEmployees,
      message
    });

    setSelectedEmployees([]);
    setMessage('');
    setShowFormPage(false);
  };

  // -------------------------------------------------------
  // FORM PAGE
  // -------------------------------------------------------
  if (showFormPage) {
    return (
      <div className="space-y-6">

        {/* Back button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFormPage(false)}
            className="p-2 rounded-lg hover:bg-neutral-100 transition"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-700" />
          </button>
          <h1 className="text-neutral-900">Send Appreciation</h1>
        </div>

        {/* Form card */}
        <div
          className={`${
            darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
          } border rounded-xl p-6 shadow-sm`}
        >
          <p className="text-neutral-600 mb-6">
            Show your gratitude to a team member
          </p>

          {/* React-Select Multi-select */}
          <label className="block text-sm font-medium mb-2">
            Select Employee *
          </label>

          <Select
            isMulti
            options={employeeOptions}
            value={selectedEmployees}
            onChange={(val) => setSelectedEmployees(val as any)}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: darkMode ? '#2d2d2d' : '#f5f5f5',
                borderColor: '#d1d5db',
                padding: '4px',
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: darkMode ? '#3f3f3f' : '#e5e7eb',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: darkMode ? '#fff' : '#000',
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: darkMode ? '#fff' : '#000',
                ':hover': {
                  backgroundColor: darkMode ? '#555' : '#ddd'
                }
              })
            }}
          />

          {/* Message */}
          <label className="block text-sm font-medium mt-6 mb-2">
            Appreciation Message *
          </label>

          <textarea
            rows={4}
            placeholder="Write a heartfelt message of appreciation..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="
              w-full p-3 border border-neutral-300 rounded-lg 
              bg-neutral-100 focus:ring-2 focus:ring-blue-500
            "
          />

          {/* Stylish Submit Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="
                px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
                shadow-md flex items-center gap-2 transition-all
              "
            >
              <Send className="w-4 h-4" />
              Send Appreciation
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------
  // MAIN PAGE
  // -------------------------------------------------------
  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-neutral-900">Peer Appreciation</h1>
          <p className="text-neutral-600 mt-1">Manage and track all Peer Appreciation</p>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="w-5 h-5" />}
          onClick={() => setShowFormPage(true)}
        >
          New Peer Appreciation
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="w-5 h-5 text-neutral-600" />
          <span className="text-neutral-700">Filter:</span>

          <div className="flex flex-wrap gap-2">
            {['pending', 'approved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="text-neutral-600">
        Showing {filteredAchievements.length} peer appreciation
        {filteredAchievements.length !== 1 ? 's' : ''}
      </p>

      {/* Feed Items */}
      <div className="space-y-4">
        {appreciations.map((app) => (
          <div
            key={app.id}
            className={`${
              darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
            } border rounded-xl overflow-hidden`}
          >
            <FeedItem appreciation={app} darkMode={darkMode} />
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="text-center py-6">
        <button
          className={`px-6 py-3 rounded-lg ${
            darkMode
              ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 border border-neutral-700'
              : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
          }`}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
