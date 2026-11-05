import React from 'react';
import { Laptop, Moon, Sun, ClipboardCheck } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';
import { useInspection } from '../context/InspectionContext';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const { route, navigate } = useRouter();
  const { theme, toggleTheme, stats } = useInspection();

  const isTools = route.path === '/tools' || route.path === '/';
  const isDirectory = route.path === '/directory';
  const isGuides = route.path === '/guides';
  const isChecklist = route.path === '/checklist';
  const isReport = route.path === '/report';
  const isAbout = route.path === '/about';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded focus:shadow-md"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-base md:text-lg tracking-tight text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
            title="LaptopCheck Tools & Inspection"
          >
            <span className="p-1.5 rounded bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center">
              <Laptop className="w-4 h-4 text-emerald-400" />
            </span>
            <span>LaptopCheck</span>
          </Link>

          {/* Zone 2: Navigation Links (single-line, clean text) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link
              href="/tools"
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                isTools ? 'text-slate-900 dark:text-slate-100 font-semibold border-b-2 border-emerald-500' : ''
              }`}
            >
              Tools &amp; Commands
            </Link>
            <Link
              href="/directory"
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                isDirectory ? 'text-slate-900 dark:text-slate-100 font-semibold border-b-2 border-emerald-500' : ''
              }`}
            >
              Directory
            </Link>
            <Link
              href="/guides/processor"
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                isGuides ? 'text-slate-900 dark:text-slate-100 font-semibold border-b-2 border-emerald-500' : ''
              }`}
            >
              Guides
            </Link>
            <Link
              href="/checklist"
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                isChecklist ? 'text-slate-900 dark:text-slate-100 font-semibold border-b-2 border-emerald-500' : ''
              }`}
            >
              Checklist
            </Link>
            <Link
              href="/report"
              className={`hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap shrink-0 py-1 ${
                isReport ? 'text-slate-900 dark:text-slate-100 font-semibold border-b-2 border-emerald-500' : ''
              }`}
            >
              Report
            </Link>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <PWAInstallButton compact />

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch theme (currently ${theme})`}
              title={`Switch theme (currently ${theme})`}
              className="p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              )}
            </button>

            {/* Prominent "Open Checklist" CTA button */}
            <button
              type="button"
              onClick={() => navigate('/checklist')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Open Checklist</span>
              {stats.tested > 0 && (
                <span className="hidden sm:inline-block ml-1 px-1.5 py-0.2 text-[11px] bg-emerald-700 rounded text-emerald-100 font-mono">
                  {stats.tested}/{stats.total}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
