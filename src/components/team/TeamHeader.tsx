import React from 'react';
import { Users, TrendingUp, Star, Target } from 'lucide-react';

interface TeamStats {
  totalMembers: number;
  growthRate: number;
  topPerformers: number;
  activeProjects: number;
}

interface TeamHeaderProps {
  stats: TeamStats;
}

export function TeamHeader({ stats }: TeamHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h1>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stats.totalMembers} total members
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stats.growthRate}% growth this month
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stats.topPerformers} top performers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stats.activeProjects} active projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}