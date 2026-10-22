import { useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { FadeUp } from '../components/shared';

interface AlternativeData {
  name: string;
  intro: string;
  comparison: { feature: string; tunnelo: string; competitor: string }[];
  whoShouldChoose: { tunnelo: string[]; competitor: string[] };
  migration: string[];
  faq: { q: string; a: string }[];
}

const DATA: Record<string, AlternativeData> = {
  ngrok: {
    name: 'ngrok',
    intro: 'Both Tunnelo and ngrok expose localhost to the internet. Here\'s a fair comparison to help you choose.',
    comparison: [
      { feature: 'Setup', tunnelo: 'Desktop app or CLI, no account needed for basic use', competitor: 'CLI with auth token required' },
      { feature: 'Stable URLs', tunnelo: 'Stable URLs on all plans', competitor: 'Random URLs on free, stable on paid' },
      { feature: 'Local domains', tunnelo: 'https://myapp.local with auto HTTPS', competitor: 'Not available' },
      { feature: 'Inspector and replay', tunnelo: 'Full inspector with replay on all plans', competitor: 'Inspector on paid plans only' },
      { feature: 'Snapshots', tunnelo: 'Deploy static copies with comments', competitor: 'Not available' },
      { feature: 'Team features', tunnelo: 'RBAC, SSO, SCIM, audit log', competitor: 'Team plans available' },
      { feature: 'Pricing model', tunnelo: 'Flat per-seat, lifetime option', competitor: 'Per-tunnel pricing' },
      { feature: 'Platforms', tunnelo: 'macOS, Windows, Linux', competitor: 'macOS, Windows, Linux' },
    ],
    whoShouldChoose: {
      tunnelo: ['Want local HTTPS domains', 'Need snapshots with comments', 'Prefer flat per-seat pricing', 'Use AI agents with MCP'],
      competitor: ['Need global edge network', 'Want per-tunnel billing', 'Require OAuth integration built-in'],
    },
    migration: ['Install Tunnelo', 'Import your ngrok config', 'Update webhook URLs in your services'],
    faq: [
      { q: 'Can I use both tools?', a: 'Yes. Many developers use Tunnelo for local development and ngrok for production edge cases.' },
      { q: 'Is migration difficult?', a: 'No. Most webhooks just need the URL updated. Tunnelo\'s CLI is similar to ngrok\'s.' },
      { q: 'Do you support ngrok config files?', a: 'Tunnelo uses its own config format but can import basic ngrok settings.' },
    ],
  },
  'cloudflare-tunnel': {
    name: 'Cloudflare Tunnel',
    intro: 'Both Tunnelo and Cloudflare Tunnel expose localhost. Here\'s how they compare.',
    comparison: [
      { feature: 'Setup', tunnelo: 'Desktop app or one-line CLI install', competitor: 'cloudflared CLI with config file' },
      { feature: 'Stable URLs', tunnelo: 'Stable URLs included', competitor: 'Stable with quick tunnels or custom domain' },
      { feature: 'Local domains', tunnelo: 'https://myapp.local with auto HTTPS', competitor: 'Not available' },
      { feature: 'Inspector and replay', tunnelo: 'Built-in inspector with replay', competitor: 'No built-in inspector' },
      { feature: 'Snapshots', tunnelo: 'Deploy static copies with comments', competitor: 'Not available' },
      { feature: 'Team features', tunnelo: 'RBAC, SSO, SCIM, audit log', competitor: 'Cloudflare Zero Trust required' },
      { feature: 'Pricing model', tunnelo: 'Flat per-seat, lifetime option', competitor: 'Free with Cloudflare account, paid for Zero Trust' },
      { feature: 'Platforms', tunnelo: 'macOS, Windows, Linux', competitor: 'macOS, Windows, Linux' },
    ],
    whoShouldChoose: {
      tunnelo: ['Want a simple desktop experience', 'Need request inspection', 'Prefer per-seat pricing'],
      competitor: ['Already on Cloudflare', 'Need Zero Trust network', 'Want free tunnels with Cloudflare domain'],
    },
    migration: ['Install Tunnelo', 'Create equivalent Public URLs', 'Update DNS or webhook URLs'],
    faq: [
      { q: 'Can I use both?', a: 'Yes. Some teams use Cloudflare Tunnel for production and Tunnelo for development.' },
      { q: 'Is Cloudflare Tunnel free?', a: 'Quick tunnels are free. Full Zero Trust features require a paid plan.' },
      { q: 'Do I need a Cloudflare account?', a: 'No. Tunnelo works independently with no external account required.' },
    ],
  },
  'tailscale-funnel': {
    name: 'Tailscale Funnel',
    intro: 'Both Tunnelo and Tailscale Funnel expose services. Here\'s a comparison.',
    comparison: [
      { feature: 'Setup', tunnelo: 'Desktop app, no network config', competitor: 'Tailscale network + funnel command' },
      { feature: 'Stable URLs', tunnelo: 'Stable HTTPS URLs', competitor: 'Stable machine URLs via Tailscale' },
      { feature: 'Local domains', tunnelo: 'https://myapp.local with auto HTTPS', competitor: 'Tailscale DNS with MagicDNS' },
      { feature: 'Inspector and replay', tunnelo: 'Built-in inspector with replay', competitor: 'No built-in inspector' },
      { feature: 'Snapshots', tunnelo: 'Deploy static copies with comments', competitor: 'Not available' },
      { feature: 'Team features', tunnelo: 'RBAC, SSO, SCIM, audit log', competitor: 'Tailscale ACLs and user management' },
      { feature: 'Pricing model', tunnelo: 'Flat per-seat, lifetime option', competitor: 'Free for small teams, paid for larger' },
      { feature: 'Platforms', tunnelo: 'macOS, Windows, Linux', competitor: 'macOS, Windows, Linux, iOS, Android' },
    ],
    whoShouldChoose: {
      tunnelo: ['Want simple Public URLs without a mesh network', 'Need request inspection and replay', 'Building webhooks and OAuth flows'],
      competitor: ['Need a full mesh VPN', 'Want to connect devices across networks', 'Prefer Tailscale\'s access controls'],
    },
    migration: ['Install Tunnelo', 'Replace funnel commands with Tunnelo http', 'Update any Tailscale-specific URLs'],
    faq: [
      { q: 'Can I use both?', a: 'Yes. Tailscale for internal mesh, Tunnelo for public webhooks and previews.' },
      { q: 'Is Tailscale Funnel free?', a: 'Funnel is included with Tailscale. Free tier supports limited usage.' },
      { q: 'Do I need a Tailscale account?', a: 'No. Tunnelo works independently.' },
    ],
  },
};

export default function AlternativesPage() {
  const { name } = useParams<{ name: string }>();
  const data = name ? DATA[name] : null;

  if (!data) {
    return (
      <>
        <PageShell eyebrow="Alternatives" title="Alternative not found" />
        <div className="max-w-[1120px] mx-auto px-6 pb-16">
          <p className="text-[#8a8a8a]"><Link to="/" className="text-lime hover:underline">Back to home</Link></p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageShell
        eyebrow="Alternatives"
        title={`Tunnelo vs ${data.name}`}
        description={data.intro}
      />
      <div className="max-w-[1120px] mx-auto px-6 pb-16">
        {/* Sample note */}
        
        {/* Comparison table */}
        <FadeUp delay={0.08}>
          <div className="border border-hairline rounded-xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline bg-surface">
                    <th className="text-left text-[11px] text-muted font-mono p-4 w-1/4">Feature</th>
                    <th className="text-left text-[11px] text-lime font-mono p-4">Tunnelo</th>
                    <th className="text-left text-[11px] text-muted font-mono p-4">{data.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.comparison.map((row, i) => (
                    <tr key={i} className="border-b border-hairline last:border-0">
                      <td className="p-4 text-[12px] text-text font-medium">{row.feature}</td>
                      <td className="p-4 text-[12px] text-[#8a8a8a]">{row.tunnelo}</td>
                      <td className="p-4 text-[12px] text-[#8a8a8a]">{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeUp>

        {/* Who should choose */}
        <FadeUp delay={0.16}>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="border border-hairline rounded-xl p-6 bg-surface">
              <p className="font-mono text-[12px] text-lime mb-3">CHOOSE Tunnelo IF</p>
              <ul className="space-y-2">
                {data.whoShouldChoose.tunnelo.map((item, i) => (
                  <li key={i} className="text-[12px] text-[#8a8a8a] flex items-start gap-2">
                    <span className="text-lime mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-hairline rounded-xl p-6 bg-surface">
              <p className="font-mono text-[12px] text-muted mb-3">CHOOSE {data.name.toUpperCase()} IF</p>
              <ul className="space-y-2">
                {data.whoShouldChoose.competitor.map((item, i) => (
                  <li key={i} className="text-[12px] text-[#8a8a8a] flex items-start gap-2">
                    <span className="text-muted mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* Migration steps */}
        <FadeUp delay={0.24}>
          <div className="border border-hairline rounded-xl p-6 mb-8 bg-surface">
            <p className="font-mono text-[12px] text-lime mb-4">MIGRATION STEPS</p>
            <div className="space-y-3">
              {data.migration.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-lime/10 text-lime text-[11px] font-mono flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-[13px] text-[#8a8a8a]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* FAQ */}
        <FadeUp delay={0.32}>
          <div className="border border-hairline rounded-xl p-6 mb-8 bg-surface">
            <p className="font-mono text-[12px] text-lime mb-4">FAQ</p>
            <div className="space-y-4">
              {data.faq.map((item, i) => (
                <div key={i}>
                  <p className="text-[13px] font-semibold text-text mb-1">{item.q}</p>
                  <p className="text-[12px] text-[#8a8a8a]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.4}>
          <div className="text-center border-t border-hairline pt-8">
            <p className="text-[14px] text-[#8a8a8a] mb-4">Ready to try Tunnelo?</p>
            <a href="/download" className="inline-block bg-lime text-page text-[13px] font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity">
              Download Tunnelo
            </a>
          </div>
        </FadeUp>
      </div>
    </>
  );
}
