import React from 'react';
import { TeamMemberCard } from './TeamMemberCard';
import { TeamMember } from '../../types/team';

interface TeamGridProps {
  members: TeamMember[];
  onMemberClick: (member: TeamMember) => void;
}

export function TeamGrid({ members, onMemberClick }: TeamGridProps) {
  const managers = members.filter(m => m.role === 'Manager');
  const otherMembers = members.filter(m => m.role !== 'Manager');

  return (
    <div className="space-y-8">
      {managers.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {managers.map(manager => (
              <TeamMemberCard
                key={manager.id}
                member={manager}
                onClick={onMemberClick}
              />
            ))}
          </div>
        </div>
      )}

      {otherMembers.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {otherMembers.map(member => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={onMemberClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}