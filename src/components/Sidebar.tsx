import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { mainNavItems, bottomNavItems, accounts } from '../data';

const getRoleBadgeColor = (role: typeof accounts[0]['role']) => {
  switch (role) {
    case 'Admin':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400';
    case 'Team Lead':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
    case 'Employee':
      return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
  }
};

const getStatusColor = (status: typeof accounts[0]['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'away':
      return 'bg-yellow-500';
    case 'offline':
      return 'bg-gray-400';
  }
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const NavButton = ({ item, isBottom = false }: { item: typeof mainNavItems[0]; isBottom?: boolean }) => (
    <button
      key={item.name}
      onClick={() => handleNavigation(item.path)}
      className={`flex items-center w-full ${
        isCollapsed ? 'justify-center px-2' : 'px-4'
      } py-3 text-sm font-medium rounded-lg transition-all duration-150 group relative ${
        location.pathname === item.path
          ? 'text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <item.icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'}`} />
      {!isCollapsed && item.name}
      
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transform translate-x-1 group-hover:translate-x-0 transition-all duration-150 whitespace-nowrap z-50">
          {item.name}
        </div>
      )}
    </button>
  );

  return (
    <aside 
      className={`hidden lg:flex lg:flex-col fixed left-0 top-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen transition-all duration-300`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 95C74.8528 95 95 74.8528 95 50C95 25.1472 74.8528 5 50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95Z" stroke="#4F46E5" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M50 65C58.2843 65 65 58.2843 65 50C65 41.7157 58.2843 35 50 35C41.7157 35 35 41.7157 35 50C35 58.2843 41.7157 65 50 65Z" stroke="#4F46E5" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!isCollapsed && <span className="text-xl font-semibold text-gray-900 dark:text-white">calin</span>}
        </div>
      </div>

      <div className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => (
          <NavButton key={item.path} item={item} />
        ))}
      </div>

      <div className="px-2 py-4 border-t border-gray-200 dark:border-gray-800 space-y-1">
        {bottomNavItems.map((item) => (
          <NavButton key={item.path} item={item} isBottom />
        ))}

        <div className="relative mt-1">
          <button
            onClick={() => setShowAccountSelector(!showAccountSelector)}
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center px-2' : 'px-4'
            } py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors`}
          >
            <div className="relative">
              <img
                src={selectedAccount.avatar}
                alt={selectedAccount.name}
                className={`${isCollapsed ? 'w-7 h-7' : 'w-7 h-7'} rounded-full object-cover`}
              />
              <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900 ${getStatusColor(selectedAccount.status)}`} />
            </div>
            {!isCollapsed && (
              <div className="ml-3 flex-1 text-left">
                <div className="text-sm font-medium truncate">{selectedAccount.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{selectedAccount.role}</div>
              </div>
            )}
          </button>

          {showAccountSelector && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowAccountSelector(false)}
              />
              <div className={`absolute ${isCollapsed ? 'left-full ml-2' : 'left-0 right-0'} bottom-full mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20`}>
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => {
                      setSelectedAccount(account);
                      setShowAccountSelector(false);
                    }}
                    className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                      selectedAccount.id === account.id
                        ? 'bg-blue-50 dark:bg-blue-500/10'
                        : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={account.avatar}
                        alt={account.name}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900 ${getStatusColor(account.status)}`} />
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {account.name}
                      </span>
                      <span className={`px-1.5 py-0.5 text-xs rounded-full ${getRoleBadgeColor(account.role)}`}>
                        {account.role}
                      </span>
                    </div>
                    {account.role === 'Admin' && (
                      <Shield className="w-4 h-4 text-purple-500 flex-shrink-0 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}