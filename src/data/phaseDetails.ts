import type { PhaseDetails } from '../types/phases';

export const phaseDetails: Record<string, PhaseDetails> = {
  'technical_visit': {
    id: 'TV001',
    type: 'technical_visit',
    date: '2024-03-20',
    status: 'completed',
    measurements: {
      'Roof Area': '2,500 sq ft',
      'Panel Count': '32 panels',
      'Azimuth': '180°',
      'Tilt': '20°'
    },
    checklist: [
      { id: '1', task: 'Structural Assessment', completed: true },
      { id: '2', task: 'Shading Analysis', completed: true },
      { id: '3', task: 'Electrical Assessment', completed: true }
    ],
    documents: [
      {
        id: 'DOC001',
        name: 'Technical Assessment Report',
        type: 'report',
        status: 'available'
      },
      {
        id: 'DOC002',
        name: 'Site Photos',
        type: 'photos',
        status: 'available'
      }
    ],
    assignedTo: {
      id: 'EMP001',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
      role: 'Technical Specialist'
    }
  },
  'roof_inspection': {
    id: 'RI001',
    type: 'roof_inspection',
    date: '2024-03-22',
    status: 'completed',
    checklist: [
      { id: '1', task: 'Structural Integrity Check', completed: true },
      { id: '2', task: 'Material Assessment', completed: true },
      { id: '3', task: 'Age Verification', completed: true }
    ],
    documents: [
      {
        id: 'DOC003',
        name: 'Roof Inspection Report',
        type: 'report',
        status: 'available'
      },
      {
        id: 'DOC004',
        name: 'Roof Photos',
        type: 'photo',
        status: 'available',
        url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&auto=format&fit=crop'
      }
    ]
  },
  'design': {
    id: 'DS001',
    type: 'design',
    date: '2024-03-25',
    status: 'in_progress',
    documents: [
      {
        id: 'DOC005',
        name: 'System Design Plans',
        type: 'design',
        status: 'available'
      },
      {
        id: 'DOC006',
        name: 'Electrical Diagrams',
        type: 'diagram',
        status: 'processing'
      }
    ],
    approvals: [
      {
        id: 'APR001',
        type: 'Engineering Review',
        status: 'approved',
        approver: 'Sarah Anderson',
        date: '2024-03-24'
      },
      {
        id: 'APR002',
        type: 'Customer Approval',
        status: 'pending'
      }
    ]
  },
  'installation_date': {
    id: 'IN001',
    type: 'installation_date',
    date: '2024-03-28',
    status: 'pending',
    checklist: [
      { id: '1', task: 'Panel Installation', completed: false },
      { id: '2', task: 'Inverter Setup', completed: false },
      { id: '3', task: 'Battery Installation', completed: false },
      { id: '4', task: 'Electrical Connections', completed: false }
    ],
    documents: [
      {
        id: 'DOC007',
        name: 'Installation Schedule',
        type: 'schedule',
        status: 'available'
      },
      {
        id: 'DOC008',
        name: 'Safety Protocol',
        type: 'document',
        status: 'available'
      }
    ],
    assignedTo: {
      id: 'EMP002',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&h=250&auto=format&fit=crop',
      role: 'Installation Lead'
    }
  },
  'quality_control': {
    id: 'QC001',
    type: 'quality_control',
    date: '2024-04-01',
    status: 'pending',
    checklist: [
      { id: '1', task: 'Panel Alignment Check', completed: false },
      { id: '2', task: 'Electrical Safety Test', completed: false },
      { id: '3', task: 'System Performance Test', completed: false }
    ],
    documents: [
      {
        id: 'DOC009',
        name: 'Quality Control Report',
        type: 'report',
        status: 'pending'
      },
      {
        id: 'DOC010',
        name: 'System Photos',
        type: 'photo',
        status: 'pending'
      }
    ]
  },
  'final_inspection': {
    id: 'FI001',
    type: 'final_inspection',
    date: '2024-04-04',
    status: 'pending',
    checklist: [
      { id: '1', task: 'System Operation Verification', completed: false },
      { id: '2', task: 'Safety Standards Compliance', completed: false },
      { id: '3', task: 'Documentation Review', completed: false }
    ],
    documents: [
      {
        id: 'DOC011',
        name: 'Final Inspection Report',
        type: 'report',
        status: 'pending'
      }
    ],
    approvals: [
      {
        id: 'APR003',
        type: 'Inspector Approval',
        status: 'pending'
      }
    ]
  },
  'luma_approved': {
    id: 'LA001',
    type: 'luma_approved',
    date: '2024-04-06',
    status: 'pending',
    documents: [
      {
        id: 'DOC012',
        name: 'LUMA Application',
        type: 'document',
        status: 'pending'
      },
      {
        id: 'DOC013',
        name: 'System Certification',
        type: 'document',
        status: 'pending'
      }
    ],
    approvals: [
      {
        id: 'APR004',
        type: 'LUMA Review',
        status: 'pending'
      },
      {
        id: 'APR005',
        type: 'Grid Connection Approval',
        status: 'pending'
      }
    ]
  }
};