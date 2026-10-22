import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from './shared';
import { SHAPES, SHAPE_ORDER, SHAPE_LABELS, type ShapeName } from '../lib/pixelShapes';

export default function Hero() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 pt-20 pb-[120px] md:pt-28 md:pb-[120px]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <div className="flex-1 max-w-[540px]">
         
          <FadeUp delay={0.08}>
            <h1 className="font-mono text-[32px] md:text-[44px] lg:text-[48px] font-medium leading-[1.15] tracking-tight mb-6">
              Public URLs for<br />developers, designers<br />and agents.
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="text-[14px] text-secondary max-w-[440px] leading-relaxed mb-8">
              Put localhost on a stable Public URL to test webhooks or share previews without deploying. Publish a Snapshot and reviewers comment on it after you close the laptop.
            </p>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="flex flex-wrap gap-3 mb-4">
              <Link to="/download" className="bg-lime text-page text-[13px] font-semibold px-[18px] py-[10px] rounded-md hover:opacity-90 transition-opacity inline-flex items-center gap-1">
                Start building ↗
              </Link>
              <Link to="/download" className="border border-[rgba(255,255,255,0.16)] text-text text-[13px] font-semibold px-[18px] py-[10px] rounded-md hover:bg-white/5 transition-colors inline-flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v8m0 0l-3-3m3 3l3-3M3 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.32}>
            <p className="text-[11px] text-muted">Free 14-day trial included. No credit card required.</p>
          </FadeUp>
        </div>

        <div className="flex-1 w-full lg:max-w-[480px]">
          <FadeUp delay={0.1}>
            <HeroArt />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function HeroArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentShape, setCurrentShape] = useState<ShapeName>(SHAPE_ORDER[0]);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const shapeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const transitionStartRef = useRef(0);
  const currentGridRef = useRef<number[][]>([]);
  const targetGridRef = useRef<number[][]>([]);
  const cellDelaysRef = useRef<number[][]>([]);
  const flickerCellsRef = useRef<{ x: number; y: number; timer: number }[]>([]);
  const pulseRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const prefersReducedMotion = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRID_SIZE = 96;
    const SHAPE_BITMAP_SIZE = 24;
    const SHAPE_SCALE = GRID_SIZE / SHAPE_BITMAP_SIZE;
    const GAP = 1;
    // Read colors from CSS variables for theme support
    const styles = getComputedStyle(document.documentElement);
    const TONES = [
      styles.getPropertyValue('--color-page').trim() || '#0c0c0c',
      '#2a3d0a',
      '#4d6b10',
      styles.getPropertyValue('--color-lime').trim() || '#C6F432',
    ];

    // Parse shape bitmap to grid
    const parseShape = (shapeName: ShapeName): number[][] => {
      const bitmap = SHAPES[shapeName];
      const grid: number[][] = [];
      for (let y = 0; y < GRID_SIZE; y++) {
        const row: number[] = [];
        for (let x = 0; x < GRID_SIZE; x++) {
          const char = bitmap[Math.floor(y / SHAPE_SCALE)]?.[Math.floor(x / SHAPE_SCALE)] || '.';
          if (char === '.') row.push(0);
          else if (char === 'a') row.push(1);
          else if (char === 'b') row.push(2);
          else if (char === 'c') row.push(3);
          else row.push(0);
        }
        grid.push(row);
      }
      return grid;
    };

    // Initialize with first shape
    currentGridRef.current = parseShape(SHAPE_ORDER[0]);
    targetGridRef.current = parseShape(SHAPE_ORDER[0]);

    // Calculate cell delays for radial wave
    const calculateDelays = () => {
      const center = GRID_SIZE / 2;
      const delays: number[][] = [];
      for (let y = 0; y < GRID_SIZE; y++) {
        const row: number[] = [];
        for (let x = 0; x < GRID_SIZE; x++) {
          const dx = x - center;
          const dy = y - center;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.sqrt(center * center + center * center);
          const delay = (dist / maxDist) * 400 + Math.random() * 120;
          row.push(delay);
        }
        delays.push(row);
      }
      cellDelaysRef.current = delays;
    };
    calculateDelays();

    // Transition to next shape
    const transitionToShape = (shapeName: ShapeName) => {
      if (isTransitioningRef.current || prefersReducedMotion.current) {
        currentGridRef.current = parseShape(shapeName);
        targetGridRef.current = parseShape(shapeName);
        setCurrentShape(shapeName);
        return;
      }
      isTransitioningRef.current = true;
      transitionStartRef.current = performance.now();
      targetGridRef.current = parseShape(shapeName);
      setCurrentShape(shapeName);
    };

    // Auto-cycle shapes
    let shapeTimer: number;
    const cycleShapes = () => {
      shapeIndexRef.current = (shapeIndexRef.current + 1) % SHAPE_ORDER.length;
      transitionToShape(SHAPE_ORDER[shapeIndexRef.current]);
      shapeTimer = window.setTimeout(cycleShapes, 3000);
    };
    shapeTimer = window.setTimeout(cycleShapes, 3000);

    // Idle flicker
    const updateIdleFlicker = () => {
      if (prefersReducedMotion.current) return;
      const now = performance.now();
      flickerCellsRef.current = flickerCellsRef.current.filter(c => now - c.timer < 400);
      if (flickerCellsRef.current.length < 5) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        if (currentGridRef.current[y]?.[x] === 3) {
          flickerCellsRef.current.push({ x, y, timer: now });
        }
      }
    };

    // Pulse effect
    const updatePulse = () => {
      if (!pulseRef.current) return;
      const elapsed = performance.now() - pulseRef.current.time;
      if (elapsed > 600) {
        pulseRef.current = null;
      }
    };

    // Main render loop
    let animId: number;
    let isVisible = true;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const now = performance.now();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const containerWidth = container.clientWidth;
      const cellSize = Math.floor(containerWidth / GRID_SIZE);
      const canvasSize = cellSize * GRID_SIZE;

      canvas.width = canvasSize * dpr;
      canvas.height = canvasSize * dpr;
      canvas.style.width = `${canvasSize}px`;
      canvas.style.height = `${canvasSize}px`;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, canvasSize, canvasSize);

      // Update transition
      if (isTransitioningRef.current) {
        const elapsed = now - transitionStartRef.current;
        if (elapsed >= 900) {
          currentGridRef.current = targetGridRef.current;
          isTransitioningRef.current = false;
        }
      }

      updateIdleFlicker();
      updatePulse();

      // Draw cells
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          let tone = currentGridRef.current[y][x];

          // Transition animation
          if (isTransitioningRef.current) {
            const elapsed = now - transitionStartRef.current;
            const delay = cellDelaysRef.current[y][x];
            const cellElapsed = elapsed - delay;

            if (cellElapsed > 0 && cellElapsed < 300) {
              // Flickering during transition
              if (cellElapsed < 150) {
                tone = Math.floor(Math.random() * 4);
              } else {
                const targetTone = targetGridRef.current[y][x];
                const progress = (cellElapsed - 150) / 150;
                tone = progress > 0.5 ? targetTone : currentGridRef.current[y][x];
              }
            } else if (cellElapsed >= 300) {
              tone = targetGridRef.current[y][x];
            }
          }

          // Hover brightening
          if (mousePos) {
            const cellCenterX = x * cellSize + cellSize / 2;
            const cellCenterY = y * cellSize + cellSize / 2;
            const dx = cellCenterX - mousePos.x;
            const dy = cellCenterY - mousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90 && tone > 0) {
              tone = Math.min(tone + 1, 3);
            }
          }

          // Pulse effect
          if (pulseRef.current) {
            const elapsed = now - pulseRef.current.time;
            const cellCenterX = x * cellSize + cellSize / 2;
            const cellCenterY = y * cellSize + cellSize / 2;
            const dx = cellCenterX - pulseRef.current.x;
            const dy = cellCenterY - pulseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const pulseRadius = (elapsed / 600) * canvasSize;
            const pulseWidth = 40;
            if (Math.abs(dist - pulseRadius) < pulseWidth) {
              tone = 3; // lime
            }
          }

          // Idle flicker
          const isFlickering = flickerCellsRef.current.some(c => c.x === x && c.y === y);
          if (isFlickering && tone > 0) {
            tone = Math.random() > 0.5 ? 3 : 0;
          }

          const color = TONES[tone];
          const scale = tone === 0 ? 0 : 1;
          const size = (cellSize - GAP) * scale;
          const offset = (cellSize - size) / 2;

          ctx.fillStyle = color;
          ctx.fillRect(x * cellSize + offset, y * cellSize + offset, size, size);
        }
      }

      animId = requestAnimationFrame(render);
    };

    // Visibility handling
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(shapeTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer.disconnect();
    };
  }, [mousePos]);

  // Mouse handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pulseRef.current = { x, y, time: performance.now() };
    shapeIndexRef.current = (shapeIndexRef.current + 1) % SHAPE_ORDER.length;
    const nextShape = SHAPE_ORDER[shapeIndexRef.current];
    setCurrentShape(nextShape);
  };

  const handleDotClick = (index: number) => {
    shapeIndexRef.current = index;
    const shape = SHAPE_ORDER[index];
    setCurrentShape(shape);
  };

  // Icon highlighting based on current shape
  const getIconHighlight = (iconType: string): boolean => {
    const highlights: Record<string, ShapeName[]> = {
      globe: ['circle'],
      cloud: ['rounded-square'],
      arrows: ['ring'],
      monitor: ['square'],
      dots: ['hexagon'],
    };
    return highlights[iconType]?.includes(currentShape) ?? false;
  };

  return (
    <div ref={containerRef} className="relative">
      <canvas
        ref={canvasRef}
        className="rounded-xl border border-hairline cursor-pointer"
        style={{ imageRendering: 'pixelated', width: '100%' }}
        role="img"
        aria-label="Animated pixel art cycling through geometric shapes"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      {/* Floating icons */}
      <div className={`absolute -top-4 -left-4 w-10 h-10 rounded-[10px] border ${getIconHighlight('globe') ? 'border-lime' : 'border-hairline'} bg-surface flex items-center justify-center animate-drift transition-colors`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="var(--color-secondary)" strokeWidth="1.2"/><path d="M2 8h12M8 2c-2 2-2 10 0 12M8 2c2 2 2 10 0 12" stroke="var(--color-secondary)" strokeWidth="1.2"/></svg>
      </div>
      <div className={`absolute -top-4 -right-4 w-10 h-10 rounded-[10px] border ${getIconHighlight('cloud') ? 'border-lime' : 'border-hairline'} bg-surface flex items-center justify-center animate-drift-delay transition-colors`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 10c0-3 2-5 4-5s4 2 4 5" stroke="var(--color-lime)" strokeWidth="1.2" strokeLinecap="round"/><path d="M3 10h10" stroke="var(--color-lime)" strokeWidth="1.2" strokeLinecap="round"/></svg>
      </div>
      <div className={`absolute top-1/2 -left-6 -translate-y-1/2 w-10 h-10 rounded-[10px] border ${getIconHighlight('arrows') ? 'border-lime' : 'border-hairline'} bg-surface flex items-center justify-center animate-drift-delay-2 transition-colors`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M5 6l3-3 3 3M5 10l3 3 3-3" stroke="var(--color-secondary)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className={`absolute -bottom-4 -right-4 w-10 h-10 rounded-[10px] border ${getIconHighlight('monitor') ? 'border-lime' : 'border-hairline'} bg-surface flex items-center justify-center animate-drift transition-colors`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="8" rx="1" stroke="var(--color-secondary)" strokeWidth="1.2"/><path d="M5 14h6" stroke="var(--color-secondary)" strokeWidth="1.2" strokeLinecap="round"/></svg>
      </div>
      <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-[10px] border ${getIconHighlight('dots') ? 'border-lime' : 'border-hairline'} bg-surface flex items-center justify-center animate-drift-delay transition-colors`}>
        <div className="grid grid-cols-3 gap-0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-muted" />
          ))}
        </div>
      </div>

    </div>
  );
}
