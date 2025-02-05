import React, { useEffect, useRef, useState } from 'react';
import { PhaseDetailsSidebar } from './PhaseDetailsSidebar';
import gsap from 'gsap';
import { Phase, phases, phaseLabels } from '../data';

export function ProjectTimeline() {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>('LEAD001');
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.phase-icon',
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );

      gsap.fromTo('.phase-line',
        { scaleX: 0, transformOrigin: 'left center' },
        { 
          scaleX: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power2.inOut'
        }
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const updateLines = () => {
      const container = timelineContainerRef.current;
      if (!container) return;

      const icons = container.querySelectorAll('.phase-icon');
      const lines = container.querySelectorAll('.phase-line');

      icons.forEach((icon, index) => {
        if (index < icons.length - 1) {
          const currentIcon = icon.getBoundingClientRect();
          const nextIcon = icons[index + 1].getBoundingClientRect();
          const line = lines[index] as HTMLElement;
          
          const distance = nextIcon.left - currentIcon.right;
          line.style.width = `${distance}px`;
        }
      });
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, []);

  const handlePhaseClick = (phaseId: string) => {
    setSelectedPhase(phaseId);
    setSelectedId('LEAD001'); // You might want to make this dynamic based on the actual project
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Timeline</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
          </div>
        </div>
      </div>

      <div ref={timelineRef}>
        <div ref={timelineContainerRef} className="flex items-center justify-between min-w-max px-4">
          {phases.map((phase, index) => (
            <div key={phase.id} className="relative flex flex-col items-center">
              {index < phases.length - 1 && (
                <div 
                  className={`phase-line absolute top-5 left-8 h-0.5 origin-left ${
                    phase.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}

              <button
                onClick={() => handlePhaseClick(phase.id)}
                onMouseEnter={() => setHoveredPhase(phase.id)}
                onMouseLeave={() => setHoveredPhase(null)}
                className={`phase-icon relative z-10 p-3 rounded-full transition-all duration-200 ${
                  phase.completed
                    ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/20'
                    : phase.current
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/20'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                } ${
                  hoveredPhase === phase.id
                    ? 'scale-110 shadow-lg'
                    : ''
                }`}
              >
                <phase.icon className="w-5 h-5" />

                {hoveredPhase === phase.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 -top-14 z-50 whitespace-nowrap">
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
                      <div className="font-medium">{phase.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{phase.date}</div>
                      {phase.payout > 0 && (
                        <div className="text-xs text-green-400 mt-0.5">
                          ${phase.payout.toLocaleString()} payout
                        </div>
                      )}
                      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <PhaseDetailsSidebar
        phase={selectedPhase}
        id={selectedId}
        onClose={() => setSelectedPhase(null)}
      />
    </div>
  );
}