import React, { useEffect, useRef } from 'react';
import { X, DollarSign, Percent, Award, FileText, Mail, Phone, MessageCircle, User, ArrowUpRight, Target, TrendingUp, Calendar } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import gsap from 'gsap';
import type { TeamMember } from '../types/team';

interface TeamMemberSidebarProps {
  member: TeamMember | null;
  onClose: () => void;
}

export function TeamMemberSidebar({ member, onClose }: TeamMemberSidebarProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !sidebarRef.current || !contentRef.current) return;

    if (member) {
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
  }, [member]);

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

  if (!member) return null;

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 opacity-0"
        onClick={handleClose}
      />
      
      <div 
        ref={sidebarRef}
        className="fixed top-0 right-0 bottom-0 w-96 bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col h-screen"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Member Details</h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <SimpleBar className="flex-1 min-h-0">
          <div ref={contentRef} className="p-4 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-600 dark:text-gray-400">{member.role}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    member.performance && member.performance >= 100
                      ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                  }`}>
                    {member.performance}% Performance
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Projects</span>
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  {member.projects}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                </div>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">
                  ${member.revenue.toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Commission</span>
                </div>
                <p className="text-lg font-medium text-purple-600 dark:text-purple-400">
                  ${member.commission?.toLocaleString() ?? 0}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Performance</span>
                </div>
                <p className="text-lg font-medium text-yellow-600 dark:text-yellow-400">
                  {member.performance}%
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Contact Information</h4>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{member.location}</span>
              </div>
            </div>

            {member.teamMembers && member.teamMembers.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Team Members</h4>
                <div className="space-y-2">
                  {member.teamMembers.map((teamMember) => (
                    <div key={teamMember.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img
                          src={teamMember.avatar}
                          alt={teamMember.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{teamMember.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{teamMember.role}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{teamMember.performance}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SimpleBar>

        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <MessageCircle className="w-4 h-4" />
              Message
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <User className="w-4 h-4" />
              View Profile
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}