import { useState } from 'react';
import { Bell, CheckCheck, Filter, Award, Heart, MessageCircle, Trophy, AlertCircle } from 'lucide-react';
import { mockNotifications } from '../data/mockData';
import { Notification } from '../types';
import { Button } from '../components/ui/Button';

interface NotificationsPageProps {
  navigateTo: (page: any) => void;
}

export function NotificationsPage({ navigateTo }: NotificationsPageProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'achievement_approved':
        return <Award className="w-5 h-5 text-green-600" />;
      case 'achievement_rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'appreciation_received':
        return <Heart className="w-5 h-5 text-pink-600" />;
      case 'badge_unlocked':
        return <Trophy className="w-5 h-5 text-yellow-600" />;
      case 'comment_received':
        return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case 'pending_review':
        return <Bell className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-neutral-600" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-neutral-900">Notifications</h1>
          <p className="text-neutral-600 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            icon={<CheckCheck className="w-4 h-4" />}
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-neutral-600" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'unread'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center">
            <Bell className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-neutral-900 mb-2">No notifications</h3>
            <p className="text-neutral-600">
              You&apos;re all caught up! Check back later for updates.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white border ${
                notification.read ? 'border-neutral-200' : 'border-blue-200 bg-blue-50'
              } rounded-xl p-4 hover:shadow-md transition-all cursor-pointer`}
              onClick={() => {
                markAsRead(notification.id);
                // Navigate based on notification type
                if (notification.type === 'pending_review') {
                  navigateTo('manager-review');
                } else if (notification.type === 'badge_unlocked') {
                  navigateTo('badges');
                } else if (notification.type === 'appreciation_received') {
                  navigateTo('feed');
                } else {
                  navigateTo('achievements');
                }
              }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  notification.read ? 'bg-neutral-100' : 'bg-white'
                }`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-neutral-900">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-neutral-700 mb-2">{notification.message}</p>
                  <p className="text-sm text-neutral-500">
                    {formatTimeAgo(notification.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
