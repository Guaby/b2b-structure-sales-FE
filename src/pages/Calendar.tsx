import React from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { DashboardCard } from '../components/DashboardCard';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Phase {
  id: string;
  title: string;
  projectId: string;
  type: 'site_assessment' | 'technical_visit' | 'design' | 'roof_inspection' | 'permitting' | 'installation' | 'inspection' | 'completion';
  start: string;
  end: string;
  teamMembers: string[];
  dependencies?: string[];
  notes: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  phases: Phase[];
}

const projects: Project[] = [
  {
    id: 'PRJ001',
    name: 'Riverside Solar Installation',
    client: 'John Smith',
    phases: [
      {
        id: 'PHS001',
        title: 'Site Assessment - Riverside',
        projectId: 'PRJ001',
        type: 'site_assessment',
        start: '2024-03-18',
        end: '2024-03-18',
        teamMembers: ['Alice Johnson', 'Bob Wilson'],
        notes: 'Initial site visit to assess solar potential'
      },
      {
        id: 'PHS002',
        title: 'Technical Visit - Riverside',
        projectId: 'PRJ001',
        type: 'technical_visit',
        start: '2024-03-20',
        end: '2024-03-20',
        teamMembers: ['Charlie Brown'],
        dependencies: ['PHS001'],
        notes: 'Detailed technical assessment'
      },
      {
        id: 'PHS003',
        title: 'Installation - Riverside',
        projectId: 'PRJ001',
        type: 'installation',
        start: '2024-03-25',
        end: '2024-03-27',
        teamMembers: ['David Smith', 'Eve Anderson'],
        dependencies: ['PHS002'],
        notes: 'Main installation phase'
      }
    ]
  },
  {
    id: 'PRJ002',
    name: 'Sunnyvale Residential',
    client: 'Emma Davis',
    phases: [
      {
        id: 'PHS004',
        title: 'Roof Inspection - Sunnyvale',
        projectId: 'PRJ002',
        type: 'roof_inspection',
        start: '2024-03-19',
        end: '2024-03-19',
        teamMembers: ['Frank White'],
        notes: 'Detailed roof assessment'
      },
      {
        id: 'PHS005',
        title: 'Design Phase - Sunnyvale',
        projectId: 'PRJ002',
        type: 'design',
        start: '2024-03-22',
        end: '2024-03-23',
        teamMembers: ['Grace Lee'],
        dependencies: ['PHS004'],
        notes: 'System design and planning'
      },
      {
        id: 'PHS006',
        title: 'Permitting - Sunnyvale',
        projectId: 'PRJ002',
        type: 'permitting',
        start: '2024-03-26',
        end: '2024-03-28',
        teamMembers: ['Henry Clark'],
        dependencies: ['PHS005'],
        notes: 'Permit application and processing'
      }
    ]
  },
  {
    id: 'PRJ003',
    name: 'Newport Commercial',
    client: 'Michael Chen',
    phases: [
      {
        id: 'PHS007',
        title: 'Site Assessment - Newport',
        projectId: 'PRJ003',
        type: 'site_assessment',
        start: '2024-03-21',
        end: '2024-03-21',
        teamMembers: ['Isabel Rodriguez'],
        notes: 'Commercial site evaluation'
      },
      {
        id: 'PHS008',
        title: 'Technical Planning - Newport',
        projectId: 'PRJ003',
        type: 'technical_visit',
        start: '2024-03-24',
        end: '2024-03-24',
        teamMembers: ['Jack Thompson'],
        dependencies: ['PHS007'],
        notes: 'Technical specifications and requirements'
      },
      {
        id: 'PHS009',
        title: 'Final Inspection - Newport',
        projectId: 'PRJ003',
        type: 'inspection',
        start: '2024-03-29',
        end: '2024-03-29',
        teamMembers: ['Kelly Brown'],
        dependencies: ['PHS008'],
        notes: 'Final system inspection and sign-off'
      }
    ]
  }
];

const phaseColors: Record<Phase['type'], string> = {
  site_assessment: '#3b82f6', // blue
  technical_visit: '#8b5cf6', // purple
  design: '#06b6d4', // cyan
  roof_inspection: '#f59e0b', // amber
  permitting: '#10b981', // emerald
  installation: '#6366f1', // indigo
  inspection: '#ec4899', // pink
  completion: '#22c55e', // green
};

export function Calendar() {
  const events = projects.flatMap(project =>
    project.phases.map(phase => ({
      id: phase.id,
      title: phase.title,
      start: new Date(phase.start),
      end: new Date(phase.end),
      allDay: true,
      resource: {
        type: phase.type,
        project: project.name,
        client: project.client,
        teamMembers: phase.teamMembers,
        notes: phase.notes
      }
    }))
  );

  const eventStyleGetter = (event: any) => {
    const style = {
      backgroundColor: phaseColors[event.resource.type],
      borderRadius: '8px',
      opacity: 0.9,
      color: '#fff',
      border: 'none',
      display: 'block',
      padding: '4px 8px'
    };
    return { style };
  };

  const tooltipAccessor = (event: any) => {
    return `
      ${event.resource.project}
      Client: ${event.resource.client}
      Team: ${event.resource.teamMembers.join(', ')}
      Notes: ${event.resource.notes}
    `;
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Project Calendar</h1>
      <DashboardCard>
        <div className="h-[700px]">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            tooltipAccessor={tooltipAccessor}
            views={['month', 'week', 'day']}
            defaultView="month"
          />
        </div>
      </DashboardCard>
    </div>
  );
}