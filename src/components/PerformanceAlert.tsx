import React, { useState, useRef, useEffect } from 'react';
import { 
  AlertTriangle, 
  X, 
  UserMinus, 
  TrendingDown, 
  Target, 
  Award, 
  DollarSign,
  ChevronDown,
} from 'lucide-react';
import gsap from 'gsap';

interface PerformanceAlertProps {
  employeeName: string;
  role: string;
  avatar: string;
  commissionRate: number;
  currentSales: number;
  expectedSales: number;
  performanceRate: number;
  onDismiss: () => void;
  onAdjustRate: () => void;
}

export function PerformanceAlert({
  employeeName,
  role,
  avatar,
  commissionRate,
  currentSales,
  expectedSales,
  performanceRate,
  onDismiss,
  onAdjustRate
}: PerformanceAlertProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailsRef.current || !contentRef.current || !chevronRef.current) return;

    const details = detailsRef.current;
    const content = contentRef.current;
    const chevron = chevronRef.current;
    const stats = statsRef.current;

    if (isExpanded) {
      // Rotate chevron
      gsap.to(chevron, {
        rotation: 180,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Expand container
      gsap.set(details, { display: 'block', height: 'auto' });
      const height = details.offsetHeight;
      gsap.set(details, { height: 0 });
      gsap.to(details, {
        height,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Animate content
      gsap.fromTo(content,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.1, ease: 'power2.out' }
      );

      // Animate stats
      gsap.fromTo(stats?.children,
        { opacity: 0, y: 20, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out'
        }
      );
    } else {
      // Rotate chevron back
      gsap.to(chevron, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.in'
      });

      // Collapse container
      gsap.to(details, {
        height: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => gsap.set(details, { display: 'none' })
      });
    }
  }, [isExpanded]);

  return (
    <div className="mb-8 bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      <div 
        className={`p-4 bg-red-50 dark:bg-red-500/5 border-l-4 border-red-500 cursor-pointer transition-colors ${
          !isExpanded && 'hover:bg-red-100/50 dark:hover:bg-red-500/10'
        }`}
        onClick={() => !isAdjusting && setIsExpanded(!isExpanded)}
      >
        {/* Condensed View */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt={employeeName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-800"
              />
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  Performance Alert
                  <span className="px-2 py-0.5 text-xs font-medium bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-full">
                    {performanceRate}% Performance
                  </span>
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{employeeName} • {role}</span>
                  <span className="text-gray-400 dark:text-gray-500">•</span>
                  <span className="text-gray-500 dark:text-gray-500">Active 2h ago</span>
                </div>
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
            {/* Key Stats */}
            <div ref={statsRef} className="grid grid-cols-4 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Commission Rate</p>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{commissionRate}%</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Current Sales</p>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{currentSales} sales</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Expected Sales</p>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">{expectedSales} sales</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Performance</p>
                </div>
                <p className="text-lg font-medium text-red-600 dark:text-red-400">{performanceRate}%</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              {!isAdjusting ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAdjusting(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                >
                  <UserMinus className="w-4 h-4" />
                  Adjust Commission Rate
                </button>
              ) : (
                <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => setIsAdjusting(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onAdjustRate();
                      setIsAdjusting(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Confirm Rate Adjustment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}