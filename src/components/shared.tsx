import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

export function FadeUp({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AppWindow({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`rounded-xl border border-hairline bg-app overflow-hidden ${className}`}
      style={{ boxShadow: '0 20px 60px var(--color-shadow)' }}
    >
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-hairline">
        <span className="w-3 h-3 rounded-full bg-red" />
        <span className="w-3 h-3 rounded-full bg-amber" />
        <span className="w-3 h-3 rounded-full bg-green" />
      </div>
      {children}
    </motion.div>
  );
}

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    if (open) {
      const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: 'var(--color-overlay)' }} onClick={onClose} />
      <div className="relative bg-surface border border-hairline rounded-xl p-6 max-w-sm w-full">
        <button onClick={onClose} className="absolute top-3 right-3 text-muted hover:text-text text-lg" aria-label="Close">×</button>
        {children}
      </div>
    </div>
  );
}

export function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
      <path d="M3 7l3 3 5-6" stroke="var(--color-lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PixelAvatar({ seed = 0, size = 40 }: { seed?: number; size?: number }) {
  const colors = ['var(--color-lime)', 'var(--color-green)', 'var(--color-blue)', 'var(--color-amber)', 'var(--color-red)'];
  const grid = 8;
  const cellSize = size / grid;
  const cells: { x: number; y: number; color: string }[] = [];
  const rng = (n: number) => ((n * 9301 + 49297) % 233280) / 233280;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid / 2; x++) {
      if (rng(seed * 100 + y * grid + x) > 0.5) {
        const color = colors[Math.floor(rng(seed * 50 + y + x) * colors.length)];
        cells.push({ x, y, color });
        cells.push({ x: grid - 1 - x, y, color });
      }
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="var(--color-raised)" rx="4" />
      {cells.map((c, i) => (
        <rect key={i} x={c.x * cellSize} y={c.y * cellSize} width={cellSize} height={cellSize} fill={c.color} />
      ))}
    </svg>
  );
}

export function useTypingAnimation(text: string, speed = 30, trigger = true) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (!trigger) { setDisplayed(''); return; }
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, trigger]);
  return displayed;
}
