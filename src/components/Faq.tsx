import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp } from './shared';
import { FAQ_ITEMS } from '../lib/content';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-[1120px] mx-auto px-6 py-[120px]">
      <div className="flex flex-col lg:flex-row gap-12">
        <FadeUp className="lg:w-1/3 shrink-0">
          <h2 className="text-[28px] md:text-[32px] font-medium">Frequently asked questions</h2>
        </FadeUp>
        <FadeUp delay={0.1} className="flex-1">
          <div className="divide-y divide-hairline border-t border-hairline">
            {FAQ_ITEMS.map((item, i) => (
              <FaqRow
                key={i}
                question={item.q}
                answer={item.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function FaqRow({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left group"
        aria-expanded={open}
      >
        <span className="text-[14px] text-text pr-4 group-hover:text-lime transition-colors">{question}</span>
        <span className={`text-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-[13px] text-secondary leading-relaxed pb-4 max-w-[560px]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
