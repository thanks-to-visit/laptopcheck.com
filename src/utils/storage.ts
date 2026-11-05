import { CHECKLIST_ITEMS } from '../data/checklist';
import { InspectionData, ItemStatusRecord, LaptopDetails, SavedSnapshot } from '../data/types';

const STORAGE_KEYS = {
  INSPECTION: 'laptopcheck:v1:inspection',
  THEME: 'laptopcheck:v1:theme',
  SNAPSHOTS: 'laptopcheck:v1:snapshots'
};

export const DEFAULT_LAPTOP_DETAILS: LaptopDetails = {
  brand: '',
  model: '',
  serial: '',
  processor: '',
  ram: '',
  storage: '',
  quotedPrice: '',
  inspectionDate: new Date().toISOString().split('T')[0]
};

export function getDefaultInspection(): InspectionData {
  const initialItems: Record<string, ItemStatusRecord> = {};
  CHECKLIST_ITEMS.forEach((item) => {
    initialItems[item.id] = {
      status: 'untested',
      note: '',
      updatedAt: new Date().toISOString()
    };
  });

  return {
    version: '1.0',
    details: { ...DEFAULT_LAPTOP_DETAILS },
    items: initialItems
  };
}

export function loadInspection(): InspectionData {
  const fallback = getDefaultInspection();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INSPECTION);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return fallback;

    // Merge details
    const details: LaptopDetails = {
      brand: typeof parsed.details?.brand === 'string' ? parsed.details.brand : '',
      model: typeof parsed.details?.model === 'string' ? parsed.details.model : '',
      serial: typeof parsed.details?.serial === 'string' ? parsed.details.serial : '',
      processor: typeof parsed.details?.processor === 'string' ? parsed.details.processor : '',
      ram: typeof parsed.details?.ram === 'string' ? parsed.details.ram : '',
      storage: typeof parsed.details?.storage === 'string' ? parsed.details.storage : '',
      quotedPrice: typeof parsed.details?.quotedPrice === 'string' ? parsed.details.quotedPrice : '',
      inspectionDate: typeof parsed.details?.inspectionDate === 'string' && parsed.details.inspectionDate
        ? parsed.details.inspectionDate
        : fallback.details.inspectionDate
    };

    // Merge items: ensure any newly added checklist items exist, retain existing user status
    const items: Record<string, ItemStatusRecord> = {};
    const parsedItems = parsed.items && typeof parsed.items === 'object' ? parsed.items : {};

    CHECKLIST_ITEMS.forEach((item) => {
      const existing = parsedItems[item.id];
      if (existing && typeof existing === 'object') {
        const validStatuses = ['untested', 'passed', 'failed', 'attention'];
        const status = validStatuses.includes(existing.status) ? existing.status : 'untested';
        items[item.id] = {
          status,
          note: typeof existing.note === 'string' ? existing.note : '',
          updatedAt: existing.updatedAt || new Date().toISOString()
        };
      } else {
        items[item.id] = {
          status: 'untested',
          note: '',
          updatedAt: new Date().toISOString()
        };
      }
    });

    return {
      version: '1.0',
      details,
      items
    };
  } catch (err) {
    console.error('Error loading inspection from localStorage:', err);
    return fallback;
  }
}

export function saveInspection(data: InspectionData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INSPECTION, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving inspection to localStorage:', err);
  }
}

export function resetInspection(): InspectionData {
  const fresh = getDefaultInspection();
  saveInspection(fresh);
  return fresh;
}

export function loadSnapshots(): SavedSnapshot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SNAPSHOTS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSnapshot(snapshot: SavedSnapshot): SavedSnapshot[] {
  try {
    const existing = loadSnapshots();
    const updated = [snapshot, ...existing.filter((s) => s.id !== snapshot.id)].slice(0, 20);
    localStorage.setItem(STORAGE_KEYS.SNAPSHOTS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving snapshot:', err);
    return [];
  }
}

export function deleteSnapshot(id: string): SavedSnapshot[] {
  try {
    const existing = loadSnapshots();
    const updated = existing.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SNAPSHOTS, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export type ThemePreference = 'system' | 'light' | 'dark';

export function getStoredTheme(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {}
  return 'system';
}

export function saveStoredTheme(theme: ThemePreference): void {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch {}
}

export function applyTheme(theme: ThemePreference): void {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
