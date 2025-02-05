import React from 'react';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  address: string;
  className?: string;
}

export function PropertyMap({ address, className = '' }: PropertyMapProps) {
  return (
    <div className={`relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="p-2 bg-blue-500 rounded-full animate-pulse">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{address}</p>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
        background: 'radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.1) 100%)'
      }} />
    </div>
  );
}