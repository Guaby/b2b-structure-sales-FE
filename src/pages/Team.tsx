import React, { useState } from 'react';
import { TeamHeader } from '../components/team/TeamHeader';
import { TeamStats } from '../components/team/TeamStats';
import { TeamGrid } from '../components/team/TeamGrid';
import { TeamMemberSidebar } from '../components/TeamMemberSidebar';
import type { TeamMember } from '../types/team';

const teamMembers: TeamMember[] = [
  {
    id: 'TM001',
    name: 'Sarah Anderson',
    role: 'Manager',
    email: 'sarah.anderson@solarcrm.com',
    phone: '(555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop',
    projects: 15,
    revenue: 187500,
    location: 'San Francisco, CA',
    performance: 115,
    commission: 28125,
    teamMembers: []
  },
  {
    id: 'TM002',
    name: 'Michael Chen',
    role: 'Consultant',
    email: 'michael.chen@solarcrm.com',
    phone: '(555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
    projects: 12,
    revenue: 142800,
    reportsTo: 'Sarah Anderson',
    location: 'Los Angeles, CA',
    performance: 95,
    commission: 21420
  },
  {
    id: 'TM003',
    name: 'Emily Rodriguez',
    role: 'Broker',
    email: 'emily.rodriguez@solarcrm.com',
    phone: '(555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250&h=250&auto=format&fit=crop',
    projects: 18,
    revenue: 216000,
    reportsTo: 'Sarah Anderson',
    location: 'San Diego, CA',
    performance: 125,
    commission: 32400
  },
  {
    id: 'TM004',
    name: 'David Kim',
    role: 'Associate',
    email: 'david.kim@solarcrm.com',
    phone: '(555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop',
    projects: 8,
    revenue: 96000,
    reportsTo: 'Michael Chen',
    location: 'Sacramento, CA',
    performance: 85,
    commission: 14400
  },
  {
    id: 'TM005',
    name: 'Lisa Thompson',
    role: 'Consultant',
    email: 'lisa.thompson@solarcrm.com',
    phone: '(555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&h=250&auto=format&fit=crop',
    projects: 10,
    revenue: 120000,
    reportsTo: 'Sarah Anderson',
    location: 'San Jose, CA',
    performance: 105,
    commission: 18000
  }
];

export function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const stats = {
    totalMembers: teamMembers.length,
    growthRate: 15,
    topPerformers: teamMembers.filter(m => m.performance && m.performance >= 110).length,
    activeProjects: teamMembers.reduce((sum, member) => sum + member.projects, 0)
  };

  const totalRevenue = teamMembers.reduce((sum, member) => sum + member.revenue, 0);
  const averagePerformance = Math.round(
    teamMembers.reduce((sum, member) => sum + (member.performance || 0), 0) / teamMembers.length
  );

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TeamHeader stats={stats} />
      
      <TeamStats
        totalRevenue={totalRevenue}
        averagePerformance={averagePerformance}
        teamSize={teamMembers.length}
      />

      <TeamGrid
        members={teamMembers}
        onMemberClick={setSelectedMember}
      />

      <TeamMemberSidebar
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}