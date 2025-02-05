import React from 'react';
import {
  TechnicalVisitDetails,
  RoofInspectionDetails,
  DesignDetails,
  InstallationDetails,
  QualityControlDetails,
  FinalInspectionDetails,
  LumaApprovalDetails,
  LeadDetails
} from './phases';
import type { PhaseDetails } from '../types/phases';
import type { LeadDetails as LeadDetailsType } from '../data/leads';

interface PhaseContentProps {
  phase: string;
  details: PhaseDetails | LeadDetailsType;
}

export function PhaseContent({ phase, details }: PhaseContentProps) {
  switch (phase) {
    case 'lead':
      return <LeadDetails details={details as LeadDetailsType} />;
    case 'technical_visit':
      return <TechnicalVisitDetails details={details as PhaseDetails} />;
    case 'roof_inspection':
      return <RoofInspectionDetails details={details as PhaseDetails} />;
    case 'design':
      return <DesignDetails details={details as PhaseDetails} />;
    case 'installation_date':
      return <InstallationDetails details={details as PhaseDetails} />;
    case 'quality_control':
      return <QualityControlDetails details={details as PhaseDetails} />;
    case 'final_inspection':
      return <FinalInspectionDetails details={details as PhaseDetails} />;
    case 'luma_approved':
      return <LumaApprovalDetails details={details as PhaseDetails} />;
    default:
      return null;
  }
}