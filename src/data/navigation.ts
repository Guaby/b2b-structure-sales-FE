import { Home, Package, Users, KanbanSquare, Bell, Settings } from 'lucide-react';

export const mainNavItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Projects', icon: Package, path: '/projects' },
  { name: 'Team', icon: Users, path: '/team' },
  { name: 'Pipeline', icon: KanbanSquare, path: '/pipeline' },
  { name: 'Notifications', icon: Bell, path: '/notifications' },
];

export const bottomNavItems = [
  { name: 'Settings', icon: Settings, path: '/settings' },
];