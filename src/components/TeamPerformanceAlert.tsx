import React, { useState, useRef, useEffect } from 'react';
import { 
  Users,
  X, 
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  Target,
  BarChart3,
  Calendar,
  DollarSign,
} from 'lucide-react';
import gsap from 'gsap';

interface TeamMember {
  id: string;
  name: string;
  role: 'Sales Associate' | 'Sales Broker' | 'Sales Manager' | 'Sales Consultant';
  avatar: string;
  performance: number;
  sales: number;
  target: number;
  lastActive: string;
  commissionRate: number;
}

interface TeamPerformanceAlertProps {
  members: TeamMember[];
  onDismiss: () => void;
}

const getPerformanceColor = (performance: number) => {
  if (performance >= 110) return 'text-green-500 dark:text-green-400';
  if (performance >= 90) return 'text-blue-500 dark:text-blue-400';
  if (performance >= 75) return 'text-yellow-500 dark:text-yellow-400';
  return 'text-red-500 dark:text-red-400';
};

const getPerformanceBg = (performance: number) => {
  if (performance >= 110) return 'bg-green-50 dark:bg-green-500/10';
  if (performance >= 90) return 'bg-blue-50 dark:bg-blue-500/10';
  if (performance >= 75) return 'bg-yellow-50 dark:bg-yellow-500/10';
  return 'bg-red-50 dark:bg-red-500/10';
};

export function TeamPerformanceAlert({ members, onDismiss }: TeamPerformanceAlertProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const membersRef = useRef<HTMLDivElement>(null);
  const memberDetailsRef = useRef<HTMLDivElement>(null);

  const averagePerformance = Math.round(
    members.reduce((acc, member) => acc + member.performance, 0) / members.length
  );

  const underperforming = members.filter(m => m.performance < 90).length;
  const overperforming = members.filter(m => m.performance > 110).length;

  useEffect(() => {
    if (!detailsRef.current || !contentRef.current || !chevronRef.current) return;

    const details = detailsRef.current;
    const content = contentRef.current;
    const chevron = chevronRef.current;
    const membersList = membersRef.current;

    if (isExpanded) {
      gsap.to(chevron, {
        rotation: 180,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.set(details, { display: 'block', height: 'auto' });
      const height = details.offsetHeight;
      gsap.set(details, { height: 0 });
      gsap.to(details, {
        height,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.fromTo(content,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.1, ease: 'power2.out' }
      );

      gsap.fromTo(membersList?.children,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        }
      );
    } else {
      gsap.to(chevron, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.in'
      });

      gsap.to(details, {
        height: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => gsap.set(details, { display: 'none' })
      });
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!memberDetailsRef.current) return;

    if (expandedMemberId) {
      gsap.fromTo(memberDetailsRef.current,
        { height: 0, opacity: 0 },
        { 
          height: 'auto', 
          opacity: 1, 
          duration: 0.3, 
          ease: 'power2.out',
          onStart: () => gsap.set(memberDetailsRef.current, { display: 'block' })
        }
      );

      gsap.fromTo(memberDetailsRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.3,
          stagger: 0.05,
          delay: 0.1,
          ease: 'power2.out'
        }
      );
    } else {
      gsap.to(memberDetailsRef.current,
        { 
          height: 0, 
          opacity: 0, 
          duration: 0.3, 
          ease: 'power2.in',
          onComplete: () => gsap.set(memberDetailsRef.current, { display: 'none' })
        }
      );
    }
  }, [expandedMemberId]);

  const handleMemberClick = (memberId: string) => {
    setExpandedMemberId(expandedMemberId === memberId ? null : memberId);
  };

  return (
    <div className="mb-4 bg-white dark:bg-[#121216] rounded-xl shadow-md overflow-hidden">
      <div 
        className={`p-4 bg-gray-50 dark:bg-[#121216] cursor-pointer transition-colors ${
          !isExpanded && 'hover:bg-gray-100 dark:hover:bg-[#19191E]'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Condensed View */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 dark:bg-[#121216] rounded-lg">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                Team Performance Overview
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPerformanceBg(averagePerformance)} ${getPerformanceColor(averagePerformance)}`}>
                  {averagePerformance}% Avg. Performance
                </span>
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex -space-x-2">
                  {members.slice(0, 3).map((member) => (
                    <img
                      key={member.id}
                      src={member.avatar}
                      alt={member.name}
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                    />
                  ))}
                  {members.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        +{members.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span className="text-red-600 dark:text-red-400">{underperforming} underperforming</span>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span className="text-green-600 dark:text-green-400">{overperforming} overperforming</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div 
              ref={chevronRef}
              className="text-gray-400"
            >
              <ChevronDown className="w-5 h-5" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        <div 
          ref={detailsRef}
          className="hidden"
        >
          <div ref={contentRef} className="mt-6">
            <div ref={membersRef} className="space-y-4">
              {members.map((member) => (
                <div key={member.id}>
                  <div 
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMemberClick(member.id);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-900"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {member.name}
                          </h4>
                          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                            {member.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm">
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Star className="w-4 h-4" />
                            <span>{member.commissionRate}% commission</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{member.lastActive}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Sales / Target</div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {member.sales} / {member.target}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {member.performance >= 90 ? (
                          <TrendingUp className={`w-5 h-5 ${getPerformanceColor(member.performance)}`} />
                        ) : (
                          <TrendingDown className={`w-5 h-5 ${getPerformanceColor(member.performance)}`} />
                        )}
                        <span className={`font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Member Details */}
                  {expandedMemberId === member.id && (
                    <div 
                      ref={memberDetailsRef}
                      className="hidden mt-4 ml-14 mr-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Target</span>
                          </div>
                          <div className="text-lg font-medium text-gray-900 dark:text-white">
                            {member.target} sales
                          </div>
                          <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(member.sales / member.target) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Deal Size</span>
                          </div>
                          <div className="text-lg font-medium text-gray-900 dark:text-white">
                            $42,500
                          </div>
                          <div className="text-sm text-green-500 mt-1">+12% from last month</div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Next Meeting</span>
                          </div>
                          <div className="text-lg font-medium text-gray-900 dark:text-white">
                            Tomorrow
                          </div>
                          <div className="text-sm text-gray-500 mt-1">10:30 AM PST</div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Revenue Generated</span>
                          </div>
                          <div className="text-lg font-medium text-gray-900 dark:text-white">
                            $892,400
                          </div>
                          <div className="text-sm text-green-500 mt-1">+8% from last month</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}