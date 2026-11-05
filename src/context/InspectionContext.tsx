import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CHECKLIST_ITEMS } from '../data/checklist';
import { CATEGORIES } from '../data/categories';
import {
  ChecklistStatus,
  InspectionData,
  ItemStatusRecord,
  LaptopDetails,
  SavedSnapshot
} from '../data/types';
import {
  applyTheme,
  deleteSnapshot,
  getStoredTheme,
  loadInspection,
  loadSnapshots,
  resetInspection,
  saveInspection,
  saveSnapshot,
  saveStoredTheme,
  ThemePreference
} from '../utils/storage';

export interface CategoryProgress {
  total: number;
  tested: number;
  passed: number;
  failed: number;
  attention: number;
  percent: number;
}

export interface OverallAssessment {
  text: string;
  subtext: string;
  severity: 'critical' | 'high' | 'warning' | 'neutral';
}

interface InspectionContextType {
  data: InspectionData;
  updateDetail: (field: keyof LaptopDetails, value: string) => void;
  setItemStatus: (itemId: string, status: ChecklistStatus) => void;
  setItemNote: (itemId: string, note: string) => void;
  resetAll: () => void;
  theme: ThemePreference;
  setTheme: (t: ThemePreference) => void;
  toggleTheme: () => void;
  stats: {
    total: number;
    passed: number;
    failed: number;
    attention: number;
    untested: number;
    tested: number;
    percent: number;
  };
  categoryProgress: Record<string, CategoryProgress>;
  assessment: OverallAssessment;
  snapshots: SavedSnapshot[];
  saveCurrentAsSnapshot: () => void;
  removeSnapshot: (id: string) => void;
  restoreFromSnapshot: (snapshot: SavedSnapshot) => void;
}

const InspectionContext = createContext<InspectionContextType | null>(null);

