import { TrendingUp, Award, CheckCircle, Users, Trophy } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { RecentAchievements } from '../components/dashboard/RecentAchievements';
import { AppreciationFeedWidget } from '../components/dashboard/AppreciationFeedWidget';
import { QuickAppreciate } from '../components/dashboard/QuickAppreciate';
import { LeaderboardWidget } from '../components/dashboard/LeaderboardWidget';
import { MonthlyTrendChart } from '../components/dashboard/MonthlyTrendChart';
import { FloatingActionButton } from '../components/ui/FloatingActionButton';
import { mockAchievements, mockAppreciations, currentUser } from '../data/mockData';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import apiRequest from '../utils/ApiService';

interface MainDashboardProps {
  navigateTo: (page: any) => void;
  darkMode: boolean;
}

export function MainDashboard({ navigateTo, darkMode }: MainDashboardProps) {
  const [showMobileAppreciate, setShowMobileAppreciate] = useState(false);
  const totalRecognitions = currentUser.recognitionsReceived + currentUser.recognitionsGiven;
  // const pendingApprovals = mockAchievements.filter(a => a.status === 'pending').length;

  const EmployeeName = Cookies.get("userName")


  const [totalRecognition, setTotalRecognition] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [totalBadges, setTotalBadges] = useState(0);

  const userEmail = Cookies.get("userEmail")

  const getEmpDashboardDetails = async () => {
    try {

      const res = await apiRequest({
        method: 'POST',
        url: '/spotlight/empDashboard',
        data: { email: userEmail }
      })

      setTotalRecognition(res?.data?.summary?.total_recognitions)
      setPendingApprovals(res?.data?.summary?.pending_for_approval)
      setUserPoints(res?.data?.summary?.total_points)
      setTotalBadges(res?.data?.summary?.badges_held_count)
    } catch (error) {
      console.log("error of emp dashboard---------->", error)
    }
  }
  useEffect(() => {
    getEmpDashboardDetails()
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={darkMode ? 'text-white' : 'text-neutral-900'}>
          Welcome back, {EmployeeName.split(' ')[0]}! 👋
        </h1>
        <p className={`${darkMode ? 'text-neutral-400' : 'text-neutral-600'} mt-1`}>
          Here&apos;s what&apos;s happening with your team today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Recognitions"
          value={totalRecognition}
          icon={<Award className="w-6 h-6" />}
          // trend={{ value: 12, isPositive: true }}
          color="blue"
          darkMode={darkMode}
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals}
          icon={<CheckCircle className="w-6 h-6" />}
          color="orange"
          darkMode={darkMode}
        />
        <StatCard
          title="Your Points"
          value={userPoints}
          icon={<TrendingUp className="w-6 h-6" />}
          // trend={{ value: 8, isPositive: true }}
          color="green"
          darkMode={darkMode}
        />
        <StatCard
          title="Total Badges"
          value={totalBadges}
          icon={<Trophy className="w-6 h-6" />}
          color="purple"
          darkMode={darkMode}
        />
      </div>


      {/* Charts and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyTrendChart darkMode={darkMode} />
        <LeaderboardWidget darkMode={darkMode} navigateTo={navigateTo} />
      </div>

      {/* Recent Achievements and Quick Appreciate */}
      {/* <div> */}
      {/* <div>
          <RecentAchievements
            achievements={mockAchievements.slice(0, 4)}
            navigateTo={navigateTo}
            darkMode={darkMode}
          />
        </div> */}
      {/* <div className="hidden lg:block">
          <QuickAppreciate darkMode={darkMode} />
        </div> */}
      {/* </div> */}

      {/* Appreciation Feed */}
      {/* <AppreciationFeedWidget
        appreciations={mockAppreciations.slice(0, 3)}
        navigateTo={navigateTo}
        darkMode={darkMode}
      /> */}

      {/* Mobile Quick Appreciate FAB */}
      <FloatingActionButton onClick={() => setShowMobileAppreciate(true)} />

      {/* Mobile Quick Appreciate Modal */}
      {showMobileAppreciate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:hidden animate-in fade-in duration-200">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-neutral-900">Quick Appreciate</h3>
              <button
                onClick={() => setShowMobileAppreciate(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>
            <QuickAppreciate darkMode={false} />
          </div>
        </div>
      )}
    </div>
  );
}