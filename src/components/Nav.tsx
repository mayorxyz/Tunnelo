import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { SITE_NAME } from '../lib/site';
import { NAV_LINKS } from '../lib/content';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Auto-close dropdown when navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-3 pb-2 transition-all">
      <div className="max-w-[1120px] mx-auto bg-card/90 dark:bg-card/80 backdrop-blur-xl rounded-2xl shadow-sm">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          
          {/* Brand & Status Indicator */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <CanIcon />
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-sm tracking-tight text-foreground group-hover:text-lime transition-colors">
                {SITE_NAME}
              </span>
              
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const isActive = location.pathname === l.href;
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`text-[13px] font-medium px-3.5 py-1.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-lime/10 text-lime font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/download"
              className="bg-lime text-lime-dark text-[13px] font-bold px-4 py-2 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-xs flex items-center gap-1"
            >
              Start building ↗
            </Link>
          </div>

          {/* Mobile Toggle Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-muted/80 border border-border/80 text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle navigation"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {mobileOpen ? (
                  <path d="M4 4l10 10M14 4L4 14" />
                ) : (
                  <path d="M2.5 5h13M2.5 9h13M2.5 13h13" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Card Portal */}
      {mobileOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 md:hidden flex flex-col pt-20 px-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide Card Container */}
            <div className="relative z-10 w-full max-w-[1120px] mx-auto bg-card border border-border rounded-2xl p-5 shadow-2xl flex flex-col gap-5 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Header Status */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-lime" />
                  <span className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">Navigation Menu</span>
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-muted text-foreground border border-border/40">
                  {NAV_LINKS.length} Links
                </span>
              </div>

              {/* Links Grid with Bolder Font Settings */}
              <div className="grid grid-cols-1 gap-1.5">
                {NAV_LINKS.map((l) => {
                  const isActive = location.pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      to={l.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between text-base font-bold p-3.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-lime/15 text-lime border border-lime/30 font-extrabold'
                          : 'text-foreground hover:bg-muted/80'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-sm font-black opacity-70">→</span>
                    </Link>
                  );
                })}
              </div>

              {/* Theme Selector & Actions */}
              <div className="pt-3 border-t border-border/60 flex flex-col gap-3">
                <div className="flex items-center justify-between bg-muted/60 p-2 rounded-xl border border-border/60">
                  <span className="text-xs font-mono font-bold text-foreground pl-2 uppercase">Theme</span>
                  <div className="flex gap-1">
                    {(['light', 'dark', 'system'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`text-xs px-3.5 py-1.5 rounded-lg capitalize font-bold transition-all ${
                          theme === t
                            ? 'bg-lime text-lime-dark shadow-xs'
                            : 'text-foreground hover:bg-muted/80'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  to="/download"
                  onClick={() => setMobileOpen(false)}
                  className="w-full bg-lime text-lime-dark text-base font-extrabold py-3.5 rounded-xl text-center shadow-md hover:opacity-90 active:scale-98 transition-all"
                >
                  Start building ↗
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}

function CanIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <rect x="5" y="4" width="10" height="13" rx="2" fill="var(--color-lime)" />
      <rect x="7" y="2" width="6" height="3" rx="1" fill="var(--color-lime)" opacity="0.7" />
      <rect x="8" y="7" width="4" height="1" rx="0.5" className="fill-background" />
    </svg>
  );
}