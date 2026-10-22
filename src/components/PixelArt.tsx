import { useEffect, useRef } from 'react';

export type Palette = 'default' | 'blog' | 'terminal' | 'avatar';

function getPalettes(): Record<Palette, string[]> {
  const styles = getComputedStyle(document.documentElement);

  const bg =
    styles.getPropertyValue('--color-card').trim() ||
    styles.getPropertyValue('--color-page').trim() ||
    '#121212';
  const lime = styles.getPropertyValue('--color-lime').trim() || '#8FB800';
  const green = styles.getPropertyValue('--color-green').trim() || '#10b981';
  const blue = styles.getPropertyValue('--color-blue').trim() || '#3b82f6';
  const amber = styles.getPropertyValue('--color-amber').trim() || '#f59e0b';
  const muted = styles.getPropertyValue('--color-muted').trim() || '#27272a';

  return {
    default: [bg, muted, lime, '#658200', '#425500'],
    blog: [bg, '#1e293b', blue, '#1d4ed8', '#1e40af'],
    terminal: [bg, '#064e3b', green, '#047857', '#065f46'],
    avatar: [bg, lime, green, blue, amber],
  };
}

export type Shape =
  | 'blob'
  | 'wave'
  | 'silhouette'
  | 'terminal'
  | 'grid'
  | 'circles'
  | 'shield'
  | 'ghost'
  | 'heart'
  | 'invader'
  | 'sword';

interface PixelArtProps {
  seed?: number;
  palette?: Palette;
  cols?: number;
  rows?: number;
  cellSize?: number;
  shape?: Shape;
  symmetric?: boolean;
  className?: string;
  flicker?: boolean;
  circleCrop?: boolean;
}

