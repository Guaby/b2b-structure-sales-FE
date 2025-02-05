import React, { useState } from 'react';
import { ChatButton } from './ChatButton';
import { ChatPanel } from './ChatPanel';

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = 6; // This would typically come from your backend

  return (
    <>
      <ChatButton
        isOpen={isOpen}
        unreadCount={unreadCount}
        onClick={() => setIsOpen(!isOpen)}
      />
      <ChatPanel isOpen={isOpen} />
    </>
  );
}