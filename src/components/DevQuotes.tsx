import { FadeUp, PixelAvatar } from './shared';
import { DEV_QUOTES } from '../lib/content';

export default function DevQuotes() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-[120px]">
      <FadeUp>
        <p className="font-mono text-[11px] text-muted tracking-wider uppercase mb-8">What developers say</p>
      </FadeUp>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEV_QUOTES.map((q, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="border border-hairline rounded-xl p-5 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <PixelAvatar seed={i * 13 + 5} size={36} />
                <div>
                  <p className="text-[12px] text-text font-medium">{q.name}</p>
                  <p className="text-[11px] text-muted font-mono">{q.handle}</p>
                </div>
              </div>
              <p className="text-[13px] text-secondary leading-relaxed flex-1">{q.quote}</p>
              <p className="font-mono text-[9px] text-muted mt-3 tracking-wider">SAMPLE</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
