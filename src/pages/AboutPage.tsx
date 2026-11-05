import React from 'react';
import {
  FileText,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  WifiOff
} from 'lucide-react';
import { Link } from '../context/RouterContext';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 max-w-3xl mx-auto py-2">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          About LaptopCheck
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          An open educational utility designed for inspecting second-hand and refurbished Windows laptops directly in physical computer shops.
        </p>
      </div>

      {/* Section: About (#about) */}
      <section id="about" className="scroll-mt-20 space-y-4">
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
            <li><strong>Directory:</strong> Instant access to hardware diagnostic commands and external testing utilities reachable in 2 taps.</li>
            <li><strong>Component Guides:</strong> Scannable breakdown of what to check, exact commands, and red flags for each component.</li>
            <li><strong>Lean Checklist:</strong> A 4-state recording tool (Passed, Failed, Needs Attention, Untested) with live progress tracking and printable diagnostic reports.</li>
          </ul>

          <div className="p-4 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 mt-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-emerald-600" />
              <span>Offline Ready Architecture</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Computer markets often have metal roofs and dense crowds that degrade cellular signal. LaptopCheck installs as a Progressive Web App (PWA) and stores all guides, commands, and checklist entries locally in your browser. All content (except external third-party testing websites) functions 100% offline.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Privacy (#privacy) */}
      <section id="privacy" className="scroll-mt-20 space-y-4">
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
      <section id="disclaimer" className="scroll-mt-20 space-y-4">
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
