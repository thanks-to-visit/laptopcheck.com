import React from 'react';
import { Link } from '../context/RouterContext';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              href="/about#about"
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors underline-offset-4 hover:underline"
            >
              About
            </Link>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <Link
              href="/about#faq"
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors underline-offset-4 hover:underline"
            >
              Buyer FAQs
            </Link>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <Link
              href="/about#privacy"
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors underline-offset-4 hover:underline"
            >
              Privacy Notice
            </Link>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <Link
              href="/about#disclaimer"
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors underline-offset-4 hover:underline"
            >
              Legal Disclaimer
            </Link>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors underline-offset-4 hover:underline"
              title="GitHub repository placeholder"
            >
              GitHub (Placeholder)
            </a>
          </div>

          <p className="text-slate-400 dark:text-slate-500">
            Local browser storage only · No telemetry or tracking
          </p>
        </div>

        {/* Verbatim Disclaimer */}
        <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-4">
          <p>
            LaptopCheck provides educational inspection guidance. It does not guarantee hardware condition or replace professional hardware diagnostics. Buyers should verify device ownership and inspect hardware before payment.
          </p>
        </div>
      </div>
    </footer>
  );
};
