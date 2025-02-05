import { UserPlus, FileCheck, CheckCircle } from 'lucide-react';
import type { Account, TeamMember, Project, Activity, Installation, UserProfile } from './types';

export const accounts: Account[] = [
  { 
    id: 'acc1', 
    name: 'Sarah Anderson', 
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&h=120&auto=format&fit=crop',
    status: 'active'
  },
  { 
    id: 'acc2', 
    name: 'Michael Chen', 
    role: 'Team Lead',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&h=120&auto=format&fit=crop',
    status: 'away'
  },
  { 
    id: 'acc3', 
    name: 'Emily Rodriguez', 
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&h=120&auto=format&fit=crop',
    status: 'active'
  }
];

export const teamMembers: TeamMember[] = [
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
    commissionRate: 7,
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
    id: 'TM3',
    name: 'Emily Rodriguez',
    role: 'Sales Broker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop',
    performance: 95,
    sales: 19,
    target: 20,
    lastActive: '1h ago',
    commissionRate: 10,
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
  }
];

export const projects: Project[] = [
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

export const activities: Activity[] = [
  {
    id: 'ACT001',
    type: 'new_client',
    user: 'Emily Chen',
    content: 'Added new client Tesla Corp',
    timestamp: '2 hours ago',
    icon: UserPlus,
    iconColor: 'bg-blue-500'
  },
  {
    id: 'ACT002',
    type: 'proposal_accepted',
    user: 'Sarah Johnson',
    content: 'Proposal accepted by Riverside Complex',
    timestamp: '5 hours ago',
    icon: FileCheck,
    iconColor: 'bg-green-500'
  },
  {
    id: 'ACT003',
    type: 'project_completed',
    user: 'David Kim',
    content: 'Completed Sunnyvale Homes installation',
    timestamp: 'Yesterday',
    icon: CheckCircle,
    iconColor: 'bg-yellow-500'
  }
];

export const upcomingInstallations: Installation[] = [
  { client: "Green Valley Estate", system: "12.5kW + 13.5kWh", date: "Mar 25", status: 85 },
  { client: "Riverside Complex", system: "8.8kW", date: "Mar 28", status: 70 },
  { client: "Sunnyvale Homes", system: "15.2kW + 27kWh", date: "Apr 2", status: 65 }
];

export const userProfile: UserProfile = {
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
  team: teamMembers,
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
    }
  ],
  activities: [
    {
      id: 'ACT001',
      type: 'project_completed',
      user: 'Sarah Anderson',
      content: 'Completed Riverside Complex installation',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'bg-green-500'
    },
    {
      id: 'ACT002',
      type: 'new_client',
      user: 'Sarah Anderson',
      content: 'Added new client Tesla Corporation',
      timestamp: '5 hours ago',
      icon: UserPlus,
      iconColor: 'bg-blue-500'
    }
  ]
};