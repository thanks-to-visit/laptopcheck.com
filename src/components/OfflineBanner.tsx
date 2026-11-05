import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-amber-600 text-white text-xs px-4 py-1.5 flex items-center justify-center gap-2 text-center"
    >
      <WifiOff className="w-3.5 h-3.5 shrink-0" />
      <span>Offline mode active: Guides, commands, and checklist are fully usable. External test sites require an internet connection.</span>
    </div>
  );
};
