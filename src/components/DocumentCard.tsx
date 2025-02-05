import React from 'react';
import { FileText, Download, Upload, Check, AlertCircle } from 'lucide-react';

interface DocumentCardProps {
  title: string;
  documentId?: string;
  status: 'available' | 'pending' | 'processing';
  onUpload: (file: File) => void;
  onDownload: () => void;
}

export function DocumentCard({ title, documentId, status, onUpload, onDownload }: DocumentCardProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {documentId || 'No document uploaded'}
            </p>
          </div>
        </div>
        
        {status === 'available' ? (
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        ) : status === 'processing' ? (
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
            <AlertCircle className="w-5 h-5 animate-pulse" />
            <span className="text-sm">Processing...</span>
          </div>
        ) : (
          <label className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            Upload
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}