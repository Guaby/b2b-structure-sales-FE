import { Phase } from './types';

export interface LeadDetails {
  id: string;
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
  phase: Phase;
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
  financing?: {
    provider: string;
    term: number;
    apr: number;
    monthlyPayment: number;
    downPayment: number;
    totalCost: number;
  };
}

export interface CompletedSaleDetails {
  id: string;
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

export const leads: Record<string, LeadDetails> = {
  'LEAD001': {
    id: 'LEAD001',
    client: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '(555) 123-4567',
    address: '742 Solar Avenue, Sunnyvale, CA 94086',
    monthlyBill: 380,
    yearlyUsage: 14500,
    roofType: 'Tile',
    roofAge: 8,
    shading: 'Minimal',
    creditScore: 'Excellent',
    propertyType: 'Single Family',
    squareFootage: 2800,
    preferredInstallDate: '2024-04-15',
    phase: 'lead',
    system: {
      size: '10.8kW',
      battery: true,
      monthlyProduction: 1350,
      price: 32000,
      savings: 225000,
      paybackPeriod: 5.8,
      co2Reduction: 10.8,
      roiPercentage: 17.5
    },
    financing: {
      provider: 'Sunrun',
      term: 25,
      apr: 4.99,
      monthlyPayment: 180,
      downPayment: 3200,
      totalCost: 57200
    }
  },
  'LEAD002': {
    id: 'LEAD002',
    client: 'Sarah Miller',
    email: 'sarah.miller@email.com',
    phone: '(555) 234-5678',
    address: '456 Green Street, Mountain View, CA 94043',
    monthlyBill: 420,
    yearlyUsage: 16000,
    roofType: 'Composite',
    roofAge: 5,
    shading: 'Moderate',
    creditScore: 'Very Good',
    propertyType: 'Single Family',
    squareFootage: 3200,
    preferredInstallDate: '2024-05-01',
    phase: 'lead',
    system: {
      size: '12.4kW',
      battery: true,
      monthlyProduction: 1550,
      price: 36000,
      savings: 255000,
      paybackPeriod: 5.5,
      co2Reduction: 12.4,
      roiPercentage: 18.2
    },
    financing: {
      provider: 'Sunrun',
      term: 25,
      apr: 4.99,
      monthlyPayment: 210,
      downPayment: 3600,
      totalCost: 66600
    }
  }
};

export const completedSales: Record<string, CompletedSaleDetails> = {
  'PRJ001': {
    id: 'PRJ001',
    cadastre: 'CAD-2024-0123',
    affidavit: 'AFF-2024-0456',
    deeds: 'DEED-2024-0789',
    lumaBill: {
      accountNumber: 'LUMA-123456789',
      customerName: 'John Anderson',
      serviceAddress: '742 Solar Avenue, Sunnyvale, CA 94086',
      meterNumber: 'MTR-987654321',
      lastBillAmount: 380
    },
    bankInfo: {
      accountNumber: '**** **** **** 1234',
      routingNumber: '**** **** *',
      bankName: 'Solar Bank',
      accountType: 'Checking'
    }
  },
  'PRJ002': {
    id: 'PRJ002',
    cadastre: 'CAD-2024-0124',
    affidavit: 'AFF-2024-0457',
    deeds: 'DEED-2024-0790',
    lumaBill: {
      accountNumber: 'LUMA-123456790',
      customerName: 'Sarah Miller',
      serviceAddress: '456 Green Street, Mountain View, CA 94043',
      meterNumber: 'MTR-987654322',
      lastBillAmount: 420
    },
    bankInfo: {
      accountNumber: '**** **** **** 5678',
      routingNumber: '**** **** *',
      bankName: 'Green Bank',
      accountType: 'Savings'
    }
  }
};