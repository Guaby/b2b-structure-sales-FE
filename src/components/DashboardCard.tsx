import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ title, children, className = '' }: DashboardCardProps) {
  return (
    <div className={`bg-white dark:bg-[#121216] rounded-xl shadow-md p-6 transition-colors duration-200 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

//bg-gray-900