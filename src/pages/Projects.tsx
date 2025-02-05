import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, 
  Battery, 
  Plus, 
  TrendingUp,
  Clock,
  DollarSign,
  Zap,
  Calendar,
  ArrowUpRight,
  Users,
  Target,
  Briefcase,
  Filter,
  Check,
  ChevronDown
} from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { StatCard } from '../components/StatCard';

const phaseLabels = {
  all: 'All Phases',
  lead: 'New Lead',
  completed_sale: 'Completed Sale',
  sra_approved: 'SRA Approved',
  technical_visit: 'Technical Visit',
  roof_inspection: 'Roof Inspection',
  design: 'Design',
  installation_date: 'Installation Date',
  select_installation: 'Select Installation Date',
  quality_control: 'Quality Control Visit',
  final_inspection: 'Final Inspection',
  luma_approved: 'Luma Approved',
  closed: 'Closed'
} as const;

const phaseColors = {
  lead: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  completed_sale: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
  sra_approved: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  technical_visit: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
  roof_inspection: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
  design: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
  installation_date: 'bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400',
  select_installation: 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400',
  quality_control: 'bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400',
  final_inspection: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400',
  luma_approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  closed: 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400'
} as const;

interface Project {
  id: string;
  client: string;
  address: string;
  battery: boolean;
  value: number;
  phase: keyof typeof phaseLabels;
  startDate: string;
  manager: string;
}

const projects: Project[] = [
  {
    id: 'LEAD001',
    client: 'Tesla Corporation',
    address: '1000 Solar Street, Sunnyvale, CA',
    battery: true,
    value: 45000,
    phase: 'lead',
    startDate: '2024-03-15',
    manager: 'Sarah Anderson'
  },
  {
    id: 'LEAD002',
    client: 'Green Energy Co',
    address: '2000 Eco Drive, Mountain View, CA',
    battery: false,
    value: 32000,
    phase: 'lead',
    startDate: '2024-03-14',
    manager: 'Michael Chen'
  },
  {
    id: 'PRJ003',
    client: 'Riverside Complex',
    address: '3000 River Road, San Jose, CA',
    battery: true,
    value: 52000,
    phase: 'completed_sale',
    startDate: '2024-03-10',
    manager: 'Emily Rodriguez'
  }
];

const managers = [
  { 
    name: 'Sarah Anderson', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop'
  },
  { 
    name: 'Michael Chen', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop'
  },
  { 
    name: 'Emily Rodriguez', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop'
  },
  { 
    name: 'David Kim', 
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop'
  },
  { 
    name: 'Lisa Thompson', 
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&h=250&auto=format&fit=crop'
  }
];

export function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<'all' | keyof typeof phaseLabels>('all');
  const [showPhaseFilter, setShowPhaseFilter] = useState(false);
  const navigate = useNavigate();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPhase = selectedPhase === 'all' || project.phase === selectedPhase;

    return matchesSearch && matchesPhase;
  });

  const totalValue = projects.reduce((sum, project) => sum + project.value, 0);
  const activeProjects = projects.filter(p => !['closed', 'luma_approved', 'lead'].includes(p.phase)).length;
  const upcomingInstallations = projects.filter(p => p.phase === 'installation_date').length;
  const averageProjectValue = totalValue / projects.length;

  const stats = [
    {
      title: 'Active Projects',
      value: activeProjects,
      trend: 12.4,
      icon: Zap,
      route: '/projects/active'
    },
    {
      title: 'Total Pipeline Value',
      value: `$${(totalValue / 1000000).toFixed(1)}M`,
      trend: 8.2,
      icon: DollarSign,
      route: '/finance'
    },
    {
      title: 'Upcoming Installations',
      value: upcomingInstallations,
      trend: 4.8,
      icon: Calendar,
      route: '/calendar'
    },
    {
      title: 'Average Project Value',
      value: `$${Math.round(averageProjectValue / 1000)}k`,
      trend: 5.4,
      icon: TrendingUp,
      route: '/analytics'
    }
  ];

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {managers.slice(0, 5).map((manager) => (
                  <img
                    key={manager.name}
                    src={manager.avatar}
                    alt={manager.name}
                    className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900"
                  />
                ))}
                {managers.length > 5 && (
                  <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      +{managers.length - 5}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {managers.length} team members
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {projects.filter(p => p.phase === 'completed_sale').length} completed this month
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {projects.filter(p => p.phase !== 'closed').length} active projects
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => navigate('/create-lead')}
          className="btn btn-primary flex items-center gap-2 shrink-0"
        >
          <Plus className="w-5 h-5" />
          Create
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            icon={stat.icon}
            route={stat.route}
          />
        ))}
      </div>

      <DashboardCard>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:w-96">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowPhaseFilter(!showPhaseFilter)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {selectedPhase === 'all' ? 'All Phases' : phaseLabels[selectedPhase]}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showPhaseFilter && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPhaseFilter(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                    {Object.entries(phaseLabels).map(([phase, label]) => (
                      <button
                        key={phase}
                        onClick={() => {
                          setSelectedPhase(phase as keyof typeof phaseLabels);
                          setShowPhaseFilter(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      >
                        <div className="w-4">
                          {selectedPhase === phase && (
                            <Check className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          selectedPhase === phase
                            ? 'font-medium text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Project</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">System</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Value</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Phase</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Start Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Manager</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr 
                    key={project.id} 
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                    onClick={() => navigate(project.phase === 'lead' ? `/proposals/${project.id}` : `/projects/${project.id}`)}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{project.client}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{project.id}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{project.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-yellow-500" />
                        {project.battery && <Battery className="h-5 w-5 text-green-500" />}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                      ${project.value.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <div 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${phaseColors[project.phase]}`}
                      >
                        {phaseLabels[project.phase]}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {project.startDate}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={managers.find(m => m.name === project.manager)?.avatar}
                          alt={project.manager}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{project.manager}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}