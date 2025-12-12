export type AchievementStatus = 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  date: string;
  status: AchievementStatus;
  proofUrl?: string;
  proofType?: 'image' | 'pdf';
  tags: string[];
  department: string;
  submittedDate?: string;
  reviewedDate?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  points: number;
}

export interface Appreciation {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverIds: string[];
  receiverNames: string[];
  receiverAvatars: string[];
  message: string;
  timestamp: string;
  reactions: {
    like: number;
    clap: number;
    celebrate: number;
  };
  userReaction?: 'like' | 'clap' | 'celebrate';
  commentCount: number;
  isBookmarked: boolean;
  attachments?: string[];
  department: string;
}

export interface Comment {
  id: string;
  appreciationId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: number;
  pointsRequired: number;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  points: number;
  badgeCount: number;
  recognitionsReceived: number;
  recognitionsGiven: number;
  isManager: boolean;
  isAdmin: boolean;
}

export interface Notification {
  id: string;
  type: 'achievement_approved' | 'achievement_rejected' | 'appreciation_received' | 'badge_unlocked' | 'comment_received' | 'pending_review';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface DepartmentStats {
  department: string;
  recognitions: number;
  points: number;
  employees: number;
}
