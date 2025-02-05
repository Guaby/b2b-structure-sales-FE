import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import gsap from 'gsap';
import { PhaseContent } from './PhaseContent';
import { leads } from '../data/leads';
import { phaseDetails } from '../data/phaseDetails';

interface PhaseDetailsSidebarProps {
  phase: string | null;
  onClose: () => void;
  id: string;
}

export function PhaseDetailsSidebar({ phase, onClose, id }: PhaseDetailsSidebarProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const leadDetails = phase === 'lead' ? leads[id] : null;
  const currentPhaseDetails = phase && phase !== 'lead' ? phaseDetails[phase] : null;

  useEffect(() => {
    if (!overlayRef.current || !sidebarRef.current || !contentRef.current) return;

    if (phase) {
      document.body.style.overflow = 'hidden';

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.fromTo(sidebarRef.current,
        { x: '100%' },
        { x: 0, duration: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(contentRef.current.children,
        { opacity: 0, x: 20 },
        { 
          opacity: 1, 
          x: 0, 
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
  }, [phase]);

  const handleClose = () => {
    if (!overlayRef.current || !sidebarRef.current || !contentRef.current) return;

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });

    gsap.to(sidebarRef.current, {
      x: '100%',
      duration: 0.4,
      ease: 'power3.in',
      onComplete: onClose
    });

    gsap.to(contentRef.current.children, {
      opacity: 0,
      x: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    });
  };

  if (!phase) return null;

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 opacity-0"
        onClick={handleClose}
      />
      
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 bottom-0 w-[600px] bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {phase === 'lead' ? 'Lead Details' : 'Phase Details'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <SimpleBar className="flex-1">
          <div ref={contentRef} className="p-4">
            {phase === 'lead' && leadDetails && (
              <PhaseContent phase={phase} details={leadDetails} />
            )}
            {phase !== 'lead' && currentPhaseDetails && (
              <PhaseContent phase={phase} details={currentPhaseDetails} />
            )}
          </div>
        </SimpleBar>
      </div>
    </>
  );
}