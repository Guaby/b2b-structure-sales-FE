export interface TeamMember {
  id: string;
  name: string;
  role: 'Manager' | 'Consultant' | 'Broker' | 'Associate';
  email: string;
  phone: string;
  avatar: string;
  projects: number;
  revenue: number;
  reportsTo?: string;
  location: string;
  performance?: number;
  commission?: number;
  managerCommission?: number;
  teamMembers?: TeamMember[];
}