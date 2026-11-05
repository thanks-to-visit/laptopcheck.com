export type ChecklistSeverity = 'critical' | 'high' | 'medium' | 'low';
export type ChecklistStatus = 'untested' | 'passed' | 'failed' | 'attention';

export interface ChecklistItem {
  id: string;
  categoryId: string;
  title: string;
  severity: ChecklistSeverity;
  guideSlug: string;
  hint?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  shortDesc: string;
  guideSlug: string;
  iconName: string;
}

export interface CommandItem {
  id: string;
  title: string;
  command: string;
  type: 'cmd' | 'powershell' | 'run' | 'shortcut';
  category: string;
  purpose: string;
  notes?: string;
  isEssential?: boolean;
}

export interface OnlineTool {
  id: string;
  name: string;
  url: string;
  purpose: string;
  usage: string;
  category: string;
}

export interface GuideStep {
  title: string;
  instruction: string;
}

export interface GuideCommand {
  label: string;
  code: string;
  type?: 'CMD' | 'PowerShell' | 'Run Shortcut';
  explanation?: string;
}

export interface Guide {
  slug: string;
  categoryId?: string;
  title: string;
  subtitle: string;
  iconName: string;
  whatToCheck: string[];
  steps: GuideStep[];
  commands: GuideCommand[];
  tool?: {
    name: string;
    url: string;
    description: string;
  };
  redFlags: string[];
  proTips: string[];
}

export interface LaptopDetails {
  brand: string;
  model: string;
  serial: string;
  processor: string;
  ram: string;
  storage: string;
  quotedPrice: string;
  inspectionDate: string;
}

export interface ItemStatusRecord {
  status: ChecklistStatus;
  note: string;
  updatedAt?: string;
}

export interface InspectionData {
  version: string;
  details: LaptopDetails;
  items: Record<string, ItemStatusRecord>;
}

export interface SavedSnapshot {
  id: string;
  savedAt: string;
  details: LaptopDetails;
  stats: {
    total: number;
    passed: number;
    failed: number;
    attention: number;
    untested: number;
  };
  assessment: string;
  assessmentSeverity: 'critical' | 'high' | 'warning' | 'neutral';
  items: Record<string, ItemStatusRecord>;
}
