import React, { useState } from 'react';
import {
  FileText,
  HelpCircle,
  Lock,
  Search,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Terminal,
  WifiOff,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Link } from '../context/RouterContext';
import { FAQS } from '../data/faqs';
import { CopyButton } from '../components/CopyButton';

export const AboutPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState<string>('');

  const categories = ['all', 'Inspection Advice', 'BIOS & Security', 'Battery & Power', 'Storage', 'Display', 'Input Devices', 'Buying Guide', 'Software & License'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const query = faqSearch.trim().toLowerCase();
    const matchesQuery = !query || 
      faq.question.toLowerCase().includes(query) ||
      faq.shortAnswer.toLowerCase().includes(query) ||
      faq.detailedAnswer.toLowerCase().includes(query) ||
      (faq.command && faq.command.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-2">
      {/* Page Title & Fast Anchor Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            About &amp; Buyer FAQs
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Field testing knowledge base, diagnostic Q&amp;As, and inspection advice for second-hand Windows laptops.
          </p>
        </div>

        {/* Anchor Jump Links */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-medium">
          <a
            href="#faq"
            className="px-3 py-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100 transition-colors"
          >
            Buyer FAQs ({FAQS.length})
          </a>
          <a
            href="#about"
            className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            About LaptopCheck
          </a>
          <a
            href="#privacy"
            className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            Privacy Notice
          </a>
          <a
            href="#disclaimer"
            className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            Legal Disclaimer
          </a>
        </div>
      </div>

      {/* Section: Frequently Asked Questions (#faq) - Optimized for Search & AI Engines */}
      <section id="faq" className="scroll-mt-20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions (Field Buyer FAQ)
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {filteredFaqs.length} answered questions
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Direct, practical answers to common field inspection questions. Structured for fast reading by buyers in shops and machine-readable for search engines.
        </p>

        {/* FAQ Search and Category Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="search"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search FAQs (e.g. battery command, bios password, mdm lock, 8th gen)..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <article
              key={faq.id}
              className="p-5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono uppercase text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40">
                  {faq.category}
                </span>
                {faq.linkHref && (
                  <Link
                    href={faq.linkHref}
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{faq.linkText || 'View Guide'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {/* Question */}
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {faq.question}
              </h3>

              {/* Direct Short Answer (Optimal for AI Summaries & Featured Snippets) */}
              <div className="p-3 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                <strong>Quick Answer:</strong> {faq.shortAnswer}
              </div>

              {/* Detailed Technical Explanation */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.detailedAnswer}
              </p>

              {/* Copyable Command if available */}
              {faq.command && (
                <div className="pt-1 flex items-center justify-between gap-2 bg-slate-100 dark:bg-slate-950 p-2.5 rounded border border-slate-200 dark:border-slate-800">
                  <code className="text-xs font-mono text-emerald-800 dark:text-emerald-300 overflow-x-auto whitespace-nowrap">
                    {faq.command}
                  </code>
                  <CopyButton textToCopy={faq.command} />
                </div>
              )}
            </article>
          ))}

          {filteredFaqs.length === 0 && (
            <p className="text-sm text-slate-500 py-6 text-center">
              No FAQs matched your search. Try typing &ldquo;battery&rdquo;, &ldquo;bios&rdquo;, or &ldquo;ssd&rdquo;.
            </p>
          )}
        </div>
      </section>

      {/* Section: About (#about) */}
      <section id="about" className="scroll-mt-20 space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            About the App
          </h2>
        </div>

        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
          <p>
            When buying a refurbished or used laptop in a physical computer bazaar or independent repair shop, buyers face asymmetric information. Sellers often present a cosmetic wipe-down and verbal guarantees (&ldquo;1-month warranty, don't worry brother&rdquo;) without disclosing degrading battery packs, thermal throttling, cracked hinge mounts, or BIOS supervisor passwords.
          </p>

          <p>
            <strong>LaptopCheck</strong> was built to solve this problem by organizing the inspection into three clear, accessible surfaces:
          </p>

          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Tools &amp; Commands:</strong> One-tap copyable diagnostic commands and quick links to 7 free browser tests.</li>
            <li><strong>Component Guides:</strong> Scannable breakdown of what to check, exact commands, and red flags for each component.</li>
            <li><strong>Lean Checklist:</strong> A 4-state recording tool (Passed, Failed, Needs Attention, Untested) with live progress tracking and printable diagnostic reports.</li>
          </ul>

          <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 mt-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-emerald-600" />
              <span>Offline Ready Architecture</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Computer markets often have metal roofs and dense crowds that degrade cellular signal. LaptopCheck installs as a Progressive Web App (PWA) and stores all guides, commands, FAQs, and checklist entries locally in your browser. All content (except external third-party testing websites) functions 100% offline.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Privacy (#privacy) */}
      <section id="privacy" className="scroll-mt-20 space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Privacy Policy
          </h2>
        </div>

        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
          <p>
            <strong>100% Client-Side &amp; Zero Tracking:</strong> All data entered into LaptopCheck (including device serial numbers, specifications, prices, notes, and checklist results) is stored exclusively in your browser's LocalStorage. Nothing is ever transmitted to any remote server, database, or analytics platform.
          </p>

          <p>
            <strong>External Test Websites:</strong> The external diagnostic tools linked in the Tools directory (such as DisplayTech, Key-Test, CrystalMark, WebcamTests, MicTests) are independent third-party web services. When you click their links, you are subject to their respective terms and privacy policies. LaptopCheck does not pass any user or device data to external websites.
          </p>

          <p>
            <strong>Data Deletion:</strong> You can completely clear your stored data at any time by clicking the &ldquo;Reset&rdquo; button in the Checklist or by clearing your browser's site data.
          </p>
        </div>
      </section>

      {/* Section: Disclaimer (#disclaimer - VERBATIM REQUIREMENT) */}
      <section id="disclaimer" className="scroll-mt-20 space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Legal Disclaimer
          </h2>
        </div>

        <div className="p-5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm leading-relaxed space-y-4 shadow-2xs">
          {/* Verbatim Disclaimer Paragraph */}
          <blockquote className="font-medium text-slate-900 dark:text-slate-100">
            &ldquo;LaptopCheck provides educational inspection guidance. It does not guarantee hardware condition or replace professional hardware diagnostics. Buyers should verify device ownership and inspect hardware before payment.&rdquo;
          </blockquote>

          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
            <p>
              Second-hand electronics may contain hidden internal defects (such as previous motherboard micro-soldering, intermittent capacitor leakage, latent liquid damage, or impending BGA solder fatigue) that cannot be detected during an initial visual or software inspection.
            </p>
            <p>
              LaptopCheck provides educational guidelines and testing recommendations only. The creators and contributors of LaptopCheck accept no liability for financial loss, device failure, or disputes arising from laptop purchases. Always demand a written bill containing device serial numbers from the seller.
            </p>
          </div>
        </div>
      </section>

      {/* Back Links */}
      <div className="pt-4 flex items-center gap-3 text-xs font-medium">
        <Link
          href="/tools"
          className="text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          ← Back to Tools &amp; Commands
        </Link>
        <span className="text-slate-300 dark:text-slate-700">·</span>
        <Link
          href="/directory"
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:underline"
        >
          Guides Directory
        </Link>
      </div>
    </div>
  );
};
