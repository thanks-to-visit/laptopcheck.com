import React from 'react';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from '../context/RouterContext';

const footerLinks = [
  { label: 'About Us', to: '/about#about' },
  { label: 'Blogs & Guides', to: '/guides/processor' },
  { label: 'Buyer FAQ', to: '/about#faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Legal Disclaimer', to: '/about#disclaimer' },
  { label: 'Privacy Policy', to: '/about#privacy' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/thanks-to-visit/laptopcheck.com', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gitanuj993', icon: Linkedin },
  { label: 'Email', href: 'mailto:anujtawar42@gmail.com', icon: Mail },
  { label: 'Instagram', href: 'https://www.instagram.com/_limitless_anuj_v4.0.1/', icon: Instagram },
];

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#4A4A4A] dark:border-slate-800/80 bg-gradient-to-br from-[#171717] via-[#292929] to-[#444444] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white shadow-[0_-8px_24px_rgba(0,0,0,0.08)] transition-colors">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10">
          {/* Brand Info */}
          <div className="max-w-sm space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-slate-800 p-1.5 shadow-sm border border-transparent dark:border-slate-700">
                <img
                  src="https://laptopcheck.ai.studio/icon.svg"
                  alt="LaptopCheck icon"
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-base font-bold tracking-tight text-white dark:text-slate-100">
                LaptopCheck
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#C4C4C4] dark:text-slate-400">
              LaptopCheck is a fast, mobile-first web app designed to help buyers thoroughly test second-hand and refurbished Windows laptops right at the seller's shop before paying.
            </p>
          </div>

          {/* Company Links */}
          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white dark:text-slate-300">
              Company
            </h2>
            <div className="mt-3 flex flex-col items-start gap-2.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-[#C4C4C4] dark:text-slate-400 transition-colors hover:text-white dark:hover:text-emerald-400 underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Connect / Socials */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-white dark:text-slate-300">
              Connect
            </h2>
            <div className="mt-3 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#666666] dark:border-slate-800 bg-transparent dark:bg-slate-900/60 text-[#D4D4D4] dark:text-slate-300 transition-colors hover:border-[#A3A3A3] hover:bg-white/10 hover:text-white dark:hover:border-emerald-500/50 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/15 dark:border-slate-800/80 pt-4 text-xs text-[#A3A3A3] dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LaptopCheck. All rights reserved.</p>
          <p className="flex items-center gap-1">Made with <span className="text-orange-500">🧡</span> from India.</p>
        </div>
      </div>
    </footer>
  );
};
