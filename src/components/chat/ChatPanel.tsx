import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Hash, Star, Settings } from 'lucide-react';
import { ChatList } from './ChatList';
import { ChatView } from './ChatView';
import SimpleBar from 'simplebar-react';

interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'direct';
  unread: number;
  lastMessage?: string;
  lastMessageTime?: string;
  members?: string[];
  avatar?: string;
  online?: boolean;
}

const channels: Channel[] = [
  {
    id: 'sales',
    name: 'sales',
    type: 'channel',
    unread: 3,
    lastMessage: 'New lead from Tesla Corp',
    lastMessageTime: '5m ago'
  },
  {
    id: 'installations',
    name: 'installations',
    type: 'channel',
    unread: 0,
    lastMessage: 'Updated schedule for next week',
    lastMessageTime: '1h ago'
  },
  {
    id: 'general',
    name: 'general',
    type: 'channel',
    unread: 1,
    lastMessage: 'Team meeting at 2 PM',
    lastMessageTime: '2h ago'
  }
];

const directMessages: Channel[] = [
  {
    id: 'user1',
    name: 'Sarah Anderson',
    type: 'direct',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&h=120&auto=format&fit=crop',
    online: true,
    lastMessage: 'Can you review the proposal?',
    lastMessageTime: '10m ago'
  },
  {
    id: 'user2',
    name: 'Michael Chen',
    type: 'direct',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&h=120&auto=format&fit=crop',
    online: false,
    lastMessage: 'Thanks for the update',
    lastMessageTime: '1d ago'
  }
];

interface ChatPanelProps {
  isOpen: boolean;
}

export function ChatPanel({ isOpen }: ChatPanelProps) {
  const [selectedChat, setSelectedChat] = useState<Channel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 w-[420px] h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-40 overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          <div className="flex h-full">
            {/* Sidebar */}
            {!selectedChat && (
              <div className="w-full flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <SimpleBar className="flex-1">
                  <div className="p-4 space-y-6">
                    {/* Channels */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Channels</h3>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          <Hash className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      <ChatList
                        items={channels}
                        onSelect={setSelectedChat}
                        searchQuery={searchQuery}
                      />
                    </div>

                    {/* Direct Messages */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Direct Messages</h3>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                          <Users className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                      <ChatList
                        items={directMessages}
                        onSelect={setSelectedChat}
                        searchQuery={searchQuery}
                      />
                    </div>
                  </div>
                </SimpleBar>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <Star className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                    <Settings className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            )}

            {/* Chat View */}
            {selectedChat && (
              <ChatView
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}