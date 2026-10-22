import { FadeUp } from './shared';
import { EXTRA_CARDS } from '../lib/content';

const icons = [
  // TCP - plug icon
  <svg key="tcp" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="8" y="4" width="8" height="6" rx="1" stroke="#C6F432" strokeWidth="1.2"/><path d="M10 10v4M14 10v4M8 14h8v4H8z" stroke="#C6F432" strokeWidth="1.2"/></svg>,
  // Device - phone icon
  <svg key="device" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="7" y="3" width="10" height="18" rx="2" stroke="#C6F432" strokeWidth="1.2"/><circle cx="12" cy="18" r="1" fill="#C6F432"/></svg>,
  // MCP - brain/network icon
  <svg key="mcp" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#C6F432" strokeWidth="1.2"/><circle cx="5" cy="6" r="2" stroke="#C6F432" strokeWidth="1.2"/><circle cx="19" cy="6" r="2" stroke="#C6F432" strokeWidth="1.2"/><circle cx="5" cy="18" r="2" stroke="#C6F432" strokeWidth="1.2"/><circle cx="19" cy="18" r="2" stroke="#C6F432" strokeWidth="1.2"/><path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" stroke="#C6F432" strokeWidth="1"/></svg>,
];

export default function ExtraCards() {
  return (
    <section className="max-w-[1120px] mx-auto px-6 py-[120px]">
      <FadeUp>
        <h2 className="text-[28px] md:text-[32px] font-medium mb-10">Not just Public URLs</h2>
      </FadeUp>
      <div className="grid md:grid-cols-3 gap-4">
        {EXTRA_CARDS.map((card, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="border border-hairline rounded-xl p-6 h-full flex flex-col">
              <div className="bg-page border border-hairline rounded-lg h-28 flex items-center justify-center mb-4">
                {icons[i]}
              </div>
              <p className="font-mono text-[12px] text-lime tracking-wider mb-2">{card.title}</p>
              <p className="text-[13px] text-secondary leading-relaxed">{card.text}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
