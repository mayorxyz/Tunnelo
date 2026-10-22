import { Link } from 'react-router-dom';
import { FadeUp } from './shared';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden w-full flex items-center justify-center">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-[120px] text-center relative z-10 flex flex-col items-center justify-center w-full">
        <FadeUp>
          <h2 className="font-mono text-[24px] sm:text-[28px] md:text-[36px] font-medium mb-3 leading-tight text-foreground">
            Twelve seats. One bill.
          </h2>
          <p className="text-[13px] sm:text-[14px] text-muted-foreground mb-8 max-w-md mx-auto">
            Flat per-seat pricing, no surprises, set up in a minute.
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/download"
              className="w-full sm:w-auto bg-primary text-primary-foreground text-[13px] font-semibold px-[18px] py-[10px] rounded-md hover:opacity-90 transition-opacity text-center"
            >
              Start Free Trial ↗
            </Link>
            <Link
              to="/download"
              className="w-full sm:w-auto border border-border text-foreground text-[13px] font-semibold px-[18px] py-[10px] rounded-md hover:bg-accent transition-colors text-center"
            >
              Download
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="text-[11px] text-muted-foreground">Free 14-day trial included. No credit card required.</p>
        </FadeUp>
      </div>

      {/* Grid pattern adapted for both dark/light modes */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
    </section>
  );
}