import { 
  LayoutDashboard, 
  Award, 
  Plus, 
  CheckSquare, 
  Heart, 
  User, 
  Trophy, 
  BarChart3,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: any) => void;
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export function Sidebar({ currentPage, onNavigate, isOpen, onClose, darkMode }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'add-achievement', label: 'Add Achievement', icon: Plus },
    { id: 'manager-review', label: 'Manager Review', icon: CheckSquare },
    { id: 'feed', label: 'Appreciation Feed', icon: Heart },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'badges', label: 'Badges & Points', icon: Trophy },
    { id: 'admin', label: 'Admin Dashboard', icon: BarChart3 },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-64 ${
          darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
        } border-r z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center justify-between px-6 py-5 border-b ${
            darkMode ? 'border-neutral-700' : 'border-neutral-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h2 className={`${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                  Recognition
                </h2>
                <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Portal
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`lg:hidden p-1 rounded-lg ${
                darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
              }`}
            >
              <X className={`w-5 h-5 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md'
                          : darkMode
                          ? 'text-neutral-300 hover:bg-neutral-700'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className={`px-4 py-4 border-t ${
            darkMode ? 'border-neutral-700' : 'border-neutral-200'
          }`}>
            <div className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'} text-center`}>
              © 2025 Your Company
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
