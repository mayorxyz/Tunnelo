import { useState } from 'react';
import PageShell from '../components/PageShell';
import { FadeUp } from '../components/shared';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'General', message: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    if (!consent) errs.consent = 'Consent is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <>
      <PageShell
        eyebrow="Contact"
        title="Contact us"
        description="Have questions? Reach out and we'll get back to you within one business day."
      />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <FadeUp>
            <div className="border border-hairline rounded-xl p-6 bg-surface">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-lime/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#C6F432" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className="text-[16px] font-semibold text-white mb-2">Message received</p>
                  <p className="text-[13px] text-[#8a8a8a]">We reply within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[12px] text-[#8a8a8a] block mb-1">Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-page border border-hairline rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-muted focus:outline-none focus:border-lime/40"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-[11px] text-red mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-[12px] text-[#8a8a8a] block mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-page border border-hairline rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-muted focus:outline-none focus:border-lime/40"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-[11px] text-red mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-[12px] text-[#8a8a8a] block mb-1">Topic</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full bg-page border border-hairline rounded-lg px-3 py-2.5 text-[13px] text-white focus:outline-none focus:border-lime/40"
                    >
                      <option>General</option>
                      <option>Support</option>
                      <option>Sales</option>
                      <option>Billing</option>
                      <option>Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] text-[#8a8a8a] block mb-1">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className="w-full bg-page border border-hairline rounded-lg px-3 py-2.5 text-[13px] text-white placeholder:text-muted focus:outline-none focus:border-lime/40 resize-none"
                      placeholder="How can we help?"
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message && <p className="text-[11px] text-red">{errors.message}</p>}
                      <p className="text-[10px] text-muted ml-auto">{form.message.length} / 2000</p>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 accent-lime"
                      />
                      <span className="text-[11px] text-[#8a8a8a]">I agree to the <a href="/privacy" className="text-lime hover:underline">Privacy Policy</a> and consent to being contacted.</span>
                    </label>
                    {errors.consent && <p className="text-[11px] text-red mt-1">{errors.consent}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-lime text-page text-[13px] font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity"
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>
          </FadeUp>

          {/* Right column */}
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              {/* Email cards */}
              <div className="border border-hairline rounded-xl p-5 bg-surface">
                <p className="font-mono text-[12px] text-lime mb-3">EMAIL US</p>
                <div className="space-y-3">
                  <a href="mailto:support@tunnelo.dev" className="flex items-center justify-between py-1 group">
                    <span className="text-[13px] text-white">Support</span>
                    <span className="text-[12px] text-[#8a8a8a] group-hover:text-lime transition-colors">support@tunnelo.dev →</span>
                  </a>
                  <a href="mailto:sales@tunnelo.dev" className="flex items-center justify-between py-1 group">
                    <span className="text-[13px] text-white">Sales</span>
                    <span className="text-[12px] text-[#8a8a8a] group-hover:text-lime transition-colors">sales@tunnelo.dev →</span>
                  </a>
                  <a href="mailto:security@tunnelo.dev" className="flex items-center justify-between py-1 group">
                    <span className="text-[13px] text-white">Security</span>
                    <span className="text-[12px] text-[#8a8a8a] group-hover:text-lime transition-colors">security@tunnelo.dev →</span>
                  </a>
                </div>
              </div>

              {/* Response time */}
              <div className="border border-hairline rounded-xl p-5 bg-surface">
                <p className="text-[13px] text-white font-medium mb-2">Response time</p>
                <p className="text-[12px] text-[#8a8a8a]">We reply within one business day. Paid plans get priority support (24h for Pro, 48h for Solo).</p>
              </div>

              {/* FAQ preview */}
              <div className="border border-hairline rounded-xl p-5 bg-surface">
                <p className="font-mono text-[12px] text-lime mb-3">QUICK ANSWERS</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-[12px] text-white font-medium mb-1">How do I cancel?</p>
                    <p className="text-[11px] text-[#8a8a8a]">From your account settings. No questions asked.</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-white font-medium mb-1">Can I get an invoice?</p>
                    <p className="text-[11px] text-[#8a8a8a]">Yes. Add your company details in Billing settings.</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-white font-medium mb-1">Do you offer discounts?</p>
                    <p className="text-[11px] text-[#8a8a8a]">Contact sales for annual and team volume discounts.</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-md border border-hairline flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="X">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 2h2l-4 5 4.5 7H10l-3.5-5L3 14H1l4.5-5.5L1 2h3.5L7.5 7 11 2z" fill="currentColor"/></svg>
                </button>
                <button className="w-8 h-8 rounded-md border border-hairline flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="GitHub">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1C3.7 1 1 3.7 1 7c0 2.6 1.7 4.9 4 5.7.3.1.4-.1.4-.3v-1c-1.6.3-2-.8-2-.8-.3-.7-.6-.9-.6-.9-.5-.3 0-.3 0-.3.6 0 .9.6.9.6.5.9 1.4.6 1.7.5.1-.4.2-.6.4-.8-1.3-.1-2.6-.6-2.6-2.9 0-.6.2-1.1.6-1.5-.1-.2-.3-.7.1-1.5 0 0 .5-.2 1.5.6.4-.1.9-.2 1.4-.2s1 .1 1.4.2c1-.8 1.5-.6 1.5-.6.3.8.1 1.3.1 1.5.4.4.6.9.6 1.5 0 2.3-1.4 2.8-2.6 2.9.2.2.4.5.4 1.1v1.6c0 .2.1.4.4.3C11.3 11.9 13 9.6 13 7c0-3.3-2.7-6-6-6z" fill="currentColor"/></svg>
                </button>
                <button className="w-8 h-8 rounded-md border border-hairline flex items-center justify-center text-muted hover:text-white transition-colors" aria-label="M">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h2l2 5 2-5h2l2 5 2-5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </>
  );
}
