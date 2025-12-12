import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { MainDashboard } from './pages/MainDashboard';
import { AchievementsPage } from './pages/AchievementsPage';
import { AddAchievementPage } from './pages/AddAchievementPage';
import { ManagerReviewPage } from './pages/ManagerReviewPage';
import { FeedPage } from './pages/FeedPage';
import { ProfilePage } from './pages/ProfilePage';
import { BadgesPage } from './pages/BadgesPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotificationsPage } from './pages/NotificationsPage';

type Page = 'login' | 'dashboard' | 'achievements' | 'add-achievement' | 'manager-review' | 'feed' | 'profile' | 'badges' | 'admin' | 'notifications';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedAchievementId, setSelectedAchievementId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const navigateTo = (page: Page, achievementId?: string) => {
    setCurrentPage(page);
    if (achievementId) {
      setSelectedAchievementId(achievementId);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <MainDashboard navigateTo={navigateTo} darkMode={darkMode} />;
      case 'achievements':
        return <AchievementsPage navigateTo={navigateTo} />;
      case 'add-achievement':
        return <AddAchievementPage navigateTo={navigateTo} editId={selectedAchievementId} />;
      case 'manager-review':
        return <ManagerReviewPage navigateTo={navigateTo} />;
      case 'feed':
        return <FeedPage darkMode={darkMode} />;
      case 'profile':
        return <ProfilePage />;
      case 'badges':
        return <BadgesPage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'notifications':
        return <NotificationsPage navigateTo={navigateTo} />;
      default:
        return <MainDashboard navigateTo={navigateTo} darkMode={darkMode} />;
    }
  };

  return (
    <DashboardLayout 
      currentPage={currentPage} 
      onNavigate={navigateTo}
      onLogout={handleLogout}
      darkMode={darkMode}
      onToggleDarkMode={toggleDarkMode}
    >
      {renderPage()}
    </DashboardLayout>
  );
}
