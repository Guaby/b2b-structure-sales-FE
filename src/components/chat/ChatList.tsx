import React from 'react';
import { Hash, Circle } from 'lucide-react';

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

interface ChatListProps {
  items: Channel[];
  onSelect: (chat: Channel) => void;
  searchQuery: string;
}

export function ChatList({ items, onSelect, searchQuery }: ChatListProps) {
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-1">
      {filteredItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {item.type === 'channel' ? (
            <Hash className="w-5 h-5 text-gray-400" />
          ) : (
            <div className="relative">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              {item.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
              )}
            </div>
          )}
          
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-white truncate">
                {item.type === 'channel' ? `#${item.name}` : item.name}
              </span>
              <span className="text-xs text-gray-500">{item.lastMessageTime}</span>
            </div>
            {item.lastMessage && (
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {item.lastMessage}
              </p>
            )}
          </div>

          {item.unread > 0 && (
            <span className="flex-shrink-0 bg-blue-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
              {item.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}