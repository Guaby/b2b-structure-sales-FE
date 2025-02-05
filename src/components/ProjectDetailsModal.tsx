import React from 'react';
import { X, Sun, Battery, Calendar, DollarSign, Users, Zap, ArrowDown, ArrowUp, Cloud } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { EnergyChart } from './EnergyChart';
import { ProfileInitials } from './ProfileInitials';

interface ProjectDetailsModalProps {
  project: any;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const energyData = {
    production: 42.5, // kWh today
    consumption: 38.2, // kWh today
    savings: 156.82, // $ today
    gridExport: 8.4, // kWh exported to grid
    batteryLevel: 85, // % charged
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ProfileInitials name={project.client} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.client}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{project.id}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{project.address}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-500/10 dark:to-orange-500/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">System Size</p>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{project.systemSize}</h4>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-full">
                    <Sun className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Contract Value</p>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      ${project.value.toLocaleString()}
                    </h4>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <DollarSign className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Installation Date</p>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{project.startDate}</h4>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <Calendar className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/10 dark:to-pink-500/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Team Members</p>
                    <div className="flex -space-x-2 mt-2">
                      <ProfileInitials name="John Doe" className="border-2 border-white dark:border-gray-900" />
                      <ProfileInitials name="Jane Smith" className="border-2 border-white dark:border-gray-900" />
                      <ProfileInitials name="Mike Johnson" className="border-2 border-white dark:border-gray-900" />
                    </div>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-full">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Energy Monitoring */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Energy Production & Consumption */}
              <div className="lg:col-span-2">
                <DashboardCard title="Energy Performance">
                  <EnergyChart />
                </DashboardCard>
              </div>

              {/* Current Stats */}
              <div className="space-y-4">
                <DashboardCard title="Today's Overview">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-full">
                          <Sun className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Production</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {energyData.production} kWh
                          </p>
                        </div>
                      </div>
                      <ArrowUp className="w-5 h-5 text-green-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-full">
                          <Zap className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Consumption</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {energyData.consumption} kWh
                          </p>
                        </div>
                      </div>
                      <ArrowDown className="w-5 h-5 text-blue-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-full">
                          <Cloud className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Grid Export</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {energyData.gridExport} kWh
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-full">
                          <Battery className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Battery Level</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-24">
                              <div
                                className="h-full bg-yellow-500 rounded-full"
                                style={{ width: `${energyData.batteryLevel}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {energyData.batteryLevel}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-full">
                          <DollarSign className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Today's Savings</p>
                          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                            ${energyData.savings}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}