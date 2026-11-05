import React from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ExternalLink,
  Info,
  ShieldAlert,
  Terminal,
  Wrench
} from 'lucide-react';
import { GUIDES } from '../data/guides';
import { Link, useRouter } from '../context/RouterContext';
import { DynamicIcon } from '../components/DynamicIcon';
import { CopyButton } from '../components/CopyButton';

// BIOS Key Reference Table for quick glance
const BIOS_KEYS = [
  { brand: 'Dell', key: 'F2 (or F12 boot menu)' },
  { brand: 'HP', key: 'Esc then F10 (or F9 boot menu)' },
  { brand: 'Lenovo ThinkPad', key: 'F1 (or Enter then F1)' },
  { brand: 'Lenovo IdeaPad', key: 'F2 (or Novo Button)' },
  { brand: 'Acer', key: 'F2 (or Delete)' },
  { brand: 'ASUS', key: 'F2 (or Delete)' },
  { brand: 'MSI', key: 'Delete (Del)' }
];

export const GuidesPage: React.FC = () => {
  const { route, navigate } = useRouter();
  const currentSlug = route.slug || 'processor';

  // Find guide matching slug, or fallback to first
  const guide = GUIDES.find((g) => g.slug === currentSlug) || GUIDES[0];

  const currentIndex = GUIDES.findIndex((g) => g.slug === guide.slug);
  const prevGuide = currentIndex > 0 ? GUIDES[currentIndex - 1] : null;
  const nextGuide = currentIndex < GUIDES.length - 1 ? GUIDES[currentIndex + 1] : null;

  const isBiosSecurity = guide.slug === 'bios-security';

  return (
    <div className="space-y-6">
      {/* Top Guide Navigation Tabs (horizontal scrolling on mobile) */}
      <nav aria-label="Guides navigation" className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-1.5 min-w-max p-1 bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800">
          {GUIDES.map((g) => {
            const isActive = g.slug === guide.slug;
            return (
              <button
                key={g.slug}
                type="button"
                onClick={() => navigate(`/guides/${g.slug}`)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer min-h-[36px] ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <DynamicIcon name={g.iconName} className="w-3.5 h-3.5" />
                <span>{g.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Guide Header Banner */}
      <div className="p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
              <DynamicIcon name={guide.iconName} className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {guide.title}
            </h1>
            {isBiosSecurity && (
              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                Most Important
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            {guide.subtitle}
          </p>
        </div>

        {/* Action: Open Checklist Section */}
        {guide.categoryId && (
          <button
            type="button"
            onClick={() => navigate(`/checklist?category=${guide.categoryId}`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer min-h-[40px]"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Open Checklist Section</span>
          </button>
        )}
      </div>

      {/* Two-Column Responsive Layout: Left Main Content / Right Red Flags & Pro Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* BIOS Key Table (only for BIOS & Security guide) */}
          {isBiosSecurity && (
            <div className="p-4 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Common Laptop Brand BIOS Keys</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {BIOS_KEYS.map((item) => (
                  <div
                    key={item.brand}
                    className="p-2 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{item.brand}:</span>
                    <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-emerald-700 dark:text-emerald-400 font-bold">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Instructions: Shut down Windows completely (hold Shift while clicking Shut Down). Press Power button and immediately tap the BIOS key repeatedly until the BIOS configuration menu appears.
              </p>
            </div>
          )}

          {/* Section: What to Check */}
          <div className="p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>What to Check</span>
            </h2>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {guide.whatToCheck.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: How to Test (Step-by-Step) */}
          <div className="p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <span>How to Perform the Inspection</span>
            </h2>
            <div className="space-y-3">
              {guide.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-1"
                >
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Step {idx + 1}: {step.title}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step.instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Commands (Copyable code blocks, horizontally scrollable on mobile) */}
          {guide.commands.length > 0 && (
            <div className="p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span>Commands</span>
              </h2>
              <div className="space-y-3">
                {guide.commands.map((cmd, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {cmd.type && (
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {cmd.type}
                          </span>
                        )}
                        <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {cmd.label}
                        </span>
                      </div>
                      <CopyButton textToCopy={cmd.code} />
                    </div>

                    <div className="overflow-x-auto py-1 scrollbar-thin">
                      <code className="text-xs font-mono text-emerald-800 dark:text-emerald-300 whitespace-nowrap block">
                        {cmd.code}
                      </code>
                    </div>

                    {cmd.explanation && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {cmd.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: External Test Tool (if relevant) */}
          {guide.tool && (
            <div className="p-4 rounded-md border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                  Recommended Test Tool
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {guide.tool.name}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {guide.tool.description}
                </p>
              </div>

              <a
                href={guide.tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                <span>Launch Tool</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Red Flags & Pro Tips (Desktop Sidebar / Collapses inline on mobile) */}
        <div className="space-y-6">
          {/* Red Flags Panel */}
          <div className="p-5 rounded-md border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
            <h2 className="text-sm font-bold text-rose-900 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Red Flags &amp; Deal Breakers</span>
            </h2>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {guide.redFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">✕</span>
                  <span className="leading-relaxed">{flag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tips Panel */}
          {guide.proTips && guide.proTips.length > 0 && (
            <div className="p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Field Inspector Notes</span>
              </h2>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                {guide.proTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Category Checklist Quick Access */}
          {guide.categoryId && (
            <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ready to record your findings for this component?
              </p>
              <button
                type="button"
                onClick={() => navigate(`/checklist?category=${guide.categoryId}`)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors cursor-pointer min-h-[40px]"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Jump to {guide.title.split(' ')[0]} in Checklist</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pagination Footer: Prev Guide / Next Guide */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        {prevGuide ? (
          <button
            type="button"
            onClick={() => navigate(`/guides/${prevGuide.slug}`)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer min-h-[40px]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev: {prevGuide.title.split(' ')[0]}</span>
          </button>
        ) : <div />}

        {nextGuide ? (
          <button
            type="button"
            onClick={() => navigate(`/guides/${nextGuide.slug}`)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer min-h-[40px]"
          >
            <span>Next: {nextGuide.title.split(' ')[0]}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
