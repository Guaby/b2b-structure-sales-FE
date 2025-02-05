import React from 'react';
import { Sun, Users, ClipboardList, DollarSign, Calendar, Star, Clock, UserPlus, FileCheck, CheckCircle } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { StatCard } from '../components/StatCard';
import { LeadTable } from '../components/LeadTable';
import { SalesChart } from '../components/SalesChart';
import { Welcome } from '../components/Welcome';
import { TeamPerformanceAlert } from '../components/TeamPerformanceAlert';

const teamMembers = [
  {
    id: 'TM1',
    name: 'Sarah Johnson',
    role: 'Sales Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop',
    performance: 115,
    sales: 28,
    target: 25,
    lastActive: '2h ago',
    commissionRate: 12
  },
  {
    id: 'TM2',
    name: 'Michael Chen',
    role: 'Sales Associate',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
    performance: 65,
    sales: 8,
    target: 12,
    lastActive: '30m ago',
    commissionRate: 7
  },
  {
    id: 'TM3',
    name: 'Emily Rodriguez',
    role: 'Sales Broker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop',
    performance: 95,
    sales: 19,
    target: 20,
    lastActive: '1h ago',
    commissionRate: 10
  },
  {
    id: 'TM4',
    name: 'David Kim',
    role: 'Sales Consultant',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop',
    performance: 125,
    sales: 25,
    target: 20,
    lastActive: '15m ago',
    commissionRate: 9
  },
  {
    id: 'TM5',
    name: 'Lisa Thompson',
    role: 'Sales Associate',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&h=250&auto=format&fit=crop',
    performance: 82,
    sales: 10,
    target: 12,
    lastActive: '45m ago',
    commissionRate: 7
  }
];

const activities = [
  {
    type: 'new_client',
    user: 'Emily Chen',
    content: 'Added new client Tesla Corp',
    timestamp: '2 hours ago',
    icon: UserPlus,
    iconColor: 'bg-blue-500'
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

const upcomingInstallations = [
  { client: "Green Valley Estate", system: "12.5kW + 13.5kWh", date: "Mar 25", status: 85 },
  { client: "Riverside Complex", system: "8.8kW", date: "Mar 28", status: 70 },
  { client: "Sunnyvale Homes", system: "15.2kW + 27kWh", date: "Apr 2", status: 65 },
];

export function Dashboard() {
  const [showTeamAlert, setShowTeamAlert] = React.useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Welcome 
        name="Sarah Anderson"
        role="Sales Manager"
        avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop"
      />

      {showTeamAlert && (
        <TeamPerformanceAlert
          members={teamMembers}
          onDismiss={() => setShowTeamAlert(false)}
        />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Active Projects"
              value="42"
              trend={8.4}
              icon={Sun}
              route="/projects"
            />
            <StatCard
              title="Active Employees"
              value="28"
              trend={12.3}
              icon={Users}
              route="/team"
            />
            <StatCard
              title="Active Tasks"
              value="156"
              trend={-4.2}
              icon={ClipboardList}
              route="/tasks"
            />
            <StatCard
              title="Revenue"
              value="$2.4M"
              trend={15.8}
              icon={DollarSign}
              route="/finance"
            />
          </div>

          {/* Charts */}
          <DashboardCard title="Performance Overview">
            <SalesChart />
          </DashboardCard>

          {/* Recent Leads Table */}
          <DashboardCard title="Recent Site Assessments">
            <LeadTable />
          </DashboardCard>
        </div>

        {/* Right Side Content */}
        <div className="space-y-6">
          {/* Activities Section */}
          <DashboardCard title="Recent Activities">
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
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
          </DashboardCard>

          {/* Upcoming Installations Section */}
          <DashboardCard title="Upcoming Installations">
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
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}