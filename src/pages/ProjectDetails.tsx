import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Sun, 
  Battery, 
  Calendar, 
  DollarSign, 
  Users, 
  Zap, 
  ArrowDown, 
  ArrowUp, 
  Cloud, 
  ArrowLeft,
  Target,
  Briefcase
} from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { EnergyChart } from '../components/EnergyChart';
import { ProjectTimeline } from '../components/ProjectTimeline';
import { projects } from '../data';
import gsap from 'gsap';

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const project = projects.find(p => p.id === id);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.project-header', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });

      gsap.from('.stat-card', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });

      gsap.from('.chart-container', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Projects</span>
      </button>

      {/* Project Header */}
      <div className="project-header bg-white dark:bg-gray-900 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {project.client}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {project.team?.map((member) => (
                    <img
                      key={member.name}
                      src={member.avatar}
                      alt={member.name}
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {project.team?.length || 0} team members
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  On track for completion
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {project.systemSize} system
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-400">Project Value</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${project.value.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card bg-white dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-500/10">
                  <Sun className="w-4 h-4 text-yellow-500" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                  System Size
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {project.systemSize}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card bg-white dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-green-50 dark:bg-green-500/10">
                  <Zap className="w-4 h-4 text-green-500" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                  Energy Production
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {project.energyData?.production} kWh
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card bg-white dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                  Daily Savings
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-green-600 dark:text-green-400 truncate">
                  ${project.energyData?.savings}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card bg-white dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                  <Cloud className="w-4 h-4 text-purple-500" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                  Grid Export
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                  {project.energyData?.gridExport} kWh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Timeline */}
      <div className="mb-6">
        <ProjectTimeline />
      </div>

      {/* Energy Monitoring */}
      <div className="chart-container grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard title="Energy Performance">
            <EnergyChart />
          </DashboardCard>
        </div>

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
                      {project.energyData?.production} kWh
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
                      {project.energyData?.consumption} kWh
                    </p>
                  </div>
                </div>
                <ArrowDown className="w-5 h-5 text-blue-500" />
              </div>

              {project.battery && (
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
                            style={{ width: `${project.energyData?.batteryLevel}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.energyData?.batteryLevel}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}