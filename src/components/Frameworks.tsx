import { FadeUp } from './shared';
import { FRAMEWORKS } from '../lib/content';

export default function Frameworks() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-[120px]">
      <FadeUp>
        <p className="text-center text-[14px] text-secondary mb-10 max-w-[600px] mx-auto">
          Although Tunnelo is framework agnostic, it's been fully tested with:
        </p>
      </FadeUp>
      <FadeUp delay={0.08}>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {FRAMEWORKS.map((fw, i) => (
            <span key={i} className="text-[15px] font-medium text-muted/60 hover:text-muted transition-colors">
              {fw === '⬡' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polygon points="12,2 22,8 22,16 12,22 2,16 2,8" stroke="#737373" strokeWidth="1.2" opacity="0.5" fill="none"/></svg>
              ) : fw}
            </span>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
