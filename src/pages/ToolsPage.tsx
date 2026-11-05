import React, { useMemo, useState } from 'react';
import {
  ExternalLink,
  Search,
  Terminal,
  Wrench,
  X,
  Info
} from 'lucide-react';
import { ONLINE_TOOLS } from '../data/tools';
import { COMMANDS } from '../data/commands';
import { CopyButton } from '../components/CopyButton';

type ToolFilter = 'all' | 'tools' | 'commands';

export const ToolsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ToolFilter>('all');

  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ONLINE_TOOLS;
    return ONLINE_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.purpose.toLowerCase().includes(q) ||
        t.usage.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredCommands = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.command.toLowerCase().includes(q) ||
        c.purpose.toLowerCase().includes(q) ||
        (c.notes && c.notes.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const showTools = filterType === 'all' || filterType === 'tools';
  const showCommands = filterType === 'all' || filterType === 'commands';

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Hardware Tools &amp; Commands
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            External browser diagnostics and Windows copy-ready terminal commands for laptop field inspection.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools or commands (e.g. crystaldisk, battery, bios, memory)..."
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[44px]"
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

          {/* Filter Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer min-h-[36px] ${
                filterType === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              All ({ONLINE_TOOLS.length + COMMANDS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('tools')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer min-h-[36px] ${
                filterType === 'tools'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Tools ({ONLINE_TOOLS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('commands')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer min-h-[36px] ${
                filterType === 'commands'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Commands ({COMMANDS.length})
            </button>
          </div>
        </div>
      </section>

      {/* Mandatory Notice */}
      <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-start gap-3">
        <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-1">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Field Testing Notice
          </p>
          <p>
            External sites do not inspect the laptop automatically; the buyer must run the tests and judge the results. External test tools require an active internet connection (e.g. via mobile hotspot).
          </p>
        </div>
      </div>

      {/* Online Test Tools Section */}
      {showTools && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>External Diagnostic Websites ({filteredTools.length})</span>
            </h2>
          </div>

          {filteredTools.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">No tools match your search.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-mono uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        {tool.category}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {tool.purpose}
                    </p>

                    <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded border border-slate-100 dark:border-slate-800">
                      <strong>How to use:</strong> {tool.usage}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400 truncate max-w-[200px]">
                      {tool.url.replace(/^https?:\/\//, '')}
                    </span>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer min-h-[36px]"
                    >
                      <span>Open website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Copyable Commands Section */}
      {showCommands && (
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Copyable Inspection Commands ({filteredCommands.length})</span>
            </h2>
          </div>

          {filteredCommands.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">No commands match your search.</p>
          ) : (
            <div className="space-y-3">
              {filteredCommands.map((cmd) => (
                <div
                  key={cmd.id}
                  className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                        {cmd.type}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {cmd.title}
                      </h3>
                      {cmd.isEssential && (
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded">
                          Essential
                        </span>
                      )}
                    </div>
                    <CopyButton textToCopy={cmd.command} />
                  </div>

                  <div className="overflow-x-auto py-1 scrollbar-thin">
                    <code className="text-xs font-mono text-emerald-800 dark:text-emerald-300 whitespace-nowrap block bg-slate-50 dark:bg-slate-950 p-2 rounded border border-slate-100 dark:border-slate-800">
                      {cmd.command}
                    </code>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cmd.purpose}
                  </p>

                  {cmd.notes && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                      Note: {cmd.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