// PRNG (Mulberry32)
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function PixelArt({
  seed = 1,
  palette = 'default',
  cols = 48,
  rows = 48,
  cellSize = 4,
  shape = 'silhouette',
  symmetric = true,
  className = '',
  flicker = true,
  circleCrop = false,
}: PixelArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI Canvas Scaling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = cols * cellSize;
    const displayHeight = rows * cellSize;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    const colors = getPalettes()[palette];
    const rand = mulberry32(seed);

    // Grid Initialization
    const grid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    const midX = Math.ceil(cols / 2);

    if (shape === 'silhouette') {
      const cx = cols / 2;
      for (let y = 0; y < rows; y++) {
        const limitX = symmetric ? midX : cols;
        for (let x = 0; x < limitX; x++) {
          const dx = Math.abs(x - cx + 0.5);
          
          // Head
          const headRadius = cols * 0.22;
          const isHead = (y - rows * 0.28) ** 2 + (dx * 1.08) ** 2 < headRadius ** 2;

          // Neck
          const isNeck = y >= rows * 0.44 && y <= rows * 0.56 && dx < cols * 0.09;

          // Torso & Shoulders
          const shoulderSlope = (y - rows * 0.56) * 1.35;
          const isShoulders = y > rows * 0.56 && y < rows * 0.9 && dx < cols * 0.09 + shoulderSlope;

          if (isHead || isNeck || isShoulders) {
            const colorIdx = 1 + Math.floor(rand() * (colors.length - 1));
            grid[y][x] = colorIdx;
            if (symmetric) grid[y][cols - 1 - x] = colorIdx;
          }
        }
      }
    } else if (shape === 'shield') {
      const cx = cols / 2;
      for (let y = 0; y < rows; y++) {
        const limitX = symmetric ? midX : cols;
        for (let x = 0; x < limitX; x++) {
          const dx = Math.abs(x - cx + 0.5);
          
          let widthAtY = cols * 0.38;
          if (y < rows * 0.2) {
            widthAtY = cols * 0.38 * (0.85 + (y / (rows * 0.2)) * 0.15);
          } else if (y > rows * 0.5) {
            const progress = (y - rows * 0.5) / (rows * 0.4);
            widthAtY = cols * 0.38 * Math.cos(progress * (Math.PI / 2));
          }

          if (y >= rows * 0.12 && y <= rows * 0.88 && dx <= widthAtY) {
            const isBorder = dx >= widthAtY - 2.5 || y <= rows * 0.16 || y >= rows * 0.84;
            const colorIdx = isBorder ? 2 : 1 + Math.floor(rand() * (colors.length - 1));
            grid[y][x] = colorIdx;
            if (symmetric) grid[y][cols - 1 - x] = colorIdx;
          }
        }
      }
    } else if (shape === 'ghost') {
      const cx = cols / 2;
      for (let y = 0; y < rows; y++) {
        const limitX = symmetric ? midX : cols;
        for (let x = 0; x < limitX; x++) {
          const dx = Math.abs(x - cx + 0.5);
          const isDome = y < rows * 0.45 && (y - rows * 0.45) ** 2 + dx ** 2 < (cols * 0.36) ** 2;
          const isBody = y >= rows * 0.45 && y < rows * 0.76 && dx < cols * 0.36;
          
          // Wavy skirt bottom
          const skirtWave = Math.sin((x / cols) * Math.PI * 8) * 2;
          const isSkirt = y >= rows * 0.76 && y < rows * 0.84 + skirtWave && dx < cols * 0.36;

          if (isDome || isBody || isSkirt) {
            // Detailed Eyes
            const isEye = y > rows * 0.36 && y < rows * 0.48 && dx > cols * 0.1 && dx < cols * 0.22;
            const isPupil = y > rows * 0.4 && y < rows * 0.46 && dx > cols * 0.12 && dx < cols * 0.18;

            if (isPupil) {
              grid[y][x] = 0;
              if (symmetric) grid[y][cols - 1 - x] = 0;
            } else if (!isEye) {
              const colorIdx = 1 + Math.floor(rand() * (colors.length - 1));
              grid[y][x] = colorIdx;
              if (symmetric) grid[y][cols - 1 - x] = colorIdx;
            }
          }
        }
      }
    } else if (shape === 'heart') {
      const cx = cols / 2;
      for (let y = 0; y < rows; y++) {
        const limitX = symmetric ? midX : cols;
        for (let x = 0; x < limitX; x++) {
          const nx = (x - cx) / (cols * 0.38);
          const ny = (y - rows * 0.46) / (rows * 0.38);
          const isHeart = (nx ** 2 + ny ** 2 - 1) ** 3 - nx ** 2 * ny ** 3 <= 0;

          if (isHeart) {
            const colorIdx = 1 + Math.floor(rand() * (colors.length - 1));
            grid[y][x] = colorIdx;
            if (symmetric) grid[y][cols - 1 - x] = colorIdx;
          }
        }
      }
    } else if (shape === 'invader') {
      for (let y = 6; y < rows - 6; y++) {
        for (let x = 0; x < midX; x++) {
          const distFromCenter = midX - x;
          const density = Math.sin((y / rows) * Math.PI) * 0.75 + (distFromCenter / midX) * 0.25;
          if (rand() < density) {
            const colorIdx = 1 + Math.floor(rand() * (colors.length - 1));
            grid[y][x] = colorIdx;
            grid[y][cols - 1 - x] = colorIdx;
          }
        }
      }
    } else if (shape === 'blob') {
      const cx = cols / 2;
      const cy = rows / 2;
      const rMax = Math.min(cols, rows) * 0.42;

      for (let y = 0; y < rows; y++) {
        const limitX = symmetric ? midX : cols;
        for (let x = 0; x < limitX; x++) {
          const dx = x - cx + 0.5;
          const dy = y - cy + 0.5;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const noise = (rand() - 0.5) * 3.5;

          if (dist + noise < rMax) {
            const colorIdx = 1 + Math.floor(rand() * (colors.length - 1));
            grid[y][x] = colorIdx;
            if (symmetric) grid[y][cols - 1 - x] = colorIdx;
          }
        }
      }
    } else if (shape === 'grid') {
      for (let y = 0; y < rows; y++) {
        const limitX = symmetric ? midX : cols;
        for (let x = 0; x < limitX; x++) {
          if ((x % 3 === 0 && y % 3 === 0) || (x + y) % 7 === 0) {
            if (rand() > 0.3) {
              const val = 1 + Math.floor(rand() * (colors.length - 1));
              grid[y][x] = val;
              if (symmetric) grid[y][cols - 1 - x] = val;
            }
          }
        }
      }
    } else {
      // Default geometric structure
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (rand() > 0.65) {
            grid[y][x] = 1 + Math.floor(rand() * (colors.length - 1));
          }
        }
      }
    }

    // Flicker cells
    const flickerCells: { x: number; y: number }[] = [];
    if (flicker) {
      for (let i = 0; i < 8; i++) {
        const x = Math.floor(rand() * cols);
        const y = Math.floor(rand() * rows);
        if (grid[y][x] > 0) flickerCells.push({ x, y });
      }
    }

    let frame = 0;
    const draw = () => {
      if (!visibleRef.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const val = grid[y][x];
          let color = val === 0 ? colors[0] : colors[val % colors.length];

          const isFlicker = flickerCells.some((c) => c.x === x && c.y === y);
          if (isFlicker && frame % 90 < 15) {
            color = colors[2] || colors[0];
          }

          ctx.fillStyle = color;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }

      frame++;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    observerRef.current.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      observerRef.current?.disconnect();
    };
  }, [seed, palette, cols, rows, cellSize, shape, symmetric, flicker]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        imageRendering: 'pixelated',
        ...(circleCrop ? { borderRadius: '50%' } : {}),
      }}
    />
  );
}