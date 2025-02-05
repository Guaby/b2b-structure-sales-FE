import { LucideIcon } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  role: 'Sales Manager' | 'Sales Associate' | 'Sales Broker' | 'Sales Consultant';
  avatar: string;
  performance: number;
  sales: number;
  target: number;
  lastActive: string;
  commissionRate: number;
  revenue?: number;
  commission?: number;
  managerCommission?: number;
  projects?: {
    name: string;
    value: number;
    commission: number;
  }[];
}

export interface Account {
  id: string;
  name: string;
  role: 'Admin' | 'Team Lead' | 'Employee';
  avatar: string;
  status: 'active' | 'away' | 'offline';
}

export interface Project {
  id: string;
  client: string;
  address: string;
  battery: boolean;
  value: number;
  phase: keyof typeof phaseLabels;
  startDate: string;
  manager: string;
  systemSize?: string;
  team?: {
    name: string;
    role: string;
    avatar: string;
  }[];
  energyData?: {
    production: number;
    consumption: number;
    savings: number;
    gridExport: number;
    batteryLevel: number;
  };
}

export interface Activity {
  id: string;
  type: 'new_client' | 'project_assignment' | 'proposal_accepted' | 'project_completed' | 'new_team_member';
  user: string;
  content: string;
  timestamp: string;
  icon: LucideIcon;
  iconColor: string;
}

export interface Installation {
  client: string;
  system: string;
  date: string;
  status: number;
}

export interface Phase {
  id: string;
  name: string;
  icon: LucideIcon;
  completed: boolean;
  current: boolean;
  date: string;
  payout: number;
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  accountType: string;
  avatar: string;
  performance: number;
  stats: {
    monthlyRevenue: number;
    monthlyGrowth: number;
    activeProjects: number;
    projectGrowth: number;
    teamSize: number;
    teamGrowth: number;
    completionRate: number;
    completionGrowth: number;
  };
  team: TeamMember[];
  projects: {
    id: string;
    name: string;
    status: string;
    value: number;
    commission: number;
    startDate: string;
    completionDate: string;
    type: string;
  }[];
  activities: Activity[];
}