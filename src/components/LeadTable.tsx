import React from 'react';
import { MoreHorizontal, Home, Sun, Battery } from 'lucide-react';
import { projects } from '../data';

const leads = projects.filter(project => project.phase === 'lead');

export function LeadTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Client</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">System</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Value</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">Start Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400"></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{lead.client}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{lead.address}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                  {lead.battery && <Battery className="h-5 w-5 text-green-500" />}
                </div>
              </td>
              <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                ${lead.value.toLocaleString()}
              </td>
              <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{lead.startDate}</td>
              <td className="px-4 py-4">
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}