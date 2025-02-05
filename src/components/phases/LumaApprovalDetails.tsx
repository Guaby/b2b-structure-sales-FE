import React from 'react';
import { FileText, Shield, AlertTriangle } from 'lucide-react';
import { DocumentCard } from '../DocumentCard';
import type { PhaseDetails } from '../../types/phases';

interface LumaApprovalDetailsProps {
  details: PhaseDetails;
}

export function LumaApprovalDetails({ details }: LumaApprovalDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">LUMA Documentation</h3>
        <div className="space-y-3">
          {details.documents?.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.name}
              documentId={doc.id}
              status={doc.status}
              onUpload={(file) => console.log('Upload:', file)}
              onDownload={() => console.log('Download:', doc.id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Approval Status</h3>
        <div className="space-y-3">
          {details.approvals?.map((approval) => (
            <div key={approval.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className={`w-5 h-5 ${
                    approval.status === 'approved' ? 'text-green-500' : 
                    approval.status === 'rejected' ? 'text-red-500' : 
                    'text-gray-400'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{approval.type}</p>
                    {approval.approver && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {approval.approver} • {approval.date}
                      </p>
                    )}
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                  approval.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                  approval.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400'
                }`}>
                  {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {details.notes && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">LUMA Notes</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
              <p className="text-sm text-gray-700 dark:text-gray-300">{details.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}