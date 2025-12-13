import { useState } from 'react';
import { Bell, Menu, Search, Moon, Sun, LogOut, Settings, User } from 'lucide-react';
import { currentUser, mockNotifications } from '../../data/mockData';
import Cookies from 'js-cookie';

interface TopNavProps {
  onMenuClick: () => void;
  onNavigate: (page: any) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function TopNav({ onMenuClick, onNavigate, onLogout, darkMode, onToggleDarkMode }: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const userName = Cookies.get("userName");
  const userEmail = Cookies.get("userEmail");
  const roleTitle = Cookies.get("roleTitle");
  const avatar = Cookies.get("avatar");
  
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className={`sticky top-0 z-20 ${
      darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
    } border-b`}>
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className={`lg:hidden p-2 rounded-lg ${
              darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
            }`}
          >
            <Menu className={`w-6 h-6 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`} />
          </button>

          {/* Search */}
          <div className="hidden md:block relative">
            <Search className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 ${
              darkMode ? 'text-neutral-400' : 'text-neutral-400'
            }`} />
            <input
              type="text"
              placeholder="Search achievements, people..."
              className={`w-80 pl-10 pr-4 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-neutral-700 text-neutral-200 placeholder-neutral-400 border-neutral-600' 
                  : 'bg-neutral-50 text-neutral-900 placeholder-neutral-500 border-neutral-200'
              } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className={`p-2 rounded-lg relative transition-colors ${
                darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
              }`}
            >
              <Bell className={`w-5 h-5 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-80 ${
                darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
              } border rounded-lg shadow-xl overflow-hidden`}>
                <div className={`px-4 py-3 border-b ${
                  darkMode ? 'border-neutral-700' : 'border-neutral-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className={darkMode ? 'text-white' : 'text-neutral-900'}>
                      Notifications
                    </h3>
                    <button
                      onClick={() => onNavigate('notifications')}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      View all
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b ${
                        darkMode ? 'border-neutral-700' : 'border-neutral-100'
                      } ${
                        !notification.read 
                          ? darkMode ? 'bg-neutral-700' : 'bg-blue-50' 
                          : ''
                      } hover:${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'} cursor-pointer`}
                    >
                      <h4 className={`${darkMode ? 'text-white' : 'text-neutral-900'} mb-1`}>
                        {notification.title}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-600'} mb-1`}>
                        {notification.message}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className={`flex items-center gap-2 sm:gap-3 p-1 sm:p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'
              }`}
            >
              <img
                src={avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt={userName}
                className="w-8 h-8 rounded-full border-2 border-blue-600"
              />
              <div className="hidden sm:block text-left">
                <p className={`${darkMode ? 'text-white' : 'text-neutral-900'} leading-tight`}>
                  {userName}
                </p>
                <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {roleTitle}
                </p>
              </div>
            </button>

            {showProfile && (
              <div className={`absolute right-0 mt-2 w-56 ${
                darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
              } border rounded-lg shadow-xl overflow-hidden`}>
                <div className={`px-4 py-3 border-b ${
                  darkMode ? 'border-neutral-700' : 'border-neutral-200'
                }`}>
                  <p className={darkMode ? 'text-white' : 'text-neutral-900'}>
                    {userName}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {userEmail}
                  </p>
                </div>
                {/* <button
                  onClick={() => onNavigate('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 ${
                    darkMode ? 'hover:bg-neutral-700 text-neutral-300' : 'hover:bg-neutral-50 text-neutral-700'
                  } transition-colors`}
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button> */}
                <button
                  className={`w-full flex items-center gap-3 px-4 py-2.5 ${
                    darkMode ? 'hover:bg-neutral-700 text-neutral-300' : 'hover:bg-neutral-50 text-neutral-700'
                  } transition-colors`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={onLogout}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 border-t ${
                    darkMode 
                      ? 'border-neutral-700 hover:bg-neutral-700 text-red-400' 
                      : 'border-neutral-200 hover:bg-red-50 text-red-600'
                  } transition-colors`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
