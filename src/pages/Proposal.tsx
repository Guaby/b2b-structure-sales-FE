import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Briefcase, 
  Users,
  ArrowRight,
  UserCircle,
  DollarSign,
  Clock,
  Percent,
  ArrowLeft
} from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { PropertyMap } from '../components/PropertyMap';

export function Proposal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const proposal = {
    id,
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
      monthlyPayment: 0,
      downPayment: 0,
      totalCost: 0
    },
    team: {
      salesRep: {
        name: 'Michael Chen',
        role: 'Sales Consultant',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
        manager: {
          name: 'Sarah Anderson',
          role: 'Sales Manager',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&h=250&auto=format&fit=crop'
        }
      }
    }
  };

  // Calculate financing details
  proposal.financing.monthlyPayment = Math.round((proposal.system.price * (1 + proposal.financing.apr / 100)) / (proposal.financing.term * 12));
  proposal.financing.downPayment = Math.round(proposal.system.price * 0.1); // 10% down payment
  proposal.financing.totalCost = proposal.financing.monthlyPayment * proposal.financing.term * 12;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Projects</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Solar Proposal
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {proposal.id} • {proposal.client}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/projects')}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Send Proposal
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Property Map */}
            <DashboardCard title="Installation Location">
              <PropertyMap 
                address={proposal.address} 
                className="h-[400px] mt-4"
              />
            </DashboardCard>

            {/* System Details */}
            <DashboardCard title="Recommended System">
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Production</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {proposal.system.monthlyProduction} kWh
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">25-Year Savings</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      ${(proposal.system.savings / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Payback Period</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {proposal.system.paybackPeriod} years
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ROI</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {proposal.system.roiPercentage}%
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">System Cost</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(proposal.system.price / 1000).toFixed(0)}k
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Federal Tax Credit Available
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Payment</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${proposal.financing.monthlyPayment}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {proposal.financing.term}-year term at {proposal.financing.apr}% APR
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>

            {/* Team Section */}
            <DashboardCard title="Project Team">
              <div className="space-y-6">
                {/* Sales Representative */}
                <div className="flex items-center gap-4">
                  <img
                    src={proposal.team.salesRep.avatar}
                    alt={proposal.team.salesRep.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {proposal.team.salesRep.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {proposal.team.salesRep.role}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Reports to</span>
                  </div>
                </div>

                {/* Sales Manager */}
                <div className="flex items-center gap-4">
                  <img
                    src={proposal.team.salesRep.manager.avatar}
                    alt={proposal.team.salesRep.manager.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {proposal.team.salesRep.manager.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {proposal.team.salesRep.manager.role}
                    </p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <DashboardCard title="Customer Information">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href={`mailto:${proposal.email}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    {proposal.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{proposal.phone}</span>
                </div>
              </div>
            </DashboardCard>

            {/* Property Details */}
            <DashboardCard title="Property Details">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Property Type</span>
                  <span className="font-medium text-gray-900 dark:text-white">{proposal.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Square Footage</span>
                  <span className="font-medium text-gray-900 dark:text-white">{proposal.squareFootage} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Electric Bill</span>
                  <span className="font-medium text-gray-900 dark:text-white">${proposal.monthlyBill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Yearly Usage</span>
                  <span className="font-medium text-gray-900 dark:text-white">{proposal.yearlyUsage} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Roof Type</span>
                  <span className="font-medium text-gray-900 dark:text-white">{proposal.roofType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Roof Age</span>
                  <span className="font-medium text-gray-900 dark:text-white">{proposal.roofAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shading</span>
                  <span className="font-medium text-gray-900 dark:text-white">{proposal.shading}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Credit Score</span>
                  <span className="font-medium text-gray-900 dark:text-white">{proposal.creditScore}</span>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
}