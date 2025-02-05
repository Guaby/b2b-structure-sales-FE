import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  ChevronDown,
  Plus,
  FolderPlus,
  UserPlus,
  Package,
  CreditCard,
  Sun,
  X
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import gsap from 'gsap';

interface Team {
  id: string;
  name: string;
  type: 'solar' | 'auto';
  logo: string;
}

const teams: Team[] = [
  { 
    id: 'lh-group', 
    name: 'LH Group', 
    type: 'solar',
    logo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&h=120&auto=format&fit=crop'
  },
  { 
    id: 'power-solar', 
    name: 'Power Solar', 
    type: 'solar',
    logo: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=120&h=120&auto=format&fit=crop'
  },
  { 
    id: 'sunare', 
    name: 'Sunare', 
    type: 'solar',
    logo: 'https://images.unsplash.com/photo-1559087867-ce4c91325525?q=80&w=120&h=120&auto=format&fit=crop'
  },
  { 
    id: 'aviles-auto', 
    name: 'Aviles Auto', 
    type: 'auto',
    logo: 'https://images.unsplash.com/photo-1552960562-daf630e9278b?q=80&w=120&h=120&auto=format&fit=crop'
  },
];

export function MainNav() {
  const [showTeamSelector, setShowTeamSelector] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchIconRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);

  const plusMenuItems = [
    { icon: FolderPlus, label: 'New Project', action: () => console.log('New Project') },
    { icon: UserPlus, label: 'New Team Member', action: () => console.log('New Team Member') },
    { icon: Package, label: 'Add Inventory', action: () => console.log('Add Inventory') },
    { icon: CreditCard, label: 'Add Financing Option', action: () => console.log('Add Financing Option') },
  ];

  useEffect(() => {
    if (!searchContainerRef.current || !searchInputRef.current || !searchIconRef.current || !closeIconRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (isSearchActive) {
        tl.to(searchContainerRef.current, {
          width: "300px",
          backgroundColor: "rgb(249, 250, 251)",
          duration: 0.3,
          ease: "power2.inOut"
        })
        .to(searchInputRef.current, {
          width: "100%",
          paddingLeft: "40px",
          paddingRight: "40px",
          opacity: 1,
          duration: 0.3,
          onComplete: () => searchInputRef.current?.focus()
        }, "-=0.2")
        .to(closeIconRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.2
        }, "-=0.1");
      } else {
        tl.to(closeIconRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.2
        })
        .to(searchInputRef.current, {
          width: 0,
          paddingLeft: 0,
          paddingRight: 0,
          opacity: 0,
          duration: 0.3
        })
        .to(searchContainerRef.current, {
          width: "40px",
          backgroundColor: "transparent",
          duration: 0.3,
          ease: "power2.inOut"
        }, "-=0.2");
      }
    });

    return () => ctx.revert();
  }, [isSearchActive]);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setSearchValue('');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white ml-2">SolarCRM</span>
            </div>

            <div className="relative ml-8">
              <button
                onClick={() => setShowTeamSelector(!showTeamSelector)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={selectedTeam.logo}
                  alt={selectedTeam.name}
                  className="h-5 w-5 rounded object-cover"
                />
                <span className="text-sm font-medium">{selectedTeam.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showTeamSelector && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setShowTeamSelector(false)}
                  />
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                    {teams.map((team) => (
                      <button
                        key={team.id}
                        onClick={() => {
                          setSelectedTeam(team);
                          setShowTeamSelector(false);
                        }}
                        className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left ${
                          selectedTeam.id === team.id
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <img
                          src={team.logo}
                          alt={team.name}
                          className="h-5 w-5 rounded object-cover"
                        />
                        <span className="text-sm font-medium">{team.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div 
              ref={searchContainerRef}
              className="relative h-10 w-10 flex items-center rounded-full overflow-hidden transition-colors dark:bg-gray-800"
            >
              <div 
                ref={searchIconRef}
                className="absolute left-3 cursor-pointer z-10"
                onClick={handleSearchClick}
              >
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search installations..."
                className="absolute inset-0 w-0 opacity-0 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
              />
              <div 
                ref={closeIconRef}
                className="absolute right-3 opacity-0 scale-0 cursor-pointer z-10"
                onClick={handleCloseSearch}
              >
                <X className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowPlusMenu(!showPlusMenu)}
                className="p-2 text-white bg-blue-700 hover:bg-blue-800 rounded-full transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>

              {showPlusMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setShowPlusMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                    {plusMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setShowPlusMenu(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left text-sm"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-700"></span>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}