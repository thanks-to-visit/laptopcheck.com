import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  FileText,
  HelpCircle,
  Laptop,
  MessageSquare,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
  XCircle
} from 'lucide-react';
import { CHECKLIST_ITEMS } from '../data/checklist';
import { CATEGORIES } from '../data/categories';
import { ChecklistItem, ChecklistStatus } from '../data/types';
import { Link, useRouter } from '../context/RouterContext';
import { useInspection } from '../context/InspectionContext';
import { DynamicIcon } from '../components/DynamicIcon';
import { ConfirmModal } from '../components/ConfirmModal';

type StatusFilter = 'all' | 'untested' | 'passed' | 'failed' | 'attention';

export const ChecklistPage: React.FC = () => {
  const { route, navigate } = useRouter();
  const {
    data,
    updateDetail,
    setItemStatus,
    setItemNote,
    resetAll,
    stats,
    categoryProgress
  } = useInspection();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Collapsible panels
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [showResetModal, setShowResetModal] = useState(false);

  // If a ?category= query parameter was passed, ensure that category is expanded and scroll to it
  useEffect(() => {
    if (route.categoryParam) {
      setCollapsedCategories((prev) => ({
        ...prev,
        [route.categoryParam!]: false
      }));

      setTimeout(() => {
        const el = document.getElementById(`cat-section-${route.categoryParam}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [route.categoryParam]);

  const toggleCategory = (catId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const expandAllCategories = () => {
    setCollapsedCategories({});
  };

  const collapseAllCategories = () => {
    const allCollapsed: Record<string, boolean> = {};
    CATEGORIES.forEach((c) => {
      allCollapsed[c.id] = true;
    });
    setCollapsedCategories(allCollapsed);
  };

  const toggleNote = (itemId: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Filter items based on query and status filter
  const filteredItemsByCategory = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const result: Record<string, ChecklistItem[]> = {};

    CATEGORIES.forEach((cat) => {
      const catItems = CHECKLIST_ITEMS.filter((item) => {
        if (item.categoryId !== cat.id) return false;

        // Query check
        if (q && !item.title.toLowerCase().includes(q) && !(item.hint && item.hint.toLowerCase().includes(q))) {
          return false;
        }

        // Status filter check
        if (statusFilter !== 'all') {
          const itemStatus = data.items[item.id]?.status || 'untested';
          if (itemStatus !== statusFilter) return false;
        }

        return true;
      });

      result[cat.id] = catItems;
    });

    return result;
  }, [searchQuery, statusFilter, data.items]);

  const totalVisibleItems = Object.values(filteredItemsByCategory).reduce(
    (acc, list) => acc + list.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Reset Confirmation Dialog */}
      <ConfirmModal
        isOpen={showResetModal}
        title="Reset Current Inspection?"
        message="This will clear all recorded pass/fail results, notes, and laptop specifications. This action cannot be undone."
        confirmLabel="Reset Everything"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={() => {
          resetAll();
          setShowResetModal(false);
        }}
        onCancel={() => setShowResetModal(false)}
      />

      {/* Sticky Progress & Filter Bar */}
      <div className="sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 transition-colors">
        <div className="max-w-6xl mx-auto space-y-3">
          {/* Top Row: Progress Bar & Counts */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                Inspection Progress:
              </span>
              <div className="w-32 sm:w-48 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                  style={{ width: `${stats.percent}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {stats.percent}%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                ({stats.tested}/{stats.total} tested)
              </span>
            </div>

            {/* Quick action buttons: View Report, Reset */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => navigate('/report')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer min-h-[36px]"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>View Summary Report</span>
              </button>

              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                title="Reset inspection checklist"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 rounded transition-colors cursor-pointer min-h-[36px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Counts & Status Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer min-h-[32px] ${
                  statusFilter === 'all'
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('passed')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer min-h-[32px] ${
                  statusFilter === 'passed'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                }`}
              >
                Passed ({stats.passed})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('failed')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer min-h-[32px] ${
                  statusFilter === 'failed'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
                }`}
              >
                Failed ({stats.failed})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('attention')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer min-h-[32px] ${
                  statusFilter === 'attention'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100'
                }`}
              >
                Attention ({stats.attention})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('untested')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer min-h-[32px] ${
                  statusFilter === 'untested'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                Untested ({stats.untested})
              </button>
            </div>

            {/* Expand / Collapse All */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <button
                type="button"
                onClick={expandAllCategories}
                className="hover:text-slate-900 dark:hover:text-slate-200 underline cursor-pointer"
              >
                Expand all
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={collapseAllCategories}
                className="hover:text-slate-900 dark:hover:text-slate-200 underline cursor-pointer"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible Laptop Details Panel */}
      <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <button
          type="button"
          onClick={() => setDetailsExpanded(!detailsExpanded)}
          aria-expanded={detailsExpanded}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Laptop className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Laptop Specifications &amp; Quoted Price
            </span>
            {(data.details.brand || data.details.model) && (
              <span className="text-xs text-slate-500 font-normal">
                ({data.details.brand} {data.details.model})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{detailsExpanded ? 'Hide details' : 'Edit laptop specs'}</span>
            {detailsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {detailsExpanded && (
          <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="space-y-1">
              <label htmlFor="input-brand" className="font-medium text-slate-700 dark:text-slate-300">Brand</label>
              <input
                id="input-brand"
                type="text"
                value={data.details.brand}
                onChange={(e) => updateDetail('brand', e.target.value)}
                placeholder="e.g. Lenovo, Dell, HP"
                className="w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="input-model" className="font-medium text-slate-700 dark:text-slate-300">Model Name / Number</label>
              <input
                id="input-model"
                type="text"
                value={data.details.model}
                onChange={(e) => updateDetail('model', e.target.value)}
                placeholder="e.g. ThinkPad T480, Latitude 5490"
                className="w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="input-serial" className="font-medium text-slate-700 dark:text-slate-300">Serial Number</label>
              <input
                id="input-serial"
                type="text"
                value={data.details.serial}
                onChange={(e) => updateDetail('serial', e.target.value)}
                placeholder="From chassis or BIOS"
                className="w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="input-price" className="font-medium text-slate-700 dark:text-slate-300">Quoted Price</label>
              <input
                id="input-price"
                type="text"
                value={data.details.quotedPrice}
                onChange={(e) => updateDetail('quotedPrice', e.target.value)}
                placeholder="e.g. ₹19,500 / $240"
                className="w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="input-processor" className="font-medium text-slate-700 dark:text-slate-300">Processor (CPU)</label>
              <input
                id="input-processor"
                type="text"
                value={data.details.processor}
                onChange={(e) => updateDetail('processor', e.target.value)}
                placeholder="e.g. Intel Core i5-8350U"
                className="w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="input-ram" className="font-medium text-slate-700 dark:text-slate-300">RAM Installed</label>
              <input
                id="input-ram"
                type="text"
                value={data.details.ram}
                onChange={(e) => updateDetail('ram', e.target.value)}
                placeholder="e.g. 16 GB DDR4 (2x8GB)"
                className="w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="input-storage" className="font-medium text-slate-700 dark:text-slate-300">Storage Installed</label>
              <input
                id="input-storage"
                type="text"
                value={data.details.storage}
                onChange={(e) => updateDetail('storage', e.target.value)}
                placeholder="e.g. 512 GB NVMe SSD"
                className="w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="input-date" className="font-medium text-slate-700 dark:text-slate-300">Inspection Date</label>
              <input
                id="input-date"
                type="date"
                value={data.details.inspectionDate}
                onChange={(e) => updateDetail('inspectionDate', e.target.value)}
                className="w-full p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        )}
      </div>

      {/* Search Input for items */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter checklist items (e.g. battery, bios, memory, crack, wifi)..."
          className="w-full pl-9 pr-9 py-2 text-sm rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[40px]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Checklist Grouped by 9 Categories */}
      <div className="space-y-4">
        {CATEGORIES.map((cat) => {
          const catItems = filteredItemsByCategory[cat.id] || [];
          const prog = categoryProgress[cat.id];
          const isCollapsed = !!collapsedCategories[cat.id];

          // If searching or filtering and no items match in this category, hide category
          if (catItems.length === 0 && (searchQuery || statusFilter !== 'all')) {
            return null;
          }

          return (
            <section
              key={cat.id}
              id={`cat-section-${cat.id}`}
              className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
            >
              {/* Category Header Bar */}
              <div
                className="p-4 bg-slate-50 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 cursor-pointer select-none"
                onClick={() => toggleCategory(cat.id)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <DynamicIcon name={cat.iconName} className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                    {cat.name}
                  </h2>
                  <span className="text-xs text-slate-500 font-mono">
                    ({prog.tested}/{prog.total})
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href={`/guides/${cat.guideSlug}`}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline hidden sm:inline"
                    title={`View ${cat.name} guide`}
                  >
                    Guide &amp; Tips
                  </Link>

                  <button
                    type="button"
                    aria-label={isCollapsed ? `Expand ${cat.name}` : `Collapse ${cat.name}`}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Items List */}
              {!isCollapsed && (
                <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {catItems.map((item) => {
                    const currentRecord = data.items[item.id] || { status: 'untested', note: '' };
                    const currentStatus = currentRecord.status;
                    const hasNote = !!currentRecord.note;
                    const isNoteExpanded = !!expandedNotes[item.id];

                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 sm:p-4 space-y-2.5 transition-colors ${
                          currentStatus === 'failed'
                            ? 'bg-rose-50/20 dark:bg-rose-950/10'
                            : currentStatus === 'attention'
                            ? 'bg-amber-50/20 dark:bg-amber-950/10'
                            : currentStatus === 'passed'
                            ? 'bg-emerald-50/10 dark:bg-emerald-950/5'
                            : ''
                        }`}
                      >
                        {/* Item Title & Guide Link */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-snug">
                                {item.title}
                              </span>
                              {/* Severity indicator */}
                              {item.severity === 'critical' && (
                                <span className="text-[10px] font-mono uppercase text-rose-700 dark:text-rose-400 font-bold px-1.5 py-0.2 bg-rose-50 dark:bg-rose-950/50 rounded">
                                  Critical
                                </span>
                              )}
                            </div>
                            {item.hint && (
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {item.hint}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <Link
                              href={`/guides/${item.guideSlug}`}
                              className="p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                              title="Open relevant guide section"
                            >
                              <HelpCircle className="w-4 h-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => toggleNote(item.id)}
                              aria-label="Toggle note field"
                              title="Add or edit inspector note"
                              className={`p-1 rounded transition-colors cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center ${
                                hasNote
                                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                              }`}
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* 4 Segmented Status Buttons (Min 44px touch targets on mobile) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-md">
                          {/* Not Tested */}
                          <button
                            type="button"
                            onClick={() => setItemStatus(item.id, 'untested')}
                            className={`px-3 py-2 text-xs font-medium rounded transition-colors min-h-[44px] cursor-pointer flex items-center justify-center ${
                              currentStatus === 'untested'
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold shadow-2xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                            }`}
                          >
                            Not tested
                          </button>

                          {/* Passed */}
                          <button
                            type="button"
                            onClick={() => setItemStatus(item.id, 'passed')}
                            className={`px-3 py-2 text-xs font-medium rounded transition-colors min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
                              currentStatus === 'passed'
                                ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Passed</span>
                          </button>

                          {/* Failed */}
                          <button
                            type="button"
                            onClick={() => setItemStatus(item.id, 'failed')}
                            className={`px-3 py-2 text-xs font-medium rounded transition-colors min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
                              currentStatus === 'failed'
                                ? 'bg-rose-600 text-white font-bold shadow-2xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-300'
                            }`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Failed</span>
                          </button>

                          {/* Needs Attention */}
                          <button
                            type="button"
                            onClick={() => setItemStatus(item.id, 'attention')}
                            className={`px-3 py-2 text-xs font-medium rounded transition-colors min-h-[44px] cursor-pointer flex items-center justify-center gap-1.5 ${
                              currentStatus === 'attention'
                                ? 'bg-amber-600 text-white font-bold shadow-2xs'
                                : 'text-slate-600 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-300'
                            }`}
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Attention</span>
                          </button>
                        </div>

                        {/* Collapsible Inspector Note Field */}
                        {(isNoteExpanded || hasNote) && (
                          <div className="pt-1">
                            <label htmlFor={`note-${item.id}`} className="sr-only">
                              Notes for {item.title}
                            </label>
                            <input
                              id={`note-${item.id}`}
                              type="text"
                              value={currentRecord.note}
                              onChange={(e) => setItemNote(item.id, e.target.value)}
                              placeholder="Add observation note (e.g., 'Trackpad click requires firm press', 'Battery reports 68% health')..."
                              className="w-full text-xs p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}

        {totalVisibleItems === 0 && (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800">
            No checklist items match your current filter or search criteria.
          </div>
        )}
      </div>

      {/* Floating Bottom Action CTA for Mobile / Field */}
      <div className="pt-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/report')}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors cursor-pointer min-h-[48px]"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Full Inspection Report ({stats.tested} completed)</span>
        </button>
      </div>
    </div>
  );
};
