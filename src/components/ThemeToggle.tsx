import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [showToast, setShowToast] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Show toast on theme change
  useEffect(() => {
    setShowToast(true);
    setIsExiting(false);
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setShowToast(false), 200);
    }, 1500);
    return () => clearTimeout(timer);
  }, [resolvedTheme]);

  const isLight = resolvedTheme === 'light';

  return (
    <>
      <button
        onClick={toggleTheme}
        aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
        title={isLight ? 'Switch to dark theme (press T)' : 'Switch to light theme (press T)'}
        className="relative w-9 h-9 rounded-full border border-hairline bg-surface flex items-center justify-center hover:border-lime/40 transition-colors group"
      >
        {/* Sun icon (shown in dark mode) */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`absolute transition-all duration-300 ${isLight ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}
        >
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Moon icon (shown in light mode) */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`absolute transition-all duration-300 ${isLight ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}
        >
          <path d="M13.5 9.5a6 6 0 01-7-7 6 6 0 107 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Toast notification */}
      {showToast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-surface border border-hairline shadow-lg ${
            isExiting ? 'animate-toast-out' : 'animate-toast-in'
          }`}
          role="status"
          aria-live="polite"
        >
          <p className="text-[12px] text-secondary font-mono">
            Theme: {isLight ? 'Light' : 'Dark'}
          </p>
        </div>
      )}
    </>
  );
}
