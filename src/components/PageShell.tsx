import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  h1Ref?: React.RefObject<HTMLHeadingElement>;
}

export default function PageShell({ eyebrow, title, description, children, h1Ref }: PageShellProps) {
  const internalRef = useRef<HTMLHeadingElement>(null);
  const ref = h1Ref || internalRef;

  useEffect(() => {
    // Move focus to H1 for accessibility
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.setAttribute('tabindex', '-1');
        ref.current.focus({ preventScroll: true });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [ref]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="max-w-[1120px] mx-auto px-6 pt-16 pb-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <li><a href="/" className="hover:text-secondary transition-colors">Home</a></li>
            {eyebrow && (
              <>
                <li aria-hidden="true">/</li>
                <li className="text-secondary">{eyebrow}</li>
              </>
            )}
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-12">
          {eyebrow && (
            <p className="font-mono text-[11px] text-lime tracking-wider uppercase mb-3">{eyebrow}</p>
          )}
          <h1
            ref={ref}
            className="font-mono text-[32px] md:text-[40px] lg:text-[48px] font-medium leading-tight mb-4 outline-none"
          >
            {title}
          </h1>
          {description && (
            <p className="text-[14px] text-[#8a8a8a] max-w-[640px] leading-relaxed">{description}</p>
          )}
        </header>
      </div>

      {/* Body */}
      <div>{children}</div>
    </motion.div>
  );
}
