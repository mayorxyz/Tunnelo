import { Link } from 'react-router-dom';
import { SITE_NAME } from '../lib/site';
import { FOOTER_COLS } from '../lib/content';
import { useTheme } from './ThemeProvider';

export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="border-t border-hairline">
      <div className="max-w-[1120px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Brand */}
          <div className="lg:w-56 shrink-0">
            <Link to="/" className="flex items-center gap-2 text-text font-semibold text-sm mb-3">
              <CanIcon />
              {SITE_NAME}
            </Link>
            <p className="text-[11px] text-muted leading-relaxed mb-4">Develop your apps with Public URLs and local domains</p>
            <div className="flex gap-2">
              <SocialBtn label="X">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 2h2l-4 5 4.5 7H10l-3.5-5L3 14H1l4.5-5.5L1 2h3.5L7.5 7 11 2z" fill="currentColor"/></svg>
              </SocialBtn>
              <SocialBtn label="GitHub">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C3.7 1 1 3.7 1 7c0 2.6 1.7 4.9 4 5.7.3.1.4-.1.4-.3v-1c-1.6.3-2-.8-2-.8-.3-.7-.6-.9-.6-.9-.5-.3 0-.3 0-.3.6 0 .9.6.9.6.5.9 1.4.6 1.7.5.1-.4.2-.6.4-.8-1.3-.1-2.6-.6-2.6-2.9 0-.6.2-1.1.6-1.5-.1-.2-.3-.7.1-1.5 0 0 .5-.2 1.5.6.4-.1.9-.2 1.4-.2s1 .1 1.4.2c1-.8 1.5-.6 1.5-.6.3.8.1 1.3.1 1.5.4.4.6.9.6 1.5 0 2.3-1.4 2.8-2.6 2.9.2.2.4.5.4 1.1v1.6c0 .2.1.4.4.3C11.3 11.9 13 9.6 13 7c0-3.3-2.7-6-6-6z" fill="currentColor"/></svg>
              </SocialBtn>
              <SocialBtn label="M">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h2l2 5 2-5h2l2 5 2-5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </SocialBtn>
            </div>
          </div>

          {/* Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-6">
            {FOOTER_COLS.map((col, i) => (
              <div key={i}>
                <p className="text-[11px] text-muted font-mono tracking-wider mb-3">{col.label}</p>
                <div className="space-y-2">
                  {col.links.map((link, j) => (
                    <Link key={j} to={link.href} className="block text-[12px] text-secondary hover:text-text transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Theme control */}
        <div className="mt-8 pt-6 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[11px] text-muted">© 2025-2026 {SITE_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted font-mono">THEME</span>
            <div className="flex gap-0.5 bg-raised rounded-md p-0.5">
              {(['light', 'dark', 'system'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`text-[10px] px-2 py-1 rounded transition-colors capitalize ${
                    theme === t ? 'bg-lime text-lime-dark font-semibold' : 'text-muted hover:text-text'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button aria-label={label} className="w-8 h-8 rounded-md border border-hairline flex items-center justify-center text-muted hover:text-text hover:border-text/20 transition-colors">
      {children}
    </button>
  );
}

function CanIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="5" y="4" width="10" height="13" rx="2" fill="var(--color-lime)" />
      <rect x="7" y="2" width="6" height="3" rx="1" fill="var(--color-lime)" opacity="0.7" />
      <rect x="8" y="7" width="4" height="1" rx="0.5" fill="var(--color-page)" />
    </svg>
  );
}
