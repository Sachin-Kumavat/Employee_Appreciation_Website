import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
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
import { AdminAppreciationReview } from './pages/AdminAppreciationReview';
import apiRequest from './utils/ApiService';
import { PeerAppreciationPage } from './pages/PeerAppreciation'; // new page
import toast from 'react-hot-toast';

type Page =
  | 'login'
  | 'dashboard'
  | 'achievements'
  | 'add-achievement'
  | 'manager-review'
  | 'feed'
  | 'profile'
  | 'badges'
  | 'admin'
  | 'notifications'
  | 'peer-appreciation'; // added route

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedAchievementId, setSelectedAchievementId] = useState<string | null>(null);


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const isEmployee = Cookies.get("isEmployee") === "true" ? true : false;
      if (isEmployee) {
        setIsLoggedIn(true);
        setCurrentPage('dashboard');
      } else {
        setIsLoggedIn(true);
        setCurrentPage('admin');
      }
    }
  }, []);
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await apiRequest<{ message: string; token: string; user: { id: number; email: string; role: string } }>({
        method: 'POST',
        url: '/auth/login',
        data: { email, password },
      });



      const { token, user } = response.data;

      const empDetails = await apiRequest({
        method: 'POST',
        url: '/spotlight/empDetails',
        data: { email: user.email }
      })

      // Set token and isEmployee in cookies
      Cookies.set('token', token, { expires: 1 });
      Cookies.set('isEmployee', user.role === 'employee' ? 'true' : 'false', { expires: 1 });
      Cookies.set('userEmail', user.email)
      Cookies.set('userName', empDetails?.data?.employee?.name)
      Cookies.set('avatar', empDetails?.data?.employee?.avatar_url)
      Cookies.set('roleTitle', empDetails?.data?.employee?.role_title)

      setIsLoggedIn(true);
      if (user.role === 'employee') {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('admin');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('isEmployee');
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
  const isEmployee = Cookies.get("isEmployee") === "true" ? true : false;
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
        return <AdminDashboardPage darkMode={darkMode} />;
      case 'notifications':
        return <NotificationsPage navigateTo={navigateTo} />;
      case 'appreciation-review':
        return <AdminAppreciationReview navigateTo={navigateTo} />;
      case 'peer-appreciation': // new route
        return <PeerAppreciationPage navigateTo={navigateTo} />;
      default:
        return isEmployee ? <MainDashboard navigateTo={navigateTo} darkMode={darkMode} /> : <AdminDashboardPage darkMode={darkMode} />;
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
