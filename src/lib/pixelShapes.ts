import { createElement, useEffect, useRef } from 'react';

export type Palette = 'default' | 'blog' | 'terminal' | 'avatar';

function getPalettes(): Record<Palette, string[]> {
  const styles = getComputedStyle(document.documentElement);
  const page = styles.getPropertyValue('--color-page').trim() || '#0c0c0c';
  const raised = styles.getPropertyValue('--color-raised').trim() || '#1b1b1b';
  const lime = styles.getPropertyValue('--color-lime').trim() || '#C6F432';
  const green = styles.getPropertyValue('--color-green').trim() || '#3ddc84';
  const blue = styles.getPropertyValue('--color-blue').trim() || '#4c8dff';
  const amber = styles.getPropertyValue('--color-amber').trim() || '#ffb020';

  return {
    // Index 0: bg, 1: dark green ('a'), 2: lime ('c'), 3: olive ('b')
    default: [page, '#1a3a1a', lime, '#4a6a20'],
    blog: [page, '#1b2a3a', blue, '#2a4a6a'],
    terminal: [page, '#1a2a1a', green, '#2a4a2a'],
    avatar: [raised, lime, green, blue],
  };
}

export const SHAPES = {
  square: [
    '........................',
    '........................',
    '........................',
    '...aaaaaaaaaaaaaaaaaa...',
    '...abbbbbbbbbbbbbbbba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abbbbbbbbbbbbbbbba...',
    '...aaaaaaaaaaaaaaaaaa...',
    '........................',
    '........................',
    '........................',
  ],
  'rounded-square': [
    '........................',
    '........................',
    '......aaaaaaaaaaaa......',
    '....aabbbbbbbbbbbbaa....',
    '...abbccccccccccccbba...',
    '...abccccccccccccccba...',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '...abccccccccccccccba...',
    '...abbccccccccccccbba...',
    '....aabbbbbbbbbbbbaa....',
    '......aaaaaaaaaaaa......',
    '........................',
    '........................',
  ],
  diamond: [
    '........................',
    '........................',
    '...........aa...........',
    '..........abba..........',
    '.........abccba.........',
    '........abccccba........',
    '.......abccccccba.......',
    '......abccccccccba......',
    '.....abccccccccccba.....',
    '....abccccccccccccba....',
    '...abccccccccccccccba...',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '...abccccccccccccccba...',
    '....abccccccccccccba....',
    '.....abccccccccccba.....',
    '......abccccccccba......',
    '.......abccccccba.......',
    '........abccccba........',
    '.........abccba.........',
    '..........abba..........',
    '...........aa...........',
    '........................',
    '........................',
  ],
  triangle: [
    '........................',
    '........................',
    '........................',
    '........................',
    '...........aa...........',
    '..........aba...........',
    '..........acba..........',
    '.........abccba.........',
    '.........acccca.........',
    '........abccccba........',
    '.......abcccccca........',
    '.......acccccccba.......',
    '......abccccccccba......',
    '......acccccccccca......',
    '.....abccccccccccba.....',
    '....abcccccccccccca.....',
    '....acccccccccccccba....',
    '...abccccccccccccccba...',
    '...acccccccccccccccca...',
    '..aaaaaaaaaaaaaaaaaaaa..',
    '........................',
    '........................',
    '........................',
    '........................',
  ],
  hexagon: [
    '........................',
    '........................',
    '........................',
    '.......aaaaaaaaaa.......',
    '......abbbbbbbbbba......',
    '.....abccccccccccba.....',
    '.....abccccccccccba.....',
    '....abccccccccccccba....',
    '....abccccccccccccba....',
    '...abccccccccccccccba...',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '...abccccccccccccccba...',
    '....abccccccccccccba....',
    '....abccccccccccccba....',
    '.....abccccccccccba.....',
    '.....abccccccccccba.....',
    '......abbbbbbbbbba......',
    '.......aaaaaaaaaa.......',
    '........................',
    '........................',
    '........................',
  ],
  plus: [
    '........................',
    '........................',
    '........aaaaaaaa........',
    '........abbbbbba........',
    '........abccccba........',
    '........abccccba........',
    '........abccccba........',
    '........abccccba........',
    '..aaaaaabccccccbaaaaaa..',
    '..abbbbbccccccccbbbbba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abbbbbccccccccbbbbba..',
    '..aaaaaabccccccbaaaaaa..',
    '........abccccba........',
    '........abccccba........',
    '........abccccba........',
    '........abccccba........',
    '........abbbbbba........',
    '........aaaaaaaa........',
    '........................',
    '........................',
  ],
  ring: [
    '........................',
    '........................',
    '........................',
    '........aaaaaaaa........',
    '......aabbbbbbbbaa......',
    '.....abbccccccccbba.....',
    '....abcccbbbbbbcccba....',
    '....abccbaaaaaabccba....',
    '...abccba......abccba...',
    '...abcba........abcba...',
    '...abcba........abcba...',
    '...abcba........abcba...',
    '...abcba........abcba...',
    '...abcba........abcba...',
    '...abcba........abcba...',
    '...abccba......abccba...',
    '....abccbaaaaaabccba....',
    '....abcccbbbbbbcccba....',
    '.....abbccccccccbba.....',
    '......aabbbbbbbbaa......',
    '........aaaaaaaa........',
    '........................',
    '........................',
    '........................',
  ],
  heart: [
    '........................',
    '.....aaaa......aaaa.....',
    '...aabbbbaa..aabbbbaa...',
    '..abbccccbbaabbccccbba..',
    '..abcccccccbbcccccccba..',
    '.abccccccccccccccccccba.',
    '.abccccccccccccccccccba.',
    '.abccccccccccccccccccba.',
    '.abccccccccccccccccccba.',
    '.abccccccccccccccccccba.',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '..abccccccccccccccccba..',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '....abccccccccccccba....',
    '.....abccccccccccba.....',
    '......abccccccccba......',
    '.......abbccccbba.......',
    '........aabccbaa........',
    '..........abba..........',
    '...........aa...........',
    '........................',
    '........................',
  ],
  star: [
    '........................',
    '........................',
    '........................',
    '...........aa...........',
    '...........aa...........',
    '..........abba..........',
    '..........acca..........',
    '.........abccba.........',
    '.........acccca.........',
    '.aaaaaaaabccccbaaaaaaaa.',
    '..abccccccccccccccccba..',
    '...aabccccccccccccbaa...',
    '.....abccccccccccba.....',
    '......abccccccccba......',
    '.......acccccccca.......',
    '.......acccccccca.......',
    '.......acccccccca.......',
    '......abccccccccba......',
    '......accbaaaabcca......',
    '......abaa....aaba......',
    '......aa........aa......',
    '.....aa..........aa.....',
    '........................',
    '........................',
  ],
  circle: [
    '........................',
    '........................',
    '.........aaaaaa.........',
    '.......aabbbbbbaa.......',
    '......abbccccccbba......',
    '.....abbccccccccbba.....',
    '....abbccccccccccbba....',
    '....abccccccccccccba....',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '...abccccccccccccccba...',
    '....abccccccccccccba....',
    '....abbccccccccccbba....',
    '.....abbccccccccbba.....',
    '......abbccccccbba......',
    '.......aabbbbbbaa.......',
    '.........aaaaaa.........',
    '........................',
    '........................',
    '........................',
  ],
};

