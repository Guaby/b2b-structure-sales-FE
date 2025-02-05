import React from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  CreditCard, 
  Mail, 
  Smartphone,
  Moon,
  Sun,
  Globe,
  Key,
  ChevronRight
} from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { useTheme } from '../hooks/useTheme';

export function Settings() {
  const { isDark, toggle } = useTheme();

  const sections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { name: 'Profile Information', description: 'Update your personal details and profile picture' },
        { name: 'Password & Security', description: 'Manage your password and 2FA settings' },
        { name: 'Login Sessions', description: 'View and manage your active sessions' },
      ]
    },
    {
      title: 'Organization',
      icon: Building2,
      items: [
        { name: 'Company Profile', description: 'Manage your company details and branding' },
        { name: 'Team Management', description: 'Add and manage team members' },
        { name: 'Roles & Permissions', description: 'Configure user roles and access levels' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { name: 'Email Notifications', description: 'Configure your email notification preferences' },
        { name: 'Push Notifications', description: 'Manage mobile and desktop notifications' },
        { name: 'Alert Settings', description: 'Set up custom alerts and reminders' },
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      items: [
        { name: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' },
        { name: 'API Keys', description: 'Manage API keys for integrations' },
        { name: 'Security Log', description: 'View security events and activity' },
      ]
    },
    {
      title: 'Billing',
      icon: CreditCard,
      items: [
        { name: 'Subscription', description: 'Manage your subscription plan' },
        { name: 'Payment Methods', description: 'Add and manage payment methods' },
        { name: 'Billing History', description: 'View past invoices and transactions' },
      ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Preferences Card */}
        <DashboardCard title="Preferences">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
                  <Sun className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Theme</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Toggle between light and dark mode</p>
                </div>
              </div>
              <button
                onClick={toggle}
                className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
              >
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-500/10 rounded-lg">
                  <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Language</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred language</p>
                </div>
              </div>
              <select className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </DashboardCard>

        {/* Settings Sections */}
        {sections.map((section) => (
          <DashboardCard key={section.title} title={section.title}>
            <div className="space-y-4">
              {section.items.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-500/10 rounded-lg">
                      <section.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}