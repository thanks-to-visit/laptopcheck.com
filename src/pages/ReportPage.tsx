import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Laptop,
  Printer,
  RotateCcw,
  Save,
  Trash2,
  XCircle
} from 'lucide-react';
import { CHECKLIST_ITEMS } from '../data/checklist';
import { CATEGORIES } from '../data/categories';
import { ChecklistItem } from '../data/types';
import { Link, useRouter } from '../context/RouterContext';
import { useInspection } from '../context/InspectionContext';
import { ConfirmModal } from '../components/ConfirmModal';

export const ReportPage: React.FC = () => {
  const { navigate } = useRouter();
  const {
    data,
    stats,
    categoryProgress,
    assessment,
    resetAll,
    snapshots,
    saveCurrentAsSnapshot,
    removeSnapshot,
    restoreFromSnapshot
  } = useInspection();

  const [showResetModal, setShowResetModal] = useState(false);
  const [snapshotSavedNotice, setSnapshotSavedNotice] = useState(false);

  // Group failed and attention items by severity
  const categorizedDefects = useMemo(() => {
    const critical: { item: ChecklistItem; status: string; note: string }[] = [];
    const high: { item: ChecklistItem; status: string; note: string }[] = [];
    const medium: { item: ChecklistItem; status: string; note: string }[] = [];
    const low: { item: ChecklistItem; status: string; note: string }[] = [];

    CHECKLIST_ITEMS.forEach((item) => {
      const rec = data.items[item.id];
      if (rec && (rec.status === 'failed' || rec.status === 'attention')) {
        const payload = { item, status: rec.status, note: rec.note };
        if (item.severity === 'critical') critical.push(payload);
        else if (item.severity === 'high') high.push(payload);
        else if (item.severity === 'medium') medium.push(payload);
        else low.push(payload);
      }
    });

    return { critical, high, medium, low };
  }, [data.items]);

  const totalDefects =
    categorizedDefects.critical.length +
    categorizedDefects.high.length +
    categorizedDefects.medium.length +
    categorizedDefects.low.length;

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const payload = {
      app: 'LaptopCheck',
      exportedAt: new Date().toISOString(),
      details: data.details,
      summary: {
        total: stats.total,
        passed: stats.passed,
        failed: stats.failed,
        attention: stats.attention,
        untested: stats.untested,
        percentCompleted: stats.percent,
        advisoryAssessment: assessment.text
      },
      categoryBreakdown: categoryProgress,
      checklistData: data.items
    };

    const fileName = `laptop-inspection-${(data.details.brand || 'device').toLowerCase()}-${(data.details.model || 'unit').toLowerCase()}-${data.details.inspectionDate || 'report'}.json`.replace(
      /\s+/g,
      '_'
    );

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveSnapshot = () => {
    saveCurrentAsSnapshot();
    setSnapshotSavedNotice(true);
    setTimeout(() => setSnapshotSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto print-page">
      {/* Reset Confirmation Dialog */}
      <ConfirmModal
        isOpen={showResetModal}
        title="Start Fresh Inspection?"
        message="This will reset all current item statuses and device specs. (You can save a snapshot of the current report first)."
        confirmLabel="Start New Inspection"
        cancelLabel="Keep Current"
        isDestructive={true}
        onConfirm={() => {
          resetAll();
          setShowResetModal(false);
          navigate('/checklist');
        }}
        onCancel={() => setShowResetModal(false)}
      />

      {/* Top Action Bar (hidden when printing) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => navigate('/checklist')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Checklist</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer min-h-[36px]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          {/* Export JSON */}
          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer min-h-[36px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>

          {/* Save Snapshot locally */}
          <button
            type="button"
            onClick={handleSaveSnapshot}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer min-h-[36px]"
          >
            <Save className="w-3.5 h-3.5 text-emerald-600" />
            <span>{snapshotSavedNotice ? 'Snapshot Saved!' : 'Save Snapshot'}</span>
          </button>

          {/* Start New */}
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors cursor-pointer min-h-[36px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Inspection</span>
          </button>
        </div>
      </div>

      {/* Report Header Card */}
      <section className="p-6 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 print-break-inside-avoid">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs uppercase font-mono tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
              Field Diagnostic Report
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
              Laptop Inspection Summary
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Generated via LaptopCheck Field Guide · {data.details.inspectionDate || 'Today'}
            </p>
          </div>

          {/* Quoted Price Badge */}
          {data.details.quotedPrice && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded border border-slate-200 dark:border-slate-700 text-right">
              <div className="text-[11px] text-slate-500 uppercase font-mono">Quoted Price</div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
                {data.details.quotedPrice}
              </div>
            </div>
          )}
        </div>

        {/* Laptop Details Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Make &amp; Model</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
              {data.details.brand || 'Unspecified'} {data.details.model}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Serial Number</span>
            <span className="font-mono text-slate-800 dark:text-slate-200">
              {data.details.serial || 'Not recorded'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Processor (CPU)</span>
            <span className="text-slate-800 dark:text-slate-200">
              {data.details.processor || 'Not recorded'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Memory &amp; Storage</span>
            <span className="text-slate-800 dark:text-slate-200">
              {data.details.ram || 'RAM N/A'} / {data.details.storage || 'Storage N/A'}
            </span>
          </div>
        </div>
      </section>

      {/* Advisory Assessment Banner (MANDATORY DISCLAIMER INCLUDED) */}
      <section
        className={`p-5 rounded-md border print-break-inside-avoid space-y-2 ${
          assessment.severity === 'critical'
            ? 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100'
            : assessment.severity === 'high'
            ? 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100'
            : assessment.severity === 'warning'
            ? 'border-yellow-300 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-950 dark:text-yellow-100'
            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200'
        }`}
      >
        <div className="flex items-center gap-2">
          {assessment.severity === 'critical' ? (
            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          ) : assessment.severity === 'high' || assessment.severity === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          )}
          <h2 className="text-base font-bold">
            Advisory Assessment: {assessment.text}
          </h2>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed pl-7">
          {assessment.subtext}
        </p>

        {/* Verbatim mandatory safety condition sentence */}
        <p className="text-xs font-semibold pl-7 pt-1 border-t border-black/10 dark:border-white/10">
          * Notice: Passed checks do not guarantee hardware condition.
        </p>
      </section>

      {/* Totals Scorecard */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3 print-break-inside-avoid">
        <div className="p-3.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
            {stats.total}
          </div>
          <div className="text-xs text-slate-500">Total Checks</div>
        </div>
        <div className="p-3.5 rounded border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-slate-900 text-center">
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {stats.passed}
          </div>
          <div className="text-xs text-emerald-800 dark:text-emerald-300">Passed</div>
        </div>
        <div className="p-3.5 rounded border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-slate-900 text-center">
          <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400">
            {stats.failed}
          </div>
          <div className="text-xs text-rose-800 dark:text-rose-300">Failed</div>
        </div>
        <div className="p-3.5 rounded border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-slate-900 text-center">
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
            {stats.attention}
          </div>
          <div className="text-xs text-amber-800 dark:text-amber-300">Needs Attention</div>
        </div>
        <div className="p-3.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center col-span-2 sm:col-span-1">
          <div className="text-2xl font-bold font-mono text-slate-500">
            {stats.untested}
          </div>
          <div className="text-xs text-slate-500">Untested</div>
        </div>
      </section>

      {/* Category Progress Breakdown */}
      <section className="p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 print-break-inside-avoid">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Component Category Breakdown
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {CATEGORIES.map((cat) => {
            const prog = categoryProgress[cat.id];
            return (
              <div
                key={cat.id}
                className="p-3 rounded border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {cat.name}
                  </span>
                  <span className="font-mono text-slate-500">
                    {prog.passed}/{prog.total} passed
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full"
                    style={{ width: `${(prog.passed / prog.total) * 100}%` }}
                  />
                  <div
                    className="bg-amber-500 h-full"
                    style={{ width: `${(prog.attention / prog.total) * 100}%` }}
                  />
                  <div
                    className="bg-rose-500 h-full"
                    style={{ width: `${(prog.failed / prog.total) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    Failed: {prog.failed} · Attention: {prog.attention}
                  </span>
                  <span>{prog.percent}% tested</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Defect & Attention Log Grouped by Severity */}
      <section className="p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 print-break-inside-avoid">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Recorded Issues &amp; Inspection Notes ({totalDefects})
          </h2>
          {totalDefects === 0 && (
            <span className="text-xs text-emerald-600 font-medium">
              Zero defects recorded
            </span>
          )}
        </div>

        {totalDefects === 0 ? (
          <p className="text-xs text-slate-500 py-2">
            No items were flagged as failed or needing attention. (Ensure all critical checks were verified).
          </p>
        ) : (
          <div className="space-y-4 text-xs">
            {/* Critical Defects */}
            {categorizedDefects.critical.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide">
                  Critical Deal Breakers ({categorizedDefects.critical.length})
                </div>
                <div className="space-y-2">
                  {categorizedDefects.critical.map(({ item, status, note }) => (
                    <div
                      key={item.id}
                      className="p-3 rounded border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-rose-900 dark:text-rose-200">
                          {item.title}
                        </span>
                        <span className="uppercase font-mono text-[10px] px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-200 font-bold">
                          {status}
                        </span>
                      </div>
                      {note && (
                        <p className="text-slate-700 dark:text-slate-300 italic pt-1">
                          Note: "{note}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* High Defects */}
            {categorizedDefects.high.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                  High-Risk Issues ({categorizedDefects.high.length})
                </div>
                <div className="space-y-2">
                  {categorizedDefects.high.map(({ item, status, note }) => (
                    <div
                      key={item.id}
                      className="p-3 rounded border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-900 dark:text-amber-200">
                          {item.title}
                        </span>
                        <span className="uppercase font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-bold">
                          {status}
                        </span>
                      </div>
                      {note && (
                        <p className="text-slate-700 dark:text-slate-300 italic pt-1">
                          Note: "{note}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medium Defects */}
            {categorizedDefects.medium.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  Moderate Wear / Defects ({categorizedDefects.medium.length})
                </div>
                <div className="space-y-2">
                  {categorizedDefects.medium.map(({ item, status, note }) => (
                    <div
                      key={item.id}
                      className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {item.title}
                        </span>
                        <span className="uppercase font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {status}
                        </span>
                      </div>
                      {note && (
                        <p className="text-slate-600 dark:text-slate-400 italic pt-1">
                          Note: "{note}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Low Defects */}
            {categorizedDefects.low.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Minor Cosmetic Wear ({categorizedDefects.low.length})
                </div>
                <div className="space-y-2">
                  {categorizedDefects.low.map(({ item, status, note }) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 dark:text-slate-300">{item.title}</span>
                        <span className="uppercase font-mono text-[10px] text-slate-500">{status}</span>
                      </div>
                      {note && <p className="text-slate-500 italic">Note: "{note}"</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Saved Snapshots Section (LocalStorage history) */}
      <section className="no-print p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>Local Saved Report Snapshots ({snapshots.length})</span>
        </h2>
        <p className="text-xs text-slate-500">
          Saved inspections stored in this browser for quick reference or comparison between different laptops.
        </p>

        {snapshots.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-1">
            No previous snapshots saved yet. Click "Save Snapshot" above to preserve this inspection.
          </p>
        ) : (
          <div className="space-y-2 text-xs">
            {snapshots.map((snap) => (
              <div
                key={snap.id}
                className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    {snap.details.brand || 'Laptop'} {snap.details.model} · {snap.details.quotedPrice || 'No price'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Saved: {new Date(snap.savedAt).toLocaleString()} · {snap.stats.passed}/{snap.stats.total} passed ({snap.stats.failed} failed)
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      restoreFromSnapshot(snap);
                      navigate('/checklist');
                    }}
                    className="px-2.5 py-1 text-xs text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 rounded border border-emerald-300 dark:border-emerald-800 transition-colors cursor-pointer"
                  >
                    Restore
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSnapshot(snap.id)}
                    aria-label="Delete saved snapshot"
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