export const SHAPE_ORDER = [
  'square',
  'rounded-square',
  'diamond',
  'triangle',
  'hexagon',
  'plus',
  'ring',
  'heart',
  'star',
  'circle',
] as const;

export type ShapeName = typeof SHAPE_ORDER[number];

export const SHAPE_LABELS: Record<ShapeName, string> = {
  square: 'square',
  'rounded-square': 'rounded square',
  diamond: 'diamond',
  triangle: 'triangle',
  hexagon: 'hexagon',
  plus: 'plus',
  ring: 'ring',
  heart: 'heart',
  star: 'star',
  circle: 'circle',
};

export type Shape = ShapeName | 'blob' | 'wave' | 'landscape';

interface PixelArtProps {
  seed?: number;
  palette?: Palette;
  cols?: number;
  rows?: number;
  cellSize?: number;
  shape?: Shape;
  className?: string;
  flicker?: boolean;
  circleCrop?: boolean;
}

// Deterministic pseudo-random
function mulberry32(a: number) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export default function PixelArt({
  seed = 1,
  palette = 'default',
  cols = 24,       // Native 24x24 grid for perfect bitmap mapping
  rows = 24,
  cellSize = 4,    // 4px cells = 96x96px total, highly accurate and crisp
  shape = 'square',
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

    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    const colors = getPalettes()[palette];
    const rand = mulberry32(seed);

    // Build grid (0 = background)
    const grid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

    // 1. Parse 24x24 bitmap shapes with robust, gapless scaling
    if (shape in SHAPES) {
      const bitmap = SHAPES[shape as ShapeName];
      const scaleX = cols / 24;
      const scaleY = rows / 24;

      for (let y = 0; y < 24; y++) {
        for (let x = 0; x < 24; x++) {
          const char = bitmap[y][x];
          if (char !== '.') {
            // Map: 'a' = 1 (dark green), 'b' = 3 (olive), 'c' = 2 (lime)
            const colorIdx = char === 'a' ? 1 : char === 'b' ? 3 : 2;
            
            // Calculate scaled bounds to prevent sub-pixel gaps
            const startX = Math.floor(x * scaleX);
            const startY = Math.floor(y * scaleY);
            const endX = Math.floor((x + 1) * scaleX);
            const endY = Math.floor((y + 1) * scaleY);

            for (let dy = startY; dy < endY; dy++) {
              for (let dx = startX; dx < endX; dx++) {
                if (dy < rows && dx < cols) {
                  grid[dy][dx] = colorIdx;
                }
              }
            }
          }
        }
      }
    } 
    // 2. Fallback procedural shapes
    else if (shape === 'blob') {
      const cx = cols / 2;
      const cy = rows / 2;
      const r = Math.min(cols, rows) * 0.4;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dx = (x - cx) / r;
          const dy = (y - cy) / r;
          const noise = rand() * 0.4 - 0.2;
          if (dx * dx + dy * dy + noise < 1) {
            grid[y][x] = 1 + Math.floor(rand() * (colors.length - 1));
          }
        }
      }
    } 
    else if (shape === 'wave') {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const wave = Math.sin((x / cols) * Math.PI * 2 + seed) * 0.3 + 0.5;
          const ny = y / rows;
          if (Math.abs(ny - wave) < 0.15) {
            grid[y][x] = 1 + Math.floor(rand() * (colors.length - 1));
          }
        }
      }
    } 
    else if (shape === 'landscape') {
      let height = rows * 0.4;
      for (let x = 0; x < cols; x++) {
        height += (rand() - 0.45) * 1.5; 
        height = Math.max(rows * 0.2, Math.min(rows * 0.75, height));
        for (let y = Math.floor(height); y < rows; y++) {
          if (y < rows * 0.5) grid[y][x] = 1;
          else if (y < rows * 0.7) grid[y][x] = 2;
          else grid[y][x] = 3;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const val = grid[y][x];
          let color: string;
          
          if (val === 0) {
            color = colors[0];
          } else {
            color = colors[val % colors.length];
          }
          
          const isFlicker = flickerCells.some(c => c.x === x && c.y === y);
          if (isFlicker && frame % 80 < 12) {
            color = frame % 160 < 80 ? colors[2] : colors[0];
          }
          
          ctx.fillStyle = color;
          // Solid pixels (no gap) for maximum geometric/bitmap accuracy
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
  }, [seed, palette, cols, rows, cellSize, shape, flicker]);

  return createElement('canvas', {
    ref: canvasRef,
    className,
    style: {
      imageRendering: 'pixelated',
      ...(circleCrop ? { borderRadius: '50%' } : {}),
    },
  });
}