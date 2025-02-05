import React from 'react';
import { Camera, FileText, CheckSquare, AlertTriangle } from 'lucide-react';
import { DocumentCard } from '../DocumentCard';
import type { PhaseDetails } from '../../types/phases';

interface RoofInspectionDetailsProps {
  details: PhaseDetails;
}

export function RoofInspectionDetails({ details }: RoofInspectionDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Inspection Photos</h3>
        <div className="grid grid-cols-2 gap-4">
          {details.documents?.filter(doc => doc.type === 'photo').map((photo) => (
            <div key={photo.id} className="aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              {photo.url ? (
                <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Inspection Report</h3>
        <div className="space-y-3">
          {details.documents?.filter(doc => doc.type === 'report').map((doc) => (
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
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Inspection Checklist</h3>
        <div className="space-y-3">
          {details.checklist?.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <CheckSquare className={`w-5 h-5 ${item.completed ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.task}</span>
            </div>
          ))}
        </div>
      </div>

      {details.notes && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notes & Concerns</h3>
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