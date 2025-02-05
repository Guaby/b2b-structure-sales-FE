export type PhaseType = 
  | 'lead'
  | 'completed_sale'
  | 'sra_approved'
  | 'technical_visit'
  | 'roof_inspection'
  | 'design'
  | 'installation_date'
  | 'select_installation'
  | 'quality_control'
  | 'final_inspection'
  | 'luma_approved'
  | 'closed';

export interface PhaseDetails {
  id: string;
  type: PhaseType;
  date: string;
  status: 'completed' | 'in_progress' | 'pending';
  documents?: {
    id: string;
    name: string;
    type: string;
    status: 'available' | 'pending' | 'processing';
    url?: string;
  }[];
  notes?: string;
  assignedTo?: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  checklist?: {
    id: string;
    task: string;
    completed: boolean;
  }[];
  measurements?: {
    [key: string]: number | string;
  };
  approvals?: {
    id: string;
    type: string;
    status: 'approved' | 'pending' | 'rejected';
    approver?: string;
    date?: string;
  }[];
}