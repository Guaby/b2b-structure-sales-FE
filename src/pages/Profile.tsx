import React, { useState } from 'react';
import { 
  Shield, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Calendar, 
  CheckCircle, 
  UserPlus, 
  Star,
  Users,
  Percent,
  Target,
  Award,
  BarChart3,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { TeamMemberSidebar } from '../components/TeamMemberSidebar';

const userProfile = {
  id: 'USR001',
  name: 'Sarah Anderson',
  role: 'Sales Manager',
  accountType: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop',
  performance: 115,
  stats: {
    monthlyRevenue: 2450000,
    monthlyGrowth: 12.5,
    activeProjects: 42,
    projectGrowth: 8.4,
    teamSize: 28,
    teamGrowth: 15.3,
    completionRate: 95,
    completionGrowth: 5.2
  },
  team: [
    {
      id: 'TM002',
      name: 'Michael Chen',
      role: 'Sales Associate',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
      performance: 65,
      sales: 8,
      revenue: 320000,
      commission: 22400,
      managerCommission: 19200,
      projects: [
        {
          name: 'Green Valley Estate',
          value: 180000,
          commission: 12600
        },
        {
          name: 'Sunnyvale Residence',
          value: 140000,
          commission: 9800
        }
      ]
    },
    {
      id: 'TM003',
      name: 'Emily Rodriguez',
      role: 'Sales Broker',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop',
      performance: 95,
      sales: 19,
      revenue: 760000,
      commission: 76000,
      managerCommission: 7600,
      projects: [
        {
          name: 'Downtown Complex',
          value: 420000,
          commission: 42000
        },
        {
          name: 'Harbor View Hotel',
          value: 340000,
          commission: 34000
        }
      ]
    },
    {
      id: 'TM004',
      name: 'David Kim',
      role: 'Sales Consultant',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop',
      performance: 125,
      sales: 25,
      revenue: 950000,
      commission: 85500,
      managerCommission: 19000,
      projects: [
        {
          name: 'Tech Campus One',
          value: 550000,
          commission: 49500
        },
        {
          name: 'Innovation Center',
          value: 400000,
          commission: 36000
        }
      ]
    }
  ],
  projects: [
    {
      id: 'PRJ001',
      name: 'Tesla Corporation',
      status: 'In Progress',
      value: 450000,
      commission: 54000,
      startDate: '2024-03-15',
      completionDate: '2024-04-30',
      type: 'Commercial'
    },
    {
      id: 'PRJ002',
      name: 'Riverside Complex',
      status: 'Completed',
      value: 320000,
      commission: 38400,
      startDate: '2024-02-01',
      completionDate: '2024-03-15',
      type: 'Residential'
    },
    {
      id: 'PRJ003',
      name: 'Sunnyvale Mall',
      status: 'In Progress',
      value: 780000,
      commission: 93600,
      startDate: '2024-03-01',
      completionDate: '2024-05-15',
      type: 'Commercial'
    },
    {
      id: 'PRJ004',
      name: 'Mountain Residences',
      status: 'In Progress',
      value: 280000,
      commission: 33600,
      startDate: '2024-03-10',
      completionDate: '2024-04-20',
      type: 'Residential'
    }
  ],
  activities: [
    {
      id: 'ACT001',
      type: 'project_completed',
      content: 'Completed Riverside Complex installation',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'bg-green-500'
    },
    {
      id: 'ACT002',
      type: 'new_client',
      content: 'Added new client Tesla Corporation',
      timestamp: '5 hours ago',
      icon: UserPlus,
      iconColor: 'bg-blue-500'
    },
    {
      id: 'ACT003',
      type: 'achievement',
      content: 'Reached 115% performance target',
      timestamp: 'Yesterday',
      icon: Star,
      iconColor: 'bg-yellow-500'
    }
  ]
};

export function Profile() {
  const [selectedTeamMember, setSelectedTeamMember] = useState<typeof userProfile.team[0] | null>(null);
  const totalTeamRevenue = userProfile.team.reduce((sum, member) => sum + member.revenue, 0);
  const totalTeamCommission = userProfile.team.reduce((sum, member) => sum + member.managerCommission, 0);
  const totalDirectCommission = userProfile.projects.reduce((sum, project) => sum + project.commission, 0);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-800"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {userProfile.name}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-gray-600 dark:text-gray-400">{userProfile.role}</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-purple-600 dark:text-purple-400">{userProfile.accountType}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">Performance</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {userProfile.performance}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <DollarSign className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Revenue</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              ${(userProfile.stats.monthlyRevenue / 1000000).toFixed(1)}M
            </span>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              +{userProfile.stats.monthlyGrowth}%
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <FileText className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Projects</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {userProfile.stats.activeProjects}
            </span>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              +{userProfile.stats.projectGrowth}%
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Users className="w-4 h-4 text-indigo-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Team</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {userProfile.stats.teamSize}
            </span>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              +{userProfile.stats.teamGrowth}%
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Success</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {userProfile.stats.completionRate}%
            </span>
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              +{userProfile.stats.completionGrowth}%
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <DashboardCard title="Team Overview">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Team Size</span>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {userProfile.team.length} Members
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Team Revenue</span>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  ${totalTeamRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Team Commissions</span>
                </div>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">
                  ${totalTeamCommission.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {userProfile.team.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedTeamMember(member)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{member.role}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          member.performance >= 100
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                        }`}>
                          {member.performance}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      ${member.revenue.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      ${member.managerCommission.toLocaleString()} commission
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard title="Direct Projects">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Commission</div>
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    ${totalDirectCommission.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {userProfile.projects.length} Active Projects
              </div>
            </div>
            
            <div className="space-y-4">
              {userProfile.projects.map((project) => (
                <button 
                  key={project.id}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${
                          project.status === 'Completed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{project.type}</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Due {project.completionDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        ${project.value.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        ${project.commission.toLocaleString()}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="Recent Activities">
            <div className="space-y-4">
              {userProfile.activities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3"
                >
                  <div className={`${activity.iconColor} p-2 rounded-full flex-shrink-0`}>
                    <activity.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.content}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>

      <TeamMemberSidebar 
        member={selectedTeamMember} 
        onClose={() => setSelectedTeamMember(null)} 
      />
    </div>
  );
}