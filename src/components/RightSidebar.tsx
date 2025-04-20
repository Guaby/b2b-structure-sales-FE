import React from 'react';
import { Calendar, UserPlus, Users, FileCheck, CheckCircle, Star } from 'lucide-react';

interface Activity {
  type: 'new_client' | 'new_team_member' | 'project_assignment' | 'proposal_accepted' | 'project_completed';
  user: string;
  content: string;
  timestamp: string;
  icon: React.ElementType;
  iconColor: string;
}

const activities: Activity[] = [
  {
    type: 'new_client',
    user: 'Emily Chen',
    content: 'Added new client Tesla Corp',
    timestamp: '2 hours ago',
    icon: UserPlus,
    iconColor: 'bg-blue-500'
  },
  {
    type: 'project_assignment',
    user: 'Michael Scott',
    content: 'Assigned to Green Valley Project',
    timestamp: '4 hours ago',
    icon: Users,
    iconColor: 'bg-purple-500'
  },
  {
    type: 'proposal_accepted',
    user: 'Sarah Johnson',
    content: 'Proposal accepted by Riverside Complex',
    timestamp: '5 hours ago',
    icon: FileCheck,
    iconColor: 'bg-green-500'
  },
  {
    type: 'project_completed',
    user: 'David Kim',
    content: 'Completed Sunnyvale Homes installation',
    timestamp: 'Yesterday',
    icon: CheckCircle,
    iconColor: 'bg-yellow-500'
  },
  {
    type: 'new_team_member',
    user: 'HR Team',
    content: 'Welcomed Alex Rivera to the team',
    timestamp: 'Yesterday',
    icon: Star,
    iconColor: 'bg-indigo-500'
  },
];

interface Installation {
  client: string;
  system: string;
  date: string;
  status: number;
}

const upcomingInstallations: Installation[] = [
  { client: "Green Valley Estate", system: "12.5kW + 13.5kWh", date: "Mar 25", status: 85 },
  { client: "Riverside Complex", system: "8.8kW", date: "Mar 28", status: 70 },
  { client: "Sunnyvale Homes", system: "15.2kW + 27kWh", date: "Apr 2", status: 65 },
];

export function RightSidebar() {
  return (
    <aside className="hidden xl:block fixed right-0 top-16 w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 h-[calc(100vh-4rem)] transition-colors duration-200">
      <div className="h-full overflow-y-auto">
        {/* Activities Section */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (

              <div key={index} className="flex items-start space-x-3 bg-red-200">
                <div className={`${activity.iconColor} p-2 rounded-full`}>
                  <activity.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-medium">{activity.user}</span> {activity.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                </div>
              </div>

            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-2"></div>

        {/* Upcoming Installations Section */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Upcoming Installations</h3>
          <div className="space-y-4">
            {upcomingInstallations.map((install, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">{install.client}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{install.system}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{install.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}