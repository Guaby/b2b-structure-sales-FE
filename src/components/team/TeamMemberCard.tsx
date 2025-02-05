import React from 'react';
import { TrendingUp } from 'lucide-react';
import { TeamMember } from '../../types/team';

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: (member: TeamMember) => void;
}

export function TeamMemberCard({ member, onClick }: TeamMemberCardProps) {
  const roleColors = {
    Manager: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
    Consultant: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    Broker: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
    Associate: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
  };

  return (
    <div 
      onClick={() => onClick(member)}
      className="bg-white dark:bg-gray-900 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800"
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {member.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[member.role]}`}>
              {member.role}
            </span>
          </div>
        </div>
        {member.performance && (
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            member.performance >= 100
              ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
          }`}>
            {member.performance}%
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            ${(member.revenue / 1000).toFixed(1)}k
          </span>
        </div>
        {member.reportsTo && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Reports to {member.reportsTo}
          </div>
        )}
      </div>
    </div>
  );
}