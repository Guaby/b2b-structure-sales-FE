import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { PipelineCard } from './PipelineCard';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: {
    name: string;
    avatar: string;
  };
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  value: number;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface PipelineColumnProps {
  column: Column;
  isDark: boolean;
}

export function PipelineColumn({ column, isDark }: PipelineColumnProps) {
  const { setNodeRef } = useDroppable({
    id: `column-${column.id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-shrink-0 w-80 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          {column.title}
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {column.tasks.length} tasks
        </span>
      </div>

      <SortableContext
        items={column.tasks.map(task => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {column.tasks.map(task => (
            <PipelineCard
              key={task.id}
              task={task}
              isDark={isDark}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}