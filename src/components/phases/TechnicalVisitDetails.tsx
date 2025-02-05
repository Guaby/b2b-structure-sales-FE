import React from 'react';
import { Ruler, CheckSquare, FileText } from 'lucide-react';
import { DocumentCard } from '../DocumentCard';
import type { PhaseDetails } from '../../types/phases';

interface TechnicalVisitDetailsProps {
  details: PhaseDetails;
}

export function TechnicalVisitDetails({ details }: TechnicalVisitDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Site Measurements</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(details.measurements || {}).map(([key, value]) => (
            <div key={key} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{key}</span>
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{value}</p>
            </div>
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

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Documentation</h3>
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

      {details.notes && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notes</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-700 dark:text-gray-300">{details.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}