import React from 'react';
import { Calendar, Clock, Users, CheckSquare, FileText, Camera } from 'lucide-react';
import { DocumentCard } from '../DocumentCard';
import type { PhaseDetails } from '../../types/phases';

interface InstallationDetailsProps {
  details: PhaseDetails;
}

export function InstallationDetails({ details }: InstallationDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Installation Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Installation Date</span>
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{details.date}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">2-3 Days</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Installation Team</h3>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-400" />
            <div className="flex -space-x-2">
              {details.assignedTo && (
                <img
                  src={details.assignedTo.avatar}
                  alt={details.assignedTo.name}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {details.assignedTo?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {details.assignedTo?.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Installation Progress</h3>
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
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Installation Notes</h3>
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