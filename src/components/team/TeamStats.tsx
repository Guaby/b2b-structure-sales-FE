import React from 'react';
import { DollarSign, Users, Target } from 'lucide-react';

interface TeamStatsProps {
  totalRevenue: number;
  averagePerformance: number;
  teamSize: number;
}

export function TeamStats({ totalRevenue, averagePerformance, teamSize }: TeamStatsProps) {
  const stats = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: `$${(totalRevenue / 1000).toFixed(1)}k`,
      trend: '+12.5%',
      trendColor: 'text-green-500'
    },
    {
      icon: Target,
      label: 'Avg. Performance',
      value: `${averagePerformance}%`,
      trend: '+5.2%',
      trendColor: 'text-green-500'
    },
    {
      icon: Users,
      label: 'Team Size',
      value: teamSize.toString(),
      trend: '+2',
      trendColor: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <stat.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                <span className={`text-sm ${stat.trendColor}`}>{stat.trend}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}