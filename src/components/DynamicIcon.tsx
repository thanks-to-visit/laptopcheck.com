import React from 'react';
import {
  BatteryCharging,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  HardDrive,
  HelpCircle,
  Info,
  Keyboard,
  Layers,
  Monitor,
  Moon,
  Printer,
  RefreshCw,
  Search,
  Share2,
  ShieldAlert,
  Sun,
  Terminal,
  Trash2,
  Wifi,
  Wrench,
  XCircle,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  Laptop
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size }) => {
  const iconProps = { className, size };

  switch (name.toLowerCase()) {
    case 'cpu':
      return <Cpu {...iconProps} />;
    case 'layers':
      return <Layers {...iconProps} />;
    case 'harddrive':
    case 'storage':
      return <HardDrive {...iconProps} />;
    case 'batterycharging':
    case 'battery':
      return <BatteryCharging {...iconProps} />;
    case 'monitor':
    case 'display':
      return <Monitor {...iconProps} />;
    case 'keyboard':
      return <Keyboard {...iconProps} />;
    case 'wifi':
    case 'connectivity':
      return <Wifi {...iconProps} />;
    case 'shieldalert':
    case 'shield':
    case 'bios':
      return <ShieldAlert {...iconProps} />;
    case 'wrench':
    case 'physical':
      return <Wrench {...iconProps} />;
    case 'bookopen':
    case 'guide':
      return <BookOpen {...iconProps} />;
    case 'terminal':
      return <Terminal {...iconProps} />;
    case 'externallink':
      return <ExternalLink {...iconProps} />;
    case 'copy':
      return <Copy {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    case 'info':
      return <Info {...iconProps} />;
    case 'help':
    case 'helpcircle':
      return <HelpCircle {...iconProps} />;
    case 'sun':
      return <Sun {...iconProps} />;
    case 'moon':
      return <Moon {...iconProps} />;
    case 'printer':
      return <Printer {...iconProps} />;
    case 'download':
      return <Download {...iconProps} />;
    case 'refresh':
      return <RefreshCw {...iconProps} />;
    case 'trash':
      return <Trash2 {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'laptop':
      return <Laptop {...iconProps} />;
    default:
      return <Info {...iconProps} />;
  }
};
