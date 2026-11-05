import { CategoryInfo } from './types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'processor',
    name: 'Processor (CPU)',
    shortDesc: 'Exact model, generation, idle temp, clock speeds & thermal throttling',
    guideSlug: 'processor',
    iconName: 'Cpu'
  },
  {
    id: 'ram',
    name: 'RAM (Memory)',
    shortDesc: 'Capacity, DDR gen, speeds, slots used & soldered vs upgradeable',
    guideSlug: 'ram',
    iconName: 'Layers'
  },
  {
    id: 'storage',
    name: 'Storage (SSD/HDD)',
    shortDesc: 'Drive health %, power-on hours, write endurance & SMART status',
    guideSlug: 'storage',
    iconName: 'HardDrive'
  },
  {
    id: 'battery',
    name: 'Battery & Power',
    shortDesc: 'Design vs full charge capacity, run on battery, charger & swelling',
    guideSlug: 'battery',
    iconName: 'BatteryCharging'
  },
  {
    id: 'display',
    name: 'Display Panel',
    shortDesc: 'Dead pixels, backlight bleed, discoloration, lines & hinge firmness',
    guideSlug: 'display',
    iconName: 'Monitor'
  },
  {
    id: 'keyboard-touchpad',
    name: 'Keyboard & Touchpad',
    shortDesc: 'Every key, function keys, key backlighting, clicks & multi-touch gestures',
    guideSlug: 'keyboard-touchpad',
    iconName: 'Keyboard'
  },
  {
    id: 'connectivity',
    name: 'Connectivity & Audio',
    shortDesc: 'Wi-Fi, Bluetooth, all USB/HDMI ports, speakers, mic & webcam',
    guideSlug: 'connectivity',
    iconName: 'Wifi'
  },
  {
    id: 'bios-security',
    name: 'BIOS & Security',
    shortDesc: 'BIOS password lock, Computrace/MDM locks, Secure Boot & Autopilot',
    guideSlug: 'bios-security',
    iconName: 'ShieldAlert'
  },
  {
    id: 'physical-condition',
    name: 'Physical Condition',
    shortDesc: 'Hinges, casing cracks, missing screws, liquid residue & OEM charger',
    guideSlug: 'physical-condition',
    iconName: 'Wrench'
  }
];
