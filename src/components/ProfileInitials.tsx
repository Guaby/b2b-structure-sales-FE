import React from 'react';

interface ProfileInitialsProps {
  name: string;
  className?: string;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  return names.length > 1
    ? `${names[0][0]}${names[names.length - 1][0]}`
    : name[0];
};

const getColorClass = (name: string) => {
  const colors = [
    'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
    'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
    'bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400',
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
  ];
  
  // Use the sum of character codes to determine color
  const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charSum % colors.length];
};

export function ProfileInitials({ name, className = '' }: ProfileInitialsProps) {
  const initials = getInitials(name);
  const colorClass = getColorClass(name);

  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm ${colorClass} ${className}`}>
      {initials}
    </div>
  );
}