export const InspectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<InspectionData>(loadInspection);
  const [theme, setThemeState] = useState<ThemePreference>(getStoredTheme);
  const [snapshots, setSnapshots] = useState<SavedSnapshot[]>(loadSnapshots);

  // Apply theme on mount and change
  useEffect(() => {
    applyTheme(theme);
    saveStoredTheme(theme);
  }, [theme]);

  // Listen to system theme change if 'system'
  useEffect(() => {
    if (theme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => applyTheme('system');
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  // Auto-save inspection data whenever it changes
  useEffect(() => {
    saveInspection(data);
  }, [data]);

  const updateDetail = (field: keyof LaptopDetails, value: string) => {
    setData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [field]: value
      }
    }));
  };

  const setItemStatus = (itemId: string, status: ChecklistStatus) => {
    setData((prev) => {
      const existing = prev.items[itemId] || { status: 'untested', note: '' };
      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: {
            ...existing,
            status,
            updatedAt: new Date().toISOString()
          }
        }
      };
    });
  };

  const setItemNote = (itemId: string, note: string) => {
    setData((prev) => {
      const existing = prev.items[itemId] || { status: 'untested', note: '' };
      return {
        ...prev,
        items: {
          ...prev.items,
          [itemId]: {
            ...existing,
            note,
            updatedAt: new Date().toISOString()
          }
        }
      };
    });
  };

  const resetAll = () => {
    const fresh = resetInspection();
    setData(fresh);
  };

  const setTheme = (newTheme: ThemePreference) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  // Compute stats
  const stats = useMemo(() => {
    const total = CHECKLIST_ITEMS.length;
    let passed = 0;
    let failed = 0;
    let attention = 0;
    let untested = 0;

    CHECKLIST_ITEMS.forEach((item) => {
      const status = data.items[item.id]?.status || 'untested';
      if (status === 'passed') passed++;
      else if (status === 'failed') failed++;
      else if (status === 'attention') attention++;
      else untested++;
    });

    const tested = passed + failed + attention;
    const percent = total > 0 ? Math.round((tested / total) * 100) : 0;

    return { total, passed, failed, attention, untested, tested, percent };
  }, [data.items]);

  // Compute category progress
  const categoryProgress = useMemo(() => {
    const map: Record<string, CategoryProgress> = {};

    CATEGORIES.forEach((cat) => {
      const catItems = CHECKLIST_ITEMS.filter((i) => i.categoryId === cat.id);
      const total = catItems.length;
      let passed = 0;
      let failed = 0;
      let attention = 0;

      catItems.forEach((i) => {
        const s = data.items[i.id]?.status || 'untested';
        if (s === 'passed') passed++;
        else if (s === 'failed') failed++;
        else if (s === 'attention') attention++;
      });

      const tested = passed + failed + attention;
      const percent = total > 0 ? Math.round((tested / total) * 100) : 0;

      map[cat.id] = { total, tested, passed, failed, attention, percent };
    });

    return map;
  }, [data.items]);

  // Advisory Overall Assessment
  const assessment = useMemo<OverallAssessment>(() => {
    // Check for critical failures first
    const criticalFailed = CHECKLIST_ITEMS.filter(
      (item) => item.severity === 'critical' && data.items[item.id]?.status === 'failed'
    );

    const highFailed = CHECKLIST_ITEMS.filter(
      (item) => item.severity === 'high' && data.items[item.id]?.status === 'failed'
    );

    const attentionItems = CHECKLIST_ITEMS.filter(
      (item) => data.items[item.id]?.status === 'attention'
    );

    if (criticalFailed.length > 0) {
      return {
        text: 'Critical issue found: do not buy without resolution',
        subtext: `${criticalFailed.length} deal-breaking fault(s) detected (e.g. BIOS/MDM lock, liquid contact, or board repair). Walk away unless legitimate ownership and warranty is documented.`,
        severity: 'critical'
      };
    }

    if (highFailed.length > 0) {
      return {
        text: 'High-risk issues found: negotiate or walk away',
        subtext: `${highFailed.length} serious hardware fault(s) detected (e.g. SSD degradation, overheating, charging socket, or panel lines). Factor repair costs into pricing.`,
        severity: 'high'
      };
    }

    if (stats.tested < Math.ceil(stats.total * 0.5)) {
      return {
        text: 'Incomplete inspection',
        subtext: `${stats.untested} items remain untested. Run through BIOS, power, and connectivity before exchanging payment.`,
        severity: 'neutral'
      };
    }

    if (stats.failed > 0 || attentionItems.length > 0) {
      return {
        text: 'Minor defects or points of attention noted',
        subtext: `${stats.failed} failed and ${attentionItems.length} attention item(s). Use documented defects to negotiate discount or seller replacement.`,
        severity: 'warning'
      };
    }

    return {
      text: 'No issues recorded in tested items',
      subtext: 'All checked items passed baseline tests. Passed checks do not guarantee internal hardware longevity; always obtain a written invoice.',
      severity: 'neutral'
    };
  }, [data.items, stats]);

  const saveCurrentAsSnapshot = () => {
    const snapshot: SavedSnapshot = {
      id: `snap-${Date.now()}`,
      savedAt: new Date().toISOString(),
      details: { ...data.details },
      stats: {
        total: stats.total,
        passed: stats.passed,
        failed: stats.failed,
        attention: stats.attention,
        untested: stats.untested
      },
      assessment: assessment.text,
      assessmentSeverity: assessment.severity,
      items: { ...data.items }
    };
    const updated = saveSnapshot(snapshot);
    setSnapshots(updated);
  };

  const removeSnapshot = (id: string) => {
    const updated = deleteSnapshot(id);
    setSnapshots(updated);
  };

  const restoreFromSnapshot = (snapshot: SavedSnapshot) => {
    const restored: InspectionData = {
      version: '1.0',
      details: { ...snapshot.details },
      items: { ...snapshot.items }
    };
    setData(restored);
  };

  return (
    <InspectionContext.Provider
      value={{
        data,
        updateDetail,
        setItemStatus,
        setItemNote,
        resetAll,
        theme,
        setTheme,
        toggleTheme,
        stats,
        categoryProgress,
        assessment,
        snapshots,
        saveCurrentAsSnapshot,
        removeSnapshot,
        restoreFromSnapshot
      }}
    >
      {children}
    </InspectionContext.Provider>
  );
};

export function useInspection() {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspection must be used within an InspectionProvider');
  }
  return context;
}
