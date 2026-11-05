import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ExternalLink,
  Laptop,
  Search,
  Terminal,
  Wrench,
  X
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { COMMANDS } from '../data/commands';
import { ONLINE_TOOLS } from '../data/tools';
import { GUIDES } from '../data/guides';
import { Link, useRouter } from '../context/RouterContext';
import { useInspection } from '../context/InspectionContext';
import { DynamicIcon } from '../components/DynamicIcon';
import { CopyButton } from '../components/CopyButton';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { categoryProgress, stats } = useInspection();
  const [searchQuery, setSearchQuery] = useState('');

  // Essential commands for the home page quick-copy section
  const essentialCommands = useMemo(() => {
    return COMMANDS.filter((cmd) => cmd.isEssential);
  }, []);

  // Filtered search results across guides, commands, and tools
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const matchedGuides = GUIDES.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.whatToCheck.some((w) => w.toLowerCase().includes(q))
    );

    const matchedCommands = COMMANDS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.command.toLowerCase().includes(q) ||
        c.purpose.toLowerCase().includes(q) ||
        (c.notes && c.notes.toLowerCase().includes(q))
    );

    const matchedTools = ONLINE_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.purpose.toLowerCase().includes(q) ||
        t.usage.toLowerCase().includes(q)
    );

    return {
      guides: matchedGuides,
      commands: matchedCommands,
      tools: matchedTools,
      totalCount: matchedGuides.length + matchedCommands.length + matchedTools.length
    };
  }, [searchQuery]);

  return (
    <div className="space-y-10">
      {/* Hero Directory Header & Universal Search */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Inspection Directory
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
              Quick access to diagnostic commands, web tests, and component inspection steps before buying used laptops.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/checklist')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer min-h-[44px]"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Go to Checklist</span>
              <span className="text-xs bg-emerald-700 px-2 py-0.5 rounded text-emerald-100 font-mono">
                {stats.tested}/{stats.total}
              </span>
            </button>
          </div>
        </div>

        {/* Search Box (Instant, Client-Side across all resources) */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, commands, or tools (e.g., battery report, BIOS key, SSD health, RAM)..."
            className="w-full pl-11 pr-10 py-3 text-sm sm:text-base rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[48px] shadow-2xs transition-all"
            aria-label="Search directory"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </section>

      {/* Instant Search Results Panel (if active query) */}
      {searchResults && (
        <section className="p-4 sm:p-5 rounded-md border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-slate-900/80 space-y-5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-200 dark:border-emerald-900/60">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Search Results ({searchResults.totalCount})
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
            >
              Clear
            </button>
          </div>

          {searchResults.totalCount === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-400 py-3">
              No matching guides, commands, or tools found for "{searchQuery}".
            </p>
          ) : (
            <div className="space-y-4">
              {/* Matched Guides */}
              {searchResults.guides.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Guides ({searchResults.guides.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.guides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="flex items-center justify-between p-3 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <DynamicIcon name={guide.iconName} className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {guide.title}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Commands */}
              {searchResults.commands.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Commands ({searchResults.commands.length})
                  </div>
                  <div className="space-y-2">
                    {searchResults.commands.map((cmd) => (
                      <div
                        key={cmd.id}
                        className="p-3 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="min-w-0 space-y-1">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {cmd.title}
                          </div>
                          <code className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded block sm:inline-block break-all">
                            {cmd.command}
                          </code>
                        </div>
                        <CopyButton textToCopy={cmd.command} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Tools */}
              {searchResults.tools.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                    Tools ({searchResults.tools.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.tools.map((tool) => (
                      <a
                        key={tool.id}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500 transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {tool.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {tool.purpose}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Red/Amber "Walk away if…" Strip */}
      <section className="p-4 rounded-md border border-amber-300 dark:border-amber-800/80 bg-amber-50 dark:bg-amber-950/20 text-slate-800 dark:text-slate-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-amber-900 dark:text-amber-300">
              Walk away immediately if you find:
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              BIOS administrator password lock · Corporate Autopilot / MDM / Computrace enrollment · Swollen battery pack · Signs of liquid spill or burnt flux odor on the board · Failing SSD SMART health · Thermal throttling / unexpected restarts.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Quick Tests (9 Component Cards + Buying Guide) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Component Quick Tests
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select a component to view step-by-step inspection instructions and commands.
            </p>
          </div>
          <Link
            href="/guides/processor"
            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>All guides</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => {
            const prog = categoryProgress[cat.id];
            const isDone = prog && prog.total > 0 && prog.tested === prog.total;

            return (
              <Link
                key={cat.id}
                href={`/guides/${cat.guideSlug}`}
                className="group p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-700 transition-all flex flex-col justify-between min-h-[120px] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <DynamicIcon name={cat.iconName} className="w-4 h-4" />
                      </span>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {cat.name}
                      </h3>
                    </div>

                    {/* Progress label (e.g. 3/11 done) from LocalStorage */}
                    {prog && (
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {prog.tested}/{prog.total} done
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {cat.shortDesc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                  <span>View Guide &amp; Commands</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}

          {/* 10th Card: Buying Guide */}
          <Link
            href="/guides/buying-guide"
            className="group p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-700 transition-all flex flex-col justify-between min-h-[120px] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Buying Guide &amp; Targets
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Target Specs
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                Example ₹19,900 reference target specs, negotiation tips, and cold/warm restart rules.
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">
              <span>View Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Section: Copy a Command (Essential 1-Tap Rows) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Essential Commands
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              One-tap copy rows for battery report, processor, storage, and BIOS security checks.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>All commands</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2">
          {essentialCommands.map((cmd) => (
            <div
              key={cmd.id}
              className="p-3.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-mono px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                    {cmd.type}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {cmd.title}
                  </span>
                </div>
                <div className="overflow-x-auto py-0.5 scrollbar-thin">
                  <code className="text-xs font-mono text-emerald-800 dark:text-emerald-300 whitespace-nowrap">
                    {cmd.command}
                  </code>
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <CopyButton textToCopy={cmd.command} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Online Test Tools */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Online Hardware Test Tools
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Free web-based diagnostic utilities (open in new tab; buyer evaluates results).
            </p>
          </div>
          <Link
            href="/tools"
            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>All tools</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ONLINE_TOOLS.map((tool) => (
            <div
              key={tool.id}
              className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {tool.name}
                  </h3>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {tool.purpose}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Requires Internet</span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title={`Open ${tool.name} in new tab`}
                >
                  <span>Open Tool</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center pt-2">
          Note: External sites do not inspect the laptop automatically; the buyer must run the tests and judge the results.
        </p>
      </section>
    </div>
  );
};
