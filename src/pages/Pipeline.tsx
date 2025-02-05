import React, { useState, useRef, useEffect } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { PipelineColumn } from '../components/pipeline/PipelineColumn';
import { PipelineCard } from '../components/pipeline/PipelineCard';
import { DashboardCard } from '../components/DashboardCard';
import { useTheme } from '../hooks/useTheme';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

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

const initialColumns: Column[] = [
  {
    id: 'new',
    title: 'New Leads',
    tasks: [
      {
        id: 'task1',
        title: 'Tesla Corporation',
        description: 'Commercial solar installation inquiry',
        assignee: {
          name: 'Sarah Anderson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&h=120&auto=format&fit=crop'
        },
        dueDate: '2024-03-25',
        priority: 'high',
        value: 45000
      },
      {
        id: 'task2',
        title: 'Green Valley Estate',
        description: 'Residential solar + battery system',
        assignee: {
          name: 'Michael Chen',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&h=120&auto=format&fit=crop'
        },
        dueDate: '2024-03-28',
        priority: 'medium',
        value: 32000
      }
    ]
  },
  {
    id: 'contact',
    title: 'Contact Made',
    tasks: [
      {
        id: 'task3',
        title: 'Riverside Complex',
        description: 'Multi-unit residential project',
        assignee: {
          name: 'Emily Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&h=120&auto=format&fit=crop'
        },
        dueDate: '2024-03-30',
        priority: 'high',
        value: 78000
      }
    ]
  },
  {
    id: 'proposal',
    title: 'Proposal Sent',
    tasks: [
      {
        id: 'task4',
        title: 'Sunnyvale Mall',
        description: 'Commercial solar installation',
        assignee: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&h=120&auto=format&fit=crop'
        },
        dueDate: '2024-04-02',
        priority: 'medium',
        value: 92000
      }
    ]
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    tasks: []
  },
  {
    id: 'closed',
    title: 'Closed Won',
    tasks: [
      {
        id: 'task5',
        title: 'Mountain Residences',
        description: 'Residential solar project',
        assignee: {
          name: 'Lisa Thompson',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&h=120&auto=format&fit=crop'
        },
        dueDate: '2024-04-05',
        priority: 'low',
        value: 28000
      }
    ]
  }
];

export function Pipeline() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const { isDark } = useTheme();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const task = columns
      .find(col => col.tasks.find(t => t.id === active.id))
      ?.tasks.find(t => t.id === active.id);
    
    if (task) {
      setActiveTask(task);
      setActiveColumn(columns.find(col => col.tasks.find(t => t.id === active.id))?.id || null);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTask = columns
      .find(col => col.tasks.find(t => t.id === active.id))
      ?.tasks.find(t => t.id === active.id);
    
    const activeColId = columns.find(col => col.tasks.find(t => t.id === active.id))?.id;
    const overColId = over.id.includes('column') 
      ? over.id.replace('column-', '')
      : columns.find(col => col.tasks.find(t => t.id === over.id))?.id;

    if (!activeTask || !activeColId || !overColId || activeColId === overColId) return;

    setColumns(prev => {
      const newColumns = [...prev];
      const activeColumn = newColumns.find(col => col.id === activeColId);
      const overColumn = newColumns.find(col => col.id === overColId);

      if (!activeColumn || !overColumn) return prev;

      // Remove from active column
      activeColumn.tasks = activeColumn.tasks.filter(task => task.id !== active.id);

      // Add to over column
      overColumn.tasks = [...overColumn.tasks, activeTask];

      return newColumns;
    });

    setActiveTask(null);
    setActiveColumn(null);
  };

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pipeline</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Value: ${columns.reduce((sum, col) => 
              sum + col.tasks.reduce((colSum, task) => colSum + task.value, 0), 0
            ).toLocaleString()}
          </div>
        </div>
      </div>

      <DashboardCard>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-4">
            {columns.map(column => (
              <PipelineColumn
                key={column.id}
                column={column}
                isDark={isDark}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <PipelineCard
                task={activeTask}
                isDark={isDark}
              />
            )}
          </DragOverlay>
        </DndContext>
      </DashboardCard>
    </div>
  );
}