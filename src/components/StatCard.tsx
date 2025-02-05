import React from 'react';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: LucideIcon;
  route: string;
}

export function StatCard({ title, value, trend, icon: Icon, route }: StatCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(route)}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 shrink-0">
                <Icon className="w-5 h-5 text-gray-900 dark:text-gray-100" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                {title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                {value}
              </p>
              {trend !== undefined && (
                <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </span>
              )}
              <div className="ml-auto text-gray-400 dark:text-gray-500">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}