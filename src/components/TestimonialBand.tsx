import { FadeUp, PixelAvatar } from './shared';
import { TESTIMONIAL_BAND } from '../lib/content';

export default function TestimonialBand() {
  const { quote, highlight, name, title } = TESTIMONIAL_BAND;
  const parts = quote.split(highlight);

  return (
    <FadeUp className="max-w-[1120px] mx-auto px-6 pb-[120px]">
      <div className="border border-hairline rounded-xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="flex-1">
          <p className="text-[18px] leading-relaxed text-text">
            {parts[0]}
            <span className="bg-lime text-page px-1 rounded">{highlight}</span>
            {parts[1]}
          </p>
        </div>
        <div className="flex items-start gap-4 shrink-0">
          <div className="text-right">
            <p className="text-sm font-medium text-text">{name}</p>
            <p className="text-[12px] text-muted">{title}</p>
            <p className="font-mono text-[10px] text-muted mt-2 tracking-wider">SAMPLE TESTIMONIAL</p>
          </div>
          <div className="relative">
            <PixelAvatar seed={42} size={48} />
            <svg className="absolute -top-2 -right-2" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6c0-2 1.5-3 3-3v2c-1 0-1 .5-1 1H8v4H4V6zm6 0c0-2 1.5-3 3-3v2c-1 0-1 .5-1 1h2v4h-4V6z" fill="#737373" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
