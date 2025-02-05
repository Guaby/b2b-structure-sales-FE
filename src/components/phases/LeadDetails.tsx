import React from 'react';
import { Mail, Phone, Home, Sun, Battery, Calendar, DollarSign, User } from 'lucide-react';
import { PropertyMap } from '../PropertyMap';
import type { LeadDetails as LeadDetailsType } from '../../data/leads';

interface LeadDetailsProps {
  details: LeadDetailsType;
}

export function LeadDetails({ details }: LeadDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Customer Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{details.client}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{details.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{details.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Home className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{details.address}</span>
          </div>
        </div>
      </div>

      {/* Property Map */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Installation Location</h3>
        <PropertyMap address={details.address} className="h-[200px] rounded-lg overflow-hidden" />
      </div>

      {/* Property Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Property Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Bill</div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              ${details.monthlyBill}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">Yearly Usage</div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {details.yearlyUsage} kWh
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">Roof Type</div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {details.roofType}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">Roof Age</div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {details.roofAge} years
            </div>
          </div>
        </div>
      </div>

      {/* System Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Proposed System</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sun className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">System Size</span>
            </div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {details.system.size}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Battery className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Battery</span>
            </div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {details.system.battery ? 'Yes' : 'No'}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">System Price</span>
            </div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              ${details.system.price.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Preferred Install Date</span>
            </div>
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {details.preferredInstallDate}
            </div>
          </div>
        </div>
      </div>

      {/* Financing Details */}
      {details.financing && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Financing Details</h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Provider</div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {details.financing.provider}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Term</div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {details.financing.term} years
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">APR</div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {details.financing.apr}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Payment</div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  ${details.financing.monthlyPayment}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}