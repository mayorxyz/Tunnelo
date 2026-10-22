import { useState } from 'react';
import PageShell from '../components/PageShell';
import DemoModal from '../components/DemoModal';
import { FadeUp } from '../components/shared';

const CONTROLS = [
  { title: 'Encryption in transit', desc: 'All traffic is encrypted with TLS 1.3. Certificates are provisioned automatically via Let\'s Encrypt.' },
  { title: 'Access control for Public URLs', desc: 'Password-protect URLs, generate secret links, or restrict by IP address.' },
  { title: 'Password and secret links', desc: 'Add a password to any Public URL or generate a secret link that only works for people with the URL.' },
  { title: 'IP allow rules', desc: 'Restrict access to specific IP addresses or CIDR ranges. Great for staging environments.' },
  { title: 'Tunnel isolation', desc: 'Each tunnel is isolated. Traffic never crosses between tunnels or customers.' },
  { title: 'SSO + SCIM', desc: 'Teams plan includes Okta SSO and SCIM provisioning. Manage access centrally.' },
  { title: 'Audit log', desc: 'Full audit trail for team actions: who created what URL, when, and from where.' },
  { title: 'Dependency and vendor reviews', desc: 'We review all dependencies and vendors for security. Annual third-party audits planned.' },
  { title: 'Responsible disclosure', desc: 'Found a vulnerability? Email security@tunnelo.dev. We respond within 24 hours.' },
];

export default function SecurityPage() {
  const [demoModal, setDemoModal] = useState(false);

  return (
    <>
      <PageShell
        eyebrow="Security"
        title="Security at Tunnelo"
        description="How we protect your data and keep your tunnels secure."
      />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        {/* Control cards */}
        <FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {CONTROLS.map((c, i) => (
              <div key={i} className="border border-hairline rounded-xl p-5 bg-surface">
                <p className="text-[14px] font-semibold text-text mb-2">{c.title}</p>
                <p className="text-[12px] text-[#8a8a8a] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Data flow diagram */}
        <FadeUp delay={0.1}>
          <div className="border border-hairline rounded-xl p-8 mb-12 bg-surface">
            <p className="font-mono text-[12px] text-lime mb-6">DATA FLOW</p>
            <svg viewBox="0 0 800 120" className="w-full h-auto" fill="none">
              {/* Visitor */}
              <circle cx="80" cy="60" r="30" stroke="#C6F432" strokeWidth="1.5" fill="#C6F432" fillOpacity="0.1" />
              <text x="80" y="65" textAnchor="middle" fill="#C6F432" fontSize="10" fontFamily="JetBrains Mono">Visitor</text>
              {/* Arrow */}
              <path d="M110 60 L220 60" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
              {/* Tunnelo Network */}
              <rect x="220" y="30" width="200" height="60" rx="8" stroke="#C6F432" strokeWidth="1.5" fill="#C6F432" fillOpacity="0.05" />
              <text x="320" y="55" textAnchor="middle" fill="white" fontSize="11" fontFamily="JetBrains Mono">Tunnelo Network</text>
              <text x="320" y="70" textAnchor="middle" fill="#737373" fontSize="9" fontFamily="JetBrains Mono">TLS 1.3 · Isolated</text>
              {/* Arrow */}
              <path d="M420 60 L530 60" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
              {/* Tunnel */}
              <rect x="530" y="30" width="100" height="60" rx="8" stroke="#737373" strokeWidth="1" fill="#1b1b1b" />
              <text x="580" y="55" textAnchor="middle" fill="white" fontSize="10" fontFamily="JetBrains Mono">Tunnel</text>
              <text x="580" y="70" textAnchor="middle" fill="#737373" fontSize="9" fontFamily="JetBrains Mono">Encrypted</text>
              {/* Arrow */}
              <path d="M630 60 L690 60" stroke="#737373" strokeWidth="1" strokeDasharray="4 4" />
              {/* Machine */}
              <rect x="690" y="30" width="80" height="60" rx="8" stroke="#737373" strokeWidth="1" fill="#1b1b1b" />
              <text x="730" y="55" textAnchor="middle" fill="white" fontSize="10" fontFamily="JetBrains Mono">Your</text>
              <text x="730" y="70" textAnchor="middle" fill="white" fontSize="10" fontFamily="JetBrains Mono">Machine</text>
            </svg>
          </div>
        </FadeUp>

        {/* Report vulnerability */}
        <FadeUp delay={0.2}>
          <div className="border border-hairline rounded-xl p-6 bg-surface mb-8">
            <p className="text-[16px] font-semibold text-text mb-2">Report a vulnerability</p>
            <p className="text-[13px] text-[#8a8a8a] mb-4">Found a security issue? Email us at <a href="mailto:security@tunnelo.dev" className="text-lime hover:underline">security@tunnelo.dev</a>. We respond within 24 hours.</p>
            <button
              onClick={() => setDemoModal(true)}
              className="border border-lime text-lime text-[13px] font-semibold px-4 py-2 rounded-md hover:bg-lime/10 transition-colors"
            >
              Request security packet
            </button>
          </div>
        </FadeUp>
      </div>
      <DemoModal open={demoModal} onClose={() => setDemoModal(false)} />
    </>
  );
}
