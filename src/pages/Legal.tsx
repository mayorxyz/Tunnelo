import type { ReactNode } from 'react';
import PageShell from '../components/PageShell';
import { FadeUp } from '../components/shared';

interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export default function LegalPage({ eyebrow, title, description, lastUpdated, sections }: LegalPageProps) {
  return (
    <>
      <PageShell eyebrow={eyebrow} title={title} description={description} />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        <div className="flex gap-8">
          {/* TOC */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-20">
              <p className="text-[10px] text-muted font-mono mb-3">ON THIS PAGE</p>
              <nav className="space-y-1">
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className="block text-[12px] text-[#8a8a8a] hover:text-text py-1 transition-colors">
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 max-w-[680px]">
            <FadeUp>
              <div className="flex items-center gap-3 mb-8">
                <span className="font-mono text-[11px] text-muted">LAST UPDATED {lastUpdated}</span>
              </div>
           
            </FadeUp>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <FadeUp key={section.id} delay={i * 0.05}>
                  <section id={section.id}>
                    <h2 className="text-[18px] font-semibold text-text mb-3">{section.title}</h2>
                    <div className="text-[13px] text-[#8a8a8a] leading-relaxed space-y-3">
                      {section.content}
                    </div>
                  </section>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

// DPA
export function DpaPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Data Processing Addendum"
      description="Terms for processing personal data under GDPR and other privacy laws."
      lastUpdated="OCTOBER 19, 2026"
      sections={[
        { id: 'definitions', title: '1. Definitions', content: <><P>"Controller" means the entity that determines the purposes and means of processing personal data.</P><P>"Processor" means Tunnelo, which processes data on behalf of the Controller.</P><P>"Personal Data" means any information relating to an identified or identifiable natural person.</P></> },
        { id: 'scope', title: '2. Scope and roles', content: <><P>This DPA applies when you use Tunnelo to process personal data. You are the Controller; Tunnelo is the Processor.</P><P>We process data only on your documented instructions, as described in this DPA and the Terms of Service.</P></> },
        { id: 'instructions', title: '3. Processing instructions', content: <><P>You instruct us to provide the Tunnelo service, including tunneling traffic, inspecting requests, and deploying snapshots.</P><P>We do not use your data for any other purpose, including marketing or analytics.</P></> },
        { id: 'subprocessors', title: '4. Subprocessors', content: <>
          <P>We use the following subprocessors to deliver the service:</P>
          <table className="w-full text-[12px] mt-2 border border-hairline rounded-lg overflow-hidden">
            <thead><tr className="bg-surface"><th className="text-left p-2 text-muted font-mono">Subprocessor</th><th className="text-left p-2 text-muted font-mono">Purpose</th><th className="text-left p-2 text-muted font-mono">Location</th></tr></thead>
            <tbody>
              <tr className="border-t border-hairline"><td className="p-2">Cloudflare</td><td className="p-2">CDN and DDoS protection</td><td className="p-2">Global</td></tr>
              <tr className="border-t border-hairline"><td className="p-2">Let's Encrypt</td><td className="p-2">TLS certificates</td><td className="p-2">US</td></tr>
              <tr className="border-t border-hairline"><td className="p-2">Stripe</td><td className="p-2">Payment processing</td><td className="p-2">US</td></tr>
              <tr className="border-t border-hairline"><td className="p-2">AWS</td><td className="p-2">Infrastructure hosting</td><td className="p-2">US/EU</td></tr>
            </tbody>
          </table>
        </> },
        { id: 'security', title: '5. Security measures', content: <><P>We implement appropriate technical and organizational measures to protect personal data, including encryption in transit (TLS 1.3), access controls, and regular security reviews.</P></> },
        { id: 'data-subjects', title: '6. Data subject requests', content: <><P>We assist you in responding to data subject requests (access, deletion, portability) by providing the tools to manage your data within Tunnelo.</P></> },
        { id: 'breach', title: '7. Breach notification', content: <><P>We notify you without undue delay after becoming aware of a personal data breach. We provide sufficient information for you to meet your own notification obligations.</P></> },
        { id: 'transfers', title: '8. International transfers', content: <><P>When we transfer data outside the EEA, we use Standard Contractual Clauses or adequacy decisions as appropriate.</P></> },
        { id: 'audit', title: '9. Audit', content: <><P>You may audit our compliance with this DPA by requesting a security questionnaire or third-party audit report. We respond within 30 days.</P></> },
        { id: 'term', title: '10. Term and deletion', content: <><P>This DPA applies for as long as you use Tunnelo. Upon termination, we delete your personal data within 30 days, except where required by law to retain it.</P></> },
        { id: 'contact', title: '11. Contact', content: <><P>For questions about this DPA, contact <a href="mailto:legal@tunnelo.dev" className="text-lime hover:underline">legal@tunnelo.dev</a>.</P></> },
      ]}
    />
  );
}

// Terms
export function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      description="Terms and conditions for using Tunnelo services."
      lastUpdated="OCTOBER 19, 2026"
      sections={[
        { id: 'acceptance', title: '1. Acceptance', content: <><P>By using Tunnelo, you agree to these Terms. If you don't agree, don't use the service.</P></> },
        { id: 'service', title: '2. The service', content: <><P>Tunnelo provides tools to expose localhost to the internet via Public URLs, local domains, and snapshots. We reserve the right to modify or discontinue features with reasonable notice.</P></> },
        { id: 'accounts', title: '3. Accounts and licenses', content: <><P>Free accounts get limited features. Paid plans require a valid payment method. You're responsible for maintaining account security.</P></> },
        { id: 'urls-snapshots', title: '4. Public URLs and Snapshots', content: <><P>Public URLs tunnel to your localhost. Snapshots deploy static copies. You retain ownership of your content. We don't inspect or store your traffic beyond what's needed for the Inspector feature.</P></> },
        { id: 'acceptable-use', title: '5. Acceptable use', content: <><P>Don't use Tunnelo for illegal activity, malware distribution, phishing, or to circumvent access controls. We may suspend accounts that violate these rules.</P></> },
        { id: 'fees', title: '6. Fees and trials', content: <><P>Paid plans are billed monthly or yearly. All plans include a 14-day free trial. No credit card required to start. VAT may apply.</P></> },
        { id: 'lifetime', title: '7. Lifetime license', content: <><P>The Lifetime License is a one-time payment for perpetual access. It includes 1 year of updates. After that, you can continue using the last version or purchase an update pass.</P></> },
        { id: 'termination', title: '8. Termination', content: <><P>You can cancel anytime from your account settings. We may terminate accounts for violations or non-payment. Upon termination, your URLs and snapshots are removed after 30 days.</P></> },
        { id: 'disclaimers', title: '9. Disclaimers', content: <><P>The service is provided "as is" without warranties. We don't guarantee uptime, though we target 99.9% availability.</P></> },
        { id: 'liability', title: '10. Liability', content: <><P>Our total liability is limited to the amount you paid in the last 12 months. We're not liable for indirect, incidental, or consequential damages.</P></> },
        { id: 'changes', title: '11. Changes', content: <><P>We may update these Terms with reasonable notice. Continued use after changes constitutes acceptance.</P></> },
        { id: 'contact', title: '12. Contact', content: <><P>Questions? Email <a href="mailto:legal@tunnelo.dev" className="text-lime hover:underline">legal@tunnelo.dev</a>.</P></> },
      ]}
    />
  );
}

// Privacy
export function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="How we handle your data and protect your privacy."
      lastUpdated="OCTOBER 19, 2026"
      sections={[
        { id: 'collect', title: '1. What we collect', content: <><P>We collect account information (email, name), billing details, and usage metadata (timestamps, status codes for the Inspector). We do not store the content of your tunneled traffic.</P></> },
        { id: 'traffic', title: '2. Traffic and inspector data', content: <><P>Traffic is encrypted end-to-end. The Inspector stores request metadata (headers, status codes, timestamps) for debugging. You control what's retained and can delete it at any time.</P></> },
        { id: 'use', title: '3. How we use data', content: <><P>We use your data to provide the service, process payments, send important notifications, and improve the product. We never sell your data.</P></> },
        { id: 'sharing', title: '4. Sharing', content: <><P>We share data with subprocessors (Cloudflare, Stripe, AWS) as needed to deliver the service. We don't share data with third parties for marketing.</P></> },
        { id: 'retention', title: '5. Retention', content: <><P>Account data is retained while your account is active. Inspector data is retained for 7 days on Free, 30 days on paid plans. You can delete it sooner.</P></> },
        { id: 'security', title: '6. Security', content: <><P>We use encryption in transit (TLS 1.3), access controls, and regular security reviews. See our <a href="/security" className="text-lime hover:underline">Security page</a> for details.</P></> },
        { id: 'rights', title: '7. Your rights', content: <><P>You have the right to access, correct, delete, and port your data. Contact us at <a href="mailto:privacy@tunnelo.dev" className="text-lime hover:underline">privacy@tunnelo.dev</a> to exercise these rights.</P></> },
        { id: 'cookies', title: '8. Cookies', content: <><P>We use essential cookies for authentication and session management. We don't use tracking or advertising cookies.</P></> },
        { id: 'children', title: '9. Children', content: <><P>Tunnelo is not intended for children under 16. We don't knowingly collect data from children.</P></> },
        { id: 'contact', title: '10. Contact', content: <><P>Privacy questions? Email <a href="mailto:privacy@tunnelo.dev" className="text-lime hover:underline">privacy@tunnelo.dev</a>.</P></> },
      ]}
    />
  );
}
