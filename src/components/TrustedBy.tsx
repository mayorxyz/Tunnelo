import { FadeUp } from './shared';
import { TRUSTED_BY } from '../lib/content';

export default function TrustedBy() {
  return (
    <FadeUp className="max-w-[1120px] mx-auto px-6 pb-[120px]">
      <p className="text-center font-mono text-[11px] text-muted mb-8 tracking-wider uppercase">Trusted by the dev teams at</p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {TRUSTED_BY.map((name, i) => (
          <span key={i} className="text-[15px] font-semibold text-muted/50 tracking-wide">
            {name === '◼' ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" fill="#737373" opacity="0.4" /></svg>
            ) : name}
          </span>
        ))}
      </div>
    </FadeUp>
  );
}
