import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Smile } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  type: 'text' | 'file';
  fileUrl?: string;
  fileName?: string;
}

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

interface ChatViewProps {
  chat: Channel;
  onBack: () => void;
}

const messages: Message[] = [
  {
    id: '1',
    content: 'Hey team, just uploaded the new proposal for Tesla Corp.',
    sender: {
      name: 'Sarah Anderson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&h=120&auto=format&fit=crop'
    },
    timestamp: '2024-03-15T09:00:00Z',
    type: 'text'
  },
  {
    id: '2',
    content: 'proposal.pdf',
    sender: {
      name: 'Sarah Anderson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&h=120&auto=format&fit=crop'
    },
    timestamp: '2024-03-15T09:01:00Z',
    type: 'file',
    fileUrl: '#',
    fileName: 'Tesla_Corp_Proposal_v1.pdf'
  },
  {
    id: '3',
    content: "Thanks Sarah! I will review it right away.",
    sender: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&h=120&auto=format&fit=crop'
    },
    timestamp: '2024-03-15T09:05:00Z',
    type: 'text'
  }
];

export function ChatView({ chat, onBack }: ChatViewProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Here you would typically send the message to your backend
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        
        {chat.type === 'direct' ? (
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              {chat.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{chat.name}</h3>
              <p className="text-xs text-gray-500">
                {chat.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">#{chat.name}</h3>
            <p className="text-xs text-gray-500">
              {chat.members?.length || 0} members
            </p>
          </div>
        )}
      </div>

      {/* Messages */}
      <SimpleBar className="flex-1">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {message.sender.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(message.timestamp), 'h:mm a')}
                  </span>
                </div>
                {message.type === 'text' ? (
                  <p className="text-gray-800 dark:text-gray-200 mt-1">
                    {message.content}
                  </p>
                ) : (
                  <a
                    href={message.fileUrl}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg mt-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Paperclip className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {message.fileName}
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </SimpleBar>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">
            <Smile className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}