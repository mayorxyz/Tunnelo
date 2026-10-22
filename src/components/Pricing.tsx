import { useState } from 'react';
import { FadeUp, CheckIcon, Modal } from './shared';
import { PRICING_PLANS } from '../lib/content';

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);

  return (
    <section id="pricing" className="max-w-[1120px] mx-auto px-6 py-[120px]">
      <FadeUp>
        <h2 className="text-[24px] md:text-[28px] font-medium mb-3">Works for developers, SaaS owners and agencies</h2>
        <p className="text-[14px] text-secondary max-w-[560px] mb-8">
          Start any paid plan with a 14-day free trial, no credit card required. VAT may apply. Have questions?{' '}
          <a href="/contact" className="text-lime hover:underline">Contact us</a>.
        </p>
      </FadeUp>

      <FadeUp delay={0.08}>
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setYearly(false)}
            className={`text-[13px] px-3 py-1.5 rounded-md transition-colors ${!yearly ? 'bg-raised text-text' : 'text-muted'}`}
          >
            Pay monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`text-[13px] px-3 py-1.5 rounded-md transition-colors inline-flex items-center gap-2 ${yearly ? 'bg-raised text-text' : 'text-muted'}`}
          >
            Pay yearly
            <span className="bg-lime text-page text-[10px] font-semibold px-1.5 py-0.5 rounded">Save up to 20%</span>
          </button>
        </div>
      </FadeUp>

      <FadeUp delay={0.16}>
        <div className="border border-hairline rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {PRICING_PLANS.map((plan, i) => (
              <div key={i} className={`p-6 flex flex-col min-h-0 ${i < 3 ? 'lg:border-r border-hairline' : ''} ${i > 0 ? 'md:border-t lg:border-t-0 border-hairline' : ''} ${plan.popular ? 'border-lime border-2 relative' : ''}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-6 bg-lime text-page text-[10px] font-semibold px-2 py-0.5 rounded-full">Most Popular</span>
                )}
                <p className="text-[16px] font-semibold text-text mb-1">{plan.name}</p>
                <p className="text-[24px] font-bold text-text mb-1">
                  ${yearly ? plan.price.yearly : plan.price.monthly}
                  {plan.price.monthly > 0 && <span className="text-[13px] font-normal text-muted"> /month</span>}
                </p>
                <p className="text-[12px] text-muted mb-4">{plan.desc}</p>
                <button
                  onClick={() => setCheckoutModal(true)}
                  className={`w-full text-[13px] font-semibold py-2.5 rounded-md mb-5 transition-colors ${
                    plan.outline
                      ? 'border border-[rgba(255,255,255,0.16)] text-text hover:bg-white/5'
                      : 'bg-lime text-page hover:opacity-90'
                  }`}
                >
                  {plan.cta}
                </button>
                <div className="space-y-2.5 flex-1">
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-start gap-2 min-w-0">
                      <CheckIcon />
                      <span className="text-[12px] text-secondary leading-snug break-words whitespace-normal min-w-0">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Lifetime bar */}
      <FadeUp delay={0.24}>
        <div className="mt-6 border border-hairline rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="bg-lime text-page text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5">Limited Offer</span>
            <div>
              <p className="text-[14px] text-text font-medium">Tunnelo Lifetime License</p>
              <p className="text-[11px] text-muted mt-1">No subscription. Pay once, license never expires. 3 devices, 3 Public URLs, 3 custom domains, 1 year of app updates included.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[20px] font-bold text-text">$99 <span className="text-[12px] font-normal text-muted">once</span></span>
            <button onClick={() => setCheckoutModal(true)} className="bg-lime text-page text-[13px] font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Buy License
            </button>
          </div>
        </div>
      </FadeUp>

      <Modal open={checkoutModal} onClose={() => setCheckoutModal(false)}>
        <p className="text-sm text-secondary">Checkout is disabled in this demo.</p>
      </Modal>
    </section>
  );
}
