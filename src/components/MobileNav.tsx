import React from 'react';
import { BookOpen, CheckSquare, FileText, Home, Wrench } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { useInspection } from '../context/InspectionContext';

export const MobileNav: React.FC = () => {
  const { route, navigate } = useRouter();
  const { stats } = useInspection();

  const isHome = route.path === '/';
  const isGuides = route.path === '/guides';
  const isTools = route.path === '/tools';
  const isChecklist = route.path === '/checklist';
  const isReport = route.path === '/report';

  return (
    <nav
      id="mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-t border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="grid grid-cols-5 items-center h-14 max-w-lg mx-auto px-1">
        {/* Home */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors ${
            isHome
              ? 'text-emerald-600 dark:text-emerald-400 font-medium'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-1">Directory</span>
        </button>

        {/* Guides */}
        <button
          type="button"
          onClick={() => navigate('/guides/processor')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors ${
            isGuides
              ? 'text-emerald-600 dark:text-emerald-400 font-medium'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-1">Guides</span>
        </button>

        {/* Tools */}
        <button
          type="button"
          onClick={() => navigate('/tools')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors ${
            isTools
              ? 'text-emerald-600 dark:text-emerald-400 font-medium'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-1">Tools</span>
        </button>

        {/* Checklist */}
        <button
          type="button"
          onClick={() => navigate('/checklist')}
          className={`relative flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors ${
            isChecklist
              ? 'text-emerald-600 dark:text-emerald-400 font-medium'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <CheckSquare className="w-4 h-4" />
            {stats.tested > 0 && (
              <span className="absolute -top-1.5 -right-3 text-[9px] font-mono px-1 py-0.2 rounded-full bg-emerald-600 text-white font-bold leading-none">
                {stats.tested}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Checklist</span>
        </button>

        {/* Report */}
        <button
          type="button"
          onClick={() => navigate('/report')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors ${
            isReport
              ? 'text-emerald-600 dark:text-emerald-400 font-medium'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px] tracking-tight mt-1">Report</span>
        </button>
      </div>
    </nav>
  );
};
