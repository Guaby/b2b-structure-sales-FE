import { FileText, FileCheck, Shield, Wrench, Home, PenTool, Calendar, CheckSquare, ClipboardCheck, FileSearch, Zap, CheckCircle } from 'lucide-react';
import type { Phase } from './types';

export const phaseLabels = {
  all: 'All Phases',
  lead: 'New Lead',
  completed_sale: 'Completed Sale',
  sra_approved: 'SRA Approved',
  technical_visit: 'Technical Visit',
  roof_inspection: 'Roof Inspection',
  design: 'Design',
  installation_date: 'Installation Date',
  select_installation: 'Select Installation Date',
  quality_control: 'Quality Control Visit',
  final_inspection: 'Final Inspection',
  luma_approved: 'Luma Approved',
  closed: 'Closed'
} as const;

export const phaseColors = {
  lead: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  completed_sale: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
  sra_approved: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  technical_visit: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
  roof_inspection: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
  design: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400',
  installation_date: 'bg-pink-100 text-pink-700 dark:bg-pink-500/10 dark:text-pink-400',
  select_installation: 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400',
  quality_control: 'bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400',
  final_inspection: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400',
  luma_approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  closed: 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400'
} as const;

export const phases: Phase[] = [
  {
    id: 'lead',
    name: 'New Lead',
    icon: FileText,
    completed: true,
    current: false,
    date: '2024-03-15',
    payout: 0
  },
  {
    id: 'completed_sale',
    name: 'Completed Sale',
    icon: FileCheck,
    completed: true,
    current: false,
    date: '2024-03-18',
    payout: 5000
  },
  {
    id: 'sra_approved',
    name: 'SRA Approved',
    icon: Shield,
    completed: true,
    current: false,
    date: '2024-03-20',
    payout: 2000
  },
  {
    id: 'technical_visit',
    name: 'Technical Visit',
    icon: Wrench,
    completed: true,
    current: false,
    date: '2024-03-22',
    payout: 500
  },
  {
    id: 'roof_inspection',
    name: 'Roof Inspection',
    icon: Home,
    completed: true,
    current: false,
    date: '2024-03-24',
    payout: 500
  },
  {
    id: 'design',
    name: 'Design',
    icon: PenTool,
    completed: false,
    current: true,
    date: '2024-03-26',
    payout: 1000
  },
  {
    id: 'select_installation',
    name: 'Select Installation Date',
    icon: Calendar,
    completed: false,
    current: false,
    date: '2024-03-28',
    payout: 0
  },
  {
    id: 'installation_date',
    name: 'Installation',
    icon: Wrench,
    completed: false,
    current: false,
    date: '2024-03-30',
    payout: 5000
  },
  {
    id: 'quality_control',
    name: 'Quality Control',
    icon: CheckSquare,
    completed: false,
    current: false,
    date: '2024-04-02',
    payout: 500
  },
  {
    id: 'final_inspection',
    name: 'Final Inspection',
    icon: ClipboardCheck,
    completed: false,
    current: false,
    date: '2024-04-04',
    payout: 1000
  },
  {
    id: 'luma_approved',
    name: 'LUMA Approved',
    icon: FileSearch,
    completed: false,
    current: false,
    date: '2024-04-06',
    payout: 2000
  },
  {
    id: 'closed',
    name: 'Closed',
    icon: CheckCircle,
    completed: false,
    current: false,
    date: '2024-04-08',
    payout: 2500
  }
];