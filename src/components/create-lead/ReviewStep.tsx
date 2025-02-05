import React from 'react';
import { Check, User, Home, Sun, DollarSign } from 'lucide-react';

interface ReviewStepProps {
  data: {
    customer: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    property: {
      monthlyBill: string;
      yearlyUsage: string;
      roofType: string;
      roofAge: string;
      shading: string;
      creditScore: string;
      propertyType: string;
      squareFootage: string;
    };
    system: {
      size: string;
      battery: boolean;
      monthlyProduction: string;
      price: string;
      savings: string;
      paybackPeriod: string;
      co2Reduction: string;
      roiPercentage: string;
    };
    financing: {
      provider: string;
      term: string;
      apr: string;
      monthlyPayment: string;
      downPayment: string;
      totalCost: string;
    };
  };
}

export function ReviewStep({ data }: ReviewStepProps) {
  const sections = [
    {
      title: 'Customer Information',
      icon: User,
      items: [
        { label: 'Name', value: data.customer.name },
        { label: 'Email', value: data.customer.email },
        { label: 'Phone', value: data.customer.phone },
        { label: 'Address', value: data.customer.address },
      ]
    },
    {
      title: 'Property Details',
      icon: Home,
      items: [
        { label: 'Monthly Bill', value: `$${data.property.monthlyBill}` },
        { label: 'Yearly Usage', value: `${data.property.yearlyUsage} kWh` },
        { label: 'Roof Type', value: data.property.roofType },
        { label: 'Roof Age', value: `${data.property.roofAge} years` },
        { label: 'Shading', value: data.property.shading },
        { label: 'Credit Score', value: data.property.creditScore },
        { label: 'Property Type', value: data.property.propertyType },
        { label: 'Square Footage', value: `${data.property.squareFootage} sq ft` },
      ]
    },
    {
      title: 'System Configuration',
      icon: Sun,
      items: [
        { label: 'System Size', value: `${data.system.size} kW` },
        { label: 'Battery Storage', value: data.system.battery ? 'Yes' : 'No' },
        { label: 'Monthly Production', value: `${data.system.monthlyProduction} kWh` },
        { label: 'System Price', value: `$${data.system.price}` },
        { label: '25-Year Savings', value: `$${data.system.savings}` },
        { label: 'Payback Period', value: `${data.system.paybackPeriod} years` },
        { label: 'CO2 Reduction', value: `${data.system.co2Reduction} tons/year` },
        { label: 'ROI', value: `${data.system.roiPercentage}%` },
      ]
    },
    {
      title: 'Financing Details',
      icon: DollarSign,
      items: [
        { label: 'Provider', value: data.financing.provider },
        { label: 'Loan Term', value: `${data.financing.term} years` },
        { label: 'APR', value: `${data.financing.apr}%` },
        { label: 'Monthly Payment', value: `$${data.financing.monthlyPayment}` },
        { label: 'Down Payment', value: `$${data.financing.downPayment}` },
        { label: 'Total Cost', value: `$${data.financing.totalCost}` },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          Review Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please review all the information before creating the lead.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <section.icon className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900 dark:text-white">
                {section.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}