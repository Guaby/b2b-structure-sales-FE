import React, { useEffect, useRef } from 'react';
import { X, FileText, DollarSign, User, Mail, Phone, Home, Calendar, Battery, Sun, Shield, Building2, CreditCard } from 'lucide-react';
import gsap from 'gsap';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface LeadDetails {
  client: string;
  email: string;
  phone: string;
  address: string;
  monthlyBill: number;
  yearlyUsage: number;
  roofType: string;
  roofAge: number;
  shading: string;
  creditScore: string;
  propertyType: string;
  squareFootage: number;
  preferredInstallDate: string;
  system: {
    size: string;
    battery: boolean;
    monthlyProduction: number;
    price: number;
    savings: number;
    paybackPeriod: number;
    co2Reduction: number;
    roiPercentage: number;
  };
}

interface CompletedSaleDetails {
  cadastre: string;
  affidavit: string;
  deeds: string;
  lumaBill: {
    accountNumber: string;
    customerName: string;
    serviceAddress: string;
    meterNumber: string;
    lastBillAmount: number;
  };
  bankInfo: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
    accountType: string;
  };
}

interface PhaseDetailsModalProps {
  phase: 'lead' | 'completed_sale' | null;
  isOpen: boolean;
  onClose: () => void;
  leadDetails?: LeadDetails;
  completedSaleDetails?: CompletedSaleDetails;
}

export function PhaseDetailsModal({ phase, isOpen, onClose, leadDetails, completedSaleDetails }: PhaseDetailsModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !modalRef.current || !contentRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.fromTo(modalRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          stagger: 0.05,
          delay: 0.2,
          ease: 'power2.out'
        }
      );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!overlayRef.current || !modalRef.current || !contentRef.current) return;

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });

    gsap.to(modalRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: onClose
    });

    gsap.to(contentRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 opacity-0"
        onClick={handleClose}
      />
      
      <div 
        ref={modalRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-xl z-50 opacity-0"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {phase === 'lead' ? 'Lead Details' : 'Completed Sale Details'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <SimpleBar style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div ref={contentRef} className="p-6">
            {phase === 'lead' && leadDetails && (
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{leadDetails.client}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{leadDetails.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{leadDetails.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Home className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{leadDetails.address}</span>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Property Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Bill</div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        ${leadDetails.monthlyBill}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Yearly Usage</div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {leadDetails.yearlyUsage} kWh
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Roof Type</div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {leadDetails.roofType}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Roof Age</div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {leadDetails.roofAge} years
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
                        {leadDetails.system.size}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Battery className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Battery</span>
                      </div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {leadDetails.system.battery ? 'Yes' : 'No'}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">System Price</span>
                      </div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        ${leadDetails.system.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Preferred Install Date</span>
                      </div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {leadDetails.preferredInstallDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {phase === 'completed_sale' && completedSaleDetails && (
              <div className="space-y-6">
                {/* Document Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Legal Documents</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Cadastre Number</span>
                      </div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {completedSaleDetails.cadastre}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Affidavit Number</span>
                      </div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {completedSaleDetails.affidavit}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Deeds Number</span>
                      </div>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {completedSaleDetails.deeds}
                      </div>
                    </div>
                  </div>
                </div>

                {/* LUMA Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">LUMA Account Details</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Account Number</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {completedSaleDetails.lumaBill.accountNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Customer Name</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {completedSaleDetails.lumaBill.customerName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Service Address</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {completedSaleDetails.lumaBill.serviceAddress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bank Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Bank Information</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Account Number</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {completedSaleDetails.bankInfo.accountNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Routing Number</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {completedSaleDetails.bankInfo.routingNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Bank Name</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {completedSaleDetails.bankInfo.bankName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SimpleBar>
      </div>
    </>
  );
}