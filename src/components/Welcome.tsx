import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { userProfile } from '../data';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="mb-4 bg-white dark:bg-[#121216] rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {/* {userProfile.name} */}
              Good Morning
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-gray-600 dark:text-gray-400">
                {/* {userProfile.role} */}
                Alex Cedeño
              </span>
              {/* <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> */}
              <span className="text-xs text-gray-500 dark:text-[#CFEA87] border border-[#CFEA87] p-1 px-2 rounded-xl scale-75 font-bold">VIP</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {/* <div className="text-right mb-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Performance</div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{userProfile.performance}%</div>
          </div> */}
          {/* <button 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            View Profile
            <ArrowUpRight className="w-4 h-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
